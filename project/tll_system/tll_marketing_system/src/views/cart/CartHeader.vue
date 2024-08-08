<template>
    <thead>
        <tr>
            <th><input type="checkbox" v-model="isAll">全选</th>
            <th style="width: 500px">商品信息</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
            <th>操作</th>
        </tr>
    </thead>
</template>

<script>
export default {
  props: {
    list: Array
  },
  computed: {
    isAll: {
      get () {
        return this.list.every(item => item.status === 'unpaid')
      },
      set (val) {
        if (val === true) this.$emit('updateStatusAll', 'unpaidAll')
        else this.$emit('updateStatusAll', 'pendingAll')
      }
    }
  }
}
</script>

<style lang="less" scoped>
thead {
    tr {
        display: block;
        margin: 10px 0;
        padding: 30px 0;
        border-bottom: 1px solid grey;

        th {
            input {
                vertical-align: middle;
                width: 20px;
                height: 30px;
                margin: 0 3px;
            }
            width: 200px;
            text-align: center;
        }

    }
}
</style>
