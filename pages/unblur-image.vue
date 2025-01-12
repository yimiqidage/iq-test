<template>
  <div>

    <main class="space-y-8 px-3 py-2 mx-auto max-w-7xl md:px-10 md:py-2 lg:py-2">

      
      <!-- 标题 -->
      <div class="bg-white  py-2 sm:py-8 lg:px-8">
        <div class="mx-auto text-center">
        <h1 class="text-3xl font-medium tracking-tight text-gray-800 sm:text-3xl">{{ t('unblur_image.h1') }}</h1>
        <p class="mt-1 text-base py-2 leading-7 text-gray-600">{{ t('unblur_image.h1_desc') }}</p>
        
      </div>
      </div>

       <!-- <SplitterImage :beforeDownload="beforeDownload"/> -->

       <!-- <ImageUpload /> -->

       <!-- <ImageUploader /> -->

       <!-- <ImageProcessingWorkspace /> -->

       <ImageProcessor />


       <!-- 图片效果对比 -->
       
        <ImageTextSection
          imageSrc="https://image.vyourtime.com/unblur_demo_2.webp"
          imageAlt="unblur image compare"
          title="Preserve Family History: Unblur Image from Your Past"
          description="Old family photographs often become blurry or degraded over time, losing precious details of cherished memories. Whether it's a vintage wedding photo, childhood memories, or important family events, our AI unblur technology can restore these irreplaceable images to crystal clear quality. This helps preserve family history and allows you to pass down high-quality photos to future generations."
          buttonText="Unblur Image Now"
          buttonLink="#top"
          imagePosition="left"
        />
      

      
        <ImageTextSection
          imageSrc="https://image.vyourtime.com/unblur_demo_1.webp"
          imageAlt="unblur image compare"
          title="Unblur Image to Maximize Social Media Impact & Engagement"
          description="For social media influencers and content creators, image quality significantly impacts audience engagement. When photos are blurry or lack clarity, they often receive lower engagement rates and fewer shares. By using our unblur tool to enhance image quality, content creators can ensure their photos stand out in crowded social feeds, leading to higher engagement rates, better brand partnerships, and increased follower growth."
          buttonText="Unblur Image Now"
          buttonLink="#top"
          imagePosition="right"
        />
      



       <!-- <ImageComparisonSlider
        before-image="https://imgc.cc/2024/10/24/671a6e1672391.jpg"
        after-image="https://imgc.cc/2024/10/24/671a6e1672391.jpg"
        :need-loading="false"
      /> -->
       

      <!-- <ImageCompare
            before-image="icon/before.jpg"
        after-image="icon/after.jpg"
            class="w-full h-full"
          /> -->

      <!-- <ImageComparisonSlider
        before-image="https://cfcdn.apowersoft.info/astro/picwish/_astro/ai-before-en.3cce1bb3.png"
        after-image="https://cfcdn.apowersoft.info/astro/picwish/_astro/ai-after-en.c6f12664.png"
      /> -->

    </main>

    <!-- <Pricing /> -->

    <InstructionSteps
      title="How to unblur an image?"
      description="Experience the power of AI image unblur technology in just one click. Transform your blurry photos into crystal-clear images, with additional options to colorize and retouch for perfect."
      :steps="steps"
    />

    <FAQ :isFaqPage="false" :num="10" i18nPath="unblur_image.faq" />



    <div class="w-full py-2">       
      <a href="https://www.producthunt.com/posts/unblur-image?embed=true&utm_source=badge-featured&utm_medium=badge" 
        target="_blank" 
        rel="nofollow" 
        class="block mx-auto w-fit">         
        <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=636013&theme=light" 
            alt="unblur image" 
            class="w-[250px] h-[54px]" />       
      </a>     
    </div>

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

const {merchId} = useRuntimeConfig().public;
const { get,post } = useApi()
const { t, locale } = useI18n();
const langs = useRuntimeConfig().public.langs;
const selectedLang = ref(langs[0]);
// loading 效果
const isLoading = ref(false);


const authStore = useAuthStore()
const router = useRouter()
const localePath = useLocalePath()
const allowDownload = ref(true);

const steps = [
  {
    text: "Upload a blurry photo file from your photo library.",
    image: "https://icon.vyourtime.com/select-image.svg" // Replace with your actual icon path
  },
  {
    text: "Wait a seconds, our AI algorithm analyzes and enhances your image.",
    image: "https://icon.vyourtime.com/upload-image.svg" // Replace with your actual icon path
  },
  {
    text: "Download the repaired photo and share on social media.",
    image: "https://icon.vyourtime.com/download-image.svg" // Replace with your actual icon path
  }
]

// 校验会员是否过期
const checkMemberExpired = async (callback) => {

  if (!authStore.checkLogin()) {
    console.log("authStore.checkLogin result,",authStore.isLoggedIn);
    isLoading.value = false;
    return;
  } 


  const userApiKey = getUerApiKey();

  isLoading.value = true;

  let url = ENDPOINTS.USER.MEMBER_EXPIRED_CHECK + userApiKey;
  const checkResp = await get(url);
  console.log("checkResp=",checkResp)
  if(checkResp.isExpired){
    MessageUtils.errorMsg(checkResp.message);
    setTimeout(() => {
      router.push(`/pricing`);
    }, 2000);
    return;
  }

  isLoading.value = false;
  callback();

};

// 下载前校验
const beforeDownload = (callback) => {
  console.log("Preparing to download...");
  
  // Simulate an asynchronous operation or perform any necessary actions
  isLoading.value = true;
  
  setTimeout(() => {
    console.log("Download preparation complete.");
    isLoading.value = false;
    // Execute the callback function provided by the child component
    checkMemberExpired(callback);
  }, 1000);
};


useCommonHead(
  t("unblur_image.title"),
  t("unblur_image.h1_desc")
);


</script>

<style>
@media (max-width: 768px) {
  /* Mobile-specific styles if needed */
}
</style>
