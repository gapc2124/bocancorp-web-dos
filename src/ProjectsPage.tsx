import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Bot, CloudUpload, LayoutDashboard, Cpu, BarChart3, ArrowRight, ChevronDown } from 'lucide-react';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// ==========================================
// 1. DATOS DE EMPRESAS (CASOS DE ÉXITO) CON LOREM IPSUM
// ==========================================
const COMPANY_PROJECTS = [
  { 
    id: 'miranda', name: 'Miranda', color: '#FFFFFF', 
    img: 'assets/Miranda.png', 
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' 
  },
  { 
    id: 'myintelli', name: 'MyIntelli', color: '#33BEFF', 
    img: 'assets/MyIntelli.png', 
    desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.' 
  },
  { 
    id: 'datecsa', name: 'DATECSA', color: '#FF3333', 
    img: 'assets/DateCSA.png', 
    desc: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' 
  },
  { 
    id: 'ruedaverde', name: 'RuedaVerde', color: '#00ff88', 
    img: 'assets/RuedaVerde.png', 
    desc: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.' 
  },
  { 
    id: 'tuulapp', name: 'TuulApp', color: '#aa00ff', 
    img: 'assets/tuulapp.png', 
    desc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.' 
  },
  { 
    id: 'ingram', name: 'Ingram', color: '#2952ff', 
    img: 'assets/Ingram.png', 
    desc: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod.' 
  }
];

// ==========================================
// 2. DATOS DE DEMANDAS DEL MERCADO
// ==========================================
const POPULAR_PROJECTS = [
    { id: 'ecommerce', title: 'E-commerce de Alto Rendimiento', desc: 'Aplicaciones escalables preparadas para picos de tráfico masivos.', icon: <ShoppingCart size={32} color="#00C2FF" /> },
    { id: 'chatbot', title: 'Chatbots con IA Generativa', desc: 'Asistentes avanzados integrados a CRM y WhatsApp.', icon: <Bot size={32} color="#FAA918" /> },
    { id: 'cloud', title: 'Migración y Arquitectura Cloud', desc: 'Modernización de sistemas legados y optimización de costos.', icon: <CloudUpload size={32} color="#00ff8c" /> },
    { id: 'saas', title: 'Plataformas SaaS B2B', desc: 'Desarrollo de software a medida con facturación recurrente.', icon: <LayoutDashboard size={32} color="#ff007a" /> },
    { id: 'rpa', title: 'Automatización de Procesos', desc: 'Eliminación de tareas manuales mediante flujos controlados.', icon: <Cpu size={32} color="#aa00ff" /> },
    { id: 'data', title: 'Business Intelligence y Data', desc: 'Dashboards interactivos para toma de decisiones basada en métricas.', icon: <BarChart3 size={32} color="#33BEFF" /> }
];

// ==========================================
// 3. SUBCOMPONENTE: TARJETA GIRATORIA (FLIP CARD)
// ==========================================
const FlipCard = ({ project, isMobile }: { project: any, isMobile: boolean }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const faceStyle: React.CSSProperties = {
    position: 'absolute', width: '100%', height: '100%',
    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
    borderRadius: '24px', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px' : '30px',
    border: `1px solid ${project.color}50`,
    background: 'rgba(20, 20, 30, 0.6)',
    backdropFilter: 'blur(12px)',
    boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
  };

  return (
    <div 
        style={{ width: '100%', height: isMobile ? '350px' : '400px', perspective: '1000px', cursor: 'pointer' }} 
        onClick={() => setIsFlipped(!isFlipped)}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        
        {/* CARA FRONTAL (LOGO) */}
        <div style={{ ...faceStyle }}>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={resolvePath(project.img)} alt={project.name} style={{ maxWidth: '70%', maxHeight: '60%', objectFit: 'contain' }} />
          </div>
          <p style={{ marginTop: '15px', color: project.color, fontWeight: '800', fontSize: '0.9rem', letterSpacing: '2px', textAlign: 'center', opacity: 0.8 }}>
              CLICK PARA DETALLES ↻
          </p>
        </div>

        {/* CARA TRASERA (INFORMACIÓN) */}
        <div style={{ ...faceStyle, transform: 'rotateY(180deg)', background: '#000c2d', border: `1px solid ${project.color}` }}>
          <h3 style={{ color: project.color, fontSize: '1.8rem', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 900, textAlign: 'center' }}>
              {project.name}
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#94a3b8', textAlign: 'center', margin: 0 }}>
              {project.desc}
          </p>
        </div>

      </div>
    </div>
  );
};


