export const Footer = () => {
  return (
    <footer style={{
      position: 'absolute',
      bottom: '20px',
      left: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none', // Para que los clics pasen a través del footer si no es un link
      zIndex: 10,
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)', // Efecto cristal
        backdropFilter: 'blur(10px)',
        padding: '10px 30px',
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: '0.9rem',
        pointerEvents: 'auto', // Reactivar clics para los botones del footer
        display: 'flex',
        gap: '20px'
      }}>
        <span>© 2026 Bocancorp</span>
        <span>|</span>
        <a href="#" style={{ color: '#4da6ff', textDecoration: 'none' }}>Instagram</a>
        <a href="#" style={{ color: '#4da6ff', textDecoration: 'none' }}>Contacto</a>
      </div>
    </footer>
  );
};