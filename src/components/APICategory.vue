<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <h2 class="text-4xl text-slate-950 cal-sans">
        {{ name }}
      </h2>
      <p class="text-md text-slate-600 max-w-lg">
        <slot />
      </p>
    </div>
    <ul class="flex flex-col overflow-x-scroll scrollbar-none">
      <li
        v-for="[category, api] in Object.entries(data)"
        :key="category"
        class="flex gap-6 p-1 bg-transparent rounded-lg hover:bg-slate-50 transition group"
      >
        <a
          class="absolute transform translate-x-[calc(-100%-20px)] text-sm text-slate-600 group-hover:text-slate-900 transition font-mono hover:underline"
          :href="api.mdn"
          target="_blank"
        >
          {{ api.name }}
        </a>
        <div
          v-for="[runtime, value] in Object.entries(api.runtimes)"
          :key="runtime"
          class="border border-transparent min-w-[124px] flex gap-1 items-center justify-center transition"
          :class="{
            'opacity-20': !selectedRuntimes.includes(runtime),
          }"
        >
          <span
            v-if="value === true || (value && typeof value === 'object' && 'supported' in value && value.supported === true)"
            class="text-lime-600"
          >
            <CheckIcon />
          </span>
          <span
            v-else-if="value === false || (value && typeof value === 'object' && 'unsupported' in value && value.unsupported === true)"
            class="text-orange-600"
          >
            <CrossIcon />
          </span>
          <span
            v-else-if="value && typeof value === 'object' && 'partial' in value && value.partial === true"
            class="text-orange-400"
          >
            <WarningIcon />
          </span>
          <p
            v-if="value && typeof value === 'object' && 'since' in value"
            class="text-sm text-slate-500 group-hover:text-slate-800 transition"
          >
            Since {{ value.since }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { data } = defineProps({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  }
})

const selectedRuntimes = useState<string[]>('selectedRuntimes')
</script>
