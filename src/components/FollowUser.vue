<template>
  <div>
    <van-button
      :disabled="isAjax"
      :loading="isAjax"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      :icon="value ? '' : 'plus'"
      :plain="value"
      @click="onClick"
      >{{ value ? "已关注" : "关注" }}</van-button
    >
  </div>
</template>

<script>
import { addUser, delUser } from '@/api/article.js'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [String, Number],
      required: true
    }
  },
  created () { },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async onClick () {
      this.isAjax = true
      // this.$emit('input', !this.value)
      if (this.value) {
        try {
          await delUser(this.target)
          this.$emit('input', !this.value)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await addUser(this.target)
          this.$emit('input', !this.value)
        } catch (error) {
          console.log(error)
        }
      }
      this.isAjax = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
