import React from 'react';
import { motion } from 'framer-motion';
// Importación de íconos de ejemplo (puedes cambiarlos por los de tu librería)
import { Cloud, Terminal, TrendingUp, Shield, Database, Cpu, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

export const AboutUsPage = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* --- SECCIÓN 1: VIDEO HERO (100% Pantalla, sin texto ni filtros) --- */}
      <section style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden', 
        backgroundColor: '#000c2d'
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src={resolvePath('assets/video.mp4')} type="video/mp4" />
        </video>
      </section>

      {/* --- SECCIÓN 2: VANGUARDIA (Fondo Blanco) --- */}
      <section style={{ padding: isMobile ? '80px 20px' : '120px 60px', backgroundColor: '#ffffff', color: '#000c2d' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: '60px', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, marginBottom: '20px', lineHeight: 1.1 }}>
                    En la Vanguardia de la Innovación y <span style={{ color: '#00C2FF' }}>Expertise Tecnológico</span>
                </h2>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#4a5568', marginBottom: '40px' }}>
                    En el diseño de soluciones de software personalizadas, Bocancorp se posiciona como líder y experto en atender las necesidades específicas de corporaciones, ciencia de datos y gestión en la nube.
                </p>
                <button style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#00C2FF', 
                    color: '#000c2d', 
                    fontSize: '1.1rem', 
                    fontWeight: 700, 
                    padding: '16px 32px', 
                    border: 'none', 
                    borderRadius: '50px', 
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(0, 194, 255, 0.2)',
                    transition: 'all 0.3s ease'
                }}>
                    Contáctanos <ArrowRight size={20} />
                </button>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
                style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,12,45,0.1)' }}
            >
                {/* IMAGEN 1 */}
                <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" 
                    alt="Innovación y Expertise Tecnológico" 
                    style={{ width: '100%', display: 'block' }}
                />
            </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN 3: SOBRE NOSOTROS (Fondo Azul Bocancorp) --- */}
      <section style={{ padding: isMobile ? '80px 20px' : '120px 60px', backgroundColor: '#000c2d', color: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr', gap: '60px', alignItems: 'center' }}>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
                style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,194,255,0.2)', order: isMobile ? 2 : 1 }}
            >
                {/* IMAGEN 2 */}
                <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" 
                    alt="Nuestra Historia Cloud" 
                    style={{ width: '100%', display: 'block', opacity: 0.9 }}
                />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ order: isMobile ? 1 : 2 }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, marginBottom: '20px' }}>
                    Sobre <span style={{ color: '#FAA918' }}>Nosotros</span>
                </h2>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#b0b8d1', marginBottom: '20px' }}>
                    Nuestra historia es una crónica de innovación y excelencia que se refleja desde nuestros inicios. Hemos convertido ideas visionarias en soluciones tecnológicas robustas y adaptadas para empresas de todos los rubros, ganando reconocimientos por nuestra gestión creciente y eficiente.
                </p>
                <div style={{ padding: '20px', borderLeft: '4px solid #00C2FF', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '0 8px 8px 0', marginTop: '30px' }}>
                    <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500, color: '#e2e8f0' }}>
                        La nube no es infraestructura. Es arquitectura estratégica diseñada para escalar tu visión con orden.
                    </p>
                </div>
            </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN 4: NUESTRO EQUIPO (Fondo Blanco) --- */}
      <section style={{ padding: isMobile ? '80px 20px' : '120px 60px', backgroundColor: '#f8fafc', color: '#000c2d' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: '60px', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, marginBottom: '20px' }}>
                    Nuestro <span style={{ color: '#00C2FF' }}>Equipo</span>
                </h2>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>
                    Pasión y Profesionalismo en la Vanguardia Tecnológica.
                </h3>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#4a5568' }}>
                    En el centro de nuestra empresa, un equipo de expertos apasionados, altamente certificados y dedicados impulsan nuestra misión. Cada miembro contribuye con una valiosa experiencia en áreas clave como análisis de datos, gestión en la nube y desarrollo de software personalizado.
                </p>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#4a5568', marginTop: '15px' }}>
                    En Bocancorp, la constante capacitación es un pilar fundamental para mantenernos a la vanguardia tecnológica.
                </p>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
                style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            >
                {/* IMAGEN 3 */}
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Equipo Bocancorp" 
                    style={{ width: '100%', display: 'block' }}
                />
            </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN 5: PILARES Y SERVICIOS (Fondo Azul Bocancorp) --- */}
      <section style={{ padding: isMobile ? '80px 20px' : '100px 60px', backgroundColor: '#000c2d', color: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 style={{ fontSize: isMobile ? '2.2rem' : '3rem', fontWeight: 900 }}>
                    Nuestros Pilares <span style={{ color: '#FAA918' }}>Estratégicos</span>
                </h2>
            </motion.div>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
                {[
                    { title: "Arquitectura Cloud", desc: "Diseño resiliente y escalable en entornos AWS y Multicloud.", icon: <Cloud size={40} color="#00C2FF" /> },
                    { title: "DevOps & IaC", desc: "Terraform, automatización y despliegue controlado.", icon: <Terminal size={40} color="#FAA918" /> },
                    { title: "FinOps", desc: "Control financiero y reducción real de desperdicio de recursos.", icon: <TrendingUp size={40} color="#10B981" /> },
                    { title: "Ciberseguridad", desc: "WAF, Prisma Cloud, Panorama, pentesting y hardening.", icon: <Shield size={40} color="#EF4444" /> },
                    { title: "Gobernanza de Datos", desc: "Estructuración y control de activos críticos de tu negocio.", icon: <Database size={40} color="#8B5CF6" /> },
                    { title: "Serverless & IA", desc: "Chatbots inteligentes y arquitecturas sin servidor.", icon: <Cpu size={40} color="#EC4899" /> }
                ].map((val, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        style={{ 
                          padding: '40px 30px', 
                          backgroundColor: 'rgba(255,255,255,0.02)', 
                          borderRadius: '16px', 
                          border: `1px solid rgba(255,255,255,0.1)`, 
                          transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{ marginBottom: '20px' }}>{val.icon}</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', fontWeight: 700 }}>{val.title}</h3>
                        <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.95rem' }}>{val.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* --- SECCIÓN 6: METODOLOGÍA Y EXPERIENCIA (Fondo Blanco) --- */}
      <section style={{ padding: isMobile ? '80px 20px' : '120px 60px', backgroundColor: '#ffffff', color: '#000c2d' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr', gap: '60px', alignItems: 'center' }}>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
                style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            >
                {/* IMAGEN 4 */}
                <img 
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" 
                    alt="Metodología y Modalidad" 
                    style={{ width: '100%', display: 'block' }}
                />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '25px', color: '#0f172a' }}>
                    Metodología y <span style={{ color: '#00C2FF' }}>Modalidad</span>
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#4a5568', marginBottom: '30px' }}>
                    Nos integramos a tu empresa bajo una modalidad <b>white-label</b> o trabajando codo a codo con tus equipos internos. Mantenemos una estructura metodológica clara:
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
                    {[
                        "Diagnóstico Cloud y FinOps",
                        "Diseño de Arquitectura y Seguridad",
                        "Implementación Técnica Controlada",
                        "Optimización y Gobierno Continuo"
                    ].map((step, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <CheckCircle2 color="#FAA918" size={24} />
                            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155' }}>{step}</span>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <Building color="#00C2FF" size={28} style={{ marginBottom: '10px' }} />
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#0f172a' }}>Facturación Local</h4>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Acompañamiento a startups y empresas.</p>
                    </div>
                </div>
            </motion.div>

        </div>
      </section>

    </div>
  );
};