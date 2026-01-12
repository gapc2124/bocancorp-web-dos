import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
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
  
  // Radio de la órbita (elipse)
  const radiusX = 4.0; 
  const radiusZ = 3.0; 
  
  const count = data.length;
  const angleStep = -(Math.PI * 2) / count; 

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const targetRotation = -activeIndex * angleStep;
    easing.dampE(groupRef.current.rotation, [0, targetRotation, 0], 0.3, delta);
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
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
            onClick={() => setActiveIndex(index)}
          />
        );
      })}
    </group>
  );
};

const Planet = ({ position, rotation, color, isActive, onClick }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [hovered, setHover] = useState(false);

  useFrame((_state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // Rotación sobre su eje
    const spinSpeed = isActive ? 1.0 : 0.2;
    meshRef.current.rotation.y += delta * spinSpeed;

    // ESCALA REDUCIDA (Para que se vean más chicas y elegantes)
    // Activo: 1.8 | Inactivo: 0.8
    const targetScale = isActive ? 1.8 : hovered ? 1.0 : 0.8;
    easing.damp3(meshRef.current.scale, [targetScale, targetScale, targetScale], 0.2, delta);

    // Posición Y
    const targetY = isActive ? 0.3 : 0;
    easing.damp(meshRef.current.position, 'y', position[1] + targetY, 0.2, delta);

    // COLOR E ILUMINACIÓN (Corrección "No Negras")
    // Emisivo más fuerte para que brille con su propio color
    const targetEmissive = isActive 
      ? new THREE.Color(color).multiplyScalar(2) // Muy brillante si activo
      : new THREE.Color(color).multiplyScalar(0.4); // Brillo suave si inactivo (NO NEGRO)
      
    easing.dampC(materialRef.current.emissive, targetEmissive, 0.15, delta);
    
    // Distorsión suave
    const targetDistort = isActive ? 0.3 : 0.0;
    easing.damp(materialRef.current, 'distort', targetDistort, 0.2, delta);
  });

  return (
    <Sphere
      ref={meshRef}
      // RADIO BASE MÁS PEQUEÑO: 0.7 en lugar de 1
      args={[0.7, 64, 64]} 
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Material Ajustado: 
         - metalness bajo (0.1) para evitar que se vea negro/espejo.
         - roughness medio (0.4) para difuminar la luz.
      */}
      <MeshDistortMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        toneMapped={false} // Hace que los colores sean más neón/intensos
        roughness={0.4}
        metalness={0.1} 
        distort={0}
        speed={2}
      />
    </Sphere>
  );
};