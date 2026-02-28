// @ts-nocheck
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@portfolio/shared': path.resolve(__dirname, '../shared/index.js'),
      '@portfolio/app': path.resolve(__dirname, '../app/src/index.ts'),

      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/palette.scss" as *;`
      }
    }
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
