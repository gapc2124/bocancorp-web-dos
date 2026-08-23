'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { useRouter, useParams } from 'next/navigation'; 

import { Server, Shield, CloudUpload, Bot, Cpu, Globe } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const resolvePath = (path: string) => {
  const base = (process.env.NEXT_PUBLIC_BASE_URL || '') || '/';
  const cleanPath = path.replace(/^(\.?\/)/, '');
  return `${base}${cleanPath}`;
};

// ==========================================
// 1. CONFIGURACIÓN (Iconos como funciones para tamaño dinámico)
// ==========================================
// 👇 Ahora el ícono es una función que recibe un 'size'
const PROJECTS_CONFIG = [
  { id: 'miranda', name: 'Miranda', color: '#FFFFFF', img: 'assets/Miranda.png', icon: (size: number) => <Server size={size} color="#FFFFFF" />, orbitRadius: 130, speed: 0.4, initialAngle: 0 },
  { id: 'myintelli', name: 'MyIntelli', color: '#33BEFF', img: 'assets/MyIntelli.png', icon: (size: number) => <Shield size={size} color="#33BEFF" />, orbitRadius: 200, speed: 0.4, initialAngle: 120 },
  { id: 'datecsa', name: 'DATECSA', color: '#FF3333', img: 'assets/DateCSA.png', icon: (size: number) => <CloudUpload size={size} color="#FF3333" />, orbitRadius: 270, speed: 0.4, initialAngle: 240 },
  { id: 'ruedaverde', name: 'RuedaVerde', color: '#00ff88', img: 'assets/RuedaVerde.png', icon: (size: number) => <Bot size={size} color="#00ff88" />, orbitRadius: 340, speed: 0.4, initialAngle: 60 },
  { id: 'tuulapp', name: 'TuulApp', color: '#ccff00', img: 'assets/tuulapp.png', icon: (size: number) => <Cpu size={size} color="#ccff00" />, orbitRadius: 410, speed: 0.4, initialAngle: 180 },
  { id: 'ingram', name: 'Ingram', color: '#2952ff', img: 'assets/Ingram.png', icon: (size: number) => <Globe size={size} color="#2952ff" />, orbitRadius: 480, speed: 0.4, initialAngle: 300 }
];

const GALAXY_TEXTS: any = {
  ES: {
    seoTitle: "Casos de Éxito | Proyectos de Software y Cloud - Bocancorp",
    seoDesc: "Explora nuestra galaxia de proyectos exitosos. Soluciones en AWS, ciberseguridad y desarrollo de software escalable.",
    titleHighlight: "Arquitecturas Cloud",
    titleEnd: " Implementadas",
    hintText: "Pulsa en los mundos",
    cardButton: "Saber Más"
  },
  EN: {
    seoTitle: "Success Stories | Software and Cloud Projects - Bocancorp",
    seoDesc: "Explore our galaxy of successful projects. AWS solutions, cybersecurity, and scalable software development.",
    titleHighlight: "Cloud Architectures",
    titleEnd: " Implemented",
    hintText: "Click on the worlds",
    cardButton: "Know More"
  }
};

interface Project {
  id: string;
  name: string;
  color: string;
  img: string;
  icon: (size: number) => React.ReactNode; 
  orbitRadius: number; 
  speed: number;
  initialAngle: number;
}

