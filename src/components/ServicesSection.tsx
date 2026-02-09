import React, { useState, useEffect } from 'react';

// --- 1. FUNCIÓN DE AYUDA PARA RUTAS (CRÍTICO: NO BORRAR) ---
const resolvePath = (path: string) => {
  // En Vite, BASE_URL suele ser '/' en localhost, pero esto asegura que funcione siempre
  const base = import.meta.env.BASE_URL || '/';
  // Quitamos cualquier barra o punto inicial para limpiar
  const cleanPath = path.replace(/^(\.?\/)/, '');
  return `${base}${cleanPath}`;
};

interface ServicesSectionProps {
  isMobile: boolean;
}

// --- 2. CONFIGURACIÓN ESTÁTICA (Solo IDs e Imágenes) ---
const CARDS_CONFIG = [
  {
    id: 'multicloud',
    images: [ { src: 'assets/multi_cloud.png', alt: 'Multicloud Native' } ]
  },
  {
    id: 'aws',
    images: [ { src: 'assets/aws_partners.png', alt: 'AWS Partner' }, { src: 'assets/aws_WAF.png', alt: 'AWS Logo' } ]
  },
  {
    id: 'ai',
    images: [ { src: 'assets/MachineLearning.png', alt: 'IA' } ]
  },
  {
    id: 'finops',
    images: [ { src: 'assets/FinOps.png', alt: 'FinOps' } ]
  }
];

// --- 3. DICCIONARIO DE TEXTOS (Traducciones) ---
const SECTION_TEXTS: any = {
  ES: {
    heroTitlePrefix: "Somos ",
    heroTitleHighlight: "AWS Select Partners",
    heroTitleSuffix: " y Especialistas Multi-Cloud",
    heroSub: "en GCP, Azure y Oracle Cloud.",
    ctaButton: "AGENDE AHORA!",
    advantageTitle: "Ventaja Competitiva",
    advantageDesc: "Transformamos su infraestructura tecnológica en un motor de crecimiento. No solo migramos o mantenemos; evolucionamos su ecosistema digital para liderar el mercado.",
    specialtiesTitle: "Nuestras Especialidades",
    
    // Textos de las tarjetas
    cards: {
      multicloud: { label: 'Multicloud', title: 'Orquestación Multicloud', desc: 'Unificamos GCP, Azure y Oracle en una estrategia coherente con arquitecturas modernas.' },
      aws: { label: 'AWS Select Partners', title: 'AWS Select Tier Partners', desc: 'Arquitecturas validadas directamente por Amazon Web Services.' },
      ai: { label: 'Inteligencia Artificial', title: 'Soluciones de IA Avanzada', desc: 'Integración de LLMs para automatizar decisiones críticas.' },
      finops: { label: 'Estrategia FinOps', title: 'Control Financiero Cloud', desc: 'Maximiza su ROI. Visibilidad total de costos y optimización.' }
    }
  },
  EN: {
    heroTitlePrefix: "We are ",
    heroTitleHighlight: "AWS Select Partners",
    heroTitleSuffix: " and Multi-Cloud Specialists",
    heroSub: "in GCP, Azure, and Oracle Cloud.",
    ctaButton: "BOOK NOW!",
    advantageTitle: "Competitive Advantage",
    advantageDesc: "We transform your technological infrastructure into a growth engine. We don't just migrate or maintain; we evolve your digital ecosystem to lead the market.",
    specialtiesTitle: "Our Specialties",
    
    // Textos de las tarjetas
    cards: {
      multicloud: { label: 'Multicloud', title: 'Multicloud Orchestration', desc: 'We unify GCP, Azure, and Oracle into a coherent strategy with modern architectures.' },
      aws: { label: 'AWS Select Partners', title: 'AWS Select Tier Partners', desc: 'Architectures validated directly by Amazon Web Services.' },
      ai: { label: 'Artificial Intelligence', title: 'Advanced AI Solutions', desc: 'Integration of LLMs to automate critical decisions.' },
      finops: { label: 'FinOps Strategy', title: 'Cloud Financial Control', desc: 'Maximize your ROI. Total cost visibility and optimization.' }
    }
  }
};

