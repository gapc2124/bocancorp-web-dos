import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, ContactShadows } from '@react-three/drei';
import { SolarSystemCarousel } from './components/SolarSystemCarousel';

// --- DATOS ---
const DATA = [
  { title: "SERVER_CORE", desc: "Infraestructura crítica optimizada.", tags: ["DevOps", "Bocancorp"], color: "#FAA918" },
  { title: "DATA_SYNC", desc: "Sincronización global.", tags: ["SQL", "Cloud"], color: "#00BFFF" },
  { title: "SECURE_NET", desc: "Protocolos de seguridad.", tags: ["Security", "Cipher"], color: "#FF4500" },
  { title: "AI_INSIGHT", desc: "Análisis predictivo con IA.", tags: ["AI", "Python"], color: "#44C591" },
  { title: "REACT_UI", desc: "Interfaces inmersivas.", tags: ["React", "ThreeJS"], color: "#9932CC" }
];

const NAV_ITEMS = ["Servicios", "Sobre Nosotros", "Proyectos", "Contáctanos"];

// --- COMPONENTE FOOTER ---
const Footer = () => (
  <footer style={{
    position: 'absolute',
    bottom: '30px',
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    pointerEvents: 'none' // Deja pasar clics excepto en los botones
  }}>
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '12px 40px',
      borderRadius: '50px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      gap: '25px',
      alignItems: 'center',
      pointerEvents: 'auto', // Reactivar clics
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }}>
      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600 }}>
        © 2026 BOCANCORP
      </span>
      <div style={{ width: '1px', height: '15px', background: 'rgba(255,255,255,0.2)' }}></div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', transition: '0.3s' }}><i className="fa-brands fa-github"></i></a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', transition: '0.3s' }}><i className="fa-brands fa-linkedin"></i></a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', transition: '0.3s' }}><i className="fa-brands fa-instagram"></i></a>
      </div>
    </div>
  </footer>
);

