<!-- google登录 -->
<template>
 
    <div class="">
      <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError" :one-tap="isOneTap" />
    <Loading :isLoading="isLoading" />

    </div>
  </template>
  <script setup>
  import { ref } from "vue";
  import { setUerApiKey,setUserEmail } from "@/services/user";
  import ApiService from "@/services/apiService";
  import { useRouter,useRoute } from 'vue-router';
  import { ENDPOINTS } from '@/utils/urls'
    
  const {post} = useApi();
  const { t, locale } = useI18n();
  
  const showModal = ref(true);
  const isLoading = ref(false);
  const header = ref({ lang: locale.value });
  const router = useRouter();
  const route = useRoute();
  const isOneTap = false;
  
  // google登录使用的插件文档：https://vue3-google-signin.wavezync.com/guide/
  // google文档：https://developers.google.com/identity/gsi/web/reference/js-reference?hl=zh-cn#CredentialResponse
  // google 登录
  // eslint-disable-next-line no-console
  // handle success event
  const handleLoginSuccess = (response) => {
    // const { credential } = response;
    // console.log("google login response:", response.credential);
    handleCredentialResponse(response.credential);
  };
  
  // handle an error event
  const handleLoginError = () => {
    console.error("Login failed");
  };
  
  // 发起注册/登录请求
  const handleCredentialResponse = async (userToken) => {
   
    const params = {
      userToken: userToken,
      merchId: useRuntimeConfig().public.merchId,
    };

    console.log("params=",params)
  
    isLoading.value = true;

    const loginResp = await post(ENDPOINTS.USER.LOGIN,params);
    console.log(loginResp);
    if(!loginResp.apiKey){
      return ;
    }
  
    // 赋值
    // 注册信息写入token
    const email = loginResp.email;
    const apiKey = loginResp.apiKey;
    setUserEmail(email);
    setUerApiKey(apiKey);
    isLoading.value=false;
  
    MessageUtils.successMsg(t('index.login_success'))

    // 注册登录成功事件
    window.dispatchEvent(new Event('login-success'))
    
  };
  
  // useOneTap({
  //   onSuccess: (response) => {
  //     console.log("Success:", response);
  //   },
  //   onError: () => console.error("Error with One Tap Login"),
  //   // options
  // });
  </script>
