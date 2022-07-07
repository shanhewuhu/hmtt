<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="手机号"
        center
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
          },
        ]"
      >
        <template #left-icon>
          <TtIcon name="shouji"></TtIcon>
        </template>
      </van-field>
      <van-field
        v-model.trim="code"
        name="code"
        placeholder="验证码"
        center
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' },
        ]"
      >
        <template #left-icon>
          <TtIcon name="yanzhengma"></TtIcon>
        </template>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format=" ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            @click="sendSms"
            v-else
            class="yzm"
            native-type="button"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '15180617297',
      code: '246810',
      time: 60 * 1000,
      isCountDownShow: false// 默认倒计时不显示
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        // 将mobile和code作为参数 发送axios请求
        const res = await login(values)
        // 将token值存储在vuex仓库中 作为全局数据使用
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (error) {
        console.log(error)
      }
    },
    // 验证手机号
    async sendSms () {
      try {
        // 校验用户是否输入了正确的手机号 手机号正确才可以发送验证码
        // 校验成功后会进入try res返回值是undefined 校验失败会进入catch 捕获异常
        await this.$refs.form.validate('mobile')
        // 校验成功后显示倒计时效果
        this.isCountDownShow = true
        try {
          // 发送验证码的请求 并提示用户发送验证码成功
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (error) {
          console.log(error)
          this.$toast.fail('发送失败')
        }
      } catch (error) {
        this.$toast.fail('手机号格式错误')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 38px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 60px;
  background-color: #ededed;
  border-radius: 23px;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
}
.van-count-down {
  position: fixed;
  right: 20px;
}
.yzm {
  position: fixed;
  right: 20px;
}
</style>
