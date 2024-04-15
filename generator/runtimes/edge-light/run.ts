import { EdgeRuntime } from "edge-runtime";
import { runTests } from "../../shared/test.js";
import tests from "../../../vendor/tests.json" assert { type: "json" };
const runtime = new EdgeRuntime();
globalThis.eval = runtime.evaluate.bind(runtime);

const data = await runTests(tests);
console.log("RUNTIME_DATA_START");
console.log(JSON.stringify(data, undefined, 2));
