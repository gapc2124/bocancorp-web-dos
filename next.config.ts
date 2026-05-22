import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Para AWS Amplify, no es necesario output: 'export' a menos que sea una app puramente estática
  // sin API routes ni imágenes dinámicas. Dado que queremos OG dinámico, mantenemos el comportamiento por defecto.
  // Permitir la previsualización cruzada desde dispositivos locales (red Wi-Fi local)
  allowedDevOrigins: ['192.168.1.16', 'localhost'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/es',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
