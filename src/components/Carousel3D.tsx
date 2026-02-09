import { useRef, useMemo } from 'react';
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
  
  // Variamos la forma de la gema según el índice
  const gemDetail = useMemo(() => (index % 2 === 0 ? 0 : 1), [index]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    let offset = (index - activeIndex);
    if (offset > totalCount / 2) offset -= totalCount;
    if (offset < -totalCount / 2) offset += totalCount;

    const absOffset = Math.abs(offset);
    const zDepth = isMobile ? 12.0 : 18.0;
    const targetZ = isActive ? 0 : -Math.pow(absOffset, 1.2) * zDepth; 
    const xSpread = isMobile ? 6.5 : 11.0;
    const targetX = offset * xSpread;

    const activeScale = isMobile ? 1.5 : 2.0;
    const inactiveScale = 0.4;
    const scaleFactor = Math.max(0, 1 - absOffset * 0.4); 
    const targetScale = scaleFactor * activeScale + (1 - scaleFactor) * inactiveScale;

    easing.damp3(groupRef.current.position, [targetX, 0, targetZ], 0.3, delta);
    easing.damp3(groupRef.current.scale, [targetScale, targetScale, targetScale], 0.3, delta);
    
    if (!isActive) {
        groupRef.current.rotation.y += delta * 0.4;
    } else {
        easing.dampE(groupRef.current.rotation, [0, 0, 0], 0.3, delta);
    }
  });

  return (
    <PresentationControls
      enabled={isActive}
      global={false}
      snap={true}
      speed={2} 
      zoom={1}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
    >
      <group ref={groupRef}>
        <Float speed={isActive ? 3 : 0} rotationIntensity={0.6} floatIntensity={0.5}>
            <mesh>
              <icosahedronGeometry args={[1, gemDetail]} />
              <meshStandardMaterial 
                color={isActive ? color : '#111'} 
                flatShading={true}
                roughness={0.05} 
                metalness={1} 
                emissive={isActive ? color : '#000'}
                emissiveIntensity={isActive ? 0.8 : 0}
              />
            </mesh>

            <mesh rotation={[Math.PI / 1.5, 0, 0]}>
                <torusGeometry args={[1.6, 0.02, 16, 100]} />
                <meshBasicMaterial color={isActive ? color : '#333'} transparent opacity={0.3} />
            </mesh>

            {isActive && <pointLight intensity={8} distance={12} color={color} />}
        </Float>
      </group>
    </PresentationControls>
  );
};