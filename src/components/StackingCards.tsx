import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

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
  const scale = useTransform(progress, [range[0], range[1]], [1, 0.95]);

  const btnText = currentLang === 'EN' ? 'Request Consultation' : 'Solicitar asesoría';

  return (
    <motion.div
      style={{
        y: cardY,
        scale: scale,
        zIndex: index,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: isMobile ? '60px' : '100px', 
        boxSizing: 'border-box'
      }}
    >
      <div style={{
        width: isUltraNarrow ? '92%' : (isMobile ? '90%' : '75%'), 
        // Tarjeta con altura suficiente en móviles para acomodar la nueva letra más grande
        height: isMobile ? '88vh' : '65vh', 
        backgroundColor: 'rgba(10, 16, 36, 0.92)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${item.color}40`,
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
        position: 'relative'
      }}>
        
        {/* MEDIA SECTION */}
        <div style={{
          // 👇 AUMENTO EJE Y EN IMÁGENES MÓVILES: de 170px a 190px
          flex: isUltraNarrow ? '0 0 160px' : (isMobile ? '0 0 190px' : 0.8),
          position: 'relative',
          width: '100%',
          backgroundImage: `url(${resolvePath(item.image)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          order: isMobile ? 1 : 2 
        }}>
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: isMobile 
                  ? `linear-gradient(to bottom, transparent 0%, rgba(10,16,36,1) 100%)`
                  : `linear-gradient(to right, rgba(10,16,36,0.95) 0%, transparent 40%, ${item.color}10 100%)`,
                pointerEvents: 'none'
            }} />
        </div>

        {/* CONTENT SECTION */}
        <div style={{
          flex: isMobile ? '1' : 1.2, 
          padding: isUltraNarrow ? '15px 18px' : (isMobile ? '20px 25px' : '30px 40px'), 
          display: 'flex',
          flexDirection: 'column',
          background: 'transparent',
          zIndex: 2,
          position: 'relative',
          overflow: 'hidden', 
          order: isMobile ? 2 : 1 
        }}>

           {/* Cabecera compacta pero con letra más grande */}
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: isMobile ? '12px' : '20px' }}> 
             <div style={{
               width: isUltraNarrow ? '32px' : (isMobile ? '38px' : '40px'), 
               height: isUltraNarrow ? '32px' : (isMobile ? '38px' : '40px'), 
               borderRadius: '50%', 
               background: item.color, color: '#000', fontWeight: '900',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               fontSize: isUltraNarrow ? '1rem' : (isMobile ? '1.2rem' : '1.1rem'), 
               flexShrink: 0
             }}>
               {item.id}
             </div>
             <div>
                {/* 👇 SUBTÍTULO: De 0.7rem a 0.8rem en móviles */}
                <span style={{ color: item.color, fontWeight: 700, fontSize: isMobile ? '0.8rem' : '0.65rem', textTransform: 'uppercase', display: 'block' }}>
                    // {item.subtitle}
                </span>
                {/* 👇 TÍTULO PRINCIPAL: De 1.45rem a 1.8rem en móviles */}
                <h3 style={{ color: 'white', fontSize: isUltraNarrow ? '1.5rem' : (isMobile ? '1.8rem' : '1.8rem'), fontWeight: 900, lineHeight: 1.1, margin: 0 }}> 
                  {item.title}
                </h3>
             </div>
           </div>
           
           {/* 👇 TEXTO DE PÁRRAFOS: Incremento notorio a 1.1rem en móviles normales (1rem en pequeños) */}
           <div style={{ 
             color: '#dbe4ff', 
             fontSize: isUltraNarrow ? '1rem' : (isMobile ? '1.1rem' : '0.95rem'), 
             lineHeight: isMobile ? 1.4 : 1.5 
           }}> 
             {item.content.map((block, i) => {
               if (block.type === 'highlight') {
                 return (
                   <div key={i} style={{ 
                     margin: isMobile ? '10px 0' : '15px 0', 
                     padding: '10px 12px', 
                     borderLeft: `2px solid ${item.color}`, 
                     backgroundColor: 'rgba(255,255,255,0.03)', 
                     borderRadius: '0 8px 8px 0' 
                   }}> 
                     {/* 👇 TÍTULO DEL HIGHLIGHT MÁS GRANDE */}
                     <h4 style={{ 
                       color: 'white', 
                       fontSize: isUltraNarrow ? '1rem' : (isMobile ? '1.1rem' : '0.95rem'), 
                       fontWeight: 800, 
                       marginBottom: '4px', 
                       textTransform: 'uppercase'
                     }}>
                       {block.title}
                     </h4>
                     <p style={{ marginTop: 0, marginBottom: 0, color: '#cbd5e1' }}>{block.text}</p>
                   </div>
                 );
               } else {
                 return <p key={i} style={{ marginTop: 0, marginBottom: isMobile ? '8px' : '10px' }}>{block.text}</p>; 
               }
             })}
           </div>

           {/* Botón de acción */}
           <div style={{ marginTop: 'auto', paddingTop: '15px' }}> 
             <motion.button
               onClick={() => navigate(`/${currentLang.toLowerCase()}/contacto`)}
               whileTap={{ scale: 0.98 }}
               style={{
                 width: '100%', 
                 padding: isMobile ? '12px' : '14px', 
                 backgroundColor: isMobile ? `${item.color}15` : 'transparent', 
                 color: 'white',
                 border: `1px solid ${item.color}`,
                 borderRadius: '12px',
                 /* 👇 BOTÓN: Texto más grande (1rem) en móviles */
                 fontSize: isMobile ? '1rem' : '0.9rem', 
                 fontWeight: '800',
                 textTransform: 'uppercase',
                 letterSpacing: '1px',
                 cursor: 'pointer'
               }}
             >
               {btnText}
             </motion.button>
           </div>
        </div>

      </div>
    </motion.div>
  );
};