<template>
    <div>
        <!-- 添加blog的样式 -->
        <!-- https://tailwindui.com/components/marketing/sections/blog-sections -->

      <div class="bg-white py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto ">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center">Blog Posts for AI Music Generator</h1>
            <!-- <p class="mt-2 text-lg leading-8 text-gray-600">Learn how to grow your business with our expert advice.</p> -->
            <div class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
              <article v-for="article in articles" :key="article._path" class="flex  flex-col items-start justify-between">
                <div class="flex items-center gap-x-4 text-xs">
                  <time :datetime="article.datetime" class="text-gray-500">{{ article.date }}</time>
                  <span :href="article._path" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ article.tags[0] }}</span>
                </div>
                <div class="group relative">
                  <h2 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a :href="article._path">
                      <span class="absolute inset-0" />
                      {{ article.title }}
                    </a>
                  </h2>
                  <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ article.description }}</p>
                </div>
                
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const { data: articles } = await useAsyncData('articles', () => queryContent('/blog').find())

  const { t, locale } = useI18n();

  </script>