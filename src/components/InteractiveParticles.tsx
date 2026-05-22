'use client';
import { useRef, useMemo } from 'react';
// @ts-ignore
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// --- SHADER CON PROPORCIÓN DE COLOR REDUCIDA Y MENOS Z ---
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
    
    // 1. MOVIMIENTO BASE
    float floatY = sin(pos.x * 0.5 + uTime * 0.2) * 0.1;
    float floatX = cos(pos.y * 0.5 + uTime * 0.2) * 0.1;
    pos.x += floatX;
    pos.y += floatY;

    // 2. INFLUENCIA DEL MOUSE
    float dist2D = distance(pos.xy, uMouse.xy);
    float radius = 6.0; 
    float influence = smoothstep(radius, 0.0, dist2D) * uHover;
    
    // 3. ANTIGRAVEDAD SUAVE
    vec3 fromMouse = pos - uMouse;
    fromMouse.z = 0.0; 
    vec3 direction = normalize(fromMouse);
    pos += direction * influence * 1.5; 
    
    // 4. ONDA EXPANSIVA (Ripple Z reducido)
    float wave = sin(dist2D * 3.0 - uTime * 4.0);
    // AJUSTE Z: Reducido de 0.4 a 0.2 para que el 3D sea más sutil
    pos.z += wave * influence * 0.2; 

    // --- 5. COLOR (PROPORCIÓN REDUCIDA) ---
    float rnd = random(aPosition.xy);
    
    // Color base vibrante (Azul Eléctrico / Celeste)
    vec3 baseColor = mix(vec3(0.1, 0.4, 1.0), vec3(0.0, 0.8, 1.0), rnd);

    // Paleta objetivo
    vec3 targetColor;
    if (rnd < 0.25) targetColor = vec3(0.0, 1.0, 1.0); // Cyan
    else if (rnd < 0.5) targetColor = vec3(1.0, 0.0, 1.0); // Magenta
    else if (rnd < 0.75) targetColor = vec3(0.6, 0.0, 1.0); // Morado
    else targetColor = vec3(1.0, 1.0, 1.0); // Blanco

    // NUEVA LÓGICA: Proporción reducida.
    // step(0.7, rnd) devuelve 1.0 solo si rnd es mayor a 0.7.
    // Esto significa que solo el ~30% superior de las partículas "ganan" el cambio de color.
    float colorChance = step(0.7, rnd);

    // Solo aplicamos la mezcla de color si 'colorChance' es 1.0
    vColor = mix(baseColor, targetColor, influence * colorChance);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    gl_PointSize = (60.0 / -mvPosition.z) * (1.0 + influence * 0.5);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * 0.9); 
  }
`;

const MyParticlesMaterial = shaderMaterial(
  { uTime: 0, uMouse: new THREE.Vector3(0, 0, 0), uHover: 0 },
  vertexShader,
  fragmentShader
);

extend({ MyParticlesMaterial });

export const InteractiveParticles = ({ isHovering }: { isHovering: boolean }) => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);

  // AJUSTE CANTIDAD: Aumentado ligeramente de 1800 a 2200
  const count = 2200; 

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;     
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      // AJUSTE PROFUNDIDAD INICIAL: Reducido de *5 a *3.0 para menos dispersión Z
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.0; 
    }
    return pos;
  }, []);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const targetMouse = useMemo(() => new THREE.Vector3(), []); 
  const localMouse = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    meshRef.current.rotation.z += 0.0001;
    meshRef.current.updateMatrixWorld();

    materialRef.current.uTime = state.clock.getElapsedTime();
    
    raycaster.setFromCamera(state.pointer, state.camera);
    raycaster.ray.intersectPlane(plane, targetMouse);
    
    localMouse.copy(targetMouse);
    meshRef.current.worldToLocal(localMouse);
    
    materialRef.current.uMouse.lerp(localMouse, 0.1);
    
    materialRef.current.uHover = THREE.MathUtils.lerp(
      materialRef.current.uHover,
      isHovering ? 1.0 : 0.0,
      0.08 
    );
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        {/* @ts-ignore */}
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
        {/* @ts-ignore */}
        <bufferAttribute 
          attach="attributes-aPosition" 
          args={[positions, 3]} 
        />
      </bufferGeometry>
      
      {/* @ts-ignore */}
      <myParticlesMaterial 
        ref={materialRef} 
        transparent 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
};