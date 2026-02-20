import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async' // 👈 1. Importamos el proveedor
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 👇 2. Envolvemos toda la aplicación */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)