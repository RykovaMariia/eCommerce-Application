import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools(), eslint()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

// import { defineConfig } from 'vite';
// import tsconfigPaths from 'vite-tsconfig-paths';

// export default defineConfig({
//   base: './',
//   plugins: [tsconfigPaths()],
//   css: {
//     modules: {
//       localsConvention: 'camelCase',
//     },
//   },
//   build: {
//     target: 'ES2022',
//   },
// });
