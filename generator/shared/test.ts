import Tests from "../../vendor/tests.ts";
import type { Test, TestResult } from "../../vendor/types.ts";
// @ts-ignore
import setup from "../../vendor/harness.js";

declare global {
  // eslint-disable-next-line no-var
  var bcd: {
    addTest: (ident: string, tests: any, exposure: string[]) => void;
    go: (callback: (done: TestResult[]) => void) => void;
  };
}

export interface TestConfig {
  __resources: unknown;
  [name: `${string}.${string}`]: Test;
}

export function runTests(
  tests: TestConfig,
  ignoreApis?: Array<string>,
  debug = false
): Promise<Array<string>> {
  setup(globalThis);
  // The incoming types are problematic
  const testCases = new Tests({ tests: tests as any, httpOnly: false });
  for (const test of testCases.getTests("javascript.builtins")) {
    globalThis.bcd.addTest(test.ident, test.tests, test.exposure);
  }
  for (const test of testCases.getTests("api", "Window", ignoreApis)) {
    globalThis.bcd.addTest(test.ident, test.tests, test.exposure);
  }
  return new Promise((resolve) =>
    globalThis.bcd.go((done) => {
      const passing: Array<string> = [];
      for (const { result, name, message } of done) {
        if (result) {
          passing.push(name);
        } else if (debug && message) {
          console.error(`${name} failed: ${message}`);
        }
      }
      resolve(passing);
    })
  );
}
