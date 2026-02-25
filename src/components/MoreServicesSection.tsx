import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Torus, 
  Sphere,
  OrbitControls,
  shaderMaterial
} from '@react-three/drei';
import * as THREE from 'three';

// --- COLORES ---
const BG_COLOR = "#000c2d"; 
const BOCANCORP_ORANGE = "#FAA918"; 
const ACCENT_BLUE = "#00C2FF"; 
const BRIGHT_CYAN = "#66E0FF";

// --- CONFIGURACIÓN ESTÁTICA ---
const CATEGORY_CONFIG = {
  software: { id: 'software', themeColor: BOCANCORP_ORANGE },
  cloud: { id: 'cloud', themeColor: ACCENT_BLUE }
};

type CategoryKey = keyof typeof CATEGORY_CONFIG;

// --- DICCIONARIO DE TEXTOS ---
const SECTION_TEXTS: any = {
  ES: {
    titleStart: "Explora",
    titleHighlight: "Servicios",
    interactHint: "Toca para mover",
    categories: {
      software: {
        label: "Desarrollo de Software",
        items: [
          { label: "Ingeniería de Software de Élite", id: 1 },
          { label: "Infraestructura Cloud Inteligente", id: 2 },
          { label: "Diseño de Experiencia Digital", id: 3 },
          { label: "Arquitectura y Estrategia TI", id: 4 }
        ]
      },
      cloud: {
        label: "Soluciones en la Nube",
        items: [
          { label: "Arquitectura Cloud & Serverless", id: 5 },
          { label: "Ciberseguridad & Resiliencia", id: 6 },
          { label: "Automatización & Terraform", id: 7 },
          { label: "Gobierno & FinOps Proactivo", id: 8 }
        ]
      }
    }
  },
  EN: {
    titleStart: "Explore",
    titleHighlight: "Services",
    interactHint: "Tap to move",
    categories: {
      software: {
        label: "Software Development",
        items: [
          { label: "Elite Software Engineering", id: 1 },
          { label: "Smart Cloud Infrastructure", id: 2 },
          { label: "Digital Experience Design", id: 3 },
          { label: "IT Architecture & Strategy", id: 4 }
        ]
      },
      cloud: {
        label: "Cloud Solutions",
        items: [
          { label: "Cloud & Serverless Architecture", id: 5 },
          { label: "Cybersecurity & Resilience", id: 6 },
          { label: "Automation & Terraform", id: 7 },
          { label: "Governance & Proactive FinOps", id: 8 }
        ]
      }
    }
  }
};

// =====================================================================
// SHADERS Y PARTÍCULAS
// =====================================================================
const particlesVertexShader = `
  uniform float uTime;
  attribute vec3 aPosition;
  varying vec3 vColor;
  float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
  void main() {
    vec3 pos = aPosition;
    float floatY = sin(pos.x * 0.5 + uTime * 0.2) * 0.2; 
    float floatX = cos(pos.y * 0.5 + uTime * 0.2) * 0.2;
    pos.x += floatX; pos.y += floatY;
    pos.z += sin(uTime * 0.1 + pos.x) * 0.5;
    float rnd = random(aPosition.xy);
    vec3 baseColor = mix(vec3(0.1, 0.4, 1.0), vec3(0.0, 0.8, 1.0), rnd);
    vec3 targetColor;
    if (rnd < 0.25) targetColor = vec3(0.0, 1.0, 1.0); 
    else if (rnd < 0.5) targetColor = vec3(1.0, 0.0, 1.0); 
    else if (rnd < 0.75) targetColor = vec3(0.6, 0.0, 1.0); 
    else targetColor = vec3(1.0, 1.0, 1.0); 
    float colorChance = step(0.7, rnd);
    vColor = mix(baseColor, targetColor, colorChance);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (60.0 / -mvPosition.z); 
  }
`;

const particlesFragmentShader = `
  varying vec3 vColor;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * 0.9); 
  }
`;

const InteractiveLikeMaterial = shaderMaterial({ uTime: 0 }, particlesVertexShader, particlesFragmentShader);
extend({ InteractiveLikeMaterial });

