import { z } from "zod";

export const philosopherIds = [
  "kant",
  "mill",
  "aristotle",
  "nietzsche",
] as const;
export const philosopherIdSchema = z.enum(philosopherIds);
export type PhilosopherId = z.infer<typeof philosopherIdSchema>;
export const categories = ["relationships", "work", "self"] as const;
export const categoryLabels: Record<(typeof categories)[number], string> = {
  relationships: "Relationships",
  work: "Work & study",
  self: "Myself",
};
export const entryInputSchema = z
  .object({
    text: z
      .string()
      .trim()
      .min(10, "Describe what happened in at least 10 characters.")
      .max(2000, "Keep your entry within 2,000 characters."),
    category: z.enum(categories),
  })
  .strict();
export type EntryInput = z.infer<typeof entryInputSchema>;

export const judgmentSchema = z
  .object({
    philosopherId: philosopherIdSchema,
    score: z.number().int().min(0).max(10).nullable(),
    verdict: z.string().min(1).max(100),
    reasoning: z.string().min(1).max(1000),
    question: z.string().min(1).max(300),
  })
  .strict();

export const evaluationSchema = z
  .object({
    title: z.string().min(1).max(80),
    judgments: z.array(judgmentSchema).length(4),
    synthesis: z
      .object({
        tension: z.string().min(1).max(200),
        summary: z.string().min(1).max(1200),
        nextStep: z.string().min(1).max(400),
        uncertainty: z.string().min(1).max(400),
      })
      .strict(),
  })
  .strict();
export type Evaluation = z.infer<typeof evaluationSchema>;

export function parseEvaluation(value: unknown): Evaluation {
  const result = evaluationSchema.parse(value);
  if (new Set(result.judgments.map((item) => item.philosopherId)).size !== 4) {
    throw new Error(
      "An evaluation must include all four philosophers exactly once.",
    );
  }
  return result;
}

export const entrySchema = z
  .object({
    id: z.string().min(1),
    createdAt: z.string().datetime(),
    input: entryInputSchema,
    source: z.enum(["demo", "ai"]),
    evaluation: evaluationSchema,
    resonance: philosopherIdSchema.nullable(),
  })
  .strict();
export type Entry = z.infer<typeof entrySchema>;

export function averageScore(evaluation: Evaluation): string | null {
  const scores = evaluation.judgments.map((j) => j.score);
  if (scores.some((score) => score === null)) return null;
  return (
    (scores as number[]).reduce((a, b) => a + b, 0) / scores.length
  ).toFixed(1);
}

export function alignment(entries: Entry[]) {
  const votes = entries.filter(
    (entry) => entry.source === "ai" && entry.resonance !== null,
  );
  const counts = philosopherIds.map((id) => ({
    id,
    count: votes.filter((entry) => entry.resonance === id).length,
  }));
  // Largest remainders keep whole-number percentages at exactly 100, including ties.
  const parts = counts.map((item) => ({
    ...item,
    raw: votes.length ? (item.count / votes.length) * 100 : 0,
  }));
  const percentages = parts.map((item) => Math.floor(item.raw));
  const remaining = votes.length
    ? 100 - percentages.reduce((a, b) => a + b, 0)
    : 0;
  const order = parts
    .map((item, index) => ({ index, fraction: item.raw % 1 }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let i = 0; i < remaining; i++) percentages[order[i].index]++;
  return {
    total: votes.length,
    unlocked: votes.length >= 5,
    rows: parts.map((item, i) => ({
      id: item.id,
      count: item.count,
      percent: percentages[i],
    })),
  };
}
