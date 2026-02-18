import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart, Bot, CloudUpload, LayoutDashboard, Cpu, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// IMPORTAMOS LA CONSTELACIÓN
import { TimelineConstellation } from './components/TimelineConstellation'; 

// DATOS: PROYECTOS MÁS SOLICITADOS
const POPULAR_PROJECTS = [
  {
    id: 'ecommerce',
    title: 'E-commerce de Alto Rendimiento',
    desc: 'Aplicaciones web escalables preparadas para picos de tráfico masivos, pasarelas de pago seguras y gestión de inventario en tiempo real.',
    icon: <ShoppingCart size={32} color="#00C2FF" />
  },
  {
    id: 'chatbot',
    title: 'Chatbots con IA Generativa',
    desc: 'Asistentes virtuales avanzados (LLMs) integrados a tu CRM, WhatsApp y web corporativa para automatizar la atención al cliente 24/7.',
    icon: <Bot size={32} color="#FAA918" />
  },
  {
    id: 'cloud',
    title: 'Migración y Arquitectura Cloud',
    desc: 'Llevamos tu infraestructura tradicional a la nube (AWS, GCP, Azure), modernizando sistemas legados y optimizando costos operativos.',
    icon: <CloudUpload size={32} color="#00ff8c" />
  },
  {
    id: 'saas',
    title: 'Plataformas SaaS B2B',
    desc: 'Desarrollo de software a medida (Software as a Service) con panel de administración, roles de usuario y facturación recurrente.',
    icon: <LayoutDashboard size={32} color="#ff007a" />
  },
  {
    id: 'rpa',
    title: 'Automatización de Procesos',
    desc: 'Eliminación de tareas operativas manuales y repetitivas conectando tus sistemas internos mediante scripts y flujos controlados.',
    icon: <Cpu size={32} color="#aa00ff" />
  },
  {
    id: 'data',
    title: 'Business Intelligence y Data',
    desc: 'Centralización de datos empresariales en dashboards interactivos y Data Lakes para facilitar la toma de decisiones basada en métricas.',
    icon: <BarChart3 size={32} color="#33BEFF" />
  }
];

export const ProjectsPage = ({ isMobile }: { isMobile: boolean }) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#00020a', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* ==========================================
          1. LÍNEA DE TIEMPO INTERACTIVA (LA CONSTELACIÓN COMO HERO)
          ========================================== */}
      {/* Al quitar el Hero antiguo, la constelación asume el protagonismo total de la entrada */}
      <TimelineConstellation isMobile={isMobile} />

      {/* ==========================================
          2. PROYECTOS MÁS SOLICITADOS (Grid Moderno)
          ========================================== */}
      <section style={{ padding: isMobile ? '80px 20px 100px' : '120px 60px 160px', backgroundColor: '#000c2d', position: 'relative' }}>
        
        {/* Onda conectora */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(to bottom, #00020a 0%, transparent 100%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h4 style={{ color: '#FAA918', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800, marginBottom: '15px' }}>
                    Demandas del Mercado
                </h4>
                <h2 style={{ fontSize: isMobile ? '2.2rem' : '3.2rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                    Soluciones <span style={{ color: '#00C2FF' }}>Más Solicitadas</span>
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginTop: '20px', maxWidth: '700px', margin: '20px auto 0' }}>
                    Estos son los desarrollos clave que las empresas modernas nos confían para escalar sus operaciones y dominar su sector.
                </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
                {POPULAR_PROJECTS.map((project, index) => (
                    <motion.div 
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: index * 0.1 }}
                        style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                            border: '1px solid rgba(0, 194, 255, 0.1)', 
                            borderRadius: '20px', 
                            padding: '40px 30px',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}
                        whileHover={{ 
                            y: -10, 
                            borderColor: '#00C2FF',
                            backgroundColor: 'rgba(0, 194, 255, 0.05)',
                            boxShadow: '0 15px 30px rgba(0, 194, 255, 0.1)'
                        }}
                    >
                        <div style={{ padding: '15px', backgroundColor: 'rgba(0, 2, 10, 0.5)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '25px' }}>
                            {project.icon}
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '15px', lineHeight: 1.3 }}>
                            {project.title}
                        </h3>
                        <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                            {project.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* ==========================================
          3. CTA FINAL
          ========================================== */}
      <section style={{ 
          padding: isMobile ? '100px 20px' : '160px 20px', 
          backgroundColor: '#00020a', 
          textAlign: 'center',
          position: 'relative'
      }}>
        {/* Onda de transición */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(to bottom, #000c2d 0%, transparent 100%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <h2 style={{ fontSize: isMobile ? '2.2rem' : '3.5rem', fontWeight: 900, lineHeight: 1.2, color: '#ffffff', marginBottom: '30px' }}>
                    Tu empresa podría ser nuestra próxima <span style={{ color: '#FAA918' }}>gran estrella.</span>
                </h2>
                <p style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', color: '#94a3b8', marginBottom: '50px' }}>
                    Cuéntanos tus desafíos técnicos y diseñaremos la arquitectura perfecta para superarlos.
                </p>
                
                <button 
                    onClick={() => navigate('/contacto')}
                    style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '10px', 
                        backgroundColor: '#00C2FF', color: '#000c2d', 
                        fontSize: '1.1rem', fontWeight: 800, padding: '18px 40px', 
                        border: 'none', borderRadius: '50px', cursor: 'pointer', 
                        boxShadow: '0 10px 30px rgba(0, 194, 255, 0.3)', transition: 'all 0.3s ease' 
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#00C2FF';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Iniciar mi proyecto <ArrowRight size={20} />
                </button>
            </motion.div>
        </div>
      </section>

    </div>
  );
};