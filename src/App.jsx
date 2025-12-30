import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import GLB from './components/GLB'

function App() {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* <Model /> */}

      <GLB url="/models/Etageres.glb" />
      <GLB url="/models/Lampe.glb" />
      <GLB url="/models/Banc.glb" />
      <GLB url="/models/PlanteDeco.glb" />
      <GLB url="/models/Cadres.glb" />
      <GLB url="/models/Stairs.glb" />
      <GLB url="/models/Tree.glb" />
      <GLB url="/models/scene.glb" />

      <OrbitControls />
    </Canvas>
  )
}

export default App
