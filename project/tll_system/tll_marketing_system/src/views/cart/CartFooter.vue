<template>
    <tfoot>
        <input type="checkbox" v-model="isAll">
        <span>全选</span>
        <span style="color: red;" @click="delMtps">删除商品</span>
        <span>移入收藏夹</span>
        <span>清空失效商品</span>
        <div class="total">
            共{{ all }}件商品, 已选择{{ selected }}件, 商品合计:
            <span>￥{{ total }}</span>
            <button type="button" @click="pay">下单结算</button>
        </div>
    </tfoot>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    delMtps () {
      this.$emit('preDelMtps')
    },
    pay () {
      this.$emit('pay')
    }
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
    },
    all () {
      return this.list.reduce((sum, cur) => sum + cur.count, 0) || 0
    },
    selected () {
      return this.list.reduce((sum, cur) => {
        if (cur.status === 'unpaid') return sum + cur.count
        else return sum
      }, 0)
    },
    total () {
      return this.list.reduce((sum, cur) => {
        if (cur.status === 'unpaid') return sum + cur.count * cur.price
        else return sum
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
tfoot {
    display: flex;
    flex-wrap: nowrap;
    padding: 30px 0 30px 70px;
    background-color: rgb(245, 245, 245);
    align-items: center;

    input {
        margin-right: 5px;
        width: 20px;
        height: 20px;
    }

    span {
        line-height: 50px;
        margin-right: 50px;
        cursor: pointer;
    }

    span:nth-child(5) {
        margin-right: 150px;
    }

    .total {
        span {
            font-size: 21px;
            font-weight: bold;
            color: red;
        }

        button {
            width: 120px;
            height: 50px;
            background-color: rgb(39, 186, 155);
            color: #fff;
            outline: none;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: rgb(92, 218, 191);

        }
    }
}
</style>
