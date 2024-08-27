<template>
    <div class="login">
        <h2>MyEMC Cloud System Manager</h2>
        <form @submit.prevent>
            <input type="text" placeholder="用户名输入" required v-model="user" v-focus>
            <input type="password" placeholder="密码输入" required v-model="password">
            <label>
                <input type="checkbox" required v-model="protocol">
                <span>我已同意<a href="javascript:;">《隐私条款》</a>和<a href="javascript:;">《服务条款》</a></span>
            </label>
            <p>!请先勾选用户协议</p>
            <button type="submit" @click="login">登录</button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import CryptoJs from 'crypto-js'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: null,
      password: null,
      protocol: false
    }
  },
  created () {
    // 只要进入登录页面就清除本地token
    this.remove_token()
    console.log('仓库用户数据: ', JSON.parse(JSON.stringify(this.userInfo)))
  },
  methods: {
    ...mapActions('user', ['fetch_token_async', 'admin_verify_async']),
    ...mapMutations('user', ['remove_token']),
    sha256Encode () {
      const pwd = this.password
      return CryptoJs.SHA256(pwd).toString()
    },
    async login () {
      if (!this.user || !this.password || !this.protocol) {
        this.$message.warning('请输入完整的用户信息，并勾选协议!')
        return
      }
      const loginData = {
        user: this.user,
        password: this.sha256Encode(this.password)
      }
      console.log('信息装载完毕，发送: ', loginData)

      // 登录信息发送，并获取uid和token存入vuex仓库
      // TODO: 先验证是否为管理员，再进行SSE连接
      const ret = await this.admin_verify_async(loginData)
      if (ret === true) this.$message.success('管理员认证成功')
      else {
        this.$message.error('管理员认证失败')
        return
      }
      await this.fetch_token_async(loginData)
      this.$message.success('登录成功!获取到用户token: ' + this.userInfo.token)
      console.log('仓库用户数据: ', JSON.parse(JSON.stringify(this.userInfo)))
      this.$router.push('/home')
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.login {
    display: grid;
    place-items: center;
    margin: 200px 0;
    h2 {
        margin-bottom: 50px;
    }
    form {
        input {
            display: block;
            outline: none;
            padding-left: 10px;
            font-size: 15px;
            height: 50px;
            width: 300px;
            margin: 30px 50px;
        }

        label {
            display: flex;

            input {
                width: 15px;
                height: 15px;
                margin: 0px 10px 10px 50px;

            }

            span {
                margin-top: -3px;

                a {
                    color: rgb(12, 161, 161);
                }
            }
        }

        p {
            display: block;
            margin-left: 50px;
            margin-bottom: 10px;
            color: red;
            display: none;
        }

        button {
            transition: all .3s ease;
            margin: 10px 0 20px 50px;
            width: 300px;
            height: 70px;
            background-color: rgb(103, 184, 156);
            outline: none;
            border: none;
            cursor: pointer;
            font-size: 15px;
        }

        button:hover {
            background-color: rgb(80, 225, 174);
        }

        button:active {
            background-color: rgb(34, 98, 75);
        }
    }

}

</style>
