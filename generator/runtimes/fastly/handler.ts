/// <reference types="@fastly/js-compute" />

import { env } from "fastly:env";
import { runTests } from "../../shared/test.js";
import tests from "../../../vendor/tests.json" assert { type: "json" };
// eslint-disable-next-line no-undef
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

// eslint-disable-next-line require-await
async function handleRequest(event: FetchEvent) {
  if (event.request.method === "HEAD") {
    return new Response(undefined, { status: 200 });
  }
  const data = await runTests(tests, undefined, Boolean(env("DEBUG")));
  return new Response(JSON.stringify(data, undefined, 2));
}
