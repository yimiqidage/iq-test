<!-- components/CanonicalLink.vue -->
<template>
    <Head>
      <Link rel="canonical" :href="canonicalUrl" />
    </Head>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRuntimeConfig } from '#app'
  
  const route = useRoute()
  const config = useRuntimeConfig()
  
  const canonicalUrl = computed(() => {
    
    const baseUrl = config.public.domain // 从配置中获取baseUrl，如果未设置则使用默认值
    const path = route.path
    // console.log("canonicalUrl:",`${baseUrl}${path}`)
    return `${baseUrl}${path}`
  })
  </script>