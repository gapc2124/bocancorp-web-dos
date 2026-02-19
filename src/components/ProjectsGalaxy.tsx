import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { useNavigate } from 'react-router-dom'; // <-- 1. IMPORTAMOS useNavigate

// --- FUNCIÓN DE AYUDA PARA RUTAS (CRÍTICO: NO BORRAR) ---
const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.replace(/^(\.?\/)/, '');
  return `${base}${cleanPath}`;
};

// ==========================================
// 1. DICCIONARIO DE TEXTOS Y CONFIGURACIÓN
// ==========================================

// Configuración visual estática (No cambia con el idioma, RUTAS LIMPIAS)
const PROJECTS_CONFIG = [
  { 
    id: 'miranda', name: 'Miranda', color: '#FFFFFF', 
    img: 'assets/Miranda.png', icon: 'assets/project1.png', 
    orbitRadius: 130, speed: 0.4, initialAngle: 0 
  },
  { 
    id: 'myintelli', name: 'MyIntelli', color: '#33BEFF', 
    img: 'assets/MyIntelli.png', icon: 'assets/project2.png', 
    orbitRadius: 200, speed: 0.4, initialAngle: 120 
  },
  { 
    id: 'datecsa', name: 'DATECSA', color: '#FF3333', 
    img: 'assets/DateCSA.png', icon: 'assets/project3.png', 
    orbitRadius: 270, speed: 0.4, initialAngle: 240 
  },
  { 
    id: 'ruedaverde', name: 'RuedaVerde', color: '#00ff88', 
    img: 'assets/RuedaVerde.png', icon: 'assets/project4.png', 
    orbitRadius: 340, speed: 0.4, initialAngle: 60 
  },
  { 
    id: 'tuulapp', name: 'TuulApp', color: '#aa00ff', 
    img: 'assets/tuulapp.png', icon: 'assets/project5.png', 
    orbitRadius: 410, speed: 0.4, initialAngle: 180 
  },
  { 
    id: 'ingram', name: 'Ingram', color: '#2952ff', 
    img: 'assets/Ingram.png', icon: 'assets/project6.png', 
    orbitRadius: 480, speed: 0.4, initialAngle: 300 
  }
];

// Textos traducibles (AQUÍ ESTÁN TUS TEXTOS CORTOS EXACTOS)
const GALAXY_TEXTS: any = {
  ES: {
    titleStart: "Conoce algunos de nuestros ",
    titleHighlight: "proyectos exitosos",
    hintText: "Pulsa en los mundos",
    cardHint: "CLICK PARA DETALLES ↻",
    cardButton: "Ver Más ➜",
    descriptions: {
      miranda: "Implementamos una solución de backup automatizado en AWS mediante conexión VPN segura, reemplazando procesos manuales. La nueva arquitectura permite recuperación rápida ante incidentes y continuidad operativa.",
      myintelli: "Ejecutamos evaluación de seguridad sobre plataforma SaaS en producción, identificando vulnerabilidades y proponiendo mejoras. Acompañamos en optimización de consumo AWS/GCP e implementación de WAF.",
      datecsa: "Diseñamos e implementamos infraestructura en AWS para soportar la solución OnBase, incluyendo base de datos, red, SSL y réplica a producción. Un entorno Cloud estable, seguro y preparado para operación empresarial.",
      ruedaverde: "Implementamos un chatbot sobre arquitectura serverless en AWS, permitiendo automatizar consultas frecuentes con un modelo de consumo optimizado. Redujo carga operativa y mejoró eficiencia sin incrementar complejidad.",
      tuulapp: "Acompañamos la optimización y modernización de su arquitectura en AWS, incluyendo estrategia de migración de base de datos hacia Amazon Aurora y control de costos para preparar la plataforma para un crecimiento escalable.",
      ingram: "Participación en múltiples iniciativas Cloud dentro del ecosistema de partners regionales en LATAM, ejecutando soluciones tecnológicas para distribución y ecosistemas empresariales corporativos y regulados."
    }
  },
  EN: {
    titleStart: "Discover some of our ",
    titleHighlight: "successful projects",
    hintText: "Click on the worlds",
    cardHint: "CLICK FOR DETAILS ↻",
    cardButton: "See More ➜",
    descriptions: {
      miranda: "We implemented an automated backup solution in AWS via secure VPN, replacing manual processes. The new architecture enables rapid incident recovery and operational continuity.",
      myintelli: "We executed a security assessment on a production SaaS platform, identifying vulnerabilities and proposing improvements. We assist in AWS/GCP consumption optimization and WAF implementation.",
      datecsa: "We designed and implemented AWS infrastructure to support the OnBase solution, including database, network, SSL, and production replication. A stable, secure Cloud environment ready for enterprise operation.",
      ruedaverde: "We implemented a chatbot on serverless architecture in AWS, automating frequent queries with an optimized consumption model. It reduced operational load and improved efficiency without increasing complexity.",
      tuulapp: "We supported the optimization and modernization of their AWS architecture, including database migration strategy to Amazon Aurora and cost control to prepare the platform for scalable growth.",
      ingram: "Participation in multiple Cloud initiatives within the LATAM regional partner ecosystem, executing technological solutions for distribution and corporate/regulated business ecosystems."
    }
  }
};

