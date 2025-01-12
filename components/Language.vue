<template>
    <div class="flex items-center justify-between">


        <!-- if login -->
        <!-- <div v-if="isLoginUser" class="pr-2">
            <my-account />
        </div>
        <div v-else class="pr-2">
            <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError" :one-tap="isOneTap" />
            <Loading :isLoading="isLoading" />
            <MyLogin/>
        </div> -->



        <div class="relative inline-block text-left">
            


            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton
                        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {{ lang }} 
                        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                            <MenuItem v-slot="{ active }" v-for="(item, key) in langs" :key="key">
                            <a :href="switchLocalePath(item.code)"
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                                    item.name }}</a>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>

        </div>

    </div>
</template>
  
<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { isLogin, logout, getUserEmail } from "@/services/user";
import { useI18n } from 'vue-i18n';
import { ref } from "vue";
import ApiService from "@/services/apiService";
import { useRouter,useRoute } from 'vue-router';
import {GoogleSignInButton,useOneTap} from "vue3-google-signin";
import { setUerApiKey,setUserEmail } from "@/services/user";
const { t, locale } = useI18n();
const router = useRouter();

const isLoading = ref(false);
const header = ref({ lang: locale.value });
const route = useRoute();
const config = useRuntimeConfig();

// 使用 useSwitchLocalePath 切换语言
const switchLocalePath = useSwitchLocalePath();

// 官方文档：https://i18n.nuxtjs.org/api/composables#useswitchlocalepath
// 使用 useLocalePath 获取带有语言参数的路径
const localePath = useLocalePath()
const isOneTap = true;



const { langs } = useRuntimeConfig().public;
let lang = langs[0].name;
langs.forEach(l => {
    if (l.code === locale.value) {
        lang = l.name;
    }
})

// const isLoginUser = ref(isLogin());
// console.log("isLoginUser,",isLoginUser.value)


// // google登录使用的插件文档：https://vue3-google-signin.wavezync.com/guide/
// // google文档：https://developers.google.com/identity/gsi/web/reference/js-reference?hl=zh-cn#CredentialResponse
// // google 登录
// // eslint-disable-next-line no-console
// // handle success event
// const handleLoginSuccess = (response) => {
//   const { credential } = response;
//   console.log("google login response:", response.credential);
//   handleCredentialResponse(response.credential);
// };

// // handle an error event
// const handleLoginError = () => {
//   console.error("Login failed");
// };

// // 发起注册/登录请求
// const handleCredentialResponse = async (userToken) => {
 
//   const params = {
//     userToken: userToken,
//     merchId: config.public.merchId,
//   };

//   isLoading.value = true;
//   // 注册用户
//   const loginResp = await ApiService.gmailRegister(params, header);

//   console.log(loginResp);

//   if (!MessageUtils.isSuccessResp(loginResp)) {
//     isLoading.value = false;
//     MessageUtils.errorMsg(loginResp.errMsg);
//     return;
//   }

//   // 赋值
//   // 注册信息写入token
//   const email = loginResp.data.email;
//   console.log("email=",email)
//   setUserEmail(email);
//   isLoading.value=false;

//   MessageUtils.successMsg(t('index.login_success'))

//   isLoginUser.value=true;
  
// };

// useOneTap({
//   onSuccess: (response) => { 
//     console.log("Success:", response);
//   },
//   onError: () => console.error("Error with One Tap Login"),
//   // options
// });


</script>