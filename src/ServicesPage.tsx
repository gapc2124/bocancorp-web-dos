import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
// Importamos tus componentes. Asumo que Auroras existe en components
import { Auroras } from './components/Auroras'; 
import { Carousel3D } from './components/Carousel3D';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

const DATA = [
  { id: 1, subtitle: "SOMOS INNOVACIÓN", title: "BOCANCORP", desc: "Compañía líder en desarrollo de software. Transformamos visiones complejas en ecosistemas digitales robustos y escalables.", color: "#FAA918" },
  { id: 2, subtitle: "EFICIENCIA INTELIGENTE", title: "Automatización con IA", desc: "Optimizamos operaciones y reducimos costos integrando inteligencia artificial en tus flujos de trabajo críticos.", color: "#FF4500" },
  { id: 3, subtitle: "EXPERIENCIAS MULTIPLATAFORMA", title: "Desarrollo Web y Móvil", desc: "Creamos aplicaciones nativas y web progresivas (PWA) que conectan con tus usuarios en cualquier dispositivo.", color: "#00BFFF" },
  { id: 4, subtitle: "INFRAESTRUCTURA ÉLITE", title: "Cloud Solutions", desc: "Arquitectura, migración y gestión de entornos en la nube (AWS, Azure, GCP) para máxima disponibilidad.", color: "#44C591" },
  { id: 5, subtitle: "EL VALOR DE TU INFORMACIÓN", title: "Gobernanza de Datos e IA", desc: "Estrategias integrales para asegurar la calidad, cumplimiento y uso ético de tus datos y modelos de IA.", color: "#9932CC" },
  { id: 6, subtitle: "PROTECCIÓN BLINDADA", title: "Seguridad en la Nube", desc: "Protocolos avanzados de ciberseguridad para proteger tus activos digitales contra las amenazas más modernas.", color: "#F43F5E" }
];

export const ServicesPage = ({ isMobile }: { isMobile: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % DATA.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + DATA.length) % DATA.length);

  const activeSlide = DATA[activeIndex];

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* CAPA 0: FONDO (AURORAS) - Solo para esta página */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <Canvas camera={{ position: isMobile ? [0, 0, 20] : [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#8A2BE2" />
          <Auroras />
        </Canvas>
      </div>

      {/* CAPA 1: CRISTAL GLOBAL (BLUR) */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1,
        backdropFilter: 'blur(12px)', background: 'rgba(0, 12, 45, 0.5)', pointerEvents: 'none'
      }}></div>

      {/* CAPA 2: CONTENIDO PRINCIPAL */}
      <main style={{ position: 'relative', zIndex: 2, paddingTop: isMobile ? '100px' : '80px' }}>
        
        <section style={{ 
          position: 'relative', 
          height: isMobile ? 'auto' : '85vh', 
          minHeight: '600px', 
          width: '100%', 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          
          {/* EL 3D VIVE AQUÍ */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            <Canvas camera={{ position: isMobile ? [0, 0, 20] : [0, 0, 15], fov: 45 }}>
              <Environment preset="city" /> 
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={3.5} color={activeSlide.color} />
              <pointLight position={[-10, -5, 10]} intensity={2} color="#ffffff" />
              <Suspense fallback={null}>
                <group 
                  position={isMobile ? [0, -4.2, 0] : [7.5, 0, 0]}
                  scale={isMobile ? 1.4 : 1.2}
                >
                  <Carousel3D data={DATA} activeIndex={activeIndex} isMobile={isMobile} />
                </group>
              </Suspense>
            </Canvas>
          </div>

          {/* TEXTO Y CONTROLES */}
          <div style={{ 
            flex: isMobile ? '0 0 auto' : 1, 
            display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', 
            padding: isMobile ? '20px 25px' : '0 0 0 100px', 
            zIndex: 2, pointerEvents: 'auto', height: '100%',
            alignItems: isMobile ? 'center' : 'flex-start' 
          }}>
            
            <div style={{ width: '100%', minHeight: isMobile ? 'auto' : '380px' }}>
              <AnimatePresence mode='wait'>
                <motion.div 
                  key={activeSlide.id}
                  variants={textVariants}
                  initial="hidden" animate="visible" exit="exit"
                  style={{ width: '100%' }}
                >
                  <span style={{ 
                    color: '#FAA918', fontFamily: 'monospace', fontWeight: 700, 
                    fontSize: isMobile ? '0.75rem' : '0.95rem', 
                    letterSpacing: '2px', display: 'block', marginBottom: '15px',
                    textAlign: isMobile ? 'center' : 'left'
                  }}>
                    // {activeSlide.subtitle}
                  </span>

                  <h1 style={{ 
                    fontSize: isMobile ? '2rem' : '4.5rem', 
                    fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', color: 'white',
                    textAlign: isMobile ? 'center' : 'left'
                  }}>
                    {activeSlide.title}
                  </h1>

                  <p style={{ 
                    fontSize: isMobile ? '0.9rem' : '1.15rem', 
                    lineHeight: 1.6, color: '#ccc', maxWidth: '550px', 
                    textAlign: isMobile ? 'center' : 'left'
                  }}>
                    {activeSlide.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* BOTONES */}
            <div style={{ 
              marginTop: '35px', display: 'flex', alignItems: 'center', gap: '25px',
              justifyContent: isMobile ? 'center' : 'flex-start', width: '100%'
            }}>
              <button style={{ background: '#00C2FF', border: 'none', color: 'white', padding: '15px 40px', fontSize: '1rem', fontWeight: 800, borderRadius: '5px', cursor: 'pointer' }}>
                EXPLORAR
              </button>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={handlePrev} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>&#8592;</button>
                <button onClick={handleNext} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>&#8594;</button>
              </div>
            </div>
            
            {/* PUNTITOS DE NAVEGACIÓN */}
            <div style={{ marginTop: '50px', display: 'flex', gap: '10px', justifyContent: isMobile ? 'center' : 'flex-start', width: '100%' }}>
              {DATA.map((_, idx) => (
                <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeIndex === idx ? 'white' : '#555', cursor: 'pointer' }} onClick={() => setActiveIndex(idx)} />
              ))}
            </div>

          </div>
          <div style={{ flex: 1 }}></div>
        </section>

      </main>
    </div>
  );
};