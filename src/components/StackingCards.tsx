import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom'; // 👈 Agregamos useParams para el botón

// --- UTILIDAD PARA RUTAS DE IMÁGENES ---
const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.replace(/^(\.?\/)/, '');
  return `${base}${cleanPath}`;
};

// --- INTERFACES ---
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
      {/* ANCLAS INVISIBLES MATEMÁTICAMENTE SINCRONIZADAS */}
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
  const { lang: urlLang } = useParams(); 
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';
  
  const [isUltraNarrow, setIsUltraNarrow] = useState(window.innerWidth < 660);

  useEffect(() => {
    const handleResize = () => setIsUltraNarrow(window.innerWidth < 660);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const y = useTransform(progress, [range[0] - 0.10, range[0]], ['100vh', '0vh']);
  const cardY = index === 0 ? '0vh' : y;
  const scale = useTransform(progress, [range[0], range[1]], [1, isMobile ? 0.95 : 0.95]);

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
        height: isMobile ? 'auto' : '65vh', 
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
          // 👇 Reducimos la altura de la imagen en móvil para dar más espacio al texto
          flex: isUltraNarrow ? '0 0 100px' : (isMobile ? '0 0 120px' : 0.8),
          position: 'relative',
          width: '100%',
          // 👇 1. SOLUCIÓN DE IMÁGENES: Usamos resolvePath aquí
          backgroundImage: `url(${resolvePath(item.image)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderLeft: isMobile ? 'none' : `1px solid ${item.color}30`,
          borderBottom: isMobile ? `1px solid ${item.color}30` : 'none',
          order: isMobile ? 1 : 2 
        }}>
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: isMobile 
                  ? `linear-gradient(to bottom, transparent 10%, rgba(10,16,36,1) 100%)`
                  : `linear-gradient(to right, rgba(10,16,36,0.95) 0%, transparent 40%, ${item.color}10 100%)`,
                pointerEvents: 'none'
            }} />
        </div>

        {/* COLUMNA: CONTENIDO TEXTUAL */}
        <div className="stacking-card-content" style={{
          flex: isMobile ? '1' : 1.2, 
          // 👇 Reducción de paddings
          padding: isUltraNarrow ? '10px 15px 15px' : (isMobile ? '15px 20px 20px' : '30px 40px'), 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Ayuda a distribuir el espacio sin scroll
          background: 'linear-gradient(135deg, rgba(10,16,36,0.8) 0%, rgba(5,8,20,0.9) 100%)',
          zIndex: 2,
          position: 'relative',
          // 👇 2. ELIMINAMOS SCROLL INTERNO
          overflow: 'hidden', 
          order: isMobile ? 2 : 1 
        }}>

           {/* Cabecera de Servicio */}
           <div style={{ display: 'flex', alignItems: 'flex-start', gap: isUltraNarrow ? '10px' : '15px', marginBottom: isUltraNarrow ? '10px' : '20px' }}> 
             <div style={{
               width: isUltraNarrow ? '30px' : '40px', 
               height: isUltraNarrow ? '30px' : '40px', 
               borderRadius: '50%', 
               background: item.color, color: '#000', fontWeight: '900',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               fontSize: isUltraNarrow ? '0.9rem' : '1.1rem', 
               boxShadow: `0 0 20px ${item.color}60`,
               flexShrink: 0,
               marginTop: '2px' 
             }}>
               {item.id}
             </div>
             <div>
                <span style={{ color: item.color, fontWeight: 700, letterSpacing: '1px', fontSize: '0.65rem', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    // {item.subtitle}
                </span>
                <h3 style={{ color: 'white', fontSize: isUltraNarrow ? '1.1rem' : 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 900, lineHeight: 1.1, margin: 0 }}> 
                  {item.title}
                </h3>
             </div>
           </div>
           
           {/* Renderizado de Bloques de Contenido */}
           <div style={{ color: '#dbe4ff', fontSize: isUltraNarrow ? '0.8rem' : '0.95rem', lineHeight: isMobile ? 1.3 : 1.5 }}> 
             {item.content.map((block, i) => {
               if (block.type === 'highlight') {
                 return (
                   // 👇 Márgenes y paddings muy reducidos en el Highlight
                   <div key={i} className="highlight-box" style={{ margin: isMobile ? '8px 0' : '12px 0', paddingLeft: '10px', borderLeft: `3px solid ${item.color}`, backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '0 8px 8px 0' }}> 
                     <h4 className="highlight-title" style={{ 
                       color: 'white', fontSize: isUltraNarrow ? '0.8rem' : '0.95rem', fontWeight: 800, marginBottom: '4px', 
                       textTransform: 'uppercase', display: 'inline-block',
                       borderBottom: `1px solid ${item.color}`, paddingBottom: '2px'
                     }}>
                       {block.title}
                     </h4>
                     <p style={{ margin: 0, color: '#e2e8f0' }}>{block.text}</p>
                   </div>
                 );
               } else {
                 return <p key={i} style={{ marginBottom: isUltraNarrow ? '6px' : '10px' }}>{block.text}</p>; 
               }
             })}
           </div>

           {/* BOTÓN DE CONTRATACIÓN */}
           <div style={{ marginTop: 'auto', paddingTop: '10px' }}> 
             <motion.button
               onClick={() => navigate(`/${currentLang.toLowerCase()}/contacto`)}
               whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${item.color}80` }}
               whileTap={{ scale: 0.95 }}
               style={{
                 width: '100%', 
                 padding: isMobile ? '10px 15px' : '12px 25px', 
                 backgroundColor: isMobile ? `${item.color}20` : 'transparent', 
                 color: 'white',
                 border: `2px solid ${item.color}`,
                 borderRadius: '50px',
                 fontSize: isMobile ? '0.8rem' : '0.9rem', 
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