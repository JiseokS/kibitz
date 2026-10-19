import { createApiServer, createOpenAIEvaluator } from "./app";
import process from "node:process";

const host = process.env.HOST ?? "127.0.0.1";
const accessToken = process.env.API_ACCESS_TOKEN;
if (
  (process.env.NODE_ENV === "production" ||
    !["127.0.0.1", "localhost", "::1"].includes(host)) &&
  (!accessToken || accessToken.length < 24)
) {
  throw new Error(
    "Public/LAN servers require API_ACCESS_TOKEN with at least 24 characters.",
  );
}
const dailyLimit = Number(process.env.DAILY_LIMIT ?? 100);
if (!Number.isInteger(dailyLimit) || dailyLimit < 1)
  throw new Error("DAILY_LIMIT must be a positive integer.");
const server = createApiServer({
  evaluate: createOpenAIEvaluator(
    process.env.OPENAI_API_KEY ?? "",
    process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  ),
  accessToken,
  dailyLimit,
  origins: (
    process.env.ALLOWED_ORIGINS ?? "http://localhost:8081,http://127.0.0.1:8081"
  )
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean),
});
server.listen(Number(process.env.PORT ?? 8787), host, () =>
  console.log(
    `Kibitz API listening on http://${host}:${process.env.PORT ?? 8787}`,
  ),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
