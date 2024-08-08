<script setup>
import { watch, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

// 响应式数据和组件实例
const isRegister = ref(false) // 登录或注册显示
const userStore = useUserStore()
const router = useRouter()
const formModel = ref({
  // formModel作用于el-form :model上, 每条属性与其中的el-input使用v-model绑定
  username: null,
  password: null,
  repassword: null,
  tel: null
})
const formRef = ref() // 获取表单DOM元素，用于提交校验
// 定义校验规则，rules校验对象定义于el-form的:rules上，每个属性的校验规则绑定于el-form-item的prop中
const rules = {
  username: [
    // 非空校验required
    { required: true, message: '请输入用户名', trigger: 'blur' },
    // 长度校验min, max
    { min: 2, max: 16, message: '用户名必须是2-16位字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    // 正则校验pattern
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为6-15位非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为6-15位非空字符',
      trigger: 'blur'
    },
    // 自定义校验（密码二次验证）
    {
      // rule: 当前校验规则相关信息
      // value: 目前表单值
      // callback: 返回校验结果, 成功还是失败都需要调（失败new Error(错误信息)）
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password)
          callback(new Error('两次输入密码不一致'))
        else callback() // 校验成功也要callback
      },
      trigger: 'blur'
    }
  ],
  tel: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号不合法', trigger: 'blur' }
  ]
}

// 注册button
const registerVerify = async () => {
  // 校验失败抛出promise.reject，不会向下执行
  await formRef.value.validate()
  // 后台提交注册请求
  await userStore.setUserListAsync(
    userStore.dataEvent.createEvent,
    formModel.value
  )
  ElNotification.success('注册成功')
  isRegister.value = false
}

// 登录button
const loginVerify = async () => {
  // 校验失败抛出promise.reject，不会向下执行
  await formRef.value.validate()
  // 后台提交注册请求, 将token存入localStorage
  await userStore.getTokenAsync(formModel.value)
  formModel.value.password = null // 防止密码泄露
  await userStore.getLoginUserAsync(formModel.value)
  ElMessage.success('登录成功')
  router.push('/layout')
}

// 监视逻辑切换，清空表单
watch(isRegister, () => {
  formRef.value.resetFields()
})
</script>

<template>
  <div class="login_page">
    <el-row justify="center">
      <!-- 左侧logo区域 -->
      <el-col :span="10" :offset="2">
        <img src="@/assets/logo.jpg" alt="." />
      </el-col>

      <!-- 右侧登录, 注册表单区域 -->
      <el-col :span="8" :offset="1" class="form_area">
        <!-- 登录，注册区域, ref获取form实例进行整体校验 -->
        <el-form
          :model="formModel"
          :rules="rules"
          size="large"
          autocomplete="off"
          ref="formRef">
          <h1 v-if="!isRegister">登录</h1>
          <h1 v-else>注册</h1>

          <!-- 用户名输入 -->
          <el-form-item label="用户: " prop="username">
            <el-input
              name="username"
              :prefix-icon="User"
              v-model="formModel.username"
              type="text"
              placeholder="请输入用户名"
              clearable></el-input>
          </el-form-item>

          <!-- 密码输入 -->
          <el-form-item label="密码: " prop="password">
            <el-input
              name="password"
              v-model="formModel.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              clearable></el-input>
          </el-form-item>

          <!-- 注册区域 -->

          <!-- 密码二次输入 -->
          <el-form-item label="重输: " prop="repassword" v-if="isRegister">
            <el-input
              v-model="formModel.repassword"
              type="password"
              placeholder="请再次输入密码"
              clearable>
            </el-input>
          </el-form-item>

          <!-- 手机号 -->
          <el-form-item label="电话: " prop="tel" v-if="isRegister">
            <el-input
              v-model="formModel.tel"
              type="text"
              placeholder="请输入手机号"
              clearable>
            </el-input>
          </el-form-item>

          <!-- 文字链接 -->
          <el-text
            class="mx-1 text_click"
            @click="isRegister = true"
            v-if="!isRegister"
            >注册</el-text
          >
          <el-text class="mx-1 text_click" @click="isRegister = false" v-else
            >返回登录</el-text
          >

          <!-- 按钮 -->
          <el-button type="primary" v-if="!isRegister" @click="loginVerify"
            >登录</el-button
          >
          <el-button type="success" v-else @click="registerVerify"
            >注册</el-button
          >
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login_page {
  margin: 0 auto;
  padding: 0;
  width: 1500px;
  height: 838px;
  background-image: url(@/assets/login.jpg);
  background-size: contain;
  background-repeat: no-repeat;

  .el-row {
    padding-top: 150px;
    align-items: center;

    .el-col {
      img {
        height: 500px;
      }
    }

    .form_area {
      h1 {
        font-size: 40px;
        text-align: center;
        margin: 50px 0;
      }

      background-color: rgba(135, 207, 235, 0.608);
      height: 600px;

      .el-form {
        padding: 30px 70px;

        .el-form-item {
          margin-bottom: 30px;

          .el-input {
            width: 300px;
          }
        }
      }

      .el-text {
        font-size: 17px;
        color: red;
        cursor: pointer;
        transition: all 0.5s ease;
        margin: 15px;
      }

      .el-text:hover {
        color: greenyellow;
      }

      .el-button {
        margin: 30px 90px;
        width: 200px;
        height: 50px;
      }
    }
  }
}
</style>
