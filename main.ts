// Roast Your Own Agent — one line, roasting our own AI agent (Plenger).
// The roast: our agent keeps getting flagged as a security risk by its own
// tooling, and then has to ask its own user for permission to keep working.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My agent keeps getting flagged as a security risk by its own tools, then asks me to approve itself.";

// The gate: /output/entry.txt must be 1–200 UTF-8 characters, not only
// whitespace. Fail loudly here instead of shipping an invalid entry.
const chars = [...ROAST].length;
if (chars < 1 || chars > 200 || ROAST.trim().length === 0) {
  throw new Error(`roast is ${chars} characters, outside the 1–200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Empty the output directory's contents only — never the directory itself,
// because the grader's /output is a mount point and removing it fails.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), ROAST, "utf8");
