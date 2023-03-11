import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "middleware",
  }),
  integrations: [
    vue(),
    tailwind({
      config: { path: "./tailwind.config.cjs" },
    }),
  ],
  vite: {
    ssr: {
      noExternal: ["path-to-regexp"],
    },
  },
});
