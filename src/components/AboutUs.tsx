import React, { useState, useEffect, useRef } from 'react';

interface AboutUsProps {
  isMobile: boolean;
}

type OSType = 'mac' | 'windows' | 'linux' | 'default';

export const AboutUs = ({ isMobile }: AboutUsProps) => {
  const [os, setOs] = useState<OSType>('default');
  
  // --- LÓGICA DE REBOTE ---
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [pos, setPos] = useState({ x: 20, y: 50 });
  const [vel, setVel] = useState({ x: 2.5, y: 2.5 });

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

        if (newX <= 0 || newX + logo.width >= container.width) newVelX = -vel.x;
        if (newY <= 30 || newY + logo.height >= container.height) newVelY = -vel.y;

        if (newVelX !== vel.x || newVelY !== vel.y) setVel({ x: newVelX, y: newVelY });
        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(moveLogo, 16);
    return () => clearInterval(interval);
  }, [vel]);

  // --- RENDERIZADO DE LA BARRA SEGÚN SO ---
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
      // Ajuste de padding para las ondas
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
        {/* COLUMNA IZQUIERDA */}
        <div>
          <h2 style={styles.title(isMobile)}>
            Más que proveedores, somos su <span style={{ color: '#FAA918' }}>Aliado de Innovación.</span>
          </h2>
          <p style={styles.paragraph}>ADN MultiCloud y enfoque FinOps para su empresa.</p>
          <button className="btn-primary">CONÓCENOS MÁS</button>
        </div>

        {/* COLUMNA DERECHA: VENTANA COSMOS */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div ref={containerRef} style={styles.windowBox(isMobile)}>
            {renderWindowHeader()}
            <div style={styles.cosmosBg} />
            <img 
              ref={logoRef}
              src="./assets/bocancorp-logo.png" 
              alt="Bocancorp Logo" 
              style={{ 
                width: isMobile ? '80px' : '120px', position: 'absolute',
                left: `${pos.x}px`, top: `${pos.y}px`, zIndex: 10,
                filter: 'drop-shadow(0 0 10px rgba(250, 169, 24, 0.5))'
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
    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '50px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 20
  }),
  title: (isMobile: boolean) => ({
    fontSize: isMobile ? '2.2rem' : '3.5rem', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: '20px'
  }),
  paragraph: { fontSize: '1.2rem', color: '#555', marginBottom: '30px' },
  windowBox: (isMobile: boolean) => ({
    width: isMobile ? '100%' : '500px', height: '350px', borderRadius: '12px',
    position: 'relative', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', border: '1px solid #333'
  }),
  cosmosBg: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png"), radial-gradient(circle at center, #001540 0%, #000814 100%)',
    zIndex: 1
  },
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