import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { Rocket, Globe, Code2, Building, ShoppingCart, BrainCircuit, Database, MapPin, X, Star } from 'lucide-react';

// ==========================================
// 1. DATOS DE LA CONSTELACIÓN (LÍNEA DE TIEMPO)
// ==========================================
interface TimelineNode {
  id: string;
  year: string;
  title: string;
  type: 'milestone' | 'project';
  desc: string;
  details: string;
  align: 'left' | 'right';
  icon: React.ReactNode;
  color: string;
}

const TIMELINE_DATA: TimelineNode[] = [
  { 
    id: 't1', year: '2019', title: 'Fundación de Bocancorp', type: 'milestone', 
    desc: 'El Big Bang de nuestra historia.', 
    details: 'Nace Bocancorp con la visión de transformar la infraestructura tecnológica empresarial, apostando desde el día cero por la nube y la escalabilidad.',
    align: 'left', icon: <Rocket />, color: '#FAA918' 
  },
  { 
    id: 't2', year: '2020', title: 'Expansión a Aruba', type: 'milestone', 
    desc: 'Nuestro primer salto internacional.', 
    details: 'Iniciamos operaciones en el Caribe, estableciendo alianzas estratégicas y adaptando nuestras soluciones a mercados internacionales emergentes.',
    align: 'right', icon: <Globe />, color: '#00C2FF' 
  },
  { 
    id: 't3', year: '2021', title: 'Core Bancario Serverless', type: 'project', 
    desc: 'Modernización Fintech.', 
    details: 'Migración exitosa del core transaccional de una importante Fintech a una arquitectura 100% Serverless en AWS, reduciendo la latencia un 60%.',
    align: 'left', icon: <Code2 />, color: '#ff007a' 
  },
  { 
    id: 't4', year: '2022', title: 'Expansión a Estados Unidos', type: 'milestone', 
    desc: 'Consolidación en Norteamérica.', 
    details: 'Apertura oficial de nuestra sede corporativa en EE.UU., permitiéndonos competir en el mercado tecnológico más exigente del mundo.',
    align: 'right', icon: <Building />, color: '#00ff8c' 
  },
  { 
    id: 't5', year: '2023', title: 'E-commerce de Alta Concurrencia', type: 'project', 
    desc: 'Arquitectura Cloud-Native.', 
    details: 'Despliegue de una plataforma retail B2C capaz de soportar picos masivos de tráfico en eventos Cyber sin un solo segundo de inactividad.',
    align: 'left', icon: <ShoppingCart />, color: '#aa00ff' 
  },
  { 
    id: 't6', year: '2023', title: 'Asistente IA Logístico', type: 'project', 
    desc: 'Integración LLM Corporativa.', 
    details: 'Desarrollo de un chatbot inteligente con IA Generativa para optimizar la trazabilidad y atención al cliente en una red logística global.',
    align: 'right', icon: <BrainCircuit />, color: '#ff4d00' 
  },
  { 
    id: 't7', year: '2024', title: 'Data Lake Minero', type: 'project', 
    desc: 'Gobernanza de Datos.', 
    details: 'Centralización de terabytes de datos operativos en Oracle Cloud para análisis predictivo y prevención de fallos en maquinaria pesada.',
    align: 'left', icon: <Database />, color: '#33BEFF' 
  },
  { 
    id: 't8', year: '2025', title: 'Expansión a Colombia', type: 'milestone', 
    desc: 'Centro de Operaciones Estratégicas.', 
    details: 'Establecemos nuestro nuevo HUB tecnológico en Bogotá, reforzando nuestra presencia en la región andina con talento élite.',
    align: 'right', icon: <MapPin />, color: '#FAA918' 
  },
];


