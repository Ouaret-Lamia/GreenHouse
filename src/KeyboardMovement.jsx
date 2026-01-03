import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// We create the floor raycaster outside the component for performance
const floorRaycaster = new THREE.Raycaster()

export function KeyboardMovement({ onSelectFlower, playerRef }) {
  const { camera, raycaster, scene } = useThree()
  const keys = useRef({})
  const speed = 0.4 // Adjust walking speed here
  const playerHeight = 10 // Height of the camera eyes from the floor

  useEffect(() => {
    // 1. INPUT LISTENERS
    const down = (e) => (keys.current[e.code] = true)
    const up = (e) => (keys.current[e.code] = false)

    // 2. FPS CLICK LOGIC (Center of screen)
    const handleMouseClick = () => {
      // Point the raycaster at the center crosshair
      raycaster.setFromCamera({ x: 0, y: 0 }, camera)

      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        let target = intersects[0].object
        
        // Find the group that contains the filename (from FlowerGroup)
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

  useFrame(() => {
    // 3. HORIZONTAL MOVEMENT
    const direction = new THREE.Vector3()

    if (keys.current.KeyW || keys.current.ArrowUp) direction.z -= 1
    if (keys.current.KeyS || keys.current.ArrowDown) direction.z += 1
    if (keys.current.KeyA || keys.current.ArrowLeft) direction.x -= 1
    if (keys.current.KeyD || keys.current.ArrowRight) direction.x += 1

    if (direction.length() > 0) {
      direction.normalize()
      direction.applyQuaternion(camera.quaternion)
      direction.y = 0 // Keep the player on the ground plane
      direction.multiplyScalar(speed)
      camera.position.add(direction)
    }

    // 4. STAIRS AND FLOOR DETECTION
    // Start the ray slightly above the player's current head height
    const rayOrigin = new THREE.Vector3(camera.position.x, camera.position.y + 10, camera.position.z)
    floorRaycaster.set(rayOrigin, new THREE.Vector3(0, -1, 0))

    const floorIntersections = floorRaycaster.intersectObjects(scene.children, true)

    if (floorIntersections.length > 0) {
      // Find the first surface below us
      const groundHeight = floorIntersections[0].point.y
      const targetHeight = groundHeight + playerHeight
      
      // Smoothly adjust the camera height (Lerp) to climb steps
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetHeight, 0.15)
    }

    // 5. UPDATE PLAYER REFERENCE
    // This allows FlowerGroup.jsx to know where you are for distance loading
    if (playerRef) {
      playerRef.current = camera
    }
  })

  return null
}