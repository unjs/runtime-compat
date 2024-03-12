import { runTests } from "../../shared/test.js";
import tests from "../../../vendor/tests.json";

const data = await runTests(tests, undefined, Boolean(process.env.DEBUG));
console.log(JSON.stringify(data, undefined, 2));
