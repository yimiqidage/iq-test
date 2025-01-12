<template>
  <div class="w-full mx-auto">
    <!-- 主容器使用固定高度避免布局跳动 -->
    <div class="bg-white rounded-2xl shadow-lg min-h-[600px] flex flex-col">
      <div v-if="!showComparison" class="flex-1">
        <!-- 标题和说明 -->
        <!-- <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">AI Image Enhancement</h1>
          <p class="text-gray-600">Make your photos look better with AI</p>
        </div> -->

        <div class="space-y-6 flex-1">
          <!-- 拖拽上传区域 -->
          <div 
            v-if="!selectedFile"
            class="relative border-2 border-dashed border-gray-300 rounded-xl p-8 min-h-[600px] 
                   flex flex-col items-center justify-center space-y-4
                   transition-all duration-300"
            :class="{ 'border-blue-500 bg-blue-50': isDragging }"
            @dragenter.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <!-- 上传图标 -->
            <!-- <div class="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div> -->
            
            <div class="text-center">
              <p class="text-lg text-gray-700 mb-2">drag and drop an image here or</p>
              <ImageUploadHandler
                @upload-success="handleUploadSuccess"
                @upload-error="handleUploadError"
                @upload-start="isProcessing = true"
                @upload-end="isProcessing = false"
              >
                <template #button-content>
                  <span class="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md inline-block transition-colors">
                    Upload image
                  </span>
                </template>
              </ImageUploadHandler>
            </div>
          </div>

          <!-- 预览区域 -->
          <div v-if="selectedFile && previewUrl" class="space-y-6">
            <div 
              class="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200"
              :style="previewContainerStyle"
            >
              <img 
                :src="previewUrl" 
                alt="Preview" 
                class="w-full h-full object-contain"
              />
              <!-- 图片信息覆盖层 -->
              <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-sm">
                <p>{{ selectedFile.name }} - {{ formatFileSize(selectedFile.size) }}</p>
              </div>
            </div>
            
            <div class="flex justify-center space-x-4">
              <button
                @click="handleReUpload"
                class="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="processImage"
                :disabled="isProcessing"
                class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-8 py-2 rounded-lg transition-colors flex items-center"
              >
                <span v-if="isProcessing" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                {{ isProcessing ? 'Processing...' : 'Process' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 处理中状态 -->
      <div
        v-if="isProcessing"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-8 rounded-xl shadow-xl text-center w-80">
          <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div class="mb-4">
            <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
            <p class="text-gray-600 mt-2">{{ processingStatus }}</p>
          </div>
        </div>
      </div>

      <!-- 对比视图 -->
      <div v-if="showComparison" class="space-y-6">
        <div 
          class="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200" 
          :style="previewContainerStyle"
        >
          <ImageComparisonSlider
            v-if="originalImageUrl && processedImageUrl"
            :before-image="originalImageUrl"
            :after-image="processedImageUrl"
            class="w-full h-full"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-500">
            Loading comparison...
          </div>
        </div>
        
        <div class="flex justify-center space-x-4">
          <button
            @click="handleDownload"
            class="flex items-center px-8 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Download
          </button>
          <button
            @click="handleReUpload"
            class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg transition-colors"
          >
          New Unblur Image
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { ENDPOINTS } from '@/utils/urls'
const { get, post } = useApi()
import {  getUerApiKey } from "@/services/user";

// 基础状态管理
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')
const isProcessing = ref(false)
const showComparison = ref(false)
const originalImageUrl = ref('')
const processedImageUrl = ref('')
const processingStatus = ref('Processing...')
const currentOrderId = ref('')
const pollingInterval = ref<number | null>(null)
const progress = ref(0)
const isDragging = ref(false)

// 预览图片容器样式
const previewContainerStyle = computed(() => ({
  width: '100%',
  maxWidth: '800px',
  maxHeight: '500px',
  margin: '0 auto',
  aspectRatio: '16/9'
}))

// 文件大小格式化
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

// 处理拖拽上传
const handleDrop = async (e: DragEvent) => {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (!files?.length) return
  
  const file = files[0]
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file')
    return
  }
  
  if (file.size > 10 * 1024 * 1024) {
    alert('File size should not exceed 10MB')
    return
  }
  
  isProcessing.value = true
  try {
    // 调用ImageUploadHandler组件的上传方法
    const { uploadToR2 } = useUpload()
    const result = await uploadToR2(file)
    
    if (result.success) {
      handleUploadSuccess({ url: result.url, file })
    } else {
      throw new Error(result.error || 'Upload failed')
    }
  } catch (error) {
    handleUploadError(error as string)
  } finally {
    isProcessing.value = false
  }
}

// 处理下载
const handleDownload = async () => {
  try {
    processingStatus.value = 'Preparing download...'
    const response = await fetch(processedImageUrl.value)
    const blob = await response.blob()
    
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = `enhanced-${selectedFile.value?.name || 'image.jpg'}`
    
    document.body.appendChild(link)
    link.click()
    
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error('Download error:', error)
    alert('Download failed, please try again')
  }
}

// 处理上传成功
const handleUploadSuccess = async ({ url, file }: { url: string, file: File }) => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
  originalImageUrl.value = url
  console.log('Upload success:', { fileName: file.name, fileSize: formatFileSize(file.size), url })
}

