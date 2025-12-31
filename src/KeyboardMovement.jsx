import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function KeyboardMovement() {
  const { camera } = useThree()
  const keys = useRef({})
  const speed = 0.06

  useEffect(() => {
    const down = e => (keys.current[e.code] = true)
    const up = e => (keys.current[e.code] = false)

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)

    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useFrame(() => {
    const direction = new THREE.Vector3()

    if (keys.current.ArrowUp) direction.z -= 1
    if (keys.current.ArrowDown) direction.z += 1
    if (keys.current.ArrowLeft) direction.x -= 1
    if (keys.current.ArrowRight) direction.x += 1

    if (direction.length() === 0) return

    direction.normalize().multiplyScalar(speed)

    // Move relative to camera rotation
    direction.applyQuaternion(camera.quaternion)
    camera.position.add(direction)
  })

  return null
}