// ==========================================
// 2. SHADER Y PARTICULAS (FONDO 3D)
// ==========================================
const vertexShader = `
  uniform float uTime;
  attribute vec3 aPosition;
  varying vec3 vColor;
  float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
  void main() {
    vec3 pos = aPosition;
    float floatY = sin(pos.x * 0.5 + uTime * 0.2) * 0.2;
    float floatX = cos(pos.y * 0.5 + uTime * 0.2) * 0.2;
    pos.x += floatX; pos.y += floatY; pos.z += sin(uTime * 0.1 + pos.x) * 0.5;
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
    gl_PointSize = (40.0 / -mvPosition.z); 
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * 0.7); 
  }
`;

const AmbientParticlesMaterial = shaderMaterial({ uTime: 0 }, vertexShader, fragmentShader);
extend({ AmbientParticlesMaterial });

const BackgroundStars = () => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;     
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100; // Más alto para cubrir el scroll 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10.0; 
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    meshRef.current.rotation.y += 0.0005;
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
// 3. COMPONENTE PRINCIPAL DE LA CONSTELACIÓN
// ==========================================
export const TimelineConstellation = ({ isMobile }: { isMobile: boolean }) => {
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null);

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#00020a', overflow: 'hidden', padding: isMobile ? '100px 20px' : '150px 40px' }}>
      
      {/* FONDO ESTELAR */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <BackgroundStars />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* TÍTULO */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ color: 'white', fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
                Nuestra <span style={{ color: '#00C2FF', textShadow: '0 0 20px rgba(0,194,255,0.5)' }}>Evolución</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginTop: '15px' }}>Una constelación de hitos y proyectos que forjan nuestra historia.</p>
        </motion.div>

        {/* CONTENEDOR DE LA LÍNEA DE TIEMPO */}
        <div className="timeline-container">
            {/* LÍNEA CENTRAL (El "hilo" de la constelación) */}
            <div className="timeline-center-line" />

            {TIMELINE_DATA.map((node, index) => (
              <div key={node.id} className={`timeline-row ${isMobile ? 'mobile-row' : (node.align === 'left' ? 'row-left' : 'row-right')}`}>
                  
                  {/* ESTRELLA (NODO INTERACTIVO) */}
                  <div className="timeline-star-wrapper">
                      <motion.div 
                          className="timeline-star"
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ delay: 0.2, type: "spring" }}
                          whileHover={{ scale: 1.3, boxShadow: `0 0 30px ${node.color}` }}
                          onClick={() => setSelectedNode(node)}
                          style={{ borderColor: node.color, backgroundColor: '#000c2d' }}
                      >
                          {/* El ícono dentro de la estrella */}
                          <div style={{ color: node.color, width: '50%', height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                             <Star fill={node.color} size={14} />
                          </div>
                      </motion.div>
                  </div>

                  {/* CONTENIDO (TEXTO JUNTO A LA ESTRELLA) */}
                  <motion.div 
                      className="timeline-content"
                      initial={{ opacity: 0, x: isMobile ? 50 : (node.align === 'left' ? -50 : 50) }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      onClick={() => setSelectedNode(node)}
                  >
                      <h3 style={{ color: node.color }}>{node.year}</h3>
                      <h4 style={{ color: '#fff' }}>{node.title}</h4>
                      <p>{node.desc}</p>
                      <span className="read-more">Ver detalles ✦</span>
                  </motion.div>

              </div>
            ))}
        </div>
      </div>

      {/* ==========================================
          MODAL (CARTA QUE SE ABRE AL HACER CLIC)
          ========================================== */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ 
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
                backgroundColor: 'rgba(0, 2, 10, 0.85)', backdropFilter: 'blur(15px)', 
                zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px'
            }}
            onClick={() => setSelectedNode(null)} // Cierra al hacer clic afuera
          >
            <motion.div 
                initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic adentro
                style={{ 
                    width: '100%', maxWidth: '600px', backgroundColor: '#000c2d', 
                    borderRadius: '24px', border: `1px solid ${selectedNode.color}50`, 
                    boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 30px ${selectedNode.color}20`,
                    padding: isMobile ? '30px' : '50px', position: 'relative', overflow: 'hidden'
                }}
            >
                {/* Botón Cerrar */}
                <button 
                    onClick={() => setSelectedNode(null)} 
                    style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', transition: 'color 0.3s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                    <X size={30} />
                </button>

                {/* Brillo de fondo en la tarjeta */}
                <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: selectedNode.color, filter: 'blur(80px)', opacity: 0.3, borderRadius: '50%', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', position: 'relative', zIndex: 2 }}>
                    <div style={{ padding: '15px', backgroundColor: `${selectedNode.color}15`, borderRadius: '16px', border: `1px solid ${selectedNode.color}40`, color: selectedNode.color }}>
                        {selectedNode.icon}
                    </div>
                    <div>
                        <span style={{ color: selectedNode.color, fontWeight: 900, fontSize: '1.2rem', letterSpacing: '2px' }}>{selectedNode.year}</span>
                        <h3 style={{ color: '#fff', fontSize: isMobile ? '1.5rem' : '2rem', margin: '5px 0 0 0', lineHeight: 1.2 }}>{selectedNode.title}</h3>
                    </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '20px', fontWeight: 600 }}>
                        {selectedNode.desc}
                    </p>
                    <div style={{ width: '40px', height: '2px', backgroundColor: selectedNode.color, marginBottom: '20px' }} />
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                        {selectedNode.details}
                    </p>
                </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ESTILOS CSS PARA LA LÍNEA DE TIEMPO */}
      <style>{`
        .timeline-container {
            position: relative;
            width: 100%;
            padding: 40px 0;
        }

        /* Línea central brillante */
        .timeline-center-line {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, transparent, rgba(0, 194, 255, 0.5), transparent);
            box-shadow: 0 0 15px rgba(0, 194, 255, 0.5);
        }

        .timeline-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 60px;
            position: relative;
        }

        .timeline-star-wrapper {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 5;
        }

        .timeline-star {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: box-shadow 0.3s ease;
        }

        .timeline-content {
            width: 42%;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            backdrop-filter: blur(10px);
        }
        
        .timeline-content:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-5px);
        }

        /* "Brazo" que conecta la estrella con la caja de contenido */
        .timeline-content::before {
            content: '';
            position: absolute;
            top: 50%;
            width: 8%;
            height: 1px;
            background: rgba(255, 255, 255, 0.2);
        }

        .row-left .timeline-content {
            text-align: right;
            margin-right: auto;
        }
        .row-left .timeline-content::before {
            right: -8%;
        }

        .row-right .timeline-content {
            text-align: left;
            margin-left: auto;
        }
        .row-right .timeline-content::before {
            left: -8%;
        }

        .timeline-content h3 {
            font-size: 1.5rem;
            font-weight: 900;
            margin: 0 0 10px 0;
            letter-spacing: 2px;
        }
        .timeline-content h4 {
            font-size: 1.3rem;
            margin: 0 0 10px 0;
            font-weight: 700;
        }
        .timeline-content p {
            color: #94a3b8;
            font-size: 1rem;
            line-height: 1.5;
            margin: 0 0 15px 0;
        }
        .read-more {
            font-size: 0.85rem;
            color: #fff;
            opacity: 0.6;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: opacity 0.3s;
        }
        .timeline-content:hover .read-more {
            opacity: 1;
            color: #00C2FF;
        }

        /* RESPONSIVE: MÓVILES */
        @media (max-width: 768px) {
            .timeline-center-line {
                left: 20px;
                transform: none;
            }
            .timeline-row {
                flex-direction: column;
                align-items: flex-start;
                margin-bottom: 40px;
            }
            .timeline-star-wrapper {
                left: 20px;
                transform: translateX(-50%);
            }
            .timeline-content {
                width: calc(100% - 60px);
                margin-left: 60px !important;
                text-align: left !important;
                padding: 20px;
            }
            .timeline-content::before {
                display: none; /* Quitamos el bracito en móvil para ahorrar espacio */
            }
        }
      `}</style>
    </section>
  );
};