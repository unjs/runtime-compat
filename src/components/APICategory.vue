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
          class="absolute transform translate-x-[-100%] -translate-y-1 text-sm text-slate-900 p-1 bg-slate-50 rounded-lg font-mono hover:underline"
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
            'opacity-10': !selectedRuntimes.includes(runtime),
          }"
        >
          <span
            class="rounded-full w-4 h-4"
            :class="{
              'bg-lime-600': value === true,
              'bg-orange-600': value === false,
              'bg-orange-400': value && typeof value === 'object' && 'partial' in value && value.partial === true,
            }"
          />
          <!-- <p class="text-sm text-slate-500 group-hover:text-slate-800 transition"> -->
          <!--   Since 18.x -->
          <!-- </p> -->
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
