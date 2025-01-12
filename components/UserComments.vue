<template>
    <div class="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
      <div class="flex-shrink-0">
        <img 
          :src="avatarUrl" 
          :alt="name" 
          class="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <div class="flex-grow">
        <div class="flex flex-col">
          <h3 class="text-lg font-semibold text-gray-800">{{ name }}</h3>
          <p class="text-sm text-gray-500">{{ position }}</p>
          <p class="mt-2 text-gray-600 italic">
            "{{ testimonial }}"
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // 定义组件接收的props以及默认值
  defineProps({
    name: {
      type: String,
      default: 'Anonymous'
    },
    position: {
      type: String,
      default: 'User'
    },
    avatarUrl: {
      type: String,
      default: '/default-avatar.png'
    },
    testimonial: {
      type: String,
      default: 'No testimonial provided.'
    }
  })
  </script>
  
  <style scoped>
  /* 这里可以添加组件内部的样式，如果有需要的话 */
  </style>