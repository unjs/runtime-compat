<template>
  <div @click="switchTheme" class="absolute p-1 right-2 border-2 rounded border-gay-700 dark:border-gray-300">
    <Sun v-if="theme === 'dark'" />
    <Moon v-else />
  </div>
</template>

<script setup lang="ts">
import Sun from "./icon/Sun.vue";
import Moon from "./icon/Moon.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      theme: window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  },
  mounted() {
    document.body.dataset.theme = this.theme;
    document.getElementsByTagName('html')[0].style.colorScheme = this.theme;
  },
  methods: {
    switchTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light';
      } else {
        this.theme = 'dark';
      }
      document.body.dataset.theme = this.theme;
      document.getElementsByTagName('html')[0].style.colorScheme = this.theme;
    }
  }
}
</script>
