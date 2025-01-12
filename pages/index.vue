<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Hero Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Professional Online Unblur Image Tool
        </h1>
        <p class="text-xl text-gray-600 mb-8  mx-auto">
          Our advanced unblur image technology helps you restore and enhance blurry photos with professional-grade results.
        </p>
        <NuxtLink
          to="/unblur-image"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition duration-300 text-lg"
        >
          Unblur Your Image Now
        </NuxtLink>
      </div>
    </section>

     <!-- Video Section -->
     <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto relative" style="padding-bottom: 56.25%;">
          <iframe
            class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/_hzNUq_XK6c?si=iFCIWq2pgMxcJ1o5"
            title="unblur image free onlin"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Feature 1 -->
          <div class="text-center">
            <div class="text-4xl mb-4">🚀</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Advanced Unblur Image AI
            </h3>
            <p class="text-gray-600">
              Our advanced AI enhancement technology uses sophisticated algorithms to analyze and restore every detail of your photos.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center">
            <div class="text-4xl mb-4">✨</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Quick Image Unblur Process
            </h3>
            <p class="text-gray-600">
              Experience instant photo clarity with our AI-powered image enhancement technology, transforming blurry shots into sharp, professional results.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Professional Unblur Results
            </h3>
            <p class="text-gray-600">
              Get professional-quality results when you unblur images using our advanced enhancement technology.
            </p>
          </div>
        </div>
      </div>
    </section>

   
    
  </div>
</template>

<script setup>
useHead({
  title: 'Unblur Image | Transform Blurry Photos to Crystal Clear Images | unblur.app',
  meta: [
    {
      name: 'description',
      content: 'Transform your blurry photos into crystal clear images with our advanced AI-powered unblur tool. Free online image enhancement service to fix and sharpen blurry pictures instantly.'
    },
    {
      name: 'keywords',
      content: 'unblur image, fix blurry photos, image enhancement, sharpen photos, AI image correction'
    }
  ]
})
</script>