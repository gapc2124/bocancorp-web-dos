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

        // Rebote horizontal (ajustado para ignorar la barra superior de 30px)
        if (newX <= 0 || newX + logo.width >= container.width) newVelX = -vel.x;
        // Rebote vertical (mínimo 30px por la barra superior)
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
      position: 'relative', width: '100%', padding: isMobile ? '120px 20px' : '200px 100px',
      zIndex: 10, backgroundColor: '#ffffff', overflow: 'hidden' 
    }}>
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
            
            {/* FONDO COSMOS */}
            <div style={styles.cosmosBg} />

            {/* LOGO REBOTANDO */}
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
  // Mac Styles
  macHeader: { height: '30px', backgroundColor: '#ebebeb', display: 'flex', alignItems: 'center', padding: '0 12px', zIndex: 20, position: 'relative' },
  dot: { width: '12px', height: '12px', borderRadius: '50%', marginRight: '8px' },
  // Win Styles
  winHeader: { height: '30px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', zIndex: 20, position: 'relative', borderBottom: '1px solid #ddd' },
  winBtn: { width: '45px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#000' },
  // Linux Styles (Gnome-ish)
  linuxHeader: { height: '30px', backgroundColor: '#3d3c37', display: 'flex', alignItems: 'center', padding: '0 10px', zIndex: 20, position: 'relative' },
  linuxBtn: { color: '#ccc', fontSize: '14px', cursor: 'default' },
  // Default Styles
  defaultHeader: { height: '30px', backgroundColor: '#222', display: 'flex', alignItems: 'center', padding: '0 15px', zIndex: 20, position: 'relative' },
  defaultDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FAA918' }
};