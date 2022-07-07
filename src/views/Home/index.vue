<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button
          type="info"
          block
          icon="search"
          class="search-btn"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '95%', 'padding-top': '1.334rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        :channels="myChannels"
        :active="active"
        @change-active="(active = $event), (isChannelPanelShow = false)"
        @del-active="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'

export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      myChannels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      // 当vuex中没有数据时 并且本地存储也没有数据时 判定用户为第一次登录 数据从ajax中获取
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.myChannels = channels
      } else {
        try {
          // 用户登录 直接从ajax中获取数据
          const res = await getMyChannels()
          this.myChannels = res.data.data.channels
        } catch (error) {
          console.log(error)
        }
      }
    }

  },
  computed: {},

  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang = "less">
/deep/ .van-nav-bar__title {
  /* unset 将设置好的属性取消设置 */
  max-width: unset;
}
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}
.menu {
  position: fixed;
  right: 0;
  min-width: 100px;
  height: 82px;
  text-align: center;
  line-height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 66px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/ .van-tabs__wrap {
  width: 100%;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  /* calc是css中的方法 可以自动计算 */
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
