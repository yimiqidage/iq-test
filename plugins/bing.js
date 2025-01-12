// plugins/bing.js
// 用于在bing验证域名所有权


export default defineNuxtPlugin(() => {
    const { bingId } = useRuntimeConfig().public;
    useHead({
      meta: [
        { name: 'msvalidate.01', content: bingId}
      ]
    });
  });
  
