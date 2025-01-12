<template>
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-4xl">
        <!-- Score Card -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-12 text-center">
            <h1 class="text-3xl font-bold text-white mb-4">Your IQ Test Results</h1>
            <div class="text-6xl font-bold text-white mb-2">{{ score }}</div>
            <p class="text-blue-100">Completed in {{ formatTime(timeSpent) }}</p>
          </div>
  
          <!-- Performance Analysis -->
          <div class="p-8">
            <!-- Score Distribution -->
            <div class="mb-8">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Score Distribution</h2>
              <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-blue-500 transition-all duration-500"
                  :style="{ width: `${(score / maxPossibleScore) * 100}%` }"
                ></div>
              </div>
              <div class="flex justify-between mt-2 text-sm text-gray-600">
                <span>0</span>
                <span>{{ maxPossibleScore }}</span>
              </div>
            </div>
  
            <!-- Category Performance -->
            <div class="mb-8">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Performance by Category</h2>
              <div class="space-y-4">
                <div v-for="category in categoryPerformance" :key="category.name">
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium text-gray-700">{{ category.name }}</span>
                    <span class="text-sm text-gray-600">{{ category.score }}%</span>
                  </div>
                  <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-blue-500"
                      :style="{ width: `${category.score}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Share Section -->
            <div class="border-t pt-8">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Share Your Results</h2>
              
              <!-- Share Buttons -->
              <div class="flex gap-4 mb-6">
                <button
                  v-for="platform in sharePlatforms"
                  :key="platform.name"
                  @click="shareResult(platform.name)"
                  class="flex items-center justify-center px-4 py-2 rounded-lg transition-colors"
                  :class="platform.style"
                >
                  <!-- Facebook Icon -->
                  <svg v-if="platform.name === 'Facebook'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <!-- Twitter Icon -->
                  <svg v-if="platform.name === 'Twitter'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                  <!-- Share Icon -->
                  <svg v-if="platform.name === 'Share'" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  {{ platform.name }}
                </button>
              </div>
  
              <!-- Challenge Link -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between items-center">
                  <input
                    type="text"
                    :value="challengeLink"
                    readonly
                    class="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                  />
                  <button
                    @click="copyLink"
                    class="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Action Buttons -->
            <div class="flex gap-4 mt-8">
              <button
                @click="retakeTest"
                class="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Take Test Again
              </button>
              
            </div>
          </div>
        </div>
  
        <!-- Results Analysis Card -->
        <div class="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Detailed Analysis</h2>
          
          <!-- Strengths -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-700 mb-3">Your Strengths</h3>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(strength, index) in strengths" :key="index" class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ strength }}
              </li>
            </ul>
          </div>
  
          <!-- Areas for Improvement -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-700 mb-3">Areas for Improvement</h3>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(area, index) in improvementAreas" :key="index" class="flex items-start">
                <svg class="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {{ area }}
              </li>
            </ul>
          </div>
  
          <!-- Percentile Ranking -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Your Ranking</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-800">Top {{ percentile }}%</div>
                <p class="text-gray-600">You performed better than {{ percentile }}% of all test takers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';

// Constants and State
const score = ref(115);
const maxPossibleScore = 150;
const timeSpent = ref(1200);
const percentile = ref(85);
const challengeLink = ref(''); // Initialize empty

// Category Performance Data
const categoryPerformance = ref([
  { name: 'Logic Reasoning', score: 85 },
  { name: 'Pattern Recognition', score: 92 },
  { name: 'Mathematical Thinking', score: 78 },
  { name: 'Spatial Visualization', score: 88 }
]);

// Share Platform Configurations
const sharePlatforms = [
  {
    name: 'Facebook',
    style: 'bg-blue-600 text-white hover:bg-blue-700'
  },
  {
    name: 'Twitter',
    style: 'bg-sky-500 text-white hover:bg-sky-600'
  },
  {
    name: 'Share',
    style: 'bg-gray-800 text-white hover:bg-gray-900'
  }
];

// Analysis Data
const strengths = ref([
  'Exceptional pattern recognition abilities',
  'Strong logical reasoning skills',
  'Above average spatial visualization',
  'Quick processing of complex information'
]);

const improvementAreas = ref([
  'Mathematical problem-solving speed',
  'Abstract reasoning in certain scenarios',
  'Time management during complex tasks'
]);

// Methods
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

const shareResult = (platform) => {
  if (typeof window === 'undefined') return;
  
  const text = `I just scored ${score.value} on the IQ Test! Can you beat my score?`;
  const url = challengeLink.value;

  switch (platform) {
    case 'Facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
      break;
    case 'Twitter':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`);
      break;
    case 'Share':
      if (navigator.share) {
        navigator.share({
          title: 'My IQ Test Result',
          text: text,
          url: url
        });
      }
      break;
  }
};

const copyLink = async () => {
  if (typeof window === 'undefined') return;
  
  try {
    await navigator.clipboard.writeText(challengeLink.value);
    alert('Link copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const retakeTest = () => {
  navigateTo('/iq-test');
};

const viewAnswers = () => {
  navigateTo('/answers');
};

// Lifecycle Hooks
onMounted(() => {
  // Set the challenge link only after component is mounted (client-side)
  if (typeof window !== 'undefined') {
    challengeLink.value = window.location.href;
  }
  
  // You can get actual test results from route or store here
  // const route = useRoute();
  // const testResults = JSON.parse(route.query.results);
});
</script>