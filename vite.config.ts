import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { startApi } from './api/server.js'

const API_PORT = 5174

export default defineConfig({
  plugins: [
    vue(),
    react(),
    {
      name: 'mallow-api',
      configureServer() {
        startApi(API_PORT)
      },
    },
  ],
  server: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:${API_PORT}`,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
