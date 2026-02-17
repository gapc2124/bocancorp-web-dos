import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// --- IMPORTS DE COMPONENTES ---
import { CosmicSphere } from './components/CosmicSphere';
import { Auroras } from './components/Auroras';
import { StackingCards } from './components/StackingCards';
import type { ServiceItem } from './components/StackingCards';
import { SpecializedSolutions } from './components/SpecializedSolutions';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// --- LOGOS CLOUD (TRANSPARENTES) ---
const CLOUD_LOGOS = [
  'oracle_transparente.png',
  'gcp_transparente.png',
  'aws_transparente.png',
  'azure_transparente.png',
];

// --- DATOS DE SERVICIOS ---
const DATA: ServiceItem[] = [
  { 
    id: 1, 
    subtitle: "INGENIERÍA DE SOFTWARE", 
    title: "Desarrollo de Soluciones Multiplataforma", 
    color: "#00f2ff",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "En un mundo multidispositivo, su empresa necesita estar donde están sus usuarios. Creamos ecosistemas digitales robustos y escalables." },
      { type: 'highlight', title: "INGENIERÍA A MEDIDA", text: "Desarrollo de software para entornos Web y Móvil, construido bajo los más altos estándares de calidad y escalabilidad, asegurando un rendimiento óptimo." },
      { type: 'paragraph', text: "Nos enfocamos en arquitecturas que se adaptan al crecimiento de su negocio, garantizando una larga vida útil del producto." }
    ]
  },
  { 
    id: 2, 
    subtitle: "MODERNIZACIÓN DIGITAL", 
    title: "Ecosistemas Cloud & Modernización", 
    color: "#7000ff",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "Deje atrás la infraestructura obsoleta. Transformamos sistemas heredados en plataformas modernas que impulsan la innovación." },
      { type: 'highlight', title: "ESPECIALISTAS MULTI-CLOUD", text: "Dominamos las 4 nubes líderes. Migramos y evolucionamos arquitecturas legado hacia entornos ágiles, aprovechando la elasticidad y potencia de la nube." },
      { type: 'paragraph', text: "Reduzca costos operativos y gane velocidad en la entrega de nuevas funcionalidades." }
    ]
  },
  { 
    id: 3, 
    subtitle: "EXPERIENCIA DE USUARIO", 
    title: "Diseño de Experiencia (UX/UI)", 
    color: "#ff007a",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "La tecnología potente necesita ser usable. Transformamos la complejidad técnica en experiencias digitales fluidas y atractivas." },
      { type: 'highlight', title: "INTERFACES INTUITIVAS", text: "Creación de diseños centrados en el usuario que no solo enamoran visualmente, sino que maximizan la adopción, la retención y el impacto del producto." },
      { type: 'paragraph', text: "Un buen diseño no es un lujo, es una ventaja competitiva crucial." }
    ]
  },
  { 
    id: 4, 
    subtitle: "ESTRATEGIA TECNOLÓGICA", 
    title: "Consultoría de Arquitectura TI", 
    color: "#00ff8c",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "No tome decisiones tecnológicas a ciegas. Le ayudamos a definir el rumbo correcto para su infraestructura." },
      { type: 'highlight', title: "ASESORAMIENTO ESTRATÉGICO", text: "Alineamos la tecnología con los objetivos críticos de su negocio. Diseñamos la hoja de ruta que su empresa necesita para escalar y reducir riesgos." },
      { type: 'paragraph', text: "Identificamos cuellos de botella y oportunidades de mejora antes de que se conviertan en problemas." }
    ]
  },
  { 
    id: 5, 
    subtitle: "ESTRATEGIA MULTINUBE", 
    title: "Arquitectura Multi-Cloud & Serverless", 
    color: "#00a2ff",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "Olvídese de gestionar servidores. Aproveche el verdadero poder de la computación en la nube moderna." },
      { type: 'highlight', title: "AGILIDAD SERVERLESS", text: "Diseño de soluciones sobre las nubes líderes, utilizando tecnologías que escalan automáticamente a cero, maximizando la velocidad de despliegue y reduciendo la carga operativa." },
      { type: 'paragraph', text: "Pague solo por lo que usa y enfoque a su equipo en el código, no en la infraestructura." }
    ]
  },
  { 
    id: 6, 
    subtitle: "SEGURIDAD INTEGRAL", 
    title: "Ciberseguridad & Conectividad", 
    color: "#ff8c00",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "En un entorno digital hostil, la seguridad no es negociable. Protegemos sus activos más valiosos." },
      { type: 'highlight', title: "BLINDAJE DE INFRAESTRUCTURA", text: "Implementación de protocolos de red avanzados y soluciones líderes como Palo Alto Networks y Firewalls de última generación para garantizar una conectividad segura." },
      { type: 'paragraph', text: "Mantenga la continuidad de su negocio frente a amenazas crecientes." }
    ]
  },
  { 
    id: 7, 
    subtitle: "AUTOMATIZACIÓN TOTAL", 
    title: "Cultura DevOps & Terraform", 
    color: "#ff4d00",
    image: "https://images.unsplash.com/photo-1667372393119-c85c02088947?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "Acelere su time-to-market eliminando el error humano en los despliegues." },
      { type: 'highlight', title: "INFRAESTRUCTURA COMO CÓDIGO (IaC)", text: "Automatización total del ciclo de vida del software mediante Terraform. Implementamos pipelines de CI/CD que garantizan despliegues rápidos, predecibles y seguros." },
      { type: 'paragraph', text: "Convierta su infraestructura en software versionable y reproducible." }
    ]
  },
  { 
    id: 8, 
    subtitle: "EFICIENCIA DE COSTOS", 
    title: "FinOps & Optimización de Recursos", 
    color: "#ffee00",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: 'paragraph', text: "La nube no debe ser un agujero negro financiero. Retome el control de su inversión." },
      { type: 'highlight', title: "MAXIMIZACIÓN DEL ROI", text: "Gestión estratégica y financiera de la nube para asegurar el máximo rendimiento al menor costo posible. Analizamos y eliminamos el desperdicio en sus recursos cloud." },
      { type: 'paragraph', text: "Haga que cada dólar invertido en la nube genere valor real para su negocio." }
    ]
  }
];

