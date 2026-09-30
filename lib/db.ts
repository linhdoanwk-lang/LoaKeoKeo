import "server-only";
import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | null = null;

function getClient() {
  if (client) return client;
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  let hostname = "";
  try { hostname = new URL(connectionString).hostname.toLowerCase(); } catch { throw new Error("DATABASE_URL is invalid"); }
  if (!hostname || hostname === "host" || hostname.includes("example")) {
    throw new Error("DATABASE_URL is still using a placeholder host");
  }
  client = neon(connectionString);
  return client;
}

export async function query<T extends Record<string, unknown>>(text: string, params: unknown[] = []) {
  return getClient().query(text, params) as Promise<T[]>;
}
