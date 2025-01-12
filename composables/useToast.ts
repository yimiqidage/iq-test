// composables/useToast.ts
import { ref } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  position?: 'top' | 'center' | 'bottom'
}

export const useToast = () => {
  const toasts = ref<Toast[]>([])
  let toastId = 0

  const addToast = (message: string, type: Toast['type'] = 'info', position: Toast['position'] = 'center') => {
    const id = toastId++
    toasts.value.push({ id, message, type, position })
    
    // 3秒后自动移除
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    addToast,
    removeToast
  }
}