// ==========================================
// 2. SHADER (MOVIMIENTO AMBIENTAL)
// ==========================================
const vertexShader = `
  uniform float uTime;
  attribute vec3 aPosition;
  varying vec3 vColor;
  float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
  void main() {
    vec3 pos = aPosition;
    pos.x += cos(pos.y * 0.5 + uTime * 0.2) * 0.2;
    pos.y += sin(pos.x * 0.5 + uTime * 0.2) * 0.2;
    pos.z += sin(uTime * 0.1 + pos.x) * 0.5;
    float rnd = random(aPosition.xy);
    vec3 baseColor = mix(vec3(0.1, 0.4, 1.0), vec3(0.0, 0.8, 1.0), rnd);
    vec3 targetColor = rnd < 0.25 ? vec3(0.0, 1.0, 1.0) : rnd < 0.5 ? vec3(1.0, 0.0, 1.0) : rnd < 0.75 ? vec3(0.6, 0.0, 1.0) : vec3(1.0, 1.0, 1.0);
    vColor = mix(baseColor, targetColor, step(0.6, rnd));
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
    gl_FragColor = vec4(vColor, (1.0 - smoothstep(0.3, 0.5, dist)) * 0.8); 
  }
`;
const AmbientParticlesMaterial = shaderMaterial({ uTime: 0 }, vertexShader, fragmentShader);
extend({ AmbientParticlesMaterial });

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
// 4. COMPONENTE TARJETA ESTÁTICA 100% 2D
// ==========================================
const ProjectCardStatic = ({ activeProject, allProjects, isMobile, buttonText, urlLang }: { activeProject: Project, allProjects: Project[], isMobile: boolean, buttonText: string, urlLang: string }) => {
  const router = useRouter();
  const navigate = (path: string) => router.push(path); 
  const handleNavigate = () => { 
      navigate(`/${urlLang}/proyectos?projectId=${activeProject.id}`); 
  };

  return (
    <div 
        style={{ 
            width: '100%', maxWidth: isMobile ? '90vw' : '400px', height: isMobile ? '400px' : '480px', 
            margin: '0 auto', borderRadius: '30px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px' : '30px',
            border: `2px solid ${activeProject.color}`,
            backgroundColor: '#00020a', 
            boxShadow: `0 0 30px ${activeProject.color}30`,
            transition: 'all 0.4s ease',
            cursor: 'pointer'
        }} 
        onClick={handleNavigate}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = `0 15px 40px ${activeProject.color}60`; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 0 30px ${activeProject.color}30`; }}
    >
        <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', position: 'relative' }}>
            {allProjects.map((p) => (
                <img 
                    key={p.id}
                    src={resolvePath(p.img)} 
                    alt={p.name} 
                    style={{ 
                        position: 'absolute',
                        maxWidth: '90%', 
                        maxHeight: '90%', 
                        objectFit: 'contain',
                        opacity: p.id === activeProject.id ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        pointerEvents: p.id === activeProject.id ? 'auto' : 'none'
                    }} 
                />
            ))}
        </div>
        <button style={{ marginTop: '15px', padding: '15px 40px', background: activeProject.color, border: 'none', borderRadius: '50px', color: '#000c2d', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', pointerEvents: 'none', transition: 'background 0.4s ease' }}>
            {buttonText}
        </button>
    </div>
  );
};

// ==========================================
// SOLAR SYSTEM (ÓRBITAS EXPANDIDAS Y PLANETAS GRANDES)
// ==========================================
const SolarSystem = ({ projects, activeId, onSelect, isMobile, hintText }: { projects: Project[], activeId: string, onSelect: (id: string) => void, isMobile: boolean, hintText: string }) => {
  const requestRef = useRef<number>(0);
  const angles = useRef(projects.map((p) => p.initialAngle * (Math.PI / 180)));
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
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
      const r = isSmallScreen ? p.orbitRadius * 0.9 : p.orbitRadius; 
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      const el = document.getElementById(`planet-${p.id}`);
      if (el) { el.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${-FIXED_TILT}deg)`; }
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [projects, isSmallScreen]); 

  return (
    <div style={{ position: 'relative', width: '100%', height: isMobile ? '500px' : '900px', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1200px', overflow: 'visible', marginTop: isMobile ? '-50px' : '-100px' }}>
      <div style={{ position: 'relative', width: '0px', height: '0px', transformStyle: 'preserve-3d', transform: `scale(${scaleFactor}) rotateX(${FIXED_TILT}deg)`, transition: 'transform 0.5s ease-out' }}>
        <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#FFD700', boxShadow: '0 0 60px #FFD700, 0 0 30px #FF8C00', transform: `rotateX(${-FIXED_TILT}deg)`, zIndex: 10 }} />
        {projects.map((p) => {
          const isActive = activeId === p.id;
          const currentRadius = isSmallScreen ? p.orbitRadius * 0.9 : p.orbitRadius;
          
          const size = isActive ? (isMobile ? 140 : 130) : (isMobile ? 100 : 90);
          const iconSize = isMobile ? 55 : 42; 
          
          return (
            <React.Fragment key={p.id}>
              <div style={{ position: 'absolute', top: `-${currentRadius}px`, left: `-${currentRadius}px`, width: `${currentRadius * 2}px`, height: `${currentRadius * 2}px`, border: '2px dashed rgba(255, 255, 255, 0.4)', borderRadius: '50%', pointerEvents: 'none', zIndex: 1 }} />
              
              <div id={`planet-${p.id}`} onClick={(e) => { e.stopPropagation(); onSelect(p.id); }} style={{ position: 'absolute', top: `-${size/2}px`, left: `-${size/2}px`, width: `${size}px`, height: `${size}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20, transition: 'width 0.3s ease, height 0.3s ease' }}>
                <div style={{ 
                    width: '100%', height: '100%', borderRadius: '50%', 
                    backgroundColor: '#000c2d', 
                    boxShadow: isActive ? `0 0 50px ${p.color}` : `0 0 20px rgba(0,0,0,0.8)`, 
                    border: `3px solid ${isActive ? p.color : 'white'}`, 
                    transition: 'all 0.3s', 
                    position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {p.icon(iconSize)}
                  </div>
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
export const ProjectsGalaxy = () => {
  const isMobile = useIsMobile(1024);
  const [activeId, setActiveId] = useState<string>(PROJECTS_CONFIG[0].id);
  
  const { lang: urlLang } = useParams(); 
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';

  const t = GALAXY_TEXTS[currentLang]; 
  
  const projects = PROJECTS_CONFIG;
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

  return (
    <section style={{ width: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#000c2d', padding: isMobile ? '30px 10px' : '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
      
      

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}><AmbientParticles /></Canvas>
      </div>
      
      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'center', color: 'white', fontSize: isMobile ? '1.8rem' : '3.5rem', marginBottom: '20px', fontWeight: 900, textTransform: 'uppercase' }}>
            <span style={{ color: '#00C2FF' }}>{t.titleHighlight}</span>{t.titleEnd}
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1600px', gap: isSuperSmall ? '110px' : (isMobile ? '230px' : '50px') }}>
          <div style={{ flex: '1 1 600px', minWidth: '300px', width: '100%', display: 'flex', justifyContent: 'center', order: isMobile ? 2 : 1, marginTop: isMobile ? '-120px' : '0' }}>
            <SolarSystem projects={projects as Project[]} activeId={activeId} onSelect={setActiveId} isMobile={isMobile} hintText={t.hintText} />
          </div>
          <div style={{ flex: '0 1 450px', minWidth: '280px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 30, order: isMobile ? 1 : 2, marginTop: isMobile ? '60px' : '0' }}>
            <ProjectCardStatic activeProject={activeProject as Project} allProjects={projects as Project[]} isMobile={isMobile} buttonText={t.cardButton} urlLang={currentLang.toLowerCase()} />
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
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: '1.5rem', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', backdropFilter: 'blur(5px)'
};

export default ProjectsGalaxy;