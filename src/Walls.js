import { MeshReflectorMaterial } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export const Walls = () => {

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        {/* floor */}
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>

      {/* walls */}
      <mesh position={[0, 2.5, -5]}>
        <boxGeometry args={[20, 5, 0.5]} />
        <meshStandardMaterial map={useLoader(THREE.TextureLoader, './assets/wall.jpg')} />
      </mesh>
      <mesh position={[-5.4, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 5, 0.5]} />
        <meshStandardMaterial map={useLoader(THREE.TextureLoader, './assets/wall.jpg')} />
      </mesh>
      <mesh position={[6, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[20, 5, 0.5]} />
        <meshStandardMaterial map={useLoader(THREE.TextureLoader, './assets/wall.jpg')} />
      </mesh>

      {/* roof */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, 0]}>
        <planeGeometry args={[11, 20]} />
        <meshStandardMaterial map={useLoader(THREE.TextureLoader, './assets/wall.jpg')} />
      </mesh>
    </>
  )
}
