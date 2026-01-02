import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { KeyboardMovement } from './KeyboardMovement'
import { PointerLockControls } from '@react-three/drei'
import GLB from './components/GLB'
import { flowerData } from './flowerDetails' // Import the new file
import { FlowerInfo } from './components/FlowerInfo'
import { FlowerGroup } from './components/FlowerGroup'
import { useRef } from 'react'

export default function App() {
  const [loadStructure, setLoadStructure] = useState(false)
  const [loadDecor, setLoadDecor] = useState(false)
  const [selectedFlower, setSelectedFlower] = useState(null)
  const playerRef = useRef()
  // Load in phases (VERY IMPORTANT)
  useEffect(() => {
    const t1 = setTimeout(() => setLoadStructure(true), 1000)
    const t2 = setTimeout(() => setLoadDecor(true), 2500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    if (selectedFlower) {
      // Release the mouse so the user can interact with the window
      document.exitPointerLock?.();
    }
  }, [selectedFlower]);

  return (
    <>

    <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '8px', height: '8px', borderRadius: '50%',
        background: 'white', border: '2px solid black',
        transform: 'translate(-50%, -50%)', pointerEvents: 'none',
        zIndex: 10
      }} />

      <FlowerInfo 
        flower={selectedFlower} 
        onClose={() => setSelectedFlower(null)} 
      />


    <Canvas
      dpr={1}
      frameloop="always"
      // shadows={false}
      // gl={{
      //   antialias: false,
      //   powerPreference: 'low-power',
      //   preserveDrawingBuffer: false,
      // }}
      camera={{ position: [0, 10, -90], fov: 60 }}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* LIGHTS */}
      <ambientLight intensity={3} />
      <directionalLight position={[-1, 10, 5]} intensity={15} />

      {/* 2. ADD THESE COMPONENTS HERE */}
      <KeyboardMovement onSelectFlower={(file) => setSelectedFlower(flowerData[file])} playerRef={playerRef} />
      <PointerLockControls />

      {/* PHASE 1 — ENVIRONMENT */}
      <Suspense fallback={null}>
        <GLB url="/models/Walls.glb" />
      </Suspense>

      {/* PHASE 2 — STRUCTURE  */}
      {loadStructure && (
        <Suspense fallback={null}>
          <GLB url="/models/Stairs.glb" />
          <GLB url="/models/etagers-v1.glb" />
          <GLB url="/models/Tree.glb" />
          <GLB url="/models/Banc.glb" />
          <GLB url="/models/PlanteDeco.glb" />
          <GLB url="/models/Cadres.glb" />
          <GLB url="/models/Lampe.glb" /> 
          <GLB url="/flowers/Room2-Flower4-Deco.glb" />
        </Suspense>
      )}

      {/* PHASE 3 — DECORATION */}
      {loadDecor && (
        <Suspense fallback={null}>
          {Object.keys(flowerData).map((filename) => ((
            <FlowerGroup 
              key={filename} 
              filename={filename}
              playerRef={playerRef}
              onSelect={(file) => setSelectedFlower(flowerData[file])}
            />
          )))}
           
        </Suspense>
      )}

      {/* <OrbitControls enableDamping target={[0,5,10]} /> */}

    </Canvas>
  </>
  )
}


      {/* <GLB url="/models/Lampe.glb" />
      <GLB url="/models/Banc.glb" />
      <GLB url="/models/PlanteDeco.glb" />
      <GLB url="/models/Cadres.glb" /> 
      <GLB url="/models/Etageres.glb" /> */}