// Interface unificada
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

// ==========================================
// 2. SHADER (SOLO MOVIMIENTO AMBIENTAL)
// ==========================================
const vertexShader = `
  uniform float uTime;
  attribute vec3 aPosition;
  varying vec3 vColor;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec3 pos = aPosition;
    float floatY = sin(pos.x * 0.5 + uTime * 0.2) * 0.2;
    float floatX = cos(pos.y * 0.5 + uTime * 0.2) * 0.2;
    pos.x += floatX;
    pos.y += floatY;
    pos.z += sin(uTime * 0.1 + pos.x) * 0.5;

    float rnd = random(aPosition.xy);
    vec3 baseColor = mix(vec3(0.1, 0.4, 1.0), vec3(0.0, 0.8, 1.0), rnd);
    vec3 targetColor;
    if (rnd < 0.25) targetColor = vec3(0.0, 1.0, 1.0);
    else if (rnd < 0.5) targetColor = vec3(1.0, 0.0, 1.0);
    else if (rnd < 0.75) targetColor = vec3(0.6, 0.0, 1.0);
    else targetColor = vec3(1.0, 1.0, 1.0);

    float colorMix = step(0.6, rnd);
    vColor = mix(baseColor, targetColor, colorMix);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (50.0 / -mvPosition.z); 
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * 0.8); 
  }
`;

const AmbientParticlesMaterial = shaderMaterial(
  { uTime: 0 },
  vertexShader,
  fragmentShader
);

extend({ AmbientParticlesMaterial });

// ==========================================
// 3. COMPONENTE PARTICLES
// ==========================================
const AmbientParticles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);
  const count = 1500; 

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;     
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10.0; 
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    meshRef.current.rotation.z += 0.0002;
    materialRef.current.uTime = state.clock.getElapsedTime();
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        {/* @ts-ignore */}
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        {/* @ts-ignore */}
        <bufferAttribute attach="attributes-aPosition" args={[positions, 3]} />
      </bufferGeometry>
      {/* @ts-ignore */}
      <ambientParticlesMaterial ref={materialRef} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
};

