import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// ==========================================
// 1. SHADER (SOLO MOVIMIENTO AMBIENTAL - SIN MOUSE)
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
    
    // 1. MOVIMIENTO FLOTANTE SUAVE (Ambiente)
    // Usamos seno y coseno para crear un movimiento orgánico "bajo el agua" o espacial
    float floatY = sin(pos.x * 0.5 + uTime * 0.2) * 0.2; // Aumenté un poco la amplitud
    float floatX = cos(pos.y * 0.5 + uTime * 0.2) * 0.2;
    
    pos.x += floatX;
    pos.y += floatY;
    
    // Un poco de movimiento en Z para profundidad
    pos.z += sin(uTime * 0.1 + pos.x) * 0.5;

    // --- 2. COLOR (Mantenemos tu paleta favorita) ---
    float rnd = random(aPosition.xy);
    
    // Color base (Azul / Celeste)
    vec3 baseColor = mix(vec3(0.1, 0.4, 1.0), vec3(0.0, 0.8, 1.0), rnd);

    // Paleta objetivo
    vec3 targetColor;
    if (rnd < 0.25) targetColor = vec3(0.0, 1.0, 1.0); // Cyan
    else if (rnd < 0.5) targetColor = vec3(1.0, 0.0, 1.0); // Magenta
    else if (rnd < 0.75) targetColor = vec3(0.6, 0.0, 1.0); // Morado
    else targetColor = vec3(1.0, 1.0, 1.0); // Blanco

    // Mezcla aleatoria de colores
    float colorMix = step(0.6, rnd); // 40% de las estrellas tendrán color secundario
    vColor = mix(baseColor, targetColor, colorMix);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Tamaño basado en profundidad (Perspectiva)
    gl_PointSize = (50.0 / -mvPosition.z); 
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    
    // Borde difuminado suave
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
// 2. COMPONENTE PARTICLES (LIMPIO Y MENOS DENSO)
// ==========================================
const AmbientParticles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);

  // CAMBIO: Reducido de 5000 a 1500 (Menos partículas)
  const count = 1500; 

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Esparcidas ampliamente
      pos[i * 3] = (Math.random() - 0.5) * 60;     
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10.0; 
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // Rotación lenta de toda la galaxia
    meshRef.current.rotation.z += 0.0002;
    
    // Actualizar tiempo para el shader
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
      <ambientParticlesMaterial 
        ref={materialRef} 
        transparent 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
};

// ==========================================
// 3. DATA
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
    id: 'miranda', name: 'Miranda', color: '#FFFFFF', 
    desc: 'Optimización de rutas y gestión logística inteligente.', 
    img: './assets/Miranda.png', icon: './assets/project1.png', 
    orbitRadius: 130, speed: UNIFIED_SPEED, initialAngle: 0 
  },
  { 
    id: 'myintelli', name: 'MyIntelli', color: '#33BEFF', 
    desc: 'Consultoría integral de Ciberseguridad.', 
    img: './assets/MyIntelli.png', icon: './assets/project2.png', 
    orbitRadius: 200, speed: UNIFIED_SPEED, initialAngle: 120 
  },
  { 
    id: 'datecsa', name: 'DATECSA', color: '#FF3333', 
    desc: 'Plataforma transaccional B2B de alto rendimiento.', 
    img: './assets/DateCSA.png', icon: './assets/project3.png', 
    orbitRadius: 270, speed: UNIFIED_SPEED, initialAngle: 240 
  },
  { 
    id: 'ruedaverde', name: 'RuedaVerde', color: '#00ff88', 
    desc: 'Desarrollo de Chatbot inteligente con IA Generativa.', 
    img: './assets/RuedaVerde.png', icon: './assets/project4.png', 
    orbitRadius: 340, speed: UNIFIED_SPEED, initialAngle: 60 
  },
  { 
    id: 'tuulapp', name: 'TuulApp', color: '#aa00ff', 
    desc: 'Marketplace de servicios on-demand.', 
    img: './assets/tuulapp.png', icon: './assets/project5.png', 
    orbitRadius: 410, speed: UNIFIED_SPEED, initialAngle: 180 
  },
  { 
    id: 'ingram', name: 'Ingram', color: '#2952ff', 
    desc: 'Integración global de inventarios y logística.', 
    img: './assets/Ingram.png', icon: './assets/project6.png', 
    orbitRadius: 480, speed: UNIFIED_SPEED, initialAngle: 300 
  }
];

