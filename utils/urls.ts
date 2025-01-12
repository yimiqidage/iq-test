export const ENDPOINTS = {
    MUSIC: {
      CREATE: '/music/sunoapi/create', // 创建音乐
      DETAIL: '/music/sunoapi/detail/', // 音乐详情
      LIST: '/music/sunoapi/recommend/' //获取音乐列表
    },
    USER: {
      LIST: '/music/sunoapi/my/', //个人音乐列表
      LOGIN: '/user/register/gmail', // 登录注册
      LEFT_COUNT_CHECK: '/member/count/check/', // 查询剩余可用次数
      MEMBER_EXPIRED_CHECK: '/member/expire/check/', // 查询是否过期

    },
    PRODUCT:{
      LIST: '/product/get' // 价格列表
    },

    UNBLUR: {
      IMAGE_ENHANCE: '/unblur/image/enhance', // 图像增强
    },

    ORDER: {
      QUERY: '/common/order/query', // 查询订单状态
    },

    PAY:{
      CREATE: '/pay/order/create/json' // 发起支付   
    },
    MEMBER:{
      QUERY: '/key/query' // 查询会员信息
    }
  }