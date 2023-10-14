<template>
  <div class="flex flex-col gap-8 container mx-auto mt-24 pl-24">
    <div class="flex flex-col gap-2">
      <h2 class="text-6xl text-slate-950 cal-sans">
        Runtimes
      </h2>
      <p class="text-md text-slate-600 max-w-lg">
        Select the runtimes you want to compare against each other.
        This list is based on the <ExternalLink href="https://runtime-keys.proposal.wintercg.org/">
          WinterCG Runtime Keys
        </ExternalLink> specification.
        <button
          type="button"
          class="text-blue-600"
          @click="toggleSelection"
        >
          {{ noneRuntimesSelected() ? "Select" : "Unselect" }} all.
        </button>
      </p>
    </div>
    <div class="sticky top-0">
      <div class="flex gap-6 overflow-x-scroll scrollbar-none bg-white pt-2">
        <RuntimeCard
          v-for="runtime in runtimes"
          :key="runtime.name"
          :name="runtime.name"
          :website="runtime.website"
          :repository="runtime.repository"
          :selected="selectedRuntimes.includes(runtime.name)"
        />
      </div>
      <div class="h-16 w-full bg-gradient-to-b from-white to-transparent" />
    </div>
    <div class="flex flex-col gap-16">
      <APICategory
        v-for="[name, data] in Object.entries(apis ?? {})"
        :key="name"
        :name="data.name"
        :data="data.apis"
      >
        {{ data.description }}
      </APICategory>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'cal-sans'
import type { Runtimes } from '~/types/runtime'

const runtimes = useState<Runtimes>('runtimes')

await $fetch('/api/runtime-keys', {
  onResponse: async ({ response }) => {
    runtimes.value = transformRuntimeKeys(response._data ?? {})
  }
})

const selectedRuntimes = useState<string[]>('selectedRuntimes', () => runtimes.value.map(({ name }) => name))

const noneRuntimesSelected = () => selectedRuntimes.value.length === 0

function toggleSelection() {
  if (noneRuntimesSelected()) {
    selectedRuntimes.value = runtimes.value.map(({ name }) => name)
  } else {
    selectedRuntimes.value = []
  }
}

const apis = useState<object>('apis')

await $fetch('/api/runtime-apis', {
  onResponse: async ({ response }) => {
    apis.value = response._data ?? {}
  }
})
</script>
