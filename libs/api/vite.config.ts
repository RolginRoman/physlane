/// <reference types="vitest" />
import { defineConfig } from "vite";

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import * as path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  root: __dirname,
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: "../../dist/libs/api",
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      fileName: "index",
      // Don't forget to update your package.json as well.
      formats: ["es", "cjs"],
      // Change this to the formats you want to support.
      name: "api",
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },

  cacheDir: "../../node_modules/.vite/api",

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  plugins: [
    dts({
      entryRoot: "src",
      skipDiagnostics: true,
      tsConfigFilePath: path.join(__dirname, "tsconfig.lib.json"),
    }),

    nxViteTsPaths(),
  ],
});
