import React from 'react';

interface ServicesSectionProps {
  isMobile: boolean;
}

export const ServicesSection = ({ isMobile }: ServicesSectionProps) => {
  return (
    <section style={{ 
      position: 'relative', 
      width: '100%', 
      // Mantenemos el padding que te gusta (pegado arriba en móvil)
      padding: isMobile ? '30px 20px 60px' : '60px 100px 120px',
      zIndex: 10, 
      backgroundColor: '#ffffff', 
      borderTopLeftRadius: '30px', 
      borderTopRightRadius: '30px'
    }}>
      
      {/* NUEVO GRID MASTER: Envuelve todo el contenido */}
      <div style={{ 
        display: 'grid', 
        // En móvil 1 columna, en PC 2 columnas iguales
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
        gap: isMobile ? '50px' : '80px', // Espacio entre los dos grandes bloques
        alignItems: 'start'
      }}>

        {/* ==============================================
            COLUMNA IZQUIERDA (Título Principal + Innovación)
           ============================================== */}
        <div>
          {/* --- Encabezado Principal --- */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: 800, color: '#111111', lineHeight: 1.1, marginBottom: '20px' }}>
              Potenciamos tu Evolución con <span style={{ color: 'var(--c-accent)' }}>Innovación Tecnológica</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#555555', marginBottom: '30px' }}>
              Somos expertos transformando tus desafíos en soluciones personalizadas.
            </p>
            <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1rem' }}>
              AGENDE AHORA!
            </button>
          </div>

          {/* --- Bloque Innovación Tecnológica (Texto Reducido) --- */}
          <div>
            <h3 style={{ fontSize: '1.8rem', color: '#111111', marginBottom: '20px', borderLeft: '4px solid var(--c-accent)', paddingLeft: '20px' }}>
              Innovación Tecnológica
            </h3>
            {/* Párrafos condensados en uno solo más corto */}
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444444' }}>
              Transformamos desafíos en soluciones a medida. Desde Data Science hasta soluciones en la nube, en Bocancorp superamos los límites tecnológicos para adaptarnos a las necesidades específicas de cada proyecto.
            </p>
          </div>
        </div>


        {/* ==============================================
            COLUMNA DERECHA (Creando el Futuro + Tarjetas)
            Ahora en PC aparece justo al lado del título principal.
           ============================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#111111', marginBottom: '10px' }}>
            Creando el Futuro a Medida
          </h3>

          {/* CARD 1 - Texto Reducido */}
          <div style={cardStyle}>
            <div style={iconBoxStyle}><i className="fa-solid fa-code"></i></div>
            <div>
              <h4 style={{ color: '#111111', fontSize: '1.3rem', marginBottom: '10px' }}>Soluciones Adaptativas</h4>
              <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Software 100% personalizado que garantiza una adaptabilidad única a tu negocio.
              </p>
            </div>
          </div>

          {/* CARD 2 - Texto Reducido */}
          <div style={cardStyle}>
            <div style={iconBoxStyle}><i className="fa-solid fa-chart-line"></i></div>
            <div>
              <h4 style={{ color: '#111111', fontSize: '1.3rem', marginBottom: '10px' }}>Maestría Analítica</h4>
              <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Data Science profundo para potenciar tus decisiones estratégicas.
              </p>
            </div>
          </div>

          {/* CARD 3 - Texto Reducido */}
          <div style={cardStyle}>
            <div style={iconBoxStyle}><i className="fa-solid fa-cloud"></i></div>
            <div>
              <h4 style={{ color: '#111111', fontSize: '1.3rem', marginBottom: '10px' }}>Agilidad en la Nube</h4>
              <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Implementación ágil y eficiente para un rendimiento óptimo constante.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const cardStyle: React.CSSProperties = {
  background: '#ffffff', 
  border: '1px solid #e5e7eb', 
  padding: '25px',
  borderRadius: '12px',
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'default',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)' 
};

const iconBoxStyle: React.CSSProperties = {
  minWidth: '50px',
  height: '50px',
  background: 'var(--c-accent)',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  fontSize: '1.2rem',
  fontWeight: 'bold'
};