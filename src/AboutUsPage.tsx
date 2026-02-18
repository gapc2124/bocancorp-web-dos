import React, { useRef } from 'react';
import { motion } from 'framer-motion';
// Íconos actualizados y nuevos
import { Server, Terminal, Shield, TrendingUp, ChevronDown, CheckCircle2, ArrowRight, Search, PenTool, Rocket, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// --- COLORES CONSTANTES ---
const BG_DARK = '#000c2d';
const BG_WHITE = '#ffffff';
const TEXT_ON_WHITE_MAIN = '#0f172a';
const TEXT_ON_WHITE_SUB = '#475569';
const ACCENT_CYAN = '#00C2FF';
const ACCENT_GOLD = '#FAA918';

// Componente reutilizable para las ondas de transición
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
  const textSectionRef = useRef<HTMLDivElement>(null);

  const scrollToText = () => {
    const yOffset = -80; 
    const element = textSectionRef.current;
    if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: BG_DARK, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* ==========================================
          HERO VIDEO
          ========================================== */}
      <section style={{ position: 'relative', width: '100%', backgroundColor: '#000', overflow: 'hidden' }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.7 }}>
          <source src={resolvePath('assets/video.mp4')} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: `linear-gradient(to bottom, transparent 0%, ${BG_DARK} 100%)`, zIndex: 1, pointerEvents: 'none' }} />

        <div onClick={scrollToText} style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', zIndex: 10, padding: '10px' }}>
            <span style={{ color: '#ffffff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px', fontWeight: 600 }}>Ver más</span>
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                <ChevronDown color={ACCENT_CYAN} size={36} />
            </motion.div>
        </div>
      </section>

      {/* ==========================================
          1️⃣ BLOQUE: DECLARACIÓN DE IDENTIDAD (AZUL OSCURO)
          ========================================== */}
      <section ref={textSectionRef} style={{ padding: isMobile ? '80px 20px 120px' : '120px 60px 180px', backgroundColor: BG_DARK, position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h4 style={{ color: ACCENT_GOLD, textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 700, marginBottom: '20px' }}>Arquitectura Cloud con criterio empresarial</h4>
            <h2 style={{ fontSize: isMobile ? '2.2rem' : '3.8rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '40px', letterSpacing: '-1px', color: '#ffffff' }}>
                Más que proveedores, somos su <br />
                <span style={{ color: ACCENT_CYAN, textShadow: '0 0 30px rgba(0, 194, 255, 0.4)' }}>Aliado de Innovación Tecnológica.</span>
            </h2>
            <p style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', lineHeight: 1.8, color: '#94a3b8', marginBottom: '25px' }}>
                Bocancorp es una corporación norteamericana con centros de operaciones estratégicos en Colombia y Perú. Nos especializamos en orquestar soluciones tecnológicas complejas para empresas que buscan escalabilidad y seguridad.
            </p>
            <p style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', lineHeight: 1.8, color: '#94a3b8', marginBottom: '35px' }}>
                A diferencia de las fábricas de software tradicionales, nuestro ADN es Multi-Cloud. Combinamos la ingeniería de Desarrollo Web y Móvil con la potencia de AWS, Google Cloud, Azure y Oracle.
            </p>
            <div style={{ display: 'inline-block', padding: '20px 30px', backgroundColor: 'rgba(0, 194, 255, 0.05)', border: `1px solid ${ACCENT_CYAN}40`, borderRadius: '16px' }}>
                <p style={{ fontSize: isMobile ? '1.15rem' : '1.3rem', lineHeight: 1.6, color: '#ffffff', margin: 0, fontWeight: 700 }}>
                    No somos implementadores aislados: construimos ecosistemas tecnológicos preparados para crecer.
                </p>
            </div>
        </motion.div>
      </section>

      {/* ==========================================
          2️⃣ BLOQUE: QUÉ NOS DIFERENCIA (BLANCO CON TARJETAS AZULES)
          ========================================== */}
      <section style={{ padding: isMobile ? '120px 20px' : '180px 60px', backgroundColor: BG_WHITE, position: 'relative' }}>
        <WaveDivider fillColor={BG_DARK} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, marginBottom: '60px', color: TEXT_ON_WHITE_MAIN, textAlign: 'center' }}>
                    Lo que nos <span style={{ color: ACCENT_GOLD }}>define</span>
                </h2>
            </motion.div>

            {/* 4 COLUMNAS EN UNA FILA (En desktop) */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '25px' }}>
                {[
                    { title: "Especialización real", desc: "Trabajamos con infraestructura crítica, seguridad Cloud y optimización financiera.", icon: <Server size={32} color={ACCENT_CYAN} /> },
                    { title: "Enfoque moderno", desc: "Infraestructura como Código, serverless, automatización y arquitectura multicloud.", icon: <Terminal size={32} color={ACCENT_CYAN} /> },
                    { title: "Seguridad integrada", desc: "WAF, Prisma Cloud, pentesting y aplicación estricta de buenas prácticas.", icon: <Shield size={32} color={ACCENT_CYAN} /> },
                    { title: "Mentalidad empresarial", desc: "Entendemos de presupuesto, escalabilidad y retorno de inversión.", icon: <TrendingUp size={32} color={ACCENT_CYAN} /> }
                ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        style={{ 
                            padding: '30px 25px', 
                            backgroundColor: '#000c2d', // Tarjetas en fondo azul
                            border: `1px solid ${ACCENT_CYAN}30`, 
                            borderRadius: '20px', 
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}
                        whileHover={{ borderColor: ACCENT_CYAN, y: -5, boxShadow: `0 15px 35px rgba(0, 12, 45, 0.3)` }}
                    >
                        <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(0, 194, 255, 0.1)', borderRadius: '12px', border: `1px solid ${ACCENT_CYAN}40` }}>
                            {item.icon}
                        </div>
                        {/* Textos en blanco para contrastar con la tarjeta azul */}
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', color: '#ffffff', lineHeight: 1.3 }}>{item.title}</h3>
                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#94a3b8', margin: 0 }}>{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* ==========================================
          3️⃣ BLOQUE: NUESTRA EVOLUCIÓN (AZUL OSCURO)
          ========================================== */}
      <section style={{ padding: isMobile ? '120px 20px' : '180px 60px', backgroundColor: BG_DARK, position: 'relative' }}>
        <WaveDivider fillColor={BG_WHITE} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '80px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h4 style={{ color: ACCENT_GOLD, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '15px' }}>Evolución técnica y enfoque estratégico</h4>
                <h2 style={{ fontSize: isMobile ? '2.2rem' : '3.2rem', fontWeight: 900, marginBottom: '25px', lineHeight: 1.1, color: '#ffffff' }}>
                    Consultoría <br /><span style={{ color: ACCENT_CYAN }}>Multi-Cloud & FinOps</span>
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    {[
                        { title: "Gestión de Créditos Cloud", desc: "Apalancamiento financiero para startups y empresas en expansión." },
                        { title: "Estrategia FinOps", desc: "Auditoría de costos y optimización de recursos para maximizar su ROI." },
                        { title: "Backup & Disaster Recovery", desc: "Automatización de respaldos para garantizar la continuidad operativa." }
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <CheckCircle2 color={ACCENT_GOLD} size={24} style={{ flexShrink: 0, marginTop: '5px' }} />
                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.5 }}>
                                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '2px' }}>{item.title}</strong> 
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: `1px solid ${ACCENT_CYAN}30`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
            >
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80" alt="Cloud Network" style={{ width: '100%', display: 'block' }} />
            </motion.div>
        </div>
      </section>

      {/* ==========================================
          4️⃣ BLOQUE: CÓMO TRABAJAMOS (BLANCO) CON ÍCONOS
          ========================================== */}
      <section style={{ padding: isMobile ? '120px 20px' : '180px 60px', backgroundColor: BG_WHITE, position: 'relative' }}>
        <WaveDivider fillColor={BG_DARK} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', gap: '80px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: 1 }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, color: TEXT_ON_WHITE_MAIN, marginBottom: '40px', lineHeight: 1.1 }}>
                    Cómo construimos <br /><span style={{ color: ACCENT_CYAN }}>arquitectura moderna</span>
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                        { step: "01", title: "Diagnóstico", desc: "Evaluación técnica y financiera profunda.", icon: <Search size={28} color={ACCENT_CYAN} /> },
                        { step: "02", title: "Diseño", desc: "Estructuración de arquitectura y seguridad.", icon: <PenTool size={28} color={ACCENT_CYAN} /> },
                        { step: "03", title: "Implementación", desc: "Despliegue técnico controlado (IaC).", icon: <Rocket size={28} color={ACCENT_CYAN} /> },
                        { step: "04", title: "Gobierno", desc: "Optimización continua y monitoreo FinOps.", icon: <ShieldCheck size={28} color={ACCENT_CYAN} /> }
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
                            {/* Ícono de metodología */}
                            <div style={{ backgroundColor: `${ACCENT_CYAN}15`, padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: TEXT_ON_WHITE_MAIN, margin: '0 0 5px 0' }}>
                                    <span style={{ color: ACCENT_CYAN, marginRight: '10px' }}>{item.step}</span>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '1rem', color: TEXT_ON_WHITE_SUB, margin: 0 }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ flex: 1, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80" alt="Tech Architecture" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </motion.div>
        </div>
      </section>

      {/* ==========================================
          5️⃣ BLOQUE: FILOSOFÍA Y CTA (AZUL OSCURO)
          ========================================== */}
      <section style={{ padding: isMobile ? '160px 20px 200px' : '220px 20px 260px', backgroundColor: BG_DARK, textAlign: 'center', position: 'relative' }}>
        <WaveDivider fillColor={BG_WHITE} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <h4 style={{ color: ACCENT_GOLD, textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 800, marginBottom: '25px' }}>Nuestro Principio</h4>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '4.5rem', fontWeight: 900, lineHeight: 1.1, color: '#ffffff', marginBottom: '30px' }}>La nube no debe ser compleja ni incierta.</h2>
                <p style={{ fontSize: isMobile ? '1.2rem' : '1.6rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '60px' }}>
                    Debe ser una ventaja estratégica, construida con disciplina técnica y visión empresarial. <span style={{ color: '#ffffff', fontWeight: 700 }}>Minimalista. Fuerte. Profesional.</span>
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