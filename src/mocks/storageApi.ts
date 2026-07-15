// Mock file upload hook
export function useUpload() {
  return {
    uploadFile: async (file: File) => {
      // Simulate upload delay
      await new Promise((r) => setTimeout(r, 500))

      // Create a mock object path
      const objectPath = `/objects/${Date.now()}_${file.name}`

      // For images and audio, create a data URL for preview
      const reader = new FileReader()
      return new Promise((resolve) => {
        reader.onload = () => {
          resolve({
            uploadURL: reader.result as string,
            objectPath,
            metadata: {
              name: file.name,
              size: file.size,
              type: file.type,
            },
          })
        }
        reader.readAsDataURL(file)
      })
    },
    isUploading: false,
    progress: 0,
    error: null,
  }
}