// ==========================================
// 4. COMPONENTES SOLAR SYSTEM
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
          <p style={{ marginTop: '10px', marginBottom: '10px', color: project.color, fontWeight: '900', fontSize: isMobile ? '1.2rem' : '1.5rem', letterSpacing: '1px', textAlign: 'center', animation: 'pulse 2s infinite', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>CLICK PARA DETALLES ↻</p>
        </div>
        <div style={{ ...faceStyle, transform: 'rotateY(180deg)', background: '#1a1a2e' }}>
          <h3 style={{ color: project.color, fontSize: isMobile ? '1.8rem' : '2.2rem', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 900, textAlign: 'center', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>{project.name}</h3>
          <p style={{ fontSize: isMobile ? '1rem' : '1.1rem', lineHeight: 1.6, color: '#ddd', textAlign: 'center' }}>{project.desc}</p>
          <button style={{ marginTop: 'auto', marginBottom: '20px', padding: '12px 35px', background: project.color, border: 'none', borderRadius: '50px', color: 'black', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Ver Más ➜</button>
        </div>
      </div>
      <style>{`@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
};

const SolarSystem = ({ projects, activeId, onSelect, isMobile }: { projects: Project[], activeId: string, onSelect: (id: string) => void, isMobile: boolean }) => {
  const requestRef = useRef<number>(0);
  const angles = useRef(projects.map((p) => p.initialAngle * (Math.PI / 180)));
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth < 590;
  
  const scaleFactor = isMobile ? 0.42 : (windowWidth < 1400 ? 0.65 : 0.8);

  const animate = () => {
    projects.forEach((p, index) => {
      angles.current[index] += 0.002;
      const angle = angles.current[index];
      const r = isSmallScreen ? p.orbitRadius * 0.6 : p.orbitRadius; 
      
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      
      const el = document.getElementById(`planet-${p.id}`);
      if (el) {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
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
      height: isMobile ? '450px' : '850px', 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      overflow: 'visible', 
      marginTop: isMobile ? '30px' : '80px' 
    }}>
      <div style={{ 
        position: 'relative', width: '0px', height: '0px',
        transform: `scale(${scaleFactor})`, 
        transition: 'transform 0.5s ease-out' 
      }}>
        
        {/* SOL */}
        <div style={{
          position: 'absolute', top: '-40px', left: '-40px',
          width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#FFD700',
          boxShadow: '0 0 60px #FFD700, 0 0 30px #FF8C00',
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
                border: '2px dashed rgba(255, 255, 255, 0.4)',
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
                  {/* CAMBIO: Eliminado filter brightness/invert. Se muestran los iconos originales. */}
                  <img src={p.icon} alt="icon" style={{ width: '65%', height: '65%', objectFit: 'contain', pointerEvents: 'none' }} />
                  {isActive && <div style={{ position: 'absolute', top: isMobile ? -35 : -45, left: '50%', transform: 'translateX(-50%)', fontSize: isMobile ? '24px' : '30px' }}>🚀</div>}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: '-20px', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontWeight: 300, pointerEvents: 'none', letterSpacing: '1px' }}>Pulsa en los mundos</div>
    </div>
  );
};

// ==========================================
// 5. COMPONENTE PRINCIPAL
// ==========================================
export const ProjectsGalaxy = ({ isMobile }: { isMobile: boolean }) => {
  const [activeId, setActiveId] = useState<string>(PROJECTS_DATA[0].id);
  const activeProject = useMemo(() => PROJECTS_DATA.find(p => p.id === activeId) || PROJECTS_DATA[0], [activeId]);
  
  const [isSuperSmall, setIsSuperSmall] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsSuperSmall(window.innerWidth < 590);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

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
          {/* Componente de partículas pasivo (sin interacción) */}
          <AmbientParticles />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'center', color: 'white', fontSize: isMobile ? '1.8rem' : '3.5rem', marginBottom: '20px', fontWeight: 900, textTransform: 'uppercase' }}>
          Conoce algunos de nuestros <span style={{ color: '#FAA918' }}>proyectos exitosos</span>
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