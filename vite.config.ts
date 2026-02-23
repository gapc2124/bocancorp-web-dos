import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // <--- CAMBIADO: De '/bocancorp-web-dos/' a '/'
  plugins: [react()],
  resolve: {
    dedupe: ['three'],
  },
  
})