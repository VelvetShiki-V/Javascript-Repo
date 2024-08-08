<script setup>
import { useUserStore } from '@/stores/index.js'
import DataContainer from '@/components/DataContainer.vue'
import PopupDialog from '@/views/article/components/PopupDialog.vue'
import { ref } from 'vue'

// 组件实例(通过实例暴露的方法控制弹窗显示逻辑)
const popupDialog = ref()
const isFinishedLoading = ref(true)
const userStore = useUserStore()

// 初始化
const initialize = async () => {
  await userStore.getUserCategoriesAsync({})
  ElNotification.success('数据获取成功')
  isFinishedLoading.value = false
}
initialize()

// 点击删除
const handleDelete = async (row) => {
  await ElMessageBox.confirm(`将删除角色${row.role}，是否继续?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await userStore.setUserCategoriesAsync(
    userStore.dataEvent.deleteEvent,
    row.cid
  )
  await onSubmitSuccess()
}

// 提交完成后
const onSubmitSuccess = async () => {
  isFinishedLoading.value = true
  await userStore.getUserCategoriesAsync({})
  ElMessage.success('更新成功')
  isFinishedLoading.value = false
}
</script>

<template>
  <!--    数据容器卡片-->
  <!--    父传子title，具名插槽传operation，匿名插槽传数据内容-->
  <DataContainer title="用户角色">
    <template #operation>
      <el-button type="primary" @click="popupDialog.dialogShow({})"
        >新增角色</el-button
      >
    </template>

    <!--      匿名插槽传DOM和数据内容-->
    <el-table
      :data="userStore.userCategories"
      stripe
      height="490"
      style="width: 100%"
      v-loading="isFinishedLoading">
      <el-table-column label="index" type="index" align="center" width="100" />
      <el-table-column prop="role" label="role" align="center" width="200" />
      <el-table-column prop="cid" label="CID" align="center" width="200">
        <template #default="{ row }">
          <el-tag>CID: {{ row.cid }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="{ row }">
          <el-button round type="warning" @click="popupDialog.dialogShow(row)">
            修改
          </el-button>
          <el-button round type="danger" @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--  弹窗组件-->
    <PopupDialog
      ref="popupDialog"
      @submitSuccess="onSubmitSuccess"></PopupDialog>
  </DataContainer>
</template>
