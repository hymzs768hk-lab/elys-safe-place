import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Canvas3D from '../components/Canvas3D'
import MusicRoomScene from '../models/MusicRoomScene'
import CDPlayer from '../components/CDPlayer'
import { useListCdSlots, useUpdateCdSlot } from '@workspace/api-client-react'

export default function MusicRoom() {
  const navigate = useNavigate()
  const [selectedCD, setSelectedCD] = useState<number | null>(null)
  const { data: cdSlots = [] } = useListCdSlots()
  const updateCdSlot = useUpdateCdSlot()

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas3D cameraPosition={[0, 1.2, 5]}>
        <MusicRoomScene />
      </Canvas3D>

      <CDPlayer
        slots={cdSlots}
        selectedSlot={selectedCD}
        onSelectSlot={setSelectedCD}
        onUpdateSlot={updateCdSlot}
      />

      <button
        onClick={handleBackClick}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 50,
        }}
      >
        Back to Exterior
      </button>
    </div>
  )
}
