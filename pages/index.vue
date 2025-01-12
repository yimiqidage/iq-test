<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative bg-white">
      <div class="container mx-auto px-4 py-16">
        <div class="text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-4">Free IQ Test Online</h1>
          <p class="text-xl text-gray-600 mb-8">Take our professional IQ test free of charge - Get your results instantly</p>
          <NuxtLink 
            to="/iq-test" 
            class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Free IQ Test
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Key Benefits Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Why Choose Our Free Online IQ Test?</h2>
        <div class="grid md:grid-cols-4 gap-8">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Professional Standards</h3>
            <p class="text-gray-600">Aligned with international IQ testing methodologies and standards</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Instant Results</h3>
            <p class="text-gray-600">Get your IQ score and detailed analysis immediately after completion</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">100% Free</h3>
            <p class="text-gray-600">No registration required, completely free IQ assessment</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Comprehensive Report</h3>
            <p class="text-gray-600">Detailed analysis of your cognitive strengths and areas for improvement</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Test Overview Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">What Our IQ Test Measures</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Logical Reasoning</h3>
            <p class="text-gray-600">Assess your ability to identify patterns and solve complex problems</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Mathematical Ability</h3>
            <p class="text-gray-600">Evaluate your numerical reasoning and computational skills</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Spatial Recognition</h3>
            <p class="text-gray-600">Test your ability to visualize and manipulate objects mentally</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Verbal Intelligence</h3>
            <p class="text-gray-600">Measure your language comprehension and verbal reasoning</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Memory</h3>
            <p class="text-gray-600">Gauge your short-term memory capacity and recall abilities</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Processing Speed</h3>
            <p class="text-gray-600">Evaluate how quickly you can process and respond to information</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Test Statistics</h2>
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-4xl font-bold text-blue-600 mb-2">500K+</div>
            <p class="text-gray-600">Tests Completed</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-4xl font-bold text-blue-600 mb-2">30-45</div>
            <p class="text-gray-600">Minutes to Complete</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-4xl font-bold text-blue-600 mb-2">40+</div>
            <p class="text-gray-600">Questions</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="text-4xl font-bold text-blue-600 mb-2">4.8/5</div>
            <p class="text-gray-600">User Rating</p>
          </div>
        </div>
      </div>
    </section>

    <!-- User Feedback Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feedback, index) in userFeedback" :key="index" class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center mb-4">
              <img :src="feedback.avatar" alt="User avatar" class="w-12 h-12 rounded-full">
              <div class="ml-4">
                <h4 class="font-semibold">{{ feedback.name }}</h4>
                <div class="flex text-yellow-400">
                  <span v-for="star in 5" :key="star" class="text-lg">★</span>
                </div>
              </div>
            </div>
            <p class="text-gray-600">{{ feedback.comment }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-blue-600">
      <div class="container mx-auto px-4 text-center text-white">
        <h2 class="text-4xl font-bold mb-8">Ready to Discover Your IQ?</h2>
        <p class="text-xl mb-8">Take our free online IQ test now and get instant results</p>
        <NuxtLink 
          to="/test" 
          class="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Start Free Test Now
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const userFeedback = ref([
  {
    name: "John Smith",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    comment: "Extremely professional IQ test with detailed analysis. The questions were challenging yet engaging."
  },
  {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    comment: "The best free IQ test I've found online. Comprehensive results and easy to understand interface."
  },
  {
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    comment: "Very impressed with the depth of analysis. The free report provided valuable insights into my cognitive abilities."
  }
]);
</script>

<style>
/* Add any custom styles here */
</style>