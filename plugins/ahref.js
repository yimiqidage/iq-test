// plugins/ahref.js
// 用于在ahref验证域名所有权
  export default defineNuxtPlugin(() => {
    const { ahrefId } = useRuntimeConfig().public;
    useHead({
      meta: [
        { name: 'ahrefs-site-verification', content: ahrefId}
      ]
    });
  });
  