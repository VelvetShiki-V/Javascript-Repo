<template>
  <div class="show_table">
    <el-table :data="filteredTable" stripe highlight-current-row border>
      <!-- 展开字段 -->
      <el-table-column type="expand" v-if="expandCols.length">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item v-for="item in expandCols" :key="item" :label="item">
              <span>{{ props.row[item] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 关键展示字段 -->
      <el-table-column v-for="item in headerCols" :key="item" :prop="item" :label="item" width="400" align="left">
        <!-- 命名插槽自定义渲染——内容筛选 -->
        <template slot="header">
          <span>{{ item }} </span>
          <input type="text"  :value="filterKey"
                              :id="item"
                              v-if="pris.includes(item)"
                              style="outline: none"
                              @input="locateInput">
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="operation" width="300" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="warning" round @click="preUpdate(scope.row)">修改</el-button>
          <el-button type="danger" round @click="preDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <updateDialog :show="updateVisible"
                  :data="rowContent"
                  :struct="struct"
                  @close="updateVisible = false"
                  @submitUpdate="update">
  </updateDialog>
  </div>
</template>

<script>
import updateDialog from '@/components/updateDialog'
export default {
  components: {
    updateDialog
  },
  props: {
    struct: Object,
    userInfo: Object
  },
  data () {
    return {
      list: [],
      cols: [],
      pris: [],
      filterKey: '',
      filteredTable: [],
      rowContent: {},
      updateVisible: false
    }
  },
  methods: {
    // 过滤筛选
    locateInput (e) {
      this.filterKey = e.target.value.toLowerCase()
      this.filteredTable = this.list.filter(row => row[e.target.id].toLowerCase().includes(this.filterKey))
    },
    // 删除条目
    preDelete (row) {
      this.$confirm('将删除该条目，是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const keys = {}
        this.pris.forEach(priKey => {
          keys[priKey] = row[priKey]
        })
        this.$emit('delete', keys)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 更新条目
    preUpdate (row) {
      this.rowContent = row
      this.updateVisible = true
    },
    update (obj) {
      this.$emit('update', obj)
    }
  },
  computed: {
    // 页面仅展示主键
    headerCols () {
      return this.cols.filter(col => this.pris.includes(col))
    },
    // 其他键均压缩在expand中
    expandCols () {
      return this.cols.filter(col => !this.pris.includes(col))
    }
  },
  watch: {
    struct: {
      // immediate: true, 只要其中一个数据一改变，马上触发watch
      deep: true,
      handler (newStruct) {
        this.cols = Object.keys(newStruct.table[0])
        this.list = newStruct.table
        this.filteredTable = this.list
        this.pris = newStruct.pris
        this.filterKey = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .show_table {
    .el-table {
      .el-button {
        margin: 0 20px;
      }

      .table-expand {
        padding-left: 30px;

        .el-form-item ::v-deep {
          display: inline;
          overflow: visible;

          label {
            font-size: 17px;
            width: 150px;
          }

          span {
            display: inline;
            word-wrap: break-word;
            font-size: 20px;
            color: purple;
            width: 600px;
          }
        }
      }
    }

  }
</style>
