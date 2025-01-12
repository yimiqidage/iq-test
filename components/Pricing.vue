<template>
  <div class="bg-white  py-12 sm:py-12">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto text-center">
        
        <h1 class="text-base font-semibold leading-7 text-indigo-600 sm:text-5xl mb-4" >{{ t("pricing.h2") }} </h1>
        <!-- <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"> {{ t("pricing.desc") }}</p> -->
      </div>
      <!-- <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">Choose an affordable plan that’s
        packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</p> -->

      <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div v-for="price in priceList" :key="price.id"
          :class="[price.recommend ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200', 'rounded-3xl p-8 xl:p-10']">
          <div class="flex items-center justify-between gap-x-4">
            <p :id="price.id"
              :class="[price.recommend ? 'text-indigo-600' : 'text-gray-900', 'text-lg font-semibold leading-8']">{{
          price.tags }}</p>
            <p v-if="price.recommend"
              class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">Most
              popular</p>
          </div>
          <p class="mt-4 text-sm leading-6 text-gray-600">{{ price.description }}</p>
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-4xl font-bold tracking-tight text-gray-900">{{ price.amountStr }}</span>
            <span class="text-sm font-semibold leading-6 text-gray-600">/{{ price.period }}</span>
          </p>
          <a href="javascript:void(0);" @click="toCheckout(price)" :aria-describedby="price.id"
            :class="[price.recommend ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500' : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300', 'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer']">{{
          price.buttonText }}</a>
          <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
            <li v-for="enable in price.enableList" :key="enable" class="flex gap-x-3">
              <CheckCircleIcon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
              {{ enable }}
            </li>
            <li v-for="disable in price.disableList" :key="disable" class="flex gap-x-3">
              <XCircleIcon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
              {{ disable }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <FAQ :isFaqPage="false" :num="8" i18nPath="unblur_image.pricing.faq" />
    <Loading :isLoading="isLoading" />
  </div>
</template>

<script setup>
import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'
import { useAuthStore } from '~/stores/auth'
import { getUerApiKey } from '@/services/user'


const { t, locale } = useI18n();
// 参考： https://tailwindui.com/components/marketing/sections/pricing
const { getPriceList,toPay,post } = useApi()
const priceList = ref([]);
const authStore = useAuthStore()
const localePath = useLocalePath()
const indexPage = localePath('/');
const {merchId,defaultPayChannelId}= useRuntimeConfig().public;
const router = useRouter();

const init = async () => {
  const dataList = await getPriceList();
  priceList.value = dataList.list;
  console.log("price=", priceList.value)
}


// 发起支付
const toCheckout = async (item) => {

  // 如果是免费，直接跳转到首页
  if (item.amount <=0) {
    router.push(indexPage)
    return;
  }

  // 判断是否登录，如果未登录，弹出登录窗口
  if (!authStore.checkLogin()) {
    return;
  } 

  isLoading.value = true;

  // 跳转链接
  let returnUrl = useRuntimeConfig().public.domain + indexPage;
  // console.log("returnUrl:", returnUrl);
  
  let apiKey = getUerApiKey();
  // 生成支付链接
  let payParams = {
    productId: item.id,
    apiKey: apiKey,
    channelId: defaultPayChannelId,
    returnUrl: returnUrl
  };

  const payResp = await post(ENDPOINTS.PAY.CREATE,payParams);

  let url = encodeURI(payResp.payUrl);
  isLoading.value = false;
  
  window.location.href = encodeURI(url);
  
  
};

const openNewWindow = (url) => {
  if (process.client) {
    window.open(url, '_blank')
  }
}

const isLoading = ref(false);

init();


</script>