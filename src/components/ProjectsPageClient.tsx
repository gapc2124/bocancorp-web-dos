'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter, useParams, useSearchParams } from 'next/navigation'; 
import { ShoppingCart, Bot, CloudUpload, LayoutDashboard, Cpu, BarChart3, ArrowRight, ChevronDown, Server, Shield, Globe, CheckCircle2 } from 'lucide-react';

import { Canvas, useFrame } from '@react-three/fiber'; 
import * as THREE from 'three';

const resolvePath = (path: string) => {
  const base = (process.env.NEXT_PUBLIC_BASE_URL || '') || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// ==========================================
// 1. DICCIONARIO GENERAL DE TRADUCCIONES
// ==========================================
const TRANSLATIONS: any = {
  ES: {
    seoTitle: "Casos de Éxito y Proyectos Cloud | Bocancorp",
    seoDesc: "Descubre cómo hemos transformado empresas con arquitecturas Cloud en AWS, implementaciones serverless, ciberseguridad y chatbots con IA. Nuestro portafolio.",
    heroAction: "Ver Proyectos",
    section1Title1: "Arquitecturas Cloud",
    section1Title2: " Implementadas",
    section1Sub: "Empresas de talla internacional que confían en nuestra capacidad técnica.",
    cardBtnHover: "Ver Resumen ↻",
    cardBtnOpen: "Saber Más",
    detailClose: "Cerrar Detalles",
    detailPrev: "← Anterior",
    detailNext: "Siguiente →",
    detailSector: "Sector:",
    detailChallenge: "Desafío",
    detailResult: "Resultado",
    section2Header: "Demandas del Mercado",
    section2Title1: "Soluciones ",
    section2Title2: "Más Solicitadas",
    ctaTitle1: "Tu empresa podría ser nuestra próxima ",
    ctaTitle2: "gran estrella.",
    ctaSub: "Cuéntanos tus desafíos técnicos y diseñaremos la arquitectura perfecta para superarlos.",
    ctaBtn: "Iniciar mi proyecto"
  },
  EN: {
    seoTitle: "Success Stories & Cloud Projects | Bocancorp",
    seoDesc: "Discover how we have transformed companies with Cloud architectures on AWS, serverless implementations, cybersecurity, and AI chatbots. Our portfolio.",
    heroAction: "View Projects",
    section1Title1: "Cloud Architectures",
    section1Title2: " Implemented",
    section1Sub: "World-class companies that trust our technical capabilities.",
    cardBtnHover: "View Summary ↻",
    cardBtnOpen: "Know More",
    detailClose: "Close Details",
    detailPrev: "← Prev",
    detailNext: "Next →",
    detailSector: "Sector:",
    detailChallenge: "Challenge",
    detailResult: "Result",
    section2Header: "Market Demands",
    section2Title1: "Most Requested ",
    section2Title2: "Solutions",
    ctaTitle1: "Your company could be our next ",
    ctaTitle2: "big star.",
    ctaSub: "Tell us about your technical challenges and we will design the perfect architecture to overcome them.",
    ctaBtn: "Start my project"
  }
};

// ==========================================
// 2. DATOS DE PROYECTOS (BILINGÜES)
// ==========================================
const GET_COMPANY_PROJECTS = (lang: string) => [
  { 
    id: 'miranda', name: 'Torre Miranda', color: '#FFFFFF', img: 'assets/Miranda.png', icon: <Server size={54} color="#FFFFFF" />,
    shortTitle: lang === 'EN' ? 'Cloud Backup Architecture' : 'Arquitectura de Respaldo Cloud', 
    shortDesc: lang === 'EN' 
      ? ['We implemented an automated backup solution in AWS via a secure VPN connection, replacing manual processes that caused data loss.', 'The new architecture allows rapid recovery from incidents and business continuity.']
      : ['Implementamos una solución de backup automatizado en AWS mediante conexión VPN segura, reemplazando procesos manuales que generaban pérdida de información.', 'La nueva arquitectura permite recuperación rápida ante incidentes y continuidad operativa.'],
    sector: lang === 'EN' ? 'Business center and corporate offices.' : 'Centro empresarial y oficinas corporativas.',
    desafio: lang === 'EN' ? 'The organization performed manual backups of local equipment and servers, leading to critical data loss and the lack of a formal disaster recovery plan.' : 'La organización realizaba respaldos manuales de equipos y servidores locales, lo que generó pérdida de información crítica y ausencia de un plan formal de recuperación ante desastres.',
    arquitecturaTitle: lang === 'EN' ? 'Implemented Architecture' : 'Arquitectura Implementada',
    arquitectura: lang === 'EN' 
      ? ['Secure connectivity via VPN to the cloud.', 'Backup automation through scheduled scripts.', 'Structured and controlled storage in an AWS environment.', 'Architecture prepared for rapid incident recovery.']
      : ['Conectividad segura mediante VPN hacia la nube.', 'Automatización de backups mediante scripts programados.', 'Almacenamiento estructurado y controlado en entorno AWS.', 'Arquitectura preparada para recuperación rápida ante incidentes.'],
    resultado: lang === 'EN' ? 'The organization transitioned from a manual and vulnerable scheme to an automated backup architecture, with efficient recovery capabilities and enhanced protection of critical information.' : 'La organización pasó de un esquema manual y vulnerable a una arquitectura de respaldo automatizada, con capacidad de recuperación eficiente y mayor protección de información crítica.'
  },
  { 
    id: 'myintelli', name: 'MyIntelli', color: '#33BEFF', img: 'assets/MyIntelli.png', icon: <Shield size={54} color="#33BEFF" />,
    shortTitle: lang === 'EN' ? 'Multicloud Security & Optimization' : 'Seguridad y Optimización Multicloud', 
    shortDesc: lang === 'EN'
      ? ['We executed a security assessment on a production SaaS platform, identifying critical vulnerabilities and proposing structural improvements.', 'We currently provide support in optimizing AWS and GCP consumption and implementing perimeter protection with WAF.']
      : ['Ejecutamos evaluación de seguridad sobre plataforma SaaS en producción, identificando vulnerabilidades críticas y proponiendo mejoras estructurales.', 'Actualmente acompañamos en optimización de consumo AWS y GCP e implementación de protección perimetral con WAF.'],
    sector: lang === 'EN' ? 'Cloud software for access control and biometric attendance.' : 'Software Cloud para control de acceso y asistencia biométrica.',
    desafio: lang === 'EN' ? 'Strengthen the security posture of an internet-exposed SaaS platform and optimize consumption in AWS and GCP environments.' : 'Fortalecer la postura de seguridad de una plataforma SaaS expuesta a internet y optimizar el consumo en entornos AWS y GCP.',
    arquitecturaTitle: lang === 'EN' ? 'Architecture & Intervention' : 'Arquitectura e Intervención',
    arquitectura: lang === 'EN'
      ? ['Execution of security tests (black-box ethical hacking).', 'Identification of critical vulnerabilities on the public surface.', 'Recommendations for cost optimization in multicloud environments.', 'Progressive implementation of perimeter protection via AWS WAF.']
      : ['Ejecución de pruebas de seguridad (ethical hacking caja negra).', 'Identificación de vulnerabilidades críticas en superficie pública.', 'Recomendaciones de optimización de costos en entornos multicloud.', 'Implementación progresiva de protección perimetral mediante AWS WAF.'],
    resultado: lang === 'EN' ? 'Substantial improvement in security posture, greater visibility over Cloud consumption, and strengthening of the architecture to operate in exposed production environments.' : 'Mejora sustancial en la postura de seguridad, mayor visibilidad sobre consumo Cloud y fortalecimiento de la arquitectura para operar en entornos productivos expuestos.'
  },
  { 
    id: 'datecsa', name: 'Datecsa', color: '#FF3333', img: 'assets/DateCSA.png', icon: <CloudUpload size={54} color="#FF3333" />,
    shortTitle: lang === 'EN' ? 'Enterprise Architecture on AWS' : 'Arquitectura Empresarial en AWS', 
    shortDesc: lang === 'EN'
      ? ['We designed and implemented AWS infrastructure to support the OnBase solution, including database, networking, SSL, and production replication.', 'The project enabled the migration of the platform to a stable, secure Cloud environment ready for enterprise operations.']
      : ['Diseñamos e implementamos infraestructura en AWS para soportar la solución OnBase, incluyendo base de datos, red, SSL y réplica a producción.', 'El proyecto permitió migrar la plataforma a un entorno Cloud estable, seguro y preparado para operación empresarial.'],
    sector: lang === 'EN' ? 'Enterprise technological solutions (DeLima Organization).' : 'Soluciones tecnológicas empresariales (Organización DeLima).',
    desafio: lang === 'EN' ? 'Migrate and structure AWS infrastructure to support the OnBase enterprise solution, ensuring stability, security, and operational continuity.' : 'Migrar y estructurar infraestructura en AWS para soportar la solución empresarial OnBase, garantizando estabilidad, seguridad y continuidad operativa.',
    arquitecturaTitle: lang === 'EN' ? 'Implemented Architecture' : 'Arquitectura Implementada',
    arquitectura: lang === 'EN'
      ? ['Design and deployment of AWS infrastructure.', 'Installation and configuration of operating system and database.', 'Patch implementation and basic hardening.', 'Network configuration and secure connectivity.', 'SSL certificate implementation.', 'Replication to the production environment.']
      : ['Diseño y despliegue de infraestructura en AWS.', 'Instalación y configuración de sistema operativo y base de datos.', 'Implementación de parches y endurecimiento básico.', 'Configuración de red y conectividad segura.', 'Implementación de certificados SSL.', 'Replicación hacia ambiente productivo.'],
    resultado: lang === 'EN' ? 'Stable enterprise infrastructure on AWS, ready to operate in production with security and availability standards aligned with Cloud best practices.' : 'Infraestructura empresarial estable en AWS, preparada para operar en producción con estándares de seguridad y disponibilidad alineados a buenas prácticas Cloud.'
  },
  { 
    id: 'ruedaverde', name: 'Rueda Verde', color: '#00ff88', img: 'assets/RuedaVerde.png', icon: <Bot size={54} color="#00ff88" />,
    shortTitle: lang === 'EN' ? 'Serverless Architecture' : 'Arquitectura Serverless', 
    shortDesc: lang === 'EN'
      ? ['We implemented a chatbot on serverless architecture in AWS, allowing the automation of frequent inquiries with an optimized consumption model.', 'The solution reduced operational load and improved organizational efficiency without increasing technical complexity.']
      : ['Implementamos un chatbot sobre arquitectura serverless en AWS, permitiendo automatizar consultas frecuentes con un modelo de consumo optimizado.', 'La solución redujo carga operativa y mejoró eficiencia organizacional sin incrementar complejidad tecnológica.'],
    sector: lang === 'EN' ? 'Environmental corporation dedicated to the sustainable management of used tires.' : 'Corporación ambiental dedicada a la gestión sostenible de llantas usadas.',
    desafio: lang === 'EN' ? 'Reduce the operational team\'s load from repetitive inquiries, optimizing resources in an environmentally focused organization with tight budgets.' : 'Reducir la carga operativa del equipo ante consultas repetitivas, optimizando recursos en una organización con enfoque ambiental y presupuestos ajustados.',
    arquitecturaTitle: lang === 'EN' ? 'Implemented Architecture' : 'Arquitectura Implementada',
    arquitectura: lang === 'EN'
      ? ['Design and implementation of a chatbot on AWS serverless architecture.', 'Use of managed services for high availability and low maintenance.', 'Cloud consumption optimization with minimal operational costs.', 'Integration with digital channels for the automation of frequent inquiries.']
      : ['Diseño e implementación de chatbot sobre arquitectura serverless en AWS.', 'Uso de servicios administrados para alta disponibilidad y bajo mantenimiento.', 'Optimización de consumo Cloud con costos operativos mínimos.', 'Integración con canales digitales para automatización de consultas frecuentes.'],
    resultado: lang === 'EN' ? 'Efficient automation of digital customer service, freeing the operational team to focus on higher-impact environmental activities, with a highly optimized Cloud consumption model.' : 'Automatización eficiente de atención digital, liberando al equipo operativo para concentrarse en actividades de mayor impacto ambiental, con un modelo de consumo Cloud altamente optimizado.'
  },
  { 
    id: 'tuulapp', name: 'Tuulapp', color: '#ccff00', img: 'assets/tuulapp.png', icon: <Cpu size={54} color="#ccff00" />,
    shortTitle: lang === 'EN' ? 'Cloud Evolution for SaaS Startup' : 'Evolución Cloud para Startup SaaS', 
    shortDesc: lang === 'EN'
      ? ['We supported the optimization and modernization of their AWS architecture, including a database migration strategy to Amazon Aurora and cost control.', 'The intervention prepares the platform for scalable and sustainable growth.']
      : ['Acompañamos la optimización y modernización de su arquitectura en AWS, incluyendo estrategia de migración de base de datos hacia Amazon Aurora y control de costos.', 'La intervención permite preparar la plataforma para crecimiento escalable y sostenible.'],
    sector: lang === 'EN' ? 'Tech startup for the digitalization of auto repair shops.' : 'Startup tecnológica para digitalización de talleres mecánicos.',
    desafio: lang === 'EN' ? 'Optimize the Cloud architecture and prepare the platform for growth by controlling costs and strengthening its database.' : 'Optimizar la arquitectura Cloud y preparar la plataforma para crecimiento, controlando costos y fortaliendo su base de datos.',
    arquitecturaTitle: lang === 'EN' ? 'Intervention' : 'Intervención',
    arquitectura: lang === 'EN'
      ? ['Support in structuring Cloud billing.', 'Evaluation and optimization of AWS consumption.', 'Design of a migration strategy from MongoDB to Amazon Aurora.', 'Consulting on applying for AWS credits and support programs.']
      : ['Acompañamiento en estructuración de facturación Cloud.', 'Evaluación y optimización de consumo en AWS.', 'Diseño de estrategia para migración de MongoDB hacia Amazon Aurora.', 'Asesoría en solicitud de créditos y programas de apoyo AWS.'],
    resultado: lang === 'EN' ? 'Definition of a technical roadmap to modernize the architecture, improve operational efficiency, and prepare the platform to scale sustainably.' : 'Definición de una hoja de ruta técnica para modernizar la arquitectura, mejorar eficiencia operativa y preparar la plataforma para escalar de manera sostenible.'
  },
  { 
    id: 'ingram', name: 'Ingram Micro', color: '#2952ff', img: 'assets/Ingram.png', icon: <Globe size={54} color="#2952ff" />,
    shortTitle: lang === 'EN' ? 'Cloud Initiatives in LATAM Ecosystem' : 'Iniciativas Cloud en Ecosistema LATAM', 
    shortDesc: lang === 'EN'
      ? ['Participation in regional Cloud architecture and security projects, including:', '• Data governance for an international AWS tender', '• Advanced AWS networking with Palo Alto Panorama integration', '• Prisma Cloud implementation in a banking application', '• FinOps models for international organizations']
      : ['Participación en proyectos regionales de arquitectura y seguridad Cloud, incluyendo:', '• Gobernanza de datos para licitación internacional en AWS', '• Networking avanzado en AWS con integración Palo Alto Panorama', '• Implementación de Prisma Cloud en aplicación bancaria', '• Modelos FinOps para organizaciones internacionales'],
    sector: lang === 'EN' ? 'Technology distribution and regional enterprise solutions.' : 'Distribución tecnológica y soluciones empresariales regionales.',
    desafio: lang === 'EN' ? 'Participation in multiple Cloud initiatives within the regional partner ecosystem, including regulated and corporate sectors.' : 'Participación en múltiples iniciativas Cloud dentro del ecosistema de partners regionales, incluyendo sectores regulados y corporativos.',
    arquitecturaTitle: lang === 'EN' ? 'Representative Interventions' : 'Intervenciones Representativas',
    arquitectura: lang === 'EN'
      ? ['Data Governance on AWS: Structure design for international tender processes.', 'Network Architecture & Security: AWS networking implementation integrating Panorama (Palo Alto).', 'Cloud Security in Banking: Installation and integration of Prisma Cloud.', 'Regional FinOps: Implementation of practices for a construction sector organization.', 'FinOps with Cloudability: Cloud financial management model in AWS and Azure.']
      : ['Gobernanza de Datos en AWS: Diseño de estructura para procesos de licitación internacional.', 'Arquitectura de Red y Seguridad: Implementación de networking en AWS integrando Panorama (Palo Alto).', 'Seguridad Cloud en Sector Bancario: Instalación e integración de Prisma Cloud.', 'FinOps Regional: Implementation of practices for a construction sector organization.', 'FinOps with Cloudability: Modelo de gestión financiera Cloud en AWS y Azure.'],
    resultado: lang === 'EN' ? 'Successful execution of Cloud initiatives in regional corporate environments, combining governance, advanced security, network architecture, and financial optimization. *Some initiatives are presented within the context of regional partner ecosystems.' : 'Ejecución exitosa de iniciativas Cloud en entornos corporativos regionales, combinando gobernanza, seguridad avanzada, arquitectura de red y optimización financiera. *Algunas iniciativas se presentan bajo el contexto de ecosistemas de partners regionales.'
  }
];

const GET_POPULAR_PROJECTS = (lang: string) => [
    { id: 'ecommerce', title: lang === 'EN' ? 'High-Performance E-commerce' : 'E-commerce de Alto Rendimiento', desc: lang === 'EN' ? 'Scalable applications ready for massive traffic spikes.' : 'Aplicaciones escalables preparadas para picos masivos.', icon: <ShoppingCart size={32} color="#00C2FF" /> },
    { id: 'chatbot', title: lang === 'EN' ? 'Generative AI Chatbots' : 'Chatbots con IA Generativa', desc: lang === 'EN' ? 'Advanced assistants integrated with CRM and WhatsApp.' : 'Asistentes avanzados integrados a CRM y WhatsApp.', icon: <Bot size={32} color="#FAA918" /> },
    { id: 'cloud', title: lang === 'EN' ? 'Cloud Migration & Architecture' : 'Migración y Arquitectura Cloud', desc: lang === 'EN' ? 'Legacy systems modernization and cost control.' : 'Modernización de sistemas legados y control de costos.', icon: <CloudUpload size={32} color="#00ff8c" /> },
    { id: 'saas', title: lang === 'EN' ? 'B2B SaaS Platforms' : 'Plataformas SaaS B2B', desc: lang === 'EN' ? 'Custom software development with a recurring model.' : 'Desarrollo de software a medida con modelo recurrente.', icon: <LayoutDashboard size={32} color="#ff007a" /> },
    { id: 'rpa', title: lang === 'EN' ? 'Process Automation' : 'Automatización de Procesos', desc: lang === 'EN' ? 'Elimination of manual tasks via RPA flows.' : 'Eliminación de tareas manuales mediante flujos RPA.', icon: <Cpu size={32} color="#aa00ff" /> },
    { id: 'data', title: lang === 'EN' ? 'Business Intelligence & Data' : 'Business Intelligence y Data', desc: lang === 'EN' ? 'Interactive dashboards for decision making.' : 'Dashboards interactivos para toma de decisiones.', icon: <BarChart3 size={32} color="#33BEFF" /> }
];

// ==========================================
// 3. COMPONENTE ESTRELLAS DE FONDO
// ==========================================
const StarryBackground = () => {
    const meshRef = useRef<THREE.Points>(null);
    const count = 500;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return pos;
    }, []);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
            meshRef.current.rotation.x += 0.0005;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                {/* @ts-ignore */}
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.15} color="#00C2FF" transparent opacity={0.6} sizeAttenuation={true} />
        </points>
    );
};