// --- APP PRINCIPAL ---
function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Estado para responsividad (Breakpoint: 1000px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % DATA.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + DATA.length) % DATA.length);

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#02040a', overflow: 'hidden' }}>
      
      {/* --- HEADER --- */}
      <header className="hero-header" style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <nav className="navbar-fixed" style={{ zIndex: 100 }}>
          <div style={{ fontWeight: 800, fontSize: '1.5rem', display: 'flex', gap: '10px', alignItems: 'center', color: 'white' }}>
            <div style={{ width: '12px', height: '12px', background: 'var(--c-1)', boxShadow: '0 0 15px var(--c-1)' }}></div>
            BOCANCORP
          </div>
          
          {/* Navegación Desktop */}
          {!isMobile && (
            <div className="nav-links-desktop">
              {NAV_ITEMS.map(item => <a key={item} href="#" className="nav-link">{item}</a>)}
              <div style={{ width: '1px', height: '20px', background: 'var(--c-1)', margin: '0 10px' }}></div>
              <span style={{ color: 'var(--c-1)', fontWeight: 800 }}>ES</span>
            </div>
          )}

          {/* Botón Móvil */}
          {isMobile && (
            <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </div>
          )}
        </nav>

        {/* Menú Desplegable Móvil */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute', top: '70px', left: 0, width: '100%', zIndex: 999,
            background: 'rgba(5, 10, 25, 0.95)', padding: '20px', borderBottom: '1px solid var(--c-1)',
            backdropFilter: 'blur(10px)'
          }}>
            {NAV_ITEMS.map(item => (
              <div key={item} style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>{item}</div>
            ))}
          </div>
        )}

        <div className="hero-layout" style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: isMobile ? 'column-reverse' : 'row', // En móvil, texto abajo o sobrepuesto
          width: '100%', 
          height: '100%', 
          position: 'relative' 
        }}>
          
          {/* --- SECCIÓN DE TEXTO (IZQUIERDA O SOBREPUESTA) --- */}
          <div className="hero-text-section" style={{
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            paddingLeft: isMobile ? '20px' : '8%', 
            paddingRight: '20px', 
            zIndex: 30, 
            pointerEvents: 'none', // Permitir clic a través del contenedor vacío
            // En móvil centramos y agregamos fondo para legibilidad
            position: isMobile ? 'absolute' : 'relative',
            width: isMobile ? '100%' : 'auto',
            height: '100%',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
            background: isMobile ? 'linear-gradient(to top, #02040a 10%, transparent 80%)' : 'none'
          }}>
            <div key={activeIndex} className="fade-in" style={{ pointerEvents: 'auto', maxWidth: '650px' }}>
              
              {/* Indicador de Nodo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                 <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--c-1)' }}>0{activeIndex + 1}</span>
                 <div style={{ width: '40px', height: '2px', background: 'var(--c-1)' }}></div>
                 <span style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', letterSpacing: '2px' }}>SYSTEM_NODE</span>
              </div>

              {/* Título Principal */}
              <h1 style={{ 
                fontSize: 'clamp(3rem, 5vw, 5.5rem)', 
                lineHeight: 0.95, 
                marginBottom: '25px', 
                fontWeight: 800,
                color: 'white',
                textShadow: '0 10px 40px rgba(0,0,0,0.8)' 
              }}>
                {DATA[activeIndex].title}
              </h1>

              {/* Descripción */}
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.6, 
                marginBottom: '40px', 
                color: 'rgba(255,255,255,0.8)', 
                maxWidth: isMobile ? '90%' : '500px',
                textShadow: '0 2px 10px rgba(0,0,0,1)' 
              }}>
                {DATA[activeIndex].desc}
              </p>

              {/* Botones de Acción */}
              <div style={{ display: 'flex', gap: '25px', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row' }}>
                <button style={{
                  background: 'white', color: '#000', border: 'none', padding: '16px 40px',
                  fontWeight: 700, fontSize: '1rem', cursor: 'pointer', borderRadius: '50px',
                  boxShadow: `0 0 20px ${DATA[activeIndex].color}40`,
                  transition: 'transform 0.2s'
                }}>
                  EXPLORAR
                </button>
                
                {/* Controles del Carrusel */}
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={handlePrev} style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white',
                    width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                    backdropFilter: 'blur(5px)'
                  }}><i className="fa-solid fa-chevron-left"></i></button>
                  <button onClick={handleNext} style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white',
                    width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                    backdropFilter: 'blur(5px)'
                  }}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECCIÓN 3D (DERECHA O FONDO) --- */}
          <div className="hero-canvas-section" style={{ 
            flex: 1.5, 
            height: '100%', 
            position: isMobile ? 'absolute' : 'relative', // En móvil ocupa todo el fondo
            top: 0, left: 0,
            width: '100%',
            zIndex: 10,
            // Máscara para suavizar la transición con el texto en móvil
            maskImage: isMobile ? 'linear-gradient(to bottom, black 60%, transparent 100%)' : 'none'
          }}>
            <Canvas camera={{ 
              // En móvil alejamos la cámara (z=16) para que quepa todo, en PC más cerca (z=10)
              position: isMobile ? [0, 0, 16] : [0, 2, 10], 
              fov: isMobile ? 45 : 35 
            }}>
              <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
              
              <ambientLight intensity={0.6} /> 
              <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
              <pointLight position={[-10, -5, -10]} intensity={1} color={DATA[activeIndex].color} />

              {/* Posición ajustada: En móvil lo subimos un poco para que no quede detrás del texto */}
              <group position={[isMobile ? 0 : 1.5, isMobile ? 1.5 : 0.7, 0]}>
                <SolarSystemCarousel 
                  data={DATA} 
                  activeIndex={activeIndex} 
                  setActiveIndex={setActiveIndex} 
                />
              </group>
              
              <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={60} blur={4} far={10} color="#000" />
            </Canvas>
          </div>
        </div>

        {/* --- FOOTER FLOTANTE --- */}
        <Footer />
        
      </header>
    </div>
  );
}

export default App;