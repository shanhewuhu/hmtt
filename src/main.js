import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
// import '@/styles/reset.less'
import '@/styles/index.less'
// 将字体图标封装为全局组件
import TtIcon from '@/components/TtIcon.vue'
import * as obj from '@/filters'
import FollowUser from '@/components/FollowUser.vue'
import '@/components'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.component('TtIcon', TtIcon)
Vue.component('FollowUser', FollowUser)
Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
