<template>
    <el-dialog title="新增数据" :visible="show" modal center @open="initDialog" @close="hideDialog">
        <el-form label-width="200px">
            <el-form-item v-for="item in cols" :key="item" :label="item">
              <input type="text" v-model="form[item]" :placeholder="isNotNull(item)" v-if="isRef(item)" :required="isNotNull(item)">
                <select v-else v-model="form[item]">
                  <option v-for="ele in tableRelate[item]" :key="ele.name" :value="ele.name">{{ ele.name }}</option>
                </select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button type="primary" @click="insert">插 入</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CryptoJs from 'crypto-js'

export default {
  props: {
    struct: Object,
    show: Boolean
  },
  data () {
    return {
      cols: [],
      form: {},
      tableRelate: {}
    }
  },
  methods: {
    ...mapActions('table', ['browse_relate_async']),
    // 打开弹框初始化
    initDialog () {
      this.cols = Object.keys(this.struct.table[0]) // 解析字段
    },
    // watch监听父组件struct数据，再进行外键表获取(父子组件异步通信)
    propsReceived (newStruct) {
      if (newStruct.refs.length) {
        // 获取外键表
        if (newStruct.refs.length) {
          newStruct.refs.forEach(async refCol => {
            await this.browse_relate_async({
              token: this.userInfo.token,
              user: this.userInfo.user,
              table: newStruct.refs[0] === 'super' ? 'domain' : refCol
            })
            this.tableRelate[refCol] = this.relateTable
          })
        }
      }
    },
    // 隐藏表单并清空
    hideDialog () {
      Object.keys(this.form).forEach(key => { this.form[key] = '' })
      this.$emit('close')
    },
    sha256Encode (pwd) {
      return CryptoJs.SHA256(pwd).toString()
    },
    // 插入数据
    insert () {
      // password加密
      if (this.struct.name === 'user') {
        this.form.password = this.sha256Encode(this.form.password)
      }
      this.$emit('submitInsert', this.form)
      this.$emit('close')
    },
    // 根据主键改变样式
    isNotNull (item) {
      if (this.struct.pris.includes(item)) return '必填字段'
    },
    // 是否外键
    isRef (item) {
      if (this.struct.refs.includes(item)) return false
      else return true
    }
  },
  computed: {
    ...mapState('table', ['relateTable']),
    ...mapState('user', ['userInfo'])
  },
  watch: {
    struct: {
      deep: true,
      handler (val) {
        this.propsReceived(val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
    .el-form-item {
        margin-bottom: 30px;

        input {
            width: 550px;
            height: 40px;
            padding-left: 10px;
            font-size: 20px;
            border-width: 1px;
            outline: none;
        }

        input:hover {
            transition: all .5s ease;
            border-color: red;
        }

        input:focus {
            border-color: blue;
        }

        select {
          width: 200px;
          height: 40px;
          outline: none;
          font-size: 20px;
          padding-left: 10px;
        }
    }
}

.el-form ::v-deep {
    .el-form-item__label {
        font-size: 20px;
    }
}
</style>
