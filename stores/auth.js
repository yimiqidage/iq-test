// stores/auth.js

/**
 * 统一管理用户的登录状态，以及是否弹窗。
 * 管理的方式是：在layouts/default.vue中，调用 useAuthStore.showLoginModal来作为判断是否弹窗依据；
 */
import { defineStore } from 'pinia'
import {isLogin} from '@/services/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: isLogin(),
    showLoginModal: false
  }),
  actions: {
    checkLogin() {
      if (!this.isLoggedIn) {
        this.showLoginModal = true
        return false
      }
      return true
    },
    login() {
      this.isLoggedIn = true
      this.showLoginModal = false
    },
    logout() {
      this.isLoggedIn = false
    },
    closeLoginModal() {
        console.log("closeLoginModal execute...")
      this.showLoginModal = false
    }
  }
})