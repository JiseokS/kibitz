import { z } from "zod";
import {
  entryInputSchema,
  entrySchema,
  parseEvaluation,
  type Entry,
  type PhilosopherId,
} from "../domain/model";

export const STORAGE_KEY = "@kibitz/journal/v2";
export const LEGACY_STORAGE_KEY = "@agora/journal/v1";
const journalSchema = z
  .object({ version: z.literal(2), entries: z.array(entrySchema) })
  .strict();
const legacyCategoryIds = {
  관계: "relationships",
  "일과 공부": "work",
  "나 자신": "self",
} as const;
const legacyEntrySchema = entrySchema.extend({
  input: entryInputSchema.extend({
    category: z.enum(["관계", "일과 공부", "나 자신"]),
  }),
});
const legacyJournalSchema = z
  .object({ version: z.literal(1), entries: z.array(legacyEntrySchema) })
  .strict();

export interface KeyValueStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

function validateEntries(entries: Entry[]) {
  entries.forEach((entry) => parseEvaluation(entry.evaluation));
  if (new Set(entries.map((entry) => entry.id)).size !== entries.length) {
    throw new Error("Duplicate journal entries were found.");
  }
  return entries;
}

export function createRepository(storage: KeyValueStorage) {
  let snapshot: Entry[] = [];
  let ready = false;
  let queue: Promise<unknown> = Promise.resolve();
  function enqueue<T>(work: () => Promise<T>): Promise<T> {
    const operation = queue.then(work);
    queue = operation.catch(() => undefined);
    return operation;
  }
  function mutate(transform: (entries: Entry[]) => Entry[]): Promise<Entry[]> {
    return enqueue(async () => {
      if (!ready) throw new Error("Load your journal before making changes.");
      const next = transform(snapshot);
      await storage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: 2, entries: next }),
      );
      snapshot = next;
      return [...snapshot];
    });
  }
  return {
    load(): Promise<Entry[]> {
      return enqueue(async () => {
        ready = false;
        const raw = await storage.getItem(STORAGE_KEY);
        const legacy = await storage.getItem(LEGACY_STORAGE_KEY);
        let entries: Entry[];
        if (raw !== null) {
          entries = validateEntries(
            journalSchema.parse(JSON.parse(raw)).entries,
          );
        } else if (legacy !== null) {
          entries = validateEntries(
            legacyJournalSchema
              .parse(JSON.parse(legacy))
              .entries.map((entry) => ({
                ...entry,
                input: {
                  ...entry.input,
                  category: legacyCategoryIds[entry.input.category],
                },
              })),
          );
          // Commit the validated copy first. Never remove the only copy of a journal.
          await storage.setItem(
            STORAGE_KEY,
            JSON.stringify({ version: 2, entries }),
          );
        } else {
          entries = [];
        }
        // Retry cleanup after an interrupted migration. The new namespace wins even when empty.
        if (legacy !== null) await storage.removeItem(LEGACY_STORAGE_KEY);
        snapshot = entries;
        ready = true;
        return [...snapshot];
      });
    },
    add(entry: Entry) {
      entrySchema.parse(entry);
      parseEvaluation(entry.evaluation);
      return mutate((entries) => [
        entry,
        ...entries.filter((item) => item.id !== entry.id),
      ]);
    },
    resonate(id: string, resonance: PhilosopherId | null) {
      return mutate((entries) =>
        entries.map((entry) =>
          entry.id === id ? { ...entry, resonance } : entry,
        ),
      );
    },
    remove(id: string) {
      return mutate((entries) => entries.filter((entry) => entry.id !== id));
    },
    clear() {
      return mutate(() => []);
    },
  };
}
