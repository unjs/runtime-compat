import type { Request as WorkerRequest } from "@cloudflare/workers-types/experimental";
import { runTests } from "../../shared/test.js";
import tests from "../../../vendor/tests.json" assert { type: "json" };

interface Env {
  unsafe: {
    eval: typeof eval;
  };
}
export default {
  async fetch(req: WorkerRequest, env: Env) {
    if (req.method === "HEAD") {
      return new Response(undefined, { status: 200 });
    }
    globalThis.eval = env.unsafe.eval.bind(env.unsafe);
    const data = await runTests(tests);
    return new Response(JSON.stringify(data, undefined, 2));
  },
};
