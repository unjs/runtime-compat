import { runTests } from "../../shared/test.js";
import tests from "../../../vendor/tests.json";

// eslint-disable-next-line unicorn/prefer-top-level-await
runTests(tests).then((data) => {
  console.log("RUNTIME_DATA_START");
  console.log(JSON.stringify(data, undefined, 2));
});
