// components/CookieConsent.vue
<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(false)
const showPreferences = ref(false)

const cookiePreferences = ref({
  targeting: false,
  performance: false,
  functional: false
})

onMounted(() => {
  const hasConsent = localStorage.getItem('cookieConsent')
  if (!hasConsent) {
    showBanner.value = true
  }
})

const saveCookiePreferences = () => {
  localStorage.setItem('cookieConsent', 'true')
  localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences.value))
  showBanner.value = false
  showPreferences.value = false
}

const openPreferences = () => {
  showPreferences.value = true
}

const acceptAll = () => {
  cookiePreferences.value = {
    targeting: true,
    performance: true,
    functional: true
  }
  saveCookiePreferences()
}

const rejectAll = () => {
  cookiePreferences.value = {
    targeting: false,
    performance: false,
    functional: false
  }
  saveCookiePreferences()
}
</script>

<template>
  <!-- Bottom Banner -->
  <div v-if="showBanner" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-50">
    <div class="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <p class="text-gray-600 text-sm max-w-[600px]">
        This website uses cookies and similar technologies to ensure functionality, evaluate website usage, and to serve marketing content. Visit
        <button @click="openPreferences" class="text-blue-600 hover:underline">Cookie Policy</button>
        and 
        <NuxtLink to="/privacy-policy" class="text-blue-600 hover:underline">Privacy Policy</NuxtLink>
        for more information.
      </p>
      <div class="flex flex-row gap-2 justify-end sm:flex-shrink-0">
        <button @click="openPreferences" 
          class="min-w-[100px] sm:min-w-[120px] px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Cookies Settings
        </button>
        <button @click="rejectAll" 
          class="min-w-[100px] sm:min-w-[120px] px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-[#4B1E91] rounded-lg hover:bg-[#3B1771]">
          Reject Cookies
        </button>
        <button @click="acceptAll" 
          class="min-w-[100px] sm:min-w-[120px] px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-[#4B1E91] rounded-lg hover:bg-[#3B1771]">
          Accept Cookies
        </button>
      </div>
    </div>
  </div>

  <!-- Preferences Side Panel -->
  <div v-if="showPreferences" class="fixed inset-0 bg-black bg-opacity-50 z-50">
    <div class="fixed left-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl overflow-y-auto">
      <div class="p-4 sm:p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl sm:text-2xl text-gray-700">Privacy Preference Center</h2>
          <button @click="showPreferences = false" class="text-gray-500 hover:text-gray-700">
            <span class="text-2xl">&times;</span>
          </button>
        </div>

        <p class="text-gray-600 text-sm sm:text-base mb-8">
          When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. 
          This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to.
          The information does not usually directly identify you, but it can give you a more personalized web experience.
        </p>

        <div class="space-y-4">
          <!-- Targeting Cookies -->
          <div class="border rounded-lg p-4">
            <div class="flex justify-between items-center">
              <h3 class="text-base sm:text-lg font-medium text-gray-700">Targeting Cookies</h3>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="cookiePreferences.targeting" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4B1E91]"></div>
              </label>
            </div>
          </div>

          <!-- Performance Cookies -->
          <div class="border rounded-lg p-4">
            <div class="flex justify-between items-center">
              <h3 class="text-base sm:text-lg font-medium text-gray-700">Performance Cookies</h3>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="cookiePreferences.performance" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4B1E91]"></div>
              </label>
            </div>
          </div>

          <!-- Functional Cookies -->
          <div class="border rounded-lg p-4">
            <div class="flex justify-between items-center">
              <h3 class="text-base sm:text-lg font-medium text-gray-700">Functional Cookies</h3>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="cookiePreferences.functional" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4B1E91]"></div>
              </label>
            </div>
          </div>

          <!-- Strictly Necessary Cookies -->
          <div class="border rounded-lg p-4">
            <div class="flex justify-between items-center">
              <h3 class="text-base sm:text-lg font-medium text-gray-700">Strictly Necessary Cookies</h3>
              <span class="text-blue-600">Always Active</span>
            </div>
          </div>
        </div>

        <div class="mt-8 space-y-3">
          <button @click="rejectAll" class="w-full px-4 py-2 text-center border border-[#4B1E91] text-[#4B1E91] rounded-lg hover:bg-purple-50">
            Reject All
          </button>
          <button @click="saveCookiePreferences" class="w-full px-4 py-2 text-center text-white bg-[#4B1E91] rounded-lg hover:bg-[#3B1771]">
            Confirm My Choices
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
