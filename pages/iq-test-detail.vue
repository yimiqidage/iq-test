<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="text-xl">Loading question...</div>
      </div>

      <template v-else>
        <!-- Timer and Progress Bar -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div class="flex justify-between items-center mb-4">
            <div class="text-xl font-semibold">
              Question {{ currentQuestion + 1 }} of {{ totalQuestions }}
            </div>
            <div class="text-xl font-semibold" :class="{ 'text-red-500': timeLeft < 300 }">
              {{ formatTime(timeLeft) }}
            </div>
          </div>
          
          <!-- Time Progress Bar -->
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-blue-500 transition-all duration-1000"
              :class="{ 'bg-red-500': timeLeft < 300 }"
              :style="{ width: `${(timeLeft / totalTime) * 100}%` }"
            ></div>
          </div>
  
          <!-- Question Progress Bar -->
          <div class="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div
              class="h-full bg-green-500 transition-all duration-300"
              :style="{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }"
            ></div>
          </div>
        </div>
  
        <!-- Question Component -->
        <IqQuestionCard
          v-if="currentQuestionData"
          :question="currentQuestionData"
          :questionNumber="currentQuestion + 1"
          @answer-selected="handleAnswer"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Constants
const totalQuestions = 5;
const totalTime = 30 * 60; // 30 minutes in seconds

// State
const currentQuestion = ref(0);
const timeLeft = ref(totalTime);
const answers = ref(new Array(totalQuestions).fill(null));
const questions = ref(new Array(totalQuestions).fill(null));
const loading = ref(false);
let timer;

// Computed
const currentQuestionData = computed(() => {
  console.log('Current question data:', questions.value[currentQuestion.value]);
  return questions.value[currentQuestion.value];
});

// 获取已回答题目的 ID 列表
const answeredQuestionIds = computed(() => {
  return questions.value
    .filter((q, index) => answers.value[index] !== null)
    .map(q => q?.id)
    .filter(Boolean)
    .join(',');
});

// Methods
const fetchQuestion = async () => {
  console.log('Fetching question started');
  loading.value = true;
  try {
    const response = await fetch(`/api/questions?answered=${answeredQuestionIds.value}`);
    const result = await response.json();
    
    if (result.success) {
      console.log('Question fetched successfully:', result.data);
      questions.value[currentQuestion.value] = result.data;
    } else {
      console.error('Failed to fetch question:', result.error);
    }
  } catch (error) {
    console.error('Error fetching question:', error);
  } finally {
    loading.value = false;
    console.log('Fetch question completed');
  }
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const handleAnswer = async (answerIndex) => {
  console.log('Handle answer called with index:', answerIndex);
  console.log('Current question before update:', currentQuestion.value);
  
  // Record the answer
  answers.value[currentQuestion.value] = answerIndex;
  
  // Wait for 1 second before moving to next question
  setTimeout(async () => {
    console.log('Timeout triggered for next question');
    if (currentQuestion.value < totalQuestions - 1) {
      currentQuestion.value++;
      console.log('Moved to next question:', currentQuestion.value);
      
      // Load next question if not already loaded
      if (!questions.value[currentQuestion.value]) {
        console.log('Loading next question');
        await fetchQuestion();
      }
    } else {
      console.log('Test completed, submitting');
      submitTest();
    }
  }, 1000);
};

const submitTest = () => {
  console.log('Submitting test');
  // Handle test submission
  navigateTo('/iq-test-result');
};

// Timer setup
onMounted(async () => {
  console.log('Component mounted');
  // Load first question
  await fetchQuestion();
  
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      console.log('Time up, submitting test');
      submitTest();
    }
  }, 1000);
});

onUnmounted(() => {
  console.log('Component unmounting, clearing timer');
  clearInterval(timer);
});
</script>