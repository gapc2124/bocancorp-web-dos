import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

// --- INTERFACES RESTAURADAS EN SU LUGAR ORIGINAL ---
type ContentBlock = 
  | { type: 'paragraph'; text: string }
  | { type: 'highlight'; title: string; text: string };

export interface ServiceItem {
  id: number;
  subtitle: string;
  title: string;
  color: string;
  image: string;
  content: ContentBlock[];
}

interface StackingCardsProps {
  data: ServiceItem[];
  isMobile: boolean;
}

interface CardProps {
  item: ServiceItem;
  index: number;
  range: [number, number];
  progress: MotionValue<number>;
  isMobile: boolean;
}

// --- COMPONENTE PRINCIPAL ---
export const StackingCards = ({ data, isMobile }: StackingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: `${data.length * 100}vh`, 
        position: 'relative', 
        width: '100%' 
      }}
    >
      {/* 🚀 ANCLAS INVISIBLES MATEMÁTICAMENTE SINCRONIZADAS */}
      {data.map((item, index) => (
        <div 
          key={`anchor-${item.id}`}
          id={`service-${item.id}`} 
          style={{
            position: 'absolute',
            top: `calc(${index / data.length} * (100% - 100vh))`, 
            left: 0,
            width: '100%',
            height: '1px',
            pointerEvents: 'none',
            visibility: 'hidden'
          }}
        />
      ))}

      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden' 
      }}>
        {data.map((item, index) => {
          const rangeStart = index * (1 / data.length);
          const rangeEnd = rangeStart + (1 / data.length);
          return (
            <Card 
              key={item.id} 
              item={item} 
              index={index} 
              range={[rangeStart, rangeEnd]} 
              progress={scrollYProgress} 
              isMobile={isMobile} 
            />
          );
        })}
      </div>
    </div>
  );
};

