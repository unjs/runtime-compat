<template>
  <a :href="href" target="_blank" class="text-blue-600 dark:text-blue-300 hover:underline inline-flex gap-1 items-center">
    <slot />
    <IconLink />
  </a>
</template>

<script setup lang="ts">
defineProps<{ href: string }>()
</script>
