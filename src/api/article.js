import request from '@/utils/request'
// eslint-disable-next-line camelcase
export const getArticle = (article_id) => {
  return request({
    // eslint-disable-next-line camelcase
    url: `/articles/${article_id}`,
    timeout: 5000
  })
}

// 添加关注
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}
// 取消关注
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}
// 收藏
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}
// 取消收藏
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
