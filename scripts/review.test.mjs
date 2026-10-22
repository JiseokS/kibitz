import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  prepare,
  runReview,
  status,
  execute,
  digestTree,
  validateReview,
  parseReviewerStream,
  reviewerEnvironment,
  doctor,
} from "./review.mjs";

const gitBin = process.env.KIBITZ_GIT_BIN || "git";
const schema = JSON.parse(
  await fs.readFile(
    new URL("../harness/review.schema.json", import.meta.url),
    "utf8",
  ),
);
const git = (repo, ...args) =>
  execFileSync(gitBin, args, {
    cwd: repo,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
const read = async (file) => JSON.parse(await fs.readFile(file, "utf8"));

async function withEnvironment(values, run) {
  const before = Object.fromEntries(
    Object.keys(values).map((key) => [key, process.env[key]]),
  );
  try {
    Object.assign(process.env, values);
    return await run();
  } finally {
    for (const [key, value] of Object.entries(before)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function fixture(t, { failing = false, unknownCheck = false } = {}) {
  const parent = await fs.mkdtemp(
    path.join(os.tmpdir(), "kibitz-review-test-"),
  );
  t.after(() => fs.rm(parent, { recursive: true, force: true }));
  const repo = path.join(parent, "repo");
  await fs.mkdir(repo);
  git(repo, "init", "--quiet", "--initial-branch=main");
  git(repo, "config", "user.name", "Harness Test");
  git(repo, "config", "user.email", "harness@example.test");
  await fs.mkdir(path.join(repo, "scripts"));
  await fs.mkdir(path.join(repo, "harness/tasks"), { recursive: true });
  await fs.writeFile(path.join(repo, ".gitignore"), "/harness/runs/\n");
  await fs.writeFile(
    path.join(repo, "harness/reviewer.json"),
    JSON.stringify({
      model: "claude-opus-4-6-thinking",
    }),
  );
  await fs.writeFile(
    path.join(repo, "add.js"),
    "export const add = (a, b) => a + b;\n",
  );
  await fs.writeFile(
    path.join(repo, "scripts/review.test.mjs"),
    `import test from 'node:test';\ntest('fixture check', () => { ${failing ? "throw new Error('fixture failure');" : ""} });\n`,
  );
  git(repo, "add", ".");
  git(repo, "commit", "--quiet", "-m", "Baseline");
  const base = git(repo, "rev-parse", "HEAD");
  const task = {
    id: "fixture",
    goal: "Review addition behavior",
    acceptance: [
      { id: "A01", description: "Adds two numbers" },
      { id: "A02", description: "Preserves input" },
    ],
    checks: [unknownCheck ? "not-a-command" : "harness"],
  };
  await fs.writeFile(
    path.join(repo, "harness/tasks/task.json"),
    JSON.stringify(task),
  );
  await fs.appendFile(
    path.join(repo, "add.js"),
    "// Updated addition contract.\n",
  );
  git(repo, "add", ".");
  git(repo, "commit", "--quiet", "-m", "Change");
  const head = git(repo, "rev-parse", "HEAD");
  return { parent, repo, base, head, task };
}

const makeRun = async (f) => {
  const prepared = await prepare(f.repo, {
    base: f.base,
    task: "harness/tasks/task.json",
  });
  const dir = path.join(f.repo, "harness/runs", prepared.run_id);
  return {
    ...prepared,
    dir,
    manifest: await read(path.join(dir, "manifest.json")),
    snapshot: path.join(dir, "checkout"),
  };
};

function validReview(manifest) {
  return {
    reviewed_base: manifest.base,
    reviewed_head: manifest.head,
    outcome: "PASS",
    summary: "Inspected the addition implementation and test evidence.",
    files_reviewed: ["add.js"],
    acceptance: manifest.task.acceptance.map(({ id }) => ({
      id,
      status: "met",
      evidence: "add.js uses addition and does not change its arguments.",
    })),
    findings: [],
  };
}

async function fakeReviewer(f, behavior = {}) {
  const bin = path.join(
    f.parent,
    "fake-reviewer-" + Math.random().toString(16).slice(2),
  );
  const code = `#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const behavior = ${JSON.stringify(behavior)};
const args = process.argv.slice(2);
if (!args.includes('--sandbox') || !args.includes('--json-schema') || (args.includes('--dangerously-skip-permissions') || args.includes('plan'))) throw new Error('Unsafe reviewer arguments');
const context = JSON.parse(fs.readFileSync('.kibitz-review/context.json', 'utf8'));
if (args[args.indexOf('--model') + 1] !== context.reviewer.model || args.includes('--effort') || args[args.indexOf('--output-format') + 1] !== 'stream-json') throw new Error('Missing pinned reviewer arguments');
if (args[args.indexOf('--input-format') + 1] !== 'stream-json' || args.some(arg => ['-p','--print','--prompt'].includes(arg) || arg.includes('SOURCE_BUNDLE_BEGIN'))) throw new Error('Prompt must use stdin');
const lines = fs.readFileSync(0, 'utf8').trimEnd().split('\\n');
if (lines.length !== 1) throw new Error('Expected one input frame and EOF');
const frame = JSON.parse(lines[0]);
if (frame.event !== 'user' || typeof frame.message?.content !== 'string') throw new Error('Invalid input frame');
const bundle = JSON.parse(frame.message.content.split('SOURCE_BUNDLE_BEGIN\\n')[1].split('\\nSOURCE_BUNDLE_END')[0]);
if (bundle.head !== context.head || !bundle.files.some(item => item.file === 'add.js')) throw new Error('Missing source context on stdin');
const secretKeys = ['OPENAI_API_KEY','API_ACCESS_TOKEN','SOME_NEW_PROVIDER_SECRET'];
fs.writeFileSync(${JSON.stringify(path.join(f.parent, "transport.json"))}, JSON.stringify({args, frames:lines.length, hasSource:true, inheritedSecrets:secretKeys.some(key => process.env[key] !== undefined)}));
fs.appendFileSync(${JSON.stringify(path.join(f.parent, "calls.log"))}, 'called\\n');
if (behavior.authFailure) { process.stderr.write('authentication required'); process.exit(1); }
if (behavior.softDenied) process.stderr.write('Tool soft-denied: command requires approval');
if (behavior.edit) fs.appendFileSync('add.js', '// Unexpected reviewer edit\\n');
const report = {
reviewed_base: context.base, reviewed_head: behavior.wrongHead ? '0'.repeat(40) : context.head,
outcome: 'PASS', summary: 'Reviewed implementation and actual check logs.', files_reviewed: ['add.js'],
acceptance: context.task.acceptance.map(c => ({ id: c.id, status: 'met', evidence: 'Inspected add.js and check evidence.' })), findings: []
};
if (behavior.omitCriterion) report.acceptance.pop();
if (behavior.unsafeFile) report.files_reviewed = ['../outside'];
if (!behavior.missingInit) console.log(JSON.stringify({event:'init', init:{model: behavior.wrongModel ? 'other-model' : context.reviewer.model}}));
if (behavior.missingOutput) console.log(JSON.stringify({event:'result',result:{status:'SUCCESS',response:'looks good'}}));
else if (behavior.malformed) console.log('not JSON');
else console.log(JSON.stringify({event:'result',result:{status: behavior.status || 'SUCCESS', structured_output: report, denied_actions: behavior.deniedAction ? [{action:'command'}] : []}}));
`;
  await fs.writeFile(bin, code, { mode: 0o700 });
  return bin;
}

test("prepare freezes exact commits, captures real checks, and removes snapshot remotes", async (t) => {
  const f = await fixture(t),
    run = await makeRun(f);
  assert.equal(run.head, f.head);
  assert.equal(run.manifest.checks[0].code, 0);
  assert.equal(run.manifest.reviewer.model, "claude-opus-4-6-thinking");
  assert.equal(git(run.snapshot, "rev-parse", "HEAD"), f.head);
  assert.equal(git(run.snapshot, "remote"), "");
  assert.equal(await digestTree(run.snapshot), run.manifest.snapshot_digest);
  assert.match(
    await fs.readFile(path.join(run.dir, "harness.stdout.log"), "utf8"),
    /pass 1/,
  );
  assert.equal(git(f.repo, "status", "--porcelain"), "");
});

test("PASS requires exact review evidence and a repeated run uses the cached result", async (t) => {
  const f = await fixture(t),
    run = await makeRun(f),
    bin = await fakeReviewer(f);
  const first = await runReview(f.repo, run.run_id, { bin });
  assert.equal(first.outcome, "PASS");
  assert.deepEqual(first.provenance, {
    requested_model: "claude-opus-4-6-thinking",
    reported_model: "claude-opus-4-6-thinking",
  });
  const second = await runReview(f.repo, run.run_id, { bin });
  assert.equal(second.cached, true);
  assert.equal(
    (await fs.readFile(path.join(f.parent, "calls.log"), "utf8"))
      .trim()
      .split("\n").length,
    1,
  );
  assert.equal((await status(f.repo, run.run_id)).outcome, "PASS");
});

test("reviewer environment keeps runtime/config settings and drops secrets and preload hooks", () => {
  const source = {
    PATH: "/usr/bin",
    HOME: "/home/reviewer",
    LANG: "en_US.UTF-8",
    https_proxy: "http://proxy.example:8080",
    NODE_EXTRA_CA_CERTS: "/certs/internal.pem",
    GOOGLE_APPLICATION_CREDENTIALS: "/config/adc.json",
    XDG_CONFIG_HOME: "/config",
    OPENAI_API_KEY: "dummy-app-key",
    API_ACCESS_TOKEN: "dummy-token",
    GH_TOKEN: "dummy-github-token",
    AWS_SECRET_ACCESS_KEY: "dummy-aws-key",
    ANTHROPIC_API_KEY: "dummy-provider-key",
    SOME_NEW_PROVIDER_SECRET: "dummy-unknown-key",
    NODE_OPTIONS: "--require /not-to-be-loaded.cjs",
    BASH_ENV: "/not-to-be-sourced",
    KIBITZ_AGY_BIN: "/trusted/agy",
    NODE_TEST_CONTEXT: "child-v8",
  };
  assert.deepEqual(reviewerEnvironment(source), {
    PATH: source.PATH,
    HOME: source.HOME,
    LANG: source.LANG,
    https_proxy: source.https_proxy,
    NODE_EXTRA_CA_CERTS: source.NODE_EXTRA_CA_CERTS,
    GOOGLE_APPLICATION_CREDENTIALS: source.GOOGLE_APPLICATION_CREDENTIALS,
    XDG_CONFIG_HOME: source.XDG_CONFIG_HOME,
  });
  assert.equal(source.OPENAI_API_KEY, "dummy-app-key");
});

test("reviewer receives complete source through stdin without parent app secrets", async (t) => {
  const f = await fixture(t),
    run = await makeRun(f),
    bin = await fakeReviewer(f);
  await withEnvironment(
    {
      OPENAI_API_KEY: "dummy-app-secret",
      API_ACCESS_TOKEN: "dummy-beta-secret",
      SOME_NEW_PROVIDER_SECRET: "dummy-unknown-secret",
    },
    async () => {
      const result = await runReview(f.repo, run.run_id, { bin });
      assert.equal(result.outcome, "PASS");
      const transport = await read(path.join(f.parent, "transport.json"));
      assert.equal(transport.frames, 1);
      assert.equal(transport.hasSource, true);
      assert.equal(transport.inheritedSecrets, false);
      assert.ok(
        transport.args.every(
          (arg) =>
            !arg.includes("dummy-") && !arg.includes("SOURCE_BUNDLE_BEGIN"),
        ),
      );
      assert.equal(process.env.OPENAI_API_KEY, "dummy-app-secret");
    },
  );
});

test("diagnostic help probes also strip application secrets", async (t) => {
  const f = await fixture(t),
    bin = path.join(f.parent, "safe-help");
  await fs.writeFile(
    bin,
    `#!/usr/bin/env node\nif (process.env.SOME_NEW_PROVIDER_SECRET) process.exit(1);\nconsole.log('--json-schema --output-format --input-format --sandbox --print-timeout --disable-slash-commands --model');\n`,
    { mode: 0o700 },
  );
  await withEnvironment(
    {
      KIBITZ_AGY_BIN: bin,
      KIBITZ_CODEX_BIN: bin,
      SOME_NEW_PROVIDER_SECRET: "dummy-diagnostic-secret",
    },
    async () => {
      const diagnostics = await doctor();
      assert.equal(diagnostics.antigravity.ready, true);
      assert.equal(diagnostics.codex.ready, true);
    },
  );
});

test("stdin preserves a framed prompt with quotes, newlines, Unicode and shell syntax", async () => {
  const prompt = 'Private context: "quoted"\n한국어; $(no-shell) `literal`';
  const input =
    JSON.stringify({ event: "user", message: { content: prompt } }) + "\n";
  const response = await execute(
    process.execPath,
    [
      "-e",
      "let input='';process.stdin.setEncoding('utf8');process.stdin.on('data',chunk=>input+=chunk);process.stdin.on('end',()=>process.stdout.write(JSON.stringify({input,args:process.argv.slice(1)})));",
    ],
    { input },
  );
  assert.equal(response.code, 0);
  assert.equal(response.error, null);
  assert.equal(JSON.parse(response.stdout).input, input);
  assert.deepEqual(JSON.parse(response.stdout).args, []);
});

test("early stdin closure becomes an execution failure instead of an uncaught EPIPE", async () => {
  const response = await execute(
    process.execPath,
    ["-e", "require('node:fs').closeSync(0);setInterval(()=>{},1000);"],
    { input: "x".repeat(2_000_000), timeoutMs: 2000 },
  );
  assert.match(response.error, /Input delivery failed/);
  assert.notEqual(response.code, 0);
});

test("a missing executable with piped input returns an execution failure", async () => {
  const response = await execute("/missing/kibitz-reviewer", [], {
    input: "one frame\n",
  });
  assert.notEqual(response.code, 0);
  assert.ok(response.error);
});

for (const [name, behavior] of Object.entries({
  "authentication failure": { authFailure: true },
  "non-success execution": { status: "WAITING" },
  "malformed output": { malformed: true },
  "missing structured output": { missingOutput: true },
  "wrong reviewed commit": { wrongHead: true },
  "omitted acceptance criterion": { omitCriterion: true },
  "unsafe evidence path": { unsafeFile: true },
  "soft-denied required tool": { softDenied: true },
  "denied-action envelope": { deniedAction: true },
  "missing model selection evidence": { missingInit: true },
  "unexpected reviewer model": { wrongModel: true },
})) {
  test(`${name} cannot become PASS`, async (t) => {
    const f = await fixture(t),
      run = await makeRun(f);
    const result = await runReview(f.repo, run.run_id, {
      bin: await fakeReviewer(f, behavior),
    });
    assert.equal(result.outcome, "INCOMPLETE");
    assert.ok(result.error);
  });
}

test("reviewer edits invalidate the result and leave original source intact", async (t) => {
  const f = await fixture(t),
    run = await makeRun(f),
    before = await fs.readFile(path.join(f.repo, "add.js"), "utf8");
  const result = await runReview(f.repo, run.run_id, {
    bin: await fakeReviewer(f, { edit: true }),
  });
  assert.equal(result.outcome, "INCOMPLETE");
  assert.match(result.error, /copy changed/);
  assert.equal(await fs.readFile(path.join(f.repo, "add.js"), "utf8"), before);
});

test("a failed real check overrides a reviewer PASS", async (t) => {
  const f = await fixture(t, { failing: true }),
    run = await makeRun(f);
  assert.equal(run.manifest.checks[0].code, 1);
  const result = await runReview(f.repo, run.run_id, {
    bin: await fakeReviewer(f),
  });
  assert.equal(result.reviewer_outcome, "PASS");
  assert.equal(result.outcome, "CHANGES_REQUIRED");
});

test("new source commit invalidates an earlier PASS", async (t) => {
  const f = await fixture(t),
    run = await makeRun(f);
  await runReview(f.repo, run.run_id, { bin: await fakeReviewer(f) });
  await fs.appendFile(path.join(f.repo, "add.js"), "// Another revision.\n");
  git(f.repo, "add", ".");
  git(f.repo, "commit", "--quiet", "-m", "Later change");
  assert.equal((await status(f.repo, run.run_id)).outcome, "INCOMPLETE");
  await assert.rejects(runReview(f.repo, run.run_id), /HEAD changed/);
});

test("dirty source and unknown check commands are rejected before review", async (t) => {
  const f = await fixture(t);
  await fs.writeFile(path.join(f.repo, "uncommitted.txt"), "not committed");
  await assert.rejects(
    prepare(f.repo, { base: f.base, task: "harness/tasks/task.json" }),
    /uncommitted/,
  );
  const unknown = await fixture(t, { unknownCheck: true });
  await assert.rejects(
    prepare(unknown.repo, {
      base: unknown.base,
      task: "harness/tasks/task.json",
    }),
    /Unknown check/,
  );
});

test("concurrent review lock and three-attempt ceiling prevent duplicate requests", async (t) => {
  const f = await fixture(t),
    run = await makeRun(f),
    bin = await fakeReviewer(f);
  await fs.writeFile(path.join(run.dir, "running.lock"), "");
  await assert.rejects(
    runReview(f.repo, run.run_id, { bin }),
    /already running/,
  );
  await fs.unlink(path.join(run.dir, "running.lock"));
  for (let i = 0; i < 3; i++)
    assert.equal(
      (await runReview(f.repo, run.run_id, { bin, retry: true })).outcome,
      "PASS",
    );
  await assert.rejects(
    runReview(f.repo, run.run_id, { bin, retry: true }),
    /Three reviewer attempts/,
  );
});

test("cached result tampering is not accepted as a PASS", async (t) => {
  const f = await fixture(t),
    run = await makeRun(f),
    bin = await fakeReviewer(f);
  await runReview(f.repo, run.run_id, { bin });
  await fs.writeFile(
    path.join(run.dir, "result.json"),
    JSON.stringify({ outcome: "PASS" }),
  );
  assert.equal(
    (await runReview(f.repo, run.run_id, { bin })).outcome,
    "INCOMPLETE",
  );
});

test("saved model provenance and review content must match raw CLI evidence", async (t) => {
  const f = await fixture(t),
    run = await makeRun(f);
  const result = await runReview(f.repo, run.run_id, {
    bin: await fakeReviewer(f),
  });
  for (const edit of [
    (value) => {
      value.provenance.reported_model = "other-model";
    },
    (value) => {
      value.review.summary = "Altered review";
    },
  ]) {
    const changed = structuredClone(result);
    edit(changed);
    await fs.writeFile(
      path.join(run.dir, "result.json"),
      JSON.stringify(changed),
    );
    assert.equal((await status(f.repo, run.run_id)).outcome, "INCOMPLETE");
  }
});

test("reviewer policy rejects unsupported settings in the frozen head", async (t) => {
  const f = await fixture(t);
  await fs.writeFile(
    path.join(f.repo, "harness/reviewer.json"),
    JSON.stringify({ model: "claude-opus-4-6-thinking", effort: "low" }),
  );
  git(f.repo, "add", ".");
  git(f.repo, "commit", "--quiet", "-m", "Invalid policy");
  await assert.rejects(makeRun(f), /unexpected property/);
});

test("model evidence needs one init and one final result", () => {
  const policy = { model: "claude-opus-4-6-thinking" };
  const init = { event: "init", init: { model: policy.model } };
  const result = { event: "result", result: { status: "SUCCESS" } };
  for (const events of [
    [init, init, result],
    [init, result, result],
    [result, init],
    [init, result, { event: "step_update" }],
  ])
    assert.throws(() =>
      parseReviewerStream(events.map(JSON.stringify).join("\n"), policy),
    );
});

test("unverified criteria, failed evidence, duplicate IDs and invalid line numbers are handled", async (t) => {
  const f = await fixture(t),
    run = await makeRun(f),
    valid = validReview(run.manifest);
  const unverified = structuredClone(valid);
  unverified.acceptance[0].status = "unverified";
  assert.equal(
    await validateReview(unverified, run.manifest, run.snapshot, schema),
    "INCOMPLETE",
  );
  const missingCheck = structuredClone(run.manifest);
  missingCheck.checks = [];
  assert.equal(
    await validateReview(valid, missingCheck, run.snapshot, schema),
    "INCOMPLETE",
  );
  const duplicate = structuredClone(valid);
  duplicate.acceptance[1].id = "A01";
  await assert.rejects(
    validateReview(duplicate, run.manifest, run.snapshot, schema),
    /every acceptance/,
  );
  const finding = structuredClone(valid);
  finding.findings.push({
    priority: "P2",
    title: "Concrete defect",
    file: "add.js",
    side: "head",
    line: 999,
    scenario: "Example",
    impact: "Example impact",
    evidence: "Example evidence",
  });
  await assert.rejects(
    validateReview(finding, run.manifest, run.snapshot, schema),
    /outside/,
  );
  finding.findings[0].line = 1;
  assert.equal(
    await validateReview(finding, run.manifest, run.snapshot, schema),
    "CHANGES_REQUIRED",
  );
});

test("execution timeouts terminate a process and return an incomplete reason", async () => {
  const result = await execute(
    process.execPath,
    ["-e", "setInterval(() => {}, 1000)"],
    { timeoutMs: 50, input: "x".repeat(2_000_000) },
  );
  assert.match(result.error, /timed out/);
  assert.notEqual(result.code, 0);
});

test("snapshot digest never follows symlinks outside the review copy", async (t) => {
  const f = await fixture(t),
    outside = path.join(f.parent, "outside.txt");
  await fs.writeFile(outside, "first");
  await fs.symlink(outside, path.join(f.repo, "linked"));
  const before = await digestTree(f.repo);
  await fs.writeFile(outside, "second");
  assert.equal(await digestTree(f.repo), before);
});

test("oversized review context is incomplete before a model call", async (t) => {
  const f = await fixture(t);
  await fs.appendFile(
    path.join(f.repo, "add.js"),
    "// " + "x".repeat(125000) + "\n",
  );
  git(f.repo, "add", ".");
  git(f.repo, "commit", "--quiet", "-m", "Large context");
  const run = await makeRun(f);
  const result = await runReview(f.repo, run.run_id, {
    bin: await fakeReviewer(f),
  });
  assert.equal(result.outcome, "INCOMPLETE");
  assert.match(result.error, /exceeds 120 KB/);
  await assert.rejects(fs.access(path.join(f.parent, "calls.log")));
});
