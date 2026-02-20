import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// --- UTILIDAD PARA RUTAS ---
const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// --- COMPONENTE SCROLL TO TOP ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ==========================================
// 1. TRADUCCIONES ACTUALIZADAS
// ==========================================
const TRANSLATIONS = {
  ES: {
    nav: { 
      services: "Servicios", 
      about: "Sobre Nosotros", 
      projects: "Arquitecturas", // 👈 Actualizado
      contact: "Contáctanos" 
    }
  },
  EN: {
    nav: { 
      services: "Services", 
      about: "About Us", 
      projects: "Architectures", // 👈 Actualizado para sonar corporativo
      contact: "Contact Us" 
    }
  }
};

type LanguageType = 'ES' | 'EN';

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const [language, setLanguage] = useState<LanguageType>(() => {
    return (localStorage.getItem('appLanguage') as LanguageType) || 'ES';
  });

  const t = TRANSLATIONS[language];

  const changeLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
    localStorage.setItem('appLanguage', lang);
    window.dispatchEvent(new Event('languageChange'));
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

  const navItems = [
    { label: t.nav.services, path: "/servicios" },
    { label: t.nav.about, path: "/nosotros" },
    { label: t.nav.projects, path: "/proyectos" },
  ];

  return (
    <>
      <ScrollToTop /> 

      <nav 
        className="nav-container"
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100, 
          padding: isMobile ? '20px 20px' : '30px 60px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#000c2d', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
          boxSizing: 'border-box'
        }}
      >
        {/* LOGO */}
        <Link to="/" style={{ textDecoration: 'none', zIndex: 102 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <img 
                src={resolvePath("assets/bocancorp-logo.png")} 
                alt="Logo" 
                style={{ height: isMobile ? '28px' : '36px', objectFit: 'contain' }} 
              />
              <span style={{ fontWeight: 800, fontSize: isMobile ? '1.2rem' : '1.5rem', color: 'white', letterSpacing: '-0.5px' }}>
                BOCANCORP
              </span>
            </div>
        </Link>

        {/* MENÚ DE ESCRITORIO */}
        {!isMobile && (
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
            {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path} 
                  className="nav-link" 
                  style={{ color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}
                >
                  {item.label}
                </Link>
            ))}

            {/* BOTÓN CONTACTO (CTA) */}
            <Link 
                to="/contacto" 
                className="btn-contact-nav"
                style={{ 
                    backgroundColor: '#FAA918', 
                    color: '#000c2d', 
                    padding: '10px 22px', 
                    borderRadius: '50px', 
                    textDecoration: 'none', 
                    fontWeight: 800, 
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(250, 169, 24, 0.3)'
                }}
            >
              {t.nav.contact}
            </Link>
            
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.3)' }}></div>
            
            {/* SELECTOR DE IDIOMA */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
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

                {isLangMenuOpen && (
                    <div style={{
                        position: 'absolute', top: '40px', right: '-10px',
                        backgroundColor: 'white', borderRadius: '6px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                        border: '1px solid #eee', overflow: 'hidden',
                        display: 'flex', flexDirection: 'column', minWidth: '80px',
                        zIndex: 1001
                    }}>
                        <div onClick={() => changeLanguage('ES')} className="lang-option">ES</div>
                        <div onClick={() => changeLanguage('EN')} className="lang-option">EN</div>
                    </div>
                )}
            </div>
          </div>
        )}

        {/* BOTÓN HAMBURGUESA (Móvil) */}
        {isMobile && (
          <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer', zIndex: 102, padding: '10px' }}>
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </div>
        )}
      </nav>

      {/* MENÚ MÓVIL */}
      {mobileMenuOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
          background: 'rgba(0, 12, 45, 0.98)', backdropFilter: 'blur(10px)', 
          paddingTop: '120px', paddingLeft: '40px', paddingRight: '40px',
          zIndex: 99, display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center'
        }}>
           {navItems.map(item => (
             <Link 
                key={item.label} 
                to={item.path} 
                className="nav-link" 
                style={{ fontSize: '1.6rem', color: 'white', textDecoration: 'none', fontWeight: 'bold' }} 
                onClick={() => setMobileMenuOpen(false)}
             >
               {item.label}
             </Link>
           ))}
           
           <Link 
                to="/contacto" 
                style={{ 
                    backgroundColor: '#FAA918', color: '#000c2d', padding: '15px 40px', 
                    borderRadius: '50px', textDecoration: 'none', fontWeight: 800, fontSize: '1.4rem' 
                }}
                onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>

           <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', width: '60%', paddingTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
             <span onClick={() => changeLanguage('ES')} style={{ color: language === 'ES' ? '#FAA918' : 'white', fontWeight: 800, fontSize: '1.5rem', cursor: 'pointer' }}>ES</span>
             <span onClick={() => changeLanguage('EN')} style={{ color: language === 'EN' ? '#FAA918' : 'white', fontWeight: 800, fontSize: '1.5rem', cursor: 'pointer' }}>EN</span>
           </div>
        </div>
      )}

      <style>{`
        .lang-option { padding: 10px 20px; cursor: pointer; text-align: center; color: #333; font-weight: 600; transition: background 0.2s; }
        .lang-option:hover { background-color: #f5f5f5; color: #FAA918; }
        .nav-link:hover { color: #FAA918 !important; transition: color 0.3s ease; }
        .btn-contact-nav:hover { 
            transform: scale(1.05); 
            background-color: #ffb733 !important; 
            box-shadow: 0 6px 20px rgba(250, 169, 24, 0.4);
        }
      `}</style>
    </>
  );
};