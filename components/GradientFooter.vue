<template>
  <footer class="bg-white border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- 主要内容区域 -->
      <div class="flex flex-wrap -mx-4">
        <!-- Products -->
        <div class="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">
            {{ $t('footer.products.title') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="(link, index) in localizedProducts" :key="index">
              <NuxtLink
                :to="link.url"
                class="text-gray-600 hover:text-blue-600 transition-colors duration-200 block"
              >
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Company -->
        <div class="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">
            {{ $t('footer.company.title') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="(link, index) in localizedCompany" :key="index">
              <NuxtLink
                :to="link.url"
                class="text-gray-600 hover:text-blue-600 transition-colors duration-200 block"
              >
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        
        
        <!-- Friend Links -->
        <div class="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">
            {{ $t('footer.friendLinks.title') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="(link, index) in localizedFriendLinks" :key="index">
              <a
                :href="link.url"
                class="text-gray-600 hover:text-blue-600 transition-colors duration-200 inline-flex items-center"
                :rel="link.noref ? 'nofollow noreferrer' : ''"
                target="_blank"
              >
                {{ link.title }}
                <svg
                  class="w-4 h-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <p class="text-center text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} {{ domain }} {{ $t('footer.copyright') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const localizedProducts = computed(() => [
  { title: t('footer.products.iqTest'), url: '/iq-test' },
  { title: t('footer.products.iqTestFree'), url: '/iq-test' },
])

const localizedCompany = computed(() => [
  { title: t('footer.company.about'), url: '/company/about' },
  { title: t('footer.company.contact'), url: '/company/contact' },
  { title: t('footer.company.privacy'), url: '/company/privacy' },
  { title: t('footer.company.terms'), url: '/company/terms' },
])

const localizedFriendLinks = computed(() => [
  {
    title: 'aiheron',
    url: 'https://www.aiheron.com/',
    noref: true
  }
])

const domain = useRuntimeConfig().public.domain.substring(8);
</script>