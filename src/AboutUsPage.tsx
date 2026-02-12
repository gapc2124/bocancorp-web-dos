import { motion } from 'framer-motion';
import { Auroras } from './components/Auroras';
import { Canvas } from '@react-three/fiber';

const resolvePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

export const AboutUsPage = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#000c2d', position: 'relative' }}>
      
      {/* --- FONDO GLOBAL (Auroras + Fog) --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
             <color attach="background" args={['#00020a']} />
             <fog attach="fog" args={['#00020a', 2, 12]} />
             <Auroras /> 
        </Canvas>
      </div>

      {/* --- SECCIÓN 1: VIDEO HERO (LIMPIO) --- */}
      <section style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden', 
        zIndex: 1
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            filter: 'brightness(0.6)' 
          }}
        >
          <source src={resolvePath('assets/video.mp4')} type="video/mp4" />
        </video>

        {/* Gradiente para fundir con el texto de abajo */}
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          width: '100%', 
          height: '20%', 
          background: 'linear-gradient(to top, #000c2d, transparent)', 
          zIndex: 2 
        }} />
      </section>

      {/* --- SECCIÓN 1.5: TEXTO INTRODUCTORIO (DEBAJO DEL VIDEO) --- */}
      <section style={{ 
        position: 'relative', 
        zIndex: 1, 
        padding: isMobile ? '60px 20px' : '100px 20px', 
        textAlign: 'center',
        background: 'transparent'
      }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
              <h2 style={{ 
                color: 'white', 
                fontSize: isMobile ? '2.5rem' : '4.5rem', 
                fontWeight: 900, 
                margin: 0, 
                textTransform: 'uppercase',
                letterSpacing: '-2px'
              }}>
                Innovación sin <span style={{ color: '#FAA918' }}>Límites</span>
              </h2>
              <p style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: isMobile ? '1.1rem' : '1.6rem', 
                marginTop: '20px', 
                maxWidth: '900px',
                marginRight: 'auto',
                marginLeft: 'auto',
                lineHeight: 1.4,
                fontWeight: 400
              }}>
                Arquitectura Cloud y Desarrollo Elite para empresas que miran hacia el futuro.
              </p>
          </motion.div>
      </section>

      {/* --- SECCIÓN 2: NUESTRA ESENCIA --- */}
      <section style={{ position: 'relative', zIndex: 1, padding: isMobile ? '40px 20px' : '80px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '20px', fontWeight: 800 }}>Nuestra <span style={{ color: '#00C2FF' }}>Esencia</span></h2>
                <p style={{ color: '#b0b8d1', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    Bocancorp nace de la pasión por la ingeniería de software de alto nivel. Como <b>AWS Select Partners</b>, no solo implementamos tecnología; diseñamos ecosistemas digitales que permiten a las empresas escalar sin límites.
                </p>
                <p style={{ color: '#b0b8d1', fontSize: '1.1rem', lineHeight: 1.8, marginTop: '20px' }}>
                    Nuestro enfoque combina la agilidad de las arquitecturas <b>Cloud-Native</b> con la rigurosidad de la ciberseguridad avanzada. Creemos en un mundo donde la nube es el motor de la innovación humana.
                </p>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
                style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Equipo Bocancorp" 
                    style={{ width: '100%', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000c2d, transparent)' }} />
            </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN 3: VALORES --- */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 20px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'white', marginBottom: '60px', fontWeight: 800 }}>Lo que nos <span style={{ color: '#FAA918' }}>Impulsa</span></h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '25px' }}>
                {[
                    { title: "Innovación Real", desc: "No seguimos tendencias, creamos soluciones que definen estándares industriales.", icon: "🚀", color: "#FAA918" },
                    { title: "Calidad Elite", desc: "Ingeniería de software robusta, probada y diseñada para el alto rendimiento.", icon: "💎", color: "#00C2FF" },
                    { title: "Partnership AWS", desc: "Certificaciones que avalan nuestra capacidad de gestionar infraestructuras críticas.", icon: "☁️", color: "#FF9900" }
                ].map((val, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        style={{ 
                          padding: '40px', 
                          background: 'rgba(255,255,255,0.02)', 
                          borderRadius: '24px', 
                          border: `1px solid ${val.color}20`, 
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{val.icon}</div>
                        <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '15px', fontWeight: 700 }}>{val.title}</h3>
                        <p style={{ color: '#aaa', lineHeight: 1.6 }}>{val.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      <div style={{ height: '10vh' }} />
    </div>
  );
};