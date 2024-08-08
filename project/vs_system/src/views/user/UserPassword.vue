<script setup>
import { ref, watch } from 'vue'
import DataContainer from '@/components/DataContainer.vue'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'

// 响应式数据和组件实例
const formModel = ref({})
const formRef = ref()
const formChangedStatus = ref(false)
const rules = {
  rawpassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== userStore.user.password) callback(new Error('密码错误'))
        else callback() // 校验成功也要callback
      },
      trigger: 'blur'
    }
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
      // rule: 当前校验规则相关信息, value: 目前表单值, callback: 返回校验结果, 成功还是失败都需要调（失败new Error(错误信息)）
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password)
          callback(new Error('两次输入密码不一致'))
        else callback() // 校验成功也要callback
      },
      trigger: 'blur'
    }
  ]
}
const userStore = useUserStore()
const router = useRouter()

const handleSubmit = async () => {
  await formRef.value.validate()
  userStore.user.password = formModel.value.password
  await userStore.setUserListAsync(
    userStore.dataEvent.updateEvent,
    userStore.user
  )
  ElMessage.success('修改成功，请重新登录')
  userStore.removeLoginUser()
  await router.push('/login')
}
const handleReset = () => {
  formRef.value.resetFields()
}

watch(
  formModel,
  (newVal) => {
    if (newVal.password !== '') formChangedStatus.value = true
    else formChangedStatus.value = false
  },
  { deep: true }
)
</script>

<template>
  <DataContainer title="用户资料">
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <el-form :model="formModel" :rules="rules" ref="formRef" status-icon>
          <el-form-item
            label="原密码: "
            required
            label-width="120"
            prop="rawpassword">
            <el-input
              type="password"
              name="username"
              v-model="formModel.rawpassword"
              placeholder="请填写原密码" />
          </el-form-item>
          <el-form-item
            label="新密码: "
            required
            label-width="120"
            prop="password">
            <el-input
              type="password"
              name="password"
              v-model="formModel.password"
              placeholder="请填写新密码" />
          </el-form-item>
          <el-form-item
            label="再次填入密码: "
            required
            label-width="120"
            prop="repassword">
            <el-input
              type="password"
              name="repassword"
              v-model="formModel.repassword"
              placeholder="请再次填写密码" />
          </el-form-item>
          <el-button
            type="primary"
            :disabled="!formChangedStatus"
            @click="handleSubmit"
            >修改</el-button
          >
          <el-button
            type="warning"
            :disabled="!formChangedStatus"
            @click="handleReset"
            >重置</el-button
          >
        </el-form>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </DataContainer>
</template>

<style lang="scss" scoped>
.el-form-item {
  margin: 30px 0;
  .el-input {
    width: 200px;
  }
}
</style>
