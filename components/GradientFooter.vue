<!-- components/GradientFooter.vue -->
<template>
  <footer class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex flex-col items-center">
        <div class="flex space-x-8 mb-6">
          <NuxtLink
            v-for="link in availableSocialLinks"
            :key="link.name"
            :to="link.url"
            target="_blank"
            class="hover:text-gray-200 hover:scale-110 transition-all duration-300"
            :aria-label="link.name"
          >
            <img 
              :src="link.iconUrl"
              :alt="link.name"
              class="w-6 h-6"
              loading="lazy"
            />
          </NuxtLink>
        </div>
        <div class="text-center">
          <p class="text-sm mb-2">{{ companyConfig.tagline }}</p>
          <p class="text-sm opacity-75">
            © {{ currentYear }} {{ companyConfig.name }}. 
            {{ companyConfig.copyright }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 获取运行时配置
const config = useRuntimeConfig();
const { company: companyConfig, social } = config.public;

// 社交媒体图标映射 - 使用实际的 CDN 地址
const socialIcons = {
  twitter: 'https://image.vyourtime.com/twitter-icon.svg',
  linkedin: 'https://image.vyourtime.com/linkedin-icon.svg',
  github: 'https://image.vyourtime.com/github-icon.svg',
  youtube: 'https://image.vyourtime.com/youtube-icon.svg',
  brandfetch: 'https://image.vyourtime.com/brandfetch-icon.svg?a',
  friendlink: 'https://image.vyourtime.com/common.svg',
  friendlink2: 'https://image.vyourtime.com/common.svg',
} as const;

// 根据配置生成可用的社交媒体链接
const availableSocialLinks = computed(() => {
  const links = [];

  for (const [platform, url] of Object.entries(social)) {
    if (url) {  // 只有当 URL 不为空时才添加
      const platformKey = platform.toLowerCase();
      links.push({
        name: platform.charAt(0).toUpperCase() + platform.slice(1),
        url,
        iconUrl: socialIcons[platformKey as keyof typeof socialIcons]
      });
    }
  }

  return links;
});

// 计算当前年份
const currentYear = computed(() => new Date().getFullYear());
</script>