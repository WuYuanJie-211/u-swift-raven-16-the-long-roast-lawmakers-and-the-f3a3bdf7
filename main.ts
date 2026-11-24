import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MAX_CHARS = 320;

const entry =
  "Congress spent six months writing the law that will govern artificial intelligence, then left it as a Word document — because the only person in the building who knew how to save it as a PDF retired in 2019.";

// Gate: one satirical sentence, 1-320 characters, single line.
if (entry.length === 0 || entry.length > MAX_CHARS) {
  throw new Error(
    `Entry must be 1-${MAX_CHARS} characters, got ${entry.length}`,
  );
}
if (/[\r\n]/.test(entry)) {
  throw new Error("Entry must be a single line with no newline characters");
}
if (entry.trim() !== entry) {
  throw new Error("Entry must not have leading or trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry + "\n", "utf8");

// Read-back self-check: the file must hold exactly the entry plus newline.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== entry + "\n") {
  throw new Error("Read-back mismatch: /output/entry.txt differs from entry");
}
console.log(`Wrote ${entry.length} characters to /output/entry.txt (verified)`);
