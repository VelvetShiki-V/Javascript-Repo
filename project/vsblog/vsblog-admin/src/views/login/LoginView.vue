<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { LoginForm } from '@/types/user'
import { ElMessage } from 'element-plus'

const formRef = ref()
const userStore = useUserStore()
const router = useRouter()
const accept = ref(false)

// 表单结构
const formModel = ref<LoginForm>({
  name: '',
  password: ''
})

// 登录函数
const handleLogin = () => {
  formRef.value.validate().then(async (success: boolean) => {
    if (success) {
      await userStore.loginSSO(formModel.value)
      // 保存登录用户信息
      await userStore.getLoginAdminInfo()
      // 跳转主页
      console.log('登录成功')
      router.push('/layout')
    } else {
      ElMessage.error('登录失败')
    }
  })
}

// 重置函数
const handleReset = () => {
  formRef.value.resetValidation()
  formModel.value.name = ''
  formModel.value.password = ''
}
</script>

<template>
  <div class="login row flex-center">
    <div class="col-5" style="padding-left: 5%">
      <div class="logo" />
    </div>
    <div class="col-5">
      <div class="form">
        <h2 style="font-weight: 700">Admin</h2>
        <q-form ref="formRef" :model="formModel">
          <q-input
            v-model="formModel.name"
            :rules="[
              (name) => (name !== null && name !== '') || '请输入正确用户名',
              (name) =>
                (name.length >= 2 && name.length <= 16) ||
                '用户名必须是2-16位非空字符'
            ]"
            lazy-rules
            type="text"
            label="Admin Name"
            clearable
            autofocus></q-input>
          <q-input
            v-model="formModel.password"
            :rules="[
              (pwd) => (pwd !== null && pwd !== '') || '请输入正确密码',
              (pwd) => pwd.length > 5 || '密码必须大于5位'
            ]"
            label="Admin Pwd"
            type="password"
            clearable></q-input>
          <q-btn color="primary" label="登录" @click="handleLogin"></q-btn>
          <q-btn
            color="warning"
            label="重置"
            type="reset"
            @click="handleReset"></q-btn>
          <q-toggle v-model="accept" label="我同意用户条款《安全协议》" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/background.png);
  background-size: cover;
  background-repeat: no-repeat;

  .logo {
    width: 500px;
    height: 500px;
    background-image: url(@/assets/logo.gif);
    border-radius: 10%;
  }

  .form {
    width: 700px;
    height: 500px;
    background-color: rgba(145, 194, 237, 0.75);
    padding: 50px;
    text-align: center;
    border-radius: 50%;

    .q-form {
      margin: 40px;

      .q-input {
        font-size: 20px;
      }
      .q-btn {
        margin: 30px;
        width: 150px;
        height: 50px;
      }
    }
  }
}
</style>
