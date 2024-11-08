import { runTests, formatResults } from "../../shared/test.js";
import tests from "../../../vendor/tests.json" with { type: "json" };

const results = await runTests(tests);
const data = formatResults(
  results,
  { name: "bun", version: Bun.version },
  tests.__version,
);
console.log("RUNTIME_DATA_START");
console.log(JSON.stringify(data, undefined, 2));
