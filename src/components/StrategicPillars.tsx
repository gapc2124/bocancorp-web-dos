import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom'; // 👈 1. Importamos useParams
import { Cloud, Terminal, TrendingUp, Shield, Database, Cpu } from 'lucide-react';

// ==========================================
// 1. DICCIONARIO DE TRADUCCIONES
// ==========================================
const TRANSLATIONS: any = {
  ES: {
    titleStart: "Nuestros Pilares ",
    titleHighlight: "Estratégicos",
    pillars: [
      { title: "Arquitectura Cloud", desc: "Diseño resiliente y escalable en entornos AWS y Multicloud.", icon: <Cloud size={40} color="#00C2FF" /> },
      { title: "DevOps & IaC", desc: "Terraform, automatización y despliegue controlado.", icon: <Terminal size={40} color="#FAA918" /> },
      { title: "FinOps", desc: "Control financiero y reducción real de desperdicio de recursos.", icon: <TrendingUp size={40} color="#10B981" /> },
      { title: "Ciberseguridad", desc: "WAF, Prisma Cloud, Panorama, pentesting y hardening.", icon: <Shield size={40} color="#EF4444" /> },
      { title: "Gobernanza de Datos", desc: "Estructuración y control de activos críticos de tu negocio.", icon: <Database size={40} color="#8B5CF6" /> },
      { title: "Serverless & IA", desc: "Chatbots inteligentes y arquitecturas sin servidor.", icon: <Cpu size={40} color="#EC4899" /> }
    ]
  },
  EN: {
    titleStart: "Our Strategic ",
    titleHighlight: "Pillars",
    pillars: [
      { title: "Cloud Architecture", desc: "Resilient and scalable design in AWS and Multicloud environments.", icon: <Cloud size={40} color="#00C2FF" /> },
      { title: "DevOps & IaC", desc: "Terraform, automation, and controlled deployment.", icon: <Terminal size={40} color="#FAA918" /> },
      { title: "FinOps", desc: "Financial control and real reduction of resource waste.", icon: <TrendingUp size={40} color="#10B981" /> },
      { title: "Cybersecurity", desc: "WAF, Prisma Cloud, Panorama, pentesting, and hardening.", icon: <Shield size={40} color="#EF4444" /> },
      { title: "Data Governance", desc: "Structuring and controlling your business's critical assets.", icon: <Database size={40} color="#8B5CF6" /> },
      { title: "Serverless & AI", desc: "Intelligent chatbots and serverless architectures.", icon: <Cpu size={40} color="#EC4899" /> }
    ]
  }
};

export const StrategicPillars = ({ isMobile }: { isMobile: boolean }) => {
  // 👇 2. LEEMOS EL IDIOMA DIRECTO DE LA URL
  const { lang: urlLang } = useParams(); 
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';
  const t = TRANSLATIONS[currentLang];

  return (
    <section style={{ 
        position: 'relative', 
        zIndex: 1, 
        padding: isMobile ? '160px 20px' : '220px 60px', 
        backgroundColor: '#ffffff', 
        overflow: 'hidden'
    }}>
      
      {/* --- ONDAS SUPERIORES --- */}
      <div className="wave-container top-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#020307" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#020307" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#020307" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: isMobile ? '2.2rem' : '3rem', fontWeight: 900, color: '#000c2d' }}>
                  {t.titleStart}<span style={{ color: '#FAA918' }}>{t.titleHighlight}</span>
              </h2>
          </motion.div>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
              {t.pillars.map((val: any, i: number) => (
                  <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ 
                          y: -8, 
                          backgroundColor: '#001848',
                          boxShadow: '0 20px 40px rgba(0, 194, 255, 0.2)' 
                      }}
                      style={{ 
                        padding: '40px 30px', 
                        backgroundColor: '#000c2d', 
                        borderRadius: '16px', 
                        border: `1px solid rgba(0, 194, 255, 0.2)`, 
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                      }}
                  >
                      <div style={{ marginBottom: '20px' }}>{val.icon}</div>
                      <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', fontWeight: 700, color: '#ffffff' }}>{val.title}</h3>
                      <p style={{ color: '#b0b8d1', lineHeight: 1.6, fontSize: '0.95rem' }}>{val.desc}</p>
                  </motion.div>
              ))}
          </div>
      </div>

      {/* --- ONDAS INFERIORES --- */}
      <div className="wave-container bottom-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#020307" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#020307" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#020307" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <style>{`
        .wave-container { position: absolute; left: 0; width: 100%; height: clamp(100px, 12vw, 180px); overflow: hidden; line-height: 0; z-index: 1; pointer-events: none; }
        .top-waves { top: 0; }
        .bottom-waves { bottom: 0; transform: scaleY(-1); }
        .wave-svg { width: 100%; height: 100%; }
        .wave-anim-slow { animation: sway 6s ease-in-out infinite alternate; }
        .wave-anim-medium { animation: sway 8s ease-in-out infinite alternate-reverse; }
        .wave-anim-fast { animation: sway 4s ease-in-out infinite alternate; }
        @keyframes sway { 0% { transform: scaleY(1); } 100% { transform: scaleY(1.15); } }
      `}</style>
    </section>
  );
};