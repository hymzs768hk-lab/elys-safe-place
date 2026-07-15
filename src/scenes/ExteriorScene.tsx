import { useNavigate } from 'react-router-dom'
import Canvas3D from '../components/Canvas3D'
import Cottage from '../models/Cottage'
import { useState } from 'react'

export default function ExteriorScene() {
  const navigate = useNavigate()
  const [doorOpen, setDoorOpen] = useState(false)
  const [showRoomSelect, setShowRoomSelect] = useState(false)

  const handleDoorClick = () => {
    if (!doorOpen) {
      setDoorOpen(true)
      setTimeout(() => setShowRoomSelect(true), 600)
    }
  }

  const navigateToRoom = (room: string) => {
    navigate(`/${room}`)
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas3D cameraPosition={[0, 1.2, 8]}>
        <Cottage onDoorClick={handleDoorClick} doorOpen={doorOpen} />
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[20, 20, 1]}>
          <planeGeometry />
          <meshStandardMaterial color="#9CAF88" />
        </mesh>
      </Canvas3D>

      {showRoomSelect && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(232, 212, 184, 0.95)',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            zIndex: 100,
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Welcome Inside</h2>
          <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
            <button
              onClick={() => navigateToRoom('safe-space')}
              style={{ padding: '15px 30px', fontSize: '16px' }}
            >
              Safe Space
            </button>
            <button
              onClick={() => navigateToRoom('music-room')}
              style={{ padding: '15px 30px', fontSize: '16px' }}
            >
              Music Room
            </button>
            <button
              onClick={() => navigateToRoom('gallery')}
              style={{ padding: '15px 30px', fontSize: '16px' }}
            >
              Art Gallery
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  )
}
