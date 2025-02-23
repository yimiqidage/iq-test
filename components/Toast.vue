<!-- components/UI/Toast.vue -->
<template>
    <Teleport to="body">
      <div 
        aria-live="assertive" 
        class="fixed inset-0 pointer-events-none z-50 flex"
        :class="[
          'items-start justify-center pt-6',
          'sm:items-center sm:p-6'
        ]"
      >
        <!-- Toast Messages Container -->
        <TransitionGroup
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          class="flex flex-col items-center space-y-2 w-auto"
        >
          <div
            v-for="toast in toasts"
            :key="toast.id"
            class="w-auto min-w-[240px] max-w-sm bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden"
            :class="[getPositionClasses(toast.position)]"
          >
            <div class="p-4" :class="[getTypeClasses(toast.type)]">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <!-- Success Icon -->
                  <svg
                    v-if="toast.type === 'success'"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <!-- Error Icon -->
                  <svg
                    v-else-if="toast.type === 'error'"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <!-- Warning Icon -->
                  <svg
                    v-else-if="toast.type === 'warning'"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <!-- Info Icon -->
                  <svg
                    v-else
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="ml-3 w-0 flex-1">
                  <p class="text-sm font-medium">
                    {{ toast.message }}
                  </p>
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                  <button
                    @click="removeToast(toast.id)"
                    class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span class="sr-only">关闭</span>
                    <svg
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
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { useToast } from '~/composables/useToast'
  
  const { toasts, addToast, removeToast } = useToast()
  
  // 根据类型获取对应的样式类
  const getTypeClasses = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-600'
      case 'error':
        return 'bg-red-50 text-red-600'
      case 'warning':
        return 'bg-yellow-50 text-yellow-600'
      default:
        return 'bg-blue-50 text-blue-600'
    }
  }
  
  // 根据位置获取对应的样式类
  const getPositionClasses = (position?: string) => {
    switch (position) {
      case 'top':
        return 'mt-2'
      case 'bottom':
        return 'mb-2'
      default:
        return ''
    }
  }
  
  // 暴露方法给父组件
  defineExpose({
    showToast: addToast
  })
  </script>