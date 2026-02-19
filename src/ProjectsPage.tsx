import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Bot, CloudUpload, LayoutDashboard, Cpu, BarChart3, ArrowRight, ChevronDown, Server, Shield, Globe } from 'lucide-react';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// ==========================================
// 1. DATOS DE EMPRESAS
// ==========================================
const COMPANY_PROJECTS = [
  { 
    id: 'miranda', name: 'Torre Miranda', color: '#FFFFFF', 
    img: 'assets/Miranda.png', 
    shortDesc: 'Solución de backup automatizado en AWS reemplazando procesos manuales vulnerables.',
    highlights: ['Conexión VPN segura', 'Automatización vía scripts', 'Recuperación rápida'],
    fullDesc: 'La organización realizaba respaldos manuales de equipos locales, generando riesgo de pérdida de información crítica. Diseñamos una solución de respaldo automatizado en AWS, integrando conectividad segura mediante VPN, automatización de backups mediante scripts programados y almacenamiento estructurado. La nueva arquitectura permite recuperación rápida ante incidentes y continuidad operativa.',
    sector: 'Centro empresarial y oficinas corporativas.',
    icon: <Server size={54} color="#FFFFFF" />
  },
  { 
    id: 'myintelli', name: 'MyIntelli', color: '#33BEFF', 
    img: 'assets/MyIntelli.png', 
    shortDesc: 'Evaluación de seguridad SaaS y optimización de consumo en entornos multicloud.',
    highlights: ['Ethical hacking (Caja negra)', 'Optimización AWS/GCP', 'Protección WAF perimetral'],
    fullDesc: 'Desafío: Fortalecer la postura de seguridad de una plataforma SaaS expuesta a internet y optimizar el consumo en AWS y GCP. Ejecutamos pruebas de seguridad (ethical hacking caja negra), identificamos vulnerabilidades críticas y recomendamos optimizaciones de costos. Actualmente acompañamos la implementación progresiva de protección perimetral mediante AWS WAF.',
    sector: 'Software Cloud para control de acceso biométrico.',
    icon: <Shield size={54} color="#33BEFF" />
  },
  { 
    id: 'datecsa', name: 'DATECSA', color: '#FF3333', 
    img: 'assets/DateCSA.png', 
    shortDesc: 'Diseño e implementación de infraestructura en AWS para soportar OnBase.',
    highlights: ['Despliegue de infraestructura', 'Configuración red/SSL', 'Réplica a producción'],
    fullDesc: 'Migración y estructuración de infraestructura en AWS para soportar la solución empresarial OnBase (Organización DeLima). El proyecto abarcó el diseño y despliegue de infraestructura, configuración de SO, base de datos, red, SSL y réplica a producción. El resultado es un entorno Cloud estable, seguro y preparado para operación empresarial con altas demandas.',
    sector: 'Soluciones tecnológicas empresariales.',
    icon: <CloudUpload size={54} color="#FF3333" />
  },
  { 
    id: 'ruedaverde', name: 'Rueda Verde', color: '#00ff88', 
    img: 'assets/RuedaVerde.png', 
    shortDesc: 'Implementación de chatbot serverless en AWS para automatizar consultas.',
    highlights: ['Chatbot Serverless AWS', 'Servicios administrados', 'Consumo optimizado'],
    fullDesc: 'El desafío era reducir la carga operativa del equipo ante consultas repetitivas con presupuestos ajustados. Implementamos un chatbot sobre arquitectura serverless en AWS utilizando servicios administrados para alta disponibilidad y bajo mantenimiento. La solución redujo la carga operativa y mejoró la eficiencia organizacional sin incrementar la complejidad tecnológica.',
    sector: 'Corporación ambiental (gestión de llantas usadas).',
    icon: <Bot size={54} color="#00ff88" />
  },
  { 
    id: 'tuulapp', name: 'TuulApp', color: '#aa00ff', 
    img: 'assets/tuulapp.png', 
    shortDesc: 'Modernización de arquitectura en AWS para preparar plataforma hacia el crecimiento.',
    highlights: ['Estructuración facturación', 'Migración a Amazon Aurora', 'Estrategia escalabilidad'],
    fullDesc: 'El objetivo era optimizar la arquitectura Cloud y preparar la plataforma para crecimiento. Brindamos acompañamiento en la estructuración de facturación Cloud, evaluación de consumo en AWS, y diseñamos una estrategia para migrar su base de datos de MongoDB hacia Amazon Aurora. La intervención preparó a la plataforma para escalar de manera sostenible.',
    sector: 'Startup tecnológica para digitalización de talleres mecánicos.',
    icon: <Cpu size={54} color="#aa00ff" />
  },
  { 
    id: 'ingram', name: 'Ingram Micro', color: '#2952ff', 
    img: 'assets/Ingram.png', 
    shortDesc: 'Participación en múltiples iniciativas Cloud en ecosistema de partners regionales.',
    highlights: ['Soluciones distribución', 'Sectores corporativos', 'Cumplimiento regulatorio'],
    fullDesc: 'Participación estratégica en múltiples iniciativas Cloud dentro del ecosistema de partners regionales en LATAM. Ejecución y acompañamiento en soluciones tecnológicas avanzadas para la distribución y estructuración de ecosistemas empresariales, abarcando corporativos y sectores fuertemente regulados.',
    sector: 'Distribución tecnológica y soluciones empresariales regionales.',
    icon: <Globe size={54} color="#2952ff" />
  }
];

