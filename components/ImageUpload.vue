<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'

// 基础状态管理
const isHovering = ref(false)
const selectedFile = ref(null)
const isLoading = ref(false)
const processingQueue = ref(1)
const processingTime = ref(0)
const showComparison = ref(false)
const previewUrl = ref('')
const fileInput = ref(null)

// 存储图片URL
const originalImageUrl = ref('')
const processedImageUrl = ref('')

// 存储图片尺寸
const imageSize = ref({
  width: 0,
  height: 0
})

// 计算容器类名
const containerClasses = computed(() => ({
  'min-h-[400px]': true,
  'flex items-center justify-center': !selectedFile.value,
  'flex flex-col justify-center': selectedFile.value,
}))

// 计算预览图片容器样式
const previewContainerStyle = computed(() => {
  if (!imageSize.value.width || !imageSize.value.height) {
    return {
      aspectRatio: '16/9',
      maxHeight: '320px'
    }
  }

  const aspectRatio = imageSize.value.width / imageSize.value.height
  const maxWidth = 1200
  const maxHeight = 600
  let finalWidth, finalHeight

  if (aspectRatio > maxWidth / maxHeight) {
    // 如果图片较宽，以最大宽度为准
    finalWidth = maxWidth
    finalHeight = maxWidth / aspectRatio
  } else {
    // 如果图片较高，以最大高度为准
    finalHeight = maxHeight
    finalWidth = maxHeight * aspectRatio
  }

  return {
    aspectRatio: `${aspectRatio}`,
    width: `${finalWidth}px`,
    height: `${finalHeight}px`,
    margin: '0 auto'
  }
})

// 图片预览处理
const previewImage = (file) => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        imageSize.value = {
          width: img.width,
          height: img.height
        }
        resolve()
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)

    previewUrl.value = URL.createObjectURL(file)
    selectedFile.value = file
  })
}

// 模拟API调用
const mockUploadAPI = async (file) => {
  const localUrl = URL.createObjectURL(file)
  await new Promise(resolve => setTimeout(resolve, 2000))
  return {
    original: localUrl,
    processed: localUrl,
    success: true
  }
}

// 文件选择处理
const handleFileSelect = async (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    await previewImage(file)
  }
}

// 拖拽处理
const handleDragOver = (event) => {
  event.preventDefault()
  isHovering.value = true
}

const handleDragLeave = (event) => {
  event.preventDefault()
  isHovering.value = false
}

const handleDrop = async (event) => {
  event.preventDefault()
  isHovering.value = false
  
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    await previewImage(file)
  }
}

// 开始处理图片
const startProcessing = async () => {
  if (!selectedFile.value) return
  
  try {
    isLoading.value = true
    showComparison.value = false
    processingTime.value = 0
    
    const timer = setInterval(() => {
      processingTime.value += 0.1
    }, 100)
    
    const response = await mockUploadAPI(selectedFile.value)
    
    clearInterval(timer)
    
    if (response.success) {
      originalImageUrl.value = response.original
      processedImageUrl.value = response.processed
      showComparison.value = true
    }
    
    isLoading.value = false
  } catch (error) {
    console.error('Upload failed:', error)
    isLoading.value = false
  }
}

