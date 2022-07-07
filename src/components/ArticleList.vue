<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import { getArticleList } from '@/api/home'
import ArticleItem from '@/components/ArticleItem.vue'

let ele = null
let scrolltop = 0
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  mounted () {
    ele = this.$refs.pullrefresh.$el

    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      scrolltop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrolltop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      try {
        this.refreshing = false
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        this.articleList.push(...res.data.data.results)
        // res参数中会返回一个时间戳 更新时间戳
        this.timestamp = res.data.data.pre_timestamp

        this.loading = false
        if (this.timestamp === null) {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      console.log('下拉刷新')
      this.finished = false
      this.loading = true
      this.timestamp = Date.now()
      this.articleList = []
      this.getArticleList()
    }
  },

  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem

  }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 180px;
}
</style>
