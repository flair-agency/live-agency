import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOTS = ["packages/lark-transport/src", "providers/lark-base/src", "providers/lark-chat/src",
  "mcp/operations/src", "runtime/scripts", "skills"];
const METHODS = /\b(listFields|listRecords|batchUpdate|batchCreate|batchDelete|appendAttachment|uploadMedia|downloadAttachment|attachmentSha256|temporaryDownloadUrl|fromResolvedApiPrincipal|fromCredentialReference|createLarkBaseClient|createLarkApiTransportForPrincipal|createLarkCliUserApiTransportForPrincipal)\s*\(/g;
const SIGNAL = /\/open-apis\/|\bLarkClient\b|\blark-cli\b|\bLARK_(?:APP_ID|TENANT_ACCESS_TOKEN)\b/;
const PACKAGES = {
  "@flair-agency/lark-transport": "packages/lark-transport/src/index.js",
  "@flair-agency/lark-chat-provider": "providers/lark-chat/src/index.js",
  "@flair-agency/lark-base-provider": "providers/lark-base/src/index.js",
};
const EXCLUDED = new Set(["runtime/scripts/m2u-call-site-inventory.mjs", "runtime/scripts/smoke-test.mjs", "runtime/scripts/v2-contract-test.mjs"]);

async function sourceFiles(root, relative) {
  const result = [];
  for (const entry of await readdir(path.join(root, relative), { withFileTypes: true })) {
    if (["node_modules", ".git", "test", "test-support", "runtime-data"].includes(entry.name) || entry.isSymbolicLink()) continue;
    const file = `${relative}/${entry.name}`;
    if (entry.isDirectory()) result.push(...await sourceFiles(root, file));
    else if (/\.(mjs|js|py|sh)$/.test(file) && !/\.test\./.test(file) && !EXCLUDED.has(file)) result.push(file);
  }
  return result;
}

function category(file) {
  if (file.startsWith("packages/lark-transport/")) return "shared-core";
  if (file.startsWith("providers/lark-base/")) return "base-provider";
  if (file.startsWith("providers/lark-chat/")) return "chat-provider";
  if (file.startsWith("mcp/operations/")) return "domain-mcp";
  if (file.startsWith("runtime/scripts/")) return "composition-entry-or-helper";
  if (file.includes("/skills/_shared/")) return "shared-skill-adapter";
  const skill = file.match(/\/skills\/([^/]+)\//)?.[1];
  if (skill) return `skill:${skill}`;
  return "unclassified";
}

export async function buildM2uCallSiteInventory(root) {
  const files = (await Promise.all(ROOTS.map((relative) => sourceFiles(root, relative)))).flat().sort();
  const sources = new Map(await Promise.all(files.map(async (file) => [file, await readFile(path.join(root, file), "utf8")])));
  const entries = new Map();
  for (const [file, source] of sources) {
    const signals = [];
    const lines = source.split("\n");
    let symbol = "module";
    for (const [index, line] of lines.entries()) {
      const declared = line.match(/(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\(/)
        ?? line.match(/^\s*(?:static\s+)?(?:async\s+)?(\w+)\s*\([^;]*\)\s*\{/);
      if (declared && !["if", "for", "while", "switch", "catch"].includes(declared[1])) symbol = declared[1];
      for (const match of line.matchAll(METHODS)) signals.push({ line: index + 1, enclosingSymbolHint: symbol, kind: "client-or-factory", operationHint: match[1] });
      if (SIGNAL.test(line)) signals.push({ line: index + 1, enclosingSymbolHint: symbol, kind: "api-or-auth-marker" });
    }
    const imports = [];
    for (const match of source.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)["']([^"']+)["']/g)) {
      const specifier = match[1];
      const target = specifier.startsWith(".") ? path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier)) : PACKAGES[specifier];
      if (target && sources.has(target)) imports.push(target);
    }
    entries.set(file, { file, category: category(file), sourceSha256: createHash("sha256").update(source).digest("hex"),
      signals, imports: [...new Set(imports)].sort(), directMarker: signals.length > 0 });
  }
  const included = new Set([...entries.values()].filter((entry) => entry.directMarker).map((entry) => entry.file));
  let changed = true;
  while (changed) {
    changed = false;
    for (const entry of entries.values()) {
      if (!included.has(entry.file) && entry.imports.some((file) => included.has(file))) {
        included.add(entry.file); changed = true;
      }
    }
  }
  const callers = [...included].sort().map((file) => {
    const entry = entries.get(file);
    return { ...entry, dependencies: entry.imports.filter((target) => included.has(target)) };
  });
  return {
    contractVersion: "m2u-call-site-inventory/v1", roots: ROOTS,
    coverage: "lexical API/client markers plus static local/package import closure; manual review and deployment inventory required",
    exclusions: ["tests", "node_modules", "runtime-data", "other providers without Lark dependencies", "installed copies and private deployed runners require separate evidence"],
    scannedFileCount: files.length, callerCount: callers.length,
    directMarkerFileCount: callers.filter((entry) => entry.directMarker).length,
    unclassified: callers.filter((entry) => entry.category === "unclassified").map((entry) => entry.file),
    callers,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  process.stdout.write(`${JSON.stringify(await buildM2uCallSiteInventory(root), null, 2)}\n`);
}
