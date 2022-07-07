import request from '@/utils/request'
export const getSuggestList = (q) => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}

// page:页数 =1是指默认值 per_page:每页的数量 q:关键字
// eslint-disable-next-line camelcase
export const searchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }
  })
}
