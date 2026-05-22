'use client';
import React from 'react'; 
import { Canvas } from '@react-three/fiber';
import Link from 'next/link';
import { useParams } from 'next/navigation'; 
import { Auroras } from './Auroras';
 

// --- DICCIONARIO DE TEXTOS ---
const FOOTER_TEXTS: any = {
  ES: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      projects: "Proyectos",
      about: "Sobre Nosotros"
    },
    contactHeader: "Contacto Global",
    countries: {
      usa: "USA:",
      peru: "Perú:",
      colombia: "Colombia:"
    },
    addresses: {
      usa: "2201 Cooperative Way Suite 600, Herndon, VA 20171, United States",
      peru: "15012 Avenida Huarochirí 333, La Molina, Lima, Perú",
      colombia: "Carrera 35 No. 15 B 35. Edificio Prisma, Oficina 9912. Medellin, Antioquia, Colombia"
    },
    followUs: "Síguenos",
    rights: "Todos los Derechos Reservados."
  },
  EN: {
    nav: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      about: "About Us"
    },
    contactHeader: "Global Contact",
    countries: {
      usa: "USA:",
      peru: "Peru:",
      colombia: "Colombia:"
    },
    addresses: {
      usa: "2201 Cooperative Way Suite 600, Herndon, VA 20171, United States",
      peru: "15012 Avenida Huarochirí 333, La Molina, Lima, Peru",
      colombia: "Carrera 35 No. 15 B 35. Edificio Prisma, Oficina 9912. Medellin, Antioquia, Colombia"
    },
    followUs: "Follow Us",
    rights: "All Rights Reserved."
  }
};

export const Footer = () => {
  const isMobileLayout = () => typeof window !== 'undefined' && window.innerWidth < 768;

  // LÓGICA DE IDIOMA CON URL
  const { lang: urlLang } = useParams();
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';
  const prefix = currentLang.toLowerCase(); 
  const t = FOOTER_TEXTS[currentLang];

  return (
    <footer style={{
      width: '100%',
      position: 'relative',
      zIndex: 40,
      background: '#02040a',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white',
      overflow: 'hidden',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      
      {/* FONDO AURORAS */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 0, opacity: 0.5, pointerEvents: 'none'
      }}>
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#FAA918" />
          <Auroras />
        </Canvas>
      </div>

      <div style={{
        position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto',
        padding: '80px 20px 40px 20px', display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', gap: '50px'
      }}>
        
        {/* COLUMNA 1: LOGO Y NAV */}
        <div style={{ flex: '1 1 250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
            <img 
              src="/assets/logo.png" 
              alt="Bocancorp" 
              style={{ width: '40px', height: 'auto', objectFit: 'contain' }} 
            />
            <span style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.5px' }}>bocancorp</span>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href={`/${prefix}`} className="footer-link-v2">{t.nav.home}</Link>
            <Link href={`/${prefix}/servicios`} className="footer-link-v2">{t.nav.services}</Link>
            <Link href={`/${prefix}/proyectos`} className="footer-link-v2">{t.nav.projects}</Link>
            <Link href={`/${prefix}/nosotros`} className="footer-link-v2">{t.nav.about}</Link>
          </nav>
        </div>

        {/* COLUMNA 2: INFORMACIÓN DE CONTACTO */}
        <div style={{ flex: '1 1 350px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '25px', fontWeight: 600, color: '#FAA918' }}>
            {t.contactHeader}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.95rem', color: '#cccccc', lineHeight: '1.5' }}>
            
            {/* Email */}
            <a href="mailto:contact@bocancorporation.com" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 500 }}>
              <i className="fa-solid fa-envelope" style={{ color: '#FAA918' }}></i>
              contact@bocancorporation.com
            </a>

            {/* Direcciones */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <i className="fa-solid fa-location-dot" style={{ color: '#FAA918', marginTop: '4px' }}></i>
              <div>
                <strong>{t.countries.usa}</strong><br/>
                {t.addresses.usa}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <i className="fa-solid fa-location-dot" style={{ color: '#FAA918', marginTop: '4px' }}></i>
              <div>
                <strong>{t.countries.peru}</strong><br/>
                {t.addresses.peru}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <i className="fa-solid fa-location-dot" style={{ color: '#FAA918', marginTop: '4px' }}></i>
              <div>
                <strong>{t.countries.colombia}</strong><br/>
                {t.addresses.colombia}
              </div>
            </div>

          </div>
        </div>

        {/* COLUMNA 3: REDES Y COPYRIGHT */}
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: isMobileLayout() ? 'left' : 'right' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '25px', fontWeight: 600 }}>{t.followUs}</h3>
            {/* 👇 ENLACES DE REDES SOCIALES ACTUALIZADOS */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: isMobileLayout() ? 'flex-start' : 'flex-end', marginBottom: '30px' }}>
              <SocialIcon icon="fa-facebook-f" href="https://www.facebook.com/profile.php?id=61551411010057" />
              <SocialIcon icon="fa-linkedin-in" href="https://www.linkedin.com/company/bocancorp/" />
              <SocialIcon icon="fa-instagram" href="https://www.instagram.com/bocancorp/" />
            </div>
          </div>
          
          <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.6 }}>
            © 2026 Bocancorp™.<br/> 
            {t.rights}
          </div>
        </div>

      </div>
      
      <style>{`
        .footer-link-v2 { 
          color: #aaa; text-decoration: none; transition: all 0.3s; font-weight: 500; display: inline-block;
        }
        .footer-link-v2:hover { 
          color: #FAA918; transform: translateX(5px);
        }
      `}</style>
    </footer>
  );
};

// 👇 COMPONENTE ACTUALIZADO CON PROP href
const SocialIcon = ({ icon, href }: { icon: string, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{
    width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
    textDecoration: 'none', transition: '0.3s', backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255,255,255,0.1)'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.background = '#FAA918';
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.color = '#02040a';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
    e.currentTarget.style.transform = 'translateY(0px)';
    e.currentTarget.style.color = 'white';
  }}
  >
    <i className={`fa-brands ${icon}`} style={{ fontSize: '1.2rem' }}></i>
  </a>
);