import request from '@/utils/request'
// 只有在vue组件文件中才能用this.$store 在js中没有这个this 所以只能
import store from '@/store'
/**
 * 获取短信验证码
 * @param {number} mobile
 * @returns promise
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 * 登录
 * @param {mobile, code} param0
 * @return promise
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 获取用户个人资料
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}

// export const 接口名 = () => {
//   return request({
//     url,
//     method,
//     headers,
//     data,
//     params
//   })
// }
