// services/apiService.js
// import { httpGet, httpPost } from '~/utils/HttpUtil';
import { useI18n } from 'vue-i18n';


class ApiService {

  // 翻译接口
  static url_translate = '/chat/gpt/translate';
  // 邮箱注册
  static url_register = '/user/register/emailpasswd';
  // 登录
  static url_login = '/user/login/emailpasswd';
  // gmail登录/注册
  static url_gmail_login = '/user/register/gmail';
  // 发起支付
  static url_toPay = '/pay/order/create/json';
  // 获取价格接口
  static url_getPrice = '/product/get';
  // apikey 查询
  static url_apiKeyQuery = '/key/query';
  // 执行capture
  static url_toCapture = '/pay/order/capture/json';
  // 查询订单
  static url_queryOrder = '/pay/order/query/json';
  // 生成音乐
  static url_createmusic = '/music/sunoapi/create';

  // 音乐明细
  static url_musicDetail = '/music/sunoapi/detail/';

  

  // 生成音乐
  static async createMusic(payload,header) {
    return await this.httpPost(this.url_createmusic, payload,header);
  }

  // 音乐明细
  static async musicDetail(header,taskId) {
    let url = this.url_musicDetail + taskId;
    return await this.httpGet(url, {},header);
  }

  // GET 请求的方法
  static async getPrice(header) {
      const {merchId}= useRuntimeConfig().public;
       return await this.httpGet(this.url_getPrice,{merchId},header);
  }

  static async queryApiKey(param,header) {
     const {merchId}= useRuntimeConfig().public;
     param['merchId']=merchId;
     console.log("param:",param);
     return await this.httpGet(this.url_apiKeyQuery,param,header);
}


  // POST 请求的方法

  /**
   * 翻译接口
   * @param {请求参数} payload 
   * @returns 
   */
  static async translate(payload,header) {
      return await this.httpPost(this.url_translate, payload,header);
  }

  /**
   * 注册接口
   * @param {请求参数} payload 
   * @returns 
   */
  static async register(payload,header) {
    return await this.httpPost(this.url_register, payload,header);
  }

  /**
   * gmail注册/登录接口
   * @param {*} payload 
   * @param {*} header 
   * @returns 
   */
  static async gmailRegister(payload,header) {
    return await this.httpPost(this.url_gmail_login, payload,header);
  }

   /**
   * 登录接口
   * @param {请求参数} payload 
   * @returns 
   */
   static async login(payload,header) {
    const {merchId}= useRuntimeConfig().public;
    payload['merchId']=merchId;
    return await this.httpPost(this.url_login, payload,header);
  }

  /**
   * 生成支付链接
   * @param {支付请求参数} payload 
   * @returns 
   */
  static async toPay(payload,header) {
    return await this.httpPost(this.url_toPay, payload,header);
  }

   /**
   * 查询支付订单
   * @param {查询请求参数} payload 
   * @returns 
   */
   static async queryOrder(payload,header) {
    return await this.httpPost(this.url_queryOrder, payload,header);
  }

   /**
   * 执行翻译
   * @param {请求参数} payload 
   * @returns 
   */
   static async translate(payload,header) {
    return await this.httpPost(this.url_translate, payload,header);
  }

  /**
   * 进行capture支付
   * @param {请求参数} payload 
   * @returns 
   */
    static async toCapture(payload,header) {
      return await this.httpPost(this.url_toCapture, payload,header);
    }

  // static getBaseInfo() {
  //   const {serverUrl}= useRuntimeConfig().public;
  //   const { locale } = useI18n();
  //   return {
  //     serverUrl:serverUrl,
  //     locale: locale
  //   }
  // }

 
  // static async httpGet(url, params = {}) {
  //   const { serverUrl, locale } = this.getBaseInfo();
  //   try {
  //     let reqUrl = serverUrl + url;
  //     console.log('httpGet:', url, params, reqUrl, locale.value)
  //     const response = await fetch(reqUrl, {
  //       method: 'GET',
  //       params,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'lang': locale.value,
  //       },
  //     });
  //     return response.json();
  //   } catch (error) {
  //     console.error('HTTP GET Error:', error);
  //     throw error;
  //   }
  // };

  // static async httpPost(url, data = {}) {
  //   const { serverUrl, locale } = this.getBaseInfo();
  //   try {
  //     let reqUrl = serverUrl + url;
  //     console.log('httpPost:', url, data, reqUrl, locale.value)
  //     const response = await fetch(reqUrl, {
  //       method: 'POST',
  //       body: JSON.stringify(data),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'lang': locale.value,
  //       },
  //     });
  //     return response.json();
  //   } catch (error) {
  //     console.error('HTTP POST Error:', error);
  //     throw error;
  //   }
  // };

  /**
   * http get请求
   * @param {请求的url地址，不含域名} url 
   * @param {请求参数} params 
   * @returns 
   */
  static async httpGet (url, params = {},header={}) {
    try {
      const {serverUrl}= useRuntimeConfig().public;
      // const {locale}= this.getBaseInfo();

      let reqUrl = serverUrl+url;
      
      console.log('httpGet:', url, params,reqUrl,header.value.lang)
      // const response = await $fetch(`${serverUrl}${url}`, { 
      const response = await $fetch(reqUrl, { 
        method: 'GET',
        params,
        headers: {
          'Content-Type': 'application/json',
          'lang': header.value.lang,
        },
      });
      return response;
    } catch (error) {
      console.error('HTTP GET Error:', error);
      throw error;
    }
  };


  /**
   * http post请求
   * 
   */
  static async httpPost (url, data = {},header={}) {
    try {
      const {serverUrl}= useRuntimeConfig().public;
      
      let reqUrl = serverUrl+url;
      // const {serverUrl}= useRuntimeConfig().public;
      console.log('serverUrl:', reqUrl,header.value)
      // const response = await $fetch(`${serverUrl}${url}`, {
      const response = await $fetch(reqUrl, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          // 'lang': locale.value,
          'lang': header.value.lang
        },
      });
      return response;
    } catch (error) {
      console.error('HTTP POST Error:', error);
      throw error;
    }
  };

}

export default ApiService;
