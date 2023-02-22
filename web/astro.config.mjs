import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: { path: "./tailwind.config.cjs" },
    }),
  ],
  output: "server",
  adapter: node({
    mode: "middleware",
  }),
  vite: {
    ssr: {
      noExternal: ["path-to-regexp"],
    },
  },
});