// ==========================================
// 4. FLIP CARD
// ==========================================
const FlipCard = ({ project, isMobile, isSmall, onSelect, t }: { project: any, isMobile: boolean, isSmall: boolean, onSelect: () => void, t: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);
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
              {t.cardBtnHover}
          </p>
        </div>

        {/* CARA TRASERA */}
        <div style={{ ...faceStyle, transform: 'rotateY(180deg)', background: '#000c2d', border: `2px solid ${project.color}`, padding: backPadding, justifyContent: 'flex-start', overflowY: 'auto' }}>
          <h3 style={{ color: project.color, fontSize: titleSize, textTransform: 'uppercase', marginBottom: '10px', fontWeight: 950, textAlign: 'center', lineHeight: 1.1, flexShrink: 0 }}>
              {project.shortTitle}
          </h3>
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px', marginBottom: '15px' }} className="custom-scrollbar">
            {project.shortDesc.map((desc: string, idx: number) => (
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
            {t.cardBtnOpen}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. COMPONENTE PRINCIPAL
// ==========================================
export const ProjectsPage = ({ isMobile }: { isMobile: boolean }) => {
  const router = useRouter();
  const navigate = (path: string) => router.push(path);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const projectsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isSmall, setIsSmall] = useState(false);

  // 👇 NUEVO: Candado para evitar el bug del historial infinito
  const hasConsumedState = useRef(false);

  // LECTURA DEL IDIOMA DESDE URL
  const { lang: urlLang } = useParams(); 
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';
  const t = TRANSLATIONS[currentLang];
  
  const companyProjects = useMemo(() => GET_COMPANY_PROJECTS(currentLang), [currentLang]);
  const popularProjects = useMemo(() => GET_POPULAR_PROJECTS(currentLang), [currentLang]);

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 475);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 👇 CORRECCIÓN DEL BUG: Usamos useRef para garantizar que lea el state 1 sola vez
  useEffect(() => {
    const projectId = searchParams.get('projectId');
    if (projectId && !hasConsumedState.current) {
      const pIndex = companyProjects.findIndex((p: any) => p.id === projectId);
      if (pIndex !== -1) { 
          handleSelectProject(pIndex); 
      }
      hasConsumedState.current = true; // Cerramos el candado
      router.replace(pathname); // Limpiamos la URL
    }
  }, [searchParams, pathname, router, companyProjects]);

  const scrollToProjects = () => {
    if (projectsRef.current) {
        const navOffset = isMobile ? 80 : 120; 
        const y = projectsRef.current.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectProject = (index: number) => {
    setActiveProjectIndex(index);
    setTimeout(() => {
        if (carouselRef.current) {
            const navOffset = isMobile ? 80 : 120; 
            const y = carouselRef.current.getBoundingClientRect().top + window.pageYOffset - navOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, 150);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#00020a', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      

      {/* HERO DE VIDEO */}
      <section style={{ position: 'relative', width: '100%', backgroundColor: '#000', overflow: 'hidden', paddingTop: isMobile ? '60px' : '85px' }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.85 }}>
          <source src={resolvePath('assets/video.mp4')} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to bottom, transparent 0%, #00020a 100%)', zIndex: 1, pointerEvents: 'none' }} />
        
        {!isMobile && (
          <div onClick={scrollToProjects} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#ffffff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '10px', fontWeight: 900 }}>{t.heroAction}</span>
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ChevronDown color="#00C2FF" size={48} /></motion.div>
          </div>
        )}
      </section>

      {/* SECCIÓN ALIANZAS (GRILLA) */}
      <section ref={projectsRef} style={{ padding: isMobile ? '40px 15px' : '120px 60px 80px', backgroundColor: '#00020a' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '80px' }}>
                <h2 style={{ fontSize: isMobile ? '2.4rem' : '4.5rem', fontWeight: 950, color: '#ffffff', margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>
                    <span style={{ color: '#00C2FF' }}>{t.section1Title1}</span>{t.section1Title2}
                </h2>
                <p style={{ color: '#94a3b8', fontSize: isMobile ? '1.1rem' : '1.4rem', marginTop: '20px', maxWidth: '800px', margin: '20px auto 0', fontWeight: 600, lineHeight: 1.6 }}>{t.section1Sub}</p>
            </motion.div>

            <div className="responsive-grid">
                {companyProjects.map((project: any, index: number) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                        <FlipCard project={project} isMobile={isMobile} isSmall={isSmall} onSelect={() => handleSelectProject(index)} t={t} />
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* CARRUSEL DETALLADO */}
      <div ref={carouselRef} style={{ width: '100%', overflow: 'hidden', paddingBottom: activeProjectIndex !== null ? '100px' : '0' }}>
          {/* Cambiamos el AnimatePresence de popLayout a wait para que sea más estable */}
          <AnimatePresence mode="wait">
              {activeProjectIndex !== null && (
                  <motion.div key={companyProjects[activeProjectIndex].id} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ duration: 0.4 }} 
                      style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}
                  >
                      <div style={{ backgroundColor: '#000c2d', border: `2px solid ${companyProjects[activeProjectIndex].color}50`, borderRadius: isMobile ? '24px' : '32px', padding: isMobile ? '30px 20px' : '60px', boxShadow: `0 30px 70px rgba(0,0,0,0.7), inset 0 0 50px ${companyProjects[activeProjectIndex].color}15`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '30px' : '50px', alignItems: 'flex-start' }}>
                          
                          {/* ICONO Y NAVEGACIÓN IZQUIERDA */}
                          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: isMobile ? '100%' : 'auto' }}>
                              <div style={{ padding: '35px', backgroundColor: 'rgba(0,2,10,0.6)', borderRadius: '28px', border: `2px solid ${companyProjects[activeProjectIndex].color}40` }}>
                                  {companyProjects[activeProjectIndex].icon}
                              </div>
                              {!isMobile && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                                    <button onClick={() => handleSelectProject((activeProjectIndex - 1 + companyProjects.length) % companyProjects.length)} style={sideNavStyle}>{t.detailPrev}</button>
                                    <button onClick={() => handleSelectProject((activeProjectIndex + 1) % companyProjects.length)} style={sideNavStyle}>{t.detailNext}</button>
                                </div>
                              )}
                          </div>

                          {/* CONTENIDO ESTRUCTURADO DERECHA */}
                          <div style={{ flex: 1, width: '100%' }}>
                              <h3 style={{ color: companyProjects[activeProjectIndex].color, fontSize: isMobile ? '2.2rem' : '3.5rem', fontWeight: 950, textTransform: 'uppercase', marginBottom: '5px', lineHeight: 1 }}>{companyProjects[activeProjectIndex].name}</h3>
                              <p style={{ color: '#FAA918', fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px' }}>
                                  <span style={{ color: 'white' }}>{t.detailSector}</span> {companyProjects[activeProjectIndex].sector}
                              </p>
                              <div style={{ height: '2px', width: '100%', background: `linear-gradient(90deg, ${companyProjects[activeProjectIndex].color}, transparent)`, marginBottom: '30px' }} />
                              
                              <div style={{ marginBottom: '25px' }}>
                                  <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff3333' }} /> {t.detailChallenge}
                                  </h4>
                                  <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>{companyProjects[activeProjectIndex].desafio}</p>
                              </div>

                              <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', borderLeft: `4px solid ${companyProjects[activeProjectIndex].color}` }}>
                                  <h4 style={{ color: companyProjects[activeProjectIndex].color, fontSize: '1.2rem', fontWeight: 800, marginBottom: '15px' }}>
                                      {companyProjects[activeProjectIndex].arquitecturaTitle}
                                  </h4>
                                  <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                      {companyProjects[activeProjectIndex].arquitectura.map((item: string, i: number) => (
                                          <li key={i} style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                              <CheckCircle2 size={20} color={companyProjects[activeProjectIndex].color} style={{ flexShrink: 0, marginTop: '2px' }} />
                                              <span>{item}</span>
                                          </li>
                                      ))}
                                  </ul>
                              </div>

                              <div>
                                  <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00ff88' }} /> {t.detailResult}
                                  </h4>
                                  <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>{companyProjects[activeProjectIndex].resultado}</p>
                              </div>

                              <div style={{ display: 'flex', gap: '15px', marginTop: '40px', flexWrap: 'wrap', alignItems: 'center', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
                                  {isMobile && (
                                    <>
                                      <button onClick={() => handleSelectProject((activeProjectIndex - 1 + companyProjects.length) % companyProjects.length)} style={sideNavStyle}>←</button>
                                      <button onClick={() => handleSelectProject((activeProjectIndex + 1) % companyProjects.length)} style={sideNavStyle}>→</button>
                                    </>
                                  )}
                                  <button onClick={() => setActiveProjectIndex(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '10px', cursor: 'pointer', textDecoration: 'underline', fontWeight: 700, fontSize: '1rem' }}>{t.detailClose}</button>
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
                <h4 style={{ color: '#FAA918', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 900, fontSize: isMobile ? '0.9rem' : '1.1rem' }}>{t.section2Header}</h4>
                <h2 style={{ fontSize: isMobile ? '2.2rem' : '4rem', fontWeight: 950, letterSpacing: '-1px', lineHeight: 1 }}>{t.section2Title1}<span style={{ color: '#00C2FF' }}>{t.section2Title2}</span></h2>
            </motion.div>

            <div className="responsive-grid">
                {popularProjects.map((project: any, index: number) => (
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

      {/* CTA FINAL CON ESTRELLAS DE FONDO */}
      <section style={{ padding: isMobile ? '60px 15px' : '160px 20px', backgroundColor: '#00020a', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', background: 'linear-gradient(to bottom, #000c2d 0%, transparent 100%)', pointerEvents: 'none', zIndex: 1 }} />
          
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
              <StarryBackground />
            </Canvas>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: isMobile ? '2rem' : '4rem', fontWeight: 950, marginBottom: '25px', lineHeight: 1, letterSpacing: '-1px' }}>
                  {t.ctaTitle1} <br /><span style={{ color: '#FAA918' }}>{t.ctaTitle2}</span>
              </h2>
              <p style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', color: '#94a3b8', marginBottom: '40px', maxWidth: '900px', margin: '25px auto 40px', fontWeight: 600 }}>
                  {t.ctaSub}
              </p>
              <button 
                  onClick={() => navigate(`/${currentLang.toLowerCase()}/contacto`)}
                  style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#00C2FF', color: '#000c2d', fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 900, padding: isMobile ? '18px 35px' : '22px 55px', border: 'none', borderRadius: '60px', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', boxShadow: '0 15px 35px rgba(0,194,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }} 
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'scale(1.05)'; }} 
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#00C2FF'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                  {t.ctaBtn} <ArrowRight size={isMobile ? 20 : 24} style={{ marginLeft: '12px' }} />
              </button>
          </motion.div>
      </section>

      <style>{`
        .responsive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        @media (max-width: 1024px) { .responsive-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
        @media (max-width: 768px) { .responsive-grid { grid-template-columns: 1fr; gap: 20px; } }
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