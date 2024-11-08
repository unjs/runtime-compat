import unjs from "eslint-config-unjs";

export default unjs({
  rules: {
    "no-eval": "off",
  },
  ignores: [
    "node_modules/*",
    "coverage/*",
    "**/dist/*",
    "vendor/*",
    "**/tailwind.config.js",
    "**/.nuxt/*",
    "**/.output/*",
  ],
});
