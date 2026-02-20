import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { Rocket, ShieldCheck, Globe, Building, Target, MapPin, X, Star } from 'lucide-react';

// ==========================================
// 1. INTERFACES Y TRADUCCIONES (HISTORIA BOCANCORP)
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

const TRANSLATIONS: Record<string, any> = {
  ES: {
    mainTitle: "Nuestra ",
    mainHighlight: "evolución",
    subtitle: "ha sido guiada por especialización técnica y visión estratégica.",
    finalDesc: "Una constelación de hitos que forjan nuestra historia.",
    readMore: "Ver detalles ✦",
    timeline: [
      { 
        id: 't1', year: '2023', title: 'Fundación y Visión Estratégica', type: 'milestone', 
        desc: 'Bocancorp se establece en Virginia, EE. UU.', 
        details: 'Nacemos con el propósito de cerrar la brecha entre tecnología avanzada y lenguaje empresarial en LATAM. Desde el día cero, la compañía se enfoca en arquitectura Cloud moderna y comunicación técnica orientada al negocio.',
        align: 'left', icon: <Rocket />, color: '#FAA918' 
      },
      { 
        id: 't2', year: '2023', title: 'Consolidación en Ecosistema AWS', type: 'project', 
        desc: 'Iniciamos acercamiento formal en EE. UU.', 
        details: 'Identificamos la oportunidad estratégica de convertirnos en Partner Select. Este proceso impulsó la certificación de nuestro equipo y la ejecución de nuestros primeros proyectos exitosos de migración a la nube.',
        align: 'right', icon: <Target />, color: '#00C2FF' 
      },
      { 
        id: 't3', year: '2024', title: 'Validación Oficial como AWS Partner', type: 'milestone', 
        desc: 'Alcanzamos el estatus de Partner Select.', 
        details: 'Obtuvimos la validación técnica FTR para migraciones y el Service Delivery Program (SDP) en AWS WAF. Fortalecimos nuestro equipo con certificaciones oficiales, consolidando la especialización en arquitectura y seguridad.',
        align: 'left', icon: <ShieldCheck />, color: '#ff007a' 
      },
      { 
        id: 't4', year: '2024', title: 'Proyectos de Mayor Escala', type: 'project', 
        desc: 'Expansión regional a finales de año.', 
        details: 'Comenzamos a trabajar con organizaciones multinacionales en LATAM, ejecutando proyectos de arquitectura Cloud avanzada y seguridad en entornos productivos de alta complejidad.',
        align: 'right', icon: <Globe />, color: '#00ff8c' 
      },
      { 
        id: 't5', year: '2025', title: 'Sectores Regulados en Colombia', type: 'milestone', 
        desc: 'Establecemos operaciones en febrero de 2025.', 
        details: 'Ampliamos presencia regional iniciando proyectos en gobernanza de datos, arquitectura de red y soluciones serverless para organizaciones del sector tributario y financiero, fortaleciendo nuestra experiencia regulada.',
        align: 'left', icon: <MapPin />, color: '#aa00ff' 
      },
      { 
        id: 't6', year: '2025', title: 'Integración Estratégica Startups', type: 'project', 
        desc: 'Consolidación técnica a finales de 2025.', 
        details: 'Ampliamos nuestra presencia en el ecosistema de startups desarrollando arquitecturas en AWS con integración de ciberseguridad avanzada (Panorama y Prisma Cloud) y metodologías FinOps.',
        align: 'right', icon: <Building />, color: '#ff4d00' 
      }
    ]
  },
  EN: {
    mainTitle: "Our ",
    mainHighlight: "evolution",
    subtitle: "has been guided by technical expertise and strategic vision.",
    finalDesc: "A constellation of milestones that forge our history.",
    readMore: "View details ✦",
    timeline: [
      { 
        id: 't1', year: '2023', title: 'Foundation & Strategic Vision', type: 'milestone', 
        desc: 'Bocancorp is established in Virginia, USA.', 
        details: 'We were born with the purpose of bridging the gap between advanced technology and business language in LATAM. From day zero, the company focused on modern Cloud architecture and business-oriented technical communication.',
        align: 'left', icon: <Rocket />, color: '#FAA918' 
      },
      { 
        id: 't2', year: '2023', title: 'AWS Ecosystem Consolidation', type: 'project', 
        desc: 'Formal outreach begins in the US.', 
        details: 'We identified the strategic opportunity to become an AWS Select Partner. This process drove our team’s certification and the execution of our first successful cloud migration projects.',
        align: 'right', icon: <Target />, color: '#00C2FF' 
      },
      { 
        id: 't3', year: '2024', title: 'Official AWS Partner Validation', type: 'milestone', 
        desc: 'Achieved Select Partner status.', 
        details: 'We obtained the FTR technical validation for migrations and the Service Delivery Program (SDP) for AWS WAF. We strengthened our team with official certifications, solidifying our specialization in cloud architecture and security.',
        align: 'left', icon: <ShieldCheck />, color: '#ff007a' 
      },
      { 
        id: 't4', year: '2024', title: 'Large-Scale Projects', type: 'project', 
        desc: 'Regional expansion by year-end.', 
        details: 'We began working with multinational organizations in LATAM, executing advanced Cloud architecture and security projects in highly complex production environments.',
        align: 'right', icon: <Globe />, color: '#00ff8c' 
      },
      { 
        id: 't5', year: '2025', title: 'Regulated Sectors in Colombia', type: 'milestone', 
        desc: 'Operations established in February 2025.', 
        details: 'We expanded our regional presence by initiating projects in data governance, network architecture, and serverless solutions for tax and financial sector organizations, strengthening our regulated expertise.',
        align: 'left', icon: <MapPin />, color: '#aa00ff' 
      },
      { 
        id: 't6', year: '2025', title: 'Strategic Startup Integration', type: 'project', 
        desc: 'Technical consolidation by late 2025.', 
        details: 'We expanded our presence in the startup ecosystem by developing AWS architectures with integrated advanced cybersecurity (Panorama and Prisma Cloud) and FinOps methodologies.',
        align: 'right', icon: <Building />, color: '#ff4d00' 
      }
    ]
  }
};

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
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100; 
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
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // --- LÓGICA DE IDIOMA ---
  const [lang, setLang] = useState(localStorage.getItem('appLanguage') || 'ES');

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem('appLanguage') || 'ES');
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = TRANSLATIONS[lang];

  // Buscamos el nodo activo en el idioma actual para que se traduzca incluso si está abierto
  const activeNode = selectedNodeId ? t.timeline.find((n: TimelineNode) => n.id === selectedNodeId) : null;

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#00020a', overflow: 'hidden', padding: isMobile ? '100px 20px' : '150px 40px' }}>
      
      {/* FONDO ESTELAR */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <BackgroundStars />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* TÍTULO CON JERARQUÍA */}
        <motion.div 
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            key={lang} // Anima al cambiar de idioma
            style={{ textAlign: 'center', marginBottom: '80px', padding: '0 20px' }}
        >
            <h2 style={{ color: 'white', fontSize: isMobile ? '2.8rem' : '4.5rem', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 10px 0', lineHeight: 1 }}>
                {t.mainTitle}<span style={{ color: '#00C2FF', textShadow: '0 0 30px rgba(0,194,255,0.5)' }}>{t.mainHighlight}</span>
            </h2>

            <h3 style={{ color: '#e2e8f0', fontSize: isMobile ? '1.1rem' : '1.6rem', fontWeight: 600, textTransform: 'none', letterSpacing: '0.5px', margin: '0 auto', maxWidth: '800px', lineHeight: 1.4, opacity: 0.9 }}>
                {t.subtitle}
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '20px', fontWeight: 500 }}>
                {t.finalDesc}
            </p>
        </motion.div>

        {/* LÍNEA DE TIEMPO */}
        <div className="timeline-container">
            <div className="timeline-center-line" />

            {t.timeline.map((node: TimelineNode) => (
              <div key={node.id} className={`timeline-row ${isMobile ? 'mobile-row' : (node.align === 'left' ? 'row-left' : 'row-right')}`}>
                  
                  {/* ESTRELLA */}
                  <div className="timeline-star-wrapper">
                      <motion.div 
                          className="timeline-star"
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ delay: 0.2, type: "spring" }}
                          whileHover={{ scale: 1.3, boxShadow: `0 0 30px ${node.color}` }}
                          onClick={() => setSelectedNodeId(node.id)}
                          style={{ borderColor: node.color, backgroundColor: '#000c2d' }}
                      >
                          <div style={{ color: node.color, width: '50%', height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                             <Star fill={node.color} size={14} />
                          </div>
                      </motion.div>
                  </div>

                  {/* CONTENIDO DE LA ESTRELLA */}
                  <motion.div 
                      className="timeline-content"
                      initial={{ opacity: 0, x: isMobile ? 50 : (node.align === 'left' ? -50 : 50) }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      onClick={() => setSelectedNodeId(node.id)}
                  >
                      <h3 style={{ color: node.color }}>{node.year}</h3>
                      <h4 style={{ color: '#fff' }}>{node.title}</h4>
                      <p>{node.desc}</p>
                      <span className="read-more">{t.readMore}</span>
                  </motion.div>

              </div>
            ))}
        </div>
      </div>

      {/* ==========================================
          MODAL (CARTA QUE SE ABRE AL HACER CLIC)
          ========================================== */}
      <AnimatePresence>
        {activeNode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ 
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
                backgroundColor: 'rgba(0, 2, 10, 0.85)', backdropFilter: 'blur(15px)', 
                zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px'
            }}
            onClick={() => setSelectedNodeId(null)}
          >
            <motion.div 
                initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()} 
                style={{ 
                    width: '100%', maxWidth: '600px', backgroundColor: '#000c2d', 
                    borderRadius: '24px', border: `1px solid ${activeNode.color}50`, 
                    boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 30px ${activeNode.color}20`,
                    padding: isMobile ? '30px' : '50px', position: 'relative', overflow: 'hidden'
                }}
            >
                <button 
                    onClick={() => setSelectedNodeId(null)} 
                    style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', transition: 'color 0.3s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                    <X size={30} />
                </button>

                <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: activeNode.color, filter: 'blur(80px)', opacity: 0.3, borderRadius: '50%', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', position: 'relative', zIndex: 2 }}>
                    <div style={{ padding: '15px', backgroundColor: `${activeNode.color}15`, borderRadius: '16px', border: `1px solid ${activeNode.color}40`, color: activeNode.color }}>
                        {activeNode.icon}
                    </div>
                    <div>
                        <span style={{ color: activeNode.color, fontWeight: 900, fontSize: '1.2rem', letterSpacing: '2px' }}>{activeNode.year}</span>
                        <h3 style={{ color: '#fff', fontSize: isMobile ? '1.5rem' : '2rem', margin: '5px 0 0 0', lineHeight: 1.2 }}>{activeNode.title}</h3>
                    </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '20px', fontWeight: 600 }}>
                        {activeNode.desc}
                    </p>
                    <div style={{ width: '40px', height: '2px', backgroundColor: activeNode.color, marginBottom: '20px' }} />
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                        {activeNode.details}
                    </p>
                </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .timeline-container { position: relative; width: 100%; padding: 40px 0; }
        .timeline-center-line { position: absolute; left: 50%; transform: translateX(-50%); top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, transparent, rgba(0, 194, 255, 0.5), transparent); box-shadow: 0 0 15px rgba(0, 194, 255, 0.5); }
        .timeline-row { display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 60px; position: relative; }
        .timeline-star-wrapper { position: absolute; left: 50%; transform: translateX(-50%); display: flex; justify-content: center; align-items: center; z-index: 5; }
        .timeline-star { width: 30px; height: 30px; border-radius: 50%; border: 3px solid; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: box-shadow 0.3s ease; }
        .timeline-content { width: 42%; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); padding: 30px; border-radius: 20px; cursor: pointer; transition: all 0.3s ease; position: relative; backdrop-filter: blur(10px); }
        .timeline-content:hover { background: rgba(255, 255, 255, 0.08); transform: translateY(-5px); }
        .timeline-content::before { content: ''; position: absolute; top: 50%; width: 8%; height: 1px; background: rgba(255, 255, 255, 0.2); }
        .row-left .timeline-content { text-align: right; margin-right: auto; }
        .row-left .timeline-content::before { right: -8%; }
        .row-right .timeline-content { text-align: left; margin-left: auto; }
        .row-right .timeline-content::before { left: -8%; }
        .timeline-content h3 { font-size: 1.5rem; font-weight: 900; margin: 0 0 10px 0; letter-spacing: 2px; }
        .timeline-content h4 { font-size: 1.3rem; margin: 0 0 10px 0; font-weight: 700; }
        .timeline-content p { color: #94a3b8; font-size: 1rem; line-height: 1.5; margin: 0 0 15px 0; }
        .read-more { font-size: 0.85rem; color: #fff; opacity: 0.6; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; transition: opacity 0.3s; }
        .timeline-content:hover .read-more { opacity: 1; color: #00C2FF; }
        
        @media (max-width: 768px) {
            .timeline-center-line { left: 20px; transform: none; }
            .timeline-row { flex-direction: column; align-items: flex-start; margin-bottom: 40px; }
            .timeline-star-wrapper { left: 20px; transform: translateX(-50%); }
            .timeline-content { width: calc(100% - 60px); margin-left: 60px !important; text-align: left !important; padding: 20px; }
            .timeline-content::before { display: none; }
        }
      `}</style>
    </section>
  );
};