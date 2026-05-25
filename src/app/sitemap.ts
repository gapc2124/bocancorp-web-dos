import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.bocancorporation.com';

  const routes = ['', '/servicios', '/nosotros', '/proyectos', '/contacto'];
  const langs = ['es', 'en'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    langs.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es${route}`,
            en: `${baseUrl}/en${route}`,
            'x-default': `${baseUrl}/es${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
