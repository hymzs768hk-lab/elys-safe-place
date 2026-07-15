import { useState } from 'react'

interface DiaryPage {
  id: string
  pageNumber: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

interface DiaryPanelProps {
  pages: DiaryPage[]
  onCreate: (data: any) => Promise<any>
  onUpdate: (id: string, data: any) => Promise<any>
  onDelete: (id: string) => Promise<any>
  onClose: () => void
}

export default function DiaryPanel({
  pages,
  onCreate,
  onUpdate,
  onDelete,
  onClose,
}: DiaryPanelProps) {
  const [currentPageIdx, setCurrentPageIdx] = useState(0)
  const [editTitle, setEditTitle] = useState(pages[0]?.title || '')
  const [editContent, setEditContent] = useState(pages[0]?.content || '')
  const [saveStatus, setSaveStatus] = useState<string | null>(null)

  const currentPage = pages[currentPageIdx]

  const handleSave = async () => {
    if (currentPage) {
      setSaveStatus('Saving...')
      try {
        await onUpdate(currentPage.id, {
          title: editTitle,
          content: editContent,
        })
        setSaveStatus('Saved')
        setTimeout(() => setSaveStatus(null), 1500)
      } catch (e) {
        setSaveStatus('Error saving')
      }
    }
  }

  const handleNewPage = async () => {
    await onCreate({ title: 'Untitled', content: '' })
  }

  const handleDeletePage = async () => {
    if (currentPage && confirm('Delete this page?')) {
      await onDelete(currentPage.id)
    }
  }

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      setCurrentPageIdx(currentPageIdx - 1)
      setEditTitle(pages[currentPageIdx - 1]?.title || '')
      setEditContent(pages[currentPageIdx - 1]?.content || '')
    }
  }

  const handleNextPage = () => {
    if (currentPageIdx < pages.length - 1) {
      setCurrentPageIdx(currentPageIdx + 1)
      setEditTitle(pages[currentPageIdx + 1]?.title || '')
      setEditContent(pages[currentPageIdx + 1]?.content || '')
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '700px',
        height: '80%',
        background: 'var(--primary-amber)',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2>Diary</h2>
        <button onClick={onClose} style={{ background: 'var(--accent-wood)' }}>
          Close
        </button>
      </div>

      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Page Title"
        style={{ marginBottom: '15px', fontSize: '16px', fontWeight: '600' }}
      />

      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        placeholder="Write your thoughts here..."
        style={{
          flex: 1,
          marginBottom: '15px',
          fontSize: '14px',
          resize: 'none',
          padding: '15px',
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handlePrevPage} disabled={currentPageIdx === 0}>
            Previous
          </button>
          <span style={{ padding: '10px' }}>
            Page {currentPageIdx + 1} of {pages.length}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPageIdx === pages.length - 1}
          >
            Next
          </button>
        </div>
        {saveStatus && <span style={{ fontSize: '12px', color: 'green' }}>{saveStatus}</span>}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleSave}>Save Page</button>
        <button onClick={handleNewPage}>New Page</button>
        <button
          onClick={handleDeletePage}
          style={{ background: 'var(--accent-wood)' }}
        >
          Delete
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  )
}
