<!-- pages/test-instructions.vue -->
<template>
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-4xl">
        <!-- Main Instructions Card -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 class="text-3xl font-bold text-center mb-8">Free IQ Test Instructions</h1>
          
          <!-- Test Overview -->
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="bg-blue-50 p-6 rounded-lg text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">40</div>
              <div class="text-gray-600">Questions</div>
            </div>
            <div class="bg-blue-50 p-6 rounded-lg text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">45</div>
              <div class="text-gray-600">Minutes</div>
            </div>
            <div class="bg-blue-50 p-6 rounded-lg text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">150</div>
              <div class="text-gray-600">Maximum Score</div>
            </div>
          </div>
  
          <!-- Key Instructions -->
          <div class="space-y-6 mb-8">
            <h2 class="text-2xl font-semibold mb-4">Test Instructions</h2>
            <div class="bg-gray-50 p-6 rounded-lg space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">1</div>
                <p>The test consists of <strong>40 questions</strong> covering various aspects of intelligence including logical reasoning, pattern recognition, numerical sequences, and spatial visualization.</p>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">2</div>
                <p>You have <strong>45 minutes</strong> to complete the test. A timer will be displayed to help you track your remaining time.</p>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">3</div>
                <p>After selecting your answer, you'll automatically advance to the next question to help you maintain a good pace.</p>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">4</div>
                <p>Upon completion, you'll receive your IQ score and a detailed analysis of your cognitive abilities. You can share your results on social media.</p>
              </div>
            </div>
          </div>
  
         
  
         <!-- Start Button -->
        <div class="text-center">
        <a 
            href="/iq-test-detail"
            class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
            Start IQ Test Now
        </a>
        <p class="mt-4 text-gray-600">By starting the test, you agree to our terms and privacy policy</p>
        </div>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const router = useRouter();
  
  const startTest = () => {
    router.push('/iq-test-detail');
  };
  </script>