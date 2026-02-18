import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom'; // Importamos useNavigate

// --- IMPORTS DE COMPONENTES EXTERNOS ---
import { CosmicSphere } from './components/CosmicSphere';
import { StackingCards } from './components/StackingCards';
import type { ServiceItem } from './components/StackingCards';
import { SpecializedSolutions } from './components/SpecializedSolutions';
import { StrategicPillars } from './components/StrategicPillars';
import { VanguardMethodology } from './components/VanguardMethodology';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// --- LOGOS CLOUD ---
const CLOUD_LOGOS = [
  'oracle_transparente.png',
  'gcp_transparente.png',
  'aws_transparente.png',
  'azure_transparente.png',
];

// --- DATOS DE SERVICIOS PARA STACKING ---
const DATA: ServiceItem[] = [
  { 
    id: 1, subtitle: "INGENIERÍA DE SOFTWARE", title: "Desarrollo de Soluciones Multiplataforma", color: "#00f2ff",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "En un mundo multidispositivo, su empresa necesita estar donde están sus usuarios. Creamos ecosistemas digitales robustos y escalables." },
      { type: 'highlight', title: "INGENIERÍA A MEDIDA", text: "Desarrollo de software para entornos Web y Móvil, construido bajo los más altos estándares de calidad y escalabilidad." }
    ]
  },
  { 
    id: 2, subtitle: "MODERNIZACIÓN DIGITAL", title: "Ecosistemas Cloud & Modernización", color: "#7000ff",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "Transformamos sistemas heredados en plataformas modernas que impulsan la innovación." },
      { type: 'highlight', title: "ESPECIALISTAS MULTI-CLOUD", text: "Dominamos las 4 nubes líderes. Migramos y evolucionamos arquitecturas legado hacia entornos ágiles." }
    ]
  },
  { 
    id: 3, subtitle: "EXPERIENCIA DE USUARIO", title: "Diseño de Experiencia (UX/UI)", color: "#ff007a",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "Transformamos la complejidad técnica en experiencias digitales fluidas y atractivas." },
      { type: 'highlight', title: "INTERFACES INTUITIVAS", text: "Creación de diseños centrados en el usuario que maximizan la adopción y el impacto del producto." }
    ]
  },
  { 
    id: 4, subtitle: "ESTRATEGIA TECNOLÓGICA", title: "Consultoría de Arquitectura TI", color: "#00ff8c",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "Le ayudamos a definir el rumbo correcto para su infraestructura alineada con sus objetivos de negocio." },
      { type: 'highlight', title: "ASESORAMIENTO ESTRATÉGICO", text: "Diseñamos la hoja de ruta que su empresa necesita para escalar y reducir riesgos." }
    ]
  },
  { 
    id: 5, subtitle: "ESTRATEGIA MULTINUBE", title: "Arquitectura Multi-Cloud & Serverless", color: "#00a2ff",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "Aproveche el verdadero poder de la computación en la nube moderna sin gestionar servidores." },
      { type: 'highlight', title: "AGILIDAD SERVERLESS", text: "Diseño de soluciones que escalan automáticamente, maximizando la velocidad y reduciendo carga operativa." }
    ]
  },
  { 
    id: 6, subtitle: "SEGURIDAD INTEGRAL", title: "Ciberseguridad & Conectividad", color: "#ff8c00",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "Protegemos sus activos más valiosos mediante protocolos de red avanzados." },
      { type: 'highlight', title: "BLINDAJE DE INFRAESTRUCTURA", text: "Soluciones líderes como Palo Alto Networks para garantizar una conectividad segura y continua." }
    ]
  },
  { 
    id: 7, subtitle: "AUTOMATIZACIÓN TOTAL", title: "Cultura DevOps & Terraform", color: "#ff4d00",
    image: "https://images.unsplash.com/photo-1667372393119-c85c02088947?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "Acelere su time-to-market eliminando el error humano en los despliegues." },
      { type: 'highlight', title: "INFRAESTRUCTURA COMO CÓDIGO", text: "Automatización total mediante Terraform y pipelines de CI/CD predecibles y seguros." }
    ]
  },
  { 
    id: 8, subtitle: "EFICIENCIA DE COSTOS", title: "FinOps & Optimización de Recursos", color: "#ffee00",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "Retome el control de su inversión cloud analizando y eliminando el desperdicio." },
      { type: 'highlight', title: "MAXIMIZACIÓN DEL ROI", text: "Gestión estratégica y financiera para asegurar el máximo rendimiento al menor costo." }
    ]
  }
];

