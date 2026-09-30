import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

try { process.loadEnvFile(".env.local"); } catch {}

if (!process.env.DATABASE_URL) {
  throw new Error("Set DATABASE_URL before running npm run db:init");
}

const sql = neon(process.env.DATABASE_URL);
const migrationsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../db/migrations");
for (const filename of (await readdir(migrationsDir)).filter((item) => item.endsWith(".sql")).sort()) {
  const source = await readFile(path.join(migrationsDir, filename), "utf8");
  for (const statement of source.split(";").map((item) => item.trim()).filter(Boolean)) {
    await sql.query(statement);
  }
  console.log(`Applied ${filename}`);
}
console.log("Database schema is ready.");
