import React, { Suspense, useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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

const CLOUD_LOGOS = ['oracle_transparente.png', 'gcp_transparente.png', 'aws_transparente.png', 'azure_transparente.png'];

// ==========================================
// 1. DICCIONARIO SINTETIZADO Y BALANCEADO
// ==========================================
const TRANSLATIONS: any = {
  ES: {
    seoTitle: "Servicios Cloud, DevOps y Desarrollo de Software | Bocancorp",
    seoDesc: "Especialistas en software a medida, modernización digital, arquitectura multi-cloud, ciberseguridad y DevOps.",
    heroTitle: "Nuestros Servicios",
    ctaButton: "impulsa tu negocio a las estrellas",
    servicesData: [
      { 
        id: 1, 
        subtitle: "INGENIERÍA DE SOFTWARE", 
        title: "Desarrollo Multiplataforma", 
        color: "#00f2ff",
        image: "/assets/aws-bg.jpeg", 
        content: [
          { type: 'paragraph', text: "Desarrollamos soluciones de software a medida, escalables y seguras. Nos adaptamos a las necesidades de su negocio para garantizar una experiencia impecable en múltiples plataformas." },
          { type: 'highlight', title: "INGENIERÍA A MEDIDA", text: "Desarrollo integral Web y Móvil bajo los más estrictos estándares de la industria tecnológica." }
        ]
      },
      { 
        id: 2, subtitle: "MODERNIZACIÓN DIGITAL", title: "Ecosistemas Cloud", color: "#7000ff",
        image: "/assets/cloud-bg.avif",
        content: [
          { type: 'paragraph', text: "Transformamos sistemas heredados en plataformas modernas nativas de la nube. Reducimos su deuda técnica para que innove con la agilidad que el mercado global exige." },
          { type: 'highlight', title: "ESPECIALISTAS MULTI-CLOUD", text: "Ejecutamos migraciones complejas y evolucionamos arquitecturas hacia entornos resilientes en las nubes líderes." }
        ]
      },
      { 
        id: 3, subtitle: "EXPERIENCIA DE USUARIO", title: "Diseño UX/UI", color: "#ff007a",
        image: "/assets/uxui-bg.avif",
        content: [
          { type: 'paragraph', text: "Traducimos la complejidad técnica en interfaces digitales fluidas e intuitivas. Optimizamos los flujos de trabajo para maximizar la retención de usuarios y la conversión." },
          { type: 'highlight', title: "INTERFACES ESTRATÉGICAS", text: "Diseños centrados en el usuario final que reducen la fricción y potencian su producto digital." }
        ]
      },
      { 
        id: 4, subtitle: "ESTRATEGIA TECNOLÓGICA", title: "Consultoría TI", color: "#00ff8c",
        image: "/assets/cti-bg.avif",
        content: [
          { type: 'paragraph', text: "Definimos el rumbo tecnológico óptimo de su infraestructura. Alineamos cada decisión técnica con sus metas de negocio a largo plazo para asegurar el máximo retorno." },
          { type: 'highlight', title: "ASESORAMIENTO EJECUTIVO", text: "Diseñamos la hoja de ruta integral que su organización requiere para escalar y mitigar riesgos." }
        ]
      },
      { 
        id: 5, subtitle: "ESTRATEGIA MULTINUBE", title: "Arquitectura Serverless", color: "#00a2ff",
        image: "/assets/serverless-bg.png",
        content: [
          { type: 'paragraph', text: "Aproveche la potencia de la nube sin gestionar servidores físicos. Implementamos arquitecturas que escalan automáticamente, reduciendo costos operativos drásticamente." },
          { type: 'highlight', title: "AGILIDAD SIN SERVIDORES", text: "Diseño de soluciones elásticas que maximizan la velocidad de despliegue y eliminan el mantenimiento." }
        ]
      },
      { 
        id: 6, subtitle: "SEGURIDAD INTEGRAL", title: "Ciberseguridad Avanzada", color: "#ff8c00",
        image: "assets/ciberseguridad-bg.jpg",
        content: [
          { type: 'paragraph', text: "Protegemos sus activos digitales mediante protocolos avanzados. Implementamos defensa profunda, auditorías y cumplimiento normativo para blindar su infraestructura contra cualquier amenaza externa." },
          { type: 'highlight', title: "BLINDAJE DE ACTIVOS", text: "Soluciones de vanguardia como Palo Alto Networks y WAF para una conectividad privada y segura." }
        ]
      },
      { 
        id: 7, subtitle: "AUTOMATIZACIÓN TOTAL", title: "Cultura DevOps & IaC", color: "#ff4d00",
        image: "assets/devops-bg.avif",
        content: [
          { type: 'paragraph', text: "Acelere su Time-to-Market automatizando despliegues. Integramos prácticas DevOps e Infraestructura como Código (IaC) para crear ciclos de entrega de software rápidos y seguros." },
          { type: 'highlight', title: "INFRAESTRUCTURA CÓDIGO", text: "Automatización con Terraform y pipelines CI/CD que eliminan el error humano y optimizan tiempos." }
        ]
      },
      { 
        id: 8, subtitle: "EFICIENCIA DE COSTOS", title: "FinOps & Optimization", color: "#ffee00",
        image: "assets/finops-bg.png",
        content: [
          { type: 'paragraph', text: "Recupere el control financiero de su nube. Analizamos su consumo para identificar y eliminar el desperdicio de recursos, asegurando que cada dólar genere máximo valor." },
          { type: 'highlight', title: "MAXIMIZACIÓN DEL ROI", text: "Gestión estratégica de costos para asegurar el mayor rendimiento tecnológico al menor precio operativo." }
        ]
      }
    ]
  },
  EN: {
    seoTitle: "Cloud Services, DevOps & Software Development | Bocancorp",
    seoDesc: "Specialists in custom software, digital modernization, multi-cloud architecture, cybersecurity, and DevOps.",
    heroTitle: "Our Services",
    ctaButton: "boost your business to the stars",
    servicesData: [
      { 
        id: 1, subtitle: "SOFTWARE ENGINEERING", title: "Cross-Platform Solutions", color: "#00f2ff",
        image: "assets/aws-bg.jpeg",
        content: [
          { type: 'paragraph', text: "We develop custom, scalable, and secure software solutions. We adapt to your business needs to guarantee a flawless user experience across multiple digital platforms." },
          { type: 'highlight', title: "CUSTOM ENGINEERING", text: "Comprehensive Web and Mobile development built under the strictest technological industry standards." }
        ]
      },
      { 
        id: 2, subtitle: "DIGITAL MODERNIZATION", title: "Cloud Ecosystems", color: "#7000ff",
        image: "assets/cloud-bg.avif",
        content: [
          { type: 'paragraph', text: "We transform legacy systems into modern cloud-native platforms. We reduce technical debt so you can innovate with the agility and speed the global market demands." },
          { type: 'highlight', title: "MULTI-CLOUD SPECIALISTS", text: "We execute complex migrations and evolve architectures into resilient environments across leading clouds." }
        ]
      },
      { 
        id: 3, subtitle: "USER EXPERIENCE", title: "UX/UI Design", color: "#ff007a",
        image: "assets/uxui-bg.avif",
        content: [
          { type: 'paragraph', text: "We translate technical complexity into fluid and intuitive digital interfaces. We optimize workflows to maximize user retention and your business's overall conversion rate." },
          { type: 'highlight', title: "STRATEGIC INTERFACES", text: "End-user centered designs that reduce operational friction and boost your digital product." }
        ]
      },
      { 
        id: 4, subtitle: "TECHNOLOGY STRATEGY", title: "IT Consulting", color: "#00ff8c",
        image: "assets/cti-bg.avif",
        content: [
          { type: 'paragraph', text: "We define the optimal technical direction for your infrastructure. We align every technical decision with your long-term business goals to ensure maximum return on investment." },
          { type: 'highlight', title: "EXECUTIVE ADVICE", text: "We design the comprehensive roadmap your organization needs to scale safely and mitigate risks." }
        ]
      },
      { 
        id: 5, subtitle: "MULTI-CLOUD STRATEGY", title: "Serverless Architecture", color: "#00a2ff",
        image: "assets/serverless-bg.png",
        content: [
          { type: 'paragraph', text: "Leverage cloud power without managing physical servers. We implement architectures that automatically scale with demand, drastically reducing your operational costs." },
          { type: 'highlight', title: "SERVERLESS AGILITY", text: "Design of elastic solutions that maximize deployment speed and eliminate maintenance complexity." }
        ]
      },
      { 
        id: 6, subtitle: "INTEGRAL SECURITY", title: "Advanced Cybersecurity", color: "#ff8c00",
        image: "assets/ciberseguridad-bg.jpg",
        content: [
          { type: 'paragraph', text: "We protect your digital assets through advanced protocols. We implement in-depth defense, audits, and regulatory compliance to shield your infrastructure against external threats." },
          { type: 'highlight', title: "ASSET SHIELDING", text: "Cutting-edge solutions like Palo Alto Networks and WAF for private and secure connectivity." }
        ]
      },
      { 
        id: 7, subtitle: "TOTAL AUTOMATION", title: "DevOps & IaC", color: "#ff4d00",
        image: "assets/devops-bg.avif",
        content: [
          { type: 'paragraph', text: "Accelerate your Time-to-Market through deployment automation. We integrate DevOps practices and Infrastructure as Code (IaC) to create fast and secure software delivery cycles." },
          { type: 'highlight', title: "INFRASTRUCTURE AS CODE", text: "Automation with Terraform and CI/CD pipelines that eliminate human error and optimize delivery times." }
        ]
      },
      { 
        id: 8, subtitle: "COST EFFICIENCY", title: "FinOps & Optimization", color: "#ffee00",
        image: "assets/finops-bg.png",
        content: [
          { type: 'paragraph', text: "Regain financial control of your Cloud infrastructure. We analyze your consumption to identify and eliminate resource waste, ensuring every dollar generates maximum value." },
          { type: 'highlight', title: "MAXIMIZING ROI", text: "Strategic cost management to ensure the highest technological performance at the lowest operational price." }
        ]
      }
    ]
  }
};

const HeroSection = ({ isMobile, title }: { isMobile: boolean, title: string }) => (
  <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1, background: '#00020a' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <Canvas 
          style={{ 
            touchAction: 'pan-y', 
            WebkitTapHighlightColor: 'transparent', /* 👈 Quita el fondo azul en móviles */
            outline: 'none' /* 👈 Quita el borde de selección en PC */
          }} 
          camera={{ position: [0, 0, 8], fov: 45 }}
        >
        <Environment preset="night" /> 
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00C2FF" />
        <Suspense fallback={null}><CosmicSphere /></Suspense>
      </Canvas>
    </div>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, background: 'radial-gradient(circle at center, transparent 10%, #00020a 90%)', pointerEvents: 'none' }} />
    
    <div style={{ position: 'relative', zIndex: 3, pointerEvents: 'none' }}>
        {/* 👇 CORRECCIÓN WARNING FRAMER MOTION: position: 'relative' agregado aquí */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} style={{ position: 'relative', textAlign: 'center' }}>
            <h1 style={{ color: 'white', fontSize: isMobile ? '3rem' : '5rem', fontWeight: 800, letterSpacing: '-1px', margin: 0, lineHeight: 1, textShadow: '0 0 20px rgba(0, 194, 255, 0.5)' }}>
              {title}
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

