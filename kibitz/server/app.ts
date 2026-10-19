import { createServer, type IncomingMessage } from "node:http";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import {
  entryInputSchema,
  evaluationSchema,
  parseEvaluation,
  type EntryInput,
  type Evaluation,
} from "../src/domain/model";
import { instructions } from "./prompt";

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
type Evaluate = (input: EntryInput, signal: AbortSignal) => Promise<Evaluation>;
type Options = {
  evaluate: Evaluate;
  accessToken?: string;
  origins?: string[];
  perMinute?: number;
  dailyLimit?: number;
};

export function createOpenAIEvaluator(
  apiKey: string,
  model = "gpt-4o-mini",
  fetcher: typeof fetch = fetch,
): Evaluate {
  return async (input, signal) => {
    if (!apiKey) throw new HttpError(503, "AI is not configured");
    const response = await fetcher("https://api.openai.com/v1/responses", {
      method: "POST",
      signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        store: false,
        instructions,
        input: [{ role: "user", content: JSON.stringify(input) }],
        max_output_tokens: 4000,
        text: {
          format: {
            type: "json_schema",
            name: "philosophical_evaluation",
            strict: true,
            schema: z.toJSONSchema(evaluationSchema),
          },
        },
      }),
    });
    if (!response.ok)
      throw new HttpError(
        response.status === 429 ? 429 : 502,
        "AI service unavailable",
      );
    const data = (await response.json()) as {
      status?: string;
      output?: { type: string; content?: { type: string; text?: string }[] }[];
    };
    if (data.status !== "completed")
      throw new HttpError(502, "AI response incomplete");
    const content =
      data.output
        ?.filter((item) => item.type === "message")
        .flatMap((item) => item.content ?? []) ?? [];
    if (content.some((item) => item.type === "refusal"))
      throw new HttpError(422, "Unable to evaluate this entry");
    const text = content
      .filter((item) => item.type === "output_text")
      .map((item) => item.text ?? "")
      .join("");
    try {
      return parseEvaluation(JSON.parse(text));
    } catch {
      throw new HttpError(502, "Invalid AI response");
    }
  };
}

function readBody(request: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    request.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > 16_384) {
        reject(new HttpError(413, "Request too large"));
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      if (size > 16_384) return;
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new HttpError(400, "Invalid JSON"));
      }
    });
    request.on("error", reject);
    request.on("aborted", () => reject(new HttpError(400, "Request aborted")));
  });
}

function tokenMatches(actual: string, expected: string) {
  const a = Buffer.from(actual);
  const b = Buffer.from(`Bearer ${expected}`);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createApiServer(options: Options) {
  const clients = new Map<string, { count: number; reset: number }>();
  let active = 0;
  let daily = { day: "", count: 0 };
  const server = createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    const reply = (status: number, body: unknown) => {
      if (!res.destroyed) {
        res.writeHead(status);
        res.end(JSON.stringify(body));
      }
    };
    try {
      const origin = req.headers.origin;
      if (origin && !(options.origins ?? []).includes(origin))
        throw new HttpError(403, "Origin not allowed");
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
      }
      if (req.method === "OPTIONS") {
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization",
        );
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.writeHead(204);
        res.end();
        return;
      }
      if (req.url === "/health" && req.method === "GET") {
        reply(200, { ok: true });
        return;
      }
      if (req.url !== "/v1/evaluations") throw new HttpError(404, "Not found");
      if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        throw new HttpError(405, "Method not allowed");
      }
      if (
        options.accessToken &&
        !tokenMatches(req.headers.authorization ?? "", options.accessToken)
      )
        throw new HttpError(401, "Unauthorized");
      if (!req.headers["content-type"]?.startsWith("application/json"))
        throw new HttpError(415, "Expected application/json");
      const now = Date.now();
      for (const [key, value] of clients)
        if (value.reset <= now) clients.delete(key);
      // Do not trust arbitrary X-Forwarded-For headers. Behind a proxy this is intentionally a shared limit.
      const key = req.socket.remoteAddress ?? "unknown";
      if (clients.size >= 10_000 && !clients.has(key))
        throw new HttpError(429, "Server busy");
      const client = clients.get(key) ?? { count: 0, reset: now + 60_000 };
      if (++client.count > (options.perMinute ?? 10)) {
        res.setHeader("Retry-After", "60");
        throw new HttpError(429, "Rate limit reached");
      }
      clients.set(key, client);
      const parsed = entryInputSchema.safeParse(await readBody(req));
      if (!parsed.success)
        throw new HttpError(
          400,
          "Entry must contain 10-2000 characters and a valid category",
        );
      const day = new Date().toISOString().slice(0, 10);
      if (daily.day !== day) daily = { day, count: 0 };
      if (daily.count >= (options.dailyLimit ?? 100) || active >= 4)
        throw new HttpError(429, "Server limit reached");
      daily.count++;
      active++;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45_000);
      const disconnect = () => {
        if (!res.writableEnded) controller.abort();
      };
      res.on("close", disconnect);
      try {
        reply(
          200,
          parseEvaluation(
            await options.evaluate(parsed.data, controller.signal),
          ),
        );
      } catch (error) {
        if (controller.signal.aborted)
          throw new HttpError(504, "Evaluation timed out");
        throw error;
      } finally {
        clearTimeout(timeout);
        res.off("close", disconnect);
        active--;
      }
    } catch (error) {
      const known = error instanceof HttpError;
      reply(known ? error.status : 502, {
        error: known ? error.message : "Unable to complete evaluation",
      });
    }
  });
  server.requestTimeout = 15_000;
  server.headersTimeout = 10_000;
  return server;
}
