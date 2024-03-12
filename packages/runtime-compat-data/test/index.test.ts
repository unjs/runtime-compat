/* eslint-disable yield-star-spacing */
import { expect, it, describe } from "vitest";
import data from ".." assert { type: "json" };

function* walk(obj: any, path: string[] = []): Generator<[string[], any]> {
  for (const key in obj) {
    const value = obj[key];
    const currentPath = [...path, key];
    if (typeof value === "object") {
      yield [currentPath, value];
      if (key !== "__compat") {
        yield* walk(value, currentPath);
      }
    }
  }
}

const skipKeys = new Set([
  "api",
  "javascript",
  "javascript.builtins",
  "api.ReadableStream",
  "api.WebSocket",
  "api.ReadableStreamDefaultReader",
  "api.PerformanceResourceTiming",
  "javascript.builtins.Intl.NumberFormat.NumberFormat.options_parameter",
  "javascript.builtins.Intl.RelativeTimeFormat.RelativeTimeFormat.options_parameter",
]);

describe("runtime-compat-data", () => {
  it("generates valid data", () => {
    for (const [path, value] of walk(data)) {
      const key = path.join(".");
      if (path.at(-1) === "__compat") {
        expect(Object.keys(value.support ?? {}), `${key}.support`).toEqual([
          "bun",
          "deno",
          "edge-light",
          "fastly",
          "netlify",
          "node",
          "winterjs",
          "workerd",
        ]);
      } else if (!skipKeys.has(key)) {
        expect("__compat" in value, key).toBeTruthy();
      }
    }
  });
});
