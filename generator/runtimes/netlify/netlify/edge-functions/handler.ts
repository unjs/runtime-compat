import { runTests, formatResults } from "../../../../shared/test.ts";
import tests from "../../../../../vendor/tests.json" with { type: "json" };
import { alerts, gpu, storage } from "../../../../shared/features.ts";

export default async function handler(request: Request) {
  if (request.method === "HEAD") {
    return new Response(undefined, { status: 200 });
  }
  const results = await runTests(tests, [...gpu, ...storage, ...alerts]);
  const data = formatResults(
    results,
    { name: "netlify", version: Netlify.env.get("NETLIFY_CLI_VERSION") },
    tests.__version,
  );
  return new Response(JSON.stringify(data, undefined, 2));
}

export const config = {
  path: "/*",
};
