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
    desc: 'Unificamos GCP, Azure y Oracle en una estrategia coherente.',
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
    desc: 'Arquitecturas validadas directamente por Amazon Web Services.',
    images: [
      { src: './assets/aws_partners.png', alt: 'AWS Partner' },
      { src: './assets/aws.png', alt: 'AWS Logo' }
    ]
  },
  {
    id: 'ai',
    label: 'Inteligencia Artificial',
    title: 'Soluciones de IA Avanzada',
    desc: 'Integración de LLMs para automatizar decisiones críticas.',
    images: [
      { src: './assets/MachineLearning.png', alt: 'IA' }
    ]
  },
  {
    id: 'finops',
    label: 'Estrategia FinOps',
    title: 'Control Financiero Cloud',
    desc: 'Maximiza su ROI. Visibilidad total de costos y optimización.',
    images: [
      { src: './assets/FinOps.png', alt: 'FinOps' }
    ]
  },
  {
    id: 'cloudnative',
    label: 'Cloud-Native',
    title: 'Arquitecturas Cloud-Native',
    desc: 'Desarrollo moderno basado en Microservicios y Kubernetes.',
    images: [
      { src: './assets/multi_cloud.png', alt: 'Cloud Native' }
    ]
  }
];

export const ServicesSection = ({ isMobile }: ServicesSectionProps) => {
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
        position: 'relative', zIndex: 20,
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
        gap: isMobile ? '50px' : '80px', 
        alignItems: 'start'
      }}>
        {/* COLUMNA IZQUIERDA: CONTENIDO ESTÁTICO RECUPERADO */}
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

        {/* COLUMNA DERECHA: TARJETAS DINÁMICAS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#111111', marginBottom: '10px' }}>
            Nuestras Especialidades
          </h3>

          {/* BOTONES TABS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
            {SPECIALTIES_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                style={{
                  padding: '8px 16px', borderRadius: '20px', border: 'none', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease',
                  backgroundColor: activeId === item.id ? '#FAA918' : '#f3f4f6', color: activeId === item.id ? '#000' : '#666',
                  boxShadow: activeId === item.id ? '0 4px 10px rgba(250, 169, 24, 0.3)' : 'none', transform: activeId === item.id ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* PILA DE CARTAS (CON TAMAÑO UNIFICADO) */}
          <div style={{ 
              display: 'grid', 
              gridTemplateAreas: '"stack"', 
              position: 'relative', 
              minHeight: isMobile ? '450px' : '350px' 
          }}>
            {prevData && (
              <div className="specialty-card card-static-behind" style={{ gridArea: 'stack', zIndex: 1 }}>
                 <CardContent data={prevData} isMobile={isMobile} />
              </div>
            )}
            <div 
              key={activeId} 
              className={`specialty-card ${isAnimating ? 'card-animating-in' : ''}`}
              style={{ gridArea: 'stack', zIndex: 2 }}
              onAnimationEnd={handleAnimationEnd}
            >
               <CardContent data={activeData} isMobile={isMobile} />
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
        .specialty-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            padding: 35px;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            display: flex;
            align-items: center;
            overflow: hidden;
        }
        .specialty-card::before {
            content: ''; position: absolute; z-index: -1;
            top: 5px; left: 5px; right: -5px; bottom: -5px;
            background: #f0f0f0; border: 1px solid #ddd; border-radius: 16px;
        }
        .card-animating-in { animation: deal 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        @keyframes deal {
            0% { transform: translateX(300px) rotate(5deg); opacity: 0; }
            100% { transform: translateX(0) rotate(0deg); opacity: 1; }
        }
        @keyframes iconFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
        }
        .wave-container { position: absolute; left: 0; width: 100%; height: 180px; overflow: hidden; line-height: 0; z-index: 1; pointer-events: none; }
        .top-waves { top: 0; }
        .bottom-waves { bottom: 0; transform: scaleY(-1); }
        .wave-svg { width: 100%; height: 100%; }
        .wave-anim-slow { animation: sway 6s ease-in-out infinite alternate; }
        @keyframes sway { 0% { transform: scaleY(1); } 100% { transform: scaleY(1.1); } }
      `}</style>
    </section>
  );
};

const CardContent = ({ data, isMobile }: { data: any, isMobile: boolean }) => {
  const isMulticloud = data.id === 'multicloud';
  const isAWS = data.id === 'aws';

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column-reverse' : 'row', 
        width: '100%', 
        alignItems: 'center',
        gap: '20px'
    }}>
      {/* TEXTO: 35% de ancho en escritorio */}
      <div style={{ flex: isMobile ? 'none' : '0 0 35%' }}>
        <h4 style={{ fontSize: '1.7rem', fontWeight: 800, margin: '0 0 10px 0', color: '#111' }}>{data.title}</h4>
        <div style={{ width: '40px', height: '4px', background: '#FAA918', marginBottom: '15px' }}></div>
        <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.5 }}>{data.desc}</p>
      </div>

      {/* IMÁGENES: 65% de ancho en escritorio */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%'
      }}>
        {isMulticloud ? (
          /* GRID 2x2 PARA MULTICLOUD */
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: isMobile ? '10px' : '15px', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {data.images.map((img: any, i: number) => (
              <img 
                key={i} src={img.src} alt={img.alt} 
                style={{ 
                    width: isMobile ? '100px' : '145px', // Íconos más grandes
                    height: 'auto', 
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                    animation: `iconFloat 4s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`
                }} 
              />
            ))}
          </div>
        ) : isAWS ? (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {data.images.map((img: any, i: number) => (
                    <img 
                        key={i} src={img.src} alt={img.alt} 
                        style={{ 
                            height: isMobile ? '110px' : '190px', 
                            animation: `iconFloat 5s ease-in-out infinite`,
                            animationDelay: `${i * 1}s`
                        }} 
                    />
                ))}
            </div>
        ) : (
          <img 
            src={data.images[0].src} 
            alt={data.images[0].alt} 
            style={{ 
                height: isMobile ? '170px' : '250px',
                width: 'auto',
                animation: 'iconFloat 5s ease-in-out infinite' 
            }} 
          />
        )}
      </div>
    </div>
  );
};