import request from '@/utils/request'
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}

// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    // channel_id频道id timestamp时间戳 用于分页功能
    params: { channel_id, timestamp }
  })
}

export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}

// 频道数据持久化出处理
export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
