import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// We create the floor raycaster outside the component for performance
const floorRaycaster = new THREE.Raycaster()

export function KeyboardMovement({ onSelectFlower, playerRef }) {
  const { camera, raycaster, scene } = useThree()
  const keys = useRef({})
  const speed = 0.4 
  const playerHeight = 10 

  useEffect(() => {
    // 1. INPUT LISTENERS
    const down = (e) => (keys.current[e.code] = true)
    const up = (e) => (keys.current[e.code] = false)

    // 2. CLICK LOGIC
    const handleMouseClick = () => {
      raycaster.setFromCamera({ x: 0, y: 0 }, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        let target = intersects[0].object
        while (target.parent && !target.userData.filename) {
          target = target.parent
        }
        if (target.userData.filename && onSelectFlower) {
          onSelectFlower(target.userData.filename)
        }
      }
    }

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('mousedown', handleMouseClick)

    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('mousedown', handleMouseClick)
    }
  }, [camera, raycaster, scene, onSelectFlower])

  useFrame((state) => {
    const { camera } = state
    
    // 3. HORIZONTAL MOVEMENT
    const direction = new THREE.Vector3()
    if (keys.current.KeyW || keys.current.ArrowUp) direction.z -= 1
    if (keys.current.KeyS || keys.current.ArrowDown) direction.z += 1
    if (keys.current.KeyA || keys.current.ArrowLeft) direction.x -= 1
    if (keys.current.KeyD || keys.current.ArrowRight) direction.x += 1

    if (direction.length() > 0) {
      direction.normalize()
      direction.applyQuaternion(camera.quaternion)
      direction.y = 0 
      direction.multiplyScalar(speed)
      camera.position.add(direction)
    }

    // 4. STAIRS AND FLOOR DETECTION
    // 
    const rayOrigin = new THREE.Vector3(camera.position.x, camera.position.y + 10, camera.position.z)
    floorRaycaster.set(rayOrigin, new THREE.Vector3(0, -1, 0))

    const floorIntersections = floorRaycaster.intersectObjects(scene.children, true)

    if (floorIntersections.length > 0) {
      const groundHeight = floorIntersections[0].point.y
      const targetHeight = groundHeight + playerHeight
      
      // ✅ FIXED: Use .setY() as a function, not an assignment
      // ✅ FIXED: Removed the duplicate 'if (intersects.length > 0)' block
      const nextY = THREE.MathUtils.lerp(camera.position.y, targetHeight, 0.15)
      camera.position.setY(nextY) 
    }

    // 5. UPDATE PLAYER REFERENCE
    if (playerRef) {
      playerRef.current = camera
    }
  })

  return null
}