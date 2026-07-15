import { useRef } from 'react'
import { Group } from 'three'

interface CottageProps {
  onDoorClick: () => void
  doorOpen: boolean
}

export default function Cottage({ onDoorClick, doorOpen }: CottageProps) {
  const doorRef = useRef<Group>(null)

  return (
    <group>
      {/* Foundation & Base */}
      <mesh position={[0, 0, 0]} scale={[4, 1, 4]}>
        <boxGeometry />
        <meshStandardMaterial color="#7B7B7B" roughness={0.8} metalness={0} />
      </mesh>

      {/* Main House Body */}
      <mesh position={[0, 1.5, 0]} scale={[3, 2, 2.5]}>
        <boxGeometry />
        <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 3.5, 0]}>
        <coneGeometry args={[3.5, 2, 4]} />
        <meshStandardMaterial color="#2C2C2C" roughness={0.9} metalness={0} />
      </mesh>

      {/* Chimney */}
      <mesh position={[1.2, 3.2, -0.8]} scale={[0.3, 1.5, 0.3]}>
        <boxGeometry />
        <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0} />
      </mesh>

      {/* Door */}
      <group ref={doorRef}>
        {/* Door Frame */}
        <mesh position={[0, 0.5, 1.3]} scale={[0.6, 1.2, 0.1]}>
          <boxGeometry />
          <meshStandardMaterial color="#3D3028" roughness={0.7} metalness={0} />
        </mesh>
        {/* Door Geometry - clickable */}
        <mesh
          position={[0, 0.5, 1.35]}
          scale={[0.5, 1, 0.05]}
          onClick={onDoorClick}
          style={{ cursor: 'pointer' }}
        >
          <boxGeometry />
          <meshStandardMaterial
            color="#1B3A57"
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>
      </group>

      {/* Left Window */}
      <mesh position={[-0.8, 1.2, 1.3]} scale={[0.4, 0.4, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.8} />
      </mesh>

      {/* Right Window */}
      <mesh position={[0.8, 1.2, 1.3]} scale={[0.4, 0.4, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.8} />
      </mesh>

      {/* Roof Window */}
      <mesh position={[0, 2.8, 0.5]} scale={[0.3, 0.3, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.8} />
      </mesh>

      {/* Porch */}
      <mesh position={[0, 0, 1.8]} scale={[2, 0.3, 1]}>
        <boxGeometry />
        <meshStandardMaterial color="#8B6F47" roughness={0.8} metalness={0} />
      </mesh>

      {/* Porch Posts */}
      <mesh position={[-0.8, 0.5, 1.8]} scale={[0.1, 1, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#654321" roughness={0.8} metalness={0} />
      </mesh>
      <mesh position={[0.8, 0.5, 1.8]} scale={[0.1, 1, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#654321" roughness={0.8} metalness={0} />
      </mesh>
    </group>
  )
}
