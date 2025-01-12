<template>
  <!-- FAQ -->
  <div class="mx-auto max-w-7xl px-5 md:px-10 md:py-2 lg:py-2">
    <h1 v-if="isFaqPage" class="text-4xl font-bold text-center">{{ t(`index.faq`) }}</h1>
    
    <div class="bg-white">
      <div class="mx-auto sm:pt-4">
        <div class="text-center mb-12">
          <h2 v-if="!isFaqPage" class="text-3xl font-bold leading-10 tracking-tight text-gray-900">{{ t(`${i18nPath}.header`) }}</h2>
        </div>
        <div>
          <dl class="space-y-10">
            <div v-for="(faq, index) in faqs" :key="index">
              <h3 v-if="!isFaqPage" class="text-lg font-semibold leading-7 text-gray-900">{{ faq.question }}</h3>
              <h2 v-else class="text-lg font-semibold leading-7 text-gray-900">{{ faq.question }}</h2>
              <div class="mt-2 text-base leading-7 text-gray-600 whitespace-pre-wrap break-words max-w-full pl-0">
                {{ faq.answer }}
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <p class="font-inter mx-auto mt-4 mb-4 text-center text-base text-gray-500">
      {{ t(`index.more`) }}
      <span class="text-blue-500">hello@unblur.app</span>
    </p>
  </div>
</template>
  
<script setup>
import { defineProps, computed } from 'vue'
import { useI18n } from "vue-i18n";

const props = defineProps({
  isFaqPage: {
    type: Boolean,
    default: false
  },
  num: {
    type: Number,
    default: 9
  },
  i18nPath: {
    type: String,
    required: true
  }
})

const { t } = useI18n();

const faqs = computed(() => {
  const faqArray = [];
  for (let i = 1; i <= props.num; i++) {
    faqArray.push({
      question: t(`${props.i18nPath}.q${i}`),
      answer: t(`${props.i18nPath}.a${i}`),
    });
  }
  return faqArray;
});
</script>