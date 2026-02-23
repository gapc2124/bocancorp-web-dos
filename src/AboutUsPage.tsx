import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Terminal, Shield, TrendingUp, ChevronDown, 
  ArrowRight, Search, PenTool, Rocket, ShieldCheck 
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber'; // 👈 Importamos useFrame
import * as THREE from 'three'; // 👈 Importamos THREE para las estrellas
import { Helmet } from 'react-helmet-async';

// COMPONENTES EXTERNOS
import { TimelineConstellation } from './components/TimelineConstellation'; 
import { Auroras } from './components/Auroras'; 
import { CircuitCircle } from './components/CircuitCircle';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// CONSTANTES DE DISEÑO
const BG_DARK = '#000c2d';
const BG_DEEP = '#00020a';
const BG_WHITE = '#ffffff';
const TEXT_ON_WHITE_MAIN = '#0f172a';
const ACCENT_CYAN = '#00C2FF';
const ACCENT_GOLD = '#FAA918';

// ==========================================
// TRADUCCIONES (SEO + TEXTOS)
// ==========================================
const TRANSLATIONS: Record<string, any> = {
    ES: {
      seoTitle: "Nosotros | Bocancorp - Arquitectura Cloud y Creación de Software",
      seoDesc: "Descubre la evolución de Bocancorp. Somos expertos en crear software a medida, servicios multicloud con AWS, ciberseguridad y optimización empresarial.",
      seoKeywords: "crear software, servicios cloud, Bocancorp, AWS Partner, arquitectura cloud, ciberseguridad, desarrollo web",
      seoOgTitle: "Nosotros | Bocancorp - Arquitectura Cloud",
      seoOgDesc: "Expertos en crear software a medida y arquitecturas Cloud seguras para el sector corporativo.",
      heroTitle1: "Arquitectura Cloud con",
      heroTitle2: "criterio empresarial.",
      heroDesc: "Construimos ecosistemas tecnológicos preparados para escalar, integrando seguridad y gobierno financiero desde el diseño.",
      pillarsTitle1: "Lo que nos",
      pillarsTitle2: "define",
      pillars: [
        { title: "Entornos Productivos", desc: "Especialización real en infraestructura crítica y seguridad.", icon: <Server /> },
        { title: "Enfoque Moderno", desc: "Automatización, Serverless y Arquitectura Multicloud.", icon: <Terminal /> },
        { title: "Seguridad Nativa", desc: "WAF y Prisma Cloud integrados desde la fase de diseño.", icon: <Shield /> },
        { title: "Visión de Negocio", desc: "Escalabilidad alineada a presupuestos y retorno de inversión.", icon: <TrendingUp /> }
      ],
      evoTitle1: "Evolución técnica y",
      evoTitle2: "enfoque estratégico",
      evoDesc1: "Nuestra experiencia comenzó con implementaciones en AWS y ha evolucionado hacia arquitecturas multicloud, gobierno de datos y soluciones serverless.",
      evoDesc2: "Hoy integramos seguridad, automatización y optimización financiera como parte del diseño, no como elementos posteriores.",
      howWorkTitle1: "Cómo construimos",
      howWorkTitle2: "arquitectura moderna",
      howWorkSteps: [
        { step: "01", title: "Diagnóstico", desc: "Técnico y financiero.", icon: <Search /> },
        { step: "02", title: "Diseño", desc: "Estructurado y escalable.", icon: <PenTool /> },
        { step: "03", title: "Implementación", desc: "Controlada y segura.", icon: <Rocket /> },
        { step: "04", title: "Optimización", desc: "Gobierno y mejora continua.", icon: <ShieldCheck /> }
      ],
      philosophyLabel: "Nuestro Principio",
      philosophyTitle: "La nube no debe ser compleja ni incierta.",
      philosophyDesc: "Debe ser una ventaja estratégica, construida con disciplina técnica y visión empresarial.",
      ctaBtn: "Iniciar mi proyecto"
    },
    EN: {
      seoTitle: "About Us | Bocancorp - Cloud Architecture & Software Creation",
      seoDesc: "Discover the evolution of Bocancorp. We are experts in custom software creation, AWS multicloud services, cybersecurity, and business optimization.",
      seoKeywords: "custom software, cloud services, Bocancorp, AWS Partner, cloud architecture, cybersecurity, web development",
      seoOgTitle: "About Us | Bocancorp - Cloud Architecture",
      seoOgDesc: "Experts in custom software creation and secure Cloud architectures for the corporate sector.",
      heroTitle1: "Cloud Architecture with",
      heroTitle2: "business criteria.",
      heroDesc: "We build technological ecosystems ready to scale, integrating security and financial governance by design.",
      pillarsTitle1: "What defines",
      pillarsTitle2: "us",
      pillars: [
        { title: "Production Environments", desc: "True specialization in critical infrastructure and security.", icon: <Server /> },
        { title: "Modern Approach", desc: "Automation, Serverless, and Multicloud Architecture.", icon: <Terminal /> },
        { title: "Native Security", desc: "WAF and Prisma Cloud integrated from the design phase.", icon: <Shield /> },
        { title: "Business Vision", desc: "Scalability aligned with budgets and Return on Investment.", icon: <TrendingUp /> }
      ],
      evoTitle1: "Technical evolution &",
      evoTitle2: "strategic focus",
      evoDesc1: "Our experience started with AWS implementations and has evolved towards multicloud architectures, data governance, and serverless solutions.",
      evoDesc2: "Today we integrate security, automation, and financial optimization as part of the core design, not as afterthoughts.",
      howWorkTitle1: "How we build",
      howWorkTitle2: "modern architecture",
      howWorkSteps: [
        { step: "01", title: "Diagnosis", desc: "Technical & financial.", icon: <Search /> },
        { step: "02", title: "Design", desc: "Structured & scalable.", icon: <PenTool /> },
        { step: "03", title: "Implementation", desc: "Controlled & secure.", icon: <Rocket /> },
        { step: "04", title: "Optimization", desc: "Governance & continuous improvement.", icon: <ShieldCheck /> }
      ],
      philosophyLabel: "Our Principle",
      philosophyTitle: "The cloud shouldn't be complex or uncertain.",
      philosophyDesc: "It should be a strategic advantage, built with technical discipline and business vision.",
      ctaBtn: "Start my project"
    }
};