export const ServicesPage = ({ isMobile }: { isMobile: boolean }) => {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const { lang: urlLang } = useParams(); 
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';
  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    if (hash) {
      const serviceId = parseInt(hash.replace('#service-', ''));
      if (!isNaN(serviceId)) {
        const stackingContainer = document.getElementById('stacking-section-id');
        if (stackingContainer) {
            const totalCards = t.servicesData.length;
            const vh = window.innerHeight;
            const progressTarget = (serviceId - 1) / totalCards;
            const scrollRange = (totalCards - 1) * vh;
            const offsetTop = stackingContainer.offsetTop;
            const targetPosition = offsetTop + (progressTarget * scrollRange);
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    }
  }, [hash, t.servicesData.length]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#00020a', position: 'relative' }}>
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
      </Helmet>

      <HeroSection isMobile={isMobile} title={t.heroTitle} />
      
      <StrategicPillars isMobile={isMobile} />

      <section id="stacking-section-id" style={{ position: 'relative', zIndex: 1, paddingTop: '60px', backgroundColor: '#00020a' }}>
          <StackingCards data={t.servicesData} isMobile={isMobile} />
      </section>

      <VanguardMethodology isMobile={isMobile} />

      <div style={{ backgroundColor: '#000c2d', position: 'relative', zIndex: 1 }}>
          <section style={{ paddingTop: '80px', paddingBottom: '20px' }}>
              <SpecializedSolutions isMobile={isMobile} />
          </section>

          <section style={{ position: 'relative', padding: isMobile ? '40px 20px 100px' : '40px 0 120px', textAlign: 'center' }}>
              {/* 👇 CORRECCIÓN WARNING FRAMER MOTION: position: 'relative' agregado aquí */}
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ position: 'relative' }}>
                <motion.button
                    onClick={() => navigate(`/${currentLang.toLowerCase()}/contacto`)}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 204, 0, 0.6)', backgroundColor: '#ffe033' }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: ['0 0 20px rgba(255, 204, 0, 0.2)', '0 0 35px rgba(255, 204, 0, 0.5)', '0 0 20px rgba(255, 204, 0, 0.2)'] }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                    style={{
                        backgroundColor: '#FFCC00', color: '#000', padding: isMobile ? '20px 40px' : '30px 60px',
                        fontSize: isMobile ? '1.2rem' : '1.8rem', fontWeight: '900', border: 'none',
                        borderRadius: '100px', cursor: 'pointer', textTransform: 'uppercase',
                        letterSpacing: '1px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        display: 'inline-block', maxWidth: '90%'
                    }}
                >
                    {t.ctaButton}
                </motion.button>
              </motion.div>
          </section>
      </div>

      <style>{`
        /* 👇 ESTA ES LA REGLA QUE MATA EL CUADRO AZUL GLOBALMENTE */
        * {
          -webkit-tap-highlight-color: transparent !important;
        }

        /* 👇 SOLO PARA ESCRITORIOS: No altera la vista móvil */
        @media (min-width: 1024px) {
            #stacking-section-id .stacking-card-content { padding: clamp(40px, 5vw, 80px) !important; display: flex !important; flex-direction: column !important; justify-content: center !important; }
            #stacking-section-id p { font-size: clamp(1.05rem, 1.2vw, 1.25rem) !important; line-height: 1.7 !important; margin-bottom: clamp(15px, 2vw, 25px) !important; color: #e2e8f0 !important; max-width: 95% !important; }
            #stacking-section-id h3, #stacking-section-id h4, #stacking-section-id .highlight-title { font-size: clamp(1.3rem, 1.6vw, 1.9rem) !important; line-height: 1.3 !important; margin-bottom: 15px !important; font-weight: 900 !important; text-transform: uppercase !important; }
            #stacking-section-id .highlight-box { padding: 25px !important; border-radius: 16px !important; background: rgba(255, 255, 255, 0.03) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; }
        }
        body { overflow-x: hidden; }
      `}</style>
    </div>
  );
};