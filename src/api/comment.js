import request from '@/utils/request'

export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
// 点赞
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}
// 取消点赞
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}

// 评论
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