const POPULAR_PROJECTS = [
    { id: 'ecommerce', title: 'E-commerce de Alto Rendimiento', desc: 'Aplicaciones escalables preparadas para picos masivos.', icon: <ShoppingCart size={32} color="#00C2FF" /> },
    { id: 'chatbot', title: 'Chatbots con IA Generativa', desc: 'Asistentes avanzados integrados a CRM y WhatsApp.', icon: <Bot size={32} color="#FAA918" /> },
    { id: 'cloud', title: 'Migración y Arquitectura Cloud', desc: 'Modernización de sistemas legados y control de costos.', icon: <CloudUpload size={32} color="#00ff8c" /> },
    { id: 'saas', title: 'Plataformas SaaS B2B', desc: 'Desarrollo de software a medida con modelo recurrente.', icon: <LayoutDashboard size={32} color="#ff007a" /> },
    { id: 'rpa', title: 'Automatización de Procesos', desc: 'Eliminación de tareas manuales mediante flujos RPA.', icon: <Cpu size={32} color="#aa00ff" /> },
    { id: 'data', title: 'Business Intelligence y Data', desc: 'Dashboards interactivos para toma de decisiones.', icon: <BarChart3 size={32} color="#33BEFF" /> }
];

// ==========================================
// 3. FLIP CARD (Ajustada para ser más "chata" en isTiny)
// ==========================================
const FlipCard = ({ project, isMobile, isSmall, isTiny, onSelect }: { project: any, isMobile: boolean, isSmall: boolean, isTiny: boolean, onSelect: () => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Cuando está en una sola fila (isTiny), la hacemos mucho más chata (250px)
  const cardHeight = isTiny ? '250px' : (isSmall ? '340px' : (isMobile ? '380px' : '480px'));
  const backPadding = isTiny ? '12px 10px' : (isSmall ? '15px 10px' : (isMobile ? '20px 15px' : '35px'));

  const faceStyle: React.CSSProperties = {
    position: 'absolute', width: '100%', height: '100%',
    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
    borderRadius: isMobile ? '16px' : '24px', 
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', 
    padding: isMobile ? '15px' : '30px', 
    border: `2px solid ${project.color}30`,
    background: 'rgba(15, 20, 40, 0.8)',
    backdropFilter: 'blur(16px)',
    boxShadow: `0 15px 40px rgba(0,0,0,0.6)`,
  };

  const titleSize = isTiny ? '0.95rem' : (isSmall ? '1.1rem' : (isMobile ? '1.3rem' : '2rem'));
  const descSize = isTiny ? '0.7rem' : (isSmall ? '0.75rem' : (isMobile ? '0.85rem' : '1rem'));
  const bulletSize = isTiny ? '0.65rem' : (isSmall ? '0.7rem' : (isMobile ? '0.75rem' : '0.95rem'));
  const buttonSize = isTiny ? '0.65rem' : (isSmall ? '0.75rem' : (isMobile ? '0.8rem' : '1rem'));
  const buttonPadding = isTiny ? '6px 12px' : (isSmall ? '8px 16px' : (isMobile ? '10px 20px' : '14px 40px'));

  return (
    <div 
        style={{ width: '100%', height: cardHeight, perspective: '1200px', cursor: 'pointer' }} 
        onClick={() => setIsFlipped(!isFlipped)}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        
        <div style={{ ...faceStyle }}>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={resolvePath(project.img)} alt={project.name} style={{ maxWidth: '85%', maxHeight: isTiny ? '40%' : '55%', objectFit: 'contain' }} />
          </div>
          <p style={{ marginTop: '10px', color: project.color, fontWeight: '900', fontSize: isTiny ? '0.65rem' : (isMobile ? '0.75rem' : '0.95rem'), letterSpacing: '2px', textAlign: 'center', textTransform: 'uppercase' }}>
              Ver Resumen ↻
          </p>
        </div>

        <div style={{ ...faceStyle, transform: 'rotateY(180deg)', background: '#000c2d', border: `2px solid ${project.color}`, padding: backPadding, justifyContent: 'flex-start' }}>
          <h3 style={{ color: project.color, fontSize: titleSize, textTransform: 'uppercase', marginBottom: isTiny ? '6px' : '15px', fontWeight: 950, textAlign: 'center', lineHeight: 1.1 }}>
              {project.name}
          </h3>
          <p style={{ fontSize: descSize, lineHeight: 1.4, color: '#e2e8f0', textAlign: 'center', margin: isTiny ? '0 0 6px 0' : '0 0 20px 0', fontWeight: 600 }}>
              {project.shortDesc}
          </p>
          <ul style={{ paddingLeft: isTiny ? '15px' : '20px', margin: isTiny ? '0 0 8px 0' : '0 0 20px 0', color: '#ffffff', fontSize: bulletSize, lineHeight: 1.5, textAlign: 'left', width: '100%', fontWeight: 700 }}>
              {project.highlights.map((item: string, i: number) => (
                  <li key={i} style={{ marginBottom: '2px' }}>{item}</li>
              ))}
          </ul>
          <button 
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            style={{ marginTop: 'auto', padding: buttonPadding, background: project.color, border: 'none', borderRadius: '50px', color: '#000', fontWeight: '900', fontSize: buttonSize, cursor: 'pointer', transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1px' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = `0 0 20px ${project.color}80`; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Saber Más
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProjectsPage = ({ isMobile }: { isMobile: boolean }) => {
  const navigate = useNavigate();
  const projectsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  
  // Estados de quiebre para asegurar el responsive
  const [isSmall, setIsSmall] = useState(false);
  const [isTiny, setIsTiny] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmall(width < 475);
      setIsTiny(width < 350);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProject = (index: number) => {
    setActiveProjectIndex(index);
    setTimeout(() => {
        carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#00020a', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* HERO DE VIDEO (Se oculta en isTiny < 350px) */}
      <section style={{ position: 'relative', width: '100%', backgroundColor: '#000', overflow: 'hidden', paddingTop: isMobile ? (isTiny ? '80px' : '60px') : '85px', minHeight: isTiny ? '150px' : 'auto' }}>
        
        {!isTiny && (
          <video autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.85 }}>
            <source src={resolvePath('assets/video.mp4')} type="video/mp4" />
          </video>
        )}
        
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to bottom, transparent 0%, #00020a 100%)', zIndex: 1, pointerEvents: 'none' }} />
        
        {/* BOTÓN SOLO VISIBLE EN DESKTOP */}
        {!isMobile && (
          <div onClick={scrollToProjects} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#ffffff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '10px', fontWeight: 900 }}>Ver Proyectos</span>
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ChevronDown color="#00C2FF" size={48} />
              </motion.div>
          </div>
        )}
      </section>

      {/* SECCIÓN ALIANZAS ESTRATÉGICAS */}
      <section ref={projectsRef} style={{ padding: isMobile ? '40px 15px 40px' : '120px 60px 80px', backgroundColor: '#00020a' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '80px' }}>
                <h4 style={{ color: '#FAA918', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 900, marginBottom: '10px', fontSize: isTiny ? '0.9rem' : (isMobile ? '1rem' : '1.2rem') }}>Casos de Éxito</h4>
                <h2 style={{ fontSize: isTiny ? '2rem' : (isMobile ? '2.4rem' : '4.5rem'), fontWeight: 950, color: '#ffffff', margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>Alianzas <span style={{ color: '#00C2FF' }}>Estratégicas</span></h2>
                <p style={{ color: '#94a3b8', fontSize: isTiny ? '1rem' : (isMobile ? '1.1rem' : '1.4rem'), marginTop: '20px', maxWidth: '800px', margin: '20px auto 0', fontWeight: 600, lineHeight: 1.6 }}>Empresas de talla internacional que confían en nuestra capacidad técnica.</p>
            </motion.div>

            <div className="responsive-grid">
                {COMPANY_PROJECTS.map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                        <FlipCard project={project} isMobile={isMobile} isSmall={isSmall} isTiny={isTiny} onSelect={() => handleSelectProject(index)} />
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* SECCIÓN CARRUSEL DETALLADO */}
      <div ref={carouselRef} style={{ width: '100%', overflow: 'hidden', paddingBottom: activeProjectIndex !== null ? '100px' : '0' }}>
          <AnimatePresence mode="wait">
              {activeProjectIndex !== null && (
                  <motion.div key={COMPANY_PROJECTS[activeProjectIndex].id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 15px' }}>
                      <div style={{ backgroundColor: '#000c2d', border: `2px solid ${COMPANY_PROJECTS[activeProjectIndex].color}50`, borderRadius: isTiny ? '24px' : '32px', padding: isTiny ? '30px 20px' : (isMobile ? '40px 25px' : '60px'), boxShadow: `0 30px 70px rgba(0,0,0,0.7), inset 0 0 50px ${COMPANY_PROJECTS[activeProjectIndex].color}15`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isTiny ? '30px' : '40px', alignItems: 'center' }}>
                          <div style={{ flex: '0 0 auto', padding: isTiny ? '25px' : '35px', backgroundColor: 'rgba(0,2,10,0.6)', borderRadius: '28px', border: `2px solid ${COMPANY_PROJECTS[activeProjectIndex].color}40` }}>{COMPANY_PROJECTS[activeProjectIndex].icon}</div>
                          <div style={{ flex: 1 }}>
                              <h3 style={{ color: COMPANY_PROJECTS[activeProjectIndex].color, fontSize: isTiny ? '1.8rem' : (isMobile ? '2.2rem' : '3.5rem'), fontWeight: 950, textTransform: 'uppercase', marginBottom: '10px', lineHeight: 1 }}>{COMPANY_PROJECTS[activeProjectIndex].name}</h3>
                              <p style={{ color: '#FAA918', fontSize: isTiny ? '0.8rem' : (isMobile ? '0.9rem' : '1.1rem'), fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px' }}>Sector: {COMPANY_PROJECTS[activeProjectIndex].sector}</p>
                              <div style={{ height: '2px', width: '80px', backgroundColor: COMPANY_PROJECTS[activeProjectIndex].color, marginBottom: '25px' }} />
                              <p style={{ color: '#ffffff', fontSize: isTiny ? '0.95rem' : (isMobile ? '1.05rem' : '1.25rem'), lineHeight: 1.7, margin: 0, fontWeight: 600 }}>{COMPANY_PROJECTS[activeProjectIndex].fullDesc}</p>
                              <div style={{ display: 'flex', gap: isTiny ? '10px' : '20px', marginTop: '40px', flexWrap: 'wrap' }}>
                                  <button onClick={() => handleSelectProject((activeProjectIndex - 1 + COMPANY_PROJECTS.length) % COMPANY_PROJECTS.length)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: isTiny ? '10px 20px' : '12px 25px', borderRadius: '50px', cursor: 'pointer', fontSize: isTiny ? '0.8rem' : '0.9rem', fontWeight: 700 }}>← Anterior</button>
                                  <button onClick={() => handleSelectProject((activeProjectIndex + 1) % COMPANY_PROJECTS.length)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: isTiny ? '10px 20px' : '12px 25px', borderRadius: '50px', cursor: 'pointer', fontSize: isTiny ? '0.8rem' : '0.9rem', fontWeight: 700 }}>Siguiente →</button>
                                  <button onClick={() => setActiveProjectIndex(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '12px', cursor: 'pointer', marginLeft: 'auto', textDecoration: 'underline', fontWeight: 700, fontSize: isTiny ? '0.8rem' : '1rem' }}>Cerrar</button>
                              </div>
                          </div>
                      </div>
                  </motion.div>
              )}
          </AnimatePresence>
      </div>

      {/* SECCIÓN DEMANDAS DEL MERCADO (Ajustado contra overflow) */}
      <section style={{ padding: isMobile ? '60px 15px' : '140px 60px', backgroundColor: '#000c2d', position: 'relative' }}>
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', background: 'linear-gradient(to bottom, #00020a 0%, transparent 100%)', pointerEvents: 'none' }} />
         <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: isMobile ? '50px' : '90px' }}>
                <h4 style={{ color: '#FAA918', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 900, fontSize: isMobile ? '0.9rem' : '1.1rem' }}>Demandas del Mercado</h4>
                <h2 style={{ fontSize: isTiny ? '1.8rem' : (isMobile ? '2.2rem' : '4rem'), fontWeight: 950, letterSpacing: '-1px', lineHeight: 1 }}>Soluciones <span style={{ color: '#00C2FF' }}>Más Solicitadas</span></h2>
            </motion.div>

            <div className="responsive-grid">
                {POPULAR_PROJECTS.map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                        style={{ 
                            backgroundColor: 'rgba(255,255,255,0.03)', 
                            border: '2px solid rgba(0,194,255,0.15)', 
                            borderRadius: isMobile ? '16px' : '24px', 
                            // Relleno mucho más compacto en isSmall para que no desborde en 2 columnas (351px - 400px)
                            padding: isTiny ? '15px' : (isSmall ? '15px 10px' : (isMobile ? '25px 20px' : '45px 35px')),
                            wordBreak: 'break-word', // Evita que palabras largas rompan el diseño
                            overflowWrap: 'break-word'
                        }}
                        whileHover={{ y: -8, borderColor: '#00C2FF', backgroundColor: 'rgba(0,194,255,0.08)', boxShadow: '0 20px 40px rgba(0,194,255,0.2)' }}
                    >
                        <div style={{ 
                            marginBottom: isSmall ? '12px' : '20px', 
                            padding: isSmall ? '10px' : '18px', 
                            backgroundColor: 'rgba(0,2,10,0.6)', 
                            borderRadius: '16px', display: 'inline-block', border: '1px solid rgba(0,194,255,0.3)' 
                        }}>
                            {/* Achicamos el ícono en pantallas problemáticas */}
                            <div style={{ transform: isSmall ? 'scale(0.8)' : 'scale(1)', transformOrigin: 'left center' }}>
                                {project.icon}
                            </div>
                        </div>
                        
                        <h3 style={{ 
                            fontSize: isTiny ? '0.95rem' : (isSmall ? '1.05rem' : (isMobile ? '1.2rem' : '1.6rem')), 
                            fontWeight: 900, marginBottom: '10px', lineHeight: 1.2, color: '#ffffff' 
                        }}>
                            {project.title}
                        </h3>
                        <p style={{ 
                            fontSize: isTiny ? '0.8rem' : (isSmall ? '0.85rem' : (isMobile ? '0.9rem' : '1.05rem')), 
                            color: '#cbd5e1', margin: 0, lineHeight: 1.5, fontWeight: 600 
                        }}>
                            {project.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: isMobile ? '60px 15px' : '160px 20px', backgroundColor: '#00020a', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', background: 'linear-gradient(to bottom, #000c2d 0%, transparent 100%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: isTiny ? '1.8rem' : (isMobile ? '2rem' : '4rem'), fontWeight: 950, marginBottom: '25px', lineHeight: 1, letterSpacing: '-1px' }}>Tu empresa podría ser nuestra próxima <br /><span style={{ color: '#FAA918' }}>gran estrella.</span></h2>
              <p style={{ fontSize: isTiny ? '1rem' : (isMobile ? '1.1rem' : '1.5rem'), color: '#94a3b8', marginBottom: '40px', maxWidth: '900px', margin: '25px auto 40px', fontWeight: 600 }}>Cuéntanos tus desafíos técnicos y diseñaremos la arquitectura perfecta para superarlos.</p>
              <button onClick={() => navigate('/contacto')} style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#00C2FF', color: '#000c2d', fontSize: isTiny ? '0.9rem' : (isMobile ? '1rem' : '1.2rem'), fontWeight: 900, padding: isTiny ? '15px 30px' : (isMobile ? '18px 35px' : '22px 55px'), border: 'none', borderRadius: '60px', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', boxShadow: '0 15px 35px rgba(0,194,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#00C2FF'; e.currentTarget.style.transform = 'scale(1)'; }}>
                  Iniciar mi proyecto <ArrowRight size={isMobile ? 20 : 24} style={{ marginLeft: '12px' }} />
              </button>
          </motion.div>
      </section>

      <style>{`
        .responsive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        
        @media (max-width: 900px) { .responsive-grid { gap: 20px; } }
        @media (max-width: 768px) { .responsive-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; } }
        @media (max-width: 480px) { .responsive-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
        /* NUEVA REGLA: 1 sola columna para pantallas hiper reducidas (<350px) */
        @media (max-width: 350px) { .responsive-grid { grid-template-columns: 1fr; gap: 15px; } }
      `}</style>
    </div>
  );
};