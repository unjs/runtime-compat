import { runTests } from "../../shared/test.js";
import tests from "../../../vendor/tests.json";

const data = await runTests(tests);
console.log(JSON.stringify(data, undefined, 2));
