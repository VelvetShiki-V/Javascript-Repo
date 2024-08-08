<template>
    <el-dialog title="更新数据" :visible="show" modal center @open="initForm" @close="hideDialog">
        <el-form label-width="200px">
            <el-form-item v-for="item in cols" :key="item" :label="item">
                <el-input v-model="form[item]" v-if="isRef(item)"/>
                <el-select v-model="form[item]" v-else>
                    <el-option v-for="item in tableRelate[item]" :key="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button type="primary" @click="update">更 新</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CryptoJs from 'crypto-js'
export default {
  props: {
    data: Object,
    struct: Object,
    show: Boolean
  },
  data () {
    return {
      form: {},
      cols: [],
      tableRelate: {}
    }
  },
  methods: {
    ...mapActions('table', ['browse_relate_async']),
    // 构造表单
    initForm () {
      this.cols = Object.keys(this.data)
      this.form = { ...this.data } // 浅拷贝, 否则引用赋值, 如果对象中包含嵌套对象, 需要深拷贝
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
    // 隐藏表单
    hideDialog () {
      this.$emit('close')
    },
    sha256Encode (pwd) {
      return CryptoJs.SHA256(pwd).toString()
    },
    // 更新数据
    update () {
      // 过滤null数据
      const submitForm = Object.keys(this.form).reduce((form, col) => {
        if (this.form[col] !== null) form[col] = this.form[col]
        return form
      }, {})
      const submitKeys = {}
      this.struct.pris.forEach(priKey => {
        submitKeys[priKey] = this.data[priKey]
      })
      // password加密
      if (this.struct.name === 'user') {
        // console.log(submitForm)
        submitForm.password = this.sha256Encode(submitForm.password)
      }
      this.$emit('submitUpdate', {
        form: submitForm,
        keys: submitKeys
      })
      this.$emit('close')
    },
    // 是否外键
    isRef (item) {
      if (item === 'super') return false
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
        .el-input {
            width: 550px;
        }
    }
}

.el-form ::v-deep {
    .el-form-item__label {
        font-size: 20px;
    }
}
</style>
