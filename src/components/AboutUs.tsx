import React, { useState, useEffect, useRef } from 'react';

// --- 1. FUNCIÓN DE AYUDA PARA RUTAS (CRÍTICO: NO BORRAR) ---
const resolvePath = (path: string) => {
  // En Vite, BASE_URL suele ser '/' en localhost, pero esto asegura que funcione siempre
  const base = import.meta.env.BASE_URL || '/';
  // Quitamos cualquier barra o punto inicial para limpiar
  const cleanPath = path.replace(/^(\.?\/)/, '');
  return `${base}${cleanPath}`;
};

interface AboutUsProps {
  isMobile: boolean;
}

type OSType = 'mac' | 'windows' | 'linux' | 'default';

// --- DICCIONARIO DE TEXTOS ---
const ABOUT_TEXTS: any = {
  ES: {
    titleStart: "Más que proveedores, somos su ",
    titleHighlight: "Aliado de Innovación Tecnológica.",
    paragraph: "Bocancorp es una corporación norteamericana con centros de operaciones estratégicos en Perú, Colombia y Estados Unidos. Nos especializamos en orquestar soluciones tecnológicas complejas para empresas que buscan escalabilidad y seguridad.",
    highlightPhrase: "Perú, Colombia y Estados Unidos",
    button: "CONÓCENOS MÁS"
  },
  EN: {
    titleStart: "More than vendors, we are your ",
    titleHighlight: "Technological Innovation Ally.",
    paragraph: "Bocancorp is a North American corporation with strategic operation centers in Peru, Colombia, and the United States. We specialize in orchestrating complex technological solutions for companies seeking scalability and security.",
    highlightPhrase: "Peru, Colombia, and the United States",
    button: "KNOW MORE"
  }
};

// --- COMPONENTE PARA EL FONDO ESTRELLADO (CORREGIDO RESPONSIVE) ---
const CosmosBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Función para dibujar (se llamará al inicio y al redimensionar)
    const draw = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }

      // 1. Dibujar el fondo degradado profundo
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0, 
        canvas.width / 2, canvas.height / 2, canvas.width > canvas.height ? canvas.width : canvas.height
      );
      gradient.addColorStop(0, '#001540'); // Azul oscuro centro
      gradient.addColorStop(1, '#000814'); // Negro bordes
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Dibujar estrellas aleatorias
      const numStars = (canvas.width * canvas.height) / 800; // Densidad relativa al tamaño
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.8 + 0.2;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    };

    // Dibujo inicial
    draw();

    // Listener para redibujar cuando cambia el tamaño de la pantalla
    window.addEventListener('resize', draw);

    // Limpieza del listener
    return () => {
      window.removeEventListener('resize', draw);
    };

  }, []); 

  return (
    <canvas 
      ref={canvasRef} 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} 
    />
  );
};


