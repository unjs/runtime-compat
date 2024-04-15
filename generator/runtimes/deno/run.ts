import { runTests, formatResults } from "../../shared/test.ts";
import tests from "../../../vendor/tests.json" assert { type: "json" };
import { gpu } from "../../shared/features.ts";

const results = await runTests(tests, gpu);
const data = formatResults(
  results,
  { name: "deno", version: Deno.version.deno },
  tests.__version,
);
console.log("RUNTIME_DATA_START");
console.log(JSON.stringify(data, undefined, 2));
