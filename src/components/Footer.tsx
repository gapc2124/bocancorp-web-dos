export const Footer = () => {
  return (
    <footer style={{
      width: '100%',
      position: 'relative', // CAMBIO: Relative para que vaya al final del flujo
      zIndex: 40,
      background: '#02040a', // Fondo oscuro sólido para contrastar con la sección blanca
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '60px 0 30px 0',
      color: 'white',
      fontSize: '0.9rem',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '40px'
      }}>
        
        {/* SECCIÓN 1: SÍGUENOS */}
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 600, color: '#f0f0f0' }}>Siguenos</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <SocialIcon icon="fa-facebook-f" />
            <SocialIcon icon="fa-linkedin-in" />
            <SocialIcon icon="fa-instagram" />
          </div>
        </div>

        {/* SECCIÓN 2: INFO CENTRAL */}
        <div style={{ flex: '2 1 400px', textAlign: 'center' }}>
          
          <div style={{ marginBottom: '25px', fontSize: '1rem', fontWeight: 500 }}>
            <a href="#" className="footer-link">Home</a>
            <span style={{ margin: '0 15px', color: '#555' }}>|</span>
            <a href="#" className="footer-link">Sobre Nosotros</a>
            <span style={{ margin: '0 15px', color: '#555' }}>|</span>
            <a href="#" className="footer-link">Contáctanos</a>
          </div>

          <div style={{ marginBottom: '25px', color: '#ccc', letterSpacing: '0.5px' }}>
            <p style={{ margin: '5px 0' }}>+17033944837</p>
            <p style={{ margin: '5px 0' }}>+51997689876</p>
          </div>

          <div style={{ width: '60%', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 auto 25px auto' }}></div>

          <div style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.8' }}>
            <p style={{ margin: '5px 0' }}>2201 Cooperative Way Suite 600, Herndon, VA 20171, United States</p>
            <p style={{ margin: '5px 0' }}>15012 Avenida Huarochirí 333 La Molina, Lima, Perú</p>
            <p style={{ margin: '5px 0' }}>Carrera 35 No. 15 B 35. Edificio Prisma, Oficina 9912. Medellin, Antioquia, Colombia</p>
          </div>
        </div>

        {/* SECCIÓN 3: LOGO */}
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
             <div style={{ width: '24px', height: '24px', background: '#FAA918', borderRadius: '4px' }}></div>
             <span style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>bocancorp</span>
           </div>
           
           <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#666' }}>
             © 2026 Bocancorp™. <br/> Todos los Derechos Reservados.
           </div>
        </div>

      </div>
      
      <style>{`
        .footer-link { color: white; text-decoration: none; transition: color 0.3s; }
        .footer-link:hover { color: #FAA918; }
      `}</style>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: string }) => (
  <a href="#" style={{
    width: '40px', height: '40px', borderRadius: '50%', background: '#222',
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
    textDecoration: 'none', transition: '0.3s'
  }}
  onMouseOver={(e) => e.currentTarget.style.background = '#FAA918'}
  onMouseOut={(e) => e.currentTarget.style.background = '#222'}
  >
    <i className={`fa-brands ${icon}`} style={{ fontSize: '1.1rem' }}></i>
  </a>
);