import React, { useState, useRef } from 'react';

interface ServicesSectionProps {
  isMobile: boolean;
}

// --- DATOS ---
const SPECIALTIES_DATA = [
  {
    id: 'multicloud',
    label: 'Multicloud',
    title: 'Orquestación Multicloud',
    desc: 'Unificamos GCP, Azure y Oracle en una estrategia coherente. Eliminamos el "Vendor Lock-in" y aprovechamos lo mejor de cada proveedor.',
    images: [
      { src: './assets/aws.png', alt: 'AWS' },
      { src: './assets/GCP.png', alt: 'GCP' },
      { src: './assets/azure.png', alt: 'Azure' },
      { src: './assets/oracle.png', alt: 'Oracle' }
    ]
  },
  {
    id: 'aws',
    label: 'AWS Select Partners',
    title: 'AWS Select Tier Partners',
    desc: 'Como socios certificados, ofrecemos acceso exclusivo a roadmaps, soporte avanzado y arquitecturas validadas directamente por Amazon Web Services.',
    images: [
      { src: './assets/aws_partners.png', alt: 'AWS Partner' }
    ]
  },
  {
    id: 'ai',
    label: 'Inteligencia Artificial',
    title: 'Soluciones de IA Avanzada',
    desc: 'Integración de LLMs y modelos predictivos para automatizar decisiones críticas y potenciar la eficiencia operativa de tu negocio.',
    images: [
      { src: './assets/MachineLearning.png', alt: 'IA' }
    ]
  },
  {
    id: 'finops',
    label: 'Estrategia FinOps',
    title: 'Control Financiero Cloud',
    desc: 'Maximiza tu ROI en la nube. Implementamos cultura FinOps para visibilidad total de costos, optimización de recursos y reducción de desperdicios.',
    images: [
      { src: './assets/FinOps.png', alt: 'FinOps' }
    ]
  },
  {
    id: 'cloudnative',
    label: 'Cloud-Native',
    title: 'Arquitecturas Cloud-Native',
    desc: 'Desarrollo moderno basado en Microservicios, Kubernetes y Serverless. Aplicaciones resilientes diseñadas para escalar infinitamente.',
    images: [
      { src: './assets/multi_cloud.png', alt: 'Cloud Native' }
    ]
  }
];

