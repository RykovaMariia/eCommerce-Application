import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    process.env.NODE_ENV === 'development' ? VueDevTools() : undefined,
    eslint(),
    stylelint()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
