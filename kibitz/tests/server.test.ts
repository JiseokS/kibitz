import assert from "node:assert/strict";
import { once } from "node:events";
import type { AddressInfo } from "node:net";
import { test } from "node:test";
import { createApiServer, createOpenAIEvaluator } from "../server/app";
import { examples } from "../src/domain/demo";

async function withServer(
  options: Partial<Parameters<typeof createApiServer>[0]>,
  run: (url: string) => Promise<void>,
) {
  const server = createApiServer({
    evaluate: async () => examples[0].evaluation,
    ...options,
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    await run(`http://127.0.0.1:${(server.address() as AddressInfo).port}`);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}
const post = (
  url: string,
  input: unknown = examples[0].input,
  headers: Record<string, string> = {},
) =>
  fetch(`${url}/v1/evaluations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(input),
  });

test("API validates input before invoking evaluator and returns four perspectives", async () => {
  let calls = 0;
  await withServer(
    {
      evaluate: async () => {
        calls++;
        return examples[0].evaluation;
      },
    },
    async (url) => {
      assert.equal(
        (await post(url, { text: "short", category: "relationships" })).status,
        400,
      );
      assert.equal(calls, 0);
      const response = await post(url);
      assert.equal(response.status, 200);
      assert.equal((await response.json()).judgments.length, 4);
      assert.equal(response.headers.get("cache-control"), "no-store");
    },
  );
});
test("API rejects missing auth, disallowed origins, malformed JSON, and oversized bodies", async () => {
  await withServer(
    { accessToken: "private-test-token", origins: ["http://localhost:8081"] },
    async (url) => {
      assert.equal((await post(url)).status, 401);
      const headers = { Authorization: "Bearer private-test-token" };
      assert.equal(
        (
          await post(url, examples[0].input, {
            ...headers,
            Origin: "https://unknown.test",
          })
        ).status,
        403,
      );
      assert.equal(
        (
          await post(url, examples[0].input, {
            ...headers,
            Origin: "http://localhost:8081",
          })
        ).status,
        200,
      );
      assert.equal(
        (
          await post(
            url,
            { text: "a".repeat(20_000), category: "relationships" },
            headers,
          )
        ).status,
        413,
      );
      assert.equal(
        (
          await fetch(`${url}/v1/evaluations`, {
            method: "POST",
            headers: { ...headers, "Content-Type": "application/json" },
            body: "{",
          })
        ).status,
        400,
      );
    },
  );
});
test("API limits requests and hides internal provider errors", async () => {
  await withServer({ perMinute: 1 }, async (url) => {
    assert.equal((await post(url)).status, 200);
    assert.equal((await post(url)).status, 429);
  });
  await withServer({ dailyLimit: 1 }, async (url) => {
    assert.equal((await post(url)).status, 200);
    assert.equal((await post(url)).status, 429);
  });
  await withServer(
    {
      evaluate: async () => {
        throw new Error("secret provider details");
      },
    },
    async (url) => {
      const response = await post(url);
      assert.equal(response.status, 502);
      assert.doesNotMatch(await response.text(), /secret/);
    },
  );
});
test("provider adapter uses structured responses, server-only auth, and store false", async () => {
  const fakeFetch: typeof fetch = async (_url, options) => {
    const body = JSON.parse(options?.body as string);
    assert.equal(body.store, false);
    assert.equal(body.text.format.type, "json_schema");
    assert.equal(body.text.format.strict, true);
    assert.equal(
      (options?.headers as Record<string, string>).Authorization,
      "Bearer test-key",
    );
    assert.equal(body.input.length, 1);
    return Response.json({
      status: "completed",
      output: [
        {
          type: "message",
          content: [
            {
              type: "output_text",
              text: JSON.stringify(examples[0].evaluation),
            },
          ],
        },
      ],
    });
  };
  const result = await createOpenAIEvaluator(
    "test-key",
    "test-model",
    fakeFetch,
  )(examples[0].input, new AbortController().signal);
  assert.equal(result.judgments.length, 4);
});
test("provider refuses incomplete, refusal, malformed, and duplicate-perspective results", async () => {
  const duplicate = structuredClone(examples[0].evaluation);
  duplicate.judgments[1].philosopherId = "kant";
  for (const payload of [
    { status: "incomplete", output: [] },
    {
      status: "completed",
      output: [{ type: "message", content: [{ type: "refusal" }] }],
    },
    {
      status: "completed",
      output: [
        {
          type: "message",
          content: [{ type: "output_text", text: "not json" }],
        },
      ],
    },
    {
      status: "completed",
      output: [
        {
          type: "message",
          content: [{ type: "output_text", text: JSON.stringify(duplicate) }],
        },
      ],
    },
  ]) {
    await assert.rejects(
      createOpenAIEvaluator("test-key", "test-model", async () =>
        Response.json(payload),
      )(examples[0].input, new AbortController().signal),
    );
  }
});
