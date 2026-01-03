import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function GLB({ url, onClick }) {
  const { scene } = useGLTF(url)

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        // Enable shadows for depth
        obj.castShadow = true
        obj.receiveShadow = true
        obj.matrixAutoUpdate = true 

        if (obj.material) {
          // Matte materials don't create the "ugly" white glow
          obj.material.roughness = 0.8
          obj.material.metalness = 0.1
          obj.material.envMapIntensity = 0.2 
        }
      }
    })
  }, [scene])

  return <primitive object={scene} onClick={onClick} />
}