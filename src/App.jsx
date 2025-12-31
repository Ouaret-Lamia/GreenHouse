import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import GLB from './components/GLB'

export default function App() {
  const [loadStructure, setLoadStructure] = useState(false)
  const [loadDecor, setLoadDecor] = useState(false)

  // Load in phases (VERY IMPORTANT)
  // useEffect(() => {
  //   const t1 = setTimeout(() => setLoadStructure(true), 1000)
  //   const t2 = setTimeout(() => setLoadDecor(true), 2500)

  //   return () => {
  //     clearTimeout(t1)
  //     clearTimeout(t2)
  //   }
  // }, [])

  return (
    <Canvas
      dpr={1}
      frameloop="demand"
      shadows={false}
      gl={{
        antialias: false,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
      }}
      camera={{ position: [0, 10, -90], fov: 60 }}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* LIGHTS */}
      <ambientLight intensity={3} />
      <directionalLight position={[-1, 10, 5]} intensity={15} />

      {/* PHASE 1 — ENVIRONMENT */}
      <Suspense fallback={null}>
        <GLB url="/models/scene.glb" />
      </Suspense>

      {/* PHASE 2 — STRUCTURE */}
      {loadStructure && (
        <Suspense fallback={null}>
          <GLB url="/models/Stairs.glb" />
          <GLB url="/models/Etageres.glb" />
        </Suspense>
      )}

      {/* PHASE 3 — DECORATION */}
      {/* {loadDecor && (
        <Suspense fallback={null}>
          <GLB url="/flowers/Room3-Flower1.glb" />
          <GLB url="/flowers/Room3-Flower2.glb" />
          <GLB url="/flowers/Room3-Flower3.glb" />
          <GLB url="/flowers/Room3-Flower4.glb" />
          <GLB url="/flowers/Room3-Flower5.glb" />
          <GLB url="/flowers/Room3-Flower6.glb" />
          <GLB url="/flowers/Room3-Flower7.glb" />
          <GLB url="/flowers/Room3-Flower8.glb" />
          <GLB url="/flowers/Room3-Flower10(Petunias).glb" />
          <GLB url="/flowers/Room3-Flower11(Marigold).glb" />
        </Suspense>
      )} */}

      <OrbitControls enableDamping target={[0,5,10]} />
    </Canvas>
  )
}

      {/* <GLB url="/models/Etageres.glb" /> */}

      {/* <GLB url="/models/Lampe.glb" />
      <GLB url="/models/Banc.glb" />
      <GLB url="/models/PlanteDeco.glb" />
      <GLB url="/models/Cadres.glb" /> */}
      
      {/* <GLB url="/models/Stairs.glb" />
      <GLB url="/models/scene.glb" /> */}
      
      {/* <GLB url="/models/Tree.glb" /> */}

      {/* <GLB url="/flowers/Room3-Flower1.glb" />
      <GLB url="/flowers/Room3-Flower2.glb" />
      <GLB url="/flowers/Room3-Flower3.glb" />
      <GLB url="/flowers/Room3-Flower4.glb" />
      <GLB url="/flowers/Room3-Flower5.glb" />
      <GLB url="/flowers/Room3-Flower6.glb" />
      <GLB url="/flowers/Room3-Flower7.glb" />
      <GLB url="/flowers/Room3-Flower8.glb" />
      <GLB url="/flowers/Room3-Flower9.glb" />
      <GLB url="/flowers/Room3-Flower10(Petunias).glb" /> */}
