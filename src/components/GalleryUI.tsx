import { useState, useRef } from 'react'
import { useUpload } from '@workspace/object-storage-web'

interface GalleryPhoto {
  id: string
  slotIndex: number
  imageObjectPath: string | null
  caption: string | null
  createdAt: string
}

interface GalleryUIProps {
  photos: GalleryPhoto[]
  onCreate: (data: any) => Promise<any>
  onUpdate: (id: string, data: any) => Promise<any>
  onDelete: (id: string) => Promise<any>
}

export default function GalleryUI({
  photos,
  onCreate,
  onUpdate,
  onDelete,
}: GalleryUIProps) {
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null)
  const [editingSlot, setEditingSlot] = useState<number | null>(null)
  const [editCaption, setEditCaption] = useState('')
  const { uploadFile } = useUpload()

  const photosBySlot = new Map(photos.map((p) => [p.slotIndex, p]))

  const handleUploadPhoto = async (slotIndex: number, file: File) => {
    setUploadingSlot(slotIndex)
    try {
      const result = await uploadFile(file)
      await onCreate({
        slotIndex,
        imageObjectPath: result.objectPath,
        caption: '',
      })
    } finally {
      setUploadingSlot(null)
    }
  }

  const handleUpdateCaption = async (photo: GalleryPhoto, caption: string) => {
    await onUpdate(photo.id, { caption })
    setEditingSlot(null)
  }

  const handleDeletePhoto = async (photo: GalleryPhoto) => {
    if (confirm('Delete this photo?')) {
      await onDelete(photo.id)
    }
  }

  const getImageUrl = (objectPath: string | null) => {
    if (!objectPath) return ''
    return `/api/storage/objects${objectPath.replace(/^\/objects/, '')}`
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'var(--primary-amber)',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        maxWidth: '300px',
        zIndex: 100,
      }}
    >
      <h3 style={{ marginBottom: '15px' }}>Photo Gallery</h3>
      <p style={{ fontSize: '12px', marginBottom: '15px' }}>
        {photos.length} of 500 frames filled
      </p>

      {/* Quick Upload */}
      <label
        style={{
          display: 'block',
          padding: '12px',
          background: 'var(--primary-warm)',
          borderRadius: '4px',
          cursor: 'pointer',
          textAlign: 'center',
          fontWeight: '500',
          marginBottom: '15px',
        }}
      >
        Upload New Photo
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleUploadPhoto(photos.length, e.target.files[0])
            }
          }}
          style={{ display: 'none' }}
        />
      </label>

      {/* Recent Photos */}
      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      >
        {photos.slice(-5).map((photo) => (
          <div
            key={photo.id}
            style={{
              marginBottom: '15px',
              padding: '10px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '4px',
            }}
          >
            {photo.imageObjectPath && (
              <img
                src={getImageUrl(photo.imageObjectPath)}
                alt="Gallery"
                style={{
                  width: '100%',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  maxHeight: '120px',
                  objectFit: 'cover',
                }}
              />
            )}
            {editingSlot === photo.slotIndex ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  placeholder="Caption"
                  style={{ flex: 1, fontSize: '12px' }}
                />
                <button
                  onClick={() => handleUpdateCaption(photo, editCaption)}
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                {photo.caption && (
                  <p style={{ fontSize: '12px', marginBottom: '8px' }}>
                    {photo.caption}
                  </p>
                )}
                <button
                  onClick={() => {
                    setEditingSlot(photo.slotIndex)
                    setEditCaption(photo.caption || '')
                  }}
                  style={{ fontSize: '12px', marginRight: '8px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePhoto(photo)}
                  style={{ fontSize: '12px', background: 'var(--accent-wood)' }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