export const AboutUs = ({ isMobile }: AboutUsProps) => {
  const [os, setOs] = useState<OSType>('default');
  
  // --- LÓGICA DE IDIOMA ---
  const [lang, setLang] = useState(localStorage.getItem('appLanguage') || 'ES');

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem('appLanguage') || 'ES');
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = ABOUT_TEXTS[lang];
  
  // --- LÓGICA DE REBOTE ---
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 }); // Posición inicial
  const [vel, setVel] = useState({ x: 3, y: 3 });   // Velocidad ajustada

  useEffect(() => {
    // Detección de Sistema Operativo
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) setOs('mac');
    else if (ua.includes('win')) setOs('windows');
    else if (ua.includes('linux')) setOs('linux');
    else setOs('default');

    const moveLogo = () => {
      if (!containerRef.current || !logoRef.current) return;
      const container = containerRef.current.getBoundingClientRect();
      const logo = logoRef.current.getBoundingClientRect();

      setPos((prev) => {
        let newX = prev.x + vel.x;
        let newY = prev.y + vel.y;
        let newVelX = vel.x;
        let newVelY = vel.y;

        // Rebote horizontal
        if (newX <= 0 || newX + logo.width >= container.width) newVelX = -vel.x;
        // Rebote vertical (ajustado por la barra de título ~30px)
        if (newY <= 30 || newY + logo.height >= container.height) newVelY = -vel.y;

        if (newVelX !== vel.x || newVelY !== vel.y) setVel({ x: newVelX, y: newVelY });
        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(moveLogo, 16);
    return () => clearInterval(interval);
  }, [vel]);

  // --- RENDERIZADO DE LA BARRA DE TÍTULO SEGÚN SO ---
  const renderWindowHeader = () => {
    switch (os) {
      case 'mac':
        return (
          <div style={styles.macHeader}>
            <div style={{...styles.dot, backgroundColor: '#ff5f56'}} />
            <div style={{...styles.dot, backgroundColor: '#ffbd2e'}} />
            <div style={{...styles.dot, backgroundColor: '#27c93f'}} />
            <span style={styles.headerTitle}>Bocan Terminal (zsh)</span>
          </div>
        );
      case 'windows':
        return (
          <div style={styles.winHeader}>
            <span style={{...styles.headerTitle, marginLeft: '10px'}}>BocanCorp Explorer</span>
            <div style={{display: 'flex', marginLeft: 'auto'}}>
              <div style={styles.winBtn}>─</div>
              <div style={styles.winBtn}>▢</div>
              <div style={{...styles.winBtn, backgroundColor: '#e81123'}}>✕</div>
            </div>
          </div>
        );
      case 'linux':
        return (
          <div style={styles.linuxHeader}>
            <div style={styles.linuxBtn}>✖</div>
            <span style={styles.headerTitle}>BocanCorp - Bash</span>
            <div style={{display: 'flex', gap: '5px'}}>
              <div style={styles.linuxBtn}>_</div>
              <div style={styles.linuxBtn}>□</div>
            </div>
          </div>
        );
      default:
        return (
          <div style={styles.defaultHeader}>
            <div style={styles.defaultDot} />
            <span style={styles.headerTitle}>BocanCorp Cloud</span>
          </div>
        );
    }
  };

  return (
    <section style={{ 
      position: 'relative', width: '100%', 
      padding: isMobile ? '180px 20px 180px' : '280px 100px 280px',
      zIndex: 10, backgroundColor: '#ffffff', overflow: 'hidden' 
    }}>
      
      {/* --- ONDAS SUPERIORES --- */}
      <div className="wave-container top-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#000c2d" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#000c2d" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#000c2d" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <div style={styles.gridContainer(isMobile)}>
        {/* COLUMNA IZQUIERDA: TEXTO */}
        <div>
          <h2 style={styles.title(isMobile)}>
            {t.titleStart} <span style={{ color: '#FAA918' }}>{t.titleHighlight}</span>
          </h2>
          
          <div style={styles.paragraph}>
            <p>
              {/* LÓGICA DE TEXTO ACTUALIZADA */}
              {t.paragraph.split(t.highlightPhrase).map((part: string, i: number, arr: string[]) => (
                  <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <strong>{t.highlightPhrase}</strong>}
                  </React.Fragment>
              ))}
            </p>
          </div>

          <button className="btn-primary">{t.button}</button>
        </div>

        {/* COLUMNA DERECHA: VENTANA COSMOS */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div ref={containerRef} style={styles.windowBox(isMobile)}>
            {renderWindowHeader()}
            
            {/* FONDO COSMOS */}
            <CosmosBackground />

            {/* LOGO REBOTANDO CON RESOLVEPATH */}
            <img 
              ref={logoRef}
              src={resolvePath("assets/bocancorp-logo.png")} 
              alt="Bocancorp Logo" 
              style={{ 
                width: isMobile ? '80px' : '140px', position: 'absolute',
                left: `${pos.x}px`, top: `${pos.y}px`, zIndex: 10
              }} 
            />
          </div>
        </div>
      </div>

      {/* --- ONDAS INFERIORES --- */}
      <div className="wave-container bottom-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#000c2d" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#000c2d" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#000c2d" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <style>{`
        .btn-primary { padding: 16px 45px; font-size: 1rem; font-weight: 700; cursor: pointer; background-color: #FAA918; color: #000; border: none; border-radius: 50px; transition: all 0.3s ease; }
        .btn-primary:hover { transform: scale(1.05); box-shadow: 0 10px 20px rgba(250, 169, 24, 0.4); }
        .wave-container { position: absolute; left: 0; width: 100%; height: 180px; overflow: hidden; line-height: 0; z-index: 1; pointer-events: none; }
        .top-waves { top: 0; }
        .bottom-waves { bottom: 0; transform: scaleY(-1); }
        .wave-svg { width: 100%; height: 100%; }
        .wave-anim-slow { animation: sway 6s ease-in-out infinite alternate; }
        .wave-anim-medium { animation: sway 5s ease-in-out infinite alternate-reverse; }
        .wave-anim-fast { animation: sway 4s ease-in-out infinite alternate; }
        @keyframes sway { 0% { transform: scaleY(1); } 100% { transform: scaleY(1.1); } }
      `}</style>
    </section>
  );
};

// --- ESTILOS ---
const styles: any = {
  gridContainer: (isMobile: boolean) => ({
    display: 'grid', 
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
    gap: isMobile ? '50px' : '120px', 
    alignItems: 'center', 
    maxWidth: '1400px', 
    margin: '0 auto', 
    position: 'relative', 
    zIndex: 20
  }),
  title: (isMobile: boolean) => ({
    fontSize: isMobile ? '2.2rem' : '3.5rem', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: '20px'
  }),
  paragraph: { fontSize: '1.2rem', color: '#555', marginBottom: '30px', lineHeight: 1.8 },
  
  windowBox: (isMobile: boolean) => ({
    width: isMobile ? '100%' : '100%', 
    maxWidth: isMobile ? 'none' : '600px',
    height: isMobile ? '350px' : '480px', 
    borderRadius: '12px',
    position: 'relative', 
    overflow: 'hidden', 
    boxShadow: '0 30px 60px rgba(0,0,0,0.25)', 
    border: '1px solid #333',
    backgroundColor: '#000'
  }),
  
  headerTitle: { fontSize: '11px', color: '#ccc', flex: 1, textAlign: 'center', fontFamily: 'monospace' },
  macHeader: { height: '30px', backgroundColor: '#ebebeb', display: 'flex', alignItems: 'center', padding: '0 12px', zIndex: 20, position: 'relative' },
  dot: { width: '12px', height: '12px', borderRadius: '50%', marginRight: '8px' },
  winHeader: { height: '30px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', zIndex: 20, position: 'relative', borderBottom: '1px solid #ddd' },
  winBtn: { width: '45px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#000' },
  linuxHeader: { height: '30px', backgroundColor: '#3d3c37', display: 'flex', alignItems: 'center', padding: '0 10px', zIndex: 20, position: 'relative' },
  linuxBtn: { color: '#ccc', fontSize: '14px', cursor: 'default' },
  defaultHeader: { height: '30px', backgroundColor: '#222', display: 'flex', alignItems: 'center', padding: '0 15px', zIndex: 20, position: 'relative' },
  defaultDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FAA918' }
};