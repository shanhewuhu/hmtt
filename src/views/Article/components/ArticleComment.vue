<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    source: {
      type: [Number, String],
      required: true
    },
    type: {
      type: String,
      required: true,
      // props的自定义校验规则
      validator (value) {
        // 传过来的值是否为a或c 包含返回true 不包含返回false会报错
        return ['a', 'c'].includes(value)
      }
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      params: {
        type: this.type,
        source: this.source,
        limit: 10,
        offset: null
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.params)
        console.log(res)
        this.$emit('set-count', res.data.data.total_count)
        if (res.data.data.results.length === 0) {
          // 数据全部加载完毕 将finished设置为true
          this.finished = true
        }
        this.commentList.push(...res.data.data.results)
        // 本次返回结果的最后一个评论的id 作为请求下一页数据的offset参数 若无数据 则值为null
        this.params.offset = res.data.data.last_id
        this.loading = false// 数据那回来后 将loading的转圈效果关闭
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getCommentList() // 每次滚动到底部就自动发送请求 获取下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
