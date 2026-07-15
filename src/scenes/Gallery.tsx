import { useNavigate } from 'react-router-dom'
import Canvas3D from '../components/Canvas3D'
import GalleryScene from '../models/GalleryScene'
import GalleryUI from '../components/GalleryUI'
import {
  useListGalleryPhotos,
  useCreateGalleryPhoto,
  useUpdateGalleryPhoto,
  useDeleteGalleryPhoto,
} from '../mocks/galleryApi'

export default function Gallery() {
  const navigate = useNavigate()
  const { data: photos = [] } = useListGalleryPhotos()
  const createPhoto = useCreateGalleryPhoto()
  const updatePhoto = useUpdateGalleryPhoto()
  const deletePhoto = useDeleteGalleryPhoto()

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas3D cameraPosition={[0, 1.2, 0]}>
        <GalleryScene photos={photos} />
      </Canvas3D>

      <GalleryUI
        photos={photos}
        onCreate={(data) => createPhoto.mutateAsync(data)}
        onUpdate={(id, data) => updatePhoto.mutateAsync({ id, ...data })}
        onDelete={(id) => deletePhoto.mutateAsync(id)}
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
