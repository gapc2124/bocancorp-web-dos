import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Caja() {
  return (
    <mesh rotation={[0, 0, 0]}>
      {/* Geometría: Un cubo de 2x2x2 */}
      <boxGeometry args={[2, 2, 2]} />
      {/* Material: Color morado que reacciona a la luz */}
      <meshStandardMaterial color="red" />
    </mesh>
  )
}

function App() {
  return (
    // Contenedor que ocupa toda la pantalla del navegador
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        {/* Luces para que la escena no se vea negra */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        
        {/* Nuestro componente 3D */}
        <Caja />
        
        {/* Controles para rotar la cámara con el mouse */}
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App