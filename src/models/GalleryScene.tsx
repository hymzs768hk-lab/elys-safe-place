import { useMemo } from 'react'

interface GallerySceneProps {
  photos: any[]
}

export default function GalleryScene({ photos }: GallerySceneProps) {
  const frameCount = 500
  const framesPerRow = 10
  const rowHeight = 2.5
  const frameSpacing = 1.2

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[30, 60, 1]}>
        <planeGeometry />
        <meshStandardMaterial color="#D4A574" roughness={0.7} />
      </mesh>

      {/* Left Wall - Photo Frames */}
      {Array.from({ length: frameCount }).map((_, idx) => {
        const row = Math.floor(idx / framesPerRow)
        const col = idx % framesPerRow
        const x = -12 + col * frameSpacing
        const y = 1.5 + row * rowHeight
        const z = 0

        return (
          <group key={idx} position={[x, y, z]}>
            {/* Frame */}
            <mesh scale={[0.9, 1.1, 0.05]}>
              <boxGeometry />
              <meshStandardMaterial
                color="#8B6F47"
                roughness={0.7}
                metalness={0.2}
              />
            </mesh>
            {/* Inner frame (darker) */}
            <mesh scale={[0.8, 1, 0.06]}>
              <boxGeometry />
              <meshStandardMaterial
                color="#654321"
                roughness={0.5}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
