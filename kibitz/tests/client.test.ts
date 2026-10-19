import assert from "node:assert/strict";
import { test } from "node:test";
import { getServerOrigin } from "../src/services/server-url";
import { evaluateRemote } from "../src/services/evaluate";
import { examples } from "../src/domain/demo";

test("only local development servers can use HTTP", () => {
  for (const url of [
    "http://localhost:8787",
    "http://127.0.0.1:8787",
    "http://10.0.2.2:8787",
    "http://192.168.0.2:8787",
    "https://api.example.com",
  ]) {
    assert.equal(getServerOrigin(url), url);
  }
  for (const url of [
    "http://example.com",
    "http://10.evil.example",
    "http://192.168.evil.example",
    "https://user:password@example.com",
    "https://example.com/path",
    "https://example.com?token=secret",
    "ftp://example.com",
  ]) {
    assert.throws(() => getServerOrigin(url));
  }
});

test("client sends only the current entry and validates the result", async () => {
  const original = globalThis.fetch;
  const controller = new AbortController();
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://api.example.com/v1/evaluations");
    assert.deepEqual(JSON.parse(options?.body as string), examples[0].input);
    assert.equal(options?.signal, controller.signal);
    assert.equal(
      (options?.headers as Record<string, string>).Authorization,
      "Bearer test-access-code",
    );
    return Response.json(examples[0].evaluation);
  };
  try {
    const result = await evaluateRemote(examples[0].input, {
      url: "https://api.example.com",
      token: "test-access-code",
      signal: controller.signal,
    });
    assert.equal(result.judgments.length, 4);
  } finally {
    globalThis.fetch = original;
  }
});

test("client surfaces API errors and never converts them to demo results", async () => {
  const original = globalThis.fetch;
  try {
    for (const status of [401, 422, 429, 503, 504]) {
      globalThis.fetch = async () =>
        Response.json({ error: "internal" }, { status });
      await assert.rejects(
        evaluateRemote(examples[0].input, {
          url: "https://api.example.com",
          token: "",
          signal: new AbortController().signal,
        }),
      );
    }
    globalThis.fetch = async () => Response.json({ judgments: [] });
    await assert.rejects(
      evaluateRemote(examples[0].input, {
        url: "https://api.example.com",
        token: "",
        signal: new AbortController().signal,
      }),
    );
  } finally {
    globalThis.fetch = original;
  }
});
