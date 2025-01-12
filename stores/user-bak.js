// stores/user.js
import { defineStore } from 'pinia'
import ToolUtils from "~/utils/ToolUtils";

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
})
