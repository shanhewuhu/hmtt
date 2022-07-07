<template>
  <div class="main">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="item in list"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { searchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await searchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        // 数据加载完毕后要把finished变成true
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 新旧数据要合在一起 而不是直接覆盖
        this.list.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      // 页码加1 请求下一页数据
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
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
.main {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
