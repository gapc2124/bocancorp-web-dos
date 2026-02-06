import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// 1. DATA
// ==========================================
interface Project {
  id: string;
  name: string;
  color: string;
  desc: string;
  img: string;
  icon: string;
  orbitRadius: number; 
  speed: number;
  initialAngle: number;
}

const UNIFIED_SPEED = 0.4;

const PROJECTS_DATA: Project[] = [
  { 
    id: 'miranda', name: 'Miranda', color: '#00d2ff', 
    desc: 'Optimización de rutas y gestión logística inteligente.', 
    img: './assets/Miranda.png', icon: './assets/logo.png', 
    orbitRadius: 140, speed: UNIFIED_SPEED, initialAngle: 0 
  },
  { 
    id: 'myintelli', name: 'MyIntelli', color: '#ff4b4b', 
    desc: 'Consultoría integral de Ciberseguridad.', 
    img: './assets/MyIntelli.png', icon: './assets/logo.png', 
    orbitRadius: 225, speed: UNIFIED_SPEED, initialAngle: 120 
  },
  { 
    id: 'datecsa', name: 'DATECSA', color: '#ffae00', 
    desc: 'Plataforma transaccional B2B de alto rendimiento.', 
    img: './assets/DateCSA.png', icon: './assets/logo.png', 
    orbitRadius: 315, speed: UNIFIED_SPEED, initialAngle: 240 
  },
  { 
    id: 'ruedaverde', name: 'RuedaVerde', color: '#00ff88', 
    desc: 'Desarrollo de Chatbot inteligente con IA Generativa.', 
    img: './assets/RuedaVerde.png', icon: './assets/logo.png', 
    orbitRadius: 410, speed: UNIFIED_SPEED, initialAngle: 60 
  },
  { 
    id: 'tuulapp', name: 'TuulApp', color: '#aa00ff', 
    desc: 'Marketplace de servicios on-demand.', 
    img: './assets/tuulapp.png', icon: './assets/logo.png', 
    orbitRadius: 510, speed: UNIFIED_SPEED, initialAngle: 180 
  },
  { 
    id: 'ingram', name: 'Ingram', color: '#2952ff', 
    desc: 'Integración global de inventarios y logística.', 
    img: './assets/Ingram.png', icon: './assets/logo.png', 
    orbitRadius: 620, speed: UNIFIED_SPEED, initialAngle: 300 
  }
];

