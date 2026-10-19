import {
  entryInputSchema,
  parseEvaluation,
  type EntryInput,
} from "../domain/model";
import { getServerOrigin } from "./server-url";

export async function evaluateRemote(
  input: EntryInput,
  options: { url: string; token: string; signal: AbortSignal },
) {
  const origin = getServerOrigin(options.url);
  const response = await fetch(`${origin}/v1/evaluations`, {
    method: "POST",
    signal: options.signal,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: JSON.stringify(entryInputSchema.parse(input)),
  });
  if (!response.ok) {
    const messages: Record<number, string> = {
      400: "Describe the situation in 10–2,000 characters.",
      401: "Check your beta access code.",
      403: "This app cannot access the server from this address.",
      422: "An evaluation is not available for this entry. Try describing the situation differently.",
      429: "Too many requests. Please try again in a minute.",
      503: "The AI server is not ready. Check its configuration and try again.",
      504: "The evaluation timed out. Please try again shortly.",
    };
    throw new Error(
      messages[response.status] ??
        "Could not load the evaluation. Please try again shortly.",
    );
  }
  return parseEvaluation(await response.json());
}
