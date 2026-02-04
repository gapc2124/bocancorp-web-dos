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
      <div id="home"><HeroSection /></div>
      <div id="servicios"><ServicesSection isMobile={isMobile} /></div>
      <div id="mas-servicios"><MoreServicesSection isMobile={isMobile} /></div>
      <div id="nosotros"><AboutUs isMobile={isMobile} /></div>
      {/* Aquí llamamos a tu sección de proyectos corregida */}
      <div id="proyectos"><ProjectsGalaxy isMobile={isMobile} /></div>
    </>
  );
};