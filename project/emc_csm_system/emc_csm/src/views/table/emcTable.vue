<template>
  <div class="tableShow">
    <h2>{{ tableInfo.name }}表</h2>
    <div class="operation">
      <!-- 新增数据 -->
      <el-button type="primary" class="operate" round @click="insertVisible = true">新增数据</el-button>
      <el-button type="success" class="operate" round @click="refreshTable">刷新表格</el-button>
    </div>
    <tableDisplay v-if="tableInfo.table.length"
                  :struct="tableInfo"
                  :userInfo="userInfo"
                  @update="updateRecord"
                  @delete="deleteRecord">
    </tableDisplay>
    <h3 v-else>表格获取失败</h3>
    <insertDialog :show="insertVisible"
                  :struct="tableInfo"
                  @close="insertVisible = false"
                  @submitInsert="insertRecord">
    </insertDialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tableDisplay from '@/components/tableDisplay'
import insertDialog from '@/components/insertDialog'

export default {
  // 创建即初始化表格
  async created () {
    await this.refreshTable()
  },
  data () {
    return {
      tableInfo: {
        name: '',
        table: [],
        pris: [], // 主键
        refs: [] // 外键
      },
      insertVisible: false
    }
  },
  methods: {
    ...mapActions('table', ['insert_async', 'update_async', 'delete_async', 'browse_async', 'fetch_schema_async']),
    // 插入
    async insertRecord (form) {
      const postData = {
        user: this.userInfo.user,
        token: this.userInfo.token,
        table: this.tableInfo.name,
        record: form
      }
      await this.insert_async(postData)
      this.$message.success('数据插入成功')
      await this.refreshTable()
    },
    // 更新
    async updateRecord (obj) {
      const postData = {
        token: this.userInfo.token,
        user: this.userInfo.user,
        table: this.tableInfo.name,
        key: obj.keys,
        record: obj.form
      }
      // console.log('update postData: ', postData)
      await this.update_async(postData)
      this.$message.success('数据更新成功')
      await this.refreshTable()
    },
    // 删除
    async deleteRecord (keys) {
      const postData = {
        token: this.userInfo.token,
        user: this.userInfo.user,
        table: this.tableInfo.name,
        key: keys
      }
      // console.log('delete postData: ', postData)
      await this.delete_async(postData)
      this.$message.success('数据删除成功')
      await this.refreshTable()
    },
    // 刷新table
    async refreshTable () {
      this.tableInfo.name = this.$route.path.slice(this.$route.path.lastIndexOf('/') + 1)
      const postData = {
        token: this.userInfo.token,
        user: this.userInfo.user,
        table: this.tableInfo.name
      }
      // 获取表格数据
      await this.browse_async(postData)
      this.tableInfo.table = this.mainTable
      // 获取表格结构
      this.tableInfo.pris = []
      this.tableInfo.refs = []
      const schemaList = await this.fetch_schema_async(postData)
      schemaList.forEach(col => {
        if (col.COLUMN_KEY === 'PRI') this.tableInfo.pris.push(col.COLUMN_NAME)
        else if (col.COLUMN_KEY === 'MUL') this.tableInfo.refs.push(col.COLUMN_NAME)
      })
      if (this.tableInfo.name === 'rbac') this.tableInfo.refs = ['role', 'access', 'domain']
      else if (this.tableInfo.name === 'user_product') this.tableInfo.refs = ['user', 'product']
      this.$notify.success('表格数据刷新成功')
    }
  },
  components: {
    tableDisplay,
    insertDialog
  },
  computed: {
    ...mapState('table', ['mainTable']),
    ...mapState('user', ['userInfo'])
  }
  // watch: {
  //   '$route' (to, from) {
  //     console.log('路由变了')
  //     this.refreshTable()
  //   }
  // }
}
</script>

<style lang="less" scoped>
.tableShow {
  // width: 1350px;
  background-color: skyblue;
  border: 1px solid grey;
  padding: 50px;

  .operation {
    .operate {
      margin: 20px 30px 20px 0;
    }
  }
}
</style>
