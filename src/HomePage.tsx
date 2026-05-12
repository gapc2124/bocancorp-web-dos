import { Helmet } from 'react-helmet-async'; // 👈 Importamos el casco SEO
import { useParams } from 'react-router-dom'; // 👈 1. Importamos useParams
import { HeroSection } from './components/HeroSection'; 
import { ServicesSection } from './components/ServicesSection';
import { MoreServicesSection } from './components/MoreServicesSection'; 
import { ProjectsGalaxy } from './components/ProjectsGalaxy'; 
import { AboutUs } from './components/AboutUs'; 

// 👇 2. Agregamos las traducciones para el SEO de esta página
const TRANSLATIONS = {
  ES: {
    seo: {
      title: "Bocancorp | Crear Software y Servicios Cloud de Alto Nivel",
      description: "Transformamos ideas en ecosistemas digitales. Expertos en crear software a medida, servicios cloud con AWS, ciberseguridad y automatización para empresas.",
      keywords: "Bocancorp, crear software, servicios cloud, AWS partner, desarrollo de software Perú, arquitectura cloud, consultoría tecnológica",
      ogTitle: "Bocancorp | Innovación y Desarrollo de Software",
      ogDescription: "Expertos en arquitectura Cloud y soluciones digitales escalables."
    }
  },
  EN: {
    seo: {
      title: "Bocancorp | High-Level Software Creation and Cloud Services",
      description: "We transform ideas into digital ecosystems. Experts in custom software creation, AWS cloud services, cybersecurity, and business automation.",
      keywords: "Bocancorp, software creation, cloud services, AWS partner, software development Peru, cloud architecture, technology consulting",
      ogTitle: "Bocancorp | Innovation and Software Development",
      ogDescription: "Experts in Cloud architecture and scalable digital solutions."
    }
  }
};

type LanguageType = 'ES' | 'EN';

interface HomePageProps {
  isMobile: boolean;
}

export const HomePage = ({ isMobile }: HomePageProps) => {
  // 👇 3. Leemos el idioma directo de la URL
  const { lang } = useParams(); 
  const currentLang: LanguageType = lang === 'en' ? 'EN' : 'ES';
  const t = TRANSLATIONS[currentLang];

return (
    <>
      {/* 1️⃣ SECCIÓN SEO (Invisible para el usuario, vital para Google) */}
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
        <meta name="keywords" content={t.seo.keywords} />
        
        {/* Etiquetas Open Graph para que al compartir por WhatsApp se vea genial */}
        <meta property="og:title" content={t.seo.ogTitle} />
        <meta property="og:description" content={t.seo.ogDescription} />
        <meta property="og:image" content="assets/multi_cloud.png" />

        {/* 👇 NUEVO: URL Canónica (Le dice a Google que esta URL es la oficial) */}
        <link rel="canonical" href={`https://www.bocancorporation.com/${currentLang.toLowerCase()}`} />

        {/* 👇 NUEVO: Hreflang (Le dice a Google qué URL mostrar según el idioma del usuario) */}
        <link rel="alternate" hrefLang="es" href="https://www.bocancorporation.com/es" />
        <link rel="alternate" hrefLang="en" href="https://www.bocancorporation.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.bocancorporation.com/es" />
      </Helmet>

      {/* 2️⃣ CONTENIDO VISUAL */}
      <div id="home">
        <HeroSection />
      </div>
      
      <div id="servicios">
        <ServicesSection isMobile={isMobile} />
      </div>
      
      <div id="mas-servicios">
        <MoreServicesSection isMobile={isMobile} />
      </div>
      
      <div id="nosotros">
        <AboutUs isMobile={isMobile} />
      </div>

      {/* Aquí tu sección de proyectos tipo galaxia */}
      <div id="proyectos">
        <ProjectsGalaxy isMobile={isMobile} />
      </div>
    </>
  );
};