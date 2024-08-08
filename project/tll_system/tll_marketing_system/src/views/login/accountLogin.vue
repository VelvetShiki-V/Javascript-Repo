<template>
    <div class="body_account tab_active">
        <div class="toggle">
            <a href="javascript: alert('验证码已发送！');">使用短信登录</a>
        </div>
        <form @submit.prevent>
            <input type="text" placeholder="用户名输入" required v-model="username" v-focus>
            <input type="password" placeholder="密码输入" required v-model="password">
            <label>
                <input type="checkbox" required v-model="protocol">
                <span>
                    我已同意
                    <a href="#">《隐私条款》</a>
                    和
                    <a href="#">《服务条款》</a>
                </span>
            </label>
            <p>!请先勾选用户协议</p>
            <button type="submit" @click="login">登录</button>
        </form>
        <div class="action">
            <a href="/qrcode" class="qq">QQ登录</a>
            <a href="/register">忘记密码</a>
            <a href="/register">免费注册</a>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      username: null,
      password: null,
      protocol: false
    }
  },
  methods: {
    ...mapActions('user', ['fetch_token_async']),
    // 登录并发送用户信息, 成功则跳转至主页
    async login () {
      if (!this.username || !this.password || !this.protocol) {
        this.$message.warning('请输入完整的用户信息，并勾选协议!')
        return
      }
      const postData = {
        username: this.username,
        password: this.password
      }
      // 登录信息发送，并获取uid和token, username存入vuex仓库
      await this.fetch_token_async(postData) // await必须加，若遇到Promise.reject就抛异常，停止向下继续执行
      this.$message.success('登录成功')
      this.$router.push('/home')
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.body_account {

    .toggle {
        text-align: end;
        padding: 10px 30px 0;
        height: 15px;

        a {
            color: rgb(103, 184, 156);
        }
    }

    form {
        position: relative;

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

    .action {
        display: flex;
        padding: 10px 50px;

        a {
            color: grey;
            font-size: 15px;
            margin-left: 10px;
        }

        .qq {
            margin-right: 95px;
        }

        a:hover {
            color: rgb(103, 184, 156);
        }
    }
}
</style>