// 处理上传错误
const handleUploadError = (error: string) => {
  console.error('Upload error:', error)
  alert(`Upload failed: ${error}`)
}

// 开始轮询订单状态
// 修改轮询部分的代码
const startPolling = (orderId: string) => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
  }

  currentOrderId.value = orderId
  processingStatus.value = 'Processing...'
  progress.value = 10
  
  let retryCount = 0
  const MAX_RETRIES = 60
  
  pollingInterval.value = setInterval(async () => {
    try {
      retryCount++
      const status = await checkOrderStatus(orderId)
      console.log('Polling status:', { orderId, status, retryCount })
      
      if (status.status === 1) {
        // 先设置处理后的图片 URL
        processedImageUrl.value = status.outputImg
        console.log('Processing completed, result URL:', status.outputImg)
        
        // 然后执行完成动画
        const finalAnimation = setInterval(() => {
          progress.value += 5
          if (progress.value >= 100) {
            clearInterval(finalAnimation)
            // 最后再更新界面状态
            clearInterval(pollingInterval.value)
            pollingInterval.value = null
            isProcessing.value = false
            showComparison.value = true
            console.log('Comparison view ready:', {
              original: originalImageUrl.value,
              processed: processedImageUrl.value
            })
          }
        }, 50)
      } else if (status.status === 3) {
        clearInterval(pollingInterval.value)
        pollingInterval.value = null
        isProcessing.value = false
        progress.value = 0
        alert('Processing failed, please try again')
      } else {
        if (progress.value < 90) {
          progress.value = Math.min(90, 10 + (retryCount * 1.5))
        }
        processingStatus.value = `Processing: ${progress.value.toFixed(0)}%`
      }
      
      if (retryCount >= MAX_RETRIES) {
        clearInterval(pollingInterval.value)
        pollingInterval.value = null
        isProcessing.value = false
        progress.value = 0
        alert('Processing timeout, please try again')
      }
    } catch (error) {
      console.error('Polling error:', error)
      clearInterval(pollingInterval.value)
      pollingInterval.value = null
      isProcessing.value = false
      progress.value = 0
      alert('Failed to check processing status')
    }
  }, 3000)
}

// 检查订单状态
const checkOrderStatus = async (orderId: string) => {
  try {
    const url = `${ENDPOINTS.ORDER.QUERY}`
    const param = {
      orderId: orderId
    }
    const response = await get(url, param)
    console.log("Order status:", { orderId, response })
    return response
  } catch (error) {
    console.error('Status check error:', error)
    throw error
  }
}

// 增强图片
const enhance = async (imageUrl: string) => {
  try {
    let url = ENDPOINTS.UNBLUR.IMAGE_ENHANCE
    const userApiKey = getUerApiKey();
    let param = {
      userApiKey: userApiKey,
      url: originalImageUrl.value,
      scale: 2,
      faceEnhance: true,
    }
    console.log('Start processing:', param)
    const unblurResp = await post(url, param)
    console.log('Process response:', unblurResp)
    return unblurResp.orderId
  } catch (error) {
    console.error('Enhancement error:', error)
    throw error
  }
}

// 处理图片
const processImage = async () => {
  if (!originalImageUrl.value) {
    console.warn('No image URL to process')
    return
  }
  
  try {
    isProcessing.value = true
    showComparison.value = false
    progress.value = 0
    processingStatus.value = 'Processing...'
    
    console.log('Start processing:', originalImageUrl.value)
    const orderId = await enhance(originalImageUrl.value)
    console.log('Order ID:', orderId)
    
    if (!orderId) {
      throw new Error('Failed to get order ID')
    }
    
    startPolling(orderId)
  } catch (error) {
    console.error('Processing error:', error)
    alert('Failed to process image')
    isProcessing.value = false
  }
}

// 重新上传
const handleReUpload = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
    console.log('Clear polling interval')
  }
  
  // 清理旧的URL
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    console.log('Release preview URL')
  }
  
  // 重置所有状态
  selectedFile.value = null
  previewUrl.value = ''
  showComparison.value = false
  originalImageUrl.value = ''
  processedImageUrl.value = ''
  currentOrderId.value = ''
  processingStatus.value = 'Processing...'
  progress.value = 0
  isDragging.value = false
  
  console.log('Reset all states')
}

// 组件卸载前清理
onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    console.log('Unmounting: Release preview URL')
  }
  
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
    console.log('Unmounting: Clear polling interval')
  }
})

// 错误处理
const handleError = (error: any, context: string) => {
  console.error(`[${context}] Error:`, error)
  const errorMessage = error.message || 'Operation failed, please try again'
  alert(errorMessage)
}

// 导出属性和方法
defineExpose({
  reset: handleReUpload,
  isProcessing,
  progress,
  processingStatus
})
</script>