<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <NuxtLink to="/blog" class="text-2xl font-bold text-gray-900 mb-4 sm:mb-0 hover:text-blue-600 transition duration-300 ">
          XAAI Music Blog
        </NuxtLink>
        <NuxtLink to="/" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 shadow-md hover:shadow-lg">
          Create Your AI Music
        </NuxtLink>
      </div>

      <article class="bg-white overflow-hidden shadow-lg rounded-xl">
        <div class="px-6 py-8 sm:p-10">
          <slot />
        </div>
      </article>
    </main>
  </div>
</template>

<script setup>
// Any necessary logic can be added here
</script>