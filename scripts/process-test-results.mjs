// @ts-check
import { readdir, writeFile } from "node:fs/promises";
import bcd from "@mdn/browser-compat-data" assert { type: "json" };
import packageJson from "../packages/runtime-compat-data/package.json" assert { type: "json" };
import { deepCreate, get } from "./traverse-utils.mjs";

const runtimeDir = new URL("../generator/runtimes", import.meta.url);

/**
 * @param {import("../vendor/types").Report} report
 * @returns {Array<string>}
 */
function getSupportedApis(report) {
  const passes = [];
  for (const test of report.results["."]) {
    if (test.result) {
      passes.push(test.name);
    }
  }
  return passes;
}

const runtimes = await readdir(runtimeDir);
const runtimeVersions = {};
/** @type {Record<string, Set<string>>} */
const support = {};
for (const runtime of runtimes) {
  console.log(`Processing results for ${runtime}...`);
  const { default: data } = await import(`../generator/runtimes/${runtime}/data.json`, {
    assert: { type: "json" },
  });
  runtimeVersions[runtime] = data.userAgent.split('/')[1];
  support[runtime] = new Set(getSupportedApis(data));
}
const union = new Set(
  Object.values(support)
    .flatMap((set) => [...set])
    .sort(),
);

const compat = {};

for (const feature of union) {
  const entry = deepCreate(compat, feature);
  if (!entry.__compat) {
    const browserCompat = get(bcd, `${feature}.__compat`) ?? {};
    entry.__compat = {
      ...browserCompat,
      support: Object.fromEntries(
        runtimes.map((runtime) => [
          runtime,
          {
            version_added: support[runtime].has(feature),
          },
        ]),
      ),
    };
  }
}

await writeFile(
  new URL("../packages/runtime-compat-data/runtimes.d.ts", import.meta.url),
  /* ts */ `/**
 * The WinterCG runtime key
 */
export type RuntimeName =
${runtimes.map((runtime) => `  | "${runtime}"`).join("\n")};
`,
);

await writeFile(
  new URL("../packages/runtime-compat-data/data.json", import.meta.url),
  JSON.stringify({
    __version: {
      __package: packageJson.version,
      ...runtimeVersions
    },
    ...compat
  }),
);
