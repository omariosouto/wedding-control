import fs from "fs";
import path from "path";

const DB_PATH = path.resolve("_db", "data.json");
const DATA = JSON.parse(fs.readFileSync(DB_PATH, { encoding: "utf-8" }));

export function database() {
  return DATA;
}