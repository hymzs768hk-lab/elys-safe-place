// Mock diary data
const mockDiaryPages = [
  {
    id: '1',
    pageNumber: 1,
    title: 'First Day',
    content: 'Welcome to my safe place. This is where I keep my thoughts and memories.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

let diaryPages = [...mockDiaryPages]

export function useListDiaryPages() {
  return {
    data: diaryPages,
    isLoading: false,
  }
}

export function useCreateDiaryPage() {
  return {
    mutateAsync: async (data: any) => {
      await new Promise((r) => setTimeout(r, 300))
      const newPage = {
        id: Date.now().toString(),
        pageNumber: diaryPages.length + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      diaryPages.push(newPage)
      return newPage
    },
  }
}

export function useUpdateDiaryPage() {
  return {
    mutateAsync: async ({ id, ...data }: any) => {
      await new Promise((r) => setTimeout(r, 300))
      const idx = diaryPages.findIndex((p) => p.id === id)
      if (idx >= 0) {
        diaryPages[idx] = {
          ...diaryPages[idx],
          ...data,
          updatedAt: new Date().toISOString(),
        }
      }
      return diaryPages[idx]
    },
  }
}

export function useDeleteDiaryPage() {
  return {
    mutateAsync: async (id: string) => {
      await new Promise((r) => setTimeout(r, 300))
      diaryPages = diaryPages.filter((p) => p.id !== id)
      return true
    },
  }
}

export function getListDiaryPagesQueryKey() {
  return ['diaryPages']
}
