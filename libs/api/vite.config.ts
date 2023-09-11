/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig({
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      fileName: 'index',
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
      // Change this to the formats you want to support.
      name: 'api',
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },

  cacheDir: '../../node_modules/.vite/api',

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  plugins: [
    dts({
      entryRoot: 'src',
      skipDiagnostics: true,
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
    }),

    nxViteTsPaths(),
  ],
});
