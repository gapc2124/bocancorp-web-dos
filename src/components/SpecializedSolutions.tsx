import { motion } from 'framer-motion';

// --- DATOS SINTETIZADOS ---
const SOLUTIONS = [
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
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    colSpan: 1
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
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    colSpan: 1
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
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
    colSpan: 1
  },
  {
    id: 'elite',
    title: "Equipo Élite & Certificaciones",
    badge: "Calidad Validada",
    desc: "Expertos certificados en AWS, GCP y tecnologías de vanguardia.",
    features: [
      "AWS Select Partner & Acreditaciones FTR/SDP",
      "Solutions Architect, DevOps & Ciberseguridad",
      "Stack: Terraform, Kubernetes, ML & AI"
    ],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    colSpan: 3 // Este ocupará todo el ancho en desktop para destacar
  }
];

export const SpecializedSolutions = ({ isMobile }: { isMobile: boolean }) => {
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
          style={{ fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: 800, color: 'white', marginBottom: '10px' }}
        >
          Dominio <span style={{ color: '#00C2FF' }}>Técnico</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          style={{ color: '#aaa', fontSize: '1.1rem' }}
        >
          Experiencia certificada y soluciones de alto nivel
        </motion.p>
      </div>

      {/* GRID (BENTO BOX LAYOUT) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '20px'
      }}>
        {SOLUTIONS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{
              gridColumn: isMobile ? 'auto' : (item.id === 'elite' ? 'span 3' : 'span 1'),
              backgroundColor: 'rgba(10, 16, 36, 0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: isMobile || item.id !== 'elite' ? 'column' : 'row',
              height: isMobile ? 'auto' : (item.id === 'elite' ? '350px' : '500px'),
              // CORRECCIÓN: ELIMINADA LA LÍNEA "group: 'card'" QUE DABA ERROR
            }}
            whileHover={{ y: -5, borderColor: 'rgba(0, 194, 255, 0.3)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          >
            
            {/* IMAGEN DE FONDO / LATERAL */}
            <div style={{
              width: (isMobile || item.id !== 'elite') ? '100%' : '40%',
              height: (isMobile || item.id !== 'elite') ? '200px' : '100%',
              position: 'relative',
              overflow: 'hidden'
            }}>
               <img 
                 src={item.image} 
                 alt={item.title} 
                 style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
               />
               <div style={{
                 position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                 background: (isMobile || item.id !== 'elite')
                    ? 'linear-gradient(to top, rgba(10,16,36,1), transparent)'
                    : 'linear-gradient(to right, rgba(10,16,36,1), transparent)'
               }} />
            </div>

            {/* CONTENIDO */}
            <div style={{
              padding: '30px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              {/* Badge */}
              <div style={{ 
                alignSelf: 'flex-start', 
                padding: '5px 12px', 
                borderRadius: '20px', 
                background: 'rgba(0, 194, 255, 0.15)', 
                color: '#00C2FF', 
                fontSize: '0.75rem', 
                fontWeight: 700,
                marginBottom: '15px',
                border: '1px solid rgba(0, 194, 255, 0.3)'
              }}>
                {item.badge}
              </div>

              <h3 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.2 }}>
                {item.title}
              </h3>

              <p style={{ color: '#b0b8d1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                {item.desc}
              </p>

              {/* Lista de Features */}
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {item.features.map((feature, idx) => (
                  <li key={idx} style={{ 
                    color: '#ddd', 
                    fontSize: '0.9rem', 
                    marginBottom: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px' 
                  }}>
                    <span style={{ color: '#00C2FF', fontSize: '1.2rem' }}>•</span>
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