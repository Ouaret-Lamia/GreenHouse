// src/components/FlowerGroup.jsx
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState, useRef, useMemo} from 'react'
import * as THREE from 'three'
import GLB from './GLB'

export function FlowerGroup({ filename, playerRef, onSelect }) {
  const { scene } = useGLTF(`/flowers/${filename}`)
  const [isVisible, setIsVisible] = useState(false)
  const center = useRef(new THREE.Vector3())

  // Compute center once
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    box.getCenter(center.current)
  }, [scene])

  // Distance-based visibility
  useFrame(() => {
    if (!playerRef.current) return
    const distance = playerRef.current.position.distanceTo(center.current)

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
