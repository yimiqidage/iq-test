<template>
    <NuxtLayout name="blog">
      <article>
        <h1 class="text-2xl sm:text-3xl md:text-2xl font-extrabold text-gray-900 mb-4 sm:mb-6">
          {{ article.title }}
        </h1>
        <div class="prose prose-sm sm:prose lg:prose-lg prose-blue max-w-none">
          <ContentRenderer :value="article" />
        </div>
      </article>
      <div class="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center border-t pt-4">
        <span class="text-sm text-gray-500 mb-2 sm:mb-0">
          Published on {{ formatDate(article.date) }}
        </span>
        <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 font-medium">
          Back to Home
        </NuxtLink>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const { data: article } = await useAsyncData(`content-${route.path}`, () =>
    queryContent().where({ _path: route.path }).findOne()
  )
  
  useHead(() => ({
    title: article.value.title,
    meta: [
      { name: 'description', content: article.value.description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'canonical', href: `https://xaaimusic.com${route.path}` }
    ]
  }))
  
  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  </script>