import request from '@/utils/request'
export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}

/**
 * 添加用户
 * @param {用户id} target
 * @returns
 */
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}
/**
 * 取消用户
 * @param {用户id} target
 * @returns
 */
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}

/**
 * 添加收藏
 * @param {收藏的目标文章id} target
 * @returns
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏
 * @param {收藏的目标文章id} target
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}

/**
 * 获取点赞
 * @param {点赞的文章id} target
 * @returns
 */
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'article/likings',
    data: {
      target
    }
  })
}

/**
 * 取消点赞
 * @param {点赞的文章id} target
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `article/likings/${target}`
  })
}
