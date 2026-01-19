import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, ContactShadows } from '@react-three/drei';
import { SolarSystemCarousel } from './components/SolarSystemCarousel';
import { Footer } from './components/Footer';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

const DATA = [
  { title: "Desarrollo Web y Movil", desc: "Creación de experiencias digitales de alto impacto, optimizadas para cualquier dispositivo.", tags: ["React", "Native"], color: "#FAA918", img: resolvePath("assets/web-texture.jpg") },
  { title: "Desarrollo de Software", desc: "Arquitecturas escalables y resilientes construidas nativamente para el entorno cloud.", tags: ["AWS", "Google Cloud"], color: "#00BFFF", img: resolvePath("assets/cloud-soft.jpg") },
  { title: "Automatizacion con IA", desc: "Transformamos procesos manuales en flujos inteligentes mediante algoritmos avanzados.", tags: ["AI", "Automation"], color: "#FF4500", img: resolvePath("assets/ai-texture.jpg") },
  { title: "Soluciones en la Nube", desc: "Migración a la nube, soporte continuo y protocolos de seguridad robustos.", tags: ["Migration", "Security"], color: "#44C591", img: resolvePath("assets/security.jpg") },
  { title: "Machine Learning", desc: "Modelos predictivos y análisis de datos en la nube para potenciar la toma de decisiones.", tags: ["ML", "Big Data"], color: "#9932CC", img: resolvePath("assets/ml-texture.jpg") }
];