// --- SECCIÓN HERO ---
const HeroSection = ({ isMobile }: { isMobile: boolean }) => (
  <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1, background: '#00020a' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      <Canvas style={{ touchAction: 'pan-y' }} camera={{ position: [0, 0, 8], fov: 45 }}>
        <Environment preset="night" /> 
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00C2FF" />
        <Suspense fallback={null}><CosmicSphere /></Suspense>
      </Canvas>
    </div>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, background: 'radial-gradient(circle at center, transparent 10%, #00020a 90%)', pointerEvents: 'none' }} />
    
    <div style={{ position: 'relative', zIndex: 3, pointerEvents: 'none' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'white', fontSize: isMobile ? '3rem' : '5rem', fontWeight: 800, letterSpacing: '-1px', margin: 0, lineHeight: 1, textShadow: '0 0 20px rgba(0, 194, 255, 0.5)' }}>
              Nuestros Servicios
            </h1>
        </motion.div>
    </div>

    <motion.div 
       initial={{ opacity: 0 }} 
       animate={{ opacity: 1, y: [0, -10, 0] }} 
       transition={{ opacity: { duration: 1, delay: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} 
       style={{ position: 'absolute', bottom: isMobile ? '160px' : '140px', left: 0, zIndex: 3, display: 'flex', gap: isMobile ? '20px' : '35px', justifyContent: 'center', alignItems: 'center', width: '100%', pointerEvents: 'none' }}
    >
      {CLOUD_LOGOS.map((logo, index) => (
        <div key={index} style={{ width: isMobile ? '85px' : '110px', height: isMobile ? '85px' : '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={resolvePath(`assets/${logo}`)} alt={logo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      ))}
    </motion.div>
  </section>
);

// --- COMPONENTE PRINCIPAL ---
export const ServicesPage = ({ isMobile }: { isMobile: boolean }) => {
  const { hash } = useLocation();
  const navigate = useNavigate(); // Hook de navegación

  useEffect(() => {
    if (hash) {
      const serviceId = parseInt(hash.replace('#service-', ''));
      if (!isNaN(serviceId)) {
        const stackingContainer = document.getElementById('stacking-section-id');
        if (stackingContainer) {
            const totalCards = DATA.length;
            const vh = window.innerHeight;
            const progressTarget = (serviceId - 1) / totalCards;
            const scrollRange = (totalCards - 1) * vh;
            const offsetTop = stackingContainer.offsetTop;
            const targetPosition = offsetTop + (progressTarget * scrollRange);
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    }
  }, [hash]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#00020a', position: 'relative' }}>
      
      {/* 1. HERO */}
      <HeroSection isMobile={isMobile} />

      {/* 2. PILARES ESTRATÉGICOS (Fondo Blanco) */}
      <StrategicPillars isMobile={isMobile} />

      {/* 3. TARJETAS APILABLES */}
      <section id="stacking-section-id" style={{ position: 'relative', zIndex: 1, paddingTop: '60px', backgroundColor: '#00020a' }}>
          <StackingCards data={DATA} isMobile={isMobile} />
      </section>

      {/* 4. VANGUARDIA Y METODOLOGÍA (Fondo Blanco) */}
      <VanguardMethodology isMobile={isMobile} />

      {/* ZONA UNIFICADA: DOMINIO TÉCNICO + CTA (FONDO AZUL #000c2d) */}
      <div style={{ backgroundColor: '#000c2d', position: 'relative', zIndex: 1 }}>
          
          {/* 5. SOLUCIONES ESPECIALIZADAS (Dominio Técnico) */}
          <section style={{ paddingTop: '80px', paddingBottom: '20px' }}>
              <SpecializedSolutions isMobile={isMobile} />
          </section>

          {/* 6. BOTÓN FINAL CTA */}
          <section style={{ padding: isMobile ? '40px 20px 100px' : '40px 0 120px', textAlign: 'center' }}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <motion.button
                    onClick={() => navigate('/contacto')} // Redirección al formulario
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 204, 0, 0.6)', backgroundColor: '#ffe033' }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: ['0 0 20px rgba(255, 204, 0, 0.2)', '0 0 35px rgba(255, 204, 0, 0.5)', '0 0 20px rgba(255, 204, 0, 0.2)'] }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                    style={{
                        backgroundColor: '#FFCC00',
                        color: '#000',
                        padding: isMobile ? '20px 40px' : '30px 60px',
                        fontSize: isMobile ? '1.2rem' : '1.8rem',
                        fontWeight: '900',
                        border: 'none',
                        borderRadius: '100px',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        display: 'inline-block',
                        maxWidth: '90%'
                    }}
                >
                    impulsa tu negocio a las estrellas
                </motion.button>
              </motion.div>
          </section>
      </div>

    </div>
  );
};