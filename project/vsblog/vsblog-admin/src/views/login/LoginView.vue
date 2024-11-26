<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { LoginForm } from '@/types/user'

const formModel = ref<LoginForm>({
  name: '',
  password: ''
})
const formRef = ref()
const userStore = useUserStore()
const router = useRouter()
const initialize = () => {
  userStore.removeLoginUser()
}
initialize()

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 16, message: '用户名必须是2-16位非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    // 正则校验pattern
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为6-15位非空字符',
      trigger: 'blur'
    }
  ]
}

const handleLogin = async () => {
  await formRef.value.validate()
  // 存储token
  // try {
  await userStore.loginSSO(formModel.value)
  // } catch {
  // return
  // }
  // 保存登录用户信息
  await userStore.getLoginAdminInfo()
  // 跳转主页
  console.log('登录成功')
  router.push('/layout')
}

const handleReset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <div class="login">
    <el-row>
      <el-col :span="12">
        <div class="logo" />
      </el-col>
      <el-col :span="12">
        <div class="form">
          <h1>Login</h1>
          <el-form ref="formRef" :model="formModel" :rules="rules" status-icon>
            <el-form-item
              label="用户名"
              label-width="100"
              prop="username"
              required>
              <el-input
                v-model="formModel.name"
                type="text"
                clearable></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              label-width="100"
              prop="password"
              required>
              <el-input
                v-model="formModel.password"
                type="password"
                clearable></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <el-button type="warning" @click="handleReset">重置</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 1000px;
  background-image: url(@/assets/star.avif);
  background-size: cover;
  background-repeat: no-repeat;

  .logo {
    margin: 150px;
    width: 500px;
    height: 500px;
    background-image: url(@/assets/EMC.gif);
    border-radius: 10%;
  }

  .form {
    margin: 150px 0;
    width: 700px;
    height: 500px;
    background-color: rgba(200, 135, 235, 0.75);
    padding: 50px;
    text-align: center;
    border-radius: 50%;

    .el-form {
      margin: 80px;

      .el-form-item {
        margin: 50px 0;

        .el-input {
          width: 250px;
          margin-left: 0;
        }
      }

      .el-button {
        margin: 0 30px;
        width: 100px;
        height: 40px;
      }
    }
  }
}
</style>
