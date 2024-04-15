# unjs/runtime-compat

<!-- automd:badges color=yellow license -->

[![license](https://img.shields.io/github/license/unjs/runtime-compat?color=yellow)](https://github.com/unjs/runtime-compat/blob/main/LICENSE)

<!-- /automd -->

Display APIs compatibility across different JavaScript runtimes. The data is automatically generated using the runtime tests from [`mdn-bcd-collector`](https://github.com/openwebdocs/mdn-bcd-collector) and published in the MDN [`browser-compat-data`](https://github.com/mdn/browser-compat-data) format.

[View the results](https://runtime-compat.unjs.io/) or [re-use the data](/packages/runtime-compat-data/).

> [!WARNING]
> The current data is not 100% accurate and is auto generated. Please [open an issue](https://github.com/unjs/runtime-compat/issues) if you have spotted any inconsistencies.

## About the data

The data is generated using the tests from the `mdn-bcd-collector` project. These were originally created for MDN's `browser-compat-data`, which is the data that powers sites such as the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs) and [CanIUse](https://caniuse.com). These tests were designed to run in a browser environment, so we use a slightly modified version of the test harness to allow them to run in non-browser runtimes.

The runner code is is slightly different for each runtime, because of the variety of different ways they are designed to be invoked. Broadly they fall into two groups - the ones that can be run directly from the CLI, and others that are invoked via an HTTP request. For these we use the project's own development server, and then use `start-server-and-test` to run the server and make a request for a function that runs the test file.

The output of each of these is a `data.json` file in each runtime directory, containing the results of the tests. If you want to check why a specific test failed, you should start by inspecting the contents of this file as it contains the code and error message for each test.

Another script then processes these files, combines them with the metadata about each API from the `browser-compat-data` project, and then writes the data as a JSON file to the [`runtime-compat-data`](/packages/runtime-compat-data/) directory. This is then published to npm as the [`runtime-compat-data` module](https://www.npmjs.com/package/runtime-compat-data).

The tests can be run locally, but the actual data generation process is run on GitHub Actions, which opens a PR if there are any changes.

## Running tests locally

### Install + Prepare

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Install [Bun](https://bun.sh/)
- Install [Fastly CLI](https://www.fastly.com/documentation/reference/tools/cli/)
- Install [Wasmer](https://wasmer.io/)
- Download [LLRT](https://github.com/awslabs/llrt/releases) and place executable in `PATH`
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`

### Generate the data

To generate data for all runtimes, run `pnpm run generate` in the project source.

To generate data for an individual runtime, navigate to `generator/runtimes/<runtime>` and run `pnpm start`.

### View the website

To view the website, run `pnpm run website`, then navigate to `localhost:3000`.

## Limitations

The actual tests are designed to run in browsers, so there may be inconsistencies. For the same reason, they also do not test for any WinterCG-specific features.

Several supported runtimes are normally used via a hosted service. These are tested locally using a development library or server, which may differ from the production environment.

Some runtimes may define a particular API object or method, but as a stub or noop rather than as an actual feature. In most cases this will be shown as being supported. Usually these feature make no sense outside a browser environment, but have been implemented to allow code to run cross-platform.

The tests were created for browsers so they make some assumptions about their environment. We try to work around as many as we can, but there are still false negatives. For example, most of the `Request` and `URL` tests assume that they can create relative URLs. These don't work in most non-browser runtimes by design, because there is no `location.href` for them to be relative to. Currently this means that a lot of these tests are reporting as failed, even though the runtimes support most of these features.

The tests are only run against the latest stable version of each runtime, so the data only shows whether the feature is supported now. In most cases these runtimes are updated regularly, so this should not be a problem. The exception is Node.js, which is often run using old versions. For this you may like to compare the data with [the MDN docs](https://developer.mozilla.org/en-US/docs/Web/API), which include support details for old versions of Node.

### Notes for specific runtimes

#### Deno

Deno is tested using the `deno` CLI, which has different support than the Deno Deploy. That service has more limitations and often has features added on a a different schedule.

#### Vercel Edge Runtime

Tests are run against the open source [Edge Runtime](https://edge-runtime.vercel.app/) library (identified with the key `edge-light`), which run in Node. This is designed to be identical to the Vercel Edge Runtime (which is based on `workerd`), but there may be differences. This is particularly likely to be the case when a feature is reported as unsupported on Edge Runtime but supported by workerd.

#### Netlify

Tests are run using the Netlify CLI, which uses the Deno CLI. While this does use settings designed to mimic the production version, there may be differences. We have manually skipped some of the features (such as WebGPU) that falsely reported as supported, there there may still be some false results.

## License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/unjs/runtime-compat/blob/main/LICENSE) license.
Made by [community](https://github.com/unjs/runtime-compat/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/runtime-compat/graphs/contributors">
<img src="https://contrib.rocks/image?repo=unjs/runtime-compat" />
</a>

<!-- /automd -->
