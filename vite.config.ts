import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: '/static/xxqg/build/',
  build: {
    outDir: 'build',
    rollupOptions: {
      input: resolve(__dirname, 'home.html')
    },
    assetsInlineLimit: 200 * 1024
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver(), VantResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()]
    })
  ]
})
