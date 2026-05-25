import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';

import { ProjectsPage as ProjectsPageClient } from '@/components/ProjectsPageClient';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'es' | 'en' }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = 'https://www.bocancorporation.com';
  const path = '/proyectos';

  return {
    title: lang === 'es' ? 'Proyectos | Bocancorp' : 'Projects | Bocancorp',
    description: dict.seo.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}${path}`,
      languages: {
        'es': `${baseUrl}/es${path}`,
        'en': `${baseUrl}/en${path}`,
      },
    },
  };
}

import { Suspense } from 'react';

export default async function ProjectsPage() {
  const isMobile = false;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsPageClient isMobile={isMobile} />
    </Suspense>
  );
}
