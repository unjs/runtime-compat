<template>
  <div class="flex flex-col container mx-auto mt-24 pl-48">
    <div class="flex flex-col gap-4">
      <h2 class="text-6xl text-slate-950 cal-sans">
        Platforms compatibility
      </h2>
      <p class="text-md text-slate-600 max-w-3xl">
        Display APIs compatibility across different JavaScript runtimes. The data is retrieved from <ExternalLink
          href="https://github.com/ascorbic/runtime-compat-data">
          runtime-compat-data
        </ExternalLink>, based on MDN's format.
        Runtimes are displayed with their <ExternalLink href="https://runtime-keys.proposal.wintercg.org/">
          WinterCG Runtime Key
        </ExternalLink>:
      </p>
    </div>
    <div class="sticky top-0 z-10 pointer-events-none">
      <div class="flex gap-1 overflow-x-scroll scrollbar-none bg-white pt-2 pointer-events-auto">
        <RuntimeCard v-for="runtime in runtimes" :key="runtime" :name="runtime" :website="runtime.website"
          :repository="runtime.repository" :selected="selectedRuntimes.includes(runtime)" />
      </div>
      <div class="h-16 w-full bg-gradient-to-b from-white to-transparent" />
    </div>
    <div class="flex flex-col gap-8">
      <APICategory v-for="[name, data] in Object.entries(apis ?? {})" :key="name" :name="name" :data="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import 'cal-sans'
import { CompatData, RuntimeName } from 'runtime-compat-data';

const runtimes = useState<RuntimeName[]>('runtimes')

await $fetch('/api/runtime-keys', {
  onResponse: async ({ response }) => {
    runtimes.value = response._data
  }
})

const selectedRuntimes = useState<string[]>('selectedRuntimes', () => runtimes.value)

const apis = useState<CompatData['api']['__compat']>('apis')

await $fetch('/api/compat-data', {
  onResponse: async ({ response }) => {
    apis.value = response._data.api
  }
})
</script>
