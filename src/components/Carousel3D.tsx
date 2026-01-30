import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PresentationControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

export interface Carousel3DProps {
  data: { color: string }[];
  activeIndex: number;
  isMobile: boolean;
}

export const Carousel3D = ({ data, activeIndex, isMobile }: Carousel3DProps) => {
  return (
    <group position={[0, 0, 0]}>
      {data.map((item, index) => (
        <CarouselItem 
          key={index}
          index={index}
          activeIndex={activeIndex}
          totalCount={data.length}
          color={item.color}
          isMobile={isMobile}
        />
      ))}
    </group>
  );
};

interface CarouselItemProps {
  index: number;
  activeIndex: number;
  totalCount: number;
  color: string;
  isMobile: boolean;
}

const CarouselItem = ({ index, activeIndex, totalCount, color, isMobile }: CarouselItemProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const isActive = index === activeIndex;

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    // --- CÁLCULO DE POSICIÓN ---
    let offset = (index - activeIndex);
    if (offset > totalCount / 2) offset -= totalCount;
    if (offset < -totalCount / 2) offset += totalCount;

    const absOffset = Math.abs(offset);
    const zDepth = isMobile ? 10.0 : 18.0;
    const targetZ = isActive ? 0 : -Math.pow(absOffset, 1.2) * zDepth; 
    const xSpread = isMobile ? 5.0 : 9.0;
    const targetX = offset * xSpread;

    const activeScale = isMobile ? 1.6 : 2.0;
    const inactiveScale = 0.5;
    const scaleFactor = Math.max(0, 1 - absOffset * 0.4); 
    const targetScale = scaleFactor * activeScale + (1 - scaleFactor) * inactiveScale;

    easing.damp3(groupRef.current.position, [targetX, 0, targetZ], 0.3, delta);
    easing.damp3(groupRef.current.scale, [targetScale, targetScale, targetScale], 0.3, delta);
    
    // Rotación
    if (!isActive) {
        groupRef.current.rotation.y += delta * 0.5;
    } else {
        easing.damp(groupRef.current.rotation, 'y', 0, 0.3, delta);
        easing.damp(groupRef.current.rotation, 'x', 0, 0.3, delta);
    }
  });

  return (
    <PresentationControls
      enabled={isActive}
      global={false}
      cursor={isActive}
      snap={true}
      speed={3} 
      zoom={1}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Infinity, Infinity]}
    >
      <group ref={groupRef}>
        <Float speed={isActive ? 2 : 0} rotationIntensity={isActive ? 0.5 : 0} floatIntensity={isActive ? 0.5 : 0}>
            {/* FIGURA GEOMÉTRICA DE PRUEBA */}
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial 
                color={isActive ? color : '#333'} 
                roughness={0.3} 
                metalness={0.8} 
                emissive={isActive ? color : '#000'}
                emissiveIntensity={0.2}
              />
            </mesh>
            {/* Aro decorativo */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.4, 0.05, 16, 100]} />
                <meshBasicMaterial color={isActive ? color : '#555'} transparent opacity={0.5} />
            </mesh>
        </Float>
      </group>
    </PresentationControls>
  );
};