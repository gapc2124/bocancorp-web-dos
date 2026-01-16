import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

interface SolarSystemProps {
  data: { color: string }[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const SolarSystemCarousel = ({ data, activeIndex, setActiveIndex }: SolarSystemProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Hook para detectar el tamaño de la pantalla (Responsive 3D)
  const { viewport } = useThree();
  
  // Detectamos si es móvil (si el ancho del viewport es menor a 6 unidades 3D)
  const isMobile = viewport.width < 6;

  // Ajustamos el radio de la órbita según el dispositivo
  const radiusX = isMobile ? 2.2 : 4.0; // Más cerrado en móvil
  const radiusZ = isMobile ? 1.8 : 3.0; 
  
  const count = data.length;
  const angleStep = -(Math.PI * 2) / count; 

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const targetRotation = -activeIndex * angleStep;
    easing.dampE(groupRef.current.rotation, [0, targetRotation, 0], 0.3, delta);
  });

  return (
    // Subimos un poco la posición en móvil para que no choque con el footer
    <group ref={groupRef} position={[0, isMobile ? 0 : -0.5, 0]}>
      {data.map((item, index) => {
        const theta = index * angleStep; 
        const x = Math.sin(theta) * radiusX;
        const z = Math.cos(theta) * radiusZ;

        return (
          <Planet 
            key={index}
            color={item.color}
            position={[x, 0, z]}
            rotation={[0, theta, 0]}
            isActive={index === activeIndex}
            isMobile={isMobile} // Pasamos la prop para escalar la esfera
            onClick={() => setActiveIndex(index)}
          />
        );
      })}
    </group>
  );
};

// Componente Planeta Individual
const Planet = ({ position, rotation, color, isActive, isMobile, onClick }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [hovered, setHover] = useState(false);

  useFrame((_state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // Rotación sobre su eje
    const spinSpeed = isActive ? 1.0 : 0.2;
    meshRef.current.rotation.y += delta * spinSpeed;

    // LÓGICA DE ESCALA RESPONSIVA
    // Definimos un multiplicador base: 1.0 para PC, 0.7 para Móvil
    const scaleBase = isMobile ? 0.7 : 1.0;

    // Calculamos la escala final
    // Activo: 1.8 (grande) | Hover: 1.0 (normal) | Inactivo: 0.8 (pequeño)
    // Todo multiplicado por el factor móvil
    let finalScale = 0.8;
    if (isActive) finalScale = 1.8;
    else if (hovered) finalScale = 1.0;
    
    finalScale = finalScale * scaleBase;

    easing.damp3(meshRef.current.scale, [finalScale, finalScale, finalScale], 0.2, delta);

    // Posición Y (Levitar cuando está activo)
    // En móvil levitamos un poco menos
    const targetY = isActive ? (isMobile ? 0.15 : 0.3) : 0;
    easing.damp(meshRef.current.position, 'y', position[1] + targetY, 0.2, delta);

    // COLOR E ILUMINACIÓN
    const targetEmissive = isActive 
      ? new THREE.Color(color).multiplyScalar(2) // Muy brillante si activo
      : new THREE.Color(color).multiplyScalar(0.4); // Brillo suave si inactivo
      
    easing.dampC(materialRef.current.emissive, targetEmissive, 0.15, delta);
    
    // Distorsión suave
    const targetDistort = isActive ? 0.3 : 0.0;
    easing.damp(materialRef.current, 'distort', targetDistort, 0.2, delta);
  });

  return (
    <Sphere
      ref={meshRef}
      // Radio base ajustado para que se vea bien con el escalado dinámico
      args={[0.7, 64, 64]} 
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation(); // Evita clics fantasma
        onClick();
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <MeshDistortMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        toneMapped={false}
        roughness={0.4}
        metalness={0.1} 
        distort={0}
        speed={2}
      />
    </Sphere>
  );
};