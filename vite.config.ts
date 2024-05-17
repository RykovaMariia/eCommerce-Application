import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

export default defineConfig({
  plugins: [
    vue(),
    process.env.NODE_ENV === 'development' ? VueDevTools() : undefined,
    eslint(),
    stylelint(),
  ],
  define: {
    global: 'window',
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/components/core', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      'node-fetch': 'isomorphic-fetch',
    },
  },
})
