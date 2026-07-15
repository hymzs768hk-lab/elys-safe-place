export default function MusicRoomScene() {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[6, 6, 1]}>
        <planeGeometry />
        <meshStandardMaterial color="#D4A574" roughness={0.7} />
      </mesh>

      {/* Walls */}
      <mesh position={[-3, 1.5, 0]} scale={[0.1, 3, 6]}>
        <boxGeometry />
        <meshStandardMaterial color="#C9A25D" roughness={0.8} />
      </mesh>
      <mesh position={[3, 1.5, 0]} scale={[0.1, 3, 6]}>
        <boxGeometry />
        <meshStandardMaterial color="#C9A25D" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.5, -3]} scale={[6, 3, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#B8956B" roughness={0.8} />
      </mesh>

      {/* Piano */}
      <mesh position={[-1.5, 0.35, -2]} scale={[2, 0.2, 0.8]}>
        <boxGeometry />
        <meshStandardMaterial color="#1C1C1C" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Guitar Stand */}
      <mesh position={[1.5, 0.5, -2]} scale={[0.3, 1.2, 0.3]}>
        <boxGeometry />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {/* Recorder */}
      <mesh position={[0, 0.4, -2]} scale={[0.1, 0.05, 0.5]}>
        <boxGeometry />
        <meshStandardMaterial color="#8B7355" roughness={0.6} />
      </mesh>

      {/* CD Player/Boombox */}
      <mesh position={[0, 0.3, 1.5]} scale={[1.2, 0.4, 0.6]}>
        <boxGeometry />
        <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  )
}
