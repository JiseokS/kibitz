export function getServerOrigin(value: string): string {
  const url = new URL(value.trim());
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error(
      "Enter only the server origin, such as https://api.example.com.",
    );
  }
  const parts = url.hostname.split(".");
  const ipv4 =
    parts.length === 4 &&
    parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255);
  const numbers = parts.map(Number);
  const privateIp =
    ipv4 &&
    (numbers[0] === 10 ||
      (numbers[0] === 192 && numbers[1] === 168) ||
      (numbers[0] === 172 && numbers[1] >= 16 && numbers[1] <= 31));
  const local =
    ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) || privateIp;
  if (url.protocol !== "https:" && !local)
    throw new Error("Use an HTTPS address for a remote server.");
  return url.origin;
}
