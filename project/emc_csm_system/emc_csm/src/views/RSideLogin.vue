<template>
    <div class="login">
        <!-- 动态路由传递 -->
        <h2>{{ $route.params.key }}</h2>
        <form>
            <span>用户：<input type="text" v-model='username'></span>
            <span>密码：<input type="password" v-model='password'></span>
            <button type="submit" @click.prevent="info_submit">提交</button>
        </form>
        <p v-html="response"></p>
    </div>
</template>

<script>
import axios from '../../node_modules/axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      response: ''
    }
  },
  methods: {
    info_submit () {
      axios({
        url: 'http://1.94.180.58:80/login',
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(result => {
        this.response = result.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    width: 1000px;
    height: 500px;
    background-color: pink;
    border: 1px dashed grey;
    padding: 50px;
    form {
        span {
            display: block;
            font-size: 20px;
            margin-bottom: 20px;
            input {
                outline: none;
                height: 30px;
                width: 200px;
            }
        }
        button {
                display: block;
                width: 70px;
                height: 40px;
            }
    }
    p {
        width: 800px;
        margin: 30px;
        font-size: 20px;
        word-wrap: break-word;
    }
}
</style>
