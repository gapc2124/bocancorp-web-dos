import { useState } from 'react'; 
import { Canvas } from '@react-three/fiber';
import { useParams } from 'react-router-dom'; 
import { InteractiveParticles } from './InteractiveParticles';

// --- DICCIONARIO DE TEXTOS ---
const HERO_TEXTS: any = {
  ES: {
    title: "Tu negocio en la Nube, potenciado por Ingeniería de Elite.",
    subtitle: "Construimos aplicaciones que no envejecen y estructuras cloud que se activan solas. El futuro de tu empresa se programa hoy."
  },
  EN: {
    title: "Your business in the Cloud, powered by Elite Engineering.",
    subtitle: "We build applications that don't age and cloud structures that self-activate. The future of your company is programmed today."
  }
};

export const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // 👇 LEEMOS EL IDIOMA DIRECTO DE LA URL
  const { lang: urlLang } = useParams(); 
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';

  return (
    <section 
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '90vh', 
        paddingTop: '140px', 
        paddingBottom: '0', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#000c2d',
      }}
      onPointerMove={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
      
      {/* CAPA 1: FONDO 3D */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0
      }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <InteractiveParticles isHovering={isHovering} />
        </Canvas>
      </div>
      
      {/* CAPA 2: CONTENIDO */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        width: '95%',
        height: '100%',
        flex: 1, 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
        
        {/* 1. TÍTULO Y SUBTÍTULO DINÁMICO */}
        <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', // 👈 Apilamos título y subtítulo
            alignItems: 'center', 
            justifyContent: 'center',
            paddingBottom: '50px',
            gap: '24px' // 👈 Espacio entre título y subtítulo
        }}>
            <h1 className="hero-title" style={{ pointerEvents: 'auto' }}>
              {HERO_TEXTS[currentLang].title}
            </h1>
            <p className="hero-subtitle" style={{ pointerEvents: 'auto' }}>
              {HERO_TEXTS[currentLang].subtitle}
            </p>
        </div>

        {/* 2. CARRUSEL (Pegado abajo) */}
        <div style={{ 
            width: '100vw', 
            maxWidth: '100%', 
            pointerEvents: 'none',
            marginTop: 'auto', 
            paddingBottom: '20px'
        }}>
           {/* Aquí iría tu componente de carrusel de logos si lo tienes */}
        </div>

      </div>

      <style>{`
        .hero-title {
            font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-weight: 800;
            font-size: clamp(2.5rem, 5vw, 5.5rem); 
            line-height: 1.1;
            letter-spacing: -2px;
            margin-bottom: 0;
            background: linear-gradient(to right, #ffffff 30%, #FAA918 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            cursor: text; 
            max-width: 1100px;
            filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
            transition: opacity 0.3s ease;
        }
        
        /* 👇 Nuevos estilos para el subtítulo */
        .hero-subtitle {
            font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-weight: 400;
            font-size: clamp(1.1rem, 2vw, 1.4rem);
            line-height: 1.5;
            color: #cbd5e1; /* Color gris claro/azulado que combina bien con fondos oscuros */
            max-width: 850px;
            margin: 0;
            cursor: text;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }
      `}</style>
    </section>
  );
};