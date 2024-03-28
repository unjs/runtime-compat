import { runTests, formatResults } from "../../shared/test.js";
import tests from "../../../vendor/tests.json";

const results = await runTests(tests);
const data = formatResults(
  results,
  { name: "node", version: process.version.replace('v', '') },
  tests.__version,
);
console.log(JSON.stringify(data, undefined, 2));
