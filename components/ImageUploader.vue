<!-- components/ImageUploader.vue -->
<template>
    <div class="image-uploader">
      <input 
        type="file" 
        accept="image/*" 
        @change="handleFileChange"
        class="hidden"
        ref="fileInput"
      />
      
      <button 
        @click="triggerFileInput"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        :disabled="isUploading"
      >
        {{ isUploading ? '上传中...' : '选择图片' }}
      </button>
  
      <div v-if="uploadedUrl" class="mt-4">
        <img :src="uploadedUrl" alt="Uploaded image" class="max-w-xs rounded shadow" />
        <p class="mt-2 text-sm text-gray-600">
          图片URL: {{ uploadedUrl }}
        </p>
      </div>
  
      <div v-if="error" class="mt-2 text-red-500 text-sm">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useUpload } from '~/composables/useUpload'
  
  const { uploadToR2 } = useUpload()
  
  const fileInput = ref<HTMLInputElement | null>(null)
  const isUploading = ref(false)
  const uploadedUrl = ref('')
  const error = ref('')
  
  const triggerFileInput = () => {
    fileInput.value?.click()
  }
  
  const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    
    if (!file) return
    
    try {
      isUploading.value = true
      error.value = ''
      
      const result = await uploadToR2(file)
      
      if (result.success) {
        uploadedUrl.value = result.url || ''
      } else {
        error.value = result.error || '上传失败'
      }
    } catch (err: any) {
      error.value = err.message || '上传过程中发生错误'
    } finally {
      isUploading.value = false
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }
  }
  </script>