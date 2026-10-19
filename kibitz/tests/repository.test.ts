import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createRepository,
  STORAGE_KEY,
  LEGACY_STORAGE_KEY,
} from "../src/data/repository";
import { examples } from "../src/domain/demo";
import type { Entry } from "../src/domain/model";
function makeEntry(id: string): Entry {
  return {
    id,
    createdAt: new Date().toISOString(),
    source: "ai",
    input: examples[0].input,
    evaluation: examples[0].evaluation,
    resonance: null,
  };
}
function memory() {
  const items = new Map<string, string>();
  let fail = false;
  let failCleanup = false;
  return {
    getItem: async (key: string) => items.get(key) ?? null,
    setItem: async (key: string, value: string) => {
      if (fail) throw new Error("Storage full");
      items.set(key, value);
    },
    removeItem: async (key: string) => {
      if (failCleanup) throw new Error("Cleanup failed");
      items.delete(key);
    },
    fail: (value: boolean) => {
      fail = value;
    },
    corrupt: () => {
      items.set(STORAGE_KEY, "{bad-json");
    },
    failCleanup: (value: boolean) => {
      failCleanup = value;
    },
  };
}
test("serial writes preserve both concurrent entries, votes survive relaunch", async () => {
  const storage = memory();
  const repo = createRepository(storage);
  await repo.load();
  await Promise.all([repo.add(makeEntry("1")), repo.add(makeEntry("2"))]);
  await repo.resonate("1", "mill");
  const persisted = await createRepository(storage).load();
  assert.equal(persisted.length, 2);
  assert.equal(persisted.find((e) => e.id === "1")?.resonance, "mill");
  await repo.remove("1");
  assert.equal((await repo.load()).length, 1);
  await repo.clear();
  assert.deepEqual(await repo.load(), []);
});
test("write failure does not advance snapshot; retry does not duplicate entry", async () => {
  const storage = memory();
  const repo = createRepository(storage);
  await repo.load();
  await repo.add(makeEntry("1"));
  storage.fail(true);
  await assert.rejects(repo.add(makeEntry("2")));
  storage.fail(false);
  assert.equal((await createRepository(storage).load()).length, 1);
  await repo.add(makeEntry("2"));
  await repo.add(makeEntry("2"));
  assert.equal((await repo.load()).length, 2);
});
test("corrupt storage stays untouched and blocks writes", async () => {
  const storage = memory();
  storage.corrupt();
  const repo = createRepository(storage);
  await assert.rejects(repo.load());
  await assert.rejects(repo.add(makeEntry("1")));
  assert.equal(await storage.getItem(STORAGE_KEY), "{bad-json");
});

function legacyRecord(category: string = "관계") {
  const entry = makeEntry("legacy-1");
  return {
    ...entry,
    input: { text: "My original journal text remains untouched.", category },
    resonance: "mill",
  };
}

test("legacy journals migrate category IDs while preserving content, identity and votes", async () => {
  for (const [oldCategory, category] of [
    ["관계", "relationships"],
    ["일과 공부", "work"],
    ["나 자신", "self"],
  ]) {
    const storage = memory();
    const old = legacyRecord(oldCategory);
    await storage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify({ version: 1, entries: [old] }),
    );
    const entries = await createRepository(storage).load();
    assert.deepEqual(entries[0], { ...old, input: { ...old.input, category } });
    assert.equal(JSON.parse((await storage.getItem(STORAGE_KEY))!).version, 2);
    assert.equal(await storage.getItem(LEGACY_STORAGE_KEY), null);
    assert.equal((await createRepository(storage).load()).length, 1);
  }
});

test("failed migration leaves the only copy intact and blocks new writes", async () => {
  const storage = memory();
  const raw = JSON.stringify({ version: 1, entries: [legacyRecord()] });
  await storage.setItem(LEGACY_STORAGE_KEY, raw);
  storage.fail(true);
  const repo = createRepository(storage);
  await assert.rejects(repo.load());
  await assert.rejects(repo.add(makeEntry("new")));
  assert.equal(await storage.getItem(LEGACY_STORAGE_KEY), raw);
  assert.equal(await storage.getItem(STORAGE_KEY), null);
  storage.fail(false);
  assert.equal((await repo.load())[0].id, "legacy-1");
});

test("interrupted legacy cleanup is retried without duplicate migration", async () => {
  const storage = memory();
  await storage.setItem(
    LEGACY_STORAGE_KEY,
    JSON.stringify({ version: 1, entries: [legacyRecord()] }),
  );
  storage.failCleanup(true);
  const repo = createRepository(storage);
  await assert.rejects(repo.load());
  assert.ok(await storage.getItem(STORAGE_KEY));
  assert.ok(await storage.getItem(LEGACY_STORAGE_KEY));
  storage.failCleanup(false);
  assert.equal((await repo.load()).length, 1);
  assert.equal(await storage.getItem(LEGACY_STORAGE_KEY), null);
  await repo.clear();
  assert.deepEqual(await createRepository(storage).load(), []);
});

test("empty Kibitz journal takes priority over a stale legacy journal", async () => {
  const storage = memory();
  await storage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: 2, entries: [] }),
  );
  await storage.setItem(
    LEGACY_STORAGE_KEY,
    JSON.stringify({ version: 1, entries: [legacyRecord()] }),
  );
  assert.deepEqual(await createRepository(storage).load(), []);
  assert.equal(await storage.getItem(LEGACY_STORAGE_KEY), null);
});

test("invalid legacy data is preserved instead of becoming an empty journal", async () => {
  const storage = memory();
  const raw = JSON.stringify({
    version: 1,
    entries: [legacyRecord("unknown")],
  });
  await storage.setItem(LEGACY_STORAGE_KEY, raw);
  const repo = createRepository(storage);
  await assert.rejects(repo.load());
  await assert.rejects(repo.clear());
  assert.equal(await storage.getItem(LEGACY_STORAGE_KEY), raw);
  assert.equal(await storage.getItem(STORAGE_KEY), null);
});
