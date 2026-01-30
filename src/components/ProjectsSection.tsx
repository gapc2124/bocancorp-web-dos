import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useCursor } from '@react-three/drei';
import * as THREE from 'three';

// --- DATOS DE PROYECTOS ---
const PROJECTS_DATA = [
  {
    id: 'miranda',
    name: 'Miranda',
    color: '#FFFFFF', 
    orbitRadius: 3.5, 
    desc: 'Sistema de gestión logística inteligente. Optimización de rutas y control de flotas en tiempo real.',
    image: 'linear-gradient(45deg, #333, #999)' 
  },
  {
    id: 'myintelli',
    name: 'MyIntelli',
    color: '#00C2FF', 
    orbitRadius: 5.5, 
    desc: 'Dashboard de Business Intelligence. Procesamiento de Big Data para decisiones estratégicas.',
    image: 'linear-gradient(45deg, #004d80, #00aaff)'
  },
  {
    id: 'datecsa',
    name: 'DATECSA',
    color: '#FF4444', 
    orbitRadius: 7.5, 
    desc: 'Plataforma B2B de alto tráfico. Soporta miles de transacciones simultáneas con estabilidad.',
    image: 'linear-gradient(45deg, #801a1a, #ff6666)'
  },
  {
    id: 'ruedaverde',
    name: 'RuedaVerde',
    color: '#00E676', 
    orbitRadius: 9.5, 
    desc: 'App de movilidad sostenible. Fomento del transporte ecológico mediante gamificación.',
    image: 'linear-gradient(45deg, #1a8033, #66ff99)'
  }
];

const BG_COLOR = "#000c2d";
const BLUE_SQUARE_COLOR = "#0055AA";

// =====================================================================
// 🧊 FONDO ESTRELLAS
// =====================================================================
const BlueSquareStars = ({ count = 2000 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    
    const positions = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const r = 50 + Math.random() * 100; 
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            temp.push(
                r * Math.sin(phi) * Math.cos(theta), 
                r * Math.sin(phi) * Math.sin(theta), 
                r * Math.cos(phi)
            );
        }
        return new Float32Array(temp);
    }, [count]);

    useEffect(() => {
      if (!meshRef.current) return;
      for (let i = 0; i < count; i++) {
        dummy.position.set(positions[i*3], positions[i*3+1], positions[i*3+2]);
        const s = 0.4 + Math.random() * 0.8;
        dummy.scale.set(s, s, s);
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }, [count, dummy, positions]);

    useFrame((_, delta) => { if(meshRef.current) meshRef.current.rotation.y += delta * 0.01; });
    
    return (
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={BLUE_SQUARE_COLOR} transparent opacity={0.5} />
      </instancedMesh>
    );
};

// =====================================================================
// 🎮 CONTROLADOR DEL SISTEMA SOLAR
// =====================================================================
const SolarSystemController = ({ activeProjectId, setActiveProject }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const rotationRef = useRef(0);
  const velocityRef = useRef(0.002); 
  const isDragging = useRef(false);
  const previousX = useRef(0);
  
  const [hovered, setHover] = useState(false);
  
  useCursor(hovered, 'grab', 'auto'); 

  const handlePointerDown = (e: any) => {
    isDragging.current = true;
    previousX.current = e.clientX;
    velocityRef.current = 0;
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousX.current;
    previousX.current = e.clientX;
    const sensitivity = 0.005;
    
    rotationRef.current -= deltaX * sensitivity;
    velocityRef.current = -deltaX * sensitivity;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    document.body.style.cursor = 'auto';
  };

  useFrame(() => {
    if (!isDragging.current) {
      const cruiseSpeed = 0.002;
      velocityRef.current = THREE.MathUtils.lerp(velocityRef.current, cruiseSpeed, 0.05);
      rotationRef.current += velocityRef.current;
    }
  });

  return (
    <>
      <mesh 
        position={[0, 0, -1]} 
        scale={[100, 100, 1]} 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        visible={false} 
      >
        <planeGeometry />
        <meshBasicMaterial />
      </mesh>

      <group ref={groupRef}>
        {/* SOL PEQUEÑO (0.8) */}
        <mesh position={[0,0,0]}>
            <circleGeometry args={[0.8, 32]} />
            <meshBasicMaterial color="#FAA918" />
            <mesh scale={[1.5, 1.5, 1]}>
                <circleGeometry args={[0.8, 32]} />
                <meshBasicMaterial color="#FAA918" transparent opacity={0.2} />
            </mesh>
        </mesh>

        {PROJECTS_DATA.map((project, idx) => (
            <PlanetWrapper 
                key={project.id}
                data={project}
                isActive={activeProjectId === project.id}
                onClick={setActiveProject}
                globalRotationRef={rotationRef}
                index={idx}
            />
        ))}
      </group>
    </>
  );
};

