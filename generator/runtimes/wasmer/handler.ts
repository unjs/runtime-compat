import { runTests, formatResults } from "../../shared/test.js";
import tests from "../../../vendor/tests.json" assert { type: "json" };
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event: FetchEvent) {
  if (event.request.method === "HEAD") {
    return new Response(undefined, { status: 200 });
  }
  const results = await runTests(tests);
  const data = formatResults(
    results,
    { name: "wasmer", version: "(unknown)" }, // XXX get wasmer/winterjs version
    tests.__version,
  );
  return new Response(JSON.stringify(data, undefined, 2));
}
