<template>
    <tfoot>
        <input type="checkbox" :checked="isAll" @change="change_all(isAll)">
        <span>全选</span>
        <span style="color: red;" @click="del_all">删除商品</span>
        <span>移入收藏夹</span>
        <span>清空失效商品</span>
        <div class="total">
            共{{ all }}件商品, 已选择{{ selected }}件, 商品合计:
            <span>￥{{ total }}</span>
            <button>下单结算</button>
        </div>
    </tfoot>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapMutations('cart', ['modify_all', 'del_all']),
    change_all (flag) {
      if (flag) this.modify_all(false)
      else this.modify_all(true)
      // 等价写法
      // if (flag) this.$store.commit('cart/modify_all', false)
      // else this.$store.commit('cart/modify_all', true)
    }
  },
  computed: {
    ...mapState('cart', ['list']),
    ...mapGetters('cart', ['isAll', 'all', 'selected', 'total'])
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
