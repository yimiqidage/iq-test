<template>
  <header class="bg-gradient-to-r mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
    <!-- comon header,for example canonicalUrl -->
    <CommonHead/>
    <nav class="relative mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <!-- Logo -->
      <div class="flex flex-shrink-0" style="max-width: 32px;">
        <NuxtLink to="/" class="-m-1.5 p-1.5 flex items-center">
          <img class="h-8 w-8 ml-2" src="/favicon.svg" alt="iq test icon" />
        </NuxtLink>
      </div>

      <!-- Centered menu items -->
      <div class="flex-grow flex justify-center items-center mx-4">
        <div class="hidden lg:flex gap-x-6 justify-between items-center" v-for="(item, key) in menuItems" :key="item.id">
          <span class="flex-grow flex justify-center">
            <!-- 不需要登录 -->
            <a v-if="!item.needLogin" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 pr-4" :href="localePath(item.href)" :id="'title_' + key">
              {{ item.name }}
            </a>
            <!-- 需要登录，且登录 -->
            <a v-if="item.needLogin && isLoginUser" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 pr-4" :href="localePath(item.href)" :id="'title_' + key">
              {{ item.name }}
            </a>
          </span>
        </div>
      </div>

      <!-- Right aligned login/account button for desktop -->
      <!-- <div class="flex flex-shrink-0 justify-end" style="max-width: 200px;">
        <div v-if="isLoginUser" class="hidden lg:flex min-h-full flex-1 justify-end">
          <MyAccount />
        </div>
        <ClientOnly>
          <div v-if="!isLoginUser" class="hidden lg:flex">
            <GoogleLogin />
          </div>
        </ClientOnly>
      </div> -->

      <!-- Mobile menu button -->
      <div class="flex lg:hidden">
        <button @click="toggleMobileMenu" type="button" class="inline-flex items-center justify-center rounded-md p-2.5">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu, show/hide based on menu open state. -->
    <div v-if="isMobileMenuOpen" class="lg:hidden fixed inset-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 overflow-y-auto" role="dialog" aria-modal="true">
      <div class="flex  justify-between p-4">
        <NuxtLink to="/" class=" p-1.5">
          <span class="sr-only">AI Music Generator</span>
          <img class="h-8 w-auto ml-2" src="/favicon.svg" alt="AI Music Generator" />
        </NuxtLink>
        <button @click="toggleMobileMenu" type="button" class="rounded-md p-2.5 text-white font-bold">
          <span class="sr-only">Close menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-6 flow-root px-6">
        <div class="-my-7 divide-y divide-gray-500/10">
          <div v-for="item in menuItems">
            <NuxtLink v-if="!item.needLogin" :key="item.name" :to="item.href" class="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-white hover:bg-blue-700" @click="toggleMobileMenu">
              {{ item.name }}
            </NuxtLink>

            <NuxtLink v-if="item.needLogin && isLoginUser" :key="item.name" :to="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-700" @click="toggleMobileMenu">
              {{ item.name }}
            </NuxtLink>
            
          </div>

          <!-- 登录按钮在移动端菜单展开时居左显示 -->
        <!-- <div v-if="!isLoginUser" class="flex">
          <GoogleLogin />
        </div>
        <div v-if="isLoginUser" class="flex">
          <MyAccount />
        </div> -->
        
        </div>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';

const userStore = useAuthStore();
const { t, locale } = useI18n();
const isLoginUser = computed(() => userStore.isLoggedIn);
const isMobileMenuOpen = ref(false);

const menuItems = [
  { name: t('index.home_link1'), href: '/', needLogin: false },
  { name: t('index.title_keyword'), href: '/iq-test', needLogin: false },
  { name: t('index.home_link4'), href: '/faq', needLogin: false },
  
  // { name: t('index.home_link6'), href: '/my', needLogin: true },

];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

</script>
