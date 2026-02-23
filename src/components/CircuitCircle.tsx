import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoBocancorp from '/assets/logo.png';
// Se usa import type para cumplir con verbatimModuleSyntax
import type { Variants } from 'framer-motion';

const ACCENT_CYAN = '#00C2FF';

interface CircuitCircleProps {
  activeStep: number | null;
  stepIcons: React.ReactNode[];
  isMobile: boolean;
}

export const CircuitCircle = ({ activeStep, stepIcons, isMobile }: CircuitCircleProps) => {
  return (
    <div style={{
      width: '100%',
      height: isMobile ? '300px' : '500px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Anillo de Energía Externo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          width: isMobile ? '200px' : '350px',
          height: isMobile ? '200px' : '350px',
          border: `2px dashed ${ACCENT_CYAN}40`,
          borderRadius: '50%',
        }}
      />

      {/* Círculo Principal */}
      <motion.div
        animate={{ 
          scale: activeStep !== null ? [1, 1.05, 1] : 1,
          boxShadow: activeStep !== null 
            ? `0 0 50px ${ACCENT_CYAN}40` 
            : `0 0 20px ${ACCENT_CYAN}20`
        }}
        style={{
          width: isMobile ? '160px' : '280px',
          height: isMobile ? '160px' : '280px',
          backgroundColor: '#000c2d',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `3px solid ${ACCENT_CYAN}`,
          position: 'relative',
          zIndex: 2
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep ?? 'idle'}
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            transition={{ duration: 0.3 }}
            style={{ color: ACCENT_CYAN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {activeStep !== null ? (
              // FIX: Se añade "as any" para que TypeScript permita pasar la prop 'size' al icono dinámico
              React.cloneElement(stepIcons[activeStep] as React.ReactElement, { size: isMobile ? 80 : 120 } as any)
            ) : (
              // AQUÍ ESTÁ LA MAGIA DEL LOGO CON MÁSCARA CELESTE ✨
              <div 
                style={{ 
                  width: isMobile ? '70px' : '110px', 
                  height: isMobile ? '70px' : '110px', 
                  backgroundColor: ACCENT_CYAN,
                  WebkitMaskImage: `url(${logoBocancorp})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskImage: `url(${logoBocancorp})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                }} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Partículas de Órbita */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: isMobile ? '220px' : '400px',
            height: isMobile ? '220px' : '400px',
            borderRadius: '50%',
          }}
        >
          <div style={{
            width: '8px',
            height: '8px',
            backgroundColor: ACCENT_CYAN,
            borderRadius: '50%',
            boxShadow: `0 0 10px ${ACCENT_CYAN}`,
            position: 'absolute',
            top: '50%',
            left: '-4px'
          }} />
        </motion.div>
      ))}
    </div>
  );
};