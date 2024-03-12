import { runTests } from "../../../../shared/test.ts";
import tests from "../../../../../vendor/tests.json" assert { type: "json" };
import { alerts, gpu, storage } from "../../../../shared/features.ts";
export default async function handler(request: Request) {
  if (request.method === "HEAD") {
    return new Response(undefined, { status: 200 });
  }
  const data = await runTests(
    tests,
    [...gpu, ...storage, ...alerts],
    Boolean(Netlify.env.get("DEBUG"))
  );
  return new Response(JSON.stringify(data, undefined, 2));
}

export const config = {
  path: "/*",
};
