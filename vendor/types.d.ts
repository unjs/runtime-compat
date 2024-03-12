//
// mdn-bcd-collector: types/types.d.ts
// TypeScript definitions for the collector
//
// © Gooborg Studios
// See the LICENSE file for copyright details
//

import { BrowserName, SupportStatement } from "@mdn/browser-compat-data/types";

// import type * as WebIDL2 from "webidl2";

export type InternalSupportStatement = SupportStatement | "mirror";

export type Resource =
  | {
      type: "instance";
      src: string;
    }
  | {
      type: "audio" | "video";
      src: string[];
      subtitles?: {
        label: string;
        lang: string;
        src: string;
      };
    }
  | {
      type: "image";
      src: string;
    };

export type Resources = Record<string, Resource>;

export interface Test {
  code: string;
  exposure: Array<string>;
  resources?: (keyof Resources)[];
}

export type Tests = Record<string, Test>;

export interface RawTestCodeExpr {
  property: string;
  owner?: string;
  inherit?: boolean;
  skipOwnerCheck?: boolean;
}

export interface RawTest {
  raw: {
    code: string | RawTestCodeExpr | (string | RawTestCodeExpr)[];
    combinator?: string;
  };
  exposure: Exposure[];
  resources?: (keyof Resources)[];
}

export type RawTests = Record<string, RawTest>;

export type TestResultValue = boolean | null;

export interface TestResult {
  exposure: Exposure;
  name: string;
  result: TestResultValue;
  message?: string;
}

export type Extensions = string[];

export type TestResults = Record<string, TestResult[]>;

export interface Report {
  __version: string;
  results: TestResults;
  extensions: Extensions;
  userAgent: string;
}

export type BrowserSupportMap = Map<string, TestResultValue>;
export type SupportMap = Map<BrowserName, BrowserSupportMap>;
export type SupportMatrix = Map<string, SupportMap>;

export type OverrideTuple = [string, string, string, TestResultValue];
export type Overrides = (string | OverrideTuple)[];

// export type IDLFiles = Record<string, WebIDL2.IDLRootType[]>;

// Internal types

export type ReportStore = {
  extensions?: Extensions;
} & TestResults;

export interface ParsedUserAgent {
  browser: { id: string; name: string };
  version: string;
  fullVersion: string;
  os: { name: string; version: string };
  inBcd: boolean | undefined;
}

export interface ReportStats {
  version: string;
  browser: ParsedUserAgent;
  urls: string[];
  testResults: {
    total: number;
    supported: string[];
    unsupported: string[];
    unknown: string[];
    missing: string[];
  };
  featuresQueried: TestResult[];
}

export interface ReportMeta {
  json: string;
  // buffer: Buffer;
  digest: string;
  uaString: string;
  ua: ParsedUserAgent;
  browser: string;
  os: string;
  desc: string;
  title: string;
  urls: string[];
  slug: string;
  filename: string;
  branch: string;
  version: string;
}

export type InternalTestResult = TestResult & {
  info: Test;
};

export interface Secrets {
  cookies: string;
  github: {
    token: string;
  };
  selenium: {
    browserstack?: {
      username: string;
      key: string;
    };
    saucelabs?: {
      username: string;
      key: string;
      region: string;
    };
    [ci: string]: any;
  };
}
