import { useGLTF } from '@react-three/drei'

export default function Model() {
  const { scene } = useGLTF('/models/scene.glb')

  return <primitive object={scene} scale={1.5} />
}
