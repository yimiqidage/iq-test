<script setup lang="ts">
import { ref } from 'vue'
import { useUpload } from '~/composables/useUpload'
import { useAuthStore } from '~/stores/auth'

const emit = defineEmits(['upload-success', 'upload-error', 'upload-start', 'upload-end'])

const { uploadToR2 } = useUpload()

const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const error = ref('')
const retryCount = ref(0)

const TIMEOUT_DURATION = 30000 // 30秒超时
const MAX_RETRIES = 3
const authStore = useAuthStore()

// 带超时的上传函数
const uploadWithTimeout = async (file: File) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('上传超时')), TIMEOUT_DURATION)
  })
  
  try {
    const result = await Promise.race([
      uploadToR2(file),
      timeoutPromise
    ])
    return result
  } catch (error) {
    throw error
  }
}

// 带重试的上传函数
const uploadWithRetry = async (file: File) => {
  while (retryCount.value < MAX_RETRIES) {
    try {
      const result = await uploadWithTimeout(file)
      if (retryCount.value > 0) {
        console.log(`[Upload] 重试成功，总共重试${retryCount.value}次`)
      }
      retryCount.value = 0 // 成功后重置重试次数
      return result
    } catch (err) {
      retryCount.value++
      console.warn(`[Upload] 上传失败，正在进行第${retryCount.value}次重试`, err)
      
      if (retryCount.value >= MAX_RETRIES) {
        throw new Error(`上传失败，已重试${MAX_RETRIES}次`)
      }
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount.value)))
    }
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return

  

  

  
  try {
    isUploading.value = true

    // 判断是否登录，如果未登录，进行登录
    if (!authStore.checkLogin()) {
    console.log("authStore.checkLogin result,",authStore.isLoggedIn);
    isUploading.value = false;
    return;
  } 

    error.value = ''
    emit('upload-start')
    
    console.log('[Upload] 开始上传文件:', file.name, `(${(file.size / 1024).toFixed(1)}KB)`)
    
    const result = await uploadWithRetry(file)
    
    if (result.success) {
      console.log('[Upload] 上传成功:', file.name)
      emit('upload-success', { url: result.url, file })
    } else {
      console.error('[Upload] 上传失败:', result.error)
      error.value = result.error || '上传失败'
      emit('upload-error', error.value)
    }
  } catch (err: any) {
    console.error('[Upload] 上传错误:', err.message)
    error.value = err.message || '上传过程中发生错误'
    emit('upload-error', error.value)
  } finally {
    isUploading.value = false
    emit('upload-end')
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}
</script>

<template>
  <div class="image-upload-handler">
    <input 
      type="file" 
      accept="image/*" 
      @change="handleFileChange"
      class="hidden"
      ref="fileInput"
    />
    
    <button 
      @click="triggerFileInput"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      :disabled="isUploading"
    >
      <slot name="button-content">
        {{ isUploading ? `上传中${retryCount > 0 ? `(第${retryCount}次重试)` : ''}...` : '选择图片' }}
      </slot>
    </button>

    <div v-if="error" class="mt-2 text-red-500 text-sm">
      {{ error }}
    </div>
  </div>
</template>