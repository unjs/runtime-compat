import { runTests, formatResults } from "../../shared/test.js";
import tests from "../../../vendor/tests.json";

const results = await runTests(tests);
const data = formatResults(
  results,
  { name: "winterjs", version: process.version.replace("WinterJS ", "") },
  tests.__version,
);
console.log("RUNTIME_DATA_START");
console.log(JSON.stringify(data, undefined, 2));