// =====================================================================
// 🪐 PLANETA INDIVIDUAL
// =====================================================================
const PlanetWrapper = ({ data, isActive, onClick, globalRotationRef, index }: any) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  const initialAngle = (index / PROJECTS_DATA.length) * Math.PI * 2;

  useFrame(() => {
    const currentAngle = initialAngle + globalRotationRef.current;
    const x = Math.cos(currentAngle) * data.orbitRadius;
    const y = Math.sin(currentAngle) * data.orbitRadius;

    if (meshRef.current) {
      meshRef.current.position.set(x, y, 0);
    }
  });

  const orbitPoints = useMemo(() => {
      const points = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          points.push(Math.cos(angle) * data.orbitRadius, Math.sin(angle) * data.orbitRadius, 0);
      }
      return new Float32Array(points);
  }, [data.orbitRadius]);

  return (
    <>
      <lineLoop>
          <bufferGeometry>
             <bufferAttribute
                attach="attributes-position"
                count={129} 
                array={orbitPoints}
                itemSize={3}
                args={[orbitPoints, 3]} 
             />
          </bufferGeometry>
          <lineBasicMaterial color={data.color} transparent opacity={0.15} linewidth={1} />
      </lineLoop>

      <group ref={meshRef}>
          <mesh 
            onClick={(e) => { e.stopPropagation(); onClick(data); }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
          >
            <circleGeometry args={[isActive || hovered ? 0.9 : 0.7, 32]} />
            <meshBasicMaterial color={data.color} />
            {(hovered || isActive) && (
                <mesh scale={[1.4, 1.4, 1]}>
                    <circleGeometry args={[0.9, 32]} />
                    <meshBasicMaterial color={data.color} transparent opacity={0.3} />
                </mesh>
            )}
          </mesh>

          <Html position={[0, -1.6, 0]} center style={{ pointerEvents: 'none' }}>
            <div style={{ 
                color: data.color, 
                fontSize: '14px', 
                fontWeight: '800', 
                textShadow: '0 2px 8px rgba(0,0,0,1)',
                whiteSpace: 'nowrap',
                opacity: hovered || isActive ? 1 : 0.6 
            }}>
                {data.name}
            </div>
          </Html>
      </group>
    </>
  );
};

