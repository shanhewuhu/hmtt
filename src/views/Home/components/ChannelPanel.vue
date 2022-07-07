<template>
  <div>
    <div class="topPanel myTopPanel">
      <div class="title">
        <h4>我的频道</h4>
        <van-button
          plain
          round
          type="danger"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col
          span="6"
          @click="change(index)"
          v-for="(item, index) in channels"
          :key="item.id"
        >
          <div class="inner" :style="{ color: index === active ? 'red' : '' }">
            {{ item.name }}
            <van-icon name="close" v-show="isCloseShow" v-if="index !== 0" />
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="topPanel">
      <div class="title">
        <h4>推荐频道</h4>
      </div>
      <van-row>
        <van-col span="6" v-for="item in surplusArticle" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
import { getAllArticleList, saveChannels } from '@/api/home'
const CHANNELS = 'CHANNELS'
export default {
  props: {
    channels: {
      type: Array,
      requrired: true
    },
    active: {
      type: Number,
      requrired: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      this.surplusArticle = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      surplusArticle: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.surplusArticle.findIndex(item => item.id === id)
      this.channels.push(this.surplusArticle[index])
      this.surplusArticle.splice(index, 1)
    },
    change (index) {
      if (this.isCloseShow) {
        // 删除
        if (index === 0) return
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.surplusArticle.push(obj)
        if (index < this.active) {
          this.$emit('del-active', this.active - 1)
        }
      } else {
        // 跳转
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        // 登录过
        if (this.$store.state.user && this.$store.state.user.token) {
          const arr = []
          newVal.forEach((item, index) => {
            const obj = { id: item.id, seq: index }
            arr.push(obj)
          })
          // 更新用户设置关注的频道
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (error) {
            console.log(arr)
          }
        } else {
          // 没有登录过
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  h4 {
    font-size: 32px;
    color: #333333;
    font-weight: normal;
  }
  .van-button {
    width: 112px;
    text-align: center;
    line-height: 48px;
    height: 48px;
    font-size: 12px;
  }
}
.van-col {
  margin-top: 30px;
  .inner {
    position: relative;
    width: 160px;
    height: 86px;
    text-align: center;
    line-height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    color: #222222;
    letter-spacing: 1px;
    margin-left: 14px;
    .van-icon {
      font-size: 30px;
      position: absolute;
      top: -12px;
      right: -12px;
    }
  }
}
.myTopPanel {
  margin-bottom: 30px;
}
</style>
