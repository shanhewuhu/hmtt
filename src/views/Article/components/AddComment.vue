<template>
  <div>
    <van-field
      v-model.trim="message"
      center
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      ref="field"
    >
      <template #extra>
        <van-button type="default" :disabled="message === ''" @click="onClick"
          >发布</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    // 如果是对文章进行评论不用传 对评论进行评论要传
    art_id: {
      type: [String, Number]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.van-button {
  border: none;
}
</style>
