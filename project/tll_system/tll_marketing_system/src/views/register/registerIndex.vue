<template>
  <div class="wrapper">
    <div class="header">
      <h3>新用户注册</h3>
      <router-link to="/home">返回主站</router-link>
    </div>
    <form class="register">
      <input type="text" placeholder="用户名输入" v-model="username" @blur="name_verify">
      <el-alert title="用户名至少6位且数字字母组合" type="error" show-icon class="desc" v-if="vuser"></el-alert>

      <input type="text" placeholder="手机号输入" v-model="tel" @blur="tel_verify" id="tel">
      <el-alert title="手机号格式不合法" type="error" show-icon class="desc" v-if="vtel"></el-alert>

      <div class="pin_area">
        <input type="text" placeholder="验证码输入" v-model="pin" @blur="pin_verify" id="pin">
        <el-alert title="验证码错误" type="error" show-icon class="desc" id="message_pin" v-show="vpin"></el-alert>
        <a href="javascript:;" class="pin" @click="get_pin" v-if="show">立即获取</a>
        <span class="pin_click" v-else>{{ timer }}秒后重新获取</span>
      </div>

      <input type="password" placeholder="密码输入" v-model="password" @blur="pwd_verify" id="password">
      <el-alert title="密码必须为6-16为数字字母组合" type="error" show-icon class="desc" v-if="vpwd"></el-alert>

      <input type="password" placeholder="重复密码" v-model="repassword" @blur="repwd_verify">
      <el-alert title="密码不一致" type="error" show-icon class="desc" v-if="vrepwd"></el-alert>

      <label>
        <input type="checkbox" v-model="vprotocol">
        <span>已阅读并同意</span>
        <a href="javascript:;">《用户服务协议》</a>
      </label>
      <el-alert title="请勾选用户服务协议" type="warning" show-icon class="desc" v-if="!vprotocol"></el-alert>
      <label>
        <input type="checkbox" v-model.number="prime">
        <span>立即成为<a href="javascript:;">尊享会员</a></span>
      </label>
      <el-button type="primary" @click="register">注册</el-button>

    </form>
  </div>
</template>

<script>
import { userRequest } from '@/api/register'
export default {
  data () {
    return {
      username: null,
      vuser: false,
      password: null,
      vpwd: false,
      repassword: null,
      vrepwd: false,
      tel: null,
      vtel: false,
      pin: null,
      rpin: null,
      vpin: false,
      timer: 6,
      prime: 0,
      show: true,
      vprotocol: true
    }
  },
  methods: {
    // 设置倒计时和获取验证码
    get_pin () {
      // span显示
      this.show = false
      // pin显示倒计时
      setTimeout(() => {
        this.rpin = (Math.random() * 999999).toFixed(0)
        this.$message({
          message: `获取到验证码: ${this.rpin}`,
          type: 'success'
        })
        this.pin = this.rpin
        document.querySelector('#message_pin').style.display = 'none'
      }, 3000)
      // pin获取倒计时
      const timerid = setInterval(() => {
        if (this.timer === 1) {
          this.show = true
          clearInterval(timerid)
        }
        this.timer--
      }, 1000)
      this.timer = 6
    },
    // 用户信息验证
    name_verify () {
      if ((/^[a-zA-Z0-9_]{6,16}$/).test(this.username)) {
        this.vuser = false
        return true
      } else this.vuser = true
      return false
    },
    pwd_verify () {
      if ((/^[a-zA-Z0-9-_]{6,16}$/).test(this.password)) {
        this.vpwd = false
        return true
      } else this.vpwd = true
      return false
    },
    repwd_verify () {
      if (this.repassword === this.password) {
        this.vrepwd = false
        return true
      } else this.vrepwd = true
      return false
    },
    tel_verify () {
      if ((/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-3 5-9])\d{8}$/).test(this.tel)) {
        this.vtel = false
        return true
      } else this.vtel = true
      return false
    },
    pin_verify () {
      if ((/^\d{6}$/).test(this.pin) && (this.pin === this.rpin)) {
        this.vpin = false
        return true
      } else this.vpin = true
      return false
    },
    // 发送注册信息
    async register () {
      if (!this.all_legal) {
        this.$message.error('输入信息非法, 请检查')
        return
      }
      // 创建数据对象
      const postData = {
        username: this.username,
        password: this.password,
        tel: this.tel,
        prime: this.prime
      }
      // 执行注册请求
      await userRequest.postRegistration(postData)
      // 响应拦截器接收正确内容成功后，将进行页面跳转
      this.jump_success()
    },
    // 页面跳转
    jump_success () {
      this.$alert('点击跳转到登录页面', '恭喜，注册成功', {
        confirmButtonText: '确定',
        callback: () => { this.$router.push('/account') }
      })
    }
  },
  // 检查信息正确性
  computed: {
    all_legal () {
      return this.name_verify() &&
            this.tel_verify() &&
            this.pin_verify() &&
            this.pwd_verify() &&
            this.repwd_verify() &&
            this.vprotocol
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  margin: 50px auto;
  padding: 50px 100px;
  height: 700px;
  width: 1200px;
  background-color: #fff;
  padding-top: 30px 50px;

  .header {
    display: flex;
    align-items: center;

    h3 {
      flex: 1;
      color: #857c7ca5;
      font-size: 30px;
    }
  }

  .register {
    background-color: #fff;

    .pin_area {
      position: relative;

      .pin {
        position: absolute;
        left: 57%;
        top: 13px;
        color: rgb(73, 186, 155);
      }

      .pin_click {
        position: absolute;
        top: 13px;
        left: 53%;
        color: rgb(194, 188, 188);
      }
    }

    .desc {
      margin: 0 350px;
      width: 300px;
    }

    input {
      display: block;
      transform: translateX(350px);
      width: 300px;
      height: 50px;
      margin-top: 20px;
      border: 1px solid rgba(190, 181, 181, 0.609);
      outline: none;
      padding-left: 20px;
    }

    label {
      display: flex;
      transform: translateX(250px);
      width: 250px;
      margin: 10px 120px;

      input {
        transform: none;
        margin-top: 3px;
        margin-right: 3px;
        left: 0;
        width: 20px;
        height: 15px;
        border-radius: 50%;
      }

      a {
        color: rgb(73, 186, 155);
      }
    }

    button {
      margin: 30px auto;
      outline: none;
      border: none;
      display: block;
      width: 300px;
      height: 70px;
      background-color: rgb(73, 186, 155);
      font-size: 20px;
    }

    button:hover {
      background-color: rgb(50, 246, 194);
      cursor: pointer;
    }

    button:active {
      background-color: rgb(6, 68, 52);
    }
  }
}
</style>
