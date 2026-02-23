import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom';

// --- COMPONENTES GLOBALES ---
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

// --- PÁGINAS ---
import { HomePage } from './HomePage';
import { ServicesPage } from './ServicesPage';
import { AboutUsPage } from './AboutUsPage';
import { ContactUsPage } from './ContactUsPage';
import { ProjectsPage } from './ProjectsPage'; 

// 👇 1. CREAMOS UN LAYOUT PARA ENVOLVER LA APP Y LEER EL IDIOMA
const AppLayout = () => {
  const { lang } = useParams();
  
  // Si alguien escribe un idioma que no existe (ej. /fr/), lo forzamos a /es
  if (lang !== 'es' && lang !== 'en') {
    return <Navigate to="/es" replace />;
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
        <Nav />
      </div>
      <Outlet /> {/* Aquí se inyectan las páginas dinámicamente */}
      <Footer />
    </>
  );
};

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BrowserRouter basename="/">
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        background: '#000c2d', 
        overflowX: 'clip', 
        minHeight: '100vh', 
        color: 'white' 
      }}>
        <Routes>
          {/* 👇 2. REDIRECCIÓN RAIZ: Si entran a /, los manda a /es */}
          <Route path="/" element={<Navigate to="/es" replace />} />

          {/* 👇 3. TODAS LAS RUTAS AHORA VIVEN DENTRO DE /:lang */}
          <Route path="/:lang" element={<AppLayout />}>
            <Route index element={<HomePage isMobile={isMobile} />} />
            <Route path="servicios" element={<ServicesPage isMobile={isMobile} />} />
            <Route path="nosotros" element={<AboutUsPage isMobile={isMobile} />} />
            <Route path="contacto" element={<ContactUsPage isMobile={isMobile} />} />
            <Route path="proyectos" element={<ProjectsPage isMobile={isMobile} />} />
            
            {/* Si escriben cualquier otra cosa, los manda al Home del idioma actual */}
            <Route path="*" element={<HomePage isMobile={isMobile} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;