// --- SUB-COMPONENTE TARJETA ---
const Card = ({ item, index, range, progress, isMobile }: CardProps) => {
  const navigate = useNavigate(); 
  
  // Lógica para el rango ultra-angosto (< 660px)
  const [isUltraNarrow, setIsUltraNarrow] = useState(window.innerWidth < 660);

  useEffect(() => {
    const handleResize = () => setIsUltraNarrow(window.innerWidth < 660);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const y = useTransform(progress, [range[0] - 0.10, range[0]], ['100vh', '0vh']);
  const cardY = index === 0 ? '0vh' : y;
  const scale = useTransform(progress, [range[0], range[1]], [1, isMobile ? 0.95 : 0.95]);

  // Traducción rápida del botón basada en el Nav
  const currentLang = localStorage.getItem('appLanguage') || 'ES';
  const btnText = currentLang === 'EN' ? 'Request Consultation' : 'Solicitar asesoría';

  return (
    <motion.div
      style={{
        y: cardY,
        scale: scale,
        opacity: 1,
        zIndex: index,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: isMobile ? '80px' : '100px', 
        boxSizing: 'border-box'
      }}
    >
      <div style={{
        width: isUltraNarrow ? '94%' : (isMobile ? '90%' : '75%'), 
        // 🚀 FIX CLAVE: Auto en móviles para que crezca y no corte el botón.
        height: isMobile ? 'auto' : '65vh', 
        // Límite máximo para que no se salga de la pantalla (evita que tape el Nav)
        maxHeight: isMobile ? 'calc(100vh - 120px)' : '750px', 
        backgroundColor: 'rgba(10, 16, 36, 0.85)', 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${item.color}30`,
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        position: 'relative'
      }}>
        
        {/* COLUMNA: IMAGEN / MEDIA */}
        <div style={{
          // Ajuste de altura de imagen: 130px en <660px, 160px en 660-1024px
          flex: isUltraNarrow ? '0 0 130px' : (isMobile ? '0 0 160px' : 0.8),
          position: 'relative',
          width: '100%',
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderLeft: isMobile ? 'none' : `1px solid ${item.color}30`,
          borderBottom: isMobile ? `1px solid ${item.color}30` : 'none',
          order: isMobile ? 1 : 2 
        }}>
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: isMobile 
                  ? `linear-gradient(to bottom, transparent 20%, rgba(10,16,36,1) 100%)`
                  : `linear-gradient(to right, rgba(10,16,36,0.95) 0%, transparent 40%, ${item.color}10 100%)`,
                pointerEvents: 'none'
            }} />
        </div>

        {/* COLUMNA: CONTENIDO TEXTUAL */}
        <div className="stacking-card-content" style={{
          flex: isMobile ? '1' : 1.2, 
          // Paddings ajustados para no empujar el botón fuera de la vista
          padding: isUltraNarrow ? '15px 15px 20px' : (isMobile ? '20px 25px 25px' : '40px 50px'), 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'center',
          background: 'linear-gradient(135deg, rgba(10,16,36,0.8) 0%, rgba(5,8,20,0.9) 100%)',
          zIndex: 2,
          position: 'relative',
          // 🚀 CÓDIGO RESTAURADO: Si el texto es MUY largo, permite scroll pero oculta la barra
          overflowY: 'auto', 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none', 
          order: isMobile ? 2 : 1 
        }}>
           {/* 🚀 CÓDIGO RESTAURADO */}
           <style>{`div::-webkit-scrollbar { display: none; }`}</style>

           {/* Cabecera de Servicio */}
           <div style={{ display: 'flex', alignItems: 'flex-start', gap: isUltraNarrow ? '12px' : '20px', marginBottom: isUltraNarrow ? '15px' : '30px' }}> 
             <div style={{
               width: isUltraNarrow ? '35px' : '45px', 
               height: isUltraNarrow ? '35px' : '45px', 
               borderRadius: '50%', 
               background: item.color, color: '#000', fontWeight: '900',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               fontSize: isUltraNarrow ? '1rem' : '1.3rem', 
               boxShadow: `0 0 20px ${item.color}60`,
               flexShrink: 0,
               marginTop: '2px' 
             }}>
               {item.id}
             </div>
             <div>
                <span style={{ color: item.color, fontWeight: 700, letterSpacing: '1px', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    // {item.subtitle}
                </span>
                <h3 style={{ color: 'white', fontSize: isUltraNarrow ? '1.3rem' : 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, lineHeight: 1.1, margin: 0 }}> 
                  {item.title}
                </h3>
             </div>
           </div>
           
           {/* Renderizado de Bloques de Contenido */}
           <div style={{ color: '#dbe4ff', fontSize: isUltraNarrow ? '0.9rem' : '1.05rem', lineHeight: isMobile ? 1.5 : 1.7 }}> 
             {item.content.map((block, i) => {
               if (block.type === 'highlight') {
                 return (
                   <div key={i} className="highlight-box" style={{ margin: isMobile ? '15px 0' : '20px 0', paddingLeft: '15px', borderLeft: `3px solid ${item.color}`, backgroundColor: 'rgba(255,255,255,0.02)', padding: '12px 12px 12px 15px', borderRadius: '0 8px 8px 0' }}> 
                     <h4 className="highlight-title" style={{ 
                       color: 'white', fontSize: isUltraNarrow ? '0.9rem' : '1.1rem', fontWeight: 800, marginBottom: '8px', 
                       textTransform: 'uppercase', display: 'inline-block',
                       borderBottom: `2px solid ${item.color}`, paddingBottom: '3px'
                     }}>
                       {block.title}
                     </h4>
                     <p style={{ margin: 0, color: '#e2e8f0' }}>{block.text}</p>
                   </div>
                 );
               } else {
                 return <p key={i} style={{ marginBottom: isUltraNarrow ? '10px' : '15px' }}>{block.text}</p>; 
               }
             })}
           </div>

           {/* BOTÓN DE CONTRATACIÓN */}
           <div style={{ marginTop: 'auto', paddingTop: '15px' }}> 
             <motion.button
               onClick={() => navigate('/contacto')}
               whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${item.color}80` }}
               whileTap={{ scale: 0.95 }}
               style={{
                 width: isMobile ? '100%' : 'auto', 
                 padding: isMobile ? '14px 20px' : '15px 35px', 
                 backgroundColor: isMobile ? `${item.color}20` : 'transparent', 
                 color: 'white',
                 border: `2px solid ${item.color}`,
                 borderRadius: '50px',
                 fontSize: isMobile ? '0.9rem' : '1rem', 
                 fontWeight: '800',
                 textTransform: 'uppercase',
                 letterSpacing: '1px',
                 cursor: 'pointer',
                 transition: 'background-color 0.3s ease',
                 textAlign: 'center'
               }}
               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${item.color}40`)}
               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isMobile ? `${item.color}20` : 'transparent')}
             >
               {btnText}
             </motion.button>
           </div>
        </div>

      </div>
    </motion.div>
  );
};