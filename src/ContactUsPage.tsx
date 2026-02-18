import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Importaciones de la librería de teléfonos
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import es from 'react-phone-number-input/locale/es'; // Traduce los nombres de países al español

export const ContactUsPage = ({ isMobile }: { isMobile: boolean }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // La librería guarda todo aquí (ej: +51999999999)
    country: '',
    company: '',
    position: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Manejador para inputs normales
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejador especial para el teléfono
  const handlePhoneChange = (value?: string) => {
    setFormData({ ...formData, phone: value || '' });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log("Datos del formulario a enviar:", formData);
  };

  // --- LÓGICA DE BORDES Y BRILLOS DINÁMICOS ---
  const getDynamicStyle = (fieldName: keyof typeof formData) => {
    const value = formData[fieldName] || '';
    
    // ESTADO POR DEFECTO: Blanco suave
    let borderColor = 'rgba(255, 255, 255, 0.4)'; 
    let shadow = '0 0 5px rgba(255, 255, 255, 0.1)';

    // Validación
    let isValid = value.trim() !== '';
    if (fieldName === 'email' && value) {
        isValid = /\S+@\S+\.\S+/.test(value);
    }
    // Validación básica extra para que el teléfono no quede solo en el código
    if (fieldName === 'phone' && value) {
        isValid = value.length > 8; 
    }

    // ESTADO INCORRECTO/VACÍO (Post-Submit): Rojo neón
    if (isSubmitted && !isValid) {
        borderColor = '#ff3333'; 
        shadow = '0 0 15px rgba(255, 51, 51, 0.6), inset 0 0 8px rgba(255, 51, 51, 0.2)';
    } 
    // ESTADO CORRECTO: Azul cian brillante
    else if (isValid) {
        borderColor = '#00C2FF'; 
        shadow = '0 0 15px rgba(0, 194, 255, 0.5), inset 0 0 8px rgba(0, 194, 255, 0.2)';
    }

    return { 
      padding: '16px', 
      borderRadius: '12px', 
      border: `2px solid ${borderColor}`, 
      backgroundColor: 'rgba(0, 24, 72, 0.85)', // Fondo fijo azul oscuro
      color: '#ffffff', 
      fontSize: '1rem', 
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box' as const,
      transition: 'border-color 0.4s ease, box-shadow 0.4s ease', 
      boxShadow: shadow
    };
  };

  const labelStyle = { 
    fontSize: '0.9rem', 
    fontWeight: 800, 
    color: '#e2e8f0', 
    marginBottom: '10px',
    display: 'block',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    textShadow: '0 0 10px rgba(0, 194, 255, 0.2)'
  };

  return (
    <div style={{ 
        width: '100%', 
        minHeight: '100vh', 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundImage: `linear-gradient(135deg, rgba(0, 12, 45, 0.85) 0%, rgba(0, 194, 255, 0.2) 100%), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: isMobile ? '120px 20px 60px' : '160px 60px 100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      
      <div style={{ 
          maxWidth: '1200px', 
          width: '100%',
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          gap: '40px',
          alignItems: 'stretch'
      }}>
          
          {/* --- COLUMNA IZQUIERDA --- */}
          <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              style={{ 
                  flex: '1', 
                  backgroundColor: 'rgba(0, 12, 45, 0.4)',
                  backdropFilter: 'blur(15px)',
                  padding: isMobile ? '30px' : '50px', 
                  borderRadius: '24px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
              }}
          >
              <h3 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, color: '#ffffff', marginBottom: '15px', lineHeight: 1.1, textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
                  Hablemos de <br/>
                  <span style={{ color: '#FAA918', textShadow: '0 0 20px rgba(250, 169, 24, 0.5)' }}>Negocios</span>
              </h3>
              
              <p style={{ color: '#b0b8d1', fontSize: '1.15rem', marginBottom: '40px', lineHeight: 1.6 }}>
                  Ya sea que busques modernizar tus aplicaciones o implementar seguridad avanzada, nuestro equipo técnico especializado está listo.
              </p>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
                  <div style={{ backgroundColor: 'rgba(0, 194, 255, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(0, 194, 255, 0.4)', boxShadow: '0 0 15px rgba(0, 194, 255, 0.2)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C2FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                  </div>
                  <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px' }}>Correo Electrónico</h4>
                      <p style={{ margin: 0, color: '#00C2FF', fontWeight: 600, fontSize: '1.05rem' }}>contact@bocancorporation.com</p>
                  </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
                  <div style={{ backgroundColor: 'rgba(250, 169, 24, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(250, 169, 24, 0.4)', boxShadow: '0 0 15px rgba(250, 169, 24, 0.2)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FAA918" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                          <path d="M9 22v-4h6v4"></path>
                          <path d="M8 6h.01"></path>
                          <path d="M16 6h.01"></path>
                          <path d="M12 6h.01"></path>
                          <path d="M12 10h.01"></path>
                          <path d="M12 14h.01"></path>
                          <path d="M16 10h.01"></path>
                          <path d="M16 14h.01"></path>
                          <path d="M8 10h.01"></path>
                          <path d="M8 14h.01"></path>
                      </svg>
                  </div>
                  <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px' }}>Sede y Operaciones</h4>
                      {/* TEXTO CORREGIDO: SE ELIMINÓ "y modalidad white-label." */}
                      <p style={{ margin: 0, color: '#94a3b8', lineHeight: 1.5 }}>Atención global con facturación local.</p>
                  </div>
              </div>
          </motion.div>

          {/* --- COLUMNA DERECHA: Formulario Reactivo --- */}
          <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ 
                  flex: '1.3', 
                  backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                  backdropFilter: 'blur(25px)',
                  padding: isMobile ? '30px' : '50px', 
                  borderRadius: '24px', 
                  border: '1px solid rgba(0, 194, 255, 0.2)',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                  position: 'relative'
              }}
          >
              <form style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Nombre Completo</label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ej. Carlos Mendoza" style={getDynamicStyle('name')} className="form-input" />
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Correo Corporativo</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="carlos@empresa.com" style={getDynamicStyle('email')} className="form-input" />
                      </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Número de Celular</label>
                          {/* MODIFICACIÓN: 
                             Se envuelve PhoneInput en un div (cyber-phone-container)
                             y se aplica el estilo dinámico SOLO al contenedor externo
                             para gestionar la separación visualmente vía CSS.
                          */}
                          <div style={getDynamicStyle('phone')} className="cyber-phone-container">
                            <PhoneInput
                                international
                                defaultCountry="PE" 
                                labels={es} 
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                className="cyber-phone-inner"
                            />
                          </div>
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>País de Residencia</label>
                          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Ej. Perú" style={getDynamicStyle('country')} className="form-input" />
                      </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Empresa</label>
                          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Nombre de tu organización" style={getDynamicStyle('company')} className="form-input" />
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Cargo que ocupas</label>
                          <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Ej. CTO, Gerente TI" style={getDynamicStyle('position')} className="form-input" />
                      </div>
                  </div>

                  <div>
                      <label style={labelStyle}>Dinos en qué podemos ayudarte</label>
                      <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4} 
                          placeholder="¿Cuáles son los desafíos tecnológicos actuales de tu empresa?" 
                          style={{ ...getDynamicStyle('message'), resize: 'vertical' }}
                          className="form-input"
                      />
                  </div>

                  <button 
                      type="button"
                      onClick={handleSubmit} 
                      style={{ 
                          marginTop: '5px',
                          background: 'linear-gradient(135deg, #00C2FF 0%, #0078ff 100%)', 
                          color: '#ffffff', 
                          fontSize: '1.2rem', 
                          fontWeight: 900, 
                          padding: '18px', 
                          border: 'none', 
                          borderRadius: '16px', 
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 10px 30px rgba(0, 194, 255, 0.4)',
                          textTransform: 'uppercase',
                          letterSpacing: '2px'
                      }}
                      onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)';
                          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 194, 255, 0.6)';
                          e.currentTarget.style.background = 'linear-gradient(135deg, #FAA918 0%, #e09615 100%)';
                      }}
                      onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 194, 255, 0.4)';
                          e.currentTarget.style.background = 'linear-gradient(135deg, #00C2FF 0%, #0078ff 100%)';
                      }}
                  >
                      Solicitar Diagnóstico Inicial
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                      Al enviar este formulario, aceptas nuestra política de privacidad.
                  </p>
              </form>
          </motion.div>
      </div>

      <style>{`
        ::placeholder { color: #8fa3b0; font-weight: 500; opacity: 1; }
        
        /* HACK DEFINITIVO PARA AUTOFILL DE CHROME */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0px 1000px #001848 inset !important;
          transition: background-color 5000s ease-in-out 0s;
          caret-color: white; 
        }

        /* Intensificar el brillo suavemente al hacer click */
        .form-input:focus {
            filter: brightness(1.2);
        }

        /* --- ESTILOS PERSONALIZADOS PARA LA LIBRERÍA DE TELÉFONO (SEPARACIÓN) --- */
        
        /* 1. Anulamos el padding general del contenedor (porque ahora usaremos padding en cada bloque interior).
           Mantenemos el background y el borde general para la validación.
        */
        .cyber-phone-container {
            padding: 0 !important;
            display: flex;
            align-items: stretch;
            background-color: transparent !important; /* El fondo lo manejamos en los hijos */
            border: none !important; /* El borde validado lo pasamos a los hijos */
            box-shadow: none !important; /* La sombra también */
        }

        /* Hacemos que la librería ocupe el 100% y respete flexbox */
        .cyber-phone-inner {
            width: 100%;
            display: flex;
            gap: 15px; /* ESPACIO DE SEPARACIÓN ENTRE CÓDIGO Y NÚMERO */
        }

        /* 2. Estilizamos el bloque del selector (Bandera + Código)
           Heredamos los bordes y sombras dinámicas del padre usando "inherit"
           pero lo configuramos como una "caja" propia.
        */
        .PhoneInputCountry {
            margin: 0 !important; /* Anulamos el margen por defecto de la librería */
            padding: 16px 15px;
            background-color: rgba(0, 24, 72, 0.85); /* Fondo azul oscuro */
            border-radius: 12px;
            
            /* HERENCIA DINÁMICA DE VALIDACIÓN (Borde y sombra) */
            border: inherit; 
            box-shadow: inherit;
            transition: inherit;

            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 80px;
        }

        /* 3. Estilizamos el bloque del input de texto (Número) 
        */
        .cyber-phone-inner input {
            background-color: rgba(0, 24, 72, 0.85) !important;
            color: #ffffff !important;
            outline: none !important;
            font-size: 1rem;
            font-family: inherit;
            width: 100%;
            padding: 16px;
            border-radius: 12px;

            /* HERENCIA DINÁMICA DE VALIDACIÓN (Borde y sombra) */
            border: inherit;
            box-shadow: inherit;
            transition: inherit;
        }

        .cyber-phone-inner input::placeholder {
            color: #8fa3b0;
        }

        /* Color de la flechita del selector */
        .PhoneInputCountrySelectArrow {
            color: #ffffff;
            opacity: 0.8;
            margin-left: 8px;
        }
        
        /* Quitar borde oscuro de la librería al seleccionar */
        .PhoneInputCountrySelect:focus + .PhoneInputCountryIcon + .PhoneInputCountrySelectArrow {
             color: #00C2FF;
             opacity: 1;
        }

        /* Hover general para los bloques de teléfono */
        .PhoneInputCountry:focus-within, .cyber-phone-inner input:focus {
            filter: brightness(1.2);
        }
      `}</style>
    </div>
  );
};