import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import es from 'react-phone-number-input/locale/es'; 

export const ContactUsPage = ({ isMobile }: { isMobile: boolean }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', country: '', company: '', position: '', message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value?: string) => {
    setFormData({ ...formData, phone: value || '' });
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const isValid = formData.name && formData.email && formData.message && formData.phone;
    if (!isValid) return;

    setIsLoading(true);
    const API_URL = "https://22gsjev800.execute-api.us-east-1.amazonaws.com/sendContactEmail_Bocancorp";

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("¡Solicitud enviada con éxito! El equipo de Bocancorp se pondrá en contacto pronto. 🚀");
        setFormData({ name: '', email: '', phone: '', country: '', company: '', position: '', message: '' });
        setIsSubmitted(false);
      } else {
        const errorData = await response.json();
        console.error("Error de AWS:", errorData);
        alert("Hubo un problema al enviar el correo. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor de AWS.");
    } finally {
      setIsLoading(false);
    }
  };

  const dynamicPadding = isMobile ? '14px' : 'clamp(16px, 1.5vw, 24px)';
  const dynamicFontSize = isMobile ? '1rem' : 'clamp(1rem, 1.2vw, 1.2rem)';

  const getDynamicStyle = (fieldName: keyof typeof formData) => {
    const value = formData[fieldName] || '';
    let borderColor = 'rgba(255, 255, 255, 0.4)'; 
    let shadow = '0 0 5px rgba(255, 255, 255, 0.1)';
    let isValidField = value.trim() !== '';
    if (fieldName === 'email' && value) isValidField = /\S+@\S+\.\S+/.test(value);
    if (fieldName === 'phone' && value) isValidField = value.length > 8; 

    if (isSubmitted && !isValidField) {
        borderColor = '#ff3333'; 
        shadow = '0 0 15px rgba(255, 51, 51, 0.6), inset 0 0 8px rgba(255, 51, 51, 0.2)';
    } else if (isValidField) {
        borderColor = '#00C2FF'; 
        shadow = '0 0 15px rgba(0, 194, 255, 0.5), inset 0 0 8px rgba(0, 194, 255, 0.2)';
    }

    return { 
      padding: dynamicPadding, 
      borderRadius: '12px', 
      border: `2px solid ${borderColor}`, 
      backgroundColor: 'rgba(0, 24, 72, 0.85)', 
      color: '#ffffff', 
      fontSize: dynamicFontSize, 
      outline: 'none', 
      width: '100%', 
      boxSizing: 'border-box' as const,
      transition: 'all 0.4s ease', 
      boxShadow: shadow
    };
  };

  const labelStyle = { 
    fontSize: isMobile ? '0.75rem' : 'clamp(0.85rem, 1vw, 1rem)', 
    fontWeight: 800, color: '#e2e8f0', marginBottom: '8px',
    display: 'block', textTransform: 'uppercase' as const, letterSpacing: '1px'
  };

  return (
    <div style={{ 
        width: '100%', minHeight: '100vh', fontFamily: 'system-ui, sans-serif',
        backgroundImage: `linear-gradient(135deg, rgba(0, 12, 45, 0.85) 0%, rgba(0, 194, 255, 0.2) 100%), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2560&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
        padding: isMobile ? '100px 15px 60px' : 'clamp(120px, 10vw, 180px) clamp(40px, 5vw, 100px) 100px',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      
      <Helmet>
        <title>Contacto | Inicia tu Proyecto Cloud con Bocancorp</title>
        <meta name="description" content="Solicita un diagnóstico tecnológico con Bocancorp. Expertos en modernización de infraestructura y seguridad avanzada en la nube." />
        <meta name="keywords" content="Bocancorp, Cloud Computing, Ingeniería de Software, Seguridad Cloud, Diagnóstico Tecnológico" />
        {/* Open Graph para Redes Sociales */}
        <meta property="og:title" content="Contacto | Bocancorp" />
        <meta property="og:description" content="Hablemos de negocios. Equipo técnico especializado listo para escalar su infraestructura." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bocancorporation.com/contact" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>

      <div style={{ 
          maxWidth: '1500px', width: '100%', display: 'flex', 
          flexDirection: isMobile ? 'column-reverse' : 'row', 
          gap: isMobile ? '30px' : 'clamp(40px, 4vw, 80px)', alignItems: 'stretch'
      }}>
          
          <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              style={{ 
                  flex: '0.8', backgroundColor: 'rgba(0, 12, 45, 0.4)', backdropFilter: 'blur(15px)',
                  padding: isMobile ? '25px' : 'clamp(40px, 4vw, 60px)', borderRadius: '24px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  overflow: 'hidden'
              }}
          >
              <h3 style={{ fontSize: isMobile ? '2rem' : 'clamp(3rem, 4vw, 4.5rem)', fontWeight: 950, color: '#ffffff', marginBottom: isMobile ? '10px' : '20px', lineHeight: 1.1 }}>
                  Hablemos de <br/><span style={{ color: '#FAA918' }}>Negocios</span>
              </h3>
              <p style={{ color: '#b0b8d1', fontSize: isMobile ? '0.95rem' : 'clamp(1.1rem, 1.5vw, 1.4rem)', marginBottom: isMobile ? '25px' : 'clamp(30px, 3vw, 50px)', lineHeight: 1.6 }}>
                  Equipo técnico especializado listo para diseñar y escalar su infraestructura empresarial.
              </p>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? '12px' : 'clamp(15px, 2vw, 25px)', marginBottom: isMobile ? '20px' : '40px' }}>
                  <div style={{ backgroundColor: 'rgba(0, 194, 255, 0.1)', padding: isMobile ? '10px' : 'clamp(12px, 1.5vw, 20px)', borderRadius: '12px', border: '1px solid rgba(0, 194, 255, 0.4)', flexShrink: 0, display: 'flex' }}>
                      <svg width={isMobile ? 20 : 32} height={isMobile ? 20 : 32} viewBox="0 0 24 24" fill="none" stroke="#00C2FF" strokeWidth="2.5">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: isMobile ? '0.8rem' : 'clamp(0.9rem, 1.2vw, 1.1rem)', color: '#ffffff', textTransform: 'uppercase', opacity: 0.7 }}>Email Corporativo</h4>
                      <a href="mailto:contact@bocancorporation.com" style={{ 
                          color: '#00C2FF', fontWeight: 800, fontSize: isMobile ? '0.9rem' : 'clamp(1.1rem, 1.5vw, 1.4rem)', 
                          wordBreak: 'break-all', overflowWrap: 'anywhere', textDecoration: 'none', transition: 'color 0.3s'
                      }}>
                          contact@bocancorporation.com
                      </a>
                  </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? '12px' : 'clamp(15px, 2vw, 25px)' }}>
                  <div style={{ backgroundColor: 'rgba(250, 169, 24, 0.1)', padding: isMobile ? '10px' : 'clamp(12px, 1.5vw, 20px)', borderRadius: '12px', border: '1px solid rgba(250, 169, 24, 0.4)', flexShrink: 0, display: 'flex' }}>
                      <svg width={isMobile ? 20 : 32} height={isMobile ? 20 : 32} viewBox="0 0 24 24" fill="none" stroke="#FAA918" strokeWidth="2.5">
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                          <path d="M9 22v-4h6v4"></path>
                      </svg>
                  </div>
                  <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: isMobile ? '0.8rem' : 'clamp(0.9rem, 1.2vw, 1.1rem)', color: '#ffffff', textTransform: 'uppercase', opacity: 0.7 }}>Sede Operativa</h4>
                      <p style={{ margin: 0, color: '#94a3b8', lineHeight: 1.4, fontSize: isMobile ? '0.9rem' : 'clamp(1rem, 1.3vw, 1.2rem)', fontWeight: 500 }}>Atención global. Facturación local.</p>
                  </div>
              </div>
          </motion.div>

          <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
              style={{ 
                  flex: '1.2', backgroundColor: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(25px)',
                  padding: isMobile ? '30px 20px' : 'clamp(40px, 4vw, 60px)', borderRadius: '24px', 
                  border: '1px solid rgba(0, 194, 255, 0.2)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
              }}
          >
              <form style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '20px' : 'clamp(25px, 2vw, 35px)' }}>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '20px' : 'clamp(20px, 2vw, 30px)' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Nombre Completo</label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" style={getDynamicStyle('name')} />
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Correo Corporativo</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@empresa.com" style={getDynamicStyle('email')} />
                      </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '20px' : 'clamp(20px, 2vw, 30px)' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Número de Celular</label>
                          <div style={getDynamicStyle('phone')} className="cyber-phone-container">
                            {/* CAMBIADO: defaultCountry a US */}
                            <PhoneInput international defaultCountry="US" labels={es} value={formData.phone} onChange={handlePhoneChange} className="cyber-phone-inner" />
                          </div>
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>País de Residencia</label>
                          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="País" style={getDynamicStyle('country')} />
                      </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '20px' : 'clamp(20px, 2vw, 30px)' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Empresa</label>
                          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Organización" style={getDynamicStyle('company')} />
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Cargo que ocupas</label>
                          <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Ej. CTO, Gerente" style={getDynamicStyle('position')} />
                      </div>
                  </div>

                  <div>
                      <label style={labelStyle}>¿En qué podemos ayudarte?</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={isMobile ? 3 : 5} placeholder="Describe brevemente tu desafío tecnológico..." style={{ ...getDynamicStyle('message'), resize: 'vertical' }} />
                  </div>

                  <button 
                      type="button" 
                      onClick={handleSubmit} 
                      disabled={isLoading}
                      style={{ 
                          marginTop: '5px',
                          background: isLoading ? '#555' : 'linear-gradient(135deg, #00C2FF 0%, #0078ff 100%)', 
                          color: '#ffffff', 
                          fontSize: isMobile ? '1.1rem' : 'clamp(1.2rem, 1.5vw, 1.5rem)', fontWeight: 900, 
                          padding: isMobile ? '16px' : 'clamp(18px, 1.5vw, 24px)', border: 'none', 
                          borderRadius: '16px', cursor: isLoading ? 'not-allowed' : 'pointer', 
                          transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1px'
                      }}
                      onMouseOver={(e) => { if(!isLoading) { e.currentTarget.style.background = 'linear-gradient(135deg, #FAA918 0%, #e09615 100%)'; e.currentTarget.style.transform = 'scale(1.02)'; } }}
                      onMouseOut={(e) => { if(!isLoading) { e.currentTarget.style.background = 'linear-gradient(135deg, #00C2FF 0%, #0078ff 100%)'; e.currentTarget.style.transform = 'scale(1)'; } }}
                  >
                      {isLoading ? 'Enviando...' : 'Solicitar Diagnóstico'}
                  </button>
              </form>
          </motion.div>
      </div>

      <style>{`
        input:-webkit-autofill { -webkit-text-fill-color: #ffffff !important; -webkit-box-shadow: 0 0 0px 1000px #001848 inset !important; }
        
        .cyber-phone-container { padding: 0 !important; border: none !important; box-shadow: none !important; }
        .cyber-phone-inner { width: 100%; display: flex; gap: clamp(10px, 1vw, 20px); align-items: stretch; }
        
        .PhoneInputCountry { 
            padding: 0 clamp(10px, 1vw, 20px); 
            background-color: rgba(0, 24, 72, 0.85); 
            borderRadius: 12px; border: inherit; box-shadow: inherit; 
            min-width: clamp(70px, 6vw, 110px); 
            display: flex; justify-content: center; align-items: center; 
        }
        
        .cyber-phone-inner input { 
            background-color: rgba(0, 24, 72, 0.85) !important; color: #ffffff !important; 
            padding: ${dynamicPadding} !important; font-size: ${dynamicFontSize} !important;
            border-radius: 12px; border: inherit; box-shadow: inherit; width: 100%; outline: none; 
            font-family: inherit;
        }

        .PhoneInputCountryIcon { width: clamp(24px, 2vw, 32px) !important; height: auto !important; }
        .PhoneInputCountrySelectArrow { color: #ffffff; opacity: 0.8; margin-left: 8px; width: clamp(6px, 0.5vw, 8px) !important; height: clamp(6px, 0.5vw, 8px) !important; }
        
        a:hover { filter: brightness(1.3); }
      `}</style>
    </div>
  );
};