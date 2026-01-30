import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Auroras = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // 1. Generar las partículas iniciales (solo una vez)
  const particlesCount = 5000; // Cantidad de destellos (ajusta si te va lento)
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      // Distribuimos los puntos en un área grande en el suelo
      pos[i * 3 + 0] = (Math.random() - 0.5) * 60; // X: Ancho
      pos[i * 3 + 1] = 0;                          // Y: Altura base (se animará)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60; // Z: Profundidad
    }
    return pos;
  }, []);

  // 2. Animar las partículas en cada frame
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    const time = clock.getElapsedTime() * 0.4; // Velocidad del flujo
    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const x = positionsArray[i3 + 0];
      const z = positionsArray[i3 + 2];

      // FÓRMULA DE ONDA DISTORSIONADA
      // Combinamos senos y cosenos con diferentes frecuencias para que no sea una onda perfecta
      const wave1 = Math.sin(x * 0.2 + time) * 1.5;
      const wave2 = Math.cos(z * 0.3 + time * 1.2) * 1.5;
      // Un poco de "ruido" basado en la posición para distorsionar
      const noise = Math.sin(x * z * 0.05 + time) * 0.5;

      // Aplicamos la nueva altura (Y)
      positionsArray[i3 + 1] = wave1 + wave2 + noise - 2; // El -2 es para bajar el conjunto
    }
    
    // Avisamos a Three.js que las posiciones cambiaron
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]} // Importante para TypeScript en React Three Fiber
        />
      </bufferGeometry>
      {/* MATERIAL DE DESTELLOS FINOS */}
      <pointsMaterial
        size={0.15}             // Tamaño muy fino
        color="#0055AA"         // Morado intenso (BlueViolet)
        transparent={true}
        opacity={0.8}
        // AdditiveBlending hace que los puntos se "sumen" como luz, viéndose brillantes
        blending={THREE.AdditiveBlending} 
        sizeAttenuation={true}  // Se hacen pequeños a la distancia
        depthWrite={false}      // Ayuda a que se mezclen bien entre sí
      />
    </points>
  );
};