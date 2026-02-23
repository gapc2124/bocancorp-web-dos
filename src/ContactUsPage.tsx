import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom'; // 👈 1. Importamos useParams
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import es from 'react-phone-number-input/locale/es'; 
import en from 'react-phone-number-input/locale/en'; // 👈 Importamos inglés para el selector de países

// ==========================================
// 1. DICCIONARIO DE TRADUCCIONES
// ==========================================
const TRANSLATIONS: any = {
  ES: {
    seo: {
      title: "Contacto | Inicia tu Proyecto Cloud con Bocancorp",
      desc: "Solicita un diagnóstico tecnológico con Bocancorp. Expertos en modernización de infraestructura y seguridad avanzada en la nube.",
      keywords: "Bocancorp, Cloud Computing, Ingeniería de Software, Seguridad Cloud, Diagnóstico Tecnológico",
      ogTitle: "Contacto | Bocancorp",
      ogDesc: "Hablemos de negocios. Equipo técnico especializado listo para escalar su infraestructura."
    },
    alerts: {
      success: "¡Solicitud enviada con éxito! El equipo de Bocancorp se pondrá en contacto pronto. 🚀",
      awsError: "Hubo un problema al enviar el correo. Por favor, intenta de nuevo.",
      netError: "No se pudo conectar con el servidor de AWS."
    },
    info: {
      title1: "Hablemos de ",
      title2: "Negocios",
      desc: "Equipo técnico especializado listo para diseñar y escalar su infraestructura empresarial.",
      emailTitle: "Email Corporativo",
      hqTitle: "Sede Operativa",
      hqDesc: "Atención global. Facturación local."
    },
    form: {
      nameLabel: "Nombre Completo",
      namePh: "Nombre",
      emailLabel: "Email Corporativo",
      emailPh: "Email",
      phoneLabel: "Número Celular",
      countryLabel: "País",
      countryPh: "País",
      companyLabel: "Empresa",
      companyPh: "Organización",
      positionLabel: "Cargo",
      positionPh: "Ej. CTO",
      msgLabel: "¿En qué podemos ayudarte?",
      msgPh: "Describe tu desafío...",
      btnSubmit: "Solicitar Diagnóstico",
      btnLoading: "Enviando..."
    }
  },
  EN: {
    seo: {
      title: "Contact Us | Start your Cloud Project with Bocancorp",
      desc: "Request a technological diagnosis with Bocancorp. Experts in infrastructure modernization and advanced cloud security.",
      keywords: "Bocancorp, Cloud Computing, Software Engineering, Cloud Security, Tech Diagnosis",
      ogTitle: "Contact Us | Bocancorp",
      ogDesc: "Let's talk business. Specialized technical team ready to scale your infrastructure."
    },
    alerts: {
      success: "Request sent successfully! The Bocancorp team will contact you soon. 🚀",
      awsError: "There was a problem sending the email. Please try again.",
      netError: "Could not connect to the AWS server."
    },
    info: {
      title1: "Let's Talk ",
      title2: "Business",
      desc: "Specialized technical team ready to design and scale your enterprise infrastructure.",
      emailTitle: "Corporate Email",
      hqTitle: "Operating Headquarters",
      hqDesc: "Global service. Local billing."
    },
    form: {
      nameLabel: "Full Name",
      namePh: "Name",
      emailLabel: "Corporate Email",
      emailPh: "Email",
      phoneLabel: "Phone Number",
      countryLabel: "Country",
      countryPh: "Country",
      companyLabel: "Company",
      companyPh: "Organization",
      positionLabel: "Job Title",
      positionPh: "e.g., CTO",
      msgLabel: "How can we help you?",
      msgPh: "Describe your challenge...",
      btnSubmit: "Request Diagnosis",
      btnLoading: "Sending..."
    }
  }
};

