import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- COMPONENTES GLOBALES ---
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

// --- PÁGINAS ---
import { HomePage } from './HomePage';
import { ServicesPage } from './ServicesPage';

// ... (tus imports se mantienen igual)

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    /* AGREGAMOS EL BASENAME AQUÍ */
    <BrowserRouter basename="/bocancorp-web-dos">
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        background: '#000c2d', 
        overflowX: 'hidden', 
        minHeight: '100vh', 
        color: 'white' 
      }}>
        
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
          <Nav />
        </div>

        <Routes>
          <Route path="/" element={<HomePage isMobile={isMobile} />} />
          <Route path="/servicios" element={<ServicesPage isMobile={isMobile} />} />
          <Route path="*" element={<HomePage isMobile={isMobile} />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;