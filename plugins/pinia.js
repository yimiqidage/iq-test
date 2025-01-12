// plugins/pinia.js
// 用来进行全局状态管理
import { createPinia } from 'pinia'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)
})