const ServiceSectionParticles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);
  const count = 1800; 
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;     
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;  
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;  
    }
    return pos;
  }, []);
  useFrame((state) => {
    if (materialRef.current) materialRef.current.uTime = state.clock.getElapsedTime();
    if (meshRef.current) { meshRef.current.rotation.y += 0.0002; meshRef.current.rotation.z += 0.0001; }
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
      <interactiveLikeMaterial ref={materialRef} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
};

// =====================================================================
// MODELOS DE PLANETAS
// =====================================================================
function SaturnCartoon() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.15; 
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.05;     
  });
  return (
    <group rotation={[0.3, 0, 0]}>
      <Sphere ref={planetRef} args={[1., 32, 32]}>
        <meshToonMaterial color={BOCANCORP_ORANGE} />
        <group rotation={[Math.PI / 2, 0, 0]}>
            <Torus args={[1.08, 0.05, 16, 64]} position={[0, 0, 0.3]}><meshBasicMaterial color="#FFC760" /></Torus>
            <Torus args={[1.09, 0.08, 16, 64]} position={[0, 0, 0]}><meshBasicMaterial color="#C78200" /></Torus>
            <Torus args={[1.08, 0.05, 16, 64]} position={[0, 0, -0.3]}><meshBasicMaterial color="#FFC760" /></Torus>
        </group>
      </Sphere>
      <group ref={ringRef}>
          <Torus args={[2.2, 0.4, 16, 64]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.08]}><meshToonMaterial color="#FFC760" /></Torus>
          <Torus args={[1.6, 0.1, 16, 64]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.08]}><meshBasicMaterial color="#C78200" /></Torus>
      </group>
      <pointLight position={[2, 3, 2]} intensity={1} color="#FFC760" distance={15} />
    </group>
  );
}

function UranusCartoon() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y -= delta * 0.1; 
    if (ringRef.current) { ringRef.current.rotation.x += delta * 0.02; ringRef.current.rotation.z += delta * 0.01; }
  });
  return (
    <group rotation={[0, 0, Math.PI / 1.8]}> 
      <Sphere ref={planetRef} args={[1.0, 48, 48]}>
        <meshToonMaterial color={ACCENT_BLUE} />
        <group rotation={[Math.PI / 2, 0, 0]}>
            <Torus args={[1.02, 0.03, 16, 64]} position={[0, 0, 0.3]}><meshBasicMaterial color={BRIGHT_CYAN} /></Torus>
            <Torus args={[1.02, 0.03, 16, 64]} position={[0, 0, -0.3]}><meshBasicMaterial color={BRIGHT_CYAN} /></Torus>
        </group>
      </Sphere>
      <group ref={ringRef}>
          <Torus args={[1.9, 0.35, 16, 100]} rotation={[Math.PI/2, 0,0]} scale={[1, 1, 0.05]}>
              <meshToonMaterial color={ACCENT_BLUE} transparent opacity={0.3} />
          </Torus>
          <Torus args={[1.6, 0.04, 16, 100]} rotation={[Math.PI/2, 0,0]}>
              <meshBasicMaterial color={BRIGHT_CYAN} />
          </Torus>
          <Torus args={[2.3, 0.04, 16, 100]} rotation={[Math.PI/2, 0,0]}>
              <meshBasicMaterial color={BRIGHT_CYAN} />
          </Torus>
      </group>
      <pointLight position={[-2, 3, 2]} intensity={1.5} color={BRIGHT_CYAN} distance={15} />
    </group>
  );
}

