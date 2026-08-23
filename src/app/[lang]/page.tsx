import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';

import { HeroSection } from '@/components/HeroSection';
import { MoreServicesSection } from '@/components/MoreServicesSection';
import { ProjectsGalaxy } from '@/components/ProjectsGalaxy';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutUs } from '@/components/AboutUs';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'es' | 'en' }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.seo.title,
    description: dict.seo.description,
    keywords: dict.seo.keywords,
    openGraph: {
      title: dict.seo.ogTitle,
      description: dict.seo.ogDescription,
    },
    alternates: {
      canonical: `https://www.bocancorporation.com/${lang}`,
      languages: {
        'es': 'https://www.bocancorporation.com/es',
        'en': 'https://www.bocancorporation.com/en',
        'x-default': 'https://www.bocancorporation.com/es',
      },
    },
  };
}

export default async function Home() {
  // Mobile check will be handled in CSS or via a simple prop since we can't do window.innerWidth on server.
  // Actually, standard responsive design should use CSS media queries, not JS window checks. 
  // We'll pass a default false and let the components rely on CSS or client-side hydration.
  const isMobile = false;

  return (
    <>
      <div id="home">
        <HeroSection />
      </div>
      
      <div id="servicios">
        <ServicesSection />
      </div>
      
      <div id="mas-servicios">
        <MoreServicesSection />
      </div>
      
      <div id="nosotros">
        <AboutUs />
      </div>

      <div id="proyectos">
        <ProjectsGalaxy />
      </div>
    </>
  );
}