// ==========================================
// 2. COMPONENTE: TARJETA GIRATORIA
// ==========================================
const ProjectFlipCard = ({ project, isMobile }: { project: Project, isMobile: boolean }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => { setIsFlipped(false); }, [project.id]);

  const faceStyle: React.CSSProperties = {
    position: 'absolute', width: '100%', height: '100%',
    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
    borderRadius: '30px', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', padding: isMobile ? '15px' : '30px',
    border: `1px solid ${project.color}`,
    background: 'rgba(20, 20, 30, 0.6)',
    backdropFilter: 'blur(12px)',
  };

  return (
    <div style={{ width: '100%', maxWidth: isMobile ? '90vw' : '400px', height: isMobile ? '400px' : '480px', perspective: '1000px', cursor: 'pointer', margin: '0 auto' }} onClick={() => setIsFlipped(!isFlipped)}>
      <div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div style={{ ...faceStyle }}>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
            <img src={project.img} alt={project.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <p style={{ marginTop: '10px', marginBottom: '10px', color: project.color, fontWeight: '900', fontSize: isMobile ? '1.2rem' : '1.5rem', letterSpacing: '1px', textAlign: 'center', animation: 'pulse 2s infinite' }}>CLICK PARA DETALLES ↻</p>
        </div>
        <div style={{ ...faceStyle, transform: 'rotateY(180deg)', background: '#1a1a2e' }}>
          <h3 style={{ color: project.color, fontSize: isMobile ? '1.8rem' : '2.2rem', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 900, textAlign: 'center' }}>{project.name}</h3>
          <p style={{ fontSize: isMobile ? '1rem' : '1.1rem', lineHeight: 1.6, color: '#ddd', textAlign: 'center' }}>{project.desc}</p>
          <button style={{ marginTop: 'auto', marginBottom: '20px', padding: '12px 35px', background: project.color, border: 'none', borderRadius: '50px', color: 'black', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Ver Más ➜</button>
        </div>
      </div>
      <style>{`@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
};

// ==========================================
// 3. COMPONENTE: SISTEMA SOLAR
// ==========================================
interface SolarSystemProps {
  projects: Project[];
  activeId: string;
  onSelect: (id: string) => void;
  isMobile: boolean;
}

const SolarSystem = ({ projects, activeId, onSelect, isMobile }: SolarSystemProps) => {
  const requestRef = useRef<number>(0);
  const angles = useRef(projects.map((p) => p.initialAngle * (Math.PI / 180)));
  
  // --- DETECCIÓN DE PANTALLA PARA AJUSTES DE TAMAÑO ---
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth < 590;
  
  const FIXED_TILT = 35; 
  
  // LÓGICA DE ESCALA:
  // - Móvil: 0.42
  // - Desktop mediano (< 1400px): 0.55 (Achicamos un poco como pediste)
  // - Desktop grande (> 1400px): 0.65 (Original)
  const scaleFactor = isMobile ? 0.42 : (windowWidth < 1400 ? 0.55 : 0.65);

  const animate = () => {
    projects.forEach((p, index) => {
      angles.current[index] += 0.002;
      const angle = angles.current[index];
      
      // En pantallas pequeñas (<590) reducimos el radio al 60%
      const r = isSmallScreen ? p.orbitRadius * 0.6 : p.orbitRadius; 
      
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      
      const el = document.getElementById(`planet-${p.id}`);
      if (el) {
        el.style.transform = `
          translate3d(${x}px, ${y}px, 0) 
          rotateX(${-FIXED_TILT}deg) 
        `;
      }
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [projects, isSmallScreen]); 

  return (
    <div 
      style={{
        position: 'relative', width: '100%', 
        height: isMobile ? '450px' : '900px', 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        perspective: '1200px',
        overflow: 'visible',
        marginTop: isMobile ? '-20px' : '-100px'
      }}
    >
      <div style={{
        position: 'relative', width: '0px', height: '0px',
        transformStyle: 'preserve-3d',
        transform: `scale(${scaleFactor}) rotateX(${FIXED_TILT}deg)`,
        transition: 'transform 0.5s ease-out'
      }}>
        
        {/* SOL */}
        <div style={{
          position: 'absolute', top: '-40px', left: '-40px',
          width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#FFD700',
          boxShadow: '0 0 60px #FFD700, 0 0 30px #FF8C00', 
          transform: `rotateX(${-FIXED_TILT}deg)`,
          zIndex: 10
        }} />

        {/* PLANETAS Y ÓRBITAS */}
        {projects.map((p) => {
          const isActive = activeId === p.id;
          
          const currentRadius = isSmallScreen ? p.orbitRadius * 0.6 : p.orbitRadius;
          const size = isActive ? (isMobile ? 80 : 90) : (isMobile ? 60 : 60);

          return (
            <React.Fragment key={p.id}>
              {/* Órbita */}
              <div style={{
                position: 'absolute', 
                top: `-${currentRadius}px`, left: `-${currentRadius}px`,
                width: `${currentRadius * 2}px`, height: `${currentRadius * 2}px`,
                border: '3px dashed rgba(255, 255, 255, 0.5)',
                borderRadius: '50%', pointerEvents: 'none', zIndex: 1,
                transition: 'all 0.3s ease'
              }} />
              
              {/* Cuerpo del Planeta */}
              <div
                id={`planet-${p.id}`}
                onClick={(e) => { e.stopPropagation(); onSelect(p.id); }}
                style={{
                  position: 'absolute', top: `-${size/2}px`, left: `-${size/2}px`,
                  width: `${size}px`, height: `${size}px`, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 20
                }}
              >
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%', backgroundColor: p.color, 
                  boxShadow: isActive ? `0 0 40px ${p.color}` : `0 0 15px ${p.color}`,
                  border: '2px solid white', transition: 'width 0.3s, height 0.3s', 
                  position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                }}>
                  <img src={p.icon} alt="icon" style={{ width: '60%', height: '60%', objectFit: 'contain', pointerEvents: 'none', filter: 'brightness(0) invert(1)' }} />
                  {isActive && <div style={{ position: 'absolute', top: isMobile ? -35 : -45, left: '50%', transform: 'translateX(-50%)', fontSize: isMobile ? '24px' : '30px' }}>🚀</div>}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ 
        position: 'absolute', bottom: '10px', 
        color: 'rgba(255,255,255,0.3)', 
        fontSize: '0.8rem', fontWeight: 300, pointerEvents: 'none', letterSpacing: '1px'
      }}>
        Pulsa en los mundos
      </div>
    </div>
  );
};

// ==========================================
// 4. COMPONENTE PRINCIPAL
// ==========================================
export const ProjectsGalaxy = ({ isMobile }: { isMobile: boolean }) => {
  const [activeId, setActiveId] = useState<string>(PROJECTS_DATA[0].id);
  const activeProject = useMemo(() => PROJECTS_DATA.find(p => p.id === activeId) || PROJECTS_DATA[0], [activeId]);

  // Hook para detectar < 590px específicamente
  const [isSuperSmall, setIsSuperSmall] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsSuperSmall(window.innerWidth < 590);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // LOGICA PARA FLECHAS
  const handleNext = () => {
    const currentIndex = PROJECTS_DATA.findIndex(p => p.id === activeId);
    const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
    setActiveId(PROJECTS_DATA[nextIndex].id);
  };

  const handlePrev = () => {
    const currentIndex = PROJECTS_DATA.findIndex(p => p.id === activeId);
    const prevIndex = (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    setActiveId(PROJECTS_DATA[prevIndex].id);
  };

  // DEFINICIÓN DEL GAP (ESPACIO)
  // - < 590px: 110px (Muy cerca, como pediste)
  // - Móvil normal: 230px
  // - Desktop: 50px
  const currentGap = isSuperSmall ? '110px' : (isMobile ? '230px' : '50px');

  return (
    <section style={{
      width: '100%', minHeight: '100vh', backgroundColor: '#000c2d', 
      backgroundImage: `radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px), radial-gradient(rgba(255,255,255,.1) 1px, transparent 1px)`,
      backgroundSize: '450px 450px, 250px 250px, 100px 100px', backgroundPosition: '0 0, 40px 60px, 130px 270px',
      padding: isMobile ? '30px 10px' : '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden'
    }}>
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: isMobile ? '1.8rem' : '3.5rem', marginBottom: '20px', fontWeight: 900, textTransform: 'uppercase', textShadow: '0 0 30px rgba(255,255,255,0.2)' }}>
        Conoce algunos de nuestros <span style={{ color: '#FAA918' }}>proyectos exitosos</span>
      </h2>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        maxWidth: '1600px', 
        gap: currentGap, // Usamos la variable dinámica
        transition: 'gap 0.3s ease'
      }}>
        <div style={{ flex: '1 1 600px', minWidth: '300px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <SolarSystem projects={PROJECTS_DATA} activeId={activeId} onSelect={setActiveId} isMobile={isMobile} />
        </div>
        
        <div style={{ 
          flex: '0 1 450px', minWidth: '280px', width: '100%', 
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          zIndex: 30 
        }}>
          <ProjectFlipCard project={activeProject} isMobile={isMobile} />
          
          <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
            <button onClick={handlePrev} style={arrowBtnStyle}>←</button>
            <button onClick={handleNext} style={arrowBtnStyle}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Estilo simple para las flechas
const arrowBtnStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.3)',
  color: 'white',
  fontSize: '1.5rem',
  width: '50px', height: '50px',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'all 0.2s',
  backdropFilter: 'blur(5px)'
};

export default ProjectsGalaxy;