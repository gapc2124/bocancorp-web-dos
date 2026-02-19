import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Server, Terminal, Shield, TrendingUp, ChevronDown, ArrowRight, Search, PenTool, Rocket, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';

// IMPORTAMOS LA CONSTELACIÓN Y LAS AURORAS
import { TimelineConstellation } from './components/TimelineConstellation'; 
import { Auroras } from './components/Auroras'; 

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

const BG_DARK = '#000c2d';
const BG_DEEP = '#00020a';
const BG_WHITE = '#ffffff';
const TEXT_ON_WHITE_MAIN = '#0f172a';
const TEXT_ON_WHITE_SUB = '#475569';
const ACCENT_CYAN = '#00C2FF';
const ACCENT_GOLD = '#FAA918';

const WaveDivider = ({ fillColor }: { fillColor: string }) => (
  <div className="wave-container top-waves" style={{ color: fillColor }}>
    <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
       <path fill="currentColor" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
       <path fill="currentColor" fillOpacity="0.3" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
       <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>
  </div>
);

export const AboutUsPage = ({ isMobile }: { isMobile: boolean }) => {
  const navigate = useNavigate();

  const scrollToTimeline = () => {
    const constellationSection = document.getElementById('timeline-section');
    const yOffset = -50;
    if (constellationSection) {
      const y = constellationSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: BG_DEEP, color: 'white' }}>
      
      {/* ==========================================
          🟦 1️⃣ BLOQUE: IDENTIDAD SOBRE AURORAS (HERO)
          ========================================== */}
      <section style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden', 
        backgroundColor: BG_DEEP,
        paddingTop: isMobile ? '60px' : '100px' 
      }}>
        
        {/* CAPA 1: FONDO DE AURORAS 3D */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <Auroras />
          </Canvas>
        </div>

        {/* CAPA 2: FOG AJUSTADO (Reducido ligeramente para dar profundidad) */}
        <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            // Gradiente equilibrado
            background: 'radial-gradient(circle at center, rgba(0, 2, 10, 0.75) 0%, rgba(0, 2, 10, 0.25) 100%)',
            // Difuminado reducido a 8px para que las auroras respiren un poco más
            backdropFilter: 'blur(8px)', 
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 1 
        }} />

        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '25%', background: `linear-gradient(to bottom, transparent, ${BG_DEEP})`, zIndex: 2 }} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 3, padding: '0 20px' }}
        >
            <h2 style={{ 
                fontSize: isMobile ? '2.2rem' : '4rem', 
                fontWeight: 950, 
                lineHeight: 1.1, 
                margin: 0, 
                color: '#ffffff', 
                textShadow: '0 4px 30px rgba(0,0,0,0.9)' 
            }}>
                Arquitectura Cloud con <br />
                <span style={{ 
                    color: ACCENT_CYAN, 
                    textShadow: `0 0 50px ${ACCENT_CYAN}50` 
                }}>
                    criterio empresarial.
                </span>
            </h2>

            <div style={{ marginTop: '30px', maxWidth: '850px', margin: '30px auto 0' }}>
                <p style={{ 
                    fontSize: isMobile ? '1.15rem' : '1.45rem', 
                    color: '#e2e8f0', 
                    marginBottom: '40px', 
                    lineHeight: 1.6, 
                    textShadow: '0 2px 15px rgba(0,0,0,0.9)',
                    fontWeight: 500
                }}>
                    En Bocancorp diseñamos arquitecturas Cloud modernas que integran infraestructura, seguridad, automatización y gobierno financiero.
                </p>
                <div style={{ 
                    display: 'inline-block', 
                    padding: isMobile ? '15px 20px' : '25px 50px', 
                    backgroundColor: 'rgba(0, 194, 255, 0.05)', 
                    border: `1px solid ${ACCENT_CYAN}30`, 
                    borderRadius: '20px', 
                    backdropFilter: 'blur(10px)', 
                    boxShadow: '0 10px 40px rgba(0,0,0,0.6)' 
                }}>
                    <p style={{ fontSize: isMobile ? '1.1rem' : '1.35rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                        No somos implementadores aislados: construimos ecosistemas tecnológicos preparados para crecer.
                    </p>
                </div>
            </div>
        </motion.div>

        <div 
            onClick={scrollToTimeline}
            style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', zIndex: 10 }}
        >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronDown color={ACCENT_CYAN} size={40} />
            </motion.div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN CONSTELACIÓN (Línea de tiempo)
          ========================================== */}
      <section id="timeline-section" style={{ backgroundColor: BG_DEEP, position: 'relative', zIndex: 2 }}>
        <TimelineConstellation isMobile={isMobile} />
      </section>

      {/* ==========================================
          🟦 2️⃣ BLOQUE: QUÉ NOS DIFERENCIA (FONDO BLANCO)
          ========================================== */}
      <section style={{ padding: isMobile ? '120px 20px' : '180px 60px', backgroundColor: BG_WHITE, position: 'relative' }}>
        <WaveDivider fillColor={BG_DEEP} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, marginBottom: '60px', color: TEXT_ON_WHITE_MAIN, textAlign: 'center' }}>
                    Lo que nos <span style={{ color: ACCENT_GOLD }}>define</span>
                </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '25px' }}>
                {[
                    { title: "Especialización real en entornos productivos", desc: "Trabajamos con infraestructura crítica, seguridad Cloud y optimización financiera.", icon: <Server size={32} color={ACCENT_CYAN} /> },
                    { title: "Enfoque moderno", desc: "Infraestructura como Código, serverless, automatización y arquitectura multicloud.", icon: <Terminal size={32} color={ACCENT_CYAN} /> },
                    { title: "Seguridad integrada desde el diseño", desc: "WAF, Prisma Cloud, pentesting y buenas prácticas.", icon: <Shield size={32} color={ACCENT_CYAN} /> },
                    { title: "Mentalidad empresarial", desc: "Entendemos presupuesto, escalabilidad y retorno de inversión.", icon: <TrendingUp size={32} color={ACCENT_CYAN} /> }
                ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        style={{ padding: '30px 25px', backgroundColor: BG_DARK, border: `1px solid ${ACCENT_CYAN}30`, borderRadius: '20px', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                        whileHover={{ borderColor: ACCENT_CYAN, y: -5, boxShadow: `0 15px 35px rgba(0, 12, 45, 0.3)` }}
                    >
                        <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(0, 194, 255, 0.1)', borderRadius: '12px', border: `1px solid ${ACCENT_CYAN}40` }}>
                            {item.icon}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', color: '#ffffff', lineHeight: 1.3 }}>{item.title}</h3>
                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#94a3b8', margin: 0 }}>{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* ==========================================
          🟦 3️⃣ BLOQUE: NUESTRA EVOLUCIÓN
          ========================================== */}
      <section style={{ padding: isMobile ? '120px 20px' : '180px 60px', backgroundColor: BG_DARK, position: 'relative' }}>
        <WaveDivider fillColor={BG_WHITE} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '80px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, marginBottom: '30px', lineHeight: 1.1, color: '#ffffff' }}>
                    Evolución técnica y <br /><span style={{ color: ACCENT_CYAN }}>enfoque estratégico</span>
                </h2>
                <div style={{ width: '60px', height: '4px', backgroundColor: ACCENT_GOLD, marginBottom: '30px', borderRadius: '2px' }} />
                
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#94a3b8', marginBottom: '20px' }}>
                    Nuestra experiencia comenzó con implementaciones en AWS y ha evolucionado hacia arquitecturas multicloud, gobierno de datos y soluciones serverless.
                </p>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#ffffff', fontWeight: 600 }}>
                    Hoy integramos seguridad, automatización y optimización financiera como parte del diseño, no como elementos posteriores.
                </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: `1px solid ${ACCENT_CYAN}30`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
            >
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80" alt="Cloud Evolution" style={{ width: '100%', display: 'block' }} />
            </motion.div>
        </div>
      </section>

      {/* ==========================================
          🟦 4️⃣ BLOQUE: CÓMO TRABAJAMOS (AJUSTADO A HORIZONTAL EN DESKTOP)
          ========================================== */}
      <section style={{ padding: isMobile ? '120px 20px' : '180px 60px', backgroundColor: BG_WHITE, position: 'relative' }}>
        <WaveDivider fillColor={BG_DARK} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            
            {/* TÍTULO CENTRALIZADO EN DESKTOP PARA MEJORAR LAYOUT HORIZONTAL */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: isMobile ? 'left' : 'center', marginBottom: '60px' }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, color: TEXT_ON_WHITE_MAIN, lineHeight: 1.1 }}>
                    Cómo construimos <br /><span style={{ color: ACCENT_CYAN }}>arquitectura moderna</span>
                </h2>
            </motion.div>

            {/* CONTENEDOR FLEX: HORIZONTAL EN DESKTOP, VERTICAL EN MÓVIL */}
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '40px', alignItems: 'stretch' }}>
                
                {/* LISTA DE PASOS */}
                <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                    {[
                        { step: "01", text: "Diagnóstico técnico y financiero.", icon: <Search size={28} color={ACCENT_CYAN} /> },
                        { step: "02", text: "Diseño estructurado.", icon: <PenTool size={28} color={ACCENT_CYAN} /> },
                        { step: "03", text: "Implementación controlada.", icon: <Rocket size={28} color={ACCENT_CYAN} /> },
                        { step: "04", text: "Optimización continua.", icon: <ShieldCheck size={28} color={ACCENT_CYAN} /> }
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', backgroundColor: 'rgba(0,194,255,0.05)', borderRadius: '16px', border: `1px solid ${ACCENT_CYAN}30` }}>
                            <div style={{ backgroundColor: `${ACCENT_CYAN}15`, padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: TEXT_ON_WHITE_MAIN, margin: 0 }}>
                                    <span style={{ color: ACCENT_CYAN, marginRight: '15px' }}>{item.step}</span>
                                    {item.text}
                                </h3>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* IMAGEN REPRESENTATIVA */}
                <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: 1, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80" alt="Tech Architecture" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </motion.div>
                
            </div>
        </div>
      </section>

      {/* ==========================================
          🟦 5️⃣ BLOQUE: FILOSOFÍA Y CTA
          ========================================== */}
      <section style={{ padding: isMobile ? '160px 20px 200px' : '220px 20px 260px', backgroundColor: BG_DEEP, textAlign: 'center', position: 'relative' }}>
        <WaveDivider fillColor={BG_WHITE} />

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                
                <h4 style={{ 
                    color: ACCENT_GOLD, textTransform: 'uppercase', letterSpacing: '6px', 
                    fontWeight: 900, marginBottom: '30px', fontSize: isMobile ? '1.8rem' : '2.5rem'
                }}>
                    Nuestro Principio
                </h4>

                <h2 style={{ fontSize: isMobile ? '2.5rem' : '4.5rem', fontWeight: 900, lineHeight: 1.1, color: '#ffffff', marginBottom: '30px' }}>
                    La nube no debe ser compleja ni incierta.
                </h2>
                <p style={{ fontSize: isMobile ? '1.2rem' : '1.6rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '60px' }}>
                    Debe ser una ventaja estratégica, construida con disciplina técnica y visión empresarial.<br />
                    <span style={{ color: '#ffffff', fontWeight: 700, display: 'inline-block', marginTop: '15px' }}>Minimalista. Fuerte. Profesional.</span>
                </p>
                
                <button 
                    onClick={() => navigate('/contacto')}
                    style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '12px', 
                        backgroundColor: ACCENT_CYAN, color: BG_DARK, 
                        fontSize: isMobile ? '1.1rem' : '1.3rem', fontWeight: 900, padding: '20px 45px', 
                        border: 'none', borderRadius: '50px', cursor: 'pointer', 
                        boxShadow: `0 15px 35px ${ACCENT_CYAN}40`, transition: 'all 0.3s ease' 
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = ACCENT_CYAN;
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    ¿Listo para que tu proyecto alcance las estrellas? <ArrowRight size={24} />
                </button>
            </motion.div>
        </div>
      </section>

      {/* ESTILOS GLOBALES */}
      <style>{`
        .wave-container { position: absolute; left: 0; width: 100%; height: clamp(80px, 10vw, 150px); overflow: hidden; line-height: 0; z-index: 1; pointer-events: none; }
        .top-waves { top: -1px; }
        .wave-svg { width: 100%; height: 100%; }
        .wave-anim-slow { animation: sway 8s ease-in-out infinite alternate; }
        .wave-anim-medium { animation: sway 10s ease-in-out infinite alternate-reverse; }
        .wave-anim-fast { animation: sway 6s ease-in-out infinite alternate; }
        @keyframes sway { 0% { transform: scaleY(1); } 100% { transform: scaleY(1.15); } }
      `}</style>
    </div>
  );
};