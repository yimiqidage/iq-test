import { useRuntimeConfig } from "#app";
import { useI18n } from "vue-i18n";
import ToolUtils from "@/utils/ToolUtils";
import MessageUtils from "@/utils/MessageUtils";
import { ENDPOINTS } from '@/utils/urls'


/**
 * 核心入口
 * @returns
 */
export function useApi() {
  const { serverUrl } = useRuntimeConfig().public;
  const baseURL = serverUrl;
  const { locale } = useI18n();
  const DEFAULT_TIMEOUT = 30000; // 默认30秒


  // console.log("useApi:", locale.value);

  const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        lang: locale.value,
        ...options.headers,
      },
     
    };

    try {
      const response = await $fetch(endpoint, {
        baseURL,
        ...defaultOptions,
        ...options,
        timeout: options.timeout || DEFAULT_TIMEOUT,
      });
      
      // console.log("response=", response,(typeof response));

      if (response) {
      
        // 失败，自动弹窗
        const respJson = (typeof response === 'object') ? response: JSON.parse(response);
        if(!ToolUtils.isSuccResp(respJson)){
          MessageUtils.errorMsg(respJson.errMsg);
          return {};
        }
        return respJson.data;
      } 

      // console.log("response is null,", response);
      return {};

    } catch (error) {
      // 处理网络错误或其他异常
      console.error("API Error:", error);
      // toast.error('Network error or server unavailable')
      throw error;
    }
  };

  const getPriceList = () => {
    const {merchId}= useRuntimeConfig().public;
    return get(ENDPOINTS.PRODUCT.LIST,{merchId:merchId});
  };

  /**
   * 
   * @returns 生成支付链接
   */
  const toPay = (params: object = {}) => {
    return post(ENDPOINTS.PAY.CREATE,params);
  };

  const get = (url: string, params: object = {}, options: RequestInit = {}) => {
    // 将 params 对象转换为 URL 查询参数
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");

    // 拼接查询参数到 URL 后面
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    // console.log("fullUrl=",fullUrl)

    return apiFetch(fullUrl, { ...options, method: "GET" });
  };

  const post = (url: string, body: any, options: RequestInit = {}) => {
    return apiFetch(url, { ...options, method: "POST", body: JSON.stringify(body) });
  };

  return {
    get,
    post,
    getPriceList,
    toPay,
  };
}
