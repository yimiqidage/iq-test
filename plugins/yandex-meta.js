// plugins/yandex-meta.js
// 用于在yandex验证域名所有权


export default defineNuxtPlugin(() => {
    const { yandexId } = useRuntimeConfig().public;
    
    useHead({
      meta: [
        { name: 'yandex-verification', content: yandexId}
      ]
    });
  });
  