export const ServicesSection = ({ isMobile }: ServicesSectionProps) => {
  const [activeId, setActiveId] = useState(CARDS_CONFIG[0].id);
  
  // --- LÓGICA DE IDIOMA ---
  const [lang, setLang] = useState(localStorage.getItem('appLanguage') || 'ES');

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem('appLanguage') || 'ES');
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = SECTION_TEXTS[lang];

  // Fusionamos la configuración de imágenes con los textos actuales
  const currentData = CARDS_CONFIG.map(item => ({
    ...item,
    ...t.cards[item.id]
  }));

  const handleTabClick = (newId: string) => {
    if (newId === activeId) return;
    setActiveId(newId);
  };

  return (
    <section className="services-section">
      
      {/* ONDAS SUPERIORES */}
      <div className="wave-container top-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#000c2d" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#000c2d" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#000c2d" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <div className="content-grid">
        {/* COLUMNA IZQUIERDA */}
        <div className="left-column">
          <div style={{ marginBottom: 'clamp(20px, 4vw, 40px)' }}>
            <h2 className="main-heading">
              {t.heroTitlePrefix}
              <span className="highlight-text">{t.heroTitleHighlight}</span>
              {t.heroTitleSuffix}
              <span className="sub-heading">
                {t.heroSub}
              </span>
            </h2>
            <button className="btn-primary custom-btn">{t.ctaButton}</button>
          </div>
          <div className="advantage-box">
            <h3 className="advantage-title">{t.advantageTitle}</h3>
            <p className="advantage-text">{t.advantageDesc}</p>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="right-column">
          <h3 className="specialties-title">{t.specialtiesTitle}</h3>

          <div className="tabs-container">
            {currentData.map((item: any) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`tab-button ${activeId === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="cards-stack-wrapper">
            {currentData.map((item: any) => (
               <div 
                 key={item.id}
                 className={`specialty-card ${activeId === item.id ? 'active' : ''}`}
               >
                 <CardContent data={item} />
               </div>
            ))}
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
        /* --- LAYOUT GENERAL --- */
        .services-section {
            position: relative;
            width: 100%;
            /* 1. SEPARACIÓN DE ONDAS: Aumentada a 240px mínimo para que respire bien */
            padding: clamp(240px, 20vh, 320px) clamp(20px, 5vw, 100px);
            z-index: 10;
            background-color: #ffffff;
            overflow: hidden;
        }

        .content-grid {
            position: relative;
            z-index: 20;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: clamp(40px, 4vw, 80px);
            align-items: start;
            max-width: 1400px; 
            margin: 0 auto;
            transition: max-width 0.3s ease;
        }

        /* --- TIPOGRAFÍA --- */
        .main-heading {
            font-size: clamp(1.8rem, 3.5vw, 2.8rem); 
            font-weight: 800; color: #111; line-height: 1.1; margin-bottom: 25px;
        }
        .highlight-text { color: #FAA918; }
        .sub-heading {
            display: block; font-size: 0.7em; color: #6b7280; margin-top: 15px; font-weight: 600;
        }
        .custom-btn { padding: 15px 40px; font-size: 1rem; text-transform: uppercase; font-weight: 700; }
        .advantage-title {
            font-size: clamp(1.2rem, 2vw, 1.5rem); color: #111; margin-bottom: 15px;
            border-left: 4px solid #FAA918; padding-left: 20px;
        }
        .advantage-text { font-size: clamp(1rem, 1.1vw, 1.1rem); lineHeight: 1.8; color: #444; }
        .specialties-title { font-size: clamp(1.4rem, 3vw, 1.8rem); color: #111; margin-bottom: 20px; }

        /* --- TABS --- */
        .tabs-container { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
        .tab-button {
            padding: 8px 16px; border-radius: 20px; border: none; font-size: 0.95rem; font-weight: 600; cursor: pointer;
            transition: all 0.3s ease; background-color: #f3f4f6; color: #666;
        }
        .tab-button.active {
            background-color: #FAA918; color: #000; box-shadow: 0 4px 10px rgba(250, 169, 24, 0.3); transform: scale(1.05);
        }

        /* --- STACK --- */
        .cards-stack-wrapper {
            display: grid; grid-template-areas: "stack"; 
            position: relative; width: 100%;
        }

        .specialty-card {
            grid-area: stack; background: #ffffff; border: 1px solid #e5e7eb;
            width: 100%; height: auto; min-height: 100%;
            padding: clamp(30px, 3vw, 50px);
            border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            display: flex; justify-content: center; overflow: hidden;
            
            /* ESTADO INACTIVO: Invisible y desplazado a la derecha */
            opacity: 0; visibility: hidden; z-index: 1; pointer-events: none;
            
            /* 2. ANIMACIÓN "BARAJA" RESTAURADA */
            transform: translateX(200px) rotate(5deg) scale(0.95);
            transition: opacity 0.3s ease-out, visibility 0.3s ease-out, transform 0s 0.3s; 
        }
        
        .specialty-card.active {
            opacity: 1; visibility: visible; z-index: 10; pointer-events: auto;
            
            /* Posición final */
            transform: translateX(0) rotate(0deg) scale(1);
            
            /* Transición fluida */
            transition: opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .specialty-card::before {
            content: ''; position: absolute; z-index: -1;
            top: 5px; left: 5px; right: -5px; bottom: -5px;
            background: #f0f0f0; border: 1px solid #ddd; border-radius: 16px;
        }

        /* --- COLUMNAS BASE --- */
        .card-text-col { flex: 1 1 300px; min-width: 250px; }
        .card-img-col {
            flex: 1 1 300px; display: flex; justify-content: center;
            align-items: center; height: auto;
        }

        /* --- IMÁGENES BASE (Móvil) --- */
        .card-img-single, .card-img-secondary, .card-img-aws {
            height: auto; width: auto; object-fit: contain;
            animation: iconFloat 5s ease-in-out infinite;
        }
        .card-img-single { max-height: 250px; max-width: 100%; }
        .card-img-secondary { max-height: 180px; max-width: 90%; }
        .card-img-aws { max-height: 130px; max-width: 45%; }


        /* ========================================================= */
        /* ZONA CRÍTICA: 1000px - 1400px (HORIZONTAL OPTIMIZADO) */
        /* ========================================================= */
        @media (min-width: 1000px) and (max-width: 1399px) {
            
            .specialty-card {
                flex-direction: row; /* Horizontal */
                align-items: center; 
                /* 3. ALTURA REDUCIDA: De 480px a 380px para que no sea tan alta */
                min-height: 380px; 
            }

            .card-text-col {
                flex: 0 0 35%; /* Texto pequeño (35%) */
                min-width: 0;
                margin-right: 25px; 
            }

            .card-img-col {
                flex: 1; /* Imagen toma el 65% restante */
                justify-content: center;
                height: 100%;
            }

            /* Imágenes ajustadas a la nueva altura de la tarjeta */
            .card-img-single { max-height: 300px; } 
            .card-img-secondary { max-height: 220px; } 
            .card-img-aws { max-height: 170px; } 
            
            .card-text-col h4 { font-size: 1.6rem; }
        }


        /* ========================================================= */
        /* ESCRITORIO GRANDE (1400px+) */
        /* ========================================================= */
        @media (min-width: 1400px) {
            .specialty-card { flex-direction: row; align-items: center; }
            .card-text-col { flex: 0 0 35%; }
            .card-img-col { flex: 1; }
            
            .card-img-single { max-height: 420px; } 
            .card-img-secondary { max-height: 280px; } 
            .card-img-aws { max-height: 230px; }
        }

        /* ========================================================= */
        /* ULTRA WIDE (1600px+) */
        /* ========================================================= */
        @media (min-width: 1600px) {
            .content-grid { max-width: 1800px; gap: 80px; }
            .main-heading { font-size: 3.5rem; }
            .card-img-single { max-height: 480px; }
            .card-img-aws { max-height: 280px; }
        }

        /* ========================================================= */
        /* MÓVIL (< 1000px) - Todo vertical */
        /* ========================================================= */
        @media (max-width: 999px) {
            .specialty-card { flex-direction: column; text-align: center; }
            .card-text-col, .card-img-col { flex: 0 0 100% !important; min-width: 100% !important; width: 100%; }
            .card-img-col { margin-top: 30px; }
        }

        @media (max-width: 480px) {
             .services-section { padding: 100px 20px !important; }
             .content-grid { grid-template-columns: 1fr; gap: 30px; }
             .card-img-single { max-height: 180px; }
        }

        .wave-container { position: absolute; left: 0; width: 100%; height: 180px; overflow: hidden; line-height: 0; z-index: 1; pointer-events: none; }
        .top-waves { top: 0; }
        .bottom-waves { bottom: 0; transform: scaleY(-1); }
        .wave-svg { width: 100%; height: 100%; }
        .wave-anim-slow { animation: sway 6s ease-in-out infinite alternate; }
        @keyframes sway { 0% { transform: scaleY(1); } 100% { transform: scaleY(1.1); } }
        @keyframes iconFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        /* ========================================================= */
        /* FIX MÓVIL (< 480px) - CORRECCIÓN DE ONDAS */
        /* ========================================================= */
        @media (max-width: 480px) {
            .services-section {
                /* CORRECCIÓN: Aumentado de 100px a 220px */
                /* Las ondas miden 180px, así que necesitamos >180px para librarlas */
                padding: 220px 20px 220px !important; 
            }
            
            .content-grid { 
                grid-template-columns: 1fr; 
                gap: 40px; 
            }
            
            .main-heading { 
                font-size: 2rem; /* Tamaño legible en móvil */
                margin-bottom: 20px; 
            }

            .specialty-card { 
                padding: 25px 20px; 
            }
            
            .card-img-single { max-height: 180px; }
            .card-img-aws { max-height: 100px; max-width: 60%; }
        }
      `}</style>
    </section>
  );
};

