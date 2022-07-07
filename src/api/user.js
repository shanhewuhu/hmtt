import request from '@/utils/request'
// 获取短信验证码 返回的是一个promise
export const getSmsCode = (mobile) => {
  return request({
    method: 'GET',
    url: `/sms/codes/${mobile}`
  })
}
// 登录请求 需要传两个参数 分别是手机号和验证码
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

export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}
