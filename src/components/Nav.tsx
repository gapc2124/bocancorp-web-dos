import { useState } from 'react';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

const NAV_ITEMS = ["Servicios", "Sobre Nosotros", "Proyectos", "Contáctanos"];

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav 
        className="nav-container"
        style={{ 
          position: 'absolute', // Se mantiene absolute para superponerse al canvas si es necesario
          top: 0, 
          left: 0, 
          width: '100%', 
          zIndex: 100, 
          padding: '30px 60px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          // --- CAMBIOS DE FONDO ---
          backgroundColor: '#000c2d', // El color sólido que pediste
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)', // Línea sutil de separación
          boxSizing: 'border-box'
        }}
      >
        
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', zIndex: 102 }}>
          <img 
            src={resolvePath("assets/bocancorp-logo.png")} 
            alt="Logo" 
            style={{ height: '36px', objectFit: 'contain' }} 
            onError={(e) => e.currentTarget.style.display='none'} 
          />
          <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'white', letterSpacing: '-0.5px' }}>
            BOCANCORP
          </span>
        </div>

        {/* MENÚ ESCRITORIO (Se oculta solo gracias al CSS) */}
        <div className="desktop-menu" style={{ alignItems: 'center', gap: '40px' }}>
          {NAV_ITEMS.map((item) => (
            <a key={item} href="#" className="nav-link">
              {item}
            </a>
          ))}
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.3)' }}></div>
          <span style={{ color: 'var(--c-accent)', fontWeight: 800, cursor: 'pointer' }}>ES</span>
        </div>

        {/* BOTÓN HAMBURGUESA (Se muestra solo en móvil gracias al CSS) */}
        <div 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </div>
      </nav>

      {/* MENÚ DESPLEGABLE (Overlay para móvil) */}
      {mobileMenuOpen && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100vh', 
          background: 'rgba(0, 12, 45, 0.98)', // Ajusté este fondo para que coincida con el tema (#000c2d)
          backdropFilter: 'blur(10px)',       
          padding: '100px 40px', 
          zIndex: 99, 
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'center'
        }}>
           {NAV_ITEMS.map(item => (
             <a 
               key={item} 
               href="#" 
               className="nav-link"
               style={{ fontSize: '1.5rem' }} 
               onClick={() => setMobileMenuOpen(false)}
             >
               {item}
             </a>
           ))}
           <div style={{ marginTop: '20px', color: 'var(--c-accent)', fontWeight: 800, fontSize: '1.2rem' }}>ESPAÑOL</div>
        </div>
      )}
    </>
  );
};