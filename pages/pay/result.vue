<template>

    <div>
        <Loading :isLoading="isLoading" />
    </div>

</template>

<script setup>



import ApiService from "@/services/apiService";

const { t, locale } = useI18n();
console.log("locale:",locale.value);
const header = ref({ lang: locale.value });
console.log("header:",header.value);
const route = useRoute();
const isLoading = ref(true);
const localePath = useLocalePath()
const indexPage = localePath('/');  
// 在跳转页面定义router变量，解构得到指定的query和params传参的参数
const router = useRoute();

// 从请求url中，获取到token和payerId
const token = router.query.token;
const payerId = router.query.PayerID || router.query.payerid;

const toCapture = async () => {

  // 如果没payerId，只查询
    // if (!payerId) {
    //   const res = await ApiService.queryOrder({ token: token }, header);
    //   console.log("res:",res);
    //   const errCode = res.errCode;
    //   if ("E0000" !== errCode) {
    //     MessageUtils.errorMsg(res.errMsg);
    //     setTimeout(() => {
    //       router.push({ path: indexPage });
    //     }, 2000);
    //   }
    // }
    
    let params = {
        token:token,
        payerId:payerId
      }

    const res = await ApiService.toCapture(params, header);
    console.log(typeof res.data,res,MessageUtils.isSuccessResp(res));
    const errCode = res.errCode;

    if (!MessageUtils.isSuccessResp(res)) {
      MessageUtils.errorMsg(res.errMsg);
      setTimeout(() => {
        window.location.href = indexPage;
      }, 2000);
      return;
    }

    
    // 支付成功，跳转到首页
    MessageUtils.successMsg(t('common.pay_success'));

    // return ;

    const returnUrl = res.data.returnUrl || indexPage;
    setTimeout(() => {
        console.log("indexPage:",returnUrl)
        // router.push(indexPage);
        window.location.href = returnUrl;
        
    }, 1500);

    
}

toCapture();



</script>