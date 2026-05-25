import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';

import { AboutUsPage as AboutUsPageClient } from '@/components/AboutUsPageClient';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'es' | 'en' }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = 'https://www.bocancorporation.com';
  const path = '/nosotros';

  return {
    title: lang === 'es' ? 'Nosotros | Bocancorp' : 'About Us | Bocancorp',
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

export default async function AboutUsPage() {
  const isMobile = false;
  return <AboutUsPageClient isMobile={isMobile} />;
}
