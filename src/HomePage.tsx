import { Helmet } from 'react-helmet-async'; // 👈 Importamos el casco SEO
import { HeroSection } from './components/HeroSection'; 
import { ServicesSection } from './components/ServicesSection';
import { MoreServicesSection } from './components/MoreServicesSection'; 
import { ProjectsGalaxy } from './components/ProjectsGalaxy'; 
import { AboutUs } from './components/AboutUs'; 

interface HomePageProps {
  isMobile: boolean;
}

export const HomePage = ({ isMobile }: HomePageProps) => {
  return (
    <>
      {/* 1️⃣ SECCIÓN SEO (Invisible para el usuario, vital para Google) */}
      <Helmet>
        <title>Bocancorp | Crear Software y Servicios Cloud de Alto Nivel</title>
        <meta name="description" content="Transformamos ideas en ecosistemas digitales. Expertos en crear software a medida, servicios cloud con AWS, ciberseguridad y automatización para empresas." />
        <meta name="keywords" content="Bocancorp, crear software, servicios cloud, AWS partner, desarrollo de software Perú, arquitectura cloud, consultoría tecnológica" />
        
        {/* Etiquetas Open Graph para que al compartir por WhatsApp se vea genial */}
        <meta property="og:title" content="Bocancorp | Innovación y Desarrollo de Software" />
        <meta property="og:description" content="Expertos en arquitectura Cloud y soluciones digitales escalables." />
        <meta property="og:image" content="assets/multi_cloud.png" />
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