export const ServicesSection = ({ isMobile }: ServicesSectionProps) => {
  // --- ESTADO AVANZADO PARA LA ANIMACIÓN ---
  const [activeId, setActiveId] = useState(SPECIALTIES_DATA[0].id);
  const prevIdRef = useRef<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabClick = (newId: string) => {
    if (newId === activeId || isAnimating) return;
    prevIdRef.current = activeId;
    setActiveId(newId);
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    prevIdRef.current = null;
    setIsAnimating(false);
  };

  const activeData = SPECIALTIES_DATA.find(s => s.id === activeId)!;
  const prevData = (isAnimating && prevIdRef.current) 
    ? SPECIALTIES_DATA.find(s => s.id === prevIdRef.current) 
    : null;


  return (
    <section style={{ 
      position: 'relative', 
      width: '100%', 
      padding: isMobile ? '180px 20px 180px' : '280px 100px 280px',
      zIndex: 10, 
      backgroundColor: '#ffffff', 
      overflow: 'hidden' 
    }}>
      
      {/* ONDAS SUPERIORES */}
      <div className="wave-container top-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#000c2d" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#000c2d" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#000c2d" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <div style={{ 
        position: 'relative',
        zIndex: 20,
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
        gap: isMobile ? '50px' : '80px', 
        alignItems: 'start'
      }}>

        {/* COLUMNA IZQUIERDA */}
        <div>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 800, color: '#111111', lineHeight: 1.1, marginBottom: '20px' }}>
              Somos <span style={{ color: '#FAA918' }}>AWS Select Partners</span> y Especialistas Multi-Cloud
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#333', marginBottom: '30px', fontWeight: 500 }}>
              Partners XX en GCP, especialistas en Azure y Oracle Cloud.
            </p>
            <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1rem' }}>
              AGENDE UNA CONSULTA
            </button>
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', color: '#111111', marginBottom: '15px', borderLeft: '4px solid #FAA918', paddingLeft: '20px' }}>
              Ventaja Competitiva
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444444' }}>
              Transformamos su infraestructura tecnológica en un motor de crecimiento. No solo migramos o mantenemos; evolucionamos su ecosistema digital para liderar el mercado.
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#111111', marginBottom: '10px' }}>
            Nuestras Especialidades
          </h3>

          {/* BOTONES */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
            {SPECIALTIES_DATA.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: isActive ? '#FAA918' : '#f3f4f6',
                    color: isActive ? '#000' : '#666',
                    boxShadow: isActive ? '0 4px 10px rgba(250, 169, 24, 0.3)' : 'none',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* --- CONTENEDOR DE PILA DE CARTAS --- */}
          <div style={{ display: 'grid', gridTemplateAreas: '"stack"', position: 'relative', minHeight: '220px' }}>
            
            {/* CARTA PREVIA (FONDO) */}
            {prevData && (
              <div className="specialty-card card-static-behind" style={{ gridArea: 'stack', zIndex: 1 }}>
                 <CardContent data={prevData} />
              </div>
            )}

            {/* CARTA ACTIVA (FRENTE) */}
            <div 
              key={activeId} 
              className={`specialty-card ${isAnimating ? 'card-animating-in' : ''}`}
              style={{ gridArea: 'stack', zIndex: 2 }}
              onAnimationEnd={handleAnimationEnd}
            >
               <CardContent data={activeData} />
            </div>

          </div>

        </div>
      </div>

      {/* ONDAS INFERIORES */}
      <div className="wave-container bottom-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#000c2d" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#000c2d" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#000c2d" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <style>{`
        /* --- ESTILOS BASE DE LA TARJETA --- */
        .specialty-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            padding: 35px;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            height: 100%; 
            width: 100%; 
            position: relative;
            /* Aseguramos que sea opaca */
            opacity: 1 !important;
        }
        
        .specialty-card::before {
            content: ''; position: absolute; z-index: -1;
            top: 5px; left: 5px; right: -5px; bottom: -5px;
            background: #f0f0f0; border: 1px solid #ddd; border-radius: 16px;
        }

        /* --- ESTADOS DE ANIMACIÓN --- */
        .card-static-behind { }

        /* Carta nueva (entra lateralmente, recorrido largo, sólida) */
        .card-animating-in {
            /* Duración 0.8s */
            animation: dealCardOver 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            /* Sombra fuerte de "vuelo" */
            box-shadow: -20px 15px 40px rgba(0,0,0,0.2); 
        }

        @keyframes dealCardOver {
            0% { 
                /* CAMBIO CLAVE: Empieza MUCHO más lejos (300px) y más rotada */
                /* SIN TRANSPARENCIA (opacity siempre es 1) */
                transform: translateX(300px) rotate(5deg); 
            }
            100% { 
                /* Aterriza */
                transform: translateX(0) rotate(0deg);
                box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            }
        }

        /* ONDAS (Sin cambios) */
        .wave-container { position: absolute; left: 0; width: 100%; height: 180px; overflow: hidden; line-height: 0; z-index: 1; pointer-events: none; }
        .top-waves { top: 0; }
        .bottom-waves { bottom: 0; transform: scaleY(-1); }
        .wave-svg { position: relative; display: block; width: calc(100% + 1.3px); height: 100%; }
        .wave-anim-slow { animation: wave-sway 6s ease-in-out infinite alternate; transform-origin: center top; }
        .wave-anim-medium { animation: wave-sway 5s ease-in-out infinite alternate-reverse; transform-origin: center top; }
        .wave-anim-fast { animation: wave-sway 4s ease-in-out infinite alternate; transform-origin: center top; }
        @keyframes wave-sway { 0% { transform: scaleY(1); } 100% { transform: scaleY(1.1); } }
      `}</style>
    </section>
  );
};

// --- COMPONENTE AUXILIAR MODIFICADO (ICONOS MULTICLOUD GIGANTES) ---
const CardContent = ({ data }: { data: any }) => {
  const isMultiImage = data.images.length > 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      
      {/* SECCIÓN DE IMAGEN */}
      <div style={{ 
        flex: isMultiImage ? '0 0 auto' : '1', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '25px',
        width: '100%',
        minHeight: isMultiImage ? 'auto' : '140px' 
      }}>
          {isMultiImage ? (
              // MULTICLOUD: ICONOS GIGANTES EN FILA
              <div style={{ 
                  display: 'flex', 
                  flexDirection: 'row', // Fila obligatoria
                  flexWrap: 'nowrap',   // No permitir que bajen de línea
                  gap: '5px',           // Espacio mínimo para maximizar tamaño
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
              }}>
                  {data.images.map((img: any, idx: number) => (
                      <img 
                        key={idx}
                        src={img.src} 
                        alt={img.alt} 
                        style={{ 
                          // ¡AUMENTO SIN MIEDO!
                          width: '140px',  // De 78px a 95px
                          height: '140px', 
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 5px 8px rgba(0,0,0,0.15))', // Sombra un poco más fuerte
                          transition: 'transform 0.2s ease'
                        }} 
                        // Efecto zoom al pasar el mouse
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                  ))}
              </div>
          ) : (
              // DISEÑO SINGLE (Gigante, sin fondo)
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                   <img 
                     src={data.images[0].src} 
                     alt={data.images[0].alt} 
                     style={{ 
                       width: 'auto', 
                       height: '120px', 
                       maxWidth: '100%',
                       objectFit: 'contain',
                       filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))' 
                     }} 
                   />
              </div>
          )}
      </div>

      {/* TÍTULO Y TEXTO */}
      <div style={{ flex: '0 0 auto' }}>
        <h4 style={{ color: '#111111', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 12px 0', lineHeight: 1.2 }}>
          {data.title}
        </h4>
        
        <div style={{ marginBottom: '15px', height: '4px', width: '50px', background: '#FAA918', borderRadius: '2px' }}></div>

        <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
          {data.desc}
        </p>
      </div>
    </div>
  );
};