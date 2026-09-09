import { DatabaseSync } from "node:sqlite";
import { env } from "../config/env.js";

// Built into Node 22.5+ — no native compilation, no external dependency,
// nothing to install. That's the whole point after Postgres and MySQL both
// needed a local server the user couldn't get installed.
export const db = new DatabaseSync(env.databaseUrl);
db.exec("PRAGMA foreign_keys = ON");
db.exec("PRAGMA journal_mode = WAL");

/** Postgres-style `$1, $2, ...` → SQLite's positional `?`. Safe because no
 * query in this project reuses the same `$N` twice — params stay in order. */
export function toSqlitePlaceholders(text: string): string {
  return text.replace(/\$\d+/g, "?");
}

/**
 * Thin wrapper matching the shape callers already use (`{ rows }`), so
 * switching drivers didn't require touching every call site. `node:sqlite`
 * is synchronous under the hood — this stays `async` only to keep the
 * interface the rest of the code already expects.
 */
export async function query<T = unknown>(text: string, params: unknown[] = []): Promise<{ rows: T[] }> {
  const sql = toSqlitePlaceholders(text);
  const stmt = db.prepare(sql);

  if (/^\s*select/i.test(sql)) {
    return { rows: stmt.all(...(params as never[])) as T[] };
  }

  stmt.run(...(params as never[]));
  return { rows: [] };
}
