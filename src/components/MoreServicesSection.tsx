import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Torus, 
  Sphere,
  OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';

// --- COLORES ---
const BG_COLOR = "#000c2d"; 
const BOCANCORP_ORANGE = "#FAA918"; 
const ACCENT_BLUE = "#00C2FF"; 
const BRIGHT_CYAN = "#66E0FF";
const DEEP_BLUE = "#0088BB";
const BLUE_SQUARE_COLOR = "#0055AA";

const SERVICES_CONTENT = {
  software: {
    id: 'software',
    label: "Software Development",
    themeColor: BOCANCORP_ORANGE,
    items: ["Web Development", "Mobile Development", "IT Consulting & Advisory", "Custom Software", "DevOps Integration"]
  },
  cloud: {
    id: 'cloud',
    label: "Cloud Solutions",
    themeColor: ACCENT_BLUE,
    items: ["Cloud Migration", "Infrastructure Management", "Serverless Architecture", "Cloud Security", "Cost Optimization"]
  }
};

type CategoryKey = keyof typeof SERVICES_CONTENT;

// =====================================================================
// 🪐 PLANETA 1: SATURNO (Referencia de Tamaño)
// =====================================================================
function SaturnCartoon() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.05; 
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.02;     
  });

  return (
    <group rotation={[0.3, 0, 0]}>
      {/* ESFERA BASE: Radio 1.0 */}
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

// =====================================================================
// 🪐 PLANETA 2: URANO (Redimensionado para igualar a Saturno)
// =====================================================================
function UranusCartoon() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y -= delta * 0.04; 
    if (ringRef.current) {
        ringRef.current.rotation.x += delta * 0.02; 
        ringRef.current.rotation.z += delta * 0.01; 
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 1.8]}> 
      {/* 1. ESFERA: Reducida de 1.5 a 1.0 (Igual que Saturno) */}
      <Sphere ref={planetRef} args={[1.0, 48, 48]}>
        <meshToonMaterial color={ACCENT_BLUE} />
        <group rotation={[Math.PI / 2, 0, 0]}>
            <Torus args={[1.02, 0.03, 16, 64]} position={[0, 0, 0.3]}><meshBasicMaterial color={BRIGHT_CYAN} /></Torus>
            <Torus args={[1.02, 0.03, 16, 64]} position={[0, 0, -0.3]}><meshBasicMaterial color={BRIGHT_CYAN} /></Torus>
        </group>
      </Sphere>

      {/* 2. ANILLOS: Escalados proporcionalmente (aprox 66% del tamaño anterior) */}
      <group ref={ringRef}>
          {/* Anillo Difuso */}
          <Torus args={[1.9, 0.35, 16, 100]} rotation={[Math.PI/2, 0,0]} scale={[1, 1, 0.05]}>
              <meshToonMaterial color={ACCENT_BLUE} transparent opacity={0.3} />
          </Torus>
          {/* Anillo Fino Interior */}
          <Torus args={[1.6, 0.04, 16, 100]} rotation={[Math.PI/2, 0,0]}>
              <meshBasicMaterial color={BRIGHT_CYAN} />
          </Torus>
          {/* Anillo Fino Exterior */}
          <Torus args={[2.3, 0.04, 16, 100]} rotation={[Math.PI/2, 0,0]}>
              <meshBasicMaterial color={BRIGHT_CYAN} />
          </Torus>
      </group>

      <pointLight position={[-2, 3, 2]} intensity={1.5} color={BRIGHT_CYAN} distance={15} />
    </group>
  );
}

// =====================================================================
// 🧊 ESTRELLAS
// =====================================================================
const BlueSquareStars = ({ count = 4000 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 60; 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      dummy.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
      const s = 0.2 + Math.random() * 0.5;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, dummy]);

  useFrame((_, delta) => { if(meshRef.current) meshRef.current.rotation.y += delta * 0.005; });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} /> 
      <meshBasicMaterial color={BLUE_SQUARE_COLOR} transparent opacity={0.8} />
    </instancedMesh>
  );
};

