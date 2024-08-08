<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/index.js'

// 组件实例化和响应式数据
const userStore = useUserStore()
const isVisible = ref(false)
const formRef = ref()
const formModel = ref({})
const rules = {
  role: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
}

// 控制显示
const dialogShow = (row) => {
  formModel.value = { ...row }
  isVisible.value = true
}

// 控制提交
const handleSubmit = async () => {
  await formRef.value.validate()
  if (formModel.value.cid) {
    // 更新
    await userStore.setUserCategoriesAsync(
      userStore.dataEvent.updateEvent,
      formModel.value
    )
  } else {
    // 新增
    await userStore.setUserCategoriesAsync(
      userStore.dataEvent.createEvent,
      formModel.value
    )
  }
  // 发送信号
  isVisible.value = false
  emit('submitSuccess')
}

// 暴露给父组件方法
defineExpose({
  dialogShow
})
// 发送信号
const emit = defineEmits(['submitSuccess'])
</script>

<template>
  <el-dialog
    v-model="isVisible"
    :title="formModel.cid ? '修改角色' : '新增角色'"
    width="600"
    center>
    <!--    内容主体-->
    <el-form :model="formModel" :rules="rules" ref="formRef">
      <el-form-item label="role:" label-width="190px" prop="role" required>
        <el-input
          name="role"
          v-model="formModel.role"
          placeholder="新增角色名"></el-input>
      </el-form-item>
    </el-form>

    <!--    footer功能-->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-form {
  .el-form-item {
    .el-input {
      width: 200px;
    }
  }
}
</style>