const WaveDivider = ({ fillColor }: { fillColor: string }) => (
  <div className="wave-container top-waves" style={{ color: fillColor }}>
    <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
       <path fill="currentColor" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
       <path fill="currentColor" fillOpacity="0.3" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
       <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>
  </div>
);

// ==========================================
// COMPONENTE ESTRELLAS DE FONDO (REUTILIZADO)
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

export const AboutUsPage = ({ isMobile }: { isMobile: boolean }) => {
  const navigate = useNavigate();
  const [activeStepBtn, setActiveStepBtn] = useState<number | null>(null);

  // LEEMOS EL IDIOMA DESDE LA URL
  const { lang: urlLang } = useParams(); 
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';
  const t = TRANSLATIONS[currentLang];

  // Extraemos solo los iconos para el círculo interactivo
  const stepIconsForCircle = t.howWorkSteps.map((s: any) => s.icon);

  const scrollToTimeline = () => {
    const section = document.getElementById('timeline-section');
    if (section) {
      const y = section.getBoundingClientRect().top + window.pageYOffset - 50;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: BG_DEEP, color: 'white' }}>
      
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <meta name="keywords" content={t.seoKeywords} />
        <meta property="og:title" content={t.seoOgTitle} />
        <meta property="og:description" content={t.seoOgDesc} />
      </Helmet>

      {/* 🟦 1️⃣ HERO (AURORAS) */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}><Canvas camera={{ position: [0, 0, 10], fov: 75 }}><Auroras /></Canvas></div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0, 2, 10, 0.75) 0%, rgba(0, 2, 10, 0.25) 100%)', backdropFilter: 'blur(8px)', zIndex: 1 }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} key={currentLang} style={{ maxWidth: '1100px', textAlign: 'center', position: 'relative', zIndex: 3, padding: '0 20px' }}>
            <h2 style={{ fontSize: isMobile ? '2.2rem' : '4.5rem', fontWeight: 950, lineHeight: 1.1, margin: 0 }}>
                {t.heroTitle1} <br /><span style={{ color: ACCENT_CYAN, textShadow: `0 0 50px ${ACCENT_CYAN}50` }}>{t.heroTitle2}</span>
            </h2>
            <p style={{ fontSize: isMobile ? '1.15rem' : '1.5rem', color: '#e2e8f0', marginTop: '30px', maxWidth: '850px', marginInline: 'auto', fontWeight: 500 }}>{t.heroDesc}</p>
        </motion.div>
        <div onClick={scrollToTimeline} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer', zIndex: 10 }}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ChevronDown color={ACCENT_CYAN} size={40} /></motion.div>
        </div>
      </section>

      {/* 🟦 2️⃣ LÍNEA DE TIEMPO */}
      <section id="timeline-section" style={{ position: 'relative', zIndex: 2 }}>
        <TimelineConstellation isMobile={isMobile} />
      </section>

      {/* 🟦 3️⃣ DIFERENCIADORES (FONDO BLANCO) */}
      <section style={{ padding: isMobile ? '120px 20px' : '180px 60px', backgroundColor: BG_WHITE, position: 'relative' }}>
        <WaveDivider fillColor={BG_DEEP} />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, marginBottom: '60px', color: TEXT_ON_WHITE_MAIN, textAlign: 'center' }}>
                {t.pillarsTitle1} <span style={{ color: ACCENT_GOLD }}>{t.pillarsTitle2}</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '25px' }}>
                {t.pillars.map((item: any, i: number) => (
                    <motion.div key={i} whileHover={{ borderColor: ACCENT_CYAN, y: -5 }} style={{ padding: '35px 25px', backgroundColor: BG_DARK, border: `1px solid ${ACCENT_CYAN}20`, borderRadius: '20px', transition: '0.3s' }}>
                        <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(0, 194, 255, 0.1)', borderRadius: '12px', display: 'inline-block', color: ACCENT_CYAN }}>
                            {React.cloneElement(item.icon, { size: 32 })}
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>{item.title}</h3>
                        <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 🟦 4️⃣ EVOLUCIÓN TÉCNICA */}
      <section style={{ padding: isMobile ? '120px 20px' : '180px 60px', backgroundColor: BG_DARK, position: 'relative' }}>
        <WaveDivider fillColor={BG_WHITE} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '80px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} key={currentLang}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, marginBottom: '30px', lineHeight: 1.1 }}>
                    {t.evoTitle1} <br /><span style={{ color: ACCENT_CYAN }}>{t.evoTitle2}</span>
                </h2>
                <div style={{ width: '60px', height: '4px', backgroundColor: ACCENT_GOLD, marginBottom: '30px', borderRadius: '2px' }} />
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#94a3b8', marginBottom: '20px' }}>{t.evoDesc1}</p>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, fontWeight: 600 }}>{t.evoDesc2}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ borderRadius: '24px', overflow: 'hidden', border: `1px solid ${ACCENT_CYAN}30`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                <img src={resolvePath("assets/evolucion-bg.avif")} alt="Cloud Evolution" style={{ width: '100%', display: 'block' }} />
            </motion.div>
        </div>
      </section>

      {/* 🟦 5️⃣ CÓMO TRABAJAMOS */}
      <section style={{ padding: isMobile ? '80px 20px' : '150px 60px', backgroundColor: BG_WHITE, position: 'relative', overflow: 'hidden' }}>
        <WaveDivider fillColor={BG_DARK} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '80px' }} key={currentLang}>
                <h2 style={{ fontSize: isMobile ? '2.2rem' : '3.5rem', fontWeight: 900, color: TEXT_ON_WHITE_MAIN }}>
                    {t.howWorkTitle1} <br /><span style={{ color: ACCENT_CYAN }}>{t.howWorkTitle2}</span>
                </h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '30px' : '60px', alignItems: 'center' }}>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: isMobile ? '15px' : '20px', width: '100%' }}>
                    {t.howWorkSteps.map((item: any, i: number) => (
                        <motion.div 
                            key={i}
                            onClick={() => setActiveStepBtn(i)}
                            whileHover={{ x: isMobile ? 0 : 10 }}
                            animate={{ 
                                backgroundColor: activeStepBtn === i ? '#001a4d' : '#000c2d', 
                                borderColor: activeStepBtn === i ? ACCENT_CYAN : 'transparent',
                                scale: isMobile && activeStepBtn === i ? 0.98 : 1
                            }}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: isMobile ? '15px' : '25px', 
                                padding: isMobile ? '18px 20px' : '25px 30px', 
                                borderRadius: '16px', 
                                border: '2px solid transparent',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                color: 'white'
                            }}
                        >
                            <div style={{ 
                                width: isMobile ? '45px' : '65px', 
                                height: isMobile ? '45px' : '65px', 
                                backgroundColor: 'rgba(0,194,255,0.1)', 
                                borderRadius: '14px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                color: ACCENT_CYAN,
                                flexShrink: 0
                            }}>
                                {React.cloneElement(item.icon, { size: isMobile ? 24 : 32 })}
                            </div>
                            <div>
                                <h3 style={{ fontSize: isMobile ? '1.1rem' : '1.45rem', fontWeight: 900, margin: 0, lineHeight: 1.2 }}>
                                    <span style={{ color: ACCENT_CYAN, marginRight: '10px' }}>{item.step}</span>
                                    {item.title}
                                </h3>
                                <p style={{ 
                                    margin: '5px 0 0', 
                                    fontSize: isMobile ? '0.9rem' : '1.05rem', 
                                    color: '#94a3b8',
                                    display: isMobile && activeStepBtn !== i ? 'none' : 'block' 
                                }}>
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ flex: 1, width: '100%' }}>
                    <CircuitCircle activeStep={activeStepBtn} stepIcons={stepIconsForCircle} isMobile={isMobile} />
                </div>
                
            </div>
        </div>
    </section>

      {/* 🟦 6️⃣ FILOSOFÍA Y CTA (AHORA CON ESTRELLAS DE FONDO) */}
      <section style={{ padding: isMobile ? '160px 20px' : '200px 20px', backgroundColor: BG_DEEP, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <WaveDivider fillColor={BG_WHITE} />
        
        {/* 👇 ESTRELLAS 3D EN EL FONDO */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <StarryBackground />
          </Canvas>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <h4 style={{ color: ACCENT_GOLD, textTransform: 'uppercase', letterSpacing: '6px', fontWeight: 900, marginBottom: '20px' }}>{t.philosophyLabel}</h4>
            <h2 style={{ fontSize: isMobile ? '2.2rem' : '4rem', fontWeight: 900, marginBottom: '30px' }}>{t.philosophyTitle}</h2>
            <p style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', color: '#94a3b8', marginBottom: '50px' }}>{t.philosophyDesc}</p>
            <motion.button 
                whileHover={{ scale: 1.05 }} onClick={() => navigate(`/${currentLang.toLowerCase()}/contacto`)}
                style={{ backgroundColor: ACCENT_CYAN, color: BG_DARK, fontWeight: 900, padding: '20px 45px', border: 'none', borderRadius: '50px', cursor: 'pointer', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
                {t.ctaBtn} <ArrowRight size={22} />
            </motion.button>
        </div>
      </section>

      <style>{`
        .wave-container { position: absolute; left: 0; width: 100%; height: clamp(80px, 10vw, 150px); overflow: hidden; line-height: 0; z-index: 1; pointer-events: none; }
        .top-waves { top: -1px; }
        .wave-svg { width: 100%; height: 100%; }
      `}</style>
    </div>
  );
};