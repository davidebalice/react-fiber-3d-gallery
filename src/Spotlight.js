import { useGLTF } from '@react-three/drei'

export const Spotlight = () => {
  const { nodes } = useGLTF('./assets/spotlight.gltf')

  return (
    <>
      <primitive object={nodes.Spotlight.clone()} position={[5.1, 3, -0.01]} scale={[0.01, 0.01, 0.01]} />
      <primitive object={nodes.Spotlight.clone()} position={[5.1, 3, -1.4]} scale={[0.01, 0.01, 0.01]} />
      <primitive object={nodes.Spotlight.clone()} position={[5.1, 3, -2.9]} scale={[0.01, 0.01, 0.01]} />
      <primitive object={nodes.Spotlight.clone()} position={[-4.2, 3, -2.98]} scale={[0.01, 0.01, 0.01]} rotation={[0,3.2,0]}/>
      <primitive object={nodes.Spotlight.clone()} position={[-4.2, 3, -1.50]} scale={[0.01, 0.01, 0.01]} rotation={[0,3.2,0]}/>
      <primitive object={nodes.Spotlight.clone()} position={[-4.2, 3, -0.00]} scale={[0.01, 0.01, 0.01]} rotation={[0,3.2,0]}/>
      <primitive object={nodes.Spotlight.clone()} position={[2.4, 3, -4]} scale={[0.01, 0.01, 0.01]} rotation={[0,1.5,0]}/>
      <primitive object={nodes.Spotlight.clone()} position={[-2, 3, -4]} scale={[0.01, 0.01, 0.01]} rotation={[0,1.5,0]}/>
    </>
  )
}
