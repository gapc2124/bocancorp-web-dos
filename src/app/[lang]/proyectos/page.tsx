import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';

import { ProjectsPage as ProjectsPageClient } from '@/components/ProjectsPageClient';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'es' | 'en' }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: lang === 'es' ? 'Proyectos | Bocancorp' : 'Projects | Bocancorp',
    description: dict.seo.description,
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
