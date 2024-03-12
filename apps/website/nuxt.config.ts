// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "src",
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      charset: "utf8",
      viewport: "width=device-width, initial-scale=1",
      title: "Runtime compatibility across JavaScript runtimes",
      meta: [
        {
          name: "description",
          content:
            "Display APIs compatibility across different JavaScript runtimes. The data is retrieved from runtime-compat-data, based on MDN's format. Runtimes are displayed with their WinterCG Runtime Key.",
        },
      ],
    },
  },
});
