import { useRef, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// --- SHADERS (VERSIÓN SUTIL) ---
const vertexShader = `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uHover;
  attribute vec3 aPosition;
  varying vec3 vColor;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec3 pos = aPosition;
    
    // --- 1. ONDEO NATURAL SUTIL ---
    // Reduje las amplitudes (0.25, 0.08, 0.08) a casi la mitad.
    float mainWave = sin(pos.y * 0.15 + uTime * 0.4) * 0.25; 
    float detailWave = cos(pos.y * 0.4 + uTime * 0.6) * 0.08;
    
    pos.x += mainWave + detailWave;
    // Movimiento vertical apenas perceptible
    pos.y += sin(pos.x * 0.2 + uTime * 0.3) * 0.08; 

    // --- 2. INTERACCIÓN MAGNÉTICA SUTIL ---
    float dist2D = distance(pos.xy, uMouse.xy);
    float radius = 6.0; 
    
    // Fuerza de atracción reducida (de 2.5 a 1.8)
    float strength = 1.8 * uHover;
    
    float influence = (1.0 - smoothstep(0.0, radius, dist2D)) * strength;
    
    vec3 toMouse = uMouse - pos;
    vec3 direction = normalize(toMouse);
    
    // Aplicamos la atracción con menos intensidad (0.5 en vez de 0.8)
    pos += direction * influence * 0.5;
    
    // Elevación en Z también más suave (0.3 en vez de 0.5)
    pos.z += influence * 0.3;

    // --- COLOR Y ACABADO ---
    float colorVariation = random(aPosition.xy);
    vColor = mix(vec3(0.1, 0.2, 0.9), vec3(0.1, 0.6, 1.0), colorVariation);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // El cambio de tamaño al acercarse también es más sutil (0.05)
    gl_PointSize = (70.0 / -mvPosition.z) * (1.0 + influence * 0.05);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = max(abs(coord.x), abs(coord.y));
    if (dist > 0.5) discard;
    
    // Bordes un poco más suaves para aumentar la sutileza
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * 0.8); // Un poco más de transparencia general
  }
`;

const ParticlesMaterial = shaderMaterial(
  { uTime: 0, uMouse: new THREE.Vector3(0, 0, 0), uHover: 0 },
  vertexShader,
  fragmentShader
);

extend({ ParticlesMaterial });

interface InteractiveParticlesProps {
  isHovering: boolean;
}

export const InteractiveParticles = ({ isHovering }: InteractiveParticlesProps) => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);
  const { viewport, pointer } = useThree();

  // Mantenemos la cantidad de 1400 que te gustó
  const count = 1400; 

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;     
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2; 
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      const mouseX = (pointer.x * viewport.width) / 2;
      const mouseY = (pointer.y * viewport.height) / 2;
      
      materialRef.current.uniforms.uMouse.value.lerp(new THREE.Vector3(mouseX, mouseY, 0), 0.12);
      
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        isHovering ? 1.0 : 0.0,
        0.1
      );
    }
    
    if(meshRef.current) {
       meshRef.current.rotation.z += 0.00005;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        {/* @ts-ignore */}
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        {/* @ts-ignore */}
        <bufferAttribute attach="attributes-aPosition" args={[positions, 3]} />
      </bufferGeometry>
      
      {/* @ts-ignore */}
      <particlesMaterial 
        ref={materialRef} 
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};