// =====================================================================
// BOTÓN DE SERVICIO
// =====================================================================
const ServiceButton = ({ item, id, themeColor, urlLang }: { item: string, id: number, themeColor: string, urlLang: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();

    const handleClick = (e: React.MouseEvent) => {
        if (location.pathname.includes('/servicios')) {
            e.preventDefault(); 
            const element = document.getElementById(`service-${id}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.pushState(null, '', `/${urlLang}/servicios#service-${id}`);
            }
        } else {
            setTimeout(() => {
                const element = document.getElementById(`service-${id}`);
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    };

    return (
        <Link 
            to={`/${urlLang}/servicios#service-${id}`} 
            onClick={handleClick} 
            style={{ textDecoration: 'none', width: '100%' }}
        >
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    width: '100%', padding: '16px 25px', borderRadius: '8px',
                    backgroundColor: isHovered ? `${themeColor}D9` : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: isHovered ? '#000000' : 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1.05rem', fontWeight: 600, textAlign: 'left', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', 
                    justifyContent: 'space-between', transition: 'all 0.3s ease',
                    transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                    boxShadow: isHovered ? `0 4px 15px ${themeColor}40` : 'none',
                    marginBottom: '10px', boxSizing: 'border-box'
                }}
            >
               <span>{item}</span>
               <svg 
                 width="20" height="20" viewBox="0 0 24 24" fill="none" 
                 style={{ 
                     stroke: isHovered ? '#000000' : themeColor, strokeWidth: 2, 
                     transition: 'stroke 0.2s, transform 0.2s',
                     transform: isHovered ? 'translateX(3px)' : 'translateX(0)'
                 }}
               >
                 <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
        </Link>
    );
};

// =====================================================================
// COMPONENTE PRINCIPAL
// =====================================================================
export const MoreServicesSection = ({ isMobile }: { isMobile: boolean }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('software');
  const [isCanvasInteractive, setIsCanvasInteractive] = useState(!isMobile);
  
  const { lang: urlLang } = useParams(); 
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';
  const t = SECTION_TEXTS[currentLang];
  const activeData = t.categories[activeCategory];

  // RESET DEL BOTÓN: Cada que cambias de categoría o haces reload, el botón vuelve a aparecer en móvil.
  useEffect(() => {
    if (isMobile) {
      setIsCanvasInteractive(false);
    }
  }, [activeCategory, isMobile]);

  return (
    <section style={{
      position: 'relative', width: '100%', 
      height: isMobile ? 'auto' : '650px', 
      minHeight: '600px',
      background: BG_COLOR, overflow: 'hidden'
    }}>
      
      {/* CAPA FONDO */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 1.5]}>
            <ServiceSectionParticles />
        </Canvas>
      </div>

      <div style={{
        position: 'relative', zIndex: 10, width: '100%', height: '100%',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row'
      }}>

        {/* --- MITAD PLANETA (ARRIBA EN MÓVIL) --- */}
        <div style={{ 
            order: isMobile ? 1 : 2, 
            width: isMobile ? '100%' : '50%', 
            height: isMobile ? '400px' : '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            // Raya divisora abajo del planeta (Entre planeta y texto en móvil)
            borderBottom: isMobile ? `1px solid ${CATEGORY_CONFIG[activeCategory].themeColor}40` : 'none'
        }}>
            
            {/* BOTÓN "TOCA PARA MOVER" - Minimalista y transparente */}
            <AnimatePresence>
                {isMobile && !isCanvasInteractive && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            setIsCanvasInteractive(true); 
                        }}
                        style={{
                            position: 'absolute', 
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 999, 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            background: 'transparent'
                        }}
                    >
                        <motion.span 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            style={{ 
                                color: 'rgba(255, 255, 255, 0.8)', 
                                background: 'rgba(255, 255, 255, 0.05)', 
                                padding: '10px 24px', 
                                borderRadius: '50px', 
                                fontSize: '0.85rem', 
                                fontWeight: '600', 
                                letterSpacing: '2px', 
                                textTransform: 'uppercase', 
                                backdropFilter: 'blur(6px)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                boxShadow: 'none' 
                            }}
                        >
                            {t.interactHint}
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{
                width: isMobile ? '320px' : '100%', 
                height: isMobile ? '320px' : '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: (isMobile && !isCanvasInteractive) ? 'none' : 'auto'
            }}>
                <Canvas camera={{ position: [0, 0, isMobile ? 7 : 8], fov: 45 }} dpr={[1, 2]}>
                    <ambientLight intensity={0.5} color={CATEGORY_CONFIG[activeCategory].themeColor} />
                    <directionalLight position={[5, 5, 5]} intensity={2.5} color="white" />
                    <spotLight position={[-5, 2, -5]} angle={0.5} intensity={3} color={CATEGORY_CONFIG[activeCategory].themeColor} />
                    
                    <OrbitControls 
                        enablePan={false} 
                        enableZoom={false} 
                        autoRotate={!isCanvasInteractive} 
                        autoRotateSpeed={1.5} 
                    />
                    
                    <group scale={isMobile ? 0.75 : 0.6}>
                        {activeCategory === 'software' ? <SaturnCartoon /> : <UranusCartoon />}
                    </group>
                </Canvas>
            </div>
        </div>

        {/* --- MITAD MENÚ (ABAJO EN MÓVIL) --- */}
        <div style={{
          order: isMobile ? 2 : 1, 
          width: isMobile ? '100%' : '50%',
          flex: isMobile ? 'auto' : '0 0 50%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          backgroundColor: 'rgba(0, 12, 45, 0.5)', 
          backdropFilter: 'blur(16px)',
          borderRight: isMobile ? 'none' : `1px solid ${CATEGORY_CONFIG[activeCategory].themeColor}30`,
          padding: isMobile ? '50px 20px' : '0 60px',
          transition: 'all 0.5s ease'
        }}>
            <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 800, marginBottom: '30px', color: '#fff', lineHeight: 1.1 }}>
              {t.titleStart}{isMobile ? ' ' : <br/>}
              <span style={{ color: CATEGORY_CONFIG[activeCategory].themeColor }}>{t.titleHighlight}</span>
            </h2>

            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '6px', marginBottom: '30px', border: `1px solid ${CATEGORY_CONFIG[activeCategory].themeColor}30` }}>
                {(Object.keys(CATEGORY_CONFIG) as CategoryKey[]).map((key) => (
                    <button key={key} onClick={() => setActiveCategory(key)} style={{
                        flex: 1, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                        fontSize: '1rem', fontWeight: 700, transition: '0.3s',
                        background: activeCategory === key ? CATEGORY_CONFIG[key].themeColor : 'transparent',
                        color: activeCategory === key ? (key === 'software' ? '#000' : '#fff') : '#aaa', 
                        boxShadow: activeCategory === key ? `0 4px 15px ${CATEGORY_CONFIG[key].themeColor}40` : 'none'
                    }}>
                        {t.categories[key].label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {activeData.items.map((item: any) => (
                    <ServiceButton 
                        key={item.id} item={item.label} id={item.id} 
                        themeColor={CATEGORY_CONFIG[activeCategory].themeColor} 
                        urlLang={currentLang.toLowerCase()}
                    />
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};