const NAV_ITEMS = ["Servicios", "Sobre Nosotros", "Proyectos", "Contáctanos"];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenType, setScreenType] = useState<'mobile' | 'tablet' | 'laptop' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenType('mobile');
      else if (width < 1024) setScreenType('tablet');
      else if (width < 1440) setScreenType('laptop');
      else setScreenType('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % DATA.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + DATA.length) % DATA.length);
  
  const isSmallScreen = screenType === 'mobile' || screenType === 'tablet';

  const getCameraPosition = () => {
    switch (screenType) {
      case 'mobile': return [0, 0, 18];
      case 'tablet': return [0, 0, 16];
      case 'laptop': return [0, 0, 18];
      case 'desktop': return [0, 0, 18];
      default: return [0, 0, 18];
    }
  };

  const getGroupPosition = () => {
    switch (screenType) {
      case 'mobile': return [0, 1.2, 0];
      // CAMBIO: Subimos los planetas (de -2.0 a -1.3) para que no se salgan abajo
      case 'tablet': return [0, -1.0, 0];
      case 'laptop': return [0, -1.3, 0]; 
      case 'desktop': return [0, -1.3, 0];
      default: return [0, -1.3, 0];
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#02040a', overflowX: 'hidden' }}>
      
      {/* CAMBIO: Reduje height de 100vh a 95vh para que sea visualmente más corto si se desea */}
      <header className="hero-header" style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <nav className="navbar-fixed" style={{ zIndex: 100 }}>
          <div style={{ fontWeight: 800, fontSize: '1.5rem', display: 'flex', gap: '10px', alignItems: 'center', color: 'white' }}>
            <img src={resolvePath("assets/bocancorp-logo.png")} alt="Logo" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => e.currentTarget.style.display='none'} />
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>BOCANCORP</span>
          </div>
          {!isSmallScreen && (
            <div className="nav-links-desktop">
              {NAV_ITEMS.map(item => <a key={item} href="#" className="nav-link">{item}</a>)}
              <div style={{ width: '1px', height: '20px', background: 'var(--c-1)', margin: '0 10px' }}></div>
              <span style={{ color: 'var(--c-1)', fontWeight: 800 }}>ES</span>
            </div>
          )}
          {isSmallScreen && (
            <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </div>
          )}
        </nav>
        
        {mobileMenuOpen && (
          <div style={{ position: 'absolute', top: '70px', left: 0, width: '100%', zIndex: 999, background: 'rgba(5, 10, 25, 0.95)', padding: '20px', borderBottom: '1px solid var(--c-1)', backdropFilter: 'blur(10px)' }}>
            {NAV_ITEMS.map(item => (<div key={item} style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>{item}</div>))}
          </div>
        )}

        <div className="hero-layout" style={{ flex: 1, width: '100%', height: '100%', position: 'relative' }}>
          
          <div className="hero-canvas-section" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
            <Canvas camera={{ position: getCameraPosition() as any, fov: isSmallScreen ? 45 : 35 }}>
              <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
              <ambientLight intensity={0.6} /> 
              <pointLight position={[0, 0, 0]} intensity={3} color="#ffffff" distance={20} decay={2} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
              <Suspense fallback={null}>
                <group position={getGroupPosition() as any}>
                  <SolarSystemCarousel data={DATA} activeIndex={activeIndex} setActiveIndex={setActiveIndex} screenType={screenType} logoPath={resolvePath("assets/bocancorp-logo.png")} />
                </group>
              </Suspense>
              <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={60} blur={4} far={10} color="#000" />
            </Canvas>
          </div>

          <div className="hero-text-section" style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            zIndex: 30, pointerEvents: 'none', 
            display: 'flex', flexDirection: 'column', 
            justifyContent: isSmallScreen ? 'center' : 'flex-start', 
            alignItems: 'center', 
            // CAMBIO: Reducimos padding top de 130px a 90px para subir todo el bloque
            paddingTop: isSmallScreen ? '0' : '90px', 
            paddingLeft: '20px', paddingRight: '20px' 
          }}>
            <div key={activeIndex} className="fade-in" style={{ 
              pointerEvents: 'auto', width: '100%', maxWidth: isSmallScreen ? '100%' : '1000px', 
              textAlign: 'center', background: isSmallScreen ? 'transparent' : 'rgba(0, 5, 20, 0.4)', 
              backdropFilter: isSmallScreen ? 'none' : 'blur(8px)', borderRadius: '20px', 
              padding: isSmallScreen ? '0' : '30px 50px', 
              border: isSmallScreen ? 'none' : '1px solid rgba(255,255,255,0.05)' 
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                 <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--c-1)' }}>0{activeIndex + 1}</span>
                 <div style={{ width: '40px', height: '2px', background: 'var(--c-1)' }}></div>
                 <span style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', letterSpacing: '2px' }}>SYSTEM_NODE</span>
              </div>

              {/* CAMBIO: Reducimos minHeight del título de 160px a 120px */}
              <div style={{ minHeight: isSmallScreen ? 'auto' : '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, fontWeight: 800, color: 'white', textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
                  {DATA[activeIndex].title}
                </h1>
              </div>

              {/* CAMBIO: Reducimos minHeight de descripción de 90px a 60px */}
              <div style={{ minHeight: isSmallScreen ? 'auto' : '60px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: '30px' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', maxWidth: '800px' }}>
                  {DATA[activeIndex].desc}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '25px', alignItems: 'center', justifyContent: 'center', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                <button style={{ background: 'white', color: '#000', border: 'none', padding: '14px 40px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', borderRadius: '50px', boxShadow: `0 0 20px ${DATA[activeIndex].color}40`, transition: 'transform 0.2s' }}>EXPLORAR</button>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={handlePrev} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', backdropFilter: 'blur(5px)' }}><i className="fa-solid fa-chevron-left"></i></button>
                  <button onClick={handleNext} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', backdropFilter: 'blur(5px)' }}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* MAIN Y FOOTER SIGUEN IGUAL... */}
      <main style={{ background: 'white', color: '#02040a', padding: '100px 20px', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: '30px', color: '#02040a' }}>Innovación Tecnológica</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', maxWidth: '800px', margin: '0 auto 60px auto' }}>
            En el núcleo de nuestra estrategia está la adopción de tecnologías avanzadas, adaptadas a las necesidades de cada proyecto. Destacamos en el desarrollo personalizado de software, abarcando desde Data Science hasta soluciones en la nube.
          </p>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FAA918', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '60px' }}>Creando el Futuro a Medida</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(3, 1fr)', gap: '40px', textAlign: 'left' }}>
            <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '20px', transition: '0.3s' }}>
              <div style={{ width: '60px', height: '60px', background: '#e0e0e0', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#02040a', fontSize: '1.5rem' }}><i className="fa-solid fa-layer-group"></i></div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '15px' }}>Soluciones Adaptativas</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Desarrollamos software personalizado que se ajusta a las necesidades específicas de tu proyecto.</p>
            </div>
            <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '20px', transition: '0.3s' }}>
              <div style={{ width: '60px', height: '60px', background: '#e0e0e0', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#02040a', fontSize: '1.5rem' }}><i className="fa-solid fa-chart-line"></i></div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '15px' }}>Maestría Analítica</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Nuestra experiencia en Data Science garantiza análisis de datos profundos.</p>
            </div>
            <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '20px', transition: '0.3s' }}>
              <div style={{ width: '60px', height: '60px', background: '#e0e0e0', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#02040a', fontSize: '1.5rem' }}><i className="fa-solid fa-cloud"></i></div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '15px' }}>Agilidad en la Nube</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Soluciones en la nube que permiten una implementación ágil y eficiente.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;