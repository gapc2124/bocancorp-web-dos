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
interface CardProps {
  item: ServiceItem;
  index: number;
  range: [number, number];
  progress: MotionValue<number>;
  isMobile: boolean;
}

const Card = ({ item, index, range, progress, isMobile }: CardProps) => {
  // Lógica de movimiento y escala
  const y = useTransform(progress, [range[0] - 0.10, range[0]], ['100vh', '0vh']);
  const cardY = index === 0 ? '0vh' : y;
  // En móvil, reducimos menos la escala para aprovechar la pantalla
  const scale = useTransform(progress, [range[0], range[1]], [1, isMobile ? 0.95 : 0.95]);

  return (
    <motion.div
      id={`service-${item.id}`} 
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
        paddingTop: isMobile ? '80px' : '120px', 
        boxSizing: 'border-box'
      }}
    >
      <div style={{
        // En móvil, la tarjeta ocupa el 95% del ancho para aprovechar el espacio
        width: isMobile ? '95%' : '80%', 
        // Aumentamos ligeramente el height en móvil para que el texto respire
        height: isMobile ? '80vh' : '65vh', 
        maxHeight: '750px', 
        backgroundColor: 'rgba(10, 16, 36, 0.5)', 
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${item.color}30`,
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        // Móvil: Imagen arriba, texto abajo (column). Desktop: Izquierda a derecha (row)
        flexDirection: isMobile ? 'column' : 'row',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        position: 'relative'
      }}>
        
        {/* COLUMNA: IMAGEN / MEDIA (Arriba en móvil, Derecha en Desktop) */}
        <div style={{
          // En móvil le damos una altura fija pequeña para dejar todo el espacio al texto
          flex: isMobile ? '0 0 150px' : 0.8, 
          position: 'relative',
          width: '100%',
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Ajustes de bordes según la orientación
          borderLeft: isMobile ? 'none' : `1px solid ${item.color}30`,
          borderBottom: isMobile ? `1px solid ${item.color}30` : 'none',
          order: isMobile ? 1 : 2 // 1 en móvil (arriba), 2 en desktop (derecha)
        }}>
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: isMobile 
                  ? `linear-gradient(to bottom, transparent 40%, rgba(10,16,36,1) 100%)`
                  : `linear-gradient(to right, rgba(10,16,36,0.95) 0%, transparent 40%, ${item.color}10 100%)`,
                pointerEvents: 'none'
            }} />
        </div>

        {/* COLUMNA: CONTENIDO TEXTUAL (Abajo en móvil, Izquierda en Desktop) */}
        <div style={{
          flex: 1, // Toma todo el espacio restante 
          padding: isMobile ? '20px 15px' : '50px', // Menos padding en móvil = más espacio para texto
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'center', // En móvil empieza desde arriba
          background: 'linear-gradient(135deg, rgba(10,16,36,0.8) 0%, rgba(5,8,20,0.9) 100%)',
          zIndex: 2,
          position: 'relative',
          overflowY: 'auto', // CRÍTICO PARA MÓVIL: Permite hacer scroll en el texto
          scrollbarWidth: 'none', // Ocultar scrollbar en Firefox
          msOverflowStyle: 'none',  // Ocultar scrollbar en IE/Edge
          order: isMobile ? 2 : 1 // 2 en móvil (abajo), 1 en desktop (izquierda)
        }}>
           {/* Ocultar barra de scroll en Chrome/Safari pero permitir scroll */}
           <style>{`
             div::-webkit-scrollbar { display: none; }
           `}</style>

           {/* Cabecera de Servicio */}
           <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '20px', marginBottom: '15px' }}> 
             <div style={{
               // Círculo del ID más pequeño en móvil
               width: isMobile ? '35px' : '45px', 
               height: isMobile ? '35px' : '45px', 
               borderRadius: '50%', 
               background: item.color, color: '#000', fontWeight: '900',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               fontSize: isMobile ? '1.1rem' : '1.3rem', 
               boxShadow: `0 0 15px ${item.color}80`,
               flexShrink: 0 // Evita que el círculo se aplaste si el título es largo
             }}>
               {item.id}
             </div>
             <div>
                <span style={{ color: item.color, fontWeight: 700, letterSpacing: '1px', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>
                    // {item.subtitle}
                </span>
                {/* Título fluido con clamp: Mínimo 1.3rem, Escala con el ancho, Máximo 2.2rem */}
                <h3 style={{ color: 'white', fontSize: 'clamp(1.3rem, 5vw, 2.2rem)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}> 
                  {item.title}
                </h3>
             </div>
           </div>
           
           {/* Renderizado de Bloques de Contenido */}
           <div style={{ color: '#dbe4ff', fontSize: isMobile ? '0.9rem' : '1rem', lineHeight: isMobile ? 1.5 : 1.6 }}> 
             {item.content.map((block, i) => {
               if (block.type === 'highlight') {
                 return (
                   <div key={i} style={{ margin: '15px 0', paddingLeft: '12px', borderLeft: `3px solid ${item.color}` }}> 
                     <h4 style={{ 
                       color: 'white', fontSize: isMobile ? '1rem' : '1.1rem', fontWeight: 700, marginBottom: '6px', 
                       textTransform: 'uppercase', display: 'inline-block',
                       borderBottom: `2px solid ${item.color}`, paddingBottom: '3px'
                     }}>
                       {block.title}
                     </h4>
                     <p style={{ margin: 0 }}>{block.text}</p>
                   </div>
                 );
               } else {
                 return <p key={i} style={{ marginBottom: '12px' }}>{block.text}</p>; 
               }
             })}
           </div>

           {/* BOTÓN DE CONTRATACIÓN */}
           <div style={{ marginTop: 'auto', paddingTop: '20px' }}> {/* marginTop: auto empuja el botón al final si hay espacio */}
             <motion.button
               whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${item.color}60` }}
               whileTap={{ scale: 0.95 }}
               style={{
                 width: isMobile ? '100%' : 'auto', // Botón ancho completo en móvil
                 padding: isMobile ? '14px 20px' : '12px 28px', 
                 backgroundColor: isMobile ? `${item.color}15` : 'transparent', // Un poco de fondo en móvil para destacar
                 color: 'white',
                 border: `2px solid ${item.color}`,
                 borderRadius: '50px',
                 fontSize: isMobile ? '0.9rem' : '0.95rem', 
                 fontWeight: '800',
                 textTransform: 'uppercase',
                 letterSpacing: '1px',
                 cursor: 'pointer',
                 transition: 'background-color 0.3s ease',
                 textAlign: 'center'
               }}
               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${item.color}30`)}
               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isMobile ? `${item.color}15` : 'transparent')}
             >
               Contratar servicio
             </motion.button>
           </div>
        </div>

      </div>
    </motion.div>
  );
};