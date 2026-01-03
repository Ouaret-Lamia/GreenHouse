import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Suspense, useEffect, useState } from 'react'
import { KeyboardMovement } from './KeyboardMovement'
import {PointerLockControls } from '@react-three/drei'
import GLB from './components/GLB'
import { flowerData } from './flowerDetails' // Import the new file
import { FlowerInfo } from './components/FlowerInfo'
import { FlowerGroup } from './components/FlowerGroup'
import { useRef } from 'react'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
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

    <FlowerInfo  flower={selectedFlower} onClose={() => setSelectedFlower(null)} />


    <Canvas 
        shadows 
        // 1. Artistic dark background
        camera={{ position: [0, 10, -90], fov: 60 }}
        // 2. Tone Mapping prevents the "White Screen" problem
        gl={{ 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.3 
        }}
      >
      {/* 2. Soft Ambient Light (Keep it low for contrast) */}
      <ambientLight intensity={0.2} />
      <Environment preset="forest" />
      
      {/* 3. The "Sun" - Positioned above the dome hole */}
      <directionalLight
      position={[10,80,10]}
       intensity={2}
       castShadow
       shadow-mapSize={[2048, 2048]}>
        <orthographicCamera
          attach="shadow-camera"
          args={[-100, 100, 100, -100, 1, 200]}
        />
      </directionalLight>

      {/* 4. The Sunlight Beam effect */}
      <spotLight
        position={[0, 45, 0]}
        angle={0.3}
        penumbra={1}
        intensity={10}
        color="#fffceb" // Warm sunlight
        castShadow
      />
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
          <GLB url="/flowers/Room3-Flower6Deco.glb" />
          <GLB url="/flowers/Room4-Flower10-deco.glb" />
          <GLB url="/models/Deco.glb" />
          <GLB url="/models/Fountain.glb"/>
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

      {/* 3. POST-PROCESSING (The "Glow") */}
        <EffectComposer>
          <Bloom luminanceThreshold={2} intensity={2} mipmapBlur />
          <Vignette darkness={0.3} />
        </EffectComposer>

    </Canvas>
  </>
  )
}


     