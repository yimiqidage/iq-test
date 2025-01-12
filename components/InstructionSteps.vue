<!-- InstructionSteps.vue -->
 <!-- 用途：显示一系列步骤，每个步骤包含一个图片和文字 -->
<template>
    <div class="container mx-auto px-4 py-12">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-6">
          {{ title }}
        </h2>
        <p class="text-lg text-gray-600 mx-auto">
          {{ description }}
        </p>
      </div>
  
      <!-- Steps Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="relative bg-gradient-to-b from-white to-blue-50/50 rounded-2xl p-8 text-center"
        >
          <!-- Step Number -->
          <div class="absolute -top-6 left-1/2 -translate-x-1/2">
            <div class="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center text-2xl font-semibold text-white shadow-lg">
              {{ index + 1 }}
            </div>
          </div>
  
          <!-- Step Content -->
          <div class="mt-8">
            <!-- Image/Icon Container -->
            <div class="mb-6 flex justify-center">
              <div class="bg-blue-500 rounded-full p-4 inline-flex items-center justify-center">
                <img 
                  :src="step.image" 
                  :alt="`Step ${index + 1}`"
                  class="w-12 h-12 object-contain"
                />
              </div>
            </div>
  
            <!-- Step Text -->
            <p class="text-gray-800 text-lg">
              {{ step.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    steps: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(step => 
          typeof step.text === 'string' &&
          typeof step.image === 'string'
        )
      }
    }
  })
  </script>

<style scoped>
img {
  width: 24px;
  height: 24px;
  /* 如果SVG使用了currentColor */
  color: red;
}
</style>