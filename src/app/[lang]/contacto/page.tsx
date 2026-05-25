import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';

import { ContactUsPage as ContactUsPageClient } from '@/components/ContactUsPageClient';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'es' | 'en' }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = 'https://www.bocancorporation.com';
  const path = '/contacto';

  return {
    title: lang === 'es' ? 'Contacto | Bocancorp' : 'Contact Us | Bocancorp',
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

export default async function ContactUsPage() {
  const isMobile = false;
  return <ContactUsPageClient isMobile={isMobile} />;
}
