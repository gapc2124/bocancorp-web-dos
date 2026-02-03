import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// --- SHADERS (SIN CAMBIOS) ---
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
    
    // 1. ONDEO NATURAL
    float mainWave = sin(pos.y * 0.15 + uTime * 0.4) * 0.25; 
    float detailWave = cos(pos.y * 0.4 + uTime * 0.6) * 0.08;
    
    pos.x += mainWave + detailWave;
    pos.y += sin(pos.x * 0.2 + uTime * 0.3) * 0.08; 

    // 2. INTERACCIÓN MAGNÉTICA
    float dist2D = distance(pos.xy, uMouse.xy);
    float radius = 6.0; 
    
    float strength = 1.8 * uHover;
    float influence = (1.0 - smoothstep(0.0, radius, dist2D)) * strength;
    
    vec3 toMouse = uMouse - pos;
    vec3 direction = normalize(toMouse);
    
    pos += direction * influence * 0.5;
    pos.z += influence * 0.3;

    // COLOR
    float colorVariation = random(aPosition.xy);
    vColor = mix(vec3(0.1, 0.2, 0.9), vec3(0.1, 0.6, 1.0), colorVariation);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    gl_PointSize = (70.0 / -mvPosition.z) * (1.0 + influence * 0.05);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = max(abs(coord.x), abs(coord.y));
    if (dist > 0.5) discard;
    
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * 0.8); 
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

  // --- OBJETOS REUTILIZABLES PARA EVITAR BASURA EN MEMORIA ---
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const targetMouse = useMemo(() => new THREE.Vector3(), []); 
  const localMouse = useMemo(() => new THREE.Vector3(), []); // Vector auxiliar para coordenadas locales

  useFrame((state) => {
    // 1. ROTACIÓN PRIMERO (Importante para que worldToLocal use la matriz actualizada)
    if(meshRef.current) {
       meshRef.current.rotation.z += 0.00005;
       // Actualizamos la matriz del objeto manualmente para asegurar precisión antes del cálculo
       meshRef.current.updateMatrixWorld();
    }

    if (materialRef.current && meshRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // 2. RAYCASTER (Obtiene la posición exacta en el MUNDO 3D)
      raycaster.setFromCamera(state.pointer, state.camera);
      raycaster.ray.intersectPlane(plane, targetMouse);
      
      // 3. CORRECCIÓN DE BUG: MUNDO -> LOCAL
      // Copiamos la posición del mundo al vector local
      localMouse.copy(targetMouse);
      // Transformamos esa coordenada para que coincida con la rotación de la malla
      meshRef.current.worldToLocal(localMouse);
      
      // 4. Pasar coordenada LOCAL al shader
      // Usamos lerp para que el movimiento sea suave, pero sobre la coordenada corregida
      materialRef.current.uniforms.uMouse.value.lerp(localMouse, 0.12);
      
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        isHovering ? 1.0 : 0.0,
        0.1
      );
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