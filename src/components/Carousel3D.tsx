import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  MeshDistortMaterial, 
  PresentationControls,
  Sphere,
  Torus,
  TorusKnot,
  Icosahedron,
  Octahedron,
  Dodecahedron
} from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

interface Carousel3DProps {
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
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const isActive = index === activeIndex;

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    let offset = (index - activeIndex);
    if (offset > totalCount / 2) offset -= totalCount;
    if (offset < -totalCount / 2) offset += totalCount;

    const absOffset = Math.abs(offset);

    const zDepth = isMobile ? 10.0 : 18.0;
    const targetZ = isActive ? 0 : -Math.pow(absOffset, 1.2) * zDepth; 
    
    const xSpread = isMobile ? 5.0 : 9.0;
    const targetX = offset * xSpread;

    const activeScale = isMobile ? 1.6 : 2.5;
    const inactiveScale = 0.3;
    const scaleFactor = Math.max(0, 1 - absOffset * 0.4); 
    const targetScale = scaleFactor * activeScale + (1 - scaleFactor) * inactiveScale;

    easing.damp3(meshRef.current.position, [targetX, 0, targetZ], 0.3, delta);
    easing.damp3(meshRef.current.scale, [targetScale, targetScale, targetScale], 0.3, delta);

    if (materialRef.current) {
      const targetOpacity = Math.max(0, 1 - absOffset * 0.3);
      easing.damp(materialRef.current, 'opacity', targetOpacity, 0.2, delta);
      
      const targetColor = isActive ? color : '#1a1a1a'; 
      easing.dampC(materialRef.current.color, targetColor, 0.2, delta);
      easing.dampC(materialRef.current.emissive, isActive ? color : '#000000', 0.2, delta);
    }
    
    if (!isActive) {
        meshRef.current.rotation.y += delta * 0.1;
        meshRef.current.rotation.x += delta * 0.05;
    }
  });

  const geometryProps = { args: [1, 0.4, 100, 16] as any };
  
  const MaterialComponent = (
    <MeshDistortMaterial
      ref={materialRef}
      color={color}
      emissive={color}
      emissiveIntensity={0.5}
      transparent={true}
      depthWrite={false}
      roughness={0.2}
      metalness={0.8}
      distort={0.3}
      speed={2}
    />
  );

  const shapeProps = {
    ref: meshRef,
    ...geometryProps,
    renderOrder: isActive ? 10 : 0, 
  };

  const getShape = () => {
    switch (index % 6) {
        case 0: return <TorusKnot {...shapeProps} args={[0.6, 0.2, 100, 16]}>{MaterialComponent}</TorusKnot>;
        case 1: return <Octahedron {...shapeProps} args={[1]}>{MaterialComponent}</Octahedron>;
        case 2: return <Sphere {...shapeProps} args={[1, 64, 64]}>{MaterialComponent}</Sphere>;
        case 3: return <Icosahedron {...shapeProps} args={[1]}>{MaterialComponent}</Icosahedron>;
        case 4: return <Dodecahedron {...shapeProps} args={[1]}>{MaterialComponent}</Dodecahedron>;
        case 5: return <Torus {...shapeProps} args={[0.7, 0.2, 16, 100]}>{MaterialComponent}</Torus>;
        default: return <Sphere {...shapeProps}>{MaterialComponent}</Sphere>;
    }
  };

  return (
    <PresentationControls
      enabled={isActive}
      global={false}
      cursor={isActive}
      snap={false}
      // CAMBIO: Aumentado de 1.5 a 3.0 para más velocidad y sensibilidad
      speed={3} 
      zoom={1}
      rotation={[0, 0, 0]}
      polar={[-Math.PI, Math.PI]}
      azimuth={[-Infinity, Infinity]}
    >
      {getShape()}
    </PresentationControls>
  );
};