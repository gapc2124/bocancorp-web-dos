interface AboutUsProps {
  isMobile: boolean;
}

export const AboutUs = ({ isMobile }: AboutUsProps) => {
  return (
    <section style={{ 
      position: 'relative', 
      width: '100%', 
      // Mismo padding que la referencia para mantener consistencia visual
      padding: isMobile ? '180px 20px 180px' : '280px 100px 280px',
      zIndex: 10, 
      backgroundColor: '#ffffff', 
      overflow: 'hidden' 
    }}>
      
      {/* --- ONDAS SUPERIORES (Igual que referencia) --- */}
      <div className="wave-container top-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#000c2d" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#000c2d" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#000c2d" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <div style={{ 
        position: 'relative',
        zIndex: 20,
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', // Un poco más de espacio al texto
        gap: isMobile ? '50px' : '80px', 
        alignItems: 'center', // Centrado verticalmente
        maxWidth: '1400px',
        margin: '0 auto'
      }}>

        {/* COLUMNA IZQUIERDA: TEXTO */}
        <div>
          <h2 style={{ 
            fontSize: isMobile ? '2rem' : '3rem', 
            fontWeight: 800, 
            color: '#111111', 
            lineHeight: 1.1, 
            marginBottom: '30px' 
          }}>
            Más que proveedores, somos su <span style={{ color: '#FAA918' }}>Aliado de Innovación Tecnológica.</span>
          </h2>
          
          <div style={{ fontSize: '1.15rem', color: '#444', lineHeight: 1.8, marginBottom: '40px' }}>
            <p style={{ marginBottom: '20px' }}>
              Bocancorp es una corporación norteamericana con centros de operaciones estratégicos en 
              <strong> Colombia y Perú</strong>. Nos especializamos en orquestar soluciones tecnológicas complejas 
              para empresas que buscan escalabilidad y seguridad.
            </p>
            <p>
              Nuestro enfoque se basa en la eficiencia financiera (<strong>FinOps</strong>) y nuestro ADN es el 
              <strong> MultiCloud</strong>.
            </p>
          </div>

          <button className="btn-primary" style={{ 
            padding: '16px 45px', 
            fontSize: '1rem', 
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: '#FAA918',
            color: '#000',
            border: 'none',
            borderRadius: '50px',
            boxShadow: '0 10px 20px rgba(250, 169, 24, 0.3)',
            transition: 'transform 0.2s ease'
          }}>
            CONÓCENOS MÁS
          </button>
        </div>

        {/* COLUMNA DERECHA: ÍCONO PREDOMINANTE */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Círculo decorativo de fondo */}
          <div style={{
            position: 'absolute',
            width: isMobile ? '280px' : '400px',
            height: isMobile ? '280px' : '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(250, 169, 24, 0.1) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 1
          }}></div>

          {/* Contenedor del Logo con animación */}
          <div className="logo-float-container" style={{ zIndex: 2 }}>
            <img 
              src="./assets/bocancorp-logo.png" // Asegúrate de tener esta ruta o cambiarla por tu ícono
              alt="Bocancorp Logo" 
              style={{ 
                width: isMobile ? '200px' : '350px', 
                height: 'auto', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 30px rgba(0, 12, 45, 0.2))'
              }} 
            />
          </div>
        </div>

      </div>

      {/* --- ONDAS INFERIORES (Igual que referencia) --- */}
      <div className="wave-container bottom-waves">
        <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="#000c2d" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-slow"></path>
           <path fill="#000c2d" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-medium"></path>
           <path fill="#000c2d" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="wave-anim-fast"></path>
        </svg>
      </div>

      <style>{`
        /* --- ANIMACIÓN FLOTANTE DEL LOGO --- */
        .logo-float-container {
            animation: floatLogo 6s ease-in-out infinite;
        }

        @keyframes floatLogo {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
        }

        /* --- ONDAS (Mantenidas del original) --- */
        .wave-container { position: absolute; left: 0; width: 100%; height: 180px; overflow: hidden; line-height: 0; z-index: 1; pointer-events: none; }
        .top-waves { top: 0; }
        .bottom-waves { bottom: 0; transform: scaleY(-1); }
        .wave-svg { position: relative; display: block; width: calc(100% + 1.3px); height: 100%; }
        .wave-anim-slow { animation: wave-sway 6s ease-in-out infinite alternate; transform-origin: center top; }
        .wave-anim-medium { animation: wave-sway 5s ease-in-out infinite alternate-reverse; transform-origin: center top; }
        .wave-anim-fast { animation: wave-sway 4s ease-in-out infinite alternate; transform-origin: center top; }
        @keyframes wave-sway { 0% { transform: scaleY(1); } 100% { transform: scaleY(1.1); } }

        .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(250, 169, 24, 0.4);
        }
      `}</style>
    </section>
  );
};