import { useState, useRef } from 'react'
import { useUpload } from '@workspace/object-storage-web'

interface CDSlot {
  id: string
  slotNumber: number
  title: string | null
  audioObjectPath: string | null
  updatedAt: string
}

interface CDPlayerProps {
  slots: CDSlot[]
  selectedSlot: number | null
  onSelectSlot: (slot: number | null) => void
  onUpdateSlot: (slotNumber: number, data: any) => Promise<any>
}

export default function CDPlayer({
  slots,
  selectedSlot,
  onSelectSlot,
  onUpdateSlot,
}: CDPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null)
  const { uploadFile } = useUpload()

  const handleFileUpload = async (slotNumber: number, file: File) => {
    setUploadingSlot(slotNumber)
    try {
      const result = await uploadFile(file)
      const title = file.name.replace(/\.[^.]+$/, '')
      await onUpdateSlot(slotNumber, {
        title,
        audioObjectPath: result.objectPath,
      })
    } finally {
      setUploadingSlot(null)
    }
  }

  const getAudioUrl = (objectPath: string | null) => {
    if (!objectPath) return ''
    return `/api/storage/objects${objectPath.replace(/^\/objects/, '')}`
  }

  const currentSlot = slots.find((s) => s.slotNumber === selectedSlot)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'var(--primary-amber)',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        minWidth: '350px',
        zIndex: 100,
      }}
    >
      <h3 style={{ marginBottom: '15px' }}>CD Collection</h3>

      {/* CD Slots Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px',
          marginBottom: '20px',
          maxHeight: '150px',
          overflowY: 'auto',
        }}
      >
        {slots.map((slot) => (
          <div
            key={slot.slotNumber}
            onClick={() => onSelectSlot(slot.slotNumber)}
            style={{
              background:
                selectedSlot === slot.slotNumber
                  ? 'var(--accent-wood)'
                  : 'rgba(255, 255, 255, 0.5)',
              border: '2px solid var(--primary-warm)',
              borderRadius: '4px',
              padding: '10px',
              cursor: 'pointer',
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            {slot.audioObjectPath ? (
              <span
                style={{
                  color:
                    selectedSlot === slot.slotNumber
                      ? 'var(--primary-amber)'
                      : 'var(--primary-dark)',
                }}
              >
                {slot.title || `Slot ${slot.slotNumber}`}
              </span>
            ) : (
              <span
                style={{
                  color: 'var(--primary-stone)',
                  fontStyle: 'italic',
                }}
              >
                Empty
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Now Playing */}
      {currentSlot && currentSlot.audioObjectPath && (
        <div style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '12px', marginBottom: '10px' }}>
            Now: {currentSlot.title || 'Untitled'}
          </p>
          <audio
            ref={audioRef}
            src={getAudioUrl(currentSlot.audioObjectPath)}
            controls
            style={{
              width: '100%',
            }}
          />
        </div>
      )}

      {/* Upload New */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {slots.map((slot) =>
          !slot.audioObjectPath || selectedSlot === slot.slotNumber ? (
            <label
              key={slot.slotNumber}
              style={{
                padding: '8px 12px',
                background: 'var(--primary-warm)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              {uploadingSlot === slot.slotNumber ? 'Uploading...' : `Slot ${slot.slotNumber}`}
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileUpload(slot.slotNumber, e.target.files[0])
                  }
                }}
                style={{ display: 'none' }}
              />
            </label>
          ) : null
        )}
      </div>
    </div>
  )
}
