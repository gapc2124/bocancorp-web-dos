import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Text, useCursor, Line, Float } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

// --- DATOS DE PROYECTOS ---
const PROJECTS_DATA = [
  { id: 'miranda', name: 'Miranda', color: '#FFFFFF', desc: 'Sistema de gestión logística inteligente. Optimización de rutas y control de flotas en tiempo real.', img: './assets/Miranda.png' },
  { id: 'myintelli', name: 'MyIntelli', color: '#00C2FF', desc: 'Dashboard de Business Intelligence. Procesamiento de Big Data para decisiones estratégicas.', img: './assets/MyIntelli.png' },
  { id: 'datecsa', name: 'DATECSA', color: '#FF4444', desc: 'Plataforma B2B de alto tráfico. Soporta miles de transacciones simultáneas con estabilidad.', img: './assets/DateCSA.png' },
  { id: 'ruedaverde', name: 'RuedaVerde', color: '#00E676', desc: 'App de movilidad sostenible. Fomento del transporte ecológico mediante gamificación.', img: './assets/RuedaVerde.png' },
  { id: 'tuulapp', name: 'TuulApp', color: '#A020F0', desc: 'Plataforma de servicios on-demand. Conectando profesionales con usuarios en tiempo real.', img: './assets/tuulapp.png' },
  { id: 'ingram', name: 'Ingram', color: '#0055AA', desc: 'Soluciones de distribución tecnológica global. Integración de inventarios complejos.', img: './assets/Ingram.png' }
];

// =====================================================================
// ✨ FONDO DE ESTRELLAS
// =====================================================================
const BackgroundStars = () => {
  const count = 1000;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 20 + Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        pos: new THREE.Vector3(-50 + Math.random() * 100, -50 + Math.random() * 100, -50 + Math.random() * 100)
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    const currentMesh = mesh.current;
    if (!currentMesh) return;
    particles.forEach((particle, i) => {
      let { t, speed, pos } = particle;
      t = particle.t += speed / 2;
      dummy.position.set(pos.x, pos.y + Math.sin(t) * 2, pos.z);
      dummy.scale.setScalar(Math.cos(t) * 0.5 + 0.5);
      dummy.updateMatrix();
      currentMesh.setMatrixAt(i, dummy.matrix);
    });
    currentMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
    </instancedMesh>
  );
};

// =====================================================================
// 🎠 CARRUSEL 3D
// =====================================================================
const Carousel = ({ radius, activeIndex, setActiveIndex, isMobile }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const count = PROJECTS_DATA.length;
  const anglePerItem = (Math.PI * 2) / count;

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDragging.current = true;
    startX.current = e.clientX;
    startRotation.current = rotation;
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    setRotation(startRotation.current + deltaX * (isMobile ? 0.01 : 0.005));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    const roundedIndex = Math.round(rotation / anglePerItem);
    setRotation(roundedIndex * anglePerItem);
    let index = -roundedIndex % count;
    if (index < 0) index += count;
    setActiveIndex(index);
  };

  useFrame((_state, delta) => {
    if (groupRef.current) {
      easing.dampE(groupRef.current.rotation, [0, rotation, 0], 0.25, delta);
    }
  });

  const linePoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= count; i++) {
      const angle = i * anglePerItem;
      points.push(new THREE.Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius));
    }
    return points;
  }, [radius, count, anglePerItem]);

  return (
    <group onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}>
      <Line points={linePoints} color="white" lineWidth={0.5} transparent opacity={0.2} />
      <group ref={groupRef}>
        {PROJECTS_DATA.map((project, i) => (
          <Card key={project.id} url={project.img} angle={i * anglePerItem} radius={radius} isActive={i === activeIndex} isMobile={isMobile} name={project.name} color={project.color} />
        ))}
      </group>
    </group>
  );
};

const Card = ({ url, angle, radius, isActive, isMobile, name, color }: any) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    meshRef.current.position.set(x, 0, z);
    meshRef.current.rotation.y = angle;
    easing.damp3(meshRef.current.scale, isActive ? [1.2, 1.2, 1.2] : [1, 1, 1], 0.2, delta);
  });

  return (
    <group ref={meshRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Image url={url} transparent scale={isMobile ? [2.5, 3.5] : [3.5, 4.5]} side={THREE.DoubleSide}>
           <meshBasicMaterial color={isActive ? "white" : "#888"} toneMapped={false} />
        </Image>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={isMobile ? [2.6, 3.6] : [3.6, 4.6]} />
          <meshBasicMaterial color={color} transparent opacity={isActive ? 0.5 : 0.1} />
        </mesh>
        {isActive && <Text position={[0, isMobile ? 2.2 : 2.8, 0]} fontSize={0.4} color="white" font="https://fonts.gstatic.com/s/raleway/v14/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrQ.ttf">{name}</Text>}
      </Float>
    </group>
  );
};

// =====================================================================
// 🚀 COMPONENTE PRINCIPAL
// =====================================================================
export const ProjectsSection = ({ isMobile }: { isMobile: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS_DATA[activeIndex];

  return (
    <section style={{ width: '100%', minHeight: '100vh', background: '#000c2d', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ position: 'absolute', top: isMobile ? '40px' : '60px', width: '100%', textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <h2 style={{ fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: 900, color: 'white', margin: 0 }}>NUESTRA <span style={{ color: '#FAA918' }}>CONSTELACIÓN</span></h2>
        <p style={{ color: '#aaa', marginTop: '10px' }}>Desliza el carrusel para explorar</p>
      </div>

      <div style={{ flex: 1, width: '100%', cursor: 'grab' }}>
        <Canvas camera={{ position: [0, 0, isMobile ? 12 : 15], fov: 50 }}>
          <BackgroundStars />
          <Carousel radius={isMobile ? 4 : 7} activeIndex={activeIndex} setActiveIndex={setActiveIndex} isMobile={isMobile} />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', paddingBottom: '40px', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto', background: 'rgba(0, 12, 45, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: isMobile ? '20px' : '30px', borderRadius: '20px', width: '90%', maxWidth: '500px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', margin: '0 0 10px 0', color: activeProject.color }}>{activeProject.name}</h3>
          <p style={{ color: '#ddd', fontSize: '1rem', lineHeight: 1.5 }}>{activeProject.desc}</p>
          <button style={{ background: 'transparent', border: `2px solid ${activeProject.color}`, color: activeProject.color, padding: '10px 25px', borderRadius: '30px', fontWeight: 700, cursor: 'pointer', marginTop: '15px' }}>VER DETALLES</button>
        </div>
      </div>
    </section>
  );
};