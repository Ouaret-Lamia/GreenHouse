// src/components/FlowerGroup.jsx
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState, useMemo} from 'react'
import * as THREE from 'three'
import GLB from './GLB'

export function FlowerGroup({ filename, playerRef, onSelect }) {
  const { scene } = useGLTF(`/flowers/${filename}`)
  const [isVisible, setIsVisible] = useState(false)

  // Compute center once
  const centerPoint = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const v = new THREE.Vector3()
    box.getCenter(v)
    return v
  }, [scene])

  // Distance-based visibility
  useFrame(() => {
    if (!playerRef.current) return
    const distance = playerRef.current.position.distanceTo(centerPoint)

    if (distance < 47 && !isVisible) setIsVisible(true)
    if (distance > 50 && isVisible) setIsVisible(false)
  })

  if (!isVisible) return null

  return (
    <group userData={{ filename }}>
      <GLB
        url={`/flowers/${filename}`}
        onClick={() => onSelect(filename)}
      />
    </group>
  )
}
