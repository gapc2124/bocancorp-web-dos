import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- COMPONENTES GLOBALES ---
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

// --- PÁGINAS ---
import { HomePage } from './HomePage';
import { ServicesPage } from './ServicesPage';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BrowserRouter>
      <div style={{ position: 'relative', width: '100%', background: '#000c2d', overflowX: 'hidden', minHeight: '100vh', color: 'white' }}>
        
        {/* NAV FIJO (Se muestra en todas las páginas) */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
          <Nav />
        </div>

        <Routes>
          {/* RUTA AL HOME (Tu Landing Page normal) */}
          <Route path="/" element={<HomePage isMobile={isMobile} />} />

          {/* RUTA A SERVICIOS (El diseño de Auroras + Carrusel) */}
          <Route path="/servicios" element={<ServicesPage isMobile={isMobile} />} />

          {/* RUTA COMODÍN (Si se pierden, van al Home) */}
          <Route path="*" element={<HomePage isMobile={isMobile} />} />
        </Routes>

        {/* FOOTER (Se muestra en todas las páginas) */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;