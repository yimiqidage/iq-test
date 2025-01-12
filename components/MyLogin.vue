<template>
  <teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center" style="pointer-events: none;">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative bg-white p-6 rounded-lg max-w-sm mx-auto text-center" style="pointer-events: auto;">
        <!-- 右上角的关闭按钮 -->
        <button @click="close" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="flex flex-col items-center justify-center p-4 space-y-4">
          
          <div>
            <!-- <svg   t="1720322543565" class="icon mx-auto h-10 w-auto" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="2542" width="30" height="30">
              <path
                d="M950.857143 128V768c0 80.566857-120.576 109.714286-182.857143 109.714286s-182.857143-29.147429-182.857143-109.714286 120.576-109.714286 182.857143-109.714286c37.705143 0 75.446857 6.838857 109.714286 22.272v-306.870857l-438.857143 135.424v405.138286c0 80.566857-120.576 109.714286-182.857143 109.714286s-182.857143-29.147429-182.857143-109.714286 120.576-109.714286 182.857143-109.714286c37.705143 0 75.446857 6.838857 109.714286 22.272V274.249143c0-23.990857 16.018286-45.129143 38.838857-52.553143l475.428571-146.285714c5.156571-1.718857 10.276571-2.304 16.018286-2.304a54.857143 54.857143 0 0 1 54.857143 54.857143z"
                fill="#1296db" p-id="2543"></path>
            </svg> -->

            
            <!-- <img class="aspect-w-1 aspect-h-1 w-2/5 mx-auto" :src="logoUrl" alt="Image"> -->

            
            <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
            <p class="my-2 text-center text-xl  leading-9 tracking-tight text-gray-900">{{ t('login.title_desc') }}</p>
          </div>

          <!-- 第三行：Google 登录按钮 -->
          <div class="pr-2">
            <GoogleLogin />
          </div>
        </div>
      </div>

    </div>
  </teleport>

</template>

<script setup>
import { ref, defineEmits } from 'vue'
const { t, locale } = useI18n();
const emit = defineEmits(['close'])
const show = ref(true)
const logoUrl = "https://r2.vyourtime.com/aimusic-compress.png";

/**
 * 关闭按钮，需要向父组件触发close事件。在父组件中，通过 @close 监听close 事件 ，对应的就是layouts/default.vue中的 @close="authStore.closeLoginModal()" 这段代码
 */
const close = () => {
  show.value = false
  emit('close')
}
</script>

<style scoped>
/* 可以添加任何需要的样式 */
</style>