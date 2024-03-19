<template>
  <div class="flex flex-col gap-8 container md:max-w-[60vw] mx-auto my-24 items-center px-4">
    <div class="flex flex-col gap-4 max-w-full"
      :style="`width: ${runtimes.length * 124 + ((runtimes.length - 1) * 4)}px`">
      <h2 class="text-6xl text-slate-900">
        Runtime compatibility
      </h2>
      <p class="text-md text-slate-600 md:max-w-[80%]">
        Display APIs compatibility across different JavaScript runtimes. The data is retrieved from <ExternalLink
          href="https://github.com/unjs/runtime-compat/tree/main/packages/runtime-compat-data">
          runtime-compat-data
        </ExternalLink>, based on MDN's format.
      </p>
      <p class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <strong>Note:</strong> The current data is not 100% accurate and is auto generated.
        Please <ExternalLink href="https://github.com/unjs/runtime-compat/issues">open an issue</ExternalLink> if you
        have spotted any inconsistencies.
      </p>
      <label class="flex items-center gap-2">
        <input type="checkbox" class="rounded" v-model="winterCGOnly" />
        <span class="text-md text-slate-600">Filter by WinterCG APIs ({{ computedData.winterCGCount }}/{{
          computedData.totalCount
        }})</span>
      </label>
    </div>
    <div class="sticky top-0 z-10 pointer-events-none max-w-full">
      <div class="flex gap-1 overflow-x-scroll scrollbar-none bg-white pt-2 pointer-events-auto linked-scroll"
        @scroll.passive="changeScroll">
        <RuntimeCard v-for="runtime in runtimes" :key="runtime" :runtime="runtime"
          :selected="selectedRuntimes.includes(runtime)"
          :coverage="winterCGOnly ? Math.round(computedData.winterCGCoverage[runtime] / computedData.winterCGCount * 100) : undefined" />
      </div>
      <div class="h-16 w-full bg-gradient-to-b from-white to-transparent" />
    </div>
    <div class="flex flex-col gap-8 max-w-full">
      <APIRow v-for="[name, data] in Object.entries(computedData.data)" :key="name" :name="name" :data="data" />
    </div>
  </div>
  <footer class="flex items-center gap-8 pb-16 justify-center">
    <p class="text-md text-slate-600">
      Powered by <ExternalLink href="https:/unjs.io">
        UnJS
      </ExternalLink>
    </p>
    <a href="https://github.com/unjs/runtime-compat"
      class="flex gap-2 text-md text-slate-600 hover:text-slate-900 items-center">
      <IconGitHub /> GitHub
    </a>
  </footer>
</template>

<script setup lang="ts">
import runtimeCompatData, { type CompatStatement, type Identifier, type RuntimeName } from 'runtime-compat-data';
import { changeScroll } from './lib'
import ExternalLink from './components/ExternalLink.vue';

const runtimes = Object.keys(runtimeCompatData.api.AbortController.__compat?.support ?? {}) as RuntimeName[]
const selectedRuntimes = useState<string[]>('selectedRuntimes', () => runtimes)
const winterCGOnly = useState<boolean>('winterCGOnly', () => false)

// https://common-min-api.proposal.wintercg.org/#index
const winterCGAPIs = ['AbortController', 'AbortSignal', 'Blob', 'ByteLengthQueuingStrategy', 'CompressionStream', 'CountQueuingStrategy', 'Crypto', 'CryptoKey', 'DecompressionStream', 'DOMException', 'Event', 'EventTarget', 'File', 'FormData', 'Headers', 'ReadableByteStreamController', 'ReadableStream', 'ReadableStreamBYOBReader', 'ReadableStreamBYOBRequest', 'ReadableStreamDefaultController', 'ReadableStreamDefaultReader', 'Request', 'Response', 'SubtleCrypto', 'TextDecoder', 'TextDecoderStream', 'TextEncoder', 'TextEncoderStream', 'TransformStream', 'TransformStreamDefaultController', 'URL', 'URLSearchParams', 'WritableStream', 'WritableStreamDefaultController', 'atob', 'btoa', 'console', 'crypto', 'fetch', 'navigator', 'performance', 'queueMicrotask', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'structuredClone']

const computedData = computed(() => {
  const data: Record<string, Identifier | CompatStatement> = {}
  const winterCGCoverage: Record<string, number> = Object.fromEntries(runtimes.map(runtime => [runtime, 0]))
  let winterCGCount = 0;
  let totalCount = 0;
  for (const [api, apiData] of Object.entries({ ...runtimeCompatData.api, WebAssembly: runtimeCompatData.webassembly.api })) {
    const isWinterCGApi = winterCGAPIs.includes(api)

    if (!winterCGOnly.value || isWinterCGApi) {
      data[api] = apiData
      winterCGCount++

      if (isWinterCGApi) {
        Object.entries(apiData.support ?? apiData.__compat?.support ?? {}).forEach(([runtime, value]) => {
          if (value.version_added) {
            winterCGCoverage[runtime]++
          }
        })
      }
    }

    totalCount++
  }

  return { data, winterCGCount, totalCount, winterCGCoverage }
})
</script>
