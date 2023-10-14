<template>
  <button
    type="button"
    class="flex flex-col items-center bg-slate-50 border border-slate-200 rounded-md px-4 py-3 gap-1 transition min-w-[124px] hover:border-slate-300"
    :class="{
      'opacity-30 hover:border-slate-300 hover:opacity-40': !selected,
    }"
    @click="toggleRuntime(name)"
  >
    <img
      :alt="`${name} logo`"
      :src="`/${name}.png`"
      class="h-12 mb-4"
    >
    <p class="text-md text-slate-900 whitespace-nowrap">
      {{ name }}
    </p>
    <p
      class="text-sm text-slate-500 transition flex"
      @click.stop
    >
      <a
        :href="website"
        target="_blank"
        class="hover:text-slate-800"
      >Website</a>
      <span v-if="repository">&nbsp;-&nbsp;</span>
      <a
        v-if="repository"
        :href="repository"
        target="_blank"
        class="flex items-center gap-1 hover:text-slate-800"
      >
        <IconGitHub />
      </a>
    </p>
  </button>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  repository: {
    type: String,
    default: null,
  },
  selected: Boolean,
})

const selectedRuntimes = useState<string[]>('selectedRuntimes')

function toggleRuntime(name: string) {
  if (selectedRuntimes.value.includes(name)) {
    selectedRuntimes.value = selectedRuntimes.value.filter((runtime) => runtime !== name)
  } else {
    selectedRuntimes.value = [...selectedRuntimes.value, name]
  }
}
</script>
