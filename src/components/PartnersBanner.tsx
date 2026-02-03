const PARTNER_LOGOS = [
    './assets/MyIntelli.png',
    './assets/RuedaVerde.png',
    './assets/DateCSA.png',
    './assets/Miranda.png',
    './assets/tuulapp.png',
    './assets/Ingram.png',
];

const DOUBLED_LOGOS = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

export const PartnersBanner = () => {
  return (
    <div className="partners-banner-container">
      <div className="partners-track">
        {DOUBLED_LOGOS.map((logoSrc, index) => (
          <div key={index} className="partner-item">
            <img 
              src={logoSrc} 
              alt={`Partner ${index}`} 
            />
          </div>
        ))}
      </div>

      <style>{`
        .partners-banner-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 20px 0; 
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }

        .partners-track {
          display: flex;
          width: max-content;
          /* Ajustamos la velocidad para el nuevo tamaño */
          animation: scrollInfinite 35s linear infinite; 
        }

        .partner-item {
          flex: 0 0 auto;
          /* Reducimos un poco el espacio lateral para que no queden tan dispersos */
          padding: 0 50px; 
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .partner-item img {
          /* --- TAMAÑO REDUCIDO --- */
          height: 90px; /* Bajamos de 150px a 90px. Elegante y visible. */
          width: auto;
          object-fit: contain;
          
          /* Colores originales */
          opacity: 1; 
          
          transition: all 0.3s ease;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
        }
        
        .partner-item img:hover {
           transform: scale(1.1); 
        }

        @keyframes scrollInfinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
           /* Tamaño móvil ajustado */
           .partner-item img { height: 50px; } 
           .partner-item { padding: 0 25px; }
        }
      `}</style>
    </div>
  );
};