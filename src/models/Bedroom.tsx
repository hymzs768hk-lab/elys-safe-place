interface BedroomProps {
  onDeskClick: () => void
}

export default function Bedroom({ onDeskClick }: BedroomProps) {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[5, 5, 1]}>
        <planeGeometry />
        <meshStandardMaterial color="#D4A574" roughness={0.7} />
      </mesh>

      {/* Walls */}
      <mesh position={[-2.5, 1.5, 0]} scale={[0.1, 3, 5]}>
        <boxGeometry />
        <meshStandardMaterial color="#C9A25D" roughness={0.8} />
      </mesh>
      <mesh position={[2.5, 1.5, 0]} scale={[0.1, 3, 5]}>
        <boxGeometry />
        <meshStandardMaterial color="#C9A25D" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.5, -2.5]} scale={[5, 3, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#B8956B" roughness={0.8} />
      </mesh>

      {/* Bed */}
      <mesh position={[-1.2, 0.4, -1.5]} scale={[1.2, 0.2, 1.8]}>
        <boxGeometry />
        <meshStandardMaterial color="#8B5A3C" roughness={0.7} />
      </mesh>

      {/* Bedding */}
      <mesh position={[-1.2, 0.5, -1.5]} scale={[1, 0.1, 1.5]}>
        <boxGeometry />
        <meshStandardMaterial color="#E8D4B8" roughness={0.4} />
      </mesh>

      {/* Desk - clickable */}
      <mesh
        position={[1.2, 0.35, -1.5]}
        scale={[0.8, 0.15, 0.6]}
        onClick={onDeskClick}
        style={{ cursor: 'pointer' }}
      >
        <boxGeometry />
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </mesh>

      {/* Window */}
      <mesh position={[0, 1, -2.4]} scale={[1.5, 1.5, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial
          color="#87CEEB"
          emissive="#87CEEB"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Plant 1 */}
      <mesh position={[2.0, 0.3, -1.8]} scale={[0.2, 0.4, 0.2]}>
        <cylinderGeometry />
        <meshStandardMaterial color="#228B22" roughness={0.6} />
      </mesh>
      {/* Plant 1 Pot */}
      <mesh position={[2.0, 0.15, -1.8]} scale={[0.25, 0.1, 0.25]}>
        <cylinderGeometry />
        <meshStandardMaterial color="#D4A574" roughness={0.7} />
      </mesh>

      {/* Plant 2 */}
      <mesh position={[-2.0, 0.3, -1.8]} scale={[0.2, 0.35, 0.2]}>
        <cylinderGeometry />
        <meshStandardMaterial color="#2F7C31" roughness={0.6} />
      </mesh>
      {/* Plant 2 Pot */}
      <mesh position={[-2.0, 0.15, -1.8]} scale={[0.25, 0.1, 0.25]}>
        <cylinderGeometry />
        <meshStandardMaterial color="#D4A574" roughness={0.7} />
      </mesh>
    </group>
  )
}
