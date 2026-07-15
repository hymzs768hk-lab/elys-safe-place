import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Canvas3D from '../components/Canvas3D'
import Bedroom from '../models/Bedroom'
import DiaryPanel from '../components/DiaryPanel'
import {
  useListDiaryPages,
  useCreateDiaryPage,
  useUpdateDiaryPage,
  useDeleteDiaryPage,
} from '@workspace/api-client-react'

export default function SafeSpace() {
  const navigate = useNavigate()
  const [diaryOpen, setDiaryOpen] = useState(false)
  const { data: pages = [] } = useListDiaryPages()
  const createPage = useCreateDiaryPage()
  const updatePage = useUpdateDiaryPage()
  const deletePage = useDeleteDiaryPage()

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas3D cameraPosition={[0, 1.2, 4]}>
        <Bedroom onDeskClick={() => setDiaryOpen(true)} />
      </Canvas3D>

      {diaryOpen && (
        <DiaryPanel
          pages={pages}
          onCreate={createPage}
          onUpdate={updatePage}
          onDelete={deletePage}
          onClose={() => setDiaryOpen(false)}
        />
      )}

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
