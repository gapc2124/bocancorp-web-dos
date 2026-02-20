import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Bot, CloudUpload, LayoutDashboard, Cpu, BarChart3, ArrowRight, ChevronDown, Server, Shield, Globe, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// ==========================================
// 1. DATOS DE EMPRESAS (ESTRUCTURADOS CON TEXTO COMPLETO)
// ==========================================
const COMPANY_PROJECTS = [
  { 
    id: 'miranda', name: 'Torre Miranda', shortTitle: 'Arquitectura de Respaldo Cloud', color: '#FFFFFF', 
    img: 'assets/Miranda.png', icon: <Server size={54} color="#FFFFFF" />,
    shortDesc: [
        'Implementamos una solución de backup automatizado en AWS mediante conexión VPN segura, reemplazando procesos manuales que generaban pérdida de información.',
        'La nueva arquitectura permite recuperación rápida ante incidentes y continuidad operativa.'
    ],
    sector: 'Centro empresarial y oficinas corporativas.',
    desafio: 'La organización realizaba respaldos manuales de equipos y servidores locales, lo que generó pérdida de información crítica y ausencia de un plan formal de recuperación ante desastres.',
    arquitecturaTitle: 'Arquitectura Implementada',
    arquitectura: [
        'Conectividad segura mediante VPN hacia la nube.',
        'Automatización de backups mediante scripts programados.',
        'Almacenamiento estructurado y controlado en entorno AWS.',
        'Arquitectura preparada para recuperación rápida ante incidentes.'
    ],
    resultado: 'La organización pasó de un esquema manual y vulnerable a una arquitectura de respaldo automatizada, con capacidad de recuperación eficiente y mayor protección de información crítica.'
  },
  { 
    id: 'myintelli', name: 'MyIntelli', shortTitle: 'Seguridad y Optimización Multicloud', color: '#33BEFF', 
    img: 'assets/MyIntelli.png', icon: <Shield size={54} color="#33BEFF" />,
    shortDesc: [
        'Ejecutamos evaluación de seguridad sobre plataforma SaaS en producción, identificando vulnerabilidades críticas y proponiendo mejoras estructurales.',
        'Actualmente acompañamos en optimización de consumo AWS y GCP e implementación de protección perimetral con WAF.'
    ],
    sector: 'Software Cloud para control de acceso y asistencia biométrica.',
    desafio: 'Fortalecer la postura de seguridad de una plataforma SaaS expuesta a internet y optimizar el consumo en entornos AWS y GCP.',
    arquitecturaTitle: 'Arquitectura e Intervención',
    arquitectura: [
        'Ejecución de pruebas de seguridad (ethical hacking caja negra).',
        'Identificación de vulnerabilidades críticas en superficie pública.',
        'Recomendaciones de optimización de costos en entornos multicloud.',
        'Implementación progresiva de protección perimetral mediante AWS WAF.'
    ],
    resultado: 'Mejora sustancial en la postura de seguridad, mayor visibilidad sobre consumo Cloud y fortalecimiento de la arquitectura para operar en entornos productivos expuestos.'
  },
  { 
    id: 'datecsa', name: 'Datecsa', shortTitle: 'Arquitectura Empresarial en AWS', color: '#FF3333', 
    img: 'assets/DateCSA.png', icon: <CloudUpload size={54} color="#FF3333" />,
    shortDesc: [
        'Diseñamos e implementamos infraestructura en AWS para soportar la solución OnBase, incluyendo base de datos, red, SSL y réplica a producción.',
        'El proyecto permitió migrar la plataforma a un entorno Cloud estable, seguro y preparado para operación empresarial.'
    ],
    sector: 'Soluciones tecnológicas empresariales (Organización DeLima).',
    desafio: 'Migrar y estructurar infraestructura en AWS para soportar la solución empresarial OnBase, garantizando estabilidad, seguridad y continuidad operativa.',
    arquitecturaTitle: 'Arquitectura Implementada',
    arquitectura: [
        'Diseño y despliegue de infraestructura en AWS.',
        'Instalación y configuración de sistema operativo y base de datos.',
        'Implementación de parches y endurecimiento básico.',
        'Configuración de red y conectividad segura.',
        'Implementación de certificados SSL.',
        'Replicación hacia ambiente productivo.'
    ],
    resultado: 'Infraestructura empresarial estable en AWS, preparada para operar en producción con estándares de seguridad y disponibilidad alineados a buenas prácticas Cloud.'
  },
  { 
    id: 'ruedaverde', name: 'Rueda Verde', shortTitle: 'Arquitectura Serverless', color: '#00ff88', 
    img: 'assets/RuedaVerde.png', icon: <Bot size={54} color="#00ff88" />,
    shortDesc: [
        'Implementamos un chatbot sobre arquitectura serverless en AWS, permitiendo automatizar consultas frecuentes con un modelo de consumo optimizado.',
        'La solución redujo carga operativa y mejoró eficiencia organizacional sin incrementar complejidad tecnológica.'
    ],
    sector: 'Corporación ambiental dedicada a la gestión sostenible de llantas usadas.',
    desafio: 'Reducir la carga operativa del equipo ante consultas repetitivas, optimizando recursos en una organización con enfoque ambiental y presupuestos ajustados.',
    arquitecturaTitle: 'Arquitectura Implementada',
    arquitectura: [
        'Diseño e implementación de chatbot sobre arquitectura serverless en AWS.',
        'Uso de servicios administrados para alta disponibilidad y bajo mantenimiento.',
        'Optimización de consumo Cloud con costos operativos mínimos.',
        'Integración con canales digitales para automatización de consultas frecuentes.'
    ],
    resultado: 'Automatización eficiente de atención digital, liberando al equipo operativo para concentrarse en actividades de mayor impacto ambiental, con un modelo de consumo Cloud altamente optimizado.'
  },
  { 
    id: 'tuulapp', name: 'Tuulapp', shortTitle: 'Evolución Cloud para Startup SaaS', color: '#ccff00', 
    img: 'assets/tuulapp.png', icon: <Cpu size={54} color="#ccff00" />,
    shortDesc: [
        'Acompañamos la optimización y modernización de su arquitectura en AWS, incluyendo estrategia de migración de base de datos hacia Amazon Aurora y control de costos.',
        'La intervención permite preparar la plataforma para crecimiento escalable y sostenible.'
    ],
    sector: 'Startup tecnológica para digitalización de talleres mecánicos.',
    desafio: 'Optimizar la arquitectura Cloud y preparar la plataforma para crecimiento, controlando costos y fortaliendo su base de datos.',
    arquitecturaTitle: 'Intervención',
    arquitectura: [
        'Acompañamiento en estructuración de facturación Cloud.',
        'Evaluación y optimización de consumo en AWS.',
        'Diseño de estrategia para migración de MongoDB hacia Amazon Aurora.',
        'Asesoría en solicitud de créditos y programas de apoyo AWS.'
    ],
    resultado: 'Definición de una hoja de ruta técnica para modernizar la arquitectura, mejorar eficiencia operativa y preparar la plataforma para escalar de manera sostenible.'
  },
  { 
    id: 'ingram', name: 'Ingram Micro', shortTitle: 'Iniciativas Cloud en Ecosistema LATAM', color: '#2952ff', 
    img: 'assets/Ingram.png', icon: <Globe size={54} color="#2952ff" />,
    shortDesc: [
        'Participación en proyectos regionales de arquitectura y seguridad Cloud, incluyendo:',
        '• Gobernanza de datos para licitación internacional en AWS',
        '• Networking avanzado en AWS con integración Palo Alto Panorama',
        '• Implementación de Prisma Cloud en aplicación bancaria',
        '• Modelos FinOps para organizaciones internacionales'
    ],
    sector: 'Distribución tecnológica y soluciones empresariales regionales.',
    desafio: 'Participación en múltiples iniciativas Cloud dentro del ecosistema de partners regionales, incluyendo sectores regulados y corporativos.',
    arquitecturaTitle: 'Intervenciones Representativas',
    arquitectura: [
        'Gobernanza de Datos en AWS: Diseño de estructura para procesos de licitación internacional.',
        'Arquitectura de Red y Seguridad: Implementación de networking en AWS integrando Panorama (Palo Alto).',
        'Seguridad Cloud en Sector Bancario: Instalación e integración de Prisma Cloud.',
        'FinOps Regional: Implementación de prácticas para organización del sector construcción.',
        'FinOps con Cloudability: Modelo de gestión financiera Cloud en AWS y Azure.'
    ],
    resultado: 'Ejecución exitosa de iniciativas Cloud en entornos corporativos regionales, combinando gobernanza, seguridad avanzada, arquitectura de red y optimización financiera. *Algunas iniciativas se presentan bajo el contexto de ecosistemas de partners regionales.'
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
// 3. FLIP CARD (ACHATADA EN MÓVIL Y SOLO VERSIÓN CORTA)
// ==========================================
const FlipCard = ({ project, isMobile, isSmall, onSelect }: { project: typeof COMPANY_PROJECTS[0], isMobile: boolean, isSmall: boolean, onSelect: () => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // ALTURA ACHATADA EN MÓVIL (320px vs 480px en Desktop)
  const cardHeight = isMobile ? '320px' : '480px';
  const backPadding = isMobile ? '20px 15px' : '35px';

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

  const titleSize = isMobile ? '1.2rem' : '1.8rem';
  const descSize = isSmall ? '0.8rem' : (isMobile ? '0.85rem' : '1rem');

  return (
    <div style={{ width: '100%', height: cardHeight, perspective: '1200px', cursor: 'pointer' }} onClick={() => setIsFlipped(!isFlipped)}>
      <div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        
        {/* CARA FRONTAL */}
        <div style={{ ...faceStyle }}>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={resolvePath(project.img)} alt={project.name} style={{ maxWidth: '85%', maxHeight: '55%', objectFit: 'contain' }} />
          </div>
          <p style={{ marginTop: '10px', color: project.color, fontWeight: '900', fontSize: isMobile ? '0.8rem' : '0.95rem', letterSpacing: '2px', textAlign: 'center', textTransform: 'uppercase' }}>
              Ver Resumen ↻
          </p>
        </div>

        {/* CARA TRASERA (SOLO VERSIÓN CORTA Y SCROLLABLE SI ES NECESARIO) */}
        <div style={{ ...faceStyle, transform: 'rotateY(180deg)', background: '#000c2d', border: `2px solid ${project.color}`, padding: backPadding, justifyContent: 'flex-start', overflowY: 'auto' }}>
          
          <h3 style={{ color: project.color, fontSize: titleSize, textTransform: 'uppercase', marginBottom: '10px', fontWeight: 950, textAlign: 'center', lineHeight: 1.1, flexShrink: 0 }}>
              {project.shortTitle}
          </h3>
          
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px', marginBottom: '15px' }} className="custom-scrollbar">
            {project.shortDesc.map((desc, idx) => (
                <p key={idx} style={{ fontSize: descSize, lineHeight: 1.5, color: '#e2e8f0', textAlign: 'left', margin: '0 0 10px 0', fontWeight: 500 }}>
                    {desc}
                </p>
            ))}
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            style={{ flexShrink: 0, width: '100%', padding: isMobile ? '10px' : '14px', background: project.color, border: 'none', borderRadius: '50px', color: '#000', fontWeight: '900', fontSize: isMobile ? '0.85rem' : '1rem', cursor: 'pointer', transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1px' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = `0 0 20px ${project.color}80`; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Saber Más
          </button>

        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. COMPONENTE PRINCIPAL
// ==========================================
export const ProjectsPage = ({ isMobile }: { isMobile: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 475);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lógica de recepción desde Galaxy
  useEffect(() => {
    if (location.state && location.state.projectId) {
      const pIndex = COMPANY_PROJECTS.findIndex(p => p.id === location.state.projectId);
      if (pIndex !== -1) { handleSelectProject(pIndex); }
      window.history.replaceState({}, document.title)
    }
  }, [location]);

  const scrollToProjects = () => projectsRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleSelectProject = (index: number) => {
    setActiveProjectIndex(index);
    setTimeout(() => carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#00020a', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <Helmet>
        <title>Casos de Éxito y Proyectos Cloud | Bocancorp</title>
        <meta name="description" content="Descubre cómo hemos transformado empresas con arquitecturas Cloud en AWS, implementaciones serverless, ciberseguridad y chatbots con IA. Nuestro portafolio." />
      </Helmet>

      {/* HERO DE VIDEO */}
      <section style={{ position: 'relative', width: '100%', backgroundColor: '#000', overflow: 'hidden', paddingTop: isMobile ? '60px' : '85px' }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.85 }}>
          <source src={resolvePath('assets/video.mp4')} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to bottom, transparent 0%, #00020a 100%)', zIndex: 1, pointerEvents: 'none' }} />
        
        {!isMobile && (
          <div onClick={scrollToProjects} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#ffffff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '10px', fontWeight: 900 }}>Ver Proyectos</span>
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ChevronDown color="#00C2FF" size={48} /></motion.div>
          </div>
        )}
      </section>

      {/* SECCIÓN ALIANZAS (GRILLA) */}
      <section ref={projectsRef} style={{ padding: isMobile ? '40px 15px' : '120px 60px 80px', backgroundColor: '#00020a' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '80px' }}>
                <h2 style={{ fontSize: isMobile ? '2.4rem' : '4.5rem', fontWeight: 950, color: '#ffffff', margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>
                    <span style={{ color: '#00C2FF' }}>Arquitecturas Cloud</span> Implementadas
                </h2>
                <p style={{ color: '#94a3b8', fontSize: isMobile ? '1.1rem' : '1.4rem', marginTop: '20px', maxWidth: '800px', margin: '20px auto 0', fontWeight: 600, lineHeight: 1.6 }}>Empresas de talla internacional que confían en nuestra capacidad técnica.</p>
            </motion.div>

            <div className="responsive-grid">
                {COMPANY_PROJECTS.map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                        <FlipCard project={project} isMobile={isMobile} isSmall={isSmall} onSelect={() => handleSelectProject(index)} />
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* CARRUSEL DETALLADO (TARJETA GRANDE EXPANDIDA) */}
      <div ref={carouselRef} style={{ width: '100%', overflow: 'hidden', paddingBottom: activeProjectIndex !== null ? '100px' : '0' }}>
          <AnimatePresence mode="wait">
              {activeProjectIndex !== null && (
                  <motion.div key={COMPANY_PROJECTS[activeProjectIndex].id} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ duration: 0.4 }} 
                      style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }} // Tarjeta más ancha (1200px)
                  >
                      <div style={{ backgroundColor: '#000c2d', border: `2px solid ${COMPANY_PROJECTS[activeProjectIndex].color}50`, borderRadius: isMobile ? '24px' : '32px', padding: isMobile ? '30px 20px' : '60px', boxShadow: `0 30px 70px rgba(0,0,0,0.7), inset 0 0 50px ${COMPANY_PROJECTS[activeProjectIndex].color}15`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '30px' : '50px', alignItems: 'flex-start' }}>
                          
                          {/* ICONO Y NAVEGACIÓN IZQUIERDA */}
                          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: isMobile ? '100%' : 'auto' }}>
                              <div style={{ padding: '35px', backgroundColor: 'rgba(0,2,10,0.6)', borderRadius: '28px', border: `2px solid ${COMPANY_PROJECTS[activeProjectIndex].color}40` }}>
                                  {COMPANY_PROJECTS[activeProjectIndex].icon}
                              </div>
                              {!isMobile && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                                    <button onClick={() => handleSelectProject((activeProjectIndex - 1 + COMPANY_PROJECTS.length) % COMPANY_PROJECTS.length)} style={sideNavStyle}>← Anterior</button>
                                    <button onClick={() => handleSelectProject((activeProjectIndex + 1) % COMPANY_PROJECTS.length)} style={sideNavStyle}>Siguiente →</button>
                                </div>
                              )}
                          </div>

                          {/* CONTENIDO ESTRUCTURADO DERECHA */}
                          <div style={{ flex: 1, width: '100%' }}>
                              <h3 style={{ color: COMPANY_PROJECTS[activeProjectIndex].color, fontSize: isMobile ? '2.2rem' : '3.5rem', fontWeight: 950, textTransform: 'uppercase', marginBottom: '5px', lineHeight: 1 }}>{COMPANY_PROJECTS[activeProjectIndex].name}</h3>
                              <p style={{ color: '#FAA918', fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px' }}>
                                  <span style={{ color: 'white' }}>Sector:</span> {COMPANY_PROJECTS[activeProjectIndex].sector}
                              </p>
                              <div style={{ height: '2px', width: '100%', background: `linear-gradient(90deg, ${COMPANY_PROJECTS[activeProjectIndex].color}, transparent)`, marginBottom: '30px' }} />
                              
                              {/* SECCIÓN: DESAFÍO */}
                              <div style={{ marginBottom: '25px' }}>
                                  <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff3333' }} /> Desafío
                                  </h4>
                                  <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>{COMPANY_PROJECTS[activeProjectIndex].desafio}</p>
                              </div>

                              {/* SECCIÓN: ARQUITECTURA */}
                              <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', borderLeft: `4px solid ${COMPANY_PROJECTS[activeProjectIndex].color}` }}>
                                  <h4 style={{ color: COMPANY_PROJECTS[activeProjectIndex].color, fontSize: '1.2rem', fontWeight: 800, marginBottom: '15px' }}>
                                      {COMPANY_PROJECTS[activeProjectIndex].arquitecturaTitle}
                                  </h4>
                                  <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                      {COMPANY_PROJECTS[activeProjectIndex].arquitectura.map((item, i) => (
                                          <li key={i} style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                              <CheckCircle2 size={20} color={COMPANY_PROJECTS[activeProjectIndex].color} style={{ flexShrink: 0, marginTop: '2px' }} />
                                              <span>{item}</span>
                                          </li>
                                      ))}
                                  </ul>
                              </div>

                              {/* SECCIÓN: RESULTADO */}
                              <div>
                                  <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00ff88' }} /> Resultado
                                  </h4>
                                  <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>{COMPANY_PROJECTS[activeProjectIndex].resultado}</p>
                              </div>

                              {/* NAVEGACIÓN MÓVIL Y CERRAR */}
                              <div style={{ display: 'flex', gap: '15px', marginTop: '40px', flexWrap: 'wrap', alignItems: 'center', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
                                  {isMobile && (
                                    <>
                                      <button onClick={() => handleSelectProject((activeProjectIndex - 1 + COMPANY_PROJECTS.length) % COMPANY_PROJECTS.length)} style={sideNavStyle}>←</button>
                                      <button onClick={() => handleSelectProject((activeProjectIndex + 1) % COMPANY_PROJECTS.length)} style={sideNavStyle}>→</button>
                                    </>
                                  )}
                                  <button onClick={() => setActiveProjectIndex(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '10px', cursor: 'pointer', textDecoration: 'underline', fontWeight: 700, fontSize: '1rem' }}>Cerrar Detalles</button>
                              </div>
                          </div>
                      </div>
                  </motion.div>
              )}
          </AnimatePresence>
      </div>

      {/* DEMANDAS DEL MERCADO */}
      <section style={{ padding: isMobile ? '60px 15px' : '140px 60px', backgroundColor: '#000c2d', position: 'relative' }}>
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', background: 'linear-gradient(to bottom, #00020a 0%, transparent 100%)', pointerEvents: 'none' }} />
         <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: isMobile ? '50px' : '90px' }}>
                <h4 style={{ color: '#FAA918', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 900, fontSize: isMobile ? '0.9rem' : '1.1rem' }}>Demandas del Mercado</h4>
                <h2 style={{ fontSize: isMobile ? '2.2rem' : '4rem', fontWeight: 950, letterSpacing: '-1px', lineHeight: 1 }}>Soluciones <span style={{ color: '#00C2FF' }}>Más Solicitadas</span></h2>
            </motion.div>

            <div className="responsive-grid">
                {POPULAR_PROJECTS.map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                        style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '2px solid rgba(0,194,255,0.15)', borderRadius: isMobile ? '16px' : '24px', padding: isMobile ? '25px 20px' : '45px 35px' }}
                        whileHover={{ y: -8, borderColor: '#00C2FF', backgroundColor: 'rgba(0,194,255,0.08)', boxShadow: '0 20px 40px rgba(0,194,255,0.2)' }}
                    >
                        <div style={{ marginBottom: isSmall ? '12px' : '20px', padding: isSmall ? '10px' : '18px', backgroundColor: 'rgba(0,2,10,0.6)', borderRadius: '16px', display: 'inline-block', border: '1px solid rgba(0,194,255,0.3)' }}>
                            <div style={{ transform: isSmall ? 'scale(0.8)' : 'scale(1)', transformOrigin: 'left center' }}>{project.icon}</div>
                        </div>
                        <h3 style={{ fontSize: isSmall ? '1.05rem' : (isMobile ? '1.2rem' : '1.6rem'), fontWeight: 900, marginBottom: '10px', lineHeight: 1.2, color: '#ffffff' }}>{project.title}</h3>
                        <p style={{ fontSize: isSmall ? '0.85rem' : (isMobile ? '0.9rem' : '1.05rem'), color: '#cbd5e1', margin: 0, lineHeight: 1.5, fontWeight: 600 }}>{project.desc}</p>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: isMobile ? '60px 15px' : '160px 20px', backgroundColor: '#00020a', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', background: 'linear-gradient(to bottom, #000c2d 0%, transparent 100%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: isMobile ? '2rem' : '4rem', fontWeight: 950, marginBottom: '25px', lineHeight: 1, letterSpacing: '-1px' }}>Tu empresa podría ser nuestra próxima <br /><span style={{ color: '#FAA918' }}>gran estrella.</span></h2>
              <p style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', color: '#94a3b8', marginBottom: '40px', maxWidth: '900px', margin: '25px auto 40px', fontWeight: 600 }}>Cuéntanos tus desafíos técnicos y diseñaremos la arquitectura perfecta para superarlos.</p>
              <button onClick={() => navigate('/contacto')} style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#00C2FF', color: '#000c2d', fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 900, padding: isMobile ? '18px 35px' : '22px 55px', border: 'none', borderRadius: '60px', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', boxShadow: '0 15px 35px rgba(0,194,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#00C2FF'; e.currentTarget.style.transform = 'scale(1)'; }}>
                  Iniciar mi proyecto <ArrowRight size={isMobile ? 20 : 24} style={{ marginLeft: '12px' }} />
              </button>
          </motion.div>
      </section>

      <style>{`
        /* GRILLA RESPONSIVE EXACTA */
        .responsive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        @media (max-width: 1024px) { .responsive-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
        /* 1 SOLA COLUMNA EN MÓVILES (Menor a 768px) */
        @media (max-width: 768px) { .responsive-grid { grid-template-columns: 1fr; gap: 20px; } }

        /* SCROLLBAR PERSONALIZADO PARA TEXTOS LARGOS EN TARJETAS PEQUEÑAS */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 194, 255, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 194, 255, 0.8); }
      `}</style>
    </div>
  );
};

const sideNavStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '12px 20px', borderRadius: '50px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, width: '100%', textAlign: 'center', transition: 'all 0.2s ease'
};