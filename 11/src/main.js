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

// 一次性把filters/index.js中所有的按需要导出全部导出来
// 作为obj的属性
import * as obj from '@/filters'

import FollowUser from '@/components/FollowUser.vue'
import '@/components'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

// import MyIcon from '@/components/MyIcon.vue'
Vue.config.productionTip = false

Vue.use(Vant)
Vue.component(FollowUser.name, FollowUser)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')