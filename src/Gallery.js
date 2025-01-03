import { Environment, Image, useCursor, useProgress } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import axios from 'axios'
import { easing } from 'maath'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import * as THREE from 'three'
import getUuid from 'uuid-by-string'
import { useLocation, useRoute } from 'wouter'
import { Overlay } from './Overlay'
import Preloader from './Preloader'
import { Spotlight } from './Spotlight'
import { Walls } from './Walls'

export const Gallery = () => {
  const [lights, setLights] = useState(true)
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [ratio, setRatio] = useState(1.61803398875)
  const getImage = (photo) => `${process.env.REACT_APP_BACKEND_URL}/api/images/thumb/${photo}`
  const [zoom, setZoom] = useState(6)

  useEffect(() => {
    setLoading(true)
  }, [])

  const { progress } = useProgress()

  useEffect(() => {
    if (progress === 100) {
      setLoading(false)
    }
  }, [progress])

  const fetchImages = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/images/66cc3506cbd23d19d1fd4ed2?limit=8&page=1`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then((response) => {
        const positions = [
          // Back
          { position: [-2, 0.6, -4.7], rotation: [0, 0, 0] },
          { position: [2.5, 0.6, -4.7], rotation: [0, 0, 0] },
          // Left
          { position: [-5.15, 0.6, -3], rotation: [0, Math.PI / 2, 0] },
          { position: [-5.15, 0.6, -1.5], rotation: [0, Math.PI / 2, 0] },
          { position: [-5.15, 0.6, 0], rotation: [0, Math.PI / 2, 0] },
          // Right
          { position: [5.75, 0.6, -3], rotation: [0, -Math.PI / 2, 0] },
          { position: [5.75, 0.6, -1.5], rotation: [0, -Math.PI / 2, 0] },
          { position: [5.75, 0.6, 0], rotation: [0, -Math.PI / 2, 0] }
        ]

        const imagesWithPositions = response.data.gallery.map((image, index) => ({
          ...positions[index % positions.length],
          url: getImage(image.photo)
        }))
        setImages(imagesWithPositions)
      })
      .catch((error) => {
        console.error('Error during API call:', error)
      })
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <>
      {loading && <Preloader />}
      <Overlay zoom={zoom} setZoom={setZoom} />
      <Canvas dpr={[1, 1.2]} camera={{ fov: 60, position: [0, 0, 10] }} gl={{ antialias: !isMobile }}>
        <color attach="background" args={['#191920']} />
        <fog attach="fog" args={['#191920', 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames
            images={images}
            ratio={ratio}
            setRatio={setRatio}
            lights={lights}
            zoom={zoom}
            setZoom={setZoom}
          />
          <Walls />
        </group>
        <Environment preset="city" />
      </Canvas>
    </>
  )
}

function Frames({ images, ratio, lights, zoom, setZoom, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()

  const calculateZoom = () => {
    const { innerWidth } = window
    if (innerWidth < 800) return 16
    if (innerWidth < 1000) return 15
    if (innerWidth < 1300) return 10
    if (innerWidth < 1600) return 8
    return 6
  }

  useEffect(() => {
    setZoom(calculateZoom())
  }, [window.innerWidth])

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, ratio / 2, 2))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0.5, zoom)
      q.identity()
    }
  })

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.5, dt)
    easing.dampQ(state.camera.quaternion, q, 0.5, dt)
  })

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name)
      }}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props, index) => {
        const customRatio = index < 2 ? 1.7 : ratio
        const customWidth = index < 2 ? 3.3 : 1
        return <Frame key={props.url} ratio={customRatio} scaleX={customWidth} lights={lights} {...props} />
      })}
    </group>
  )
}

function Frame({ url, ratio, lights, setRatio, scaleX, c = new THREE.Color(), ...props }) {
  const image = useRef()
  const frame = useRef()
  const light = useRef()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const isActive = params?.id === name
  useCursor(hovered)
  useFrame((state, dt) => {
    image.current.material.zoom = 1.2 + (!isActive ? Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 3 : 0)
    easing.damp3(image.current.scale, [0.88 * (!isActive && hovered ? 1.06 : 1), 0.9 * (!isActive && hovered ? 1.06 : 1), 1], 0.1, dt)
    easing.dampC(frame.current.material.color, hovered ? '#f1f1f1' : 'white', 0.1, dt)
  })

  useEffect(() => {
    if (light.current && image.current) {
      light.current.target = image.current
      light.current.target.updateMatrixWorld()
      light.current.updateMatrixWorld()
    }
  }, [image.current])

  return (
    <>
      {lights && <Spotlight />}

      <group {...props}>
        <mesh
          name={name}
          onPointerOver={(e) => (e.stopPropagation(), hover(true))}
          onPointerOut={() => hover(false)}
          scale={[scaleX, ratio, 0.05]}
          position={[0, ratio / 2, 0]}>
          {scaleX > 1 ? (
            <>
              <boxGeometry args={[0.94, 1, 1]} />
            </>
          ) : (
            <>
              <boxGeometry args={[1, 1, 1]} />
            </>
          )}

          <meshStandardMaterial color="#999" metalness={0.5} roughness={0.5} envMapIntensity={2} />
          <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
            <boxGeometry />
            <meshBasicMaterial toneMapped={false} fog={false} />
          </mesh>
          <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
        </mesh>
        {lights && (
          <spotLight
            ref={light}
            position={[0, ratio / 2 + 1, 1]}
            angle={Math.PI / 4}
            penumbra={0.2}
            intensity={5}
            distance={5}
            decay={1}
            castShadow
            target={image.current}
          />
        )}
      </group>
    </>
  )
}
