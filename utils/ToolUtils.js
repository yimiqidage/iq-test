/**
 * 空校验 null或""都返回true
 */
function isEmpty (obj) {
    if ((typeof obj === 'string')) {
        return !obj || obj.replace(/\s+/g, "") === ""
    } else {
        return (!obj || JSON.stringify(obj) === "{}" || obj.length === 0);
    }
}
/**
 * 非空校验
 */
function isNotEmpty (obj) {
    return !this.isEmpty(obj);
}

function isSuccResp (resp){
    // console.log("resp.errCode=",resp.errCode)
    if( 'E0000' == resp.errCode){
        return true;
    }
   
    if(resp.data && 'E0000' == resp.data.errCode){
        return true;
    }

    console.log("resp.data.errCode=",resp.data)
    return false;
}

/**
 * 对象复制
 * @param obj
 */
function copy (obj) {
    if (isNotEmpty(obj)) {
        return JSON.parse(JSON.stringify(obj));
    }
}

/**
 * 随机生成[len]长度的[radix]进制数
 * @param len
 * @param radix 默认62
 * @returns {string}
 */
function uuid (len, radix = 62) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    radix = radix || chars.length;
    for (let i = 0; i < len; i++) {
        uuid[i] = chars[0 | Math.random() * radix];
    }
    return uuid.join('');
}

/**
 * 滚动到顶部
 */
function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 可以指定滚动动画为平滑过渡
    });
  }

export default {isEmpty,isNotEmpty,uuid,copy,isSuccResp,scrollToTop}