// ==========================================
// 4. COMPONENTE PRINCIPAL: PROJECTS PAGE
// ==========================================
export const ProjectsPage = ({ isMobile }: { isMobile: boolean }) => {
  const navigate = useNavigate();
  const projectsRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#00020a', color: '#ffffff' }}>
      
      {/* ==========================================
          HERO DE VIDEO (SIN TÍTULO SOBRE EL VIDEO)
          ========================================== */}
      <section style={{ position: 'relative', width: '100%', backgroundColor: '#000', overflow: 'hidden' }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.8 }}>
          <source src={resolvePath('assets/video.mp4')} type="video/mp4" />
        </video>
        
        {/* Gradiente inferior para fundir el video con la siguiente sección */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to bottom, transparent 0%, #00020a 100%)', zIndex: 1, pointerEvents: 'none' }} />

        {/* Botón de Scroll animado */}
        <div onClick={scrollToProjects} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#ffffff', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px', fontWeight: 700 }}>Ver Proyectos</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronDown color="#00C2FF" size={40} />
            </motion.div>
        </div>
      </section>

      {/* ==========================================
          NUEVA SECCIÓN: CUADRÍCULA CASOS DE ÉXITO (2x3)
          ========================================== */}
      <section ref={projectsRef} style={{ padding: isMobile ? '80px 20px' : '140px 60px', backgroundColor: '#00020a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h4 style={{ color: '#FAA918', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 800, marginBottom: '15px' }}>
                    Casos de Éxito
                </h4>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.8rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                    Alianzas <span style={{ color: '#00C2FF' }}>Estratégicas</span>
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginTop: '20px', maxWidth: '700px', margin: '20px auto 0' }}>
                    Empresas de talla internacional que han confiado en nosotros para escalar su infraestructura y operaciones.
                </p>
            </motion.div>

            {/* CUADRÍCULA 2 x 3 DE TARJETAS GIRATORIAS */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '30px' : '50px' }}>
                {COMPANY_PROJECTS.map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                        <FlipCard project={project} isMobile={isMobile} />
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN DEMANDAS DEL MERCADO
          ========================================== */}
      <section style={{ padding: isMobile ? '80px 20px' : '140px 60px', backgroundColor: '#000c2d', position: 'relative' }}>
         {/* Transición curva sutil arriba */}
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(to bottom, #00020a 0%, transparent 100%)', pointerEvents: 'none' }} />

         <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h4 style={{ color: '#FAA918', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>
                    Demandas del Mercado
                </h4>
                <h2 style={{ fontSize: isMobile ? '2.2rem' : '3.2rem', fontWeight: 900 }}>
                    Soluciones <span style={{ color: '#00C2FF' }}>Más Solicitadas</span>
                </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
                {POPULAR_PROJECTS.map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                        style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,194,255,0.1)', borderRadius: '20px', padding: '40px 30px' }}
                        whileHover={{ y: -10, borderColor: '#00C2FF', backgroundColor: 'rgba(0,194,255,0.05)', boxShadow: '0 15px 30px rgba(0,194,255,0.1)' }}
                    >
                        <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: 'rgba(0,2,10,0.5)', borderRadius: '14px', display: 'inline-block' }}>
                            {project.icon}
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '15px' }}>{project.title}</h3>
                        <p style={{ fontSize: '1rem', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>{project.desc}</p>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* ==========================================
          CTA FINAL
          ========================================== */}
      <section style={{ padding: isMobile ? '100px 20px' : '160px 20px', backgroundColor: '#00020a', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(to bottom, #000c2d 0%, transparent 100%)', pointerEvents: 'none' }} />

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: isMobile ? '2.2rem' : '3.5rem', fontWeight: 900, marginBottom: '30px' }}>
                  Tu empresa podría ser nuestra próxima <span style={{ color: '#FAA918' }}>gran estrella.</span>
              </h2>
              <p style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', color: '#94a3b8', marginBottom: '50px', maxWidth: '800px', margin: '0 auto 50px' }}>
                  Cuéntanos tus desafíos técnicos y diseñaremos la arquitectura perfecta para superarlos.
              </p>
              <button 
                  onClick={() => navigate('/contacto')} 
                  style={{ 
                      display: 'inline-flex', alignItems: 'center', backgroundColor: '#00C2FF', color: '#000c2d', 
                      fontSize: '1.1rem', fontWeight: 800, padding: '20px 45px', border: 'none', 
                      borderRadius: '50px', cursor: 'pointer', transition: 'all 0.3s ease',
                      boxShadow: '0 10px 30px rgba(0,194,255,0.3)'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#00C2FF'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                  Iniciar mi proyecto <ArrowRight size={20} style={{ marginLeft: '10px' }} />
              </button>
          </motion.div>
      </section>
    </div>
  );
};