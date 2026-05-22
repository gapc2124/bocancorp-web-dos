import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';

import { ServicesPage as ServicesPageClient } from '@/components/ServicesPageClient';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'es' | 'en' }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  // Using English or Spanish text as an approximation if not directly mapped in dictionary for each page
  // We can expand the dictionary later. For now we use the main seo title + section
  return {
    title: lang === 'es' ? 'Servicios | Bocancorp' : 'Services | Bocancorp',
    description: dict.seo.description,
  };
}

export default async function ServicesPage() {
  const isMobile = false; // Relies on CSS media queries ideally
  return <ServicesPageClient isMobile={isMobile} />;
}