export const ServicesPage = ({ isMobile }: { isMobile: boolean }) => {
  const { hash } = useLocation();

  // --- LÓGICA DE SCROLL CORREGIDA PARA STACKING ---
  useEffect(() => {
    if (hash) {
      const serviceId = parseInt(hash.replace('#service-', ''));
      if (!isNaN(serviceId)) {
        const totalCards = DATA.length;
        const vh = window.innerHeight;
        
        // El Hero ocupa 100vh.
        // El contenedor de StackingCards ocupa (totalCards * 100vh).
        // Sin embargo, el scroll progresivo (0 a 1) ocurre sobre (totalCards - 1) * 100vh
        // debido al comportamiento de 'sticky' y el offset 'start start' a 'end end'.
        
        const progressTarget = (serviceId - 1) / totalCards;
        const scrollRange = (totalCards - 1) * vh;
        const targetPosition = vh + (progressTarget * scrollRange);

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [hash]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#00020a', position: 'relative' }}>
      
      {/* FONDO GLOBAL AURORAS + FOG */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
             <color attach="background" args={['#00020a']} />
             <fog attach="fog" args={['#00020a', 2, 12]} />
             <Auroras /> 
        </Canvas>
      </div>

      {/* SECCIÓN 1: HERO */}
      <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1, background: '#00020a' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          {/* AQUÍ ESTÁ LA CORRECCIÓN: style={{ touchAction: 'pan-y' }} */}
          <Canvas style={{ touchAction: 'pan-y' }} camera={{ position: [0, 0, 8], fov: 45 }}>
            <Environment preset="night" /> 
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#00C2FF" />
            <Suspense fallback={null}><CosmicSphere /></Suspense>
          </Canvas>
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, background: 'radial-gradient(circle at center, transparent 10%, #00020a 90%)', pointerEvents: 'none' }} />
        
        {/* Título Principal */}
        <div style={{ position: 'relative', zIndex: 3, pointerEvents: 'none', marginBottom: '40px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'white', fontSize: isMobile ? '3rem' : '5rem', fontWeight: 800, letterSpacing: '-1px', margin: 0, lineHeight: 1, textShadow: '0 0 20px rgba(0, 194, 255, 0.5)' }}>
                  Nuestros Servicios
                </h1>
            </motion.div>
        </div>

        {/* Logos Cloud Flotantes (Transparentes y Grandes) */}
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1, y: [0, -10, 0] }} 
           transition={{ opacity: { duration: 1, delay: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} 
           style={{ position: 'absolute', bottom: isMobile ? '180px' : '160px', left: 0, zIndex: 3, display: 'flex', gap: isMobile ? '20px' : '35px', justifyContent: 'center', alignItems: 'center', width: '100%', pointerEvents: 'none' }}
        >
          {CLOUD_LOGOS.map((logo, index) => (
            <div key={index} style={{ width: isMobile ? '85px' : '110px', height: isMobile ? '85px' : '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={resolvePath(`assets/${logo}`)} alt={logo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
            <div style={{ width: '26px', height: '42px', border: '2px solid rgba(255, 255, 255, 0.3)', borderRadius: '20px', position: 'relative' }}>
                <motion.div animate={{ y: [6, 15, 6] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} style={{ width: '4px', height: '4px', background: '#00C2FF', borderRadius: '50%', position: 'absolute', left: '50%', marginLeft: '-2px', top: '6px' }} />
            </div>
            <span style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, opacity: 0.7 }}>Descubre más</span>
        </motion.div>
      </section>

      {/* SECCIÓN 2: TARJETAS (Stacking Effect) */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: '60px', background: 'linear-gradient(to bottom, #00020a 0%, transparent 20%)' }}>
          <StackingCards data={DATA} isMobile={isMobile} />
      </section>

      {/* SECCIÓN 3: SOLUCIONES ESPECIALIZADAS (Bento Grid) */}
      <section style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent', paddingTop: '50px', paddingBottom: '50px' }}>
          <SpecializedSolutions isMobile={isMobile} />
      </section>

      {/* SECCIÓN 4: BOTÓN FINAL CTA */}
      <section style={{ position: 'relative', zIndex: 1, padding: isMobile ? '80px 20px' : '120px 0', textAlign: 'center', backgroundColor: 'transparent' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <motion.button
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
  );
};