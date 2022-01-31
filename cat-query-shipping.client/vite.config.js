import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['./assets/img/Boz/*.png', './assets/img/DataCard1.png','./assets/img/DataCard2.png'],
  build: {
    outDir: '../cat-query-shipping/client',
    sourcemap: false
  },
  server: {
    port: 8080
  }
})
