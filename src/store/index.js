import Vue from 'vue'
import Vuex from 'vuex'
// 将vuex中的数据持久化的库
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    // 将token值存储在vuex仓库中 作为全局数据使用
    setUser (state, payload) {
      state.user = payload
    },
    setsearchHistoryList (state, payload) {
      // 数组去重
      let arr = state.searchHistoryList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    allDelete (state, payload) {
      state.searchHistoryList = payload
    },
    oneDelete (state, payload) {
      state.searchHistoryList.splice(payload, 1)
    }
  },
  actions: {
  },
  modules: {
  },
  // 将vuex中的数据持久化的库 配置项
  plugins: [vuexLocal.plugin]
})