// ==========================================
// 4. COMPONENTES SOLAR SYSTEM
// ==========================================
const ProjectFlipCard = ({ project, isMobile, cardHint, buttonText }: { project: Project, isMobile: boolean, cardHint: string, buttonText: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate(); // <-- 2. INICIALIZAMOS NAVEGACIÓN

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
            <img src={resolvePath(project.img)} alt={project.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <p style={{ marginTop: '10px', marginBottom: '10px', color: project.color, fontWeight: '900', fontSize: isMobile ? '1.2rem' : '1.5rem', letterSpacing: '1px', textAlign: 'center', animation: 'pulse 2s infinite', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>{cardHint}</p>
        </div>
        
        {/* CARA TRASERA CON TEXTOS REALES */}
        <div style={{ ...faceStyle, transform: 'rotateY(180deg)', background: '#1a1a2e', padding: isMobile ? '20px' : '35px' }}>
          <h3 style={{ color: project.color, fontSize: isMobile ? '1.6rem' : '2rem', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 900, textAlign: 'center', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>{project.name}</h3>
          <p style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight: 1.5, color: '#ddd', textAlign: 'center' }}>{project.desc}</p>
          
          {/* 3. AGREGAMOS EL EVENTO ONCLICK AQUÍ 👇 */}
          <button 
            onClick={(e) => {
                e.stopPropagation(); // Evitamos que al dar clic al botón se voltee la tarjeta de nuevo
                navigate('/proyectos');
            }}
            style={{ 
                marginTop: 'auto', 
                marginBottom: '10px', 
                padding: '12px 35px', 
                background: project.color, 
                border: 'none', 
                borderRadius: '50px', 
                color: 'black', 
                fontWeight: 'bold', 
                fontSize: '1rem', 
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = `0 0 15px ${project.color}80`;
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
      <style>{`@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
};

const SolarSystem = ({ projects, activeId, onSelect, isMobile, hintText }: { projects: Project[], activeId: string, onSelect: (id: string) => void, isMobile: boolean, hintText: string }) => {
  const requestRef = useRef<number>(0);
  const angles = useRef(projects.map((p) => p.initialAngle * (Math.PI / 180)));
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth < 590;
  
  const FIXED_TILT = 35; 
  const scaleFactor = isMobile ? 0.38 : (windowWidth < 1400 ? 0.55 : 0.75);

  const animate = () => {
    projects.forEach((p, index) => {
      angles.current[index] += 0.002;
      const angle = angles.current[index];
      const r = isSmallScreen ? p.orbitRadius * 0.6 : p.orbitRadius; 
      
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      
      const el = document.getElementById(`planet-${p.id}`);
      if (el) {
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${-FIXED_TILT}deg)`;
      }
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [projects, isSmallScreen]); 

  return (
    <div style={{ 
      position: 'relative', width: '100%', 
      height: isMobile ? '500px' : '900px', 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      perspective: '1200px', 
      overflow: 'visible', 
      marginTop: isMobile ? '-50px' : '-100px' 
    }}>
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

        {/* PLANETAS */}
        {projects.map((p) => {
          const isActive = activeId === p.id;
          const currentRadius = isSmallScreen ? p.orbitRadius * 0.6 : p.orbitRadius;
          const size = isActive ? (isMobile ? 100 : 130) : (isMobile ? 75 : 90);

          return (
            <React.Fragment key={p.id}>
              <div style={{
                position: 'absolute', 
                top: `-${currentRadius}px`, left: `-${currentRadius}px`,
                width: `${currentRadius * 2}px`, height: `${currentRadius * 2}px`,
                border: '3px dashed rgba(255, 255, 255, 0.4)',
                borderRadius: '50%', pointerEvents: 'none', zIndex: 1,
                transition: 'all 0.3s ease'
              }} />
              
              <div
                id={`planet-${p.id}`}
                onClick={(e) => { e.stopPropagation(); onSelect(p.id); }}
                style={{
                  position: 'absolute', top: `-${size/2}px`, left: `-${size/2}px`,
                  width: `${size}px`, height: `${size}px`, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 20,
                  transition: 'width 0.3s ease, height 0.3s ease'
                }}
              >
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%', backgroundColor: p.color, 
                  boxShadow: isActive ? `0 0 50px ${p.color}` : `0 0 20px ${p.color}`, 
                  border: '3px solid white', 
                  transition: 'all 0.3s', 
                  position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                }}>
                  <img src={resolvePath(p.icon)} alt="icon" style={{ width: '65%', height: '65%', objectFit: 'contain', pointerEvents: 'none' }} />
                  {isActive && <div style={{ position: 'absolute', top: isMobile ? -35 : -45, left: '50%', transform: 'translateX(-50%)', fontSize: isMobile ? '24px' : '30px' }}>🚀</div>}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: '20px', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontWeight: 300, pointerEvents: 'none', letterSpacing: '1px' }}>{hintText}</div>
    </div>
  );
};

// ==========================================
// 5. COMPONENTE PRINCIPAL
// ==========================================
export const ProjectsGalaxy = ({ isMobile }: { isMobile: boolean }) => {
  const [activeId, setActiveId] = useState<string>(PROJECTS_CONFIG[0].id);
  
  // --- LÓGICA DE IDIOMA ---
  const [lang, setLang] = useState(localStorage.getItem('appLanguage') || 'ES');

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem('appLanguage') || 'ES');
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = GALAXY_TEXTS[lang];

  const projects = useMemo(() => {
    return PROJECTS_CONFIG.map(p => ({
      ...p,
      desc: t.descriptions[p.id] 
    }));
  }, [lang, t]); 

  const activeProject = useMemo(() => projects.find(p => p.id === activeId) || projects[0], [activeId, projects]);
  
  const [isSuperSmall, setIsSuperSmall] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsSuperSmall(window.innerWidth < 590);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleNext = () => {
    const currentIndex = projects.findIndex(p => p.id === activeId);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveId(projects[nextIndex].id);
  };

  const handlePrev = () => {
    const currentIndex = projects.findIndex(p => p.id === activeId);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setActiveId(projects[prevIndex].id);
  };

  const currentGap = isSuperSmall ? '110px' : (isMobile ? '230px' : '50px');

  return (
    <section 
      style={{
        width: '100%', minHeight: '100vh', 
        position: 'relative', 
        backgroundColor: '#000c2d', 
        padding: isMobile ? '30px 10px' : '60px 40px', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden'
      }}
    >
      
      {/* FONDO DE ESTRELLAS 3D (CANVAS) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <AmbientParticles />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'center', color: 'white', fontSize: isMobile ? '1.8rem' : '3.5rem', marginBottom: '20px', fontWeight: 900, textTransform: 'uppercase' }}>
          {t.titleStart} <span style={{ color: '#FAA918' }}>{t.titleHighlight}</span>
        </h2>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%', 
          maxWidth: '1600px', 
          gap: currentGap, 
          transition: 'gap 0.3s ease'
        }}>
          
          {/* COLUMNA SISTEMA SOLAR */}
          <div style={{ 
            flex: '1 1 600px', 
            minWidth: '300px', 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            order: isMobile ? 2 : 1, 
            marginTop: isMobile ? '-120px' : '0' 
          }}>
            <SolarSystem 
                projects={projects} 
                activeId={activeId} 
                onSelect={setActiveId} 
                isMobile={isMobile}
                hintText={t.hintText} 
            />
          </div>
          
          {/* COLUMNA TARJETA DE DETALLE */}
          <div style={{ 
            flex: '0 1 450px', 
            minWidth: '280px', 
            width: '100%', 
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            zIndex: 30,
            order: isMobile ? 1 : 2, 
            marginTop: isMobile ? '60px' : '0' 
          }}>
            <ProjectFlipCard 
                project={activeProject} 
                isMobile={isMobile}
                cardHint={t.cardHint}
                buttonText={t.cardButton} 
            />
            
            <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
              <button onClick={handlePrev} style={arrowBtnStyle}>←</button>
              <button onClick={handleNext} style={arrowBtnStyle}>→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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