import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// 1. DATA (Actualizada con Iconos y Nuevas Descripciones)
// ==========================================
interface Project {
  id: string;
  name: string;
  color: string;
  desc: string;
  img: string;
  icon: string; // Nuevo campo para el icono del planeta
  orbitRadius: number; 
  speed: number;       
}

const PROJECTS_DATA: Project[] = [
  { 
    id: 'miranda', 
    name: 'Miranda', 
    color: '#00d2ff', 
    desc: 'Optimización de rutas y gestión logística inteligente.', 
    img: './assets/Miranda.png',
    icon: './assets/logo.png', // Icono por defecto
    orbitRadius: 110, 
    speed: 0.8 
  },
  { 
    id: 'myintelli', 
    name: 'MyIntelli', 
    color: '#ff4b4b', 
    // DESCRIPCIÓN ACTUALIZADA: Ciberseguridad
    desc: 'Consultoría integral de Ciberseguridad: Ethical Hacking (Caja Negra), auditoría de vulnerabilidades y capacitación técnica.', 
    img: './assets/MyIntelli.png', 
    icon: './assets/logo.png',
    orbitRadius: 160, 
    speed: 0.6 
  },
  { 
    id: 'datecsa', 
    name: 'DATECSA', 
    color: '#ffae00', 
    desc: 'Plataforma transaccional B2B de alto rendimiento.', 
    img: './assets/DateCSA.png', 
    icon: './assets/logo.png',
    orbitRadius: 210, 
    speed: 0.5 
  },
  { 
    id: 'ruedaverde', 
    name: 'RuedaVerde', 
    color: '#00ff88', 
    // DESCRIPCIÓN ACTUALIZADA: IA Generativa
    desc: 'Desarrollo de Chatbot inteligente con IA Generativa de texto para automatización y soporte al usuario.', 
    img: './assets/RuedaVerde.png', 
    icon: './assets/logo.png',
    orbitRadius: 260, 
    speed: 0.4 
  },
  { 
    id: 'tuulapp', 
    name: 'TuulApp', 
    color: '#aa00ff', 
    desc: 'Marketplace de servicios on-demand.', 
    img: './assets/tuulapp.png', 
    icon: './assets/logo.png',
    orbitRadius: 310, 
    speed: 0.3 
  },
  { 
    id: 'ingram', 
    name: 'Ingram', 
    color: '#2952ff', 
    desc: 'Integración global de inventarios y logística.', 
    img: './assets/Ingram.png', 
    icon: './assets/logo.png',
    orbitRadius: 360, 
    speed: 0.2 
  }
];

