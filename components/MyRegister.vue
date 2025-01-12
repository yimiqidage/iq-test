<!--
  This example requires some changes to your config:
  
  地址：https://tailwindui.com/components/application-ui/forms/sign-in-forms
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Get Setup In 2 Minutes
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submitForm" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900 text-left"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              v-model="form.email"
              autocomplete="email"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <!-- <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div> -->
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="form.password"
              autocomplete="current-password"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already joined?
        {{ " " }}
        <a
          href="/login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Login now</a
        >
      </p>
    </div>
    <Loading :isLoading="isLoading" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import MessageUtils from "@/utils/MessageUtils";
import { getUerApiKey, setUerApiKey,setUserEmail } from "@/services/user";
const { t, locale } = useI18n();
const header = ref({ lang: locale.value });
const isLoading = ref(false);

const showModal = ref(true);

// 添加属性
const props = defineProps({
  isToPay: {
    type: Boolean,
    default: false
  }
});

const form = ref({
  email: "",
  password: "",
});

// 提交表单数据
const submitForm = async () => {
  // 参数校验
  let email = form.value.email;
  let passwd = form.value.password;
  if (!email || !passwd) {
    MessageUtils.errorMsg("请输入邮箱、密码");
    return;
  }

  if (passwd.length < 8 || passwd.length > 32) {
    MessageUtils.errorMsg("密码长度不能小于8位");
    return;
  }

  const params = {
    email: form.value.email,
    passwd: form.value.password,
    merchId: 4,
  };

  isLoading.value = true;
  // 注册用户
  const registerResp = await ApiService.register(params, header);

  console.log(registerResp);

  if (!MessageUtils.isSuccessResp(registerResp)) {
    isLoading.value = false;
    MessageUtils.errorMsg(registerResp.errMsg);
    return;
  }

  // 赋值
  let apiKey = registerResp.data.apiKey;

  // 注册信息写入token
  setUerApiKey(apiKey);
  setUserEmail(registerResp.data.email);

  console.log("res:", getUerApiKey());

  if(!props.isToPay){
    isLoading.value = false;
    // 如果不需要跳转支付，直接返回
    // 跳转回首页
    const localePath = useLocalePath();
    window.location.href = localePath('/');
    return ;
  }
  // 生成支付链接
  let payParams = {
    productId: 9,
    apiKey: apiKey,
    channelId: 1,
  };
  ApiService.toPay(payParams, header).then((res) => {
    console.log(res.data);
    isLoading.value = false;
    window.location.href = encodeURI(res.data.payUrl);
    return res.data;
  });
};

import ApiService from "@/services/apiService";

// const translate = async () => {
//   try {
//     // 参数校验

//     if (!inputText.value || inputText.value.length > 1) {
//       if (userToken.startsWith("user_")) {
//         // 弹窗需要登录付费
//         console.log("showRegister", showRegister.value);
//         showRegister.value = true;
//         return;
//       }
//     }

//     // 构建请求参数
//     const params = {
//       email: selectedLang.value,
//       content: inputText.value,
//       userToken: userToken,
//     };

//     // 获取响应
//     const res = await ApiService.translate(params);

//     console.log(typeof res.data);

//     // 赋值
//     outputText.value = res.data.answer;
//   } catch (err) {
//     console.error("Failed to translate: ", err);
//   }
// };
</script>
