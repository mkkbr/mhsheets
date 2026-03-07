import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss()],
  base: '/mhsheets/',
  //server: {
    //host: '0.0.0.0', // This allows access from any IP on the local network
    //port: 3000, // Change to your preferred port
  //},
})
