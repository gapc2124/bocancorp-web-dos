import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from 'vite-plugin-prerender'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Mantenemos tu base en la raíz
  plugins: [
    react(),
    prerender({
      // Le decimos dónde guarda Vite los archivos compilados (por defecto es 'dist')
      staticDir: path.join(__dirname, 'dist'),
      
      // Declaramos TODAS las rutas que queremos que Googlebot lea al instante
      routes: [
        '/', 
        '/es', '/es/servicios', '/es/proyectos', '/es/nosotros', '/es/contacto',
        '/en', '/en/servicios', '/en/proyectos', '/en/nosotros', '/en/contacto'
      ],
    })
  ],
  resolve: {
    dedupe: ['three'], // Mantenemos la optimización de Three.js
  },
})