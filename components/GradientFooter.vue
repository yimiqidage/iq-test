<template>
  <footer class="w-full py-8 px-4 mt-auto bg-white">
    <div class="max-w-7xl mx-auto">
      <!-- 三栏布局区域 -->
      <div class="flex flex-col md:flex-row justify-between">
        <!-- Quick Links (原 Products) -->
        <div class="mb-6 md:mb-0">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            {{ $t('footer.products.title') }}
          </h3>
          <ul class="flex flex-col space-y-2">
            <li v-for="(link, index) in localizedProducts" :key="index">
              <NuxtLink
                :to="link.url"
                class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal (原 Company) -->
        <div class="mb-6 md:mb-0">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            {{ $t('footer.company.title') }}
          </h3>
          <ul class="flex flex-col space-y-2">
            <li v-for="(link, index) in localizedCompany" :key="index">
              <NuxtLink
                :to="link.url"
                class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Friend Links -->
        <div class="mb-6 md:mb-0">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            {{ $t('footer.friendLinks.title') }}
          </h3>
          <ul class="flex flex-col space-y-2">
            <li v-for="(link, index) in localizedFriendLinks" :key="index">
              
               <a :href="link.url"
                class="text-gray-600 hover:text-gray-900 transition-colors duration-200 inline-flex items-center"
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
      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-center text-gray-600">
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

const domain = useRuntimeConfig().public.domain.substring(8)

// 确保组件正确导出
defineExpose({
  // 如果需要暴露任何属性或方法
})
</script>

<script>
// 确保组件有一个名字
export default {
  name: 'GradientFooter'
}
</script>
