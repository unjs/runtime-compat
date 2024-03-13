<template>
  <div class="flex flex-col gap-2 relative">
    <div :id="name" class="relative -top-48" />
    <a :href="`#${name}`">
      <h2
        class="text-xl font-mono text-slate-950 before:content-['#'] before:hidden before:absolute before:-left-4 hover:underline hover:before:block">
        {{ name }}
      </h2>
    </a>
    <ul class="flex flex-col gap-1 overflow-x-scroll scrollbar-none">
      <li v-for="[api, apiData] in Object.entries(data)" :key="api" class="flex gap-1">
        <a class="absolute transform translate-x-[calc(-100%-20px)] text-sm text-slate-600 group-hover:text-slate-900 transition flex gap-1 items-center hover:underline"
          :href="apiData.mdn_url ?? apiData.__compat.mdn_url" target="_blank">
          <span v-if="apiData.status?.experimental ?? apiData.__compat?.status?.experimental" class="text-blue-600">
            <IconBlend />
          </span>
          <span v-if="apiData.status?.deprecated ?? apiData.__compat?.status?.deprecated" class="text-red-600">
            <IconTrash />
          </span>
          <span
            v-html="api === '__compat' ? `<code>${name}</code>` : apiData.__compat?.description ?? `<code>${api}</code>`" />
        </a>
        <div v-for="[runtime, value] in Object.entries(apiData.support ?? apiData.__compat.support) " :key="runtime"
          class="w-[124px] flex items-center justify-center" :class="{
            'opacity-10': !selectedRuntimes.includes(runtime),
          }">
          <span class="w-full h-6 flex items-center justify-center rounded" :class="{
            'bg-lime-100 text-lime-600': value.version_added,
            'bg-red-100 text-red-600': !value.version_added,
          }">

            <IconCheck v-if="value.version_added" class="h-4 w-4" />
            <IconCross v-else class="w-4 h-4" />
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { CompatStatement, Identifier } from 'runtime-compat-data';

const { name, data } = defineProps<{ name: string, data: Identifier | CompatStatement }>()
const selectedRuntimes = useState<string[]>('selectedRuntimes')
</script>
