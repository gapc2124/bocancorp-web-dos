import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// --- DATOS DEL MENÚ ---
const NAV_ITEMS = [
  { label: "Servicios", path: "/servicios", hasDropdown: true },
  { label: "Sobre Nosotros", path: "/" },
  { label: "Proyectos", path: "/" },
  { label: "Contáctanos", path: "/" }
];

// --- DATOS DEL SUBMENÚ ---
const SERVICES_SUBMENU = {
  col1: {
    title: "Desarrollo de Software",
    items: [
      "Desarrollo Web",
      "Desarrollo Móvil",
      "Consultoría y Asesoría en TI",
      "Desarrollo de Software",
      "Desarrollo en la Nube"
    ]
  },
  col2: {
    title: "Soluciones en la Nube",
    items: [
      "Migración a la Nube",
      "Gestión y Operaciones",
      "Soporte en la Nube",
      "Seguridad en la Nube",
      "Automatización y Optimización"
    ]
  }
};

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  // Estados para los dropdowns
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false); 
  
  // Estado del Idioma
  const [language, setLanguage] = useState('ES');

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setIsLangMenuOpen(false); // Cierra el menú al seleccionar una opción
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false);
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

        {/* MENÚ DE ESCRITORIO */}
        {!isMobile && (
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative' }}>
            {NAV_ITEMS.map((item) => {
              // Lógica Dropdown Servicios
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.label}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
                  >
                    <Link 
                      to={item.path} 
                      className="nav-link" 
                      style={{ color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      {item.label}
                      <i className={`fa-solid fa-chevron-${isServicesOpen ? 'up' : 'down'}`} style={{ fontSize: '0.7rem', color: '#FAA918' }}></i>
                    </Link>

                    {/* Panel Servicios */}
                    <div 
                      className={`services-dropdown ${isServicesOpen ? 'active' : ''}`}
                      style={{
                        position: 'absolute', top: '40px', left: '-150px', width: '600px',
                        backgroundColor: 'white', borderRadius: '8px', border: '2px solid #0056b3',
                        padding: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)', opacity: isServicesOpen ? 1 : 0,
                        visibility: isServicesOpen ? 'visible' : 'hidden', transform: isServicesOpen ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'all 0.3s ease', zIndex: 1000, cursor: 'default'
                      }}
                    >
                        <div>
                            <h4 style={{ color: '#333', fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px', textAlign: 'center' }}>{SERVICES_SUBMENU.col1.title}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {SERVICES_SUBMENU.col1.items.map((subItem) => (
                                    <Link key={subItem} to="/servicios" className="dropdown-item item-yellow">{subItem}</Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ color: '#333', fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px', textAlign: 'center' }}>{SERVICES_SUBMENU.col2.title}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {SERVICES_SUBMENU.col2.items.map((subItem) => (
                                    <Link key={subItem} to="/servicios" className="dropdown-item item-blue">{subItem}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={item.label} to={item.path} className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
                  {item.label}
                </Link>
              );
            })}
            
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.3)' }}></div>
            
            {/* --- SELECTOR DE IDIOMA (DESKTOP) - CORREGIDO --- */}
            <div 
              style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
              // CORRECCIÓN: Quitamos onMouseLeave para que NO se cierre solo
            >
                {/* Botón Principal (Toggle) */}
                <button 
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    style={{ 
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        color: 'white', fontWeight: 800, fontSize: '1.1rem',
                        display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                >
                    {language}
                    <i className={`fa-solid fa-chevron-${isLangMenuOpen ? 'up' : 'down'}`} style={{ fontSize: '0.6rem', color: '#FAA918' }}></i>
                </button>

                {/* Panel Desplegable Idioma */}
                {isLangMenuOpen && (
                    <div style={{
                        position: 'absolute', top: '40px', right: '-10px',
                        backgroundColor: 'white', borderRadius: '6px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                        border: '1px solid #eee', overflow: 'hidden',
                        display: 'flex', flexDirection: 'column', minWidth: '80px',
                        zIndex: 1001
                    }}>
                        <div 
                            onClick={() => changeLanguage('ES')}
                            className="lang-option"
                            style={{ 
                                color: language === 'ES' ? '#FAA918' : '#333',
                                fontWeight: language === 'ES' ? '800' : '600'
                            }}
                        >
                            ES
                        </div>
                        <div 
                            onClick={() => changeLanguage('EN')}
                            className="lang-option"
                            style={{ 
                                color: language === 'EN' ? '#FAA918' : '#333',
                                fontWeight: language === 'EN' ? '800' : '600'
                            }}
                        >
                            EN
                        </div>
                    </div>
                )}
            </div>

          </div>
        )}

        {/* BOTÓN HAMBURGUESA (Móvil) */}
        {isMobile && (
          <div 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer', zIndex: 102 }}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </div>
        )}
      </nav>

      {/* MENÚ MÓVIL (OVERLAY) */}
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
           
           {/* Selector Móvil */}
           <div style={{ 
               marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', 
               width: '60%', paddingTop: '30px', 
               display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' 
           }}>
             <span 
                onClick={() => changeLanguage('ES')}
                style={{ 
                    color: language === 'ES' ? '#FAA918' : 'white', 
                    fontWeight: 800, fontSize: '1.5rem', cursor: 'pointer',
                    transition: 'color 0.3s'
                }}
             >
                ES
             </span>
             
             <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.3)' }}></div>
             
             <span 
                onClick={() => changeLanguage('EN')}
                style={{ 
                    color: language === 'EN' ? '#FAA918' : 'white',
                    fontWeight: 800, fontSize: '1.5rem', cursor: 'pointer',
                    transition: 'color 0.3s'
                }}
             >
                EN
             </span>
           </div>
        </div>
      )}

      <style>{`
        /* ESTILOS DEL DROPDOWN DE SERVICIOS */
        .dropdown-item {
            display: block; padding: 12px 15px; background-color: #ffffff;
            color: #444; text-decoration: none; font-size: 0.9rem; font-weight: 600;
            border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            border: 1px solid #eee; transition: all 0.2s ease; text-align: left;
        }
        .dropdown-item:hover { transform: translateX(5px); box-shadow: 0 4px 8px rgba(0,0,0,0.08); }
        
        .item-yellow:hover { background-color: #fffbef; color: #FAA918; border-color: #ffeeba; }
        .item-blue:hover { background-color: #f8f9fa; color: #0056b3; border-color: #d1d9e6; }

        .services-dropdown::before {
            content: ''; position: absolute; top: -8px; left: 170px; 
            width: 15px; height: 15px; background: white;
            border-left: 2px solid #0056b3; border-top: 2px solid #0056b3;
            transform: rotate(45deg);
        }

        /* ESTILOS DEL DROPDOWN DE IDIOMA */
        .lang-option {
            padding: 10px 20px;
            cursor: pointer;
            text-align: center;
            transition: background 0.2s;
            font-size: 0.95rem;
        }
        .lang-option:hover {
            background-color: #f5f5f5;
        }
      `}</style>
    </>
  );
};