'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.cjs';
import * as THREE from 'three'; 
import { easing } from 'maath'; 

export const CosmicSphere = () => {
  const [active, setActive] = useState(false);

  return (
    <group position={[0, 0, 0]}>
      
      {/* HITBOX INVISIBLE */}
      <mesh 
        onPointerDown={(e) => {
          e.stopPropagation();
          setActive(true);
        }}
        onPointerUp={() => setActive(false)}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => {
          setActive(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* El prop 'size' ahora define el TAMAÑO MÁXIMO al hacer click */}
      <ParticleCloud active={active} color="#00C2FF" size={0.08} radius={1.8} count={800} baseSpeed={0.2} />
      <ParticleCloud active={active} color="#FAA918" size={0.12} radius={2.5} count={400} baseSpeed={0.1} />
      
    </group>
  );
};

interface ParticleCloudProps {
  color: string;
  size: number;
  radius: number;
  count: number;
  baseSpeed: number;
  active: boolean; 
}

const ParticleCloud = ({ color, size, radius, count, baseSpeed, active }: ParticleCloudProps) => {
  const groupRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null); // Nueva referencia para las bolitas
  
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(count * 3), { radius: radius }) as Float32Array
  );

  useFrame((state, delta) => {
    // 1. Animamos la rotación y la escala global de la nube
    if (groupRef.current) {
      const currentSpeed = active ? baseSpeed * 4 : baseSpeed;
      groupRef.current.rotation.x -= delta * currentSpeed * 0.5;
      groupRef.current.rotation.y -= delta * currentSpeed;
      
      const targetScale = active 
        ? 2.2 
        : 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

      easing.damp3(groupRef.current.scale, [targetScale, targetScale, targetScale], 0.25, delta);
    }

    // 2. Animamos el tamaño individual de cada bolita
    if (materialRef.current) {
      // Si está inactivo, las bolitas son un 40% del tamaño máximo. Al hacer click, crecen al 100%.
      const targetPointSize = active ? size : size * 0.4;
      easing.damp(materialRef.current, 'size', targetPointSize, 0.25, delta);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={groupRef} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={materialRef}
          transparent
          color={color}
          size={size * 0.4} /* Inicializamos con el tamaño pequeño */
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} 
        />
      </Points>
    </group>
  );
};