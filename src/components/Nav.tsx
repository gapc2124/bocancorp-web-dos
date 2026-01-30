import { useState } from 'react';
import { Link } from 'react-router-dom'; // Usamos Link de nuevo

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

const NAV_ITEMS = [
  { label: "Servicios", path: "/servicios" }, // Lleva a la página especial
  { label: "Sobre Nosotros", path: "/" },     // Lleva al Home
  { label: "Proyectos", path: "/" },          // Lleva al Home
  { label: "Contáctanos", path: "/" }         // Lleva al Home
];

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav 
        className="nav-container"
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100, 
          padding: '30px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: '#000c2d', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', boxSizing: 'border-box'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', zIndex: 102 }}>
            <img src={resolvePath("assets/bocancorp-logo.png")} alt="Logo" style={{ height: '36px', objectFit: 'contain' }} onError={(e) => e.currentTarget.style.display='none'} />
            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'white', letterSpacing: '-0.5px' }}>BOCANCORP</span>
            </div>
        </Link>

        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} to={item.path} className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>
              {item.label}
            </Link>
          ))}
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.3)' }}></div>
          <span style={{ color: '#FAA918', fontWeight: 800, cursor: 'pointer' }}>ES</span>
        </div>

        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}>
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'rgba(0, 12, 45, 0.98)', backdropFilter: 'blur(10px)', padding: '100px 40px', zIndex: 99, display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
           {NAV_ITEMS.map(item => (
             <Link key={item.label} to={item.path} className="nav-link" style={{ fontSize: '1.5rem', color: 'white', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
               {item.label}
             </Link>
           ))}
        </div>
      )}
    </>
  );
};