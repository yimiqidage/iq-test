<template>
    <div class=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <!-- <h1 class="text-2xl font-bold text-center mb-6">AVIF to JPG Converter</h1> -->
      
      <!-- File Input -->
      <input 
        type="file" 
        ref="fileInputRef"
        @change="handleFileSelect"
        accept=".avif,.jpg,.jpeg,.png"
        class="hidden"
      />
      
      <!-- Select Image Button -->
      <button 
        @click="triggerFileInput"
        class="w-full flex items-center justify-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition mb-6"
      >
        <Icon name="lucide:file-up" class="mr-2" /> Select Image
      </button>
  
      <!-- Image Preview Section -->
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <!-- Original Image Preview -->
        <div class="border-2 border-dashed rounded-lg p-4 text-center">
          <p class="font-semibold mb-4">Original Image</p>
          <template v-if="originalImage">
            <img 
              :src="originalImage" 
              alt="Original" 
              class="max-w-full max-h-72 mx-auto object-contain"
            />
          </template>
          <template v-else>
            <div class="flex flex-col items-center justify-center h-full text-gray-400">
              <Icon name="lucide:image" class="w-16 h-16 mb-4" />
              <p>No image selected</p>
            </div>
          </template>
        </div>
  
        <!-- Converted Image Preview -->
        <div class="border-2 border-dashed rounded-lg p-4 text-center">
          <p class="font-semibold mb-4">Converted Image</p>
          <template v-if="isLoading">
            <div class="flex flex-col items-center justify-center h-full text-gray-500">
              <Icon name="lucide:loader-2" class="w-16 h-16 mb-2 animate-spin" />
              <p>Converting...</p>
            </div>
          </template>
          <template v-else-if="convertedImage">
            <img 
              :src="convertedImage" 
              alt="Converted" 
              class="max-w-full max-h-72 mx-auto object-contain"
            />
          </template>
          <template v-else>
            <div class="flex flex-col items-center justify-center h-full text-gray-400">
              <Icon name="lucide:image" class="w-16 h-16 mb-2" />
              <p>No image converted</p>
            </div>
          </template>
        </div>
      </div>
  
      <!-- Conversion and Download Actions -->
      <div class="flex space-x-4">
        <button 
          @click="convertToJpg"
          :disabled="!originalImage || isLoading"
          class="flex-1 flex items-center justify-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Icon name="lucide:image" class="mr-2" /> Convert to JPG
        </button>
        
        <button 
          @click="downloadImage"
          :disabled="!convertedImage"
          class="flex-1 flex items-center justify-center bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Icon name="lucide:download" class="mr-2" /> Download JPG
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // State variables
  const originalImage = ref(null)
  const convertedImage = ref(null)
  const isLoading = ref(false)
  const fileInputRef = ref(null)
  
  // File selection handler
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        originalImage.value = reader.result
        convertedImage.value = null // Reset converted image
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.value.click()
  }
  
  // Convert to JPG
  const convertToJpg = async () => {
    if (!originalImage.value) return
  
    isLoading.value = true
    try {
      // Create an image element to draw the original image
      const img = new Image()
      img.src = originalImage.value
      
      await new Promise(resolve => {
        img.onload = resolve
      })
  
      // Create a canvas to convert the image
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      
      // Convert to JPG with some compression
      const convertedDataUrl = canvas.toDataURL('image/jpeg', 0.9)
      
      // Simulate a delay to show loading (optional)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      convertedImage.value = convertedDataUrl
    } catch (error) {
      console.error('Conversion error:', error)
      alert('Failed to convert image')
    } finally {
      isLoading.value = false
    }
  }
  
  // Download converted image
  const downloadImage = () => {
    if (!convertedImage.value) return
  
    const link = document.createElement('a')
    link.href = convertedImage.value
    link.download = 'converted_image.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  </script>