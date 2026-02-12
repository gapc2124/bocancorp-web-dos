import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.cjs';
import * as THREE from 'three'; 
import { easing } from 'maath'; 

export const CosmicSphere = () => {
  const [active, setActive] = useState(false);

  return (
    <group 
      position={[0, 0, 0]}
      onPointerDown={() => setActive(true)}
      onPointerUp={() => setActive(false)}
      onPointerLeave={() => setActive(false)} 
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <ParticleCloud active={active} color="#00d8ff" size={0.03} radius={1.8} count={3000} baseSpeed={0.2} />
      <ParticleCloud active={active} color="#bd00ff" size={0.02} radius={2.5} count={1500} baseSpeed={0.1} />
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
  // CORRECCIÓN AQUÍ: Agregamos (null)
  const ref = useRef<THREE.Points>(null);
  
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(count * 3), { radius: radius }) as Float32Array
  );

  useFrame((state, delta) => {
    if (ref.current) {
      const currentSpeed = active ? baseSpeed * 4 : baseSpeed;
      ref.current.rotation.x -= delta * currentSpeed * 0.5;
      ref.current.rotation.y -= delta * currentSpeed;
      
      const targetScale = active 
        ? 2.2 
        : 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

      easing.damp3(ref.current.scale, [targetScale, targetScale, targetScale], 0.25, delta);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} 
        />
      </Points>
    </group>
  );
};