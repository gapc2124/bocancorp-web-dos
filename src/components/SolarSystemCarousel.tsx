import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

interface SolarSystemProps {
  data: { color: string; img: string }[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  screenType: 'mobile' | 'tablet' | 'laptop' | 'desktop';
  logoPath: string;
}

// SOLO ACTUALIZA ESTA PARTE DEL INICIO:
export const SolarSystemCarousel = ({ data, activeIndex, setActiveIndex, screenType, logoPath }: SolarSystemProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // --- AJUSTE DE RADIO CIRCULAR ---
  // Para que sea círculo perfecto: X y Z deben ser iguales.
  // Ajusté los tamaños para el nuevo layout centrado.
  const { radius } = useMemo(() => {
    switch (screenType) {
      case 'mobile':  return { radius: 2.2 }; 
      case 'tablet':  return { radius: 3.0 }; 
      case 'laptop':  return { radius: 3.8 }; // Un poco más compacto para que no choque arriba
      case 'desktop': return { radius: 4.2 }; 
      default:        return { radius: 4.0 };
    }
  }, [screenType]);

  const count = data.length;
  const angleStep = -(Math.PI * 2) / count; 

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const targetRotation = -activeIndex * angleStep;
    easing.dampE(groupRef.current.rotation, [0, targetRotation, 0], 0.3, delta);
  });

  return (
    <group ref={groupRef}>
      <SunCentral logoPath={logoPath} />
      {data.map((item, index) => {
        const theta = index * angleStep; 
        
        // Usamos el MISMO radio -> Círculo Perfecto
        const x = Math.sin(theta) * radius;
        const z = Math.cos(theta) * radius;

        return (
          <Planet 
            key={index}
            // ... resto de props (color, img, position...) igual que antes
            color={item.color}
            img={item.img}
            position={[x, 0, z]}
            rotation={[0, theta, 0]}
            isActive={index === activeIndex}
            screenType={screenType}
            onClick={() => setActiveIndex(index)}
          />
        );
      })}
    </group>
  );
};

const SunCentral = ({ logoPath }: { logoPath: string }) => {
  const logoTexture = useTexture(logoPath) as THREE.Texture;

  return (
    // --- CAMBIO 2: SOL MÁS PEQUEÑO ☀️ ---
    // Bajamos de 1.2 a 0.6
    <Sphere args={[0.6, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        map={logoTexture}
        emissive="#ffffff"
        emissiveIntensity={0.8}
        emissiveMap={logoTexture}
        color="#ffffff"
        roughness={0.2}
      />
      {/* Luz ajustada al nuevo tamaño */}
      <pointLight distance={8} intensity={2} color="#faa918" />
    </Sphere>
  );
};

const Planet = ({ position, rotation, color, img, isActive, screenType, onClick }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [hovered, setHover] = useState(false);

  // --- CAMBIO 3: TEXTURA LIMPIA 🖼️ ---
  // Quitamos toda la lógica de repetición (RepeatWrapping).
  // Al dejarlo por defecto, la imagen intenta cubrir la esfera una sola vez.
  const texture = useTexture(img) as THREE.Texture;

  useFrame((_state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    // Rotación lenta para apreciar la imagen
    const spinSpeed = isActive ? 0.2 : 0.05;
    meshRef.current.rotation.y += delta * spinSpeed;

    // Escala
    let baseSize = 0.7;
    if (screenType === 'tablet') baseSize = 0.9;
    if (screenType === 'laptop') baseSize = 1.0;
    if (screenType === 'desktop') baseSize = 1.2;

    const targetScale = isActive ? 1.8 : hovered ? 1.1 : 0.8;
    const finalScale = targetScale * baseSize;

    easing.damp3(meshRef.current.scale, [finalScale, finalScale, finalScale], 0.2, delta);

    // Posición
    const targetY = isActive ? 0.3 : 0;
    easing.damp(meshRef.current.position, 'y', position[1] + targetY, 0.2, delta);

    // Material
    // Bajamos la intensidad emisiva para que la imagen no se "queme" (se vea blanca)
    const targetEmissiveIntensity = isActive ? 1.0 : 0.2;
    easing.damp(materialRef.current, 'emissiveIntensity', targetEmissiveIntensity, 0.2, delta);
    
    // REDUCIMOS LA DISTORSIÓN: 
    // Si la distorsión es alta, la imagen se estira y deforma. 
    // La bajamos a 0.1 cuando está activo para que se vea la foto clara.
    const targetDistort = isActive ? 0.1 : 0.0;
    easing.damp(materialRef.current, 'distort', targetDistort, 0.2, delta);
  });

  return (
    <Sphere
      ref={meshRef}
      args={[0.6, 64, 64]}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <MeshDistortMaterial
        ref={materialRef}
        map={texture} 
        color={isActive ? '#ffffff' : color}
        emissive={color}
        toneMapped={false}
        // Roughness bajo para nitidez, pero no espejo perfecto
        roughness={0.4} 
        metalness={0.1}
        speed={1.5}
      />
    </Sphere>
  );
};