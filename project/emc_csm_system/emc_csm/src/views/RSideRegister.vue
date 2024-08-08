<template>
    <div class="register">
        <!-- 查询参数传递 -->
        <h2>{{ $route.query.key }}</h2>
        <form>
            <span>登录：<input type="text" v-model='username'></span>
            <span>注册：<input type="text" v-model='password'></span>
            <button type="submit" @click.prevent="info_submit">提交</button>
        </form>
        <p v-html="response"></p>
    </div>
</template>

<script>
// 使用axios需要导入再使用(npm i axios)
import axios from 'axios'
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
        url: 'http://1.94.180.58:80/register',
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
.register {
    width: 1000px;
    height: 500px;
    background-color: skyblue;
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
        word-wrap: break-word;
        margin: 30px;
        font-size: 20px;
    }
}
</style>
