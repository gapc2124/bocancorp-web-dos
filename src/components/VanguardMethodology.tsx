'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Building } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation'; // 👈 1. Importamos useParams

interface VanguardMethodologyProps {
  isMobile: boolean;
}

// ==========================================
// 1. DICCIONARIO DE TRADUCCIONES
// ==========================================
const TRANSLATIONS: any = {
  ES: {
    titleStart: "Metodología y ",
    titleHighlight: "Modalidad",
    description: "Nos integramos a tu empresa trabajando codo a codo con tus equipos internos. Mantenemos una estructura metodológica clara para asegurar el éxito:",
    steps: [
      "Diagnóstico Cloud y FinOps",
      "Diseño de Arquitectura y Seguridad",
      "Implementación Técnica Controlada",
      "Optimización y Gobierno Continuo"
    ],
    billingTitle: "Facturación Local",
    billingDesc: "Acompañamiento a startups y empresas.",
    contactBtn: "Contáctanos"
  },
  EN: {
    titleStart: "Methodology & ",
    titleHighlight: "Modality",
    description: "We integrate into your company working side-by-side with your internal teams. We maintain a clear methodological structure to ensure success:",
    steps: [
      "Cloud & FinOps Diagnosis",
      "Architecture & Security Design",
      "Controlled Technical Implementation",
      "Continuous Optimization & Governance"
    ],
    billingTitle: "Local Billing",
    billingDesc: "Support for startups and enterprises.",
    contactBtn: "Contact Us"
  }
};

export const VanguardMethodology = ({ isMobile }: VanguardMethodologyProps) => {
  const router = useRouter();
  const navigate = (path: string) => router.push(path);

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
        color: '#000c2d',
        overflow: 'hidden'
    }}>
      
      {/* --- ONDAS SUPERIORES --- */}
      <div className="wave-container top-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#00020a" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#00020a" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#00020a" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '60px', alignItems: 'center' }}>
              
              {/* COLUMNA IMAGEN */}
              <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  viewport={{ once: true }} 
                  style={{ flex: 1, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              >
                  <img 
                    src="/assets/metodologia-bg.avif" 
                    alt="Metodología y Modalidad" 
                    style={{ width: '100%', display: 'block' }} 
                  />
              </motion.div>

              {/* COLUMNA TEXTO */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: 1 }}>
                  <h3 style={{ fontSize: isMobile ? '2.2rem' : 'clamp(3rem, 4vw, 4rem)', fontWeight: 950, marginBottom: '25px', color: '#0f172a', lineHeight: 1.1 }}>
                      {t.titleStart} <span style={{ color: '#00C2FF' }}>{t.titleHighlight}</span>
                  </h3>
                  <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: '#4a5568', marginBottom: '30px', fontWeight: 500 }}>
                      {t.description}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>
                      {t.steps.map((step: string, i: number) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <CheckCircle2 color="#FAA918" size={26} style={{ flexShrink: 0 }} />
                              <span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#334155' }}>{step}</span>
                          </div>
                      ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: isMobile ? 'stretch' : 'center' }}>
                      {/* CARD FACTURACIÓN */}
                      <div style={{ flex: 1, backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <Building color="#00C2FF" size={32} style={{ flexShrink: 0 }} />
                          <div>
                            <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>{t.billingTitle}</h4>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{t.billingDesc}</p>
                          </div>
                      </div>

                      {/* BOTÓN CONTACTO CON IDIOMA EN RUTA */}
                      <button 
                          onClick={() => navigate(`/${currentLang.toLowerCase()}/contacto`)}
                          style={{ 
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', 
                              backgroundColor: '#00C2FF', color: '#ffffff', 
                              fontSize: '1.1rem', fontWeight: 800, padding: '18px 30px', 
                              border: 'none', borderRadius: '50px', cursor: 'pointer', 
                              boxShadow: '0 10px 20px rgba(0, 194, 255, 0.3)', transition: 'all 0.3s ease',
                              whiteSpace: 'nowrap'
                          }}
                          onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = '#FAA918';
                              e.currentTarget.style.transform = 'translateY(-3px)';
                          }}
                          onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = '#00C2FF';
                              e.currentTarget.style.transform = 'translateY(0)';
                          }}
                      >
                          {t.contactBtn} <ArrowRight size={22} />
                      </button>
                  </div>
              </motion.div>

          </div>
      </div>

      {/* --- ONDAS INFERIORES --- */}
      <div className="wave-container bottom-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#000c2d" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#000c2d" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#000c2d" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <style>{`
        .wave-container { 
            position: absolute; left: 0; width: 100%; 
            height: clamp(100px, 12vw, 180px); 
            overflow: hidden; line-height: 0; z-index: 1; pointer-events: none; 
        }
        .top-waves { top: 0; }
        .bottom-waves { bottom: 0; transform: scaleY(-1); }
        .wave-svg { width: 100%; height: 100%; }
        .wave-anim-slow { animation: sway 6s ease-in-out infinite alternate; }
        .wave-anim-medium { animation: sway 10s ease-in-out infinite alternate-reverse; }
        .wave-anim-fast { animation: sway 4s ease-in-out infinite alternate; }
        @keyframes sway { 0% { transform: scaleY(1); } 100% { transform: scaleY(1.15); } }
      `}</style>
    </section>
  );
};