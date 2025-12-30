import { useGLTF } from '@react-three/drei'

export default function GLB({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

useGLTF.preload('/models/scene.glb')
useGLTF.preload('/models/Banc.glb')
useGLTF.preload('/models/Cadres.glb')
useGLTF.preload('/models/Etageres.glb')
useGLTF.preload('/models/Lampe.glb')
useGLTF.preload('/models/PlanteDeco.glb')
useGLTF.preload('/models/Stairs.glb')
useGLTF.preload('/models/Tree.glb')
