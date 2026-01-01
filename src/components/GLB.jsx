import { useGLTF } from '@react-three/drei'
import { useEffect, useMemo } from 'react'

export default function GLB({ url, onClick }) {
  const { scene } = useGLTF(url)

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        // PERFORMANCE OPTIMIZATIONS
        obj.castShadow = false
        obj.receiveShadow = false

        // Freeze transforms (static objects)
        obj.matrixAutoUpdate = false
        obj.updateMatrix()

        // Reduce material cost
        if (obj.material) {
          obj.material.metalness = 0
          obj.material.roughness = 1

          // Disable heavy maps if not needed
          obj.material.normalMap = null
          obj.material.roughnessMap = null
          obj.material.metalnessMap = null
        }
      }
    })
  }, [scene])

  // Dispose when unmounted (prevents GPU memory leaks)
  useEffect(() => {
    return () => {
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })
    }
  }, [scene])

  return (<primitive object={scene} 
  onClick={(e) => {
    e.stopPropagation();
    if(onClick) onClick();
  }}
  />)
}

// ❌ DO NOT preload everything
// useGLTF.preload('/models/scene.glb') ← only preload critical assets if needed
