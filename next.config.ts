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
      {
        source: '/contacto',
        destination: '/es/contacto',
        permanent: true,
      },
      {
        source: '/nosotros',
        destination: '/es/nosotros',
        permanent: true,
      },
      {
        source: '/proyectos',
        destination: '/es/proyectos',
        permanent: true,
      },
      {
        source: '/servicios',
        destination: '/es/servicios',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/es/nosotros',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/es/contacto',
        permanent: true,
      },
      {
        source: '/terms&conditions',
        destination: '/es',
        permanent: true,
      },
      {
        source: '/services/:path*',
        destination: '/es/servicios',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
