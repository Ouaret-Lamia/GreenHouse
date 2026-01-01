// src/components/FlowerGroup.jsx
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState, useRef, useMemo } from 'react'
import * as THREE from 'three'
import GLB from './GLB' // Import your optimization component

export function FlowerGroup({ filename, playerRef, onSelect }) {
  // 1. We still need to load the scene here to calculate the center distance
  const { scene } = useGLTF(`/flowers/${filename}`)
  const [isVisible, setIsVisible] = useState(false)
  const center = useRef(new THREE.Vector3())

  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    box.getCenter(center.current)
  }, [scene])

  useFrame(() => {
    if (!playerRef.current) return
    const distance = playerRef.current.position.distanceTo(center.current)
    
    // Thresholds
    if (distance < 60 && !isVisible) setIsVisible(true)
    if (distance > 80 && isVisible) setIsVisible(false)
  })

  if (!isVisible) return null

  // 2. Use your optimized GLB component here instead of <primitive />
  return (
    <group userData={{ filename }}>
      <GLB 
        url={`/flowers/${filename}`} 
        onClick={() => onSelect(filename)} 
      />
    </group>
  )
}