# runtime-compat-data

<!-- automd:badges color=yellow license -->

[![npm version](https://flat.badgen.net/npm/v/runtime-compat-data?color=yellow)](https://npmjs.com/package/runtime-compat-data)
[![npm downloads](https://flat.badgen.net/npm/dm/runtime-compat-data?color=yellow)](https://npmjs.com/package/runtime-compat-data)
[![license](https://flat.badgen.net/github/license/unjs/runtime-compat?color=yellow)](https://github.com/unjs/runtime-compat/blob/main/LICENSE)

<!-- /automd -->
<!-- [![bundle][bundle-src]][bundle-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

This project provides machine-readable data on support for Web APIs and JavaScript features across non-browser JavaScript runtimes. The data format is the same as MDN's [`browser-compat-data`](https://github.com/mdn/browser-compat-data/), and it uses the runtime tests from [`mdn-bcd-collector`](https://github.com/openwebdocs/mdn-bcd-collector/). It includes most runtimes that are members of the [WinterCG](https://wintercg.org/) project, and can be used to track the goal of improving web-interoperability across different runtimes.

## Supported runtimes

Currently this tracks the following JavaScript runtimes (shown with their [WinterCG runtime key](https://runtime-keys.proposal.wintercg.org/)):

- [Bun](https://bun.sh/) (`bun`)
- [Deno](https://deno.land/) (`deno`)
- Vercel [Edge Runtime](https://edge-runtime.vercel.app/) (`edge-light`)
- Fastly [JS Compute Runtime](https://github.com/fastly/js-compute-runtime) (`fastly`)
- Netlify [Edge Functions](https://docs.netlify.com/edge-functions/overview/) (`netlify`)
- [Node.js](https://nodejs.org/) (`node`)
- Wasmer [WinterJS]https://github.com/wasmerio/winterjs) (`winterjs`)
- Cloudflare [workerd](https://github.com/cloudflare/workerd) (`workerd`)

## Usage

The module exports a JSON file, and it can be imported directly using ESM with import assertions, or using a CommonJS require statement. There is also a wrapper for ESM in older versions of Node.js that do not support import assertions.

It is published to npm, but can also be loaded from a CDN.

### npm

Install the package:

```sh
# npm
npm install runtime-compat-data

# yarn
yarn add runtime-compat-data

# pnpm
pnpm install runtime-compat-data

# bun
bun install runtime-compat-data
```

```js
// ESM with Import Assertions (Node.js 16+)
import data from "runtime-compat-data" assert { type: "json" };
// ...or...
const { default: data } = await import("runtime-compat-data", {
  assert: { type: "json" },
});
// ...or...

// ESM Wrapper for older Node.js versions (Node.js v12+)
import data from "runtime-compat-data/forLegacyNode";
// ...or...
const { default: data } = await import("runtime-compat-data/forLegacyNode");

// ...or...

// CommonJS Module (Any Node.js)
const data = require("runtime-compat-data");
```

### CDN

For Deno or the browser, you can load the data from a CDN:

```js
import data from "https://unpkg.com/runtime-compat-data" assert { type: "json" };
// ...or...
const { default: data } = await import(
  "https://unpkg.com/runtime-compat-data",
  {
    assert: { type: "json" },
  }
);
```

## Data format

The data follows the same format as MDN's [`browser-compat-data`](https://github.com/mdn/browser-compat-data), but only includes the `javascript` and `api` keys. Instead of the browser keys in MDN's data, this project uses the runtime keys from the [WinterCG runtime key proposal](https://runtime-keys.proposal.wintercg.org/). The data doesn't currently track versions where the feature was added, and just includes a boolean for whether the feature is supported in the current runtime.

Example data:

```json
{
  "api": {
    "URLPattern": {
      "__compat": {
        "mdn_url": "https://developer.mozilla.org/docs/Web/API/URLPattern",
        "source_file": "api/URLPattern.json",
        "spec_url": "https://urlpattern.spec.whatwg.org/#urlpattern",
        "status": {
          "deprecated": false,
          "experimental": true,
          "standard_track": true
        },
        "support": {
          "bun": { "version_added": false },
          "deno": { "version_added": true },
          "edge-light": { "version_added": true },
          "fastly": { "version_added": false },
          "netlify": { "version_added": true },
          "node": { "version_added": false },
          "workerd": { "version_added": true }
        }
      }
    }
  }
}
```

The data is heirarchical, with the feature at the top level and then properties nested below it. Each level has a `__compat` key that contains the compatibility data for that item. The `support` key in that contains the compatibility data for each runtime.

For example, the `TextEncoder` key has this structure:

- `TextEncoder`
  - `__compat` (shows compatibility for the feature itself)
  - `TextEncoder`
    - `__compat` (shows compatibility for the `TextEncoder` object)
  - `encodeInto`
    - `__compat` (shows compatibility for the `encodeInto` method)
  - `encode`
    - `__compat` (shows compatibility for the `encode` method)

<!-- automd:contributors license=CC0 -->

Published under the [CC0](https://github.com/unjs/runtime-compat/blob/main/LICENSE) license.
Made by [community](https://github.com/unjs/runtime-compat/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/runtime-compat/graphs/contributors">
<img src="https://contrib.rocks/image?repo=unjs/runtime-compat" />
</a>

<!-- /automd -->
