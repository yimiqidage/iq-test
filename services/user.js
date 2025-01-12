
import ToolUtils from "~/utils/ToolUtils";
import MessageUtils from "~/utils/MessageUtils";
// import { defineStore } from 'pinia'


export const getUserToken = () => {
  return getItemAndSetItem('userToken','user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
};


export const getUerApiKey =  () => {
  return getItem('userApiKey');
};


export const setUerApiKey =  (apiKey) => {
    // console.log('apiKey:',apiKey)
    setItem('userApiKey',apiKey);
};

/**
 * 
 * @returns 读取邮箱
 */
export const getUserEmail =  () => {
  return getItem('userEmail');
};

/**
 * 设置邮箱
 * @param {邮箱} email 
 */
export const setUserEmail =  (email) => {
  setItem('userEmail',email);
};

/**
 * 
 * @returns 用户是否登录，true：已登录
 */
export const isLogin = () => {
  let apiKey = getUerApiKey();
  if (ToolUtils.isEmpty(apiKey)) {
    return false;
  }
  return true;
};

/**
 * 用户退出登录
 * @returns 
 */
export const logout =  () => {
  // console.log("logout:",getUerApiKey())
  return removeItem('userApiKey','userEmail');
};

export const getItem = (key)=>{
  if(!process.client){
    return null;
  }
  return localStorage.getItem(key);
}

export const setItem = (key,value)=>{
  if(!process.client){
    return ;
  }
  localStorage.setItem(key, value);
}

export const removeItem = (...keys)=>{
  if(!process.client){
    return ;
  }
  keys.forEach(key => {
    localStorage.removeItem(key);
  })
 
}

export const getItemAndSetItem = (k,v)=>{
  if(!process.client){
    return null;
  }
  let value = localStorage.getItem(k);
  
  // 如果为空，设置缓存
  if(ToolUtils.isEmpty(value)){
    localStorage.setItem(k, v);
  }
  
  return localStorage.getItem(k);
}


// export const useUserStore = defineStore('user', {
//   state: () => ({
//     isLoggedIn: isLogin(),
//   }),
//   actions: {
//     login() {
//       this.isLoggedIn = true;
//     },
//     logout() {
//       this.isLoggedIn = false;
//     },
//   },
// })