export const ContactUsPage = ({ isMobile }: { isMobile: boolean }) => {
  // 👇 2. LEEMOS EL IDIOMA DIRECTO DE LA URL
  const { lang: urlLang } = useParams(); 
  const currentLang = urlLang === 'en' ? 'EN' : 'ES';
  const t = TRANSLATIONS[currentLang];

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
        alert(t.alerts.success);
        setFormData({ name: '', email: '', phone: '', country: '', company: '', position: '', message: '' });
        setIsSubmitted(false);
      } else {
        const errorData = await response.json();
        console.error("Error de AWS:", errorData);
        alert(t.alerts.awsError);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert(t.alerts.netError);
    } finally {
      setIsLoading(false);
    }
  };

  const dynamicPadding = isMobile ? '14px' : 'clamp(12px, 1.2vw, 18px)';
  const dynamicFontSize = isMobile ? '1rem' : 'clamp(0.9rem, 1vw, 1.1rem)';

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
    fontSize: isMobile ? '0.75rem' : 'clamp(0.75rem, 0.85vw, 0.9rem)', 
    fontWeight: 800, color: '#e2e8f0', marginBottom: '6px',
    display: 'block', textTransform: 'uppercase' as const, letterSpacing: '1px'
  };

  return (
    <div style={{ 
        width: '100%', minHeight: '100vh', fontFamily: 'system-ui, sans-serif',
        backgroundImage: `linear-gradient(135deg, rgba(0, 12, 45, 0.85) 0%, rgba(0, 194, 255, 0.2) 100%), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2560&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
        padding: isMobile ? '100px 15px 60px' : 'clamp(80px, 8vw, 120px) 5vw 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.desc} />
        <meta name="keywords" content={t.seo.keywords} />
        <meta property="og:title" content={t.seo.ogTitle} />
        <meta property="og:description" content={t.seo.ogDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bocancorporation.com/contact" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>

      <div style={{ 
          maxWidth: '1100px',
          width: '100%', display: 'flex', 
          flexDirection: isMobile ? 'column-reverse' : 'row', 
          gap: isMobile ? '30px' : 'clamp(30px, 4vw, 60px)', alignItems: 'center'
      }}>
          
          {/* COLUMNA INFO */}
          <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              style={{ 
                  flex: '0.8', backgroundColor: 'rgba(0, 12, 45, 0.4)', backdropFilter: 'blur(15px)',
                  padding: isMobile ? '25px' : 'clamp(30px, 3vw, 45px)', borderRadius: '24px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  overflow: 'hidden'
              }}
          >
              <h3 style={{ fontSize: isMobile ? '2rem' : 'clamp(2.2rem, 3vw, 3.2rem)', fontWeight: 950, color: '#ffffff', marginBottom: '15px', lineHeight: 1.1 }}>
                  {t.info.title1}<br/><span style={{ color: '#FAA918' }}>{t.info.title2}</span>
              </h3>
              <p style={{ color: '#b0b8d1', fontSize: isMobile ? '0.95rem' : 'clamp(1rem, 1.2vw, 1.15rem)', marginBottom: '30px', lineHeight: 1.5 }}>
                  {t.info.desc}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                  <div style={{ backgroundColor: 'rgba(0, 194, 255, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(0, 194, 255, 0.4)', display: 'flex' }}>
                      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#00C2FF" strokeWidth="2.5">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                  </div>
                  <div>
                      <h4 style={{ margin: '0', fontSize: '0.8rem', color: '#ffffff', textTransform: 'uppercase', opacity: 0.6 }}>{t.info.emailTitle}</h4>
                      <a href="mailto:contact@bocancorporation.com" style={{ color: '#00C2FF', fontWeight: 800, textDecoration: 'none' }}>contact@bocancorporation.com</a>
                  </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ backgroundColor: 'rgba(250, 169, 24, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(250, 169, 24, 0.4)', display: 'flex' }}>
                      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FAA918" strokeWidth="2.5">
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                          <path d="M9 22v-4h6v4"></path>
                      </svg>
                  </div>
                  <div>
                      <h4 style={{ margin: '0', fontSize: '0.8rem', color: '#ffffff', textTransform: 'uppercase', opacity: 0.6 }}>{t.info.hqTitle}</h4>
                      <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>{t.info.hqDesc}</p>
                  </div>
              </div>
          </motion.div>

          {/* COLUMNA FORMULARIO */}
          <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
              style={{ 
                  flex: '1.2', backgroundColor: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(25px)',
                  padding: isMobile ? '30px 20px' : 'clamp(25px, 2.5vw, 40px)', borderRadius: '24px', 
                  border: '1px solid rgba(0, 194, 255, 0.2)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
              }}
          >
              <form style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '15px' : '20px' }}>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>{t.form.nameLabel}</label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t.form.namePh} style={getDynamicStyle('name')} />
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>{t.form.emailLabel}</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.form.emailPh} style={getDynamicStyle('email')} />
                      </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>{t.form.phoneLabel}</label>
                          <div style={getDynamicStyle('phone')} className="cyber-phone-container">
                            <PhoneInput international defaultCountry="US" labels={currentLang === 'ES' ? es : en} value={formData.phone} onChange={handlePhoneChange} className="cyber-phone-inner" />
                          </div>
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>{t.form.countryLabel}</label>
                          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder={t.form.countryPh} style={getDynamicStyle('country')} />
                      </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>{t.form.companyLabel}</label>
                          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder={t.form.companyPh} style={getDynamicStyle('company')} />
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>{t.form.positionLabel}</label>
                          <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder={t.form.positionPh} style={getDynamicStyle('position')} />
                      </div>
                  </div>

                  <div>
                      <label style={labelStyle}>{t.form.msgLabel}</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder={t.form.msgPh} style={{ ...getDynamicStyle('message'), resize: 'none' }} />
                  </div>

                  <button 
                      type="button" 
                      onClick={handleSubmit} 
                      disabled={isLoading}
                      style={{ 
                          background: isLoading ? '#555' : 'linear-gradient(135deg, #00C2FF 0%, #0078ff 100%)', 
                          color: '#ffffff', 
                          fontSize: isMobile ? '1rem' : '1.1rem', fontWeight: 900, 
                          padding: isMobile ? '14px' : '18px', border: 'none', 
                          borderRadius: '12px', cursor: isLoading ? 'not-allowed' : 'pointer', 
                          transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1px'
                      }}
                  >
                      {isLoading ? t.form.btnLoading : t.form.btnSubmit}
                  </button>
              </form>
          </motion.div>
      </div>

      <style>{`
        input:-webkit-autofill { -webkit-text-fill-color: #ffffff !important; -webkit-box-shadow: 0 0 0px 1000px #001848 inset !important; }
        .cyber-phone-container { padding: 0 !important; border: none !important; box-shadow: none !important; }
        .cyber-phone-inner { width: 100%; display: flex; gap: 10px; align-items: stretch; }
        .PhoneInputCountry { padding: 0 10px; background-color: rgba(0, 24, 72, 0.85); border-radius: 12px; border: inherit; }
        .cyber-phone-inner input { background-color: transparent !important; color: #ffffff !important; padding: ${dynamicPadding} !important; font-size: ${dynamicFontSize} !important; border: none !important; outline: none; width: 100%; }
        .PhoneInputCountryIcon { width: 24px !important; height: auto !important; }
        .PhoneInputCountrySelectArrow { color: #ffffff; opacity: 0.8; margin-left: 8px; }
      `}</style>
    </div>
  );
};