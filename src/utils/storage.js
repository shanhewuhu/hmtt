// 将数据持久化进行封装
// 获取
export function getItem (key) {
  // 判断存储的类型 "['a']"类似此种数据用JSON.parse回报错
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}
// 设置
export function setItem (key, value) {
  if (typeof value === 'object') {
    // 复杂数据类型
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    // 简单数据类型
    window.localStorage.setItem(key, value)
  }
}
// 根据key值删除本地存储中的数据
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
// 删除本地存储中的所有数据
export function clearItem () {
  window.localStorage.clearItem()
}
