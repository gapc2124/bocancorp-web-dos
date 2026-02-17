import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

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

// --- COMPONENTE PRINCIPAL ---
export const StackingCards = ({ data, isMobile }: StackingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Detectamos el progreso del scroll dentro del contenedor gigante
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
      {/* Contenedor Sticky: Mantiene las cartas fijas mientras se scrollea el padre */}
      <div style={{ 
        position: 'sticky', 
        // 1. AJUSTE: top aumentado para bajar las tarjetas en desktop
        top: isMobile ? '80px' : '120px', 
        height: '100vh', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
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
              total={data.length} 
              isMobile={isMobile} 
            />
          );
        })}
      </div>
    </div>
  );
};

// --- SUB-COMPONENTE TARJETA ---
interface CardProps {
  item: ServiceItem;
  index: number;
  range: [number, number];
  progress: MotionValue<number>;
  total: number;
  isMobile: boolean;
}

const Card = ({ item, index, range, progress, total, isMobile }: CardProps) => {
  // Lógica de movimiento y escala
  const y = useTransform(progress, [range[0] - 0.10, range[0]], ['100vh', '0vh']);
  const cardY = index === 0 ? '0vh' : y;
  const scale = useTransform(progress, [range[0], range[1]], [1, isMobile ? 0.9 : 0.95]);

  return (
    <motion.div
      // ID CRUCIAL: Permite que el Nav dirija el scroll a esta posición exacta
      id={`service-${item.id}`} 
      style={{
        y: cardY,
        scale: scale,
        opacity: 1,
        zIndex: index,
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex', 
        alignItems: 'flex-start', // Cambiado de 'center' a 'flex-start' para respetar el top
        justifyContent: 'center',
      }}
    >
      {/* Estructura Visual de la Carta */}
      <div style={{
        // 2. AJUSTE: width y height reducidos para que sea un poco más pequeña
        width: isMobile ? '90%' : '80%', // Reducido de 85% a 80%
        height: isMobile ? '80vh' : '65vh', // Reducido de 75vh a 65vh
        minHeight: isMobile ? 'auto' : '550px', // Reducido el minHeight también
        backgroundColor: 'rgba(10, 16, 36, 0.5)', 
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${item.color}30`,
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        position: 'relative',
        marginTop: isMobile ? '0' : '20px' // Margen superior extra para alejarla del nav
      }}>
        
        {/* COLUMNA IZQUIERDA: CONTENIDO TEXTUAL */}
        <div style={{
          flex: isMobile ? 'auto' : 1.8, 
          padding: isMobile ? '25px' : '50px', // Reducido el padding para compensar el menor tamaño
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(10,16,36,0.8) 0%, rgba(5,8,20,0.9) 100%)',
          zIndex: 2,
          position: 'relative',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: `${item.color}30 transparent`
        }}>
           {/* Cabecera de Servicio */}
           <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}> {/* Margen reducido */}
             <div style={{
               width: '45px', height: '45px', borderRadius: '50%', // Reducido ligeramente
               background: item.color, color: '#000', fontWeight: '900',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               fontSize: '1.3rem', boxShadow: `0 0 15px ${item.color}80` // Fuente reducida
             }}>
               {item.id}
             </div>
             <div>
                <span style={{ color: item.color, fontWeight: 700, letterSpacing: '2px', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>
                    // {item.subtitle}
                </span>
                <h3 style={{ color: 'white', fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight: 800, lineHeight: 1.1, margin: 0 }}> {/* Fuente reducida */}
                  {item.title}
                </h3>
             </div>
           </div>
           
           {/* Renderizado de Bloques de Contenido */}
           <div style={{ color: '#dbe4ff', fontSize: isMobile ? '0.95rem' : '1rem', lineHeight: 1.6 }}> {/* Fuente e interlineado reducidos */}
             {item.content.map((block, i) => {
               if (block.type === 'highlight') {
                 return (
                   <div key={i} style={{ margin: '20px 0', paddingLeft: '15px', borderLeft: `3px solid ${item.color}` }}> {/* Márgenes reducidos */}
                     <h4 style={{ 
                       color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', // Fuente reducida
                       textTransform: 'uppercase', display: 'inline-block',
                       borderBottom: `2px solid ${item.color}`, paddingBottom: '3px'
                     }}>
                       {block.title}
                     </h4>
                     <p style={{ margin: 0 }}>{block.text}</p>
                   </div>
                 );
               } else {
                 return <p key={i} style={{ marginBottom: '15px' }}>{block.text}</p>; // Margen reducido
               }
             })}
           </div>

           {/* BOTÓN DE CONTRATACIÓN */}
           <div style={{ marginTop: '20px' }}> {/* Margen reducido */}
             <motion.button
               whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${item.color}60` }}
               whileTap={{ scale: 0.95 }}
               style={{
                 padding: isMobile ? '12px 24px' : '12px 28px', // Padding reducido
                 backgroundColor: 'transparent',
                 color: 'white',
                 border: `2px solid ${item.color}`,
                 borderRadius: '50px',
                 fontSize: isMobile ? '0.9rem' : '0.95rem', // Fuente reducida
                 fontWeight: '700',
                 textTransform: 'uppercase',
                 letterSpacing: '1px',
                 cursor: 'pointer',
                 transition: 'background-color 0.3s ease',
               }}
               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${item.color}20`)}
               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
             >
               Contratar servicio
             </motion.button>
           </div>
        </div>

        {/* COLUMNA DERECHA: IMAGEN / MEDIA */}
        <div style={{
          flex: isMobile ? '0 0 200px' : 0.8, 
          position: 'relative',
          height: isMobile ? '200px' : '100%',
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderLeft: isMobile ? 'none' : `1px solid ${item.color}30`,
          borderBottom: isMobile ? `1px solid ${item.color}30` : 'none'
        }}>
            {/* Máscara de gradiente para suavizar la unión con el texto */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: isMobile 
                  ? `linear-gradient(to top, rgba(10,16,36,1) 0%, transparent 40%)`
                  : `linear-gradient(to right, rgba(10,16,36,0.95) 0%, transparent 40%, ${item.color}10 100%)`,
                pointerEvents: 'none'
            }} />
        </div>

      </div>
    </motion.div>
  );
};