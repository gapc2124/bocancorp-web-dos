import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom'; // 1. Hook para leer parámetros URL

export const ContactUsPage = ({ isMobile }: { isMobile: boolean }) => {
  const [searchParams] = useSearchParams();
  
  // 2. Leemos el parámetro "service" de la URL al cargar (si existe)
  const initialService = searchParams.get('service') || '';
  
  // 3. Estado que controla qué servicio está seleccionado
  const [selectedService, setSelectedService] = useState(initialService);

  // Actualizamos el estado si la URL cambia estando en la misma página
  useEffect(() => {
    const currentService = searchParams.get('service');
    if (currentService) {
      setSelectedService(currentService);
    }
  }, [searchParams]);

  // Estilos reutilizables para los inputs
  const inputStyle = { 
    padding: '14px', 
    borderRadius: '8px', 
    border: '1px solid rgba(255, 255, 255, 0.2)', 
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    color: '#ffffff', 
    fontSize: '1rem', 
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
    transition: 'border 0.3s ease'
  };

  const labelStyle = { 
    fontSize: '0.9rem', 
    fontWeight: 600, 
    color: '#b0b8d1',
    marginBottom: '8px',
    display: 'block'
  };

  return (
    <div style={{ 
        width: '100%', 
        minHeight: '100vh', 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundImage: `linear-gradient(135deg, rgba(0, 12, 45, 0.9) 0%, rgba(0, 194, 255, 0.1) 100%), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: isMobile ? '120px 20px 60px' : '160px 60px 100px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }}>
      
      {/* --- CONTENEDOR PRINCIPAL (Efecto Glassmorphism) --- */}
      <div style={{ 
          maxWidth: '1200px', 
          width: '100%',
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          gap: '40px'
      }}>
          
          {/* COLUMNA IZQUIERDA: Información de Contacto */}
          <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              style={{ 
                  flex: '1', 
                  backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                  backdropFilter: 'blur(16px)',
                  padding: isMobile ? '30px' : '50px', 
                  borderRadius: '24px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
              }}
          >
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '15px', lineHeight: 1.1 }}>
                  Hablemos de <span style={{ color: '#FAA918' }}>Negocios</span>
              </h3>
              <p style={{ color: '#b0b8d1', fontSize: '1.1rem', marginBottom: '40px', lineHeight: 1.6 }}>
                  Ya sea que busques modernizar tus aplicaciones, implementar seguridad avanzada o controlar tu facturación local, nuestro equipo técnico especializado está listo para integrarse a tus objetivos.
              </p>

              {/* Ítem: Correo */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
                  <div style={{ backgroundColor: 'rgba(0, 194, 255, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(0, 194, 255, 0.2)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                  </div>
                  <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#ffffff' }}>Correo Electrónico</h4>
                      <p style={{ margin: 0, color: '#94a3b8' }}>contacto@bocancorp.com</p>
                  </div>
              </div>

              {/* Ítem: Ubicación / Modalidad */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
                  <div style={{ backgroundColor: 'rgba(250, 169, 24, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(250, 169, 24, 0.2)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FAA918" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#ffffff' }}>Sede y Operaciones</h4>
                      <p style={{ margin: 0, color: '#94a3b8' }}>Atención global con facturación local y modalidad white-label.</p>
                  </div>
              </div>

          </motion.div>

          {/* COLUMNA DERECHA: Formulario */}
          <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ 
                  flex: '1.4', 
                  backgroundColor: 'rgba(0, 12, 45, 0.6)', 
                  backdropFilter: 'blur(16px)',
                  padding: isMobile ? '30px' : '50px', 
                  borderRadius: '24px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
              }}
          >
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Fila 1: Nombre y Correo */}
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Nombre Completo</label>
                          <input type="text" placeholder="Ej. Carlos Mendoza" style={inputStyle} />
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Correo Corporativo</label>
                          <input type="email" placeholder="carlos@empresa.com" style={inputStyle} />
                      </div>
                  </div>

                  {/* Fila 2: Celular y País */}
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Número de Celular</label>
                          <input type="tel" placeholder="+51 999 999 999" style={inputStyle} />
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>País</label>
                          <input type="text" placeholder="Ej. Perú" style={inputStyle} />
                      </div>
                  </div>

                  {/* Fila 3: Empresa y Cargo */}
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Empresa</label>
                          <input type="text" placeholder="Nombre de tu organización" style={inputStyle} />
                      </div>
                      <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Cargo que ocupas</label>
                          <input type="text" placeholder="Ej. CTO, Gerente TI" style={inputStyle} />
                      </div>
                  </div>

                  {/* Fila 4: Servicio de Interés */}
                  <div>
                      <label style={labelStyle}>Servicio de Interés</label>
                      {/* 4. Conectamos el select al estado */}
                      <select 
                        value={selectedService} 
                        onChange={(e) => setSelectedService(e.target.value)}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                          <option value="" style={{ color: '#000' }}>Selecciona un área de interés...</option>
                          <option value="multiplataforma" style={{ color: '#000' }}>Desarrollo de Soluciones Multiplataforma</option>
                          <option value="cloud-modernizacion" style={{ color: '#000' }}>Ecosistemas Cloud & Modernización</option>
                          <option value="ux-ui" style={{ color: '#000' }}>Diseño de Experiencia (UX/UI)</option>
                          <option value="consultoria-ti" style={{ color: '#000' }}>Consultoría de Arquitectura TI</option>
                          <option value="arquitectura-multi-cloud" style={{ color: '#000' }}>Arquitectura Multi-Cloud & Serverless</option>
                          <option value="ciberseguridad" style={{ color: '#000' }}>Ciberseguridad & Conectividad</option>
                          <option value="devops-terraform" style={{ color: '#000' }}>Cultura DevOps & Terraform</option>
                          <option value="finops" style={{ color: '#000' }}>FinOps & Optimización de Recursos</option>
                      </select>
                  </div>

                  {/* Fila 5: Mensaje */}
                  <div>
                      <label style={labelStyle}>Cuéntanos sobre tu proyecto</label>
                      <textarea 
                          rows={4} 
                          placeholder="¿Cuáles son los desafíos tecnológicos actuales de tu empresa?" 
                          style={{ ...inputStyle, resize: 'vertical' }}
                      />
                  </div>

                  {/* Botón Enviar */}
                  <button 
                      type="button"
                      style={{ 
                          marginTop: '10px',
                          backgroundColor: '#00C2FF', 
                          color: '#000c2d', 
                          fontSize: '1.1rem', 
                          fontWeight: 800, 
                          padding: '16px', 
                          border: 'none', 
                          borderRadius: '8px', 
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '10px'
                      }}
                      onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#FAA918';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#00C2FF';
                          e.currentTarget.style.transform = 'translateY(0)';
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
    </div>
  );
};