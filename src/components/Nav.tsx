'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname as useLocation, useRouter, useParams } from 'next/navigation';

// --- UTILIDAD PARA RUTAS ---
const resolvePath = (path: string) => {
  const base = (process.env.NEXT_PUBLIC_BASE_URL || '') || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// --- COMPONENTE SCROLL TO TOP ---
const ScrollToTop = () => {
  const pathname = useLocation();
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
      projects: "Arquitecturas", 
      contact: "Contáctanos" 
    }
  },
  EN: {
    nav: { 
      services: "Services", 
      about: "About Us", 
      projects: "Architectures", 
      contact: "Contact Us" 
    }
  }
};

type LanguageType = 'ES' | 'EN';

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // 👇 1. LEEMOS LA URL EN VEZ DEL LOCALSTORAGE
  const { lang } = useParams(); 
  const router = useRouter();
  const navigate = (path: string) => router.push(path);
  const location = useLocation();

  const currentLang: LanguageType = lang === 'en' ? 'EN' : 'ES';
  const t = TRANSLATIONS[currentLang];

  // 👇 2. CAMBIAMOS DE IDIOMA REESCRIBIENDO LA URL
  const changeLanguage = (newLang: LanguageType) => {
    setIsLangMenuOpen(false);
    setMobileMenuOpen(false);
    
    const newPrefix = newLang === 'EN' ? '/en' : '/es';
    let currentPath = location;

    // Reemplazamos /es o /en por el nuevo idioma manteniendo la página actual
    if (currentPath.startsWith('/es')) {
        currentPath = currentPath.replace('/es', newPrefix);
    } else if (currentPath.startsWith('/en')) {
        currentPath = currentPath.replace('/en', newPrefix);
    } else {
        currentPath = `${newPrefix}${currentPath}`;
    }

    // Navegamos a la nueva ruta
    navigate(currentPath);
    // Disparamos el evento por si otro componente lo necesita
    window.dispatchEvent(new Event('languageChange'));
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    handleResize(); // Call on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 👇 3. AÑADIMOS EL IDIOMA ACTUAL A LAS RUTAS DE LOS LINKS
  const navItems = [
    { label: t.nav.services, path: `/${lang}/servicios` },
    { label: t.nav.about, path: `/${lang}/nosotros` },
    { label: t.nav.projects, path: `/${lang}/proyectos` },
  ];

  return (
    <>
      <ScrollToTop /> 

      <nav 
        className="nav-container"
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100, 
          // 👇 REDUCIMOS EL PADDING VERTICAL EN MÓVILES (De '20px 20px' a '10px 20px')
          padding: isMobile ? '10px 20px' : '30px 60px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#000c2d', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
          boxSizing: 'border-box'
        }}
      >
        {/* LOGO - Ahora redirige a /es o /en */}
        <Link href={`/${lang}`} style={{ textDecoration: 'none', zIndex: 102 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <img 
                src={resolvePath("assets/bocancorp-logo.png")} 
                alt="Logo" 
                // 👇 ACHICAMOS LIGERAMENTE EL LOGO EN MÓVIL PARA QUE NO ESTIRE EL NAV
                style={{ height: isMobile ? '24px' : '36px', objectFit: 'contain' }} 
              />
              <span style={{ 
                fontWeight: 800, 
                // 👇 ACHICAMOS LIGERAMENTE LA LETRA DEL LOGO EN MÓVIL
                fontSize: isMobile ? '1.1rem' : '1.5rem', 
                color: 'white', 
                letterSpacing: '-0.5px' 
              }}>
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
                  href={item.path} 
                  className="nav-link" 
                  style={{ color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}
                >
                  {item.label}
                </Link>
            ))}

            {/* BOTÓN CONTACTO (CTA) */}
            <Link 
                href={`/${lang}/contacto`} 
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
                    {currentLang}
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
          // 👇 REDUCIMOS EL PADDING DEL BOTÓN PARA QUE NO HAGA MÁS ALTO EL NAV
          <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: 'white', fontSize: '1.4rem', cursor: 'pointer', zIndex: 102, padding: '5px' }}>
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
                href={item.path} 
                className="nav-link" 
                style={{ fontSize: '1.6rem', color: 'white', textDecoration: 'none', fontWeight: 'bold' }} 
                onClick={() => setMobileMenuOpen(false)}
             >
               {item.label}
             </Link>
           ))}
           
           <Link 
                href={`/${lang}/contacto`} 
                style={{ 
                    backgroundColor: '#FAA918', color: '#000c2d', padding: '15px 40px', 
                    borderRadius: '50px', textDecoration: 'none', fontWeight: 800, fontSize: '1.4rem' 
                }}
                onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>

           <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', width: '60%', paddingTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
             <span onClick={() => changeLanguage('ES')} style={{ color: currentLang === 'ES' ? '#FAA918' : 'white', fontWeight: 800, fontSize: '1.5rem', cursor: 'pointer' }}>ES</span>
             <span onClick={() => changeLanguage('EN')} style={{ color: currentLang === 'EN' ? '#FAA918' : 'white', fontWeight: 800, fontSize: '1.5rem', cursor: 'pointer' }}>EN</span>
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