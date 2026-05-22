'use client';
import React from 'react'; // 👈 Quitamos useState y useEffect
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation'; // 👈 1. Importamos useParams

// ==========================================
// 1. DICCIONARIO DE TRADUCCIONES
// ==========================================
const TRANSLATIONS: any = {
  ES: {
    titleMain: "Dominio ",
    titleHighlight: "Técnico",
    subtitle: "Experiencia certificada y soluciones de alto nivel",
    solutions: [
      {
        id: 'cloud',
        title: "Consultoría Multi-Cloud & FinOps",
        badge: "AWS Select Partner",
        desc: "Diseñamos, migramos y administramos infraestructuras críticas con un enfoque financiero.",
        features: [
          "Gestión de Créditos Cloud para Startups",
          "FinOps: Auditoría y Maximizacion de ROI",
          "Backup & Disaster Recovery Automatizado"
        ],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ai',
        title: "Inteligencia Artificial & Chatbots",
        badge: "IA Generativa",
        desc: "Llevamos la IA a sus canales de atención. Asistentes virtuales integrados a su CRM/ERP.",
        features: [
          "Automatización WhatsApp/Web",
          "NLP para Análisis de Datos",
          "Predicción Comercial con ML"
        ],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'dev',
        title: "Desarrollo Software Cloud-Native",
        badge: "Serverless & Contenedores",
        desc: "Ingeniería diseñada para la nube desde la primera línea de código.",
        features: [
          "Web & E-commerce de Alto Tráfico",
          "Apps Móviles Nativas e Híbridas",
          "Modernización de Sistemas Legados"
        ],
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'elite',
        title: "Equipo Élite & Certificaciones",
        badge: "Calidad Validada",
        desc: "Expertos certificados en AWS, GCP y tecnologías de vanguardia para el sector corporativo.",
        features: [
          "AWS Select Partner & Acreditaciones FTR/SDP",
          "Solutions Architect, DevOps & Ciberseguridad",
          "Stack: Terraform, Kubernetes, ML & AI"
        ],
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  EN: {
    titleMain: "Technical ",
    titleHighlight: "Mastery",
    subtitle: "Certified expertise and high-level solutions",
    solutions: [
      {
        id: 'cloud',
        title: "Multi-Cloud & FinOps Consulting",
        badge: "AWS Select Partner",
        desc: "We design, migrate, and manage critical infrastructures with a financial focus.",
        features: [
          "Cloud Credit Management for Startups",
          "FinOps: Auditing & ROI Maximization",
          "Automated Backup & Disaster Recovery"
        ],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'ai',
        title: "Artificial Intelligence & Chatbots",
        badge: "Generative AI",
        desc: "We bring AI to your service channels. Virtual assistants integrated with your CRM/ERP.",
        features: [
          "WhatsApp/Web Automation",
          "NLP for Data Analysis",
          "Commercial Prediction with ML"
        ],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'dev',
        title: "Cloud-Native Software Development",
        badge: "Serverless & Containers",
        desc: "Engineering designed for the cloud from the very first line of code.",
        features: [
          "High-Traffic Web & E-commerce",
          "Native & Hybrid Mobile Apps",
          "Legacy Systems Modernization"
        ],
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 'elite',
        title: "Elite Team & Certifications",
        badge: "Validated Quality",
        desc: "Certified experts in AWS, GCP, and cutting-edge technologies for the corporate sector.",
        features: [
          "AWS Select Partner & FTR/SDP Accreditations",
          "Solutions Architect, DevOps & Cybersecurity",
          "Stack: Terraform, Kubernetes, ML & AI"
        ],
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
};

export const SpecializedSolutions = ({ isMobile }: { isMobile: boolean }) => {
  // 👇 2. LEEMOS EL IDIOMA DIRECTO DE LA URL
  const { lang: urlLang } = useParams(); 
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';
  const t = TRANSLATIONS[currentLang];

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: isMobile ? '0 20px' : '0 40px' 
    }}>
      
      {/* TÍTULO DE SECCIÓN */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 950, color: 'white', marginBottom: '10px', textTransform: 'uppercase' }}
        >
          {t.titleMain}<span style={{ color: '#00C2FF' }}>{t.titleHighlight}</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          style={{ color: '#aaa', fontSize: '1.2rem', fontWeight: 500 }}
        >
          {t.subtitle}
        </motion.p>
      </div>

      {/* GRID (BENTO BOX LAYOUT) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '20px'
      }}>
        {t.solutions.map((item: any, i: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{
              gridColumn: isMobile ? 'auto' : (item.id === 'elite' ? 'span 3' : 'span 1'),
              backgroundColor: 'rgba(10, 16, 36, 0.7)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: isMobile || item.id !== 'elite' ? 'column' : 'row',
              height: isMobile ? 'auto' : (item.id === 'elite' ? '380px' : '550px'),
            }}
            whileHover={{ y: -5, borderColor: '#00C2FF', boxShadow: '0 15px 40px rgba(0, 194, 255, 0.3)' }}
          >
            
            {/* IMAGEN DE FONDO / LATERAL */}
            <div style={{
              width: (isMobile || item.id !== 'elite') ? '100%' : '45%',
              height: (isMobile || item.id !== 'elite') ? '220px' : '100%',
              position: 'relative',
              overflow: 'hidden'
            }}>
               <img 
                 src={item.image} 
                 alt={item.title} 
                 style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
               />
               <div style={{
                 position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                 background: (isMobile || item.id !== 'elite')
                    ? 'linear-gradient(to top, rgba(10,16,36,1) 5%, transparent 100%)'
                    : 'linear-gradient(to right, rgba(10,16,36,1) 5%, transparent 100%)'
               }} />
            </div>

            {/* CONTENIDO */}
            <div style={{
              padding: isMobile ? '25px' : '40px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              {/* Badge */}
              <div style={{ 
                alignSelf: 'flex-start', 
                padding: '6px 14px', 
                borderRadius: '50px', 
                background: 'rgba(0, 194, 255, 0.1)', 
                color: '#00C2FF', 
                fontSize: '0.8rem', 
                fontWeight: 800,
                marginBottom: '20px',
                border: '1px solid rgba(0, 194, 255, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {item.badge}
              </div>

              <h3 style={{ color: 'white', fontSize: isMobile ? '1.6rem' : '1.9rem', fontWeight: 900, marginBottom: '15px', lineHeight: 1.2 }}>
                {item.title}
              </h3>

              <p style={{ color: '#b0b8d1', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '25px', fontWeight: 500 }}>
                {item.desc}
              </p>

              {/* Lista de Features */}
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {item.features.map((feature: string, idx: number) => (
                  <li key={idx} style={{ 
                    color: '#ffffff', 
                    fontSize: '0.95rem', 
                    marginBottom: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontWeight: 600
                  }}>
                    <span style={{ color: '#00C2FF', fontSize: '1.5rem', lineHeight: 0 }}>•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};