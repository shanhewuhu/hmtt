<template>
  <!-- <van-loading v-if="isLoading" size=".53333rem" /> -->
  <van-icon
    color="#777"
    name="good-job-o"
  />
    <!-- :name="is_liked ? 'good-job' : 'good-job-o'" -->
    <!-- @click="onClick" -->
</template>

<script>
// import { addLike, delLike } from '@/api/article'
export default {
  // name: 'ArticleLike',
  // props: {
  //   is_liked: {
  //     type: Boolean,
  //     required: true
  //   }
  // },
  created () { },
  data () {
    return {
      // isLoading: false
    }
  },
  methods: {
    async onClick () {
      // this.isLoading = true
      // const target = this.$route.params.article_id
      // if (this.is_liked) {
      //   try {
      //     await delLikes(target)
      //     this.$emit('update:is_liked', !this.is_liked)
      //   } catch (err) {
      //     console.log(err)
      //   }
      // } else {
      //   try {
      //     await addLikes(target)
      //     this.$emit('update:is_liked', !this.is_liked)
      //   } catch (err) {
      //     console.log(err)
      //   }
      // }
      // this.isLoading = false
      // this.$emit('update:is_liked', !this.is_liked)
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
