import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 1. CRÍTICO PARA EL 3D: Evita que el build en Amplify explote al renderizar Three.js en el servidor
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  // 2. Permitir la previsualización cruzada desde dispositivos locales
  allowedDevOrigins: ['192.168.1.16', 'localhost'],

  // 3. Redirección nativa desde la raíz al idioma principal
  async redirects() {
    return [
      {
        source: '/',
        destination: '/es',
        // Usamos false por si en el futuro implementas detección automática de idioma
        permanent: false,
      },
    ];
  },
};

export default nextConfig;