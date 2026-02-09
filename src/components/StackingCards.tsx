import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ServiceItem {
  id: number;
  subtitle: string;
  title: string;
  desc: string;
  color: string;
}

interface StackingCardsProps {
  data: ServiceItem[];
  isMobile: boolean;
}

export const StackingCards = ({ data, isMobile }: StackingCardsProps) => {
  // Creamos una referencia al contenedor gigante que dará el espacio de scroll
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectamos el progreso del scroll SOLAMENTE dentro de este contenedor (0 a 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    // CONTENEDOR DE SCROLL (Alto dinámico según cantidad de cartas)
    <div 
      ref={containerRef} 
      style={{ 
        height: `${data.length * 100}vh`, // Cada tarjeta añade 1 pantalla de scroll
        position: 'relative',
        width: '100%' 
      }}
    >
      {/* CONTENEDOR STICKY (Se queda fijo mientras scrolleas el padre) */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden', // Importante para recortar las que entran/salen
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {data.map((item, index) => (
          <Card 
            key={item.id}
            item={item}
            index={index}
            total={data.length}
            progress={scrollYProgress}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

// --- COMPONENTE TARJETA INDIVIDUAL ---
interface CardProps {
  item: ServiceItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isMobile: boolean;
}

const Card = ({ item, index, total, progress, isMobile }: CardProps) => {
  // LÓGICA MATEMÁTICA (Réplica de GSAP)
  
  // 1. Calculamos el "momento" de esta tarjeta en el timeline global (0 a 1)
  // Cada tarjeta tiene un segmento de tiempo igual a 1/total
  const step = 1 / total;
  const start = index * step;
  const end = start + step;

  // 2. Animación de ENTRADA (Y): 
  // La tarjeta entra desde abajo (100% Y) hasta su sitio (0% Y)
  // Esto ocurre durante el turno de la tarjeta ANTERIOR.
  const y = useTransform(
    progress,
    [start - step, start], // Desde que empieza la anterior hasta que empieza esta
    ['100%', '0%'] // Se mueve de abajo a arriba
  );
  
  // Excepción: La primera tarjeta siempre está visible al principio (no entra)
  const realY = index === 0 ? '0%' : y;

  // 3. Animación de SALIDA (Escala):
  // Cuando le toca a la SIGUIENTE tarjeta entrar, esta se hace pequeña.
  const scale = useTransform(
    progress,
    [start, end], // Durante "mi turno" (mientras la siguiente va subiendo)
    [1, 0.9] // Me hago pequeño
  );

  // 4. Animación de Opacidad/Brillo (Opcional, para dar profundidad)
  const opacity = useTransform(
    progress,
    [start, end], 
    [1, 0.5] // Se oscurece un poco al irse atrás
  );

  return (
    <motion.div
      style={{
        y: realY,
        scale: scale,
        opacity: index === total - 1 ? 1 : opacity, // La última no se oscurece
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Aseguramos que esté encima de las anteriores
        zIndex: index, 
      }}
    >
      {/* DISEÑO DE LA TARJETA (Adaptado de tu CSS al estilo React) */}
      <div style={{
        width: isMobile ? '90%' : '80%',
        height: isMobile ? '80%' : '70vh',
        backgroundColor: '#050A18', // Fondo oscuro
        border: `1px solid ${item.color}40`,
        borderRadius: '30px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative'
      }}>
        
        {/* LADO IZQUIERDO: CONTENIDO */}
        <div style={{
          flex: 1,
          padding: isMobile ? '30px' : '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          background: 'rgba(5, 10, 24, 0.9)', // Un poco de solidez
        }}>
          {/* Número Flotante */}
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: item.color, color: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 'bold',
            marginBottom: '30px'
          }}>
            {item.id}
          </div>

          <h3 style={{ 
            fontSize: isMobile ? '2rem' : '3.5rem', 
            fontWeight: 800, 
            color: 'white', 
            lineHeight: 1.1, 
            marginBottom: '20px' 
          }}>
            {item.title}
          </h3>
          
          <p style={{ 
            color: '#ccc', 
            fontSize: isMobile ? '1rem' : '1.25rem', 
            lineHeight: 1.6 
          }}>
            {item.desc}
          </p>

          <div style={{ marginTop: 'auto', paddingTop: '30px' }}>
            <span style={{ 
              color: item.color, 
              fontWeight: 700, 
              letterSpacing: '2px', 
              textTransform: 'uppercase',
              fontSize: '0.9rem'
            }}>
              // {item.subtitle}
            </span>
          </div>
        </div>

        {/* LADO DERECHO: MEDIA / DECORACIÓN (Reemplaza al video del ejemplo) */}
        <div style={{
          flex: 1,
          background: `radial-gradient(circle at center, ${item.color}20, transparent 80%), #000`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
           {/* Círculo decorativo abstracto (Simulando el media) */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             style={{
               width: '80%',
               height: '80%',
               borderRadius: '40%',
               border: `2px dashed ${item.color}`,
               opacity: 0.3,
               position: 'absolute'
             }}
           />
           <div style={{
               width: '50%', height: '50%', background: item.color, 
               filter: 'blur(100px)', opacity: 0.4, borderRadius: '50%'
           }} />
        </div>

      </div>
    </motion.div>
  );
};