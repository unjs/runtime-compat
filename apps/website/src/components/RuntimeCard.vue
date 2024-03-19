<template>
  <button type="button"
    class="flex flex-col items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md px-4 py-3 gap-2 transition min-w-[124px] hover:border-slate-300"
    :class="{
      'opacity-30 hover:border-slate-300 hover:opacity-40': !selected,
    }" @click="toggleRuntime(runtime)">
    <img :alt="`${runtime} logo`" :src="`/${runtime}.png`" v-bind:class="`w-12 my-auto` + (runtimeInformation.invertForDark ? ` dark:invert dark:hue-rotate-180` : ``)">
    <p class="text-md text-slate-900 dark:text-white whitespace-nowrap mt-4">
      {{ runtimeInformation.name }}
    </p>
    <p v-if="coverage" class="text-xs text-slate-500">
      {{ coverage }}% coverage
    </p>
    <p class="text-sm text-slate-500 transition flex gap-2" @click.stop>
      <a v-if="runtimeInformation.github" :href="runtimeInformation.github" target="_blank"
        class="flex items-center gap-1 hover:text-slate-800 dark:hover:text-slate-200">
        <IconGitHub />
      </a>
      <a v-if="runtimeInformation.website" :href="runtimeInformation.website" target="_blank"
        class="flex items-center gap-1 hover:text-slate-800 dark:hover:text-slate-200">
        <IconGlobe />
      </a>
    </p>
  </button>
</template>

<script setup lang="ts">
const { runtime } = defineProps<{ runtime: string, selected: boolean, coverage?: number }>()

const selectedRuntimes = useState<string[]>('selectedRuntimes')

function toggleRuntime(name: string) {
  if (selectedRuntimes.value.includes(name)) {
    selectedRuntimes.value = selectedRuntimes.value.filter((runtime) => runtime !== name)
  } else {
    selectedRuntimes.value = [...selectedRuntimes.value, name]
  }
}

interface RuntimeInformation {
  name: string
  github?: string
  website?: string
  invertForDark?: boolean
}

function getRuntimeInformation(name: string): RuntimeInformation {
  switch (name) {
    case 'bun':
      return { name: 'Bun', github: 'https://github.com/oven-sh/bun', website: 'https://bun.sh' };
    case 'deno':
      return { name: 'Deno', github: 'https://github.com/denoland/deno', website: 'https://deno.com' };
    case 'fastly':
      return { name: 'fastly', github: 'https://github.com/fastly/js-compute-runtime', website: 'https://www.fastly.com/products/compute' };
    case 'llrt':
      return { name: 'LLRT', github: 'https://github.com/awslabs/llrt', invertForDark: true };
    case 'netlify':
      return { name: 'netlify', website: 'https://docs.netlify.com/edge-functions/overview', invertForDark: true };
    case 'node':
      return { name: 'Node.js', github: 'https://github.com/nodejs/node', website: 'https://nodejs.org' }
    case 'edge-light':
      return { name: 'edge-light', github: 'https://github.com/vercel/edge-runtime', website: 'https://vercel.com/docs/functions/runtimes/edge-runtime', invertForDark: true };
    case 'wasmer':
      return { name: 'wasmer', github: 'https://github.com/wasmerio/winterjs', website: 'https://wasmer.io' };
    case 'workerd':
      return { name: 'workerd', github: 'https://github.com/cloudflare/workerd', website: 'https://developers.cloudflare.com/workers' }
    default:
      return { name }
  }
}

const runtimeInformation = getRuntimeInformation(runtime)
</script>
