import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

const NAV_ITEMS = [
  { label: "Servicios", path: "/servicios" },
  { label: "Sobre Nosotros", path: "/" },
  { label: "Proyectos", path: "/" },
  { label: "Contáctanos", path: "/" }
];

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Detectar cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false); // Cierra el menú móvil si agrandan la pantalla
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav 
        className="nav-container"
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100, 
          // RESPONSIVE: Menos padding en celular, más en escritorio
          padding: isMobile ? '20px 20px' : '30px 60px', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: '#000c2d', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', boxSizing: 'border-box'
        }}
      >
        {/* LOGO */}
        <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', zIndex: 102 }}>
            <img src={resolvePath("assets/bocancorp-logo.png")} alt="Logo" style={{ height: isMobile ? '28px' : '36px', objectFit: 'contain' }} onError={(e) => e.currentTarget.style.display='none'} />
            <span style={{ fontWeight: 800, fontSize: isMobile ? '1.2rem' : '1.5rem', color: 'white', letterSpacing: '-0.5px' }}>BOCANCORP</span>
            </div>
        </Link>

        {/* MENÚ DE ESCRITORIO (Solo se ve si NO es móvil) */}
        {!isMobile && (
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} to={item.path} className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>
                {item.label}
              </Link>
            ))}
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.3)' }}></div>
            <span style={{ color: '#FAA918', fontWeight: 800, cursor: 'pointer' }}>ES</span>
          </div>
        )}

        {/* BOTÓN HAMBURGUESA (Solo se ve si ES móvil) */}
        {isMobile && (
          <div 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer', zIndex: 102 }}
          >
            {/* Cambia el ícono si está abierto o cerrado */}
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </div>
        )}
      </nav>

      {/* MENÚ DESPLEGABLE MÓVIL (Overlay) */}
      {mobileMenuOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
          background: 'rgba(0, 12, 45, 0.98)', backdropFilter: 'blur(10px)', 
          paddingTop: '120px', paddingLeft: '40px', paddingRight: '40px',
          zIndex: 99, display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center',
          transition: 'all 0.3s ease-in-out'
        }}>
           {NAV_ITEMS.map(item => (
             <Link 
                key={item.label} 
                to={item.path} 
                className="nav-link" 
                style={{ fontSize: '1.8rem', color: 'white', textDecoration: 'none', fontWeight: 'bold' }} 
                onClick={() => setMobileMenuOpen(false)}
             >
               {item.label}
             </Link>
           ))}
           {/* Opción de idioma en móvil */}
           <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', width: '50%', paddingTop: '20px', textAlign: 'center' }}>
             <span style={{ color: '#FAA918', fontWeight: 800, fontSize: '1.2rem' }}>ES</span>
           </div>
        </div>
      )}
    </>
  );
};