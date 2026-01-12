import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, ContactShadows } from '@react-three/drei';
import { SolarSystemCarousel } from './components/SolarSystemCarousel';

const DATA = [
  { title: "SERVER_CORE", desc: "Infraestructura crítica optimizada.", tags: ["DevOps", "Bocancorp"], color: "#FAA918" },
  { title: "DATA_SYNC", desc: "Sincronización global.", tags: ["SQL", "Cloud"], color: "#00BFFF" },
  { title: "SECURE_NET", desc: "Protocolos de seguridad.", tags: ["Security", "Cipher"], color: "#FF4500" },
  { title: "AI_INSIGHT", desc: "Análisis predictivo con IA.", tags: ["AI", "Python"], color: "#44C591" },
  { title: "REACT_UI", desc: "Interfaces inmersivas.", tags: ["React", "ThreeJS"], color: "#9932CC" }
];

const NAV_ITEMS = ["Servicios", "Sobre Nosotros", "Proyectos", "Contáctanos"];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % DATA.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + DATA.length) % DATA.length);

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <header className="hero-header">
        <nav className="navbar-fixed">
          <div style={{ fontWeight: 800, fontSize: '1.5rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '12px', height: '12px', background: 'var(--c-1)', boxShadow: '0 0 15px var(--c-1)' }}></div>
            BOCANCORP
          </div>
          <div className="nav-links-desktop">
            {NAV_ITEMS.map(item => <a key={item} href="#" className="nav-link">{item}</a>)}
            <div style={{ width: '1px', height: '20px', background: 'var(--c-1)', margin: '0 10px' }}></div>
            <span style={{ color: 'var(--c-1)', fontWeight: 800 }}>Español</span>
            <span style={{ color: 'white', opacity: 0.7 }}>English</span>
          </div>
          <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </div>
        </nav>

        {/* Menú Móvil */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute', top: '80px', left: 0, width: '100%', zIndex: 999,
            background: 'rgba(12, 23, 70, 0.98)', padding: '20px', borderBottom: '2px solid var(--c-1)'
          }}>
            {NAV_ITEMS.map(item => (
              <div key={item} style={{ padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>{item}</div>
            ))}
          </div>
        )}

        <div className="hero-layout" style={{ flex: 1, display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
          
          {/* Texto Izquierda */}
          <div className="hero-text-section" style={{
            flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
            paddingLeft: '6%', paddingRight: '20px', zIndex: 20, pointerEvents: 'none'
          }}>
            <div key={activeIndex} className="fade-in" style={{ pointerEvents: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                 <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-1)' }}>0{activeIndex + 1}</span>
                 <div style={{ width: '50px', height: '4px', background: 'var(--c-1)' }}></div>
                 <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--c-4)', letterSpacing: '1px' }}>SYSTEM_NODE</span>
              </div>

              <h1 style={{ 
                fontSize: 'clamp(3.5rem, 6vw, 6rem)', lineHeight: 0.9, marginBottom: '25px', fontWeight: 800,
                textShadow: '0 5px 30px rgba(0,0,0,0.8)' 
              }}>
                {DATA[activeIndex].title}
              </h1>

              <p style={{ 
                fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '40px', color: '#eee', maxWidth: '600px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)' 
              }}>
                {DATA[activeIndex].desc}
              </p>

              <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                <button style={{
                  background: 'var(--c-1)', color: '#000', border: 'none', padding: '16px 35px',
                  fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', borderRadius: '2px'
                }}>EXPLORAR NODO</button>
                
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={handlePrev} style={{
                    background: 'rgba(0,0,0,0.3)', border: '2px solid var(--c-1)', color: 'var(--c-1)',
                    width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                  }}><i className="fa-solid fa-chevron-left"></i></button>
                  <button onClick={handleNext} style={{
                    background: 'rgba(0,0,0,0.3)', border: '2px solid var(--c-1)', color: 'var(--c-1)',
                    width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                  }}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas 3D */}
          <div className="hero-canvas-section" style={{ flex: 1.5, height: '100%', position: 'relative', zIndex: 10 }}>
            <Canvas camera={{ position: [0, 2, 10], fov: 35 }}>
              <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
              
              <ambientLight intensity={0.8} /> 
              <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
              <pointLight position={[-10, -5, -10]} intensity={1} color="#001670" />

              {/* --- CAMBIO AQUÍ: Y = 1.2 (Más arriba) --- */}
              <group position={[0.5, 0.7, 0]}>
                <SolarSystemCarousel 
                  data={DATA} 
                  activeIndex={activeIndex} 
                  setActiveIndex={setActiveIndex} 
                />
              </group>
              
              <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={50} blur={3} far={10} color="#000" />
            </Canvas>
          </div>
        </div>
      </header>

      <main style={{ padding: '80px 10%', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#001670' }}>Explora el Universo Bocancorp</h2>
        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#555' }}>
          El sistema solar superior representa nuestros nodos de servicio principales...
        </p>
      </main>

    </div>
  );
}

export default App;