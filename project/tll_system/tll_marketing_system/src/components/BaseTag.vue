<template>
    <!-- 需求: 双击标签进入编辑模式，回车或失焦时发送更改请求并回显 -->
    <span v-if="isShown" @dblclick="isShown = false">{{ obj.count }}</span>
    <!-- 输入框在双击或回车后向父组件发送修改请求，再异步修改远程数据，在父组件修改接收新值后父传子同步回tag组件并回显到span上，再同步到input中 -->
    <input type="text" v-else @keyup.enter="edit" @blur="edit"
    @keydown="spaceHandler" v-focus :value="obj.count" @input="preEdit" @focus="sync">
</template>

<script>
export default {
  props: {
    obj: Object
  },
  data () {
    return {
      isShown: true,
      newInput: this.obj.count
    }
  },
  methods: {
    // 回显input时自动侦测span是否被修改
    sync () {
      if (this.newInput !== this.obj.count) {
        this.newInput = this.obj.count
        // console.log('检测到外部修改, 自动修改newInput数值: ', this.newInput)
      }
    },
    // 输入新值预检测
    preEdit (e) {
      this.newInput = Number(e.target.value)
    //   console.log('newInput get sync: ', this.newInput)
    },
    // 编辑请求父组件修改tag数据(注意: 触发keyup.enter回车会自动触发blur, 所以edit会被触发两次)
    edit () {
      if (!this.newInput) {
        return this.$message.warning('数量不能为空!')
      } else if (this.newInput === this.obj.count) {
        this.isShown = true
      } else if (this.newInput <= 0 || this.newInput >= 100) {
        return this.$message.warning('输入数量不合法!')
      } else {
        // 回显span数据，并发送修改请求
        this.$emit('update', {
          item: this.obj,
          step: this.newInput - this.obj.count
        })
        this.isShown = true
      }
    },
    // 阻止非数值输入(除了退格和delete)
    spaceHandler (e) {
      if (e.keyCode === 8 || e.keyCode === 127) return
      if (e.keyCode <= 47 || e.keyCode >= 58) e.preventDefault()
    }
  }
}
</script>

<style lang="less" scoped>
span {
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
    text-decoration: underline;
    width: 20px;
}

input {
    width: 50px;
    height: 40px;
    outline: none;
    font-size: 18px;
}
</style>
