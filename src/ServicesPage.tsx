import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

import { Auroras } from './components/Auroras'; 
import { Carousel3D } from './components/Carousel3D';
// Importamos el nuevo componente
import { StackingCards } from './components/StackingCards';

const DATA = [
  { id: 1, subtitle: "SOLUCIONES MULTIPLATAFORMA", title: "Desarrollo de Software", desc: "Creamos ecosistemas digitales robustos y escalables adaptados a cualquier dispositivo.", color: "#00f2ff" },
  { id: 2, subtitle: "ECOSISTEMAS CLOUD", title: "Modernización", desc: "Transformamos infraestructuras heredadas en sistemas modernos basados en la nube.", color: "#7000ff" },
  { id: 3, subtitle: "DISEÑO DE EXPERIENCIA", title: "UX / UI", desc: "Interfaces intuitivas y experiencias de usuario centradas en la conversión y fidelización.", color: "#ff007a" },
  { id: 4, subtitle: "CONSULTORÍA ÉLITE", title: "Arquitectura TI", desc: "Asesoramiento estratégico para diseñar estructuras tecnológicas eficientes y seguras.", color: "#00ff8c" },
  { id: 5, subtitle: "CIBERSEGURIDAD", title: "Networking", desc: "Protección avanzada y conectividad de alto rendimiento para tus activos digitales.", color: "#ff8c00" },
  { id: 6, subtitle: "ARQUITECTURA MODERNA", title: "Multi-Cloud & Serverless", desc: "Despliegue ágil sin gestión de servidores, optimizando la escalabilidad total.", color: "#00a2ff" },
  { id: 7, subtitle: "FINOPS", title: "Optimización de Recursos", desc: "Gestión financiera de la nube para maximizar el retorno de inversión y reducir desperdicios.", color: "#ffee00" },
  { id: 8, subtitle: "CULTURA DEVOPS", title: "Terraform & IaC", desc: "Automatización de infraestructura mediante código para despliegues rápidos y sin errores.", color: "#ff4d00" }
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
    // IMPORTANTE: maxWidth: 100vw evita el scroll lateral
    <div style={{ width: '100%', maxWidth: '100vw', minHeight: '100vh', background: '#000c2d', position: 'relative' }}>
      
      {/* --- FONDOS FIJOS --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <Canvas camera={{ position: isMobile ? [0, 0, 20] : [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#8A2BE2" />
          <Auroras />
        </Canvas>
      </div>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1, backdropFilter: 'blur(12px)', background: 'rgba(0, 12, 45, 0.5)', pointerEvents: 'none' }} />

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        
        {/* SECCIÓN 1: HERO 3D (Se mantiene igual) */}
        <section style={{ position: 'relative', height: '100vh', width: '100%', display: 'flex', flexDirection: isMobile ? 'column' : 'row', paddingTop: isMobile ? '80px' : '0px' }}>
          
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            <Canvas camera={{ position: isMobile ? [0, 0, 20] : [0, 0, 15], fov: 45 }}>
              <Environment preset="city" /> 
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={3.5} color={activeSlide.color} />
              <pointLight position={[-10, -5, 10]} intensity={2} color="#ffffff" />
              <Suspense fallback={null}>
                <group position={isMobile ? [0, -4.2, 0] : [7.5, 0, 0]} scale={isMobile ? 1.4 : 1.2}>
                  <Carousel3D data={DATA} activeIndex={activeIndex} isMobile={isMobile} />
                </group>
              </Suspense>
            </Canvas>
          </div>

          <div style={{ flex: isMobile ? '0 0 auto' : 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '20px 25px' : '0 0 0 100px', zIndex: 2, pointerEvents: 'auto', height: '100%', alignItems: isMobile ? 'center' : 'flex-start' }}>
            <div style={{ width: '100%', minHeight: isMobile ? 'auto' : '380px' }}>
              <AnimatePresence mode='wait'>
                <motion.div key={activeSlide.id} variants={textVariants} initial="hidden" animate="visible" exit="exit" style={{ width: '100%' }}>
                  <span style={{ color: '#FAA918', fontFamily: 'monospace', fontWeight: 700, fontSize: isMobile ? '0.75rem' : '0.95rem', letterSpacing: '2px', display: 'block', marginBottom: '15px', textAlign: isMobile ? 'center' : 'left' }}>// {activeSlide.subtitle}</span>
                  <h1 style={{ fontSize: isMobile ? '2rem' : '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', color: 'white', textAlign: isMobile ? 'center' : 'left' }}>{activeSlide.title}</h1>
                  <p style={{ fontSize: isMobile ? '0.9rem' : '1.15rem', lineHeight: 1.6, color: '#ccc', maxWidth: '550px', textAlign: isMobile ? 'center' : 'left' }}>{activeSlide.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div style={{ marginTop: '35px', display: 'flex', alignItems: 'center', gap: '25px', justifyContent: isMobile ? 'center' : 'flex-start', width: '100%' }}>
              <button style={{ background: '#00C2FF', border: 'none', color: 'white', padding: '15px 40px', fontSize: '1rem', fontWeight: 800, borderRadius: '5px', cursor: 'pointer' }}>EXPLORAR</button>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={handlePrev} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>&#8592;</button>
                <button onClick={handleNext} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>&#8594;</button>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}></div>
        </section>

        {/* --- SECCIÓN 2: STACKING CARDS TIPO GSAP --- */}
        <section style={{ 
          position: 'relative',
          background: 'linear-gradient(to bottom, transparent, #000c2d)',
        }}>
          
          <div style={{ textAlign: 'center', padding: '100px 20px 50px 20px' }}>
            <h2 style={{ fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: 800, color: 'white', marginBottom: '10px' }}>
              CATÁLOGO <span style={{ color: '#00C2FF' }}>BOCANCORP</span>
            </h2>
            <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Explora nuestras soluciones (Scroll para ver)</p>
          </div>

          {/* Aquí vive el efecto de GSAP replicado */}
          <StackingCards data={DATA} isMobile={isMobile} />

          {/* Espacio final */}
          <div style={{ height: '20vh' }}></div>

        </section>

      </main>
    </div>
  );
};