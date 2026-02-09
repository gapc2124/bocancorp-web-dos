import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { InteractiveParticles } from './InteractiveParticles';

// --- DICCIONARIO DE TEXTOS ---
const HERO_TEXTS: any = {
  ES: {
    title: "Ingeniería Multi-Cloud y Desarrollo de Software con visión estratégica."
  },
  EN: {
    title: "Multi-Cloud Engineering and Strategic Software Development."
  }
};

export const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // 1. Estado del idioma (inicia leyendo localStorage)
  const [lang, setLang] = useState(localStorage.getItem('appLanguage') || 'ES');

  // 2. Efecto para escuchar el cambio de idioma desde el Nav
  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem('appLanguage') || 'ES');
    };

    // Escuchar el evento personalizado
    window.addEventListener('languageChange', handleLangChange);
    
    // Limpieza al desmontar
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

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
          {/* Asegúrate de que este componente acepte la prop isHovering */}
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
        
        {/* 1. TÍTULO DINÁMICO */}
        <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            paddingBottom: '50px' 
        }}>
            <h1 className="hero-title" style={{ pointerEvents: 'auto' }}>
              {HERO_TEXTS[lang].title}
            </h1>
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
            
            /* --- AJUSTE EXACTO A 5.5rem --- */
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
            
            /* Animación suave al cambiar el texto */
            transition: opacity 0.3s ease;
        }
      `}</style>
    </section>
  );
};