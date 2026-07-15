import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Preload } from '@react-three/drei'
import { ReactNode } from 'react'

interface Canvas3DProps {
  children: ReactNode
  cameraPosition?: [number, number, number]
  cameraFov?: number
}

export default function Canvas3D({
  children,
  cameraPosition = [0, 1.6, 5],
  cameraFov = 50,
}: Canvas3DProps) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%' }}
    >
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={cameraFov}
        near={0.1}
        far={1000}
      />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      {children}
      <Preload all />
    </Canvas>
  )
}
