import { useI18n } from 'vue-i18n'

// conmposables 是为了定义全局可用的函数，在多个页面和组件中进行复用
export function useLang() {
  const { t } = useI18n()
  return {
    t,
  }
}
