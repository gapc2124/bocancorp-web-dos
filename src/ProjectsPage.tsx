import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Bot, CloudUpload, LayoutDashboard, Cpu, BarChart3, ArrowRight, ChevronDown, Server, Shield, Globe, CheckCircle2, Target, Award } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// ==========================================
// 1. DICCIONARIO DE TRADUCCIONES (ES / EN)
// ==========================================
const TRANSLATIONS: any = {
    ES: {
      seoTitle: "Casos de Éxito y Proyectos Cloud | Bocancorp",
      seoDesc: "Descubre cómo hemos transformado empresas con arquitecturas Cloud en AWS, implementaciones serverless, ciberseguridad y chatbots con IA. Nuestro portafolio.",
      heroTitle: "Ver Proyectos",
      titleMain1: "Arquitecturas Cloud",
      titleMain2: "Implementadas",
      subtitle: "Empresas de talla internacional que confían en nuestra capacidad técnica.",
      marketTitle1: "Demandas del Mercado",
      marketTitle2: "Soluciones",
      marketTitle3: "Más Solicitadas",
      ctaTitle1: "Tu empresa podría ser nuestra próxima",
      ctaTitle2: "gran estrella.",
      ctaDesc: "Cuéntanos tus desafíos técnicos y diseñaremos la arquitectura perfecta para superarlos.",
      ctaButton: "Iniciar mi proyecto",
      cardFlipHint: "Ver Resumen ↻",
      cardFlipBtn: "Saber Más",
      detailDesafio: "El Desafío",
      detailSolucion: "Solución Técnica",
      detailImpacto: "Impacto",
      detailPrev: "← Proyecto Anterior",
      detailNext: "Siguiente Proyecto →",
      detailClose: "Cerrar Detalles",
      sectorLabel: "Sector",
      projects: [
        { 
          id: 'miranda', name: 'Torre Miranda', shortTitle: 'Arquitectura de Respaldo Cloud', color: '#FFFFFF', 
          img: 'assets/Miranda.png', icon: <Server size={48} color="#FFFFFF" />,
          shortDesc: ['Solución de backup automatizado en AWS con VPN segura.', 'Garantiza recuperación rápida ante incidentes y continuidad operativa.'],
          sector: 'Centro empresarial corporativo.',
          desafio: 'Respaldos manuales locales con alto riesgo de pérdida de datos críticos y sin plan de contingencia.',
          arquitectura: ['Conexión VPN segura a AWS.', 'Backups automatizados (Scripts).', 'Almacenamiento estructurado.'],
          resultado: 'Infraestructura resiliente con recuperación eficiente y máxima protección de la información.'
        },
        { 
          id: 'myintelli', name: 'MyIntelli', shortTitle: 'Seguridad y Optimización', color: '#33BEFF', 
          img: 'assets/MyIntelli.png', icon: <Shield size={48} color="#33BEFF" />,
          shortDesc: ['Evaluación de seguridad SaaS y optimización FinOps multicloud.', 'Implementación de WAF perimetral.'],
          sector: 'Software Cloud biométrico.',
          desafio: 'Robustecer la seguridad de una plataforma pública y reducir el alto consumo en AWS y GCP.',
          arquitectura: ['Ethical Hacking (caja negra).', 'Optimización de costos.', 'Protección perimetral (AWS WAF).'],
          resultado: 'Postura de seguridad sólida, visibilidad financiera clara y protección activa en producción.'
        },
        { 
          id: 'datecsa', name: 'Datecsa', shortTitle: 'Arquitectura Empresarial AWS', color: '#FF3333', 
          img: 'assets/DateCSA.png', icon: <CloudUpload size={48} color="#FF3333" />,
          shortDesc: ['Infraestructura en AWS para soportar OnBase.', 'Entorno Cloud estable y seguro para operación empresarial.'],
          sector: 'Soluciones tecnológicas empresariales.',
          desafio: 'Migrar plataforma OnBase a AWS asegurando alta disponibilidad y cumplimiento de estándares corporativos.',
          arquitectura: ['Despliegue de red y BD.', 'Endurecimiento de SO.', 'Certificados SSL y réplica a prod.'],
          resultado: 'Plataforma empresarial ágil, escalable y operando bajo las mejores prácticas Cloud.'
        },
        { 
          id: 'ruedaverde', name: 'Rueda Verde', shortTitle: 'Automatización Serverless', color: '#00ff88', 
          img: 'assets/RuedaVerde.png', icon: <Bot size={48} color="#00ff88" />,
          shortDesc: ['Chatbot serverless en AWS para atención automatizada.', 'Menor carga operativa con costos mínimos.'],
          sector: 'Corporación de gestión ambiental.',
          desafio: 'Automatizar consultas frecuentes con bajo presupuesto para liberar al equipo operativo.',
          arquitectura: ['Arquitectura Serverless AWS.', 'Servicios administrados.', 'Modelo de pago por uso.'],
          resultado: 'Atención digital 24/7, equipo enfocado en el impacto ambiental y optimización de costos.'
        },
        { 
          id: 'tuulapp', name: 'Tuulapp', shortTitle: 'Evolución Cloud SaaS', color: '#ccff00', 
          img: 'assets/tuulapp.png', icon: <Cpu size={48} color="#ccff00" />,
          shortDesc: ['Modernización Cloud en AWS.', 'Estrategia de migración a Amazon Aurora y control FinOps.'],
          sector: 'Startup SaaS de talleres mecánicos.',
          desafio: 'Preparar la plataforma para escalabilidad masiva, controlando los costos de infraestructura.',
          arquitectura: ['Reestructuración FinOps.', 'Migración a Amazon Aurora.', 'Optimización de consumo.'],
          resultado: 'Hoja de ruta clara para crecimiento masivo, eficiencia operativa y arquitectura sostenible.'
        },
        { 
          id: 'ingram', name: 'Ingram Micro', shortTitle: 'Iniciativas Cloud LATAM', color: '#2952ff', 
          img: 'assets/Ingram.png', icon: <Globe size={48} color="#2952ff" />,
          shortDesc: ['Proyectos en ecosistema LATAM.', 'Gobernanza de datos, redes avanzadas y seguridad Cloud.'],
          sector: 'Distribución tecnológica regional.',
          desafio: 'Ejecutar iniciativas críticas (regulaciones, banca, construcción) en entornos altamente corporativos.',
          arquitectura: ['Gobernanza en AWS.', 'Networking (Palo Alto).', 'Prisma Cloud (Banca) y FinOps.'],
          resultado: 'Despliegues exitosos de alta criticidad combinando seguridad avanzada y optimización financiera.'
        }
      ],
      popular: [
          { id: 'ecommerce', title: 'E-commerce de Alto Rendimiento', desc: 'Aplicaciones escalables preparadas para picos masivos.', icon: <ShoppingCart size={32} color="#00C2FF" /> },
          { id: 'chatbot', title: 'Chatbots con IA Generativa', desc: 'Asistentes avanzados integrados a CRM y WhatsApp.', icon: <Bot size={32} color="#FAA918" /> },
          { id: 'cloud', title: 'Migración y Arquitectura Cloud', desc: 'Modernización de sistemas legados y control de costos.', icon: <CloudUpload size={32} color="#00ff8c" /> },
          { id: 'saas', title: 'Plataformas SaaS B2B', desc: 'Desarrollo de software a medida con modelo recurrente.', icon: <LayoutDashboard size={32} color="#ff007a" /> },
          { id: 'rpa', title: 'Automatización de Procesos', desc: 'Eliminación de tareas manuales mediante flujos RPA.', icon: <Cpu size={32} color="#aa00ff" /> },
          { id: 'data', title: 'Business Intelligence y Data', desc: 'Dashboards interactivos para toma de decisiones.', icon: <BarChart3 size={32} color="#33BEFF" /> }
      ]
    },
    EN: {
      seoTitle: "Success Stories & Cloud Projects | Bocancorp",
      seoDesc: "Discover how we have transformed companies with Cloud architectures on AWS, serverless implementations, cybersecurity, and AI chatbots. Our portfolio.",
      heroTitle: "View Projects",
      titleMain1: "Implemented",
      titleMain2: "Cloud Architectures",
      subtitle: "International companies that trust our technical capacity.",
      marketTitle1: "Market Demands",
      marketTitle2: "Most Requested",
      marketTitle3: "Solutions",
      ctaTitle1: "Your company could be our next",
      ctaTitle2: "big star.",
      ctaDesc: "Tell us your technical challenges and we will design the perfect architecture to overcome them.",
      ctaButton: "Start my project",
      cardFlipHint: "View Summary ↻",
      cardFlipBtn: "Know More",
      detailDesafio: "The Challenge",
      detailSolucion: "Technical Solution",
      detailImpacto: "Impact",
      detailPrev: "← Previous Project",
      detailNext: "Next Project →",
      detailClose: "Close Details",
      sectorLabel: "Sector",
      projects: [
        { 
          id: 'miranda', name: 'Torre Miranda', shortTitle: 'Cloud Backup Architecture', color: '#FFFFFF', 
          img: 'assets/Miranda.png', icon: <Server size={48} color="#FFFFFF" />,
          shortDesc: ['Automated backup solution on AWS with secure VPN.', 'Guarantees rapid recovery from incidents and operational continuity.'],
          sector: 'Corporate business center.',
          desafio: 'Local manual backups with high risk of critical data loss and no contingency plan.',
          arquitectura: ['Secure VPN connection to AWS.', 'Automated backups (Scripts).', 'Structured storage.'],
          resultado: 'Resilient infrastructure with efficient recovery and maximum information protection.'
        },
        { 
          id: 'myintelli', name: 'MyIntelli', shortTitle: 'Security & Optimization', color: '#33BEFF', 
          img: 'assets/MyIntelli.png', icon: <Shield size={48} color="#33BEFF" />,
          shortDesc: ['SaaS security assessment and multicloud FinOps optimization.', 'Perimeter WAF implementation.'],
          sector: 'Biometric Cloud Software.',
          desafio: 'Strengthen the security of a public platform and reduce high consumption in AWS and GCP.',
          arquitectura: ['Ethical Hacking (black box).', 'Cost optimization.', 'Perimeter protection (AWS WAF).'],
          resultado: 'Solid security posture, clear financial visibility, and active protection in production.'
        },
        { 
          id: 'datecsa', name: 'Datecsa', shortTitle: 'Enterprise AWS Architecture', color: '#FF3333', 
          img: 'assets/DateCSA.png', icon: <CloudUpload size={48} color="#FF3333" />,
          shortDesc: ['AWS infrastructure to support OnBase.', 'Stable and secure Cloud environment for enterprise operations.'],
          sector: 'Enterprise technology solutions.',
          desafio: 'Migrate OnBase platform to AWS ensuring high availability and compliance with corporate standards.',
          arquitectura: ['Network and DB deployment.', 'OS hardening.', 'SSL certificates and prod replication.'],
          resultado: 'Agile, scalable enterprise platform operating under Cloud best practices.'
        },
        { 
          id: 'ruedaverde', name: 'Rueda Verde', shortTitle: 'Serverless Automation', color: '#00ff88', 
          img: 'assets/RuedaVerde.png', icon: <Bot size={48} color="#00ff88" />,
          shortDesc: ['Serverless chatbot on AWS for automated customer service.', 'Lower operational load with minimal costs.'],
          sector: 'Environmental management corporation.',
          desafio: 'Automate frequent queries with a low budget to free up the operational team.',
          arquitectura: ['AWS Serverless Architecture.', 'Managed services.', 'Pay-as-you-go model.'],
          resultado: '24/7 digital service, team focused on environmental impact, and cost optimization.'
        },
        { 
          id: 'tuulapp', name: 'Tuulapp', shortTitle: 'SaaS Cloud Evolution', color: '#ccff00', 
          img: 'assets/tuulapp.png', icon: <Cpu size={48} color="#ccff00" />,
          shortDesc: ['Cloud modernization on AWS.', 'Migration strategy to Amazon Aurora and FinOps control.'],
          sector: 'Mechanic shop SaaS startup.',
          desafio: 'Prepare the platform for massive scalability while controlling infrastructure costs.',
          arquitectura: ['FinOps restructuring.', 'Migration to Amazon Aurora.', 'Consumption optimization.'],
          resultado: 'Clear roadmap for massive growth, operational efficiency, and sustainable architecture.'
        },
        { 
          id: 'ingram', name: 'Ingram Micro', shortTitle: 'LATAM Cloud Initiatives', color: '#2952ff', 
          img: 'assets/Ingram.png', icon: <Globe size={48} color="#2952ff" />,
          shortDesc: ['Projects in the LATAM ecosystem.', 'Data governance, advanced networking, and Cloud security.'],
          sector: 'Regional technology distribution.',
          desafio: 'Execute critical initiatives (regulations, banking, construction) in highly corporate environments.',
          arquitectura: ['Governance in AWS.', 'Networking (Palo Alto).', 'Prisma Cloud (Banking) & FinOps.'],
          resultado: 'Successful deployments of high criticality combining advanced security and financial optimization.'
        }
      ],
      popular: [
          { id: 'ecommerce', title: 'High-Performance E-commerce', desc: 'Scalable applications prepared for massive spikes.', icon: <ShoppingCart size={32} color="#00C2FF" /> },
          { id: 'chatbot', title: 'Generative AI Chatbots', desc: 'Advanced assistants integrated into CRM and WhatsApp.', icon: <Bot size={32} color="#FAA918" /> },
          { id: 'cloud', title: 'Cloud Migration & Architecture', desc: 'Modernization of legacy systems and cost control.', icon: <CloudUpload size={32} color="#00ff8c" /> },
          { id: 'saas', title: 'B2B SaaS Platforms', desc: 'Custom software development with recurring models.', icon: <LayoutDashboard size={32} color="#ff007a" /> },
          { id: 'rpa', title: 'Process Automation', desc: 'Elimination of manual tasks via RPA flows.', icon: <Cpu size={32} color="#aa00ff" /> },
          { id: 'data', title: 'Business Intelligence & Data', desc: 'Interactive dashboards for decision making.', icon: <BarChart3 size={32} color="#33BEFF" /> }
      ]
    }
};

