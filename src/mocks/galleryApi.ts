// Mock gallery photos
let galleryPhotos: any[] = []

export function useListGalleryPhotos() {
  return {
    data: galleryPhotos,
    isLoading: false,
  }
}

export function useCreateGalleryPhoto() {
  return {
    mutateAsync: async (data: any) => {
      await new Promise((r) => setTimeout(r, 300))
      const newPhoto = {
        id: Date.now().toString(),
        slotIndex: galleryPhotos.length,
        ...data,
        createdAt: new Date().toISOString(),
      }
      galleryPhotos.push(newPhoto)
      return newPhoto
    },
  }
}

export function useUpdateGalleryPhoto() {
  return {
    mutateAsync: async ({ id, ...data }: any) => {
      await new Promise((r) => setTimeout(r, 300))
      const idx = galleryPhotos.findIndex((p) => p.id === id)
      if (idx >= 0) {
        galleryPhotos[idx] = { ...galleryPhotos[idx], ...data }
      }
      return galleryPhotos[idx]
    },
  }
}

export function useDeleteGalleryPhoto() {
  return {
    mutateAsync: async (id: string) => {
      await new Promise((r) => setTimeout(r, 300))
      galleryPhotos = galleryPhotos.filter((p) => p.id !== id)
      return true
    },
  }
}

export function getListGalleryPhotosQueryKey() {
  return ['galleryPhotos']
}