// ==========================================
// 2. COMPONENTE: TARJETA GIRATORIA (FLIP CARD)
// ==========================================
const ProjectFlipCard = ({ project, isMobile }: { project: Project, isMobile: boolean }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [project.id]);

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '15px' : '30px', 
    boxShadow: `0 0 50px ${project.color}20`,
    border: `1px solid ${project.color}`,
    background: 'rgba(214, 13, 13, 0.03)',
    backdropFilter: 'blur(12px)',
  };

  return (
    <div 
      style={{
        width: '100%',
        maxWidth: isMobile ? '90vw' : '400px',
        height: isMobile ? '400px' : '480px',
        perspective: '1000px',
        cursor: 'pointer',
        margin: '0 auto'
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        
        {/* --- FRENTE --- */}
        <div style={{ ...faceStyle }}>
          <div style={{
            flex: 1, 
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px'
          }}>
            <img 
              src={project.img} 
              alt={project.name} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
                filter: `drop-shadow(0 0 15px ${project.color}60)`
              }}
            />
          </div>

          <p style={{ 
            marginTop: '10px', 
            marginBottom: '10px',
            color: project.color, 
            fontWeight: '900', 
            fontSize: isMobile ? '1.2rem' : '1.5rem', 
            letterSpacing: '1px',
            textShadow: `0 0 15px ${project.color}60`,
            textAlign: 'center',
            animation: 'pulse 2s infinite'
          }}>
            CLICK PARA DETALLES ↻
          </p>
        </div>

        {/* --- REVERSO --- */}
        <div style={{ 
          ...faceStyle, 
          transform: 'rotateY(180deg)', 
          background: `linear-gradient(135deg, rgba(0,0,0,0.95) 0%, ${project.color}20 100%)`
        }}>
          <h3 style={{ 
            color: project.color, 
            fontSize: isMobile ? '1.8rem' : '2.2rem', 
            textTransform: 'uppercase', 
            marginBottom: '20px',
            fontWeight: 900,
            textShadow: `0 0 20px ${project.color}`,
            textAlign: 'center'
          }}>
            {project.name}
          </h3>
          
          <p style={{ 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            lineHeight: 1.6, 
            color: 'white', 
            textAlign: 'center',
            opacity: 0.95
          }}>
            {project.desc}
          </p>

          <button style={{
            marginTop: 'auto',
            marginBottom: '20px',
            padding: '12px 35px',
            background: project.color,
            border: 'none',
            borderRadius: '50px',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: `0 0 25px ${project.color}`,
            cursor: 'pointer'
          }}>
            Ver Más ➜
          </button>
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ==========================================
// 3. COMPONENTE: SISTEMA SOLAR (Planetas con Iconos)
// ==========================================
interface SolarSystemProps {
  projects: Project[];
  activeId: string;
  onSelect: (id: string) => void;
  isMobile: boolean;
}

const SolarSystem = ({ projects, activeId, onSelect, isMobile }: SolarSystemProps) => {
  const requestRef = useRef<number>(0);
  const angles = useRef(projects.map(() => Math.random() * Math.PI * 2));
  
  const scaleFactor = isMobile ? 0.5 : 1; 

  const animate = () => {
    projects.forEach((p, index) => {
      angles.current[index] += p.speed * 0.005; 
      const angle = angles.current[index];
      const r = p.orbitRadius * scaleFactor;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      const el = document.getElementById(`planet-${p.id}`);
      if (el) el.style.transform = `translate(${x}px, ${y}px)`;
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [projects, isMobile]);

  return (
    <div style={{
      position: 'relative', 
      width: '100%', 
      height: isMobile ? '400px' : '750px',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      overflow: 'visible' 
    }}>
      {/* SOL */}
      <div style={{
        position: 'absolute', width: isMobile ? '50px' : '80px', height: isMobile ? '50px' : '80px',
        borderRadius: '50%', backgroundColor: '#FFD700',
        boxShadow: '0 0 50px #FFD700, 0 0 20px #FF8C00', zIndex: 10
      }} />

      {/* PLANETAS */}
      {projects.map((p) => {
        const isActive = activeId === p.id;
        
        // Tamaños base
        const baseSizeActive = isMobile ? 30 : 45;
        const baseSizeInactive = isMobile ? 22 : 32;
        
        const size = isActive ? baseSizeActive : baseSizeInactive;
        const r = p.orbitRadius * scaleFactor;

        return (
          <React.Fragment key={p.id}>
            {/* Órbita */}
            <div style={{
              position: 'absolute', width: `${r * 2}px`, height: `${r * 2}px`,
              border: '1px dashed rgba(255, 255, 255, 0.1)', borderRadius: '50%', pointerEvents: 'none', zIndex: 1
            }} />
            
            {/* Cuerpo del Planeta */}
            <div
              id={`planet-${p.id}`}
              onClick={() => onSelect(p.id)}
              style={{
                position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 20
              }}
            >
              <div style={{
                width: `${size}px`, 
                height: `${size}px`, 
                borderRadius: '50%', 
                backgroundColor: p.color, // Color de fondo del planeta
                boxShadow: isActive ? `0 0 25px ${p.color}` : `0 0 8px ${p.color}`,
                border: '2px solid white', 
                transition: 'all 0.3s ease', 
                position: 'relative',
                display: 'flex',            // Para centrar el icono
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'          // Para que el icono no se salga del círculo
              }}>
                
                {/* --- ICONO DENTRO DEL PLANETA --- */}
                <img 
                  src={p.icon} 
                  alt="icon" 
                  style={{
                    width: '60%', // Ajusta el tamaño del icono dentro del planeta
                    height: '60%', 
                    objectFit: 'contain',
                    pointerEvents: 'none', // Evita que se arrastre la imagen
                    filter: 'brightness(0) invert(1)' // Opcional: Hace el icono blanco si es negro
                  }}
                />

                {/* Indicador de activo (cohete) */}
                {isActive && <div style={{ position: 'absolute', top: -35, left: '50%', transform: 'translateX(-50%)', fontSize: '20px' }}>🚀</div>}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ==========================================
// 4. COMPONENTE PRINCIPAL
// ==========================================
interface ProjectsGalaxyProps {
  isMobile: boolean;
}

export const ProjectsGalaxy = ({ isMobile }: ProjectsGalaxyProps) => {
  const [activeId, setActiveId] = useState<string>(PROJECTS_DATA[0].id);
  const activeProject = useMemo(() => PROJECTS_DATA.find(p => p.id === activeId) || PROJECTS_DATA[0], [activeId]);

  return (
    <section style={{
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#050510', 
      backgroundImage: `radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px)`,
      backgroundSize: '550px 550px, 350px 350px', 
      padding: isMobile ? '30px 10px' : '60px 40px',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      overflowX: 'hidden'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: 'white', 
        fontSize: isMobile ? '2rem' : '3.5rem', 
        marginBottom: '40px', 
        fontWeight: 900, 
        textTransform: 'uppercase', 
        textShadow: '0 0 30px rgba(255,255,255,0.2)'
      }}>
        Galaxia de <span style={{ color: '#FAA918' }}>Proyectos</span>
      </h2>

      <div style={{
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%', 
        maxWidth: '1600px', 
        gap: isMobile ? '30px' : '100px'
      }}>
        <div style={{ flex: '1 1 600px', minWidth: '300px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <SolarSystem projects={PROJECTS_DATA} activeId={activeId} onSelect={setActiveId} isMobile={isMobile} />
        </div>
        
        <div style={{ flex: '0 1 450px', minWidth: '280px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <ProjectFlipCard project={activeProject} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
};

export default ProjectsGalaxy;