<template>
  <div>
    <!-- 登录后的样式 -->
    <!-- 通过vuex中是否有token值 来判断是否登录 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image round :src="userInfo.photo" />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="right">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 登录前的样式 -->
    <div class="header header-nologin" v-else>
      <div class="inner">
        <div @click="$router.push('/login')">
          <img src="@/assets/mobile.png" alt="" />
          <p>登录 / 注册</p>
        </div>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item text="收 藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历 史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button type="default" @click="logout" block v-if="user && user.token"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'my',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确认退出' })
        this.$store.commit('setUser', {})
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.header {
  width: 750px;
  height: 401px;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-login {
  padding-top: 116px;
  .avatar {
    padding: 0 33px 0 32px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .van-image {
        width: 132px;
        height: 132px;
      }
      span {
        margin-left: 22px;
        font-size: 30px;
        color: #ffffff;
      }
    }
    .right {
      width: 116px;
      height: 33px;
      text-align: center;
      line-height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      color: #666666;
    }
  }
  .list {
    display: flex;
    li {
      text-align: center;
      flex: 1;
      p {
        color: #fff;
        font-weight: normal;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.header-nologin {
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    p {
      width: 145px;
      height: 28px;
      font-size: 28px;
      color: #ffffff;
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin-top: 9px;
  margin-bottom: 9px;
}
.van-button {
  height: 104px;
  font-size: 30px;
  color: #d86262;
}
</style>