const CardContent = ({ data }: { data: any }) => {
  const isAWS = data.id === 'aws';
  const isSecondaryImage = data.id === 'ai' || data.id === 'finops';

  return (
    <div style={{ 
        display: 'flex', width: '100%', gap: 'clamp(20px, 4vw, 40px)', 
        flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '100%' 
    }}>
      <div className="card-text-col">
        <h4 style={{ fontSize: 'clamp(1.4rem, 2vw, 1.7rem)', fontWeight: 800, margin: '0 0 10px 0', color: '#111' }}>{data.title}</h4>
        <div style={{ width: '40px', height: '4px', background: '#FAA918', marginBottom: '15px', margin: '0 auto 15px auto' }}></div>
        <p style={{ color: '#555', fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', lineHeight: 1.5 }}>{data.desc}</p>
      </div>

      <div className="card-img-col">
        {isAWS ? (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                {data.images.map((img: any, i: number) => (
                    // Se usa resolvePath para asegurar que la ruta sea correcta siempre
                    <img key={i} src={resolvePath(img.src)} alt={img.alt} className="card-img-aws" style={{ animationDelay: `${i * 1}s` }} />
                ))}
            </div>
        ) : (
          <img src={resolvePath(data.images[0].src)} alt={data.images[0].alt} className={isSecondaryImage ? "card-img-secondary" : "card-img-single"} />
        )}
      </div>
    </div>
  );
};