// =====================================================================
// 🔘 BOTÓN ACTUALIZADO (Color Fuerte + Texto Negro)
// =====================================================================
const ServiceButton = ({ item, themeColor }: { item: string, themeColor: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: '100%', 
                padding: '16px 25px', 
                borderRadius: '8px',
                
                // --- CAMBIO 1: Color mucho más fuerte (85% opacidad = 'D9') ---
                backgroundColor: isHovered ? `${themeColor}D9` : 'rgba(255, 255, 255, 0.08)',
                
                border: '1px solid rgba(255, 255, 255, 0.1)',
                
                // --- CAMBIO 2: Texto Negro al seleccionar ---
                color: isHovered ? '#000000' : 'rgba(255, 255, 255, 0.9)',
                
                fontSize: '1.05rem', 
                fontWeight: 600, 
                textAlign: 'left', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                
                transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s',
                
                transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                marginBottom: '10px'
            }}
        >
           <span>{item}</span>
           
           {/* ÍCONO MINIMALISTA (Ahora negro en hover para combinar) */}
           <svg 
             width="20" height="20" viewBox="0 0 24 24" fill="none" 
             style={{ 
                 stroke: isHovered ? '#000000' : themeColor, 
                 strokeWidth: 2, 
                 transition: 'stroke 0.2s, transform 0.2s',
                 transform: isHovered ? 'translateX(3px)' : 'translateX(0)'
             }}
           >
             <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </button>
    );
};

// =====================================================================
// 🚀 COMPONENTE PRINCIPAL
// =====================================================================
export const MoreServicesSection = ({ isMobile }: { isMobile: boolean }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('software');
  const activeData = SERVICES_CONTENT[activeCategory];

  return (
    <section style={{
      position: 'relative', width: '100%', 
      height: isMobile ? 'auto' : '650px', 
      minHeight: '600px',
      background: BG_COLOR, overflow: 'hidden'
    }}>
      
      {/* CAPA 1: FONDO DE ESTRELLAS */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 18], fov: 45 }} dpr={[1, 1.5]}>
            <BlueSquareStars count={4000} />
            <ambientLight intensity={0.2} />
        </Canvas>
      </div>

      {/* CAPA 2: CONTENIDO FLEX */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        pointerEvents: 'none'
      }}>

        {/* --- MITAD IZQUIERDA: MENÚ --- */}
        <div style={{
          order: isMobile ? 2 : 1,
          width: isMobile ? '100%' : '50%',
          flex: isMobile ? 'auto' : '0 0 50%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          
          backgroundColor: 'rgba(0, 12, 45, 0.5)', 
          backdropFilter: 'blur(16px)',
          borderRight: isMobile ? 'none' : `1px solid ${activeData.themeColor}30`,
          
          padding: isMobile ? '50px 20px' : '0 60px',
          pointerEvents: 'auto',
          transition: 'all 0.5s ease'
        }}>
            <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 800, marginBottom: '30px', color: '#fff', lineHeight: 1.1 }}>
              Explora{isMobile ? ' ' : <br/>}
              <span style={{ color: activeData.themeColor, transition: 'color 0.5s ease' }}>Servicios</span>
            </h2>

            {/* Switcher de Categoría */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '6px', marginBottom: '30px', border: `1px solid ${activeData.themeColor}30` }}>
                {(Object.keys(SERVICES_CONTENT) as CategoryKey[]).map((key) => (
                    <button key={key} onClick={() => setActiveCategory(key)} style={{
                        flex: 1, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                        fontSize: '1rem', fontWeight: 700, transition: '0.3s',
                        background: activeCategory === key ? activeData.themeColor : 'transparent',
                        color: activeCategory === key ? (key === 'software' ? '#000' : '#fff') : '#aaa', // Ajuste contraste texto
                        boxShadow: activeCategory === key ? `0 4px 15px ${activeData.themeColor}40` : 'none'
                    }}>{SERVICES_CONTENT[key].label}</button>
                ))}
            </div>

            {/* Lista de Botones de Servicios */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {activeData.items.map((item) => (
                    <ServiceButton key={item} item={item} themeColor={activeData.themeColor} />
                ))}
            </div>
        </div>

        {/* --- MITAD DERECHA: PLANETA --- */}
        <div style={{ 
            order: isMobile ? 1 : 2,
            width: isMobile ? '100%' : '50%', 
            height: isMobile ? '350px' : '100%',
            position: 'relative'
        }}>
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} color={activeData.themeColor} />
                <directionalLight position={[5, 5, 5]} intensity={2.5} color="white" />
                <spotLight position={[-5, 2, -5]} angle={0.5} intensity={3} color={activeData.themeColor} />

                <OrbitControls 
                    enablePan={false} 
                    enableZoom={false} 
                    autoRotate={true}
                    autoRotateSpeed={0.8} 
                />

                <group scale={isMobile ? 0.7 : 0.85}>
                    {activeCategory === 'software' ? <SaturnCartoon /> : <UranusCartoon />}
                </group>
            </Canvas>
        </div>

      </div>
    </section>
  );
};