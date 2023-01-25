import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/mixins.scss";',
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({
      defaultImport: "component",
      svgoConfig: {
        plugins: [
          {
            name: "addClassesToSVGElement",
            params: {
              classNames: ["fa-icon"],
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@fa": fileURLToPath(
        new URL("./src/assets/fontawesome", import.meta.url)
      ),
    },
  },
  server: {
    port: 9000,
  },
});