// =====================================================================
// 🚀 COMPONENTE PRINCIPAL
// =====================================================================
export const ProjectsSection = ({ isMobile }: { isMobile: boolean }) => {
  const [activeProject, setActiveProject] = useState<any>(PROJECTS_DATA[0]);
  
  // --- LÓGICA DE 4 NIVELES DE RESPONSIVIDAD ---
  const [zoomLevel, setZoomLevel] = useState(22);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w > 1400) {
        // Nivel 1: Monitor Grande (Gigante)
        setZoomLevel(28); 
      } else if (w > 1024) {
        // Nivel 2: Monitor Chico / Laptop (Estándar)
        setZoomLevel(22);
      } else if (w > 600) {
        // Nivel 3: Celular Ancho / Tablet (Compacto)
        setZoomLevel(18);
      } else {
        // Nivel 4: Celular Delgado (Muy pequeño)
        setZoomLevel(13); // Zoom reducido considerablemente
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNav = (direction: 'prev' | 'next') => {
    const currentIndex = PROJECTS_DATA.findIndex(p => p.id === activeProject.id);
    let newIndex;
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % PROJECTS_DATA.length;
    } else {
        newIndex = (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    }
    setActiveProject(PROJECTS_DATA[newIndex]);
  };

  return (
    <section className="projects-section" style={{ background: BG_COLOR }}>
      
      <div className="stars-bg">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <BlueSquareStars count={1500} />
        </Canvas>
      </div>

      <div className="container">
        
        <h2 className="section-title">CASOS DE <span style={{ color: '#FAA918' }}>ÉXITO</span></h2>
        <p className="section-subtitle">Explora nuestro universo de soluciones</p>

        <div className="split-layout">
            
            {/* IZQUIERDA: SISTEMA SOLAR RESPONSIVE */}
            <div className="solar-system-col">
                <div className="canvas-wrapper">
                    <Canvas 
                        orthographic 
                        // Zoom dinámico basado en los 4 niveles
                        camera={{ position: [0, 0, 15], zoom: zoomLevel }} 
                    >
                        <ambientLight intensity={1} />
                        <SolarSystemController 
                            activeProjectId={activeProject.id} 
                            setActiveProject={setActiveProject} 
                        />
                    </Canvas>
                </div>
            </div>

            {/* DERECHA: DETALLES */}
            <div className="details-col">
                <div className="details-card" key={activeProject.id}> 
                    <div className="project-image" style={{ background: activeProject.image }}>
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.3)', fontWeight: 900 }}>
                                {activeProject.name.substring(0,1)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="card-content">
                        {/* Sin título del proyecto, directo a descripción */}
                        <p className="project-desc">{activeProject.desc}</p>
                        <button className="cta-btn" style={{ background: activeProject.color, color: activeProject.id === 'miranda' ? '#000' : '#fff' }}>
                            VER CASO COMPLETO
                        </button>
                    </div>

                    <div className="card-nav">
                        <button className="nav-arrow" onClick={() => handleNav('prev')}>&#8592;</button>
                        <span className="nav-dots">
                            {PROJECTS_DATA.map((p) => (
                                <span 
                                    key={p.id} 
                                    className={`dot ${p.id === activeProject.id ? 'active' : ''}`}
                                    style={{ backgroundColor: p.id === activeProject.id ? p.color : '#555' }}
                                ></span>
                            ))}
                        </span>
                        <button className="nav-arrow" onClick={() => handleNav('next')}>&#8594;</button>
                    </div>

                </div>
            </div>

        </div>

      </div>

      <style>{`
        .projects-section {
            position: relative;
            min-height: ${isMobile ? 'auto' : '850px'};
            padding: ${isMobile ? '60px 20px' : '100px 40px'};
            overflow: hidden;
        }
        .stars-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; opacity: 0.6; }
        .container { position: relative; z-index: 10; max-width: 1400px; margin: 0 auto; }
        
        .section-title { 
            text-align: center; 
            font-size: ${isMobile ? '2.5rem' : '3.5rem'}; 
            font-weight: 800; color: #fff; margin: 0; line-height: 1; 
        }
        .section-subtitle { text-align: center; color: #88aaff; margin-top: 10px; margin-bottom: ${isMobile ? '30px' : '50px'}; }

        .split-layout {
            display: flex;
            flex-direction: ${isMobile ? 'column' : 'row'};
            align-items: center;
            justify-content: center;
            gap: ${isMobile ? '20px' : '80px'};
        }

        .solar-system-col {
            flex: 1; 
            width: 100%;
            display: flex; flex-direction: column; align-items: center; position: relative;
        }
        
        /* WRAPPER RESPONSIVE CON 4 NIVELES */
        .canvas-wrapper {
            position: relative;
            cursor: grab; 
            max-width: 100%;
            /* Por defecto: Nivel 2 (Laptop/Desktop normal) */
            width: 600px;
            height: 600px;
        }
        .canvas-wrapper:active { cursor: grabbing; }

        /* Nivel 1: Monitor Grande */
        @media (min-width: 1401px) {
            .canvas-wrapper { width: 750px; height: 750px; }
        }

        /* Nivel 3: Tablet / Móvil Ancho */
        @media (max-width: 1024px) {
            .canvas-wrapper { width: 500px; height: 500px; }
        }

        /* Nivel 4: Móvil Delgado */
        @media (max-width: 600px) {
            .canvas-wrapper { width: 320px; height: 320px; } /* Considerablemente más pequeño */
        }

        .details-col {
            flex: 1; 
            width: ${isMobile ? '100%' : 'auto'};
            min-width: ${isMobile ? 'auto' : '350px'};
            display: flex; justify-content: center;
        }
        
        .details-card {
            width: 100%; max-width: 450px;
            background: rgba(13, 25, 48, 0.8);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 20px;
            overflow: hidden;
            backdrop-filter: blur(12px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            animation: slideUpFade 0.4s ease;
            position: relative;
        }
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .project-image { width: 100%; height: 200px; position: relative; }
        .card-content { padding: 30px 30px 10px 30px; }

        .project-desc { color: #ccc; font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; }
        
        .cta-btn {
            width: 100%; padding: 15px; border: none; border-radius: 8px;
            font-weight: 700; font-size: 0.9rem; cursor: pointer;
            text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s, filter 0.2s;
        }
        .cta-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }

        .card-nav {
            display: flex; align-items: center; justify-content: space-between;
            padding: 15px 30px 25px 30px;
            margin-top: 10px;
            border-top: 1px solid rgba(255,255,255,0.05);
        }
        .nav-arrow {
            background: rgba(255,255,255,0.1); border: none; color: white;
            width: 40px; height: 40px; border-radius: 50%;
            font-size: 1.2rem; cursor: pointer; transition: 0.2s;
            display: flex; align-items: center; justify-content: center;
        }
        .nav-arrow:hover { background: rgba(255,255,255,0.3); }
        
        .nav-dots { display: flex; gap: 8px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #555; transition: 0.3s; }
        .dot.active { transform: scale(1.3); }
      `}</style>
    </section>
  );
};