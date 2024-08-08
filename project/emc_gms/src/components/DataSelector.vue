<script setup lang="ts">
import { ref } from 'vue'

// 组件实例和响应式数据

const emit = defineEmits(['on-query'])
const params = ref({
  cid: null,
  uid: null,
  username: null
})

// 重置表单
const handleReset = () => {
  params.value = {
    cid: null,
    uid: null,
    username: null
  }
  emit('on-query', params.value)
}
</script>

<template>
  <el-form inline class="queryForm">
    <el-form-item label="Id: ">
      <el-input v-model="params.username" style="width: 200px" clearable />
    </el-form-item>
    <el-form-item label="Name: ">
      <el-input v-model="params.username" style="width: 200px" clearable />
    </el-form-item>
    <el-form-item label="Owner: ">
      <el-input v-model="params.uid" style="width: 200px" clearable />
    </el-form-item>
    <el-form-item label="Labels: ">
      <el-input v-model="params.uid" style="width: 200px" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain round @click="emit('on-query', params)"
        >查询</el-button
      >
      <el-button type="success" plain round @click="handleReset"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.queryForm {
  margin-bottom: -15px;
  display: flex;
  height: 40px;
  .el-form-item {
    .el-button {
      width: 80px;
    }
  }
}
</style>
