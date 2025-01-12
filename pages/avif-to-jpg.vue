<template>
  <div>

    <main class="space-y-8 px-3 py-2 mx-auto max-w-7xl md:px-10 md:py-2 lg:py-2">

      
      <!-- 标题 -->
      <div class="bg-white  py-2 sm:py-8 lg:px-8">
        <div class="mx-auto text-center">
        <h1 class="text-3xl font-medium tracking-tight text-gray-800 sm:text-3xl">{{ t('avif_to_jpg.h1') }}</h1>
        <p class="mt-1 text-base py-2 leading-7 text-gray-600">{{ t('avif_to_jpg.h1_desc') }}</p>
        
      </div>
      </div>


       <AvifToJpgConverter />


       <InstructionSteps
      title="How to convert AVIF to JPG?"
      description="Introduce to you how to use our tool to convert AVIF to JPG."
      :steps="steps"
      />

       

    </main>

    <!-- <Pricing /> -->

   

    <UserComments
    name="David Lee"
position="Graphic Designer at Creative Edge Studios"
avatarUrl="https://images.unsplash.com/photo-1557862921-37829c790f19"
testimonial="I used to struggle with converting avif files to jpg for client projects, wasting so much time on complex workarounds. But this avif to jpg tool is a game-changer! It's incredibly easy to use, with just a few clicks, I can quickly transform those avif images into high-quality jpgs that meet all our project requirements. Now, my workflow is smoother and I can focus more on the creative aspects of my designs."
/>

<UserComments
name="Michael Brown"
position="Web Developer at TechFusion Solutions"
avatarUrl="https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
testimonial="As a web developer, dealing with different image formats is part of the daily grind. The avif to jpg tool has been a huge help for optimizing website images. It effortlessly converts avif files to jpg, reducing file sizes without sacrificing quality. This not only speeds up our website loading times but also ensures a consistent visual experience for our users. It's an essential tool in my toolkit now."
/>

<UserComments
name="James Wilson"
position="Social Media Manager at Buzz Marketing Agency"
avatarUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
testimonial="In social media management, we need to share visually appealing content fast. I often had avif images that weren't compatible with some platforms and had to be converted. This avif to jpg tool saved me countless headaches. It's super efficient, allowing me to convert multiple avif files to jpg in seconds. Now I can get our eye-catching visuals out to our audience promptly, boosting engagement on our social media channels."
/>



    <FAQ :isFaqPage="false" :num="10" i18nPath="avif_to_jpg.faq" />



    <Loading :isLoading="isLoading" />

    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import useCommonHead from "~/utils/useCommonHead";
import { useI18n } from "vue-i18n";
import { getUserToken, getUerApiKey } from "@/services/user";
import { useAuthStore } from '~/stores/auth'
// import { useApi } from '@/composables/useApi'
import { ENDPOINTS } from '@/utils/urls'
import ApiService from "@/services/apiService";
import AvifToJpgConverter from "~/components/AvifToJpgConverter.vue";
const {merchId} = useRuntimeConfig().public;
const { get,post } = useApi()
const { t, locale } = useI18n();
const langs = useRuntimeConfig().public.langs;
const selectedLang = ref(langs[0]);
// loading 效果
const isLoading = ref(false);

const steps = [
    {
        "text": "Select your AVIF image to convert to JPG from your device or computer.",
        "image": "https://icon.vyourtime.com/select-image.svg"
    },
    {
        "text": "Click the 'Convert to JPG' button to transform your AVIF image to JPG format instantly.",
        "image": "https://icon.vyourtime.com/convert-image.svg"
    },
    {
        "text": "Download your converted JPG image and use it anywhere you need.",
        "image": "https://icon.vyourtime.com/download-image.svg"
    }
]


useCommonHead(
  t("avif_to_jpg.title"),
  t("avif_to_jpg.h1_desc")
);


</script>

<style>
@media (max-width: 768px) {
  /* Mobile-specific styles if needed */
}
</style>
