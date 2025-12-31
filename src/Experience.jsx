import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
// import { FlowerInstances } from './FlowerInstances';
import { KeyboardMovement } from './KeyboardMovement';

export default function Experience() {
  // Load the background/building model
  const { scene } = useGLTF('/models/scene.glb');

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Suspense handles the loading lag */}
      <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="hotpink" /></mesh>}>
        
        {/* 1. Render the main scene (walls, floor, stairs) */}
        <primitive object={scene} />

        {/* 2. Render the Instanced Flowers */}
        {/* <FlowerInstances /> */}

      </Suspense>

      {/* 3. Movement logic */}
      <KeyboardMovement />
    </>
  );
}