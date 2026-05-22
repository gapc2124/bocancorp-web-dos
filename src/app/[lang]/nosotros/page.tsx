import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';

import { AboutUsPage as AboutUsPageClient } from '@/components/AboutUsPageClient';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'es' | 'en' }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: lang === 'es' ? 'Nosotros | Bocancorp' : 'About Us | Bocancorp',
    description: dict.seo.description,
  };
}

export default async function AboutUsPage() {
  const isMobile = false;
  return <AboutUsPageClient isMobile={isMobile} />;
}
