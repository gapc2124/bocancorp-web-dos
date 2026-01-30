import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Torus, 
  Sphere,
  OrbitControls,
  PerspectiveCamera
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
// 🪐 PLANETA 1: SATURNO (Rotación Lenta)
// =====================================================================
function SaturnCartoon() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    // CAMBIO: Velocidad reducida a la mitad o menos
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.05; // Antes 0.2
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.02;     // Antes 0.05
  });

  return (
    <group rotation={[0.3, 0, 0]}>
      <Sphere ref={planetRef} args={[1.5, 32, 32]}>
        <meshToonMaterial color={BOCANCORP_ORANGE} />
        <group rotation={[Math.PI / 2, 0, 0]}>
            <Torus args={[1.48, 0.05, 16, 64]} position={[0, 0, 0.3]}><meshBasicMaterial color="#FFC760" /></Torus>
            <Torus args={[1.49, 0.08, 16, 64]} position={[0, 0, 0]}><meshBasicMaterial color="#C78200" /></Torus>
            <Torus args={[1.48, 0.05, 16, 64]} position={[0, 0, -0.3]}><meshBasicMaterial color="#FFC760" /></Torus>
        </group>
      </Sphere>
      <group ref={ringRef}>
          <Torus args={[3.0, 0.5, 16, 64]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.08]}><meshToonMaterial color="#FFC760" /></Torus>
          <Torus args={[2.2, 0.1, 16, 64]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.08]}><meshBasicMaterial color="#C78200" /></Torus>
      </group>
      <pointLight position={[2, 3, 2]} intensity={1} color="#FFC760" distance={15} />
    </group>
  );
}

// =====================================================================
// 🪐 PLANETA 2: URANO (Rotación Lenta)
// =====================================================================
function UranusCartoon() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    // CAMBIO: Velocidad reducida para movimiento majestuoso
    if (planetRef.current) planetRef.current.rotation.y -= delta * 0.04; // Antes 0.15
    if (ringRef.current) {
        ringRef.current.rotation.x += delta * 0.02; // Antes 0.05
        ringRef.current.rotation.z += delta * 0.01; // Antes 0.02
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 1.8]}> 
      <Sphere ref={planetRef} args={[1.5, 48, 48]}>
        <meshToonMaterial color={ACCENT_BLUE} />
        <group rotation={[Math.PI / 2, 0, 0]}>
            <Torus args={[1.48, 0.04, 16, 64]} position={[0, 0, 0.4]}><meshBasicMaterial color={BRIGHT_CYAN} /></Torus>
            <Torus args={[1.48, 0.04, 16, 64]} position={[0, 0, -0.4]}><meshBasicMaterial color={BRIGHT_CYAN} /></Torus>
            <Torus args={[1.49, 0.06, 16, 64]} position={[0, 0, 0.15]}><meshBasicMaterial color={DEEP_BLUE} /></Torus>
            <Torus args={[1.49, 0.06, 16, 64]} position={[0, 0, -0.15]}><meshBasicMaterial color={DEEP_BLUE} /></Torus>
        </group>
      </Sphere>

      <group ref={ringRef}>
          <Torus args={[2.8, 0.5, 16, 100]} rotation={[Math.PI/2, 0,0]} scale={[1, 1, 0.05]}>
              <meshToonMaterial color={ACCENT_BLUE} transparent opacity={0.3} />
          </Torus>
          <Torus args={[2.3, 0.05, 16, 100]} rotation={[Math.PI/2, 0,0]}>
              <meshBasicMaterial color={BRIGHT_CYAN} />
          </Torus>
          <Torus args={[3.3, 0.05, 16, 100]} rotation={[Math.PI/2, 0,0]}>
              <meshBasicMaterial color={BRIGHT_CYAN} />
          </Torus>
      </group>

      <pointLight position={[-2, 3, 2]} intensity={1.5} color={BRIGHT_CYAN} distance={15} />
    </group>
  );
}

// =====================================================================
// 🧊 ESTRELLAS (Lentísimas)
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

  useFrame((_, delta) => { if(meshRef.current) meshRef.current.rotation.y += delta * 0.005; }); // Casi estáticas

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} /> 
      <meshBasicMaterial color={BLUE_SQUARE_COLOR} transparent opacity={0.8} />
    </instancedMesh>
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

            {/* Switcher */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '5px', marginBottom: '30px', border: `1px solid ${activeData.themeColor}30` }}>
                {(Object.keys(SERVICES_CONTENT) as CategoryKey[]).map((key) => (
                    <button key={key} onClick={() => setActiveCategory(key)} style={{
                        flex: 1, padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                        fontSize: '1rem', fontWeight: 700, transition: '0.3s',
                        background: activeCategory === key ? activeData.themeColor : 'transparent',
                        color: activeCategory === key ? '#fff' : '#888',
                        boxShadow: activeCategory === key ? `0 4px 15px ${activeData.themeColor}40` : 'none'
                    }}>{SERVICES_CONTENT[key].label}</button>
                ))}
            </div>

            {/* Botones */}
            <div style={{ display: 'grid', gap: '12px' }}>
                {activeData.items.map((item) => (
                    <button 
                      key={item} 
                      style={{
                        width: '100%', padding: '18px 25px', borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.05)', borderLeft: `5px solid ${activeData.themeColor}`,
                        background: `linear-gradient(90deg, ${activeData.themeColor}15 0%, transparent 100%)`,
                        color: '#ddd', fontSize: '1.1rem', fontWeight: 600, textAlign: 'left', 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${activeData.themeColor}50 0%, transparent 100%)`;
                          e.currentTarget.style.paddingLeft = '35px';
                          e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${activeData.themeColor}15 0%, transparent 100%)`;
                          e.currentTarget.style.paddingLeft = '25px';
                          e.currentTarget.style.color = '#ddd';
                      }}
                    >
                       <span style={{ marginRight: '15px', color: activeData.themeColor }}>◈</span> 
                       {item}
                    </button>
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
                    // CAMBIO: Velocidad de órbita muy lenta
                    autoRotateSpeed={0.8} // Antes 2
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