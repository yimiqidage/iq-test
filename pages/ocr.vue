<!-- pages/ocr.vue -->
<template>
    <div class="container mx-auto px-4 py-8">
      <Toast ref="toast" />
      <div class="flex flex-col md:flex-row gap-8">
        <!-- 左侧上传区域 -->
        <div class="w-full md:w-1/2">
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg h-[600px] relative"
            @dragover.prevent
            @drop.prevent="handleDrop"
            @paste.prevent="handlePaste"
            ref="dropZone"
          >
            <div v-if="!imageUrl" class="h-full flex items-center justify-center flex-col gap-4 p-8">
              <div class="text-gray-500">
                拖拽图片到这里，或者
                <label class="text-blue-500 cursor-pointer hover:text-blue-600">
                  <span>点击上传</span>
                  <input
                    type="file"
                    class="hidden"
                    accept="image/*"
                    @change="handleFileSelect"
                  />
                </label>
              </div>
              <div class="text-sm text-gray-400">支持粘贴图片 (Ctrl + V)</div>
            </div>
            <div v-else class="h-full w-full flex items-center justify-center p-4">
              <img
                :src="imageUrl"
                alt="Selected image"
                class="max-h-full max-w-full object-contain"
              />
              <button
                @click="clearImage"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        <!-- 右侧结果展示区域 -->
        <div class="w-full md:w-1/2">
          <div class="bg-white rounded-lg p-6 shadow-md h-[600px] flex flex-col border-2 border-blue-500/20">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-800">识别结果</h2>
              <button
                v-if="ocrResult"
                @click="copyResult"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
              >
                复制结果
              </button>
            </div>
            <div v-if="loading" class="flex-1 flex flex-col items-center justify-center gap-2">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span class="text-gray-500">识别中...</span>
            </div>
            <div v-else-if="ocrResult" class="flex-1 overflow-y-auto whitespace-pre-wrap bg-gray-50 rounded-lg p-4">
              {{ ocrResult }}
            </div>
            <div v-else class="text-gray-500 flex-1 flex items-center justify-center bg-gray-50 rounded-lg">
              暂无识别结果
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const config = useRuntimeConfig()
  const dropZone = ref(null)
  const imageUrl = ref('')
  const loading = ref(false)
  const ocrResult = ref('')
  const file = ref(null)
  const toast = ref(null)  // Toast 组件引用

  // 引入 useUpload composable
  const { uploadToR2 } = useUpload()
  
  // Toast 方法封装
  const showToast = (message, type = 'info') => {
    toast.value?.showToast(message, type)
  }
  
  // 监听粘贴事件
  onMounted(() => {
    document.addEventListener('paste', handlePaste)
  })
  
  onUnmounted(() => {
    document.removeEventListener('paste', handlePaste)
  })
  
  // 处理文件选择
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      file.value = selectedFile
      imageUrl.value = URL.createObjectURL(selectedFile)
      uploadAndProcess()
    }
  }
  
  // 处理拖放
  const handleDrop = (event) => {
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      file.value = droppedFile
      imageUrl.value = URL.createObjectURL(droppedFile)
      uploadAndProcess()
    }
  }
  
  // 处理粘贴
  const handlePaste = async (event) => {
    const items = event.clipboardData?.items
    if (!items) return
  
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const pastedFile = item.getAsFile()
        file.value = pastedFile
        imageUrl.value = URL.createObjectURL(pastedFile)
        uploadAndProcess()
        break
      }
    }
  }
  
  // 清除图片
  const clearImage = () => {
    imageUrl.value = ''
    file.value = null
    ocrResult.value = ''
  }
  
  // 复制结果
  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(ocrResult.value)
      toast.value?.showToast('复制成功', 'success')
    } catch (err) {
      console.error('复制失败:', err)
      toast.value?.showToast('复制失败', 'error')
    }
  }
  
  // 上传到R2并处理OCR
  const uploadAndProcess = async () => {
    if (!file.value) return
  
    loading.value = true
    try {
      // 1. 使用 useUpload composable 上传到R2
      const uploadResponse = await uploadToR2(file.value)
      
      if (!uploadResponse.success) {
        throw new Error(uploadResponse.error || '上传失败')
      }
      
      const { url } = uploadResponse
  
      // 2. 调用OCR接口
      const ocrResponse = await fetch('/api/ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })
  
      if (!ocrResponse.ok) throw new Error('OCR请求失败')
      
      const { taskId } = await ocrResponse.json()
  
      // 3. 轮询结果
      let retryCount = 5
      const retryInterval = 2000 // 2秒
  
      const queryResult = async () => {
        if (retryCount <= 0) {
          throw new Error('超过最大重试次数')
        }
  
        const queryResponse = await fetch(`/api/ocr/query?taskId=${taskId}`)
        if (!queryResponse.ok) throw new Error('查询失败')
  
        const data = await queryResponse.json()
        
        if (data.status === 'completed') {
          ocrResult.value = data.result
        } else if (data.status === 'processing') {
          retryCount--
          await new Promise(resolve => setTimeout(resolve, retryInterval))
          return queryResult()
        } else {
          throw new Error('OCR处理失败')
        }
      }
  
      await queryResult()
    } catch (error) {
      console.error('处理失败:', error)
      showToast(error.message || '处理失败', 'error')
    } finally {
      loading.value = false
    }
  }
  </script>