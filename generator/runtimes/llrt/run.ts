import { runTests, formatResults } from "../../shared/test.js";
import tests from "../../../vendor/tests.json";

// eslint-disable-next-line unicorn/prefer-top-level-await
runTests(tests).then((results) => {
  const data = formatResults(
    results,
    { name: "llrt", version: process.version },
    tests.__version,
  );
  console.log(JSON.stringify(data, undefined, 2));
});
