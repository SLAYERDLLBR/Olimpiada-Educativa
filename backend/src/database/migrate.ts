import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { db } from "./connection.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const schema = readFileSync(join(__dirname, "schema.sql"), "utf-8");

db.exec(schema);
console.log("Schema applied.");
db.close();
