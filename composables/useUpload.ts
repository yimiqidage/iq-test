// composables/useUpload.ts
import type { UploadResponse } from '~/types/upload'

export const useUpload = () => {
  const uploadToR2 = async (file: File): Promise<UploadResponse> => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log("begin upload,...")
      const { data: response } = await useFetch<UploadResponse>('/api/upload', {
        method: 'POST',
        body: formData
      })

      return response.value || { success: false, error: 'No response data' }
    } catch (error: any) {
      console.error('Upload error:', error)
      return {
        success: false,
        error: error.message || 'Upload failed'
      }
    }
  }

  return {
    uploadToR2
  }
}