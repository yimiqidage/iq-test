<template>
  <footer class="text-gray-600 body-font">

    <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
      <!-- <div class="flex justify-center space-x-6 md:order-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </a>
      </div> -->
      <div class="mt-8 md:order-1 md:mt-0">
        <p class="text-center text-xs leading-5 text-gray-500">&copy; 2024 {{ domain }} {{ $t('index.copy_rights') }}
        </p>
      </div>
    </div>

    <!-- <div class="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between lg:px-8">
      <div class="flex justify-center space-x-6 md:order-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <div class="mt-8 order-1">
        <p class="text-center font-medium leading-5 text-gray-600">&copy; 2024 {{ domain }} {{ $t('index.copy_rights') }}
        
          <a  class="text-gray-400 hover:text-gray-500 cursor-pointer " :href="holeDomain" target="_blank" >localization</a> | 
          <a  class="text-gray-400 hover:text-gray-500 cursor-pointer " :href="holeDomain" target="_blank" >i18n</a> | 
          <a  class="text-gray-400 hover:text-gray-500 cursor-pointer " :href="holeDomain" target="_blank" >copy translator</a>
        </p>
        
      </div> 
    </div>-->

  </footer>
</template>
<script setup>

const domain = useRuntimeConfig().public.domain.substring(8);
const holeDomain = useRuntimeConfig().public.domain;


import { defineComponent, h } from 'vue'

const navigation = [
  
  {
    name: 'Twitter',
    href: 'https://twitter.com/yimiqi001',
    icon: defineComponent({
      render: () =>
        h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            d: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
          }),
        ]),
    }),
  },
  
]
</script>