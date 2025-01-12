<template>
  <div class="flex flex-col md:flex-row items-center gap-12 py-2 px-4 max-w-7xl mx-auto">
    <!-- Image Section -->
    <div :class="[
      'shrink-0',  // 防止图片区域被压缩
      imagePosition === 'right' ? 'md:order-2' : 'md:order-1'
    ]">
      <div class="relative flex justify-center items-center">
        <div class="max-h-[400px] w-fit"> <!-- 使用 w-fit 让容器适应图片实际大小 -->
          <img 
            :src="imageSrc" 
            :alt="imageAlt"
            class="rounded-lg shadow-lg object-contain max-h-[400px] w-auto"
          />

          

        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div :class="[
      'grow space-y-6',  // 使用 grow 让文字区域占据剩余空间
      imagePosition === 'right' ? 'md:order-1' : 'md:order-2'
    ]">
      <h2 class="text-3xl font-bold text-gray-900">
        {{ title }}
      </h2>
      <p class="text-lg text-gray-600">
        {{ description }}
      </p>
      <button 
        @click="scrollToTop"
        class="inline-block px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // Image properties
  imageSrc: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: 'Section image'
  },
  imagePosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  
  // Content properties
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  buttonLink: {
    type: String,
    required: true
  }
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>