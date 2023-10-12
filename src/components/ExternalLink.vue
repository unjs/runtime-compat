<template>
  <a :href="href" target="_blank" class="text-blue-600 hover:underline inline-flex gap-1 items-center">
    <slot />
    <LinkIcon />
  </a>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true,
  },
})
</script>
