<template>
    <div 
      class="bg-white rounded-lg shadow-lg p-8"
      :class="{ 'opacity-50': isTransitioning }"
    >
      <!-- Question Header -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-800">Question {{ questionNumber }}</h3>
        <p v-if="question.category" class="text-sm text-gray-500">{{ question.category }}</p>
      </div>
      
      <!-- Question Content -->
      <div class="mb-8">
        <!-- Text Question -->
        <p v-if="question.text" class="text-lg mb-4">{{ question.text }}</p>
        
        <!-- Image Question -->
        <div v-if="question.image" class="mb-4">
          <img :src="question.image" :alt="'Question ' + questionNumber" class="max-w-full h-auto mx-auto">
        </div>
        
        <!-- Answer Options -->
        <div class="grid gap-4">
          <button
            v-for="(option, index) in question.options"
            :key="index"
            @click="selectAnswer(index)"
            :disabled="isTransitioning"
            class="p-4 border rounded-lg text-left transition-all duration-300"
            :class="{
              'border-gray-200 hover:border-blue-500': selectedAnswer !== index && !isTransitioning,
              'border-blue-500 bg-blue-50': selectedAnswer === index,
              'cursor-not-allowed opacity-50': isTransitioning
            }"
          >
            <span class="font-medium">{{ String.fromCharCode(65 + index) }}.</span>
            {{ option }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    question: {
      type: Object,
      required: true
    },
    questionNumber: {
      type: Number,
      required: true
    }
  })
  
  const emit = defineEmits(['answer-selected'])
  
  // State
  const selectedAnswer = ref(null)
  const isTransitioning = ref(false)
  
  // Methods
  const selectAnswer = (index) => {
    console.log('Question Card: Answer selected:', index);
    
    if (isTransitioning.value) {
      console.log('Question Card: Ignoring selection during transition');
      return;
    }
    
    selectedAnswer.value = index;
    isTransitioning.value = true;
    
    console.log('Question Card: Emitting answer-selected event');
    emit('answer-selected', index);
    
    // Reset state after transition
    setTimeout(() => {
      console.log('Question Card: Resetting state after transition');
      isTransitioning.value = false;
      selectedAnswer.value = null;
    }, 1000);
  }
  
  // Watch for question changes
  watch(
    () => props.question,
    (newQuestion, oldQuestion) => {
      console.log('Question Card: Question changed');
      console.log('Old question:', oldQuestion);
      console.log('New question:', newQuestion);
      
      // Reset state when question changes
      selectedAnswer.value = null;
      isTransitioning.value = false;
    }
  )
  </script>