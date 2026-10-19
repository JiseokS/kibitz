import assert from "node:assert/strict";
import { test } from "node:test";
import {
  alignment,
  averageScore,
  entryInputSchema,
  parseEvaluation,
  type Entry,
  type PhilosopherId,
} from "../src/domain/model";
import { evaluateDemo, examples } from "../src/domain/demo";

function entry(
  id: number,
  resonance: PhilosopherId | null,
  source: Entry["source"] = "ai",
): Entry {
  return {
    id: `${id}`,
    createdAt: new Date().toISOString(),
    input: examples[0].input,
    evaluation: examples[0].evaluation,
    resonance,
    source,
  };
}
test("input trims whitespace and enforces bounds and category", () => {
  assert.equal(
    entryInputSchema.safeParse({
      text: " ".repeat(20),
      category: "relationships",
    }).success,
    false,
  );
  assert.equal(
    entryInputSchema.safeParse({
      text: "a".repeat(2001),
      category: "relationships",
    }).success,
    false,
  );
  assert.equal(
    entryInputSchema.safeParse({
      text: "a".repeat(2000),
      category: "relationships",
    }).success,
    true,
  );
  assert.equal(
    entryInputSchema.safeParse({ text: "hello world", category: "unknown" })
      .success,
    false,
  );
});
test("examples cover all perspectives with contrasting judgments", () => {
  for (const example of examples) {
    const result = parseEvaluation(evaluateDemo(example.input));
    assert.equal(new Set(result.judgments.map((j) => j.philosopherId)).size, 4);
    assert.ok(new Set(result.judgments.map((j) => j.score)).size > 1);
  }
});
test("freeform demo never invents contextual analysis or scores", () => {
  const result = parseEvaluation(
    evaluateDemo({
      text: "I would like to reflect on something I did today.",
      category: "self",
    }),
  );
  assert.equal(averageScore(result), null);
  assert.ok(result.judgments.every((j) => j.score === null));
});
test("AI output rejects duplicate personas and out of range scores", () => {
  const invalid = structuredClone(examples[0].evaluation);
  invalid.judgments[1].philosopherId = "kant";
  assert.throws(() => parseEvaluation(invalid));
  invalid.judgments[0].score = 11;
  assert.throws(() => parseEvaluation(invalid));
});
test("alignment excludes demo and unvoted entries and requires five real votes", () => {
  const result = alignment([
    entry(1, "mill"),
    entry(2, null),
    entry(3, "kant", "demo"),
  ]);
  assert.equal(result.total, 1);
  assert.equal(result.unlocked, false);
  assert.equal(result.rows.find((r) => r.id === "mill")?.percent, 100);
  assert.equal(
    alignment([]).rows.reduce((sum, r) => sum + r.percent, 0),
    0,
  );
});
test("alignment percentages sum to 100 and reflect edits and deletion", () => {
  const entries = [
    entry(1, "kant"),
    entry(2, "mill"),
    entry(3, "aristotle"),
    entry(4, "nietzsche"),
    entry(5, "kant"),
    entry(6, "mill"),
  ];
  assert.equal(alignment(entries).unlocked, true);
  assert.equal(
    alignment(entries).rows.reduce((sum, r) => sum + r.percent, 0),
    100,
  );
  entries[0].resonance = "nietzsche";
  assert.equal(alignment(entries).rows.find((r) => r.id === "kant")?.count, 1);
  assert.equal(alignment(entries.slice(0, 4)).unlocked, false);
});