// 重新上传处理
const handleReUpload = () => {
  showComparison.value = false
  originalImageUrl.value = ''
  processedImageUrl.value = ''
  processingTime.value = 0
  selectedFile.value = null
  previewUrl.value = ''
  imageSize.value = { width: 0, height: 0 }
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 下载处理
const handleDownload = () => {
  if (processedImageUrl.value) {
    const link = document.createElement('a')
    link.href = processedImageUrl.value
    link.download = `processed-${selectedFile.value?.name || 'image.jpg'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// 清理资源
onBeforeUnmount(() => {
  if (originalImageUrl.value?.startsWith('blob:')) {
    URL.revokeObjectURL(originalImageUrl.value)
  }
  if (processedImageUrl.value?.startsWith('blob:')) {
    URL.revokeObjectURL(processedImageUrl.value)
  }
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>
<template>
    <div class="w-full bg-gray-50">
      <!-- 上传区域 -->
      <div v-if="!isLoading && !showComparison" 
        class="w-full bg-white rounded-2xl p-4 md:p-8 shadow-lg">
        <div 
          class="border-2 border-dashed rounded-xl relative transition-colors duration-200"
          :class="[
            isHovering ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
            selectedFile ? 'p-4' : 'p-8'
          ]"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
        >
          <input
            type="file"
            accept="image/*"
            class="hidden"
            ref="fileInput"
            @change="handleFileSelect"
          />
          
          <!-- 固定高度容器 -->
          <div :class="containerClasses">
            <!-- 预览区域 -->
            <div v-if="selectedFile && previewUrl" 
              class="w-full transition-all duration-300 ease-in-out">
              <!-- 预览图片容器 -->
              <div class="flex justify-center">
                <div 
                  class="relative rounded-lg overflow-hidden bg-gray-100 mb-4"
                  :style="previewContainerStyle"
                >
                  <img 
                    :src="previewUrl" 
                    alt="Preview" 
                    class="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <!-- 图片信息和操作按钮 -->
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center space-x-2">
                  <p class="text-sm text-gray-600 truncate max-w-[200px]">
                    {{ selectedFile.name }}
                  </p>
                  <span class="text-xs text-gray-400">
                    {{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB
                  </span>
                </div>
                <div class="flex gap-2">
                  <button 
                    @click="handleReUpload"
                    class="text-gray-600 hover:text-gray-800 text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    @click="startProcessing"
                    class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 text-sm transition-colors"
                  >
                    Process Image
                  </button>
                </div>
              </div>
            </div>
  
            <!-- 上传按钮区域 -->
            <div v-else class="text-center w-full">
              <button 
                @click="$refs.fileInput.click()"
                class="w-64 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 mb-4 transition-colors mx-auto block"
              >
                Upload Image
              </button>
              <p class="text-gray-500 text-center text-sm">
                Or drag and drop an image here
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Loading 状态 -->
      <div v-if="isLoading" 
        class="w-full bg-white rounded-2xl p-4 md:p-8 shadow-lg">
        <div class="min-h-[400px] flex flex-col items-center justify-center">
          <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p class="text-gray-700 mb-2 text-lg">Processing your image...</p>
          <p class="text-gray-500 text-sm">
            Queue: {{ processingQueue }} Wait: {{ processingTime.toFixed(1) }}s
          </p>
        </div>
      </div>
  
      <!-- 对比视图 -->
      <div v-if="showComparison" class="w-full">
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div 
            class="min-h-[400px] flex items-center justify-center"
            :style="previewContainerStyle"
          >
            <ImageComparisonSlider
              :before-image="originalImageUrl"
              :after-image="processedImageUrl"
              class="w-full h-full"
            />
          </div>
        </div>
  
        <!-- 操作按钮 -->
        <div class="flex gap-4 mt-4">
          <button 
            @click="handleDownload"
            class="flex-1 bg-gray-800 hover:bg-gray-900 text-white rounded-lg py-3 transition-colors flex items-center justify-center gap-2"
          >
            <span>Download</span>
          </button>
          <button 
            @click="handleReUpload"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition-colors flex items-center justify-center gap-2"
          >
            <span>Re-upload</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .min-h-[400px] {
    transition: all 0.3s ease-in-out;
  }
  
  .image-preview-container {
    transition: all 0.3s ease-in-out;
  }
  
  @media (max-width: 640px) {
    .rounded-2xl {
      border-radius: 1rem;
    }
    
    .min-h-[400px] {
      min-height: 300px;
    }
  
    /* 移动端优化 */
    .max-w-[200px] {
      max-width: 150px;
    }
    
    /* 确保按钮在移动端也有合适的大小 */
    .w-64 {
      width: 100%;
      max-width: 256px;
    }
  }
  </style>