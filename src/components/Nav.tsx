import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// --- UTILIDAD PARA RUTAS ---
const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// --- COMPONENTE SCROLL TO TOP ---
// Este pequeño efecto asegura que al cambiar de ruta, la página suba al inicio
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- TRADUCCIONES ---
const TRANSLATIONS = {
  ES: {
    nav: {
      services: "Servicios",
      about: "Sobre Nosotros",
      projects: "Proyectos",
      contact: "Contáctanos"
    },
    submenu: {
      col1Title: "Desarrollo de Software",
      col1Items: [
        "Desarrollo de Soluciones Multiplataforma",
        "Ecosistemas Cloud & Modernización",
        "Diseño de Experiencia (UX/UI)",
        "Consultoría de Arquitectura TI",
        "Automatización de procesos con IA"
      ],
      col2Title: "Soluciones en la Nube",
      col2Items: [
        "Arquitectura Multi-Cloud & Serverless",
        "Ciberseguridad & Conectividad (Networking)",
        "Cultura DevOps & Terraform (IaC)",
        "FinOps & Optimización de Recursos",
        "Gobernanza de datos & IA"
      ]
    }
  },
  EN: {
    nav: {
      services: "Services",
      about: "About Us",
      projects: "Projects",
      contact: "Contact Us"
    },
    submenu: {
      col1Title: "Software Development",
      col1Items: [
        "Multi-platform Solutions Development",
        "Cloud Ecosystems & Modernization",
        "UX/UI Design",
        "IT Architecture Consulting",
        "AI Process Automation"
      ],
      col2Title: "Cloud Solutions",
      col2Items: [
        "Multi-Cloud & Serverless Architecture",
        "Cybersecurity & Networking",
        "DevOps Culture & Terraform (IaC)",
        "FinOps & Resource Optimization",
        "Data Governance & AI"
      ]
    }
  }
};

type LanguageType = 'ES' | 'EN';

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // Estado de idioma
  const [language, setLanguage] = useState<LanguageType>(() => {
    return (localStorage.getItem('appLanguage') as LanguageType) || 'ES';
  });

  const t = TRANSLATIONS[language];

  // Función para cambiar idioma
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

  // --- DEFINICIÓN DE RUTAS (Aquí configuras a dónde va cada click) ---
  const navItems = [
    { label: t.nav.services, path: "/servicios", hasDropdown: true }, // Lleva a ServicesPage
    { label: t.nav.about, path: "/nosotros" }, // Lleva a AboutPage (ejemplo)
    { label: t.nav.projects, path: "/proyectos" }, // Lleva a ProjectsPage (ejemplo)
    { label: t.nav.contact, path: "/contacto" } // Lleva a ContactPage (ejemplo)
  ];

  return (
    <>
      <ScrollToTop /> {/* Activa el scroll automático al navegar */}

      <nav 
        className="nav-container"
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100, 
          padding: isMobile ? '20px 20px' : '30px 60px', 
          display: 'flex', 
          // CORRECCIÓN MÓVIL: justifyContent: 'space-between' separa logo y hamburguesa
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#000c2d', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
          boxSizing: 'border-box'
        }}
      >
        {/* LOGO (Lleva al Home /) */}
        <Link to="/" style={{ textDecoration: 'none', zIndex: 102 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <img 
                src={resolvePath("assets/bocancorp-logo.png")} 
                alt="Logo" 
                style={{ height: isMobile ? '28px' : '36px', objectFit: 'contain' }} 
                onError={(e) => e.currentTarget.style.display='none'} 
              />
              <span style={{ fontWeight: 800, fontSize: isMobile ? '1.2rem' : '1.5rem', color: 'white', letterSpacing: '-0.5px' }}>
                BOCANCORP
              </span>
            </div>
        </Link>

        {/* MENÚ DE ESCRITORIO */}
        {!isMobile && (
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative' }}>
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div 
                    key="services-dropdown-container"
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
                            <h4 style={{ color: '#333', fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px', textAlign: 'center' }}>
                              {t.submenu.col1Title}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {t.submenu.col1Items.map((subItem) => (
                                    <Link key={subItem} to="/servicios" className="dropdown-item item-yellow">{subItem}</Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ color: '#333', fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px', textAlign: 'center' }}>
                              {t.submenu.col2Title}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {t.submenu.col2Items.map((subItem) => (
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
            
            {/* SELECTOR DE IDIOMA (DESKTOP) */}
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
                        <div 
                            onClick={() => changeLanguage('ES')}
                            className="lang-option"
                            style={{ 
                                color: language === 'ES' ? '#FAA918' : '#333', fontWeight: language === 'ES' ? '800' : '600',
                                backgroundColor: language === 'ES' ? '#f9f9f9' : 'transparent'
                            }}
                        >ES</div>
                        <div 
                            onClick={() => changeLanguage('EN')}
                            className="lang-option"
                            style={{ 
                                color: language === 'EN' ? '#FAA918' : '#333', fontWeight: language === 'EN' ? '800' : '600',
                                backgroundColor: language === 'EN' ? '#f9f9f9' : 'transparent'
                            }}
                        >EN</div>
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
            style={{ 
              color: 'white', 
              fontSize: '1.5rem', 
              cursor: 'pointer', 
              zIndex: 102,
              // Asegura que esté clickeable y visible
              padding: '10px' 
            }}
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
           {navItems.map(item => (
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
           
           <div style={{ 
               marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', 
               width: '60%', paddingTop: '30px', 
               display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' 
           }}>
             <span onClick={() => changeLanguage('ES')} style={{ color: language === 'ES' ? '#FAA918' : 'white', fontWeight: 800, fontSize: '1.5rem', cursor: 'pointer' }}>ES</span>
             <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.3)' }}></div>
             <span onClick={() => changeLanguage('EN')} style={{ color: language === 'EN' ? '#FAA918' : 'white', fontWeight: 800, fontSize: '1.5rem', cursor: 'pointer' }}>EN</span>
           </div>
        </div>
      )}

      <style>{`
        .dropdown-item { display: block; padding: 12px 15px; background-color: #ffffff; color: #444; text-decoration: none; font-size: 0.9rem; font-weight: 600; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border: 1px solid #eee; transition: all 0.2s ease; text-align: left; }
        .dropdown-item:hover { transform: translateX(5px); box-shadow: 0 4px 8px rgba(0,0,0,0.08); }
        .item-yellow:hover { background-color: #fffbef; color: #FAA918; border-color: #ffeeba; }
        .item-blue:hover { background-color: #f8f9fa; color: #0056b3; border-color: #d1d9e6; }
        .services-dropdown::before { content: ''; position: absolute; top: -8px; left: 170px; width: 15px; height: 15px; background: white; border-left: 2px solid #0056b3; border-top: 2px solid #0056b3; transform: rotate(45deg); }
        .lang-option { padding: 10px 20px; cursor: pointer; text-align: center; transition: background 0.2s; font-size: 0.95rem; }
        .lang-option:hover { background-color: #f5f5f5; }
      `}</style>
    </>
  );
};