import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'

export function KeyboardMovement() {
  const { camera, scene } = useThree()
  const keys = useRef({})
  const speed = 0.5 
  
  // 1. Create Raycasters for collision and floor detection
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  // Buffer distance: how close you can get to a wall before stopping
  const wallBuffer = 2.0 

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

    // Get input direction
    if (keys.current.KeyW || keys.current.ArrowUp) direction.z -= 1
    if (keys.current.KeyS || keys.current.ArrowDown) direction.z += 1
    if (keys.current.KeyA || keys.current.ArrowLeft) direction.x -= 1
    if (keys.current.KeyD || keys.current.ArrowRight) direction.x += 1

    if (direction.length() > 0) {
      direction.normalize()
      // Move relative to camera rotation
      direction.applyQuaternion(camera.quaternion)
      
      // 2. WALL COLLISION CHECK
      // Set raycaster to start at camera and point in the direction of movement
      raycaster.set(camera.position, direction)
      
      // Check if we hit any walls/doors in the scene
      const wallIntersections = raycaster.intersectObjects(scene.children, true)
      
      // Only move if there is no wall closer than the 'wallBuffer'
      const canMove = wallIntersections.length === 0 || wallIntersections[0].distance > wallBuffer

      if (canMove) {
        // Keep movement horizontal (no flying)
        direction.y = 0 
        camera.position.add(direction.multiplyScalar(speed))
      }
    }

    // 3. STAIRS & FLOOR DETECTION
    // Ray pointing straight down from the camera
    const downRay = new THREE.Raycaster(camera.position, new THREE.Vector3(0, -1, 0))
    const floorIntersections = downRay.intersectObjects(scene.children, true)
    
    if (floorIntersections.length > 0) {
      const groundHeight = floorIntersections[0].point.y
      const eyeHeight = 10 // How high the camera is from the floor
      
      // Smoothly adjust height for stairs
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, groundHeight + eyeHeight, 0.2)
    }
  })

  return null
}