// ==========================================
// 2. FLIP CARD ACHATADA (VERSIÓN CORTA)
// ==========================================
const FlipCard = ({ project, t, isMobile, isSmall, onSelect }: { project: any, t: any, isMobile: boolean, isSmall: boolean, onSelect: () => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardHeight = isMobile ? '320px' : '400px'; 
  const backPadding = isMobile ? '20px 15px' : '30px';

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

  const titleSize = isMobile ? '1.1rem' : '1.4rem';
  const descSize = isSmall ? '0.8rem' : (isMobile ? '0.85rem' : '0.95rem');

  return (
    <div style={{ width: '100%', height: cardHeight, perspective: '1200px', cursor: 'pointer' }} onClick={() => setIsFlipped(!isFlipped)}>
      <div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        
        {/* CARA FRONTAL */}
        <div style={{ ...faceStyle }}>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={resolvePath(project.img)} alt={project.name} style={{ maxWidth: '85%', maxHeight: '55%', objectFit: 'contain' }} />
          </div>
          <p style={{ marginTop: '10px', color: project.color, fontWeight: '900', fontSize: isMobile ? '0.8rem' : '0.95rem', letterSpacing: '2px', textAlign: 'center', textTransform: 'uppercase' }}>
              {t.cardFlipHint}
          </p>
        </div>

        {/* CARA TRASERA */}
        <div style={{ ...faceStyle, transform: 'rotateY(180deg)', background: '#000c2d', border: `2px solid ${project.color}`, padding: backPadding, justifyContent: 'flex-start' }}>
          <h3 style={{ color: project.color, fontSize: titleSize, textTransform: 'uppercase', marginBottom: '15px', fontWeight: 950, textAlign: 'center', lineHeight: 1.2, flexShrink: 0 }}>
              {project.shortTitle}
          </h3>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', width: '100%' }}>
            {project.shortDesc.map((desc: string, idx: number) => (
                <p key={idx} style={{ fontSize: descSize, lineHeight: 1.4, color: '#e2e8f0', textAlign: 'center', margin: 0, fontWeight: 500 }}>{desc}</p>
            ))}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            style={{ flexShrink: 0, width: '100%', marginTop: '15px', padding: isMobile ? '12px' : '14px', background: project.color, border: 'none', borderRadius: '50px', color: '#000', fontWeight: '900', fontSize: isMobile ? '0.85rem' : '1rem', cursor: 'pointer', transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1px' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = `0 0 20px ${project.color}80`; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {t.cardFlipBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. COMPONENTE PRINCIPAL
// ==========================================
export const ProjectsPage = ({ isMobile }: { isMobile: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isSmall, setIsSmall] = useState(false);

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

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 475);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.state && location.state.projectId) {
      const pIndex = t.projects.findIndex((p: any) => p.id === location.state.projectId);
      if (pIndex !== -1) { handleSelectProject(pIndex); }
      window.history.replaceState({}, document.title)
    }
  }, [location, t.projects]);

  const scrollToProjects = () => projectsRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleSelectProject = (index: number) => {
  setActiveProjectIndex(index);
  
  // Esperamos un momento a que React renderice la tarjeta grande
  setTimeout(() => {
    if (carouselRef.current) {
      // Obtenemos la posición de la tarjeta respecto al documento
      const elementPosition = carouselRef.current.getBoundingClientRect().top + window.pageYOffset;
      
      // Ajustamos el offset: le restamos 100px para que no choque con el Nav
      // Puedes cambiar el 100 por el valor que mejor te funcione
      const offsetPosition = elementPosition - (isMobile ? 80 : 120);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, 150);
};

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#00020a', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
      </Helmet>

      {/* HERO DE VIDEO */}
      <section style={{ position: 'relative', width: '100%', backgroundColor: '#000', overflow: 'hidden', paddingTop: isMobile ? '60px' : '85px' }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.85 }}>
          <source src={resolvePath('assets/video.mp4')} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to bottom, transparent 0%, #00020a 100%)', zIndex: 1, pointerEvents: 'none' }} />
        
        {!isMobile && (
          <div onClick={scrollToProjects} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#ffffff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '10px', fontWeight: 900 }}>{t.heroTitle}</span>
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ChevronDown color="#00C2FF" size={48} /></motion.div>
          </div>
        )}
      </section>

      {/* SECCIÓN ALIANZAS (GRILLA) */}
      <section ref={projectsRef} style={{ padding: isMobile ? '40px 15px' : '120px 60px 80px', backgroundColor: '#00020a' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '80px' }}>
                <h2 style={{ fontSize: isMobile ? '2.4rem' : '4.5rem', fontWeight: 950, color: '#ffffff', margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>
                    <span style={{ color: '#00C2FF' }}>{t.titleMain1}</span> {t.titleMain2}
                </h2>
                <p style={{ color: '#94a3b8', fontSize: isMobile ? '1.1rem' : '1.4rem', marginTop: '20px', maxWidth: '800px', margin: '20px auto 0', fontWeight: 600, lineHeight: 1.6 }}>{t.subtitle}</p>
            </motion.div>

            <div className="responsive-grid">
                {t.projects.map((project: any, index: number) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                        <FlipCard project={project} t={t} isMobile={isMobile} isSmall={isSmall} onSelect={() => handleSelectProject(index)} />
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* CARRUSEL DETALLADO - OPTIMIZADO PARA LAPTOPS Y DESKTOP */}
<div ref={carouselRef} style={{ width: '100%', overflow: 'hidden', paddingBottom: activeProjectIndex !== null ? '100px' : '0' }}>
    <AnimatePresence mode="wait">
        {activeProjectIndex !== null && (
            <motion.div 
                key={t.projects[activeProjectIndex].id} 
                initial={{ opacity: 0, scale: 0.98, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.98, y: -20 }} 
                transition={{ duration: 0.4 }} 
                style={{ 
                    maxWidth: isMobile ? '100%' : '1100px', // Reducido de 1450px a 1100px para laptops
                    margin: '0 auto', 
                    padding: isMobile ? '0 15px' : '0 30px' 
                }} 
            >
                <div style={{ 
                    backgroundColor: '#000c2d', 
                    border: `2px solid ${t.projects[activeProjectIndex].color}50`, 
                    borderRadius: isMobile ? '24px' : '32px', 
                    // Padding fluido: menos espacio en laptops, más en monitores grandes
                    padding: isMobile ? '30px 20px' : 'clamp(40px, 5vw, 60px) clamp(30px, 6vw, 70px)', 
                    boxShadow: `0 30px 70px rgba(0,0,0,0.8), inset 0 0 50px ${t.projects[activeProjectIndex].color}15`, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: isMobile ? '30px' : '40px' 
                }}>
                    
                    {/* HEADER - Ajuste de tamaño de fuente */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: isMobile ? '20px' : '30px', 
                        borderBottom: '1px solid rgba(255,255,255,0.1)', 
                        paddingBottom: isMobile ? '25px' : '30px' 
                    }}>
                        <div style={{ 
                            padding: isMobile ? '15px' : '20px', 
                            backgroundColor: 'rgba(0,2,10,0.6)', 
                            borderRadius: '20px', 
                            border: `2px solid ${t.projects[activeProjectIndex].color}40`, 
                            flexShrink: 0 
                        }}>
                            <div style={{ transform: isMobile ? 'scale(0.9)' : 'scale(1)' }}>
                                {t.projects[activeProjectIndex].icon}
                            </div>
                        </div>
                        <div>
                            <h3 style={{ 
                                color: t.projects[activeProjectIndex].color, 
                                fontSize: isMobile ? '1.8rem' : 'clamp(2.2rem, 3.5vw, 3.5rem)', // Escalado dinámico
                                fontWeight: 950, 
                                textTransform: 'uppercase', 
                                marginBottom: '5px', 
                                lineHeight: 1 
                            }}>
                                {t.projects[activeProjectIndex].name}
                            </h3>
                            <p style={{ 
                                color: '#cbd5e1', 
                                fontSize: isMobile ? '0.85rem' : 'clamp(0.9rem, 1vw, 1.1rem)', 
                                fontWeight: 600, 
                                margin: 0, 
                                letterSpacing: '1px' 
                            }}>
                                <span style={{color: 'white'}}>{t.sectorLabel}:</span> {t.projects[activeProjectIndex].sector}
                            </p>
                        </div>
                    </div>

                    {/* BODY: 3 COLUMNAS - Ajustado para que quepa en pantalla */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
                        gap: isMobile ? '20px' : '25px' // Menos gap en laptop
                    }}>
                        
                        <div style={{ 
                            padding: isMobile ? '20px' : '25px', 
                            backgroundColor: 'rgba(255,255,255,0.02)', 
                            borderRadius: '18px', 
                            borderTop: '4px solid #ff3333' 
                        }}>
                            <h4 style={{ color: 'white', fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: 800, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Target size={isMobile ? 22 : 26} color="#ff3333"/> {t.detailDesafio}
                            </h4>
                            <p style={{ color: '#94a3b8', fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight: 1.6, margin: 0 }}>
                                {t.projects[activeProjectIndex].desafio}
                            </p>
                        </div>

                        <div style={{ 
                            padding: isMobile ? '20px' : '25px', 
                            backgroundColor: `rgba(255,255,255,0.02)`, 
                            borderRadius: '18px', 
                            borderTop: `4px solid ${t.projects[activeProjectIndex].color}` 
                        }}>
                            <h4 style={{ color: 'white', fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: 800, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Cpu size={isMobile ? 22 : 26} color={t.projects[activeProjectIndex].color}/> {t.detailSolucion}
                            </h4>
                            <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {t.projects[activeProjectIndex].arquitectura.map((item: string, i: number) => (
                                    <li key={i} style={{ color: '#cbd5e1', fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                        <CheckCircle2 size={18} color={t.projects[activeProjectIndex].color} style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ 
                            padding: isMobile ? '20px' : '25px', 
                            backgroundColor: 'rgba(255,255,255,0.02)', 
                            borderRadius: '18px', 
                            borderTop: '4px solid #00ff88' 
                        }}>
                            <h4 style={{ color: 'white', fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: 800, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Award size={isMobile ? 22 : 26} color="#00ff88"/> {t.detailImpacto}
                            </h4>
                            <p style={{ color: '#94a3b8', fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight: 1.6, margin: 0 }}>
                                {t.projects[activeProjectIndex].resultado}
                            </p>
                        </div>

                    </div>

                    {/* FOOTER - Botones compactos */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: isMobile ? 'column' : 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        gap: '20px', 
                        marginTop: '10px', 
                        paddingTop: '30px', 
                        borderTop: '1px solid rgba(255,255,255,0.1)' 
                    }}>
                        <button onClick={() => handleSelectProject((activeProjectIndex - 1 + t.projects.length) % t.projects.length)} style={navBtnStyle(t.projects[activeProjectIndex].color, isMobile)}>
                          {t.detailPrev}
                        </button>
                        <button onClick={() => setActiveProjectIndex(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '10px', cursor: 'pointer', textDecoration: 'underline', fontWeight: 800, fontSize: isMobile ? '1rem' : '1.1rem', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>
                          {t.detailClose}
                        </button>
                        <button onClick={() => handleSelectProject((activeProjectIndex + 1) % t.projects.length)} style={navBtnStyle(t.projects[activeProjectIndex].color, isMobile)}>
                          {t.detailNext}
                        </button>
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
                <h4 style={{ color: '#FAA918', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 900, fontSize: isMobile ? '0.9rem' : '1.1rem' }}>{t.marketTitle1}</h4>
                <h2 style={{ fontSize: isMobile ? '2.2rem' : '4rem', fontWeight: 950, letterSpacing: '-1px', lineHeight: 1 }}>{t.marketTitle2} <span style={{ color: '#00C2FF' }}>{t.marketTitle3}</span></h2>
            </motion.div>

            <div className="responsive-grid">
                {t.popular.map((project: any, index: number) => (
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
              <h2 style={{ fontSize: isMobile ? '2rem' : '4rem', fontWeight: 950, marginBottom: '25px', lineHeight: 1, letterSpacing: '-1px' }}>{t.ctaTitle1} <br /><span style={{ color: '#FAA918' }}>{t.ctaTitle2}</span></h2>
              <p style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', color: '#94a3b8', marginBottom: '40px', maxWidth: '900px', margin: '25px auto 40px', fontWeight: 600 }}>{t.ctaDesc}</p>
              <button onClick={() => navigate('/contacto')} style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#00C2FF', color: '#000c2d', fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 900, padding: isMobile ? '18px 35px' : '22px 55px', border: 'none', borderRadius: '60px', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', boxShadow: '0 15px 35px rgba(0,194,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#00C2FF'; e.currentTarget.style.transform = 'scale(1)'; }}>
                  {t.ctaButton} <ArrowRight size={isMobile ? 20 : 24} style={{ marginLeft: '12px' }} />
              </button>
          </motion.div>
      </section>

      <style>{`
        .responsive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        @media (max-width: 1024px) { .responsive-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
        @media (max-width: 768px) { .responsive-grid { grid-template-columns: 1fr; gap: 20px; } }
      `}</style>
    </div>
  );
};

const navBtnStyle = (color: string, isMobile: boolean): React.CSSProperties => ({
    background: 'rgba(255,255,255,0.05)', 
    border: `2px solid ${color}50`, 
    color: 'white', 
    padding: isMobile ? '16px 20px' : '20px 45px', 
    borderRadius: '16px', 
    cursor: 'pointer', 
    fontSize: isMobile ? '1.1rem' : '1.25rem', 
    fontWeight: 900, 
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    width: isMobile ? '100%' : 'auto',
    textAlign: 'center'
});