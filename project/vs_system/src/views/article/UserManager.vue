<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/index.js'
import { Delete, Edit } from '@element-plus/icons-vue'
import DataContainer from '@/components/DataContainer.vue'
import CategoriesSelector from '@/views/article/components/CategoriesSelector.vue'
import FormDrawer from '@/views/article/components/FormDrawer.vue'

// 1. 组件实例与数据响应
const userStore = useUserStore()
const isFinishedLoading = ref(true)
const userList = ref([])
const userFormRef = ref()
const userParams = ref({
  cid: null,
  uid: null,
  username: null,
  pageIndex: 1,
  pageSize: 6
})

// 获取用户列表
const getUserListAsync = async () => {
  isFinishedLoading.value = true
  await userStore.getUserListAsync(userParams.value)
  userList.value = userStore.userList
  ElNotification.success('数据获取成功')
  isFinishedLoading.value = false
}

// 获取角色分类
const getCategories = async () => {
  await userStore.getUserCategoriesAsync({})
}

// 2. 初始化数据
const initialize = async () => {
  await getUserListAsync()
  await getCategories()
}
initialize()

// filter query
const handleQuery = async (params) => {
  userParams.value.pageIndex = 1
  for (const [key] of Object.entries(params)) {
    userParams.value[key] = params[key]
  }
  await getUserListAsync()
}

// 控制显示隐藏
const handleEdit = async (flag, row) => {
  userFormRef.value.drawerShow(flag, row)
}

// CRUD button
// 删除
const handleDelete = async (row) => {
  await ElMessageBox.confirm(`将删除用户${row.username}，是否继续?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await userStore.setUserListAsync(userStore.dataEvent.deleteEvent, row.uid)
  await getUserListAsync()
  ElMessage.success('用户删除成功')
}
// 更新新增
const handleSubmit = async (flag, form) => {
  await userStore.setUserListAsync(flag, form)
  if (flag === userStore.dataEvent.createEvent) {
    // 新增事件，页码同步更新
    userParams.value.pageIndex = Math.ceil(
      (userList.value.total + 1) / userParams.value.pageSize
    )
  }
  await getUserListAsync()
}

// pagination
const handleSizeChange = async (size) => {
  userParams.value.pageIndex = 1
  userParams.value.pageSize = size
  await getUserListAsync()
}
const handleCurrentChange = async (index) => {
  userParams.value.pageIndex = index
  await getUserListAsync()
}
</script>

<template>
  <!--    数据容器卡片-->
  <!--    父传子title，具名插槽传operation，匿名插槽传数据内容-->
  <DataContainer title="用户列表">
    <!--    数据选择器, v-model控制子选择器选中后数据的显示和默认显示-->
    <CategoriesSelector
      @onQuery="handleQuery"
      :list="userStore.userCategories" />
    <template #operation>
      <el-button
        type="primary"
        @click="handleEdit(userStore.dataEvent.createEvent, {})"
        >新增用户</el-button
      >
    </template>

    <!--      匿名插槽传DOM和数据内容-->
    <el-table
      :data="userList.list"
      stripe
      style="width: 100%"
      height="400"
      border
      v-loading="isFinishedLoading"
      element-loading-text="Loading...">
      <!--        索引-->
      <el-table-column type="index" width="50" align="center" />
      <!--        头像-->
      <el-table-column label="profile" width="100" align="center">
        <!--        作用域插槽获取当前行内容，并根据内容渲染组件-->
        <template #default="{ row }">
          <el-avatar :src="row.profile" />
        </template>
      </el-table-column>
      <!--        username-->
      <el-table-column
        prop="username"
        label="Username"
        width="250"
        align="center" />
      <!--        role, tel-->
      <el-table-column prop="role" label="Role" width="200" align="center" />
      <el-table-column prop="tel" label="Tel" width="200" align="center" />
      <!--        addr, time-->
      <el-table-column label="Extra" align="center">
        <template #default="scope">
          <el-popover
            effect="light"
            trigger="hover"
            placement="top"
            width="auto">
            <template #default>
              <div style="color: #dd6161">Addr: {{ scope.row.addr }}</div>
              <div style="color: #0ca1a1">
                Create time: {{ scope.row.createTime }}
              </div>
              <div style="color: #ebb563">
                Update time: {{ scope.row.updateTime }}
              </div>
            </template>
            <template #reference>
              <el-tag>UID: {{ scope.row.uid }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <!--        操作-->
      <el-table-column label="Operations" align="center">
        <template #default="scope">
          <el-button
            circle
            :icon="Edit"
            type="warning"
            plain
            @click="handleEdit(userStore.dataEvent.updateEvent, scope.row)"
            @submit="handleSubmit" />
          <el-button
            circle
            :icon="Delete"
            type="danger"
            plain
            @click="handleDelete(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </DataContainer>

  <!--    分页-->
  <el-pagination
    v-model:current-page="userParams.pageIndex"
    v-model:page-size="userParams.pageSize"
    :page-sizes="[2, 3, 6, 7, 10]"
    :background="true"
    layout="total, sizes, prev, pager, next, jumper"
    :total="userList.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />

  <!--  抽屉-->
  <FormDrawer
    ref="userFormRef"
    :list="userStore.userCategories"
    @onSubmit="handleSubmit">
  </FormDrawer>
</template>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
  height: 30px;
}
</style>
