<template>
  <div class="flex flex-col gap-8 container mx-auto my-24 items-center">
    <div class="flex flex-col gap-4">
      <h2 class="text-6xl text-slate-950">
        Runtime compatibility
      </h2>
      <p class="text-md text-slate-600 max-w-4xl">
        Display APIs compatibility across different JavaScript runtimes. The data is retrieved from <ExternalLink
          href="https://github.com/unjs/runtime-compat-data"
        >
          >
          runtime-compat-data
        </ExternalLink>, based on MDN's format.
        Runtimes are displayed with their <ExternalLink href="https://runtime-keys.proposal.wintercg.org">
          WinterCG Runtime Key
        </ExternalLink>.
      </p>
    </div>
    <div class="sticky top-0 z-10 pointer-events-none">
      <div class="flex gap-1 overflow-x-scroll scrollbar-none bg-white pt-2 pointer-events-auto">
        <RuntimeCard
          v-for="runtime in runtimes"
          :key="runtime"
          :runtime="runtime"
          :selected="selectedRuntimes.includes(runtime)"
        />
      </div>
      <div class="h-16 w-full bg-gradient-to-b from-white to-transparent" />
    </div>
    <div class="flex flex-col gap-8">
      <APIRow
        v-for="[name, data] in Object.entries(runtimeCompatData.api)"
        :key="name"
        :name="name"
        :data="data"
      />
    </div>
  </div>
  <footer class="flex items-center gap-8 pb-16 justify-center">
    <p class="text-md text-slate-600">
      Powered by <ExternalLink href="https:/unjs.io">
        UnJS
      </ExternalLink>
    </p>
    <a
      href="https://github.com/unjs/runtime-compat"
      class="flex gap-2 text-md text-slate-600 hover:text-slate-900 items-center"
    >
      <IconGitHub /> GitHub
    </a>
  </footer>
</template>

<script setup lang="ts">
import runtimeCompatData, { RuntimeName } from 'runtime-compat-data';

const runtimes = Object.keys(runtimeCompatData.api.AbortController.__compat?.support ?? {}) as RuntimeName[]
const selectedRuntimes = useState<string[]>('selectedRuntimes', () => runtimes)
</script>
