<template>
    <div class="hot wrapper">
        <div class="head">
            <h3><slot name='header'></slot><small><slot name='desc'></slot></small></h3>
            <a href="javascript:;"><span>查看全部</span><i class="iconfont icon-next"></i></a>
        </div>
        <div class="body">
            <ul>
                <cardGoods v-for="item in cards" :key="item.gid" :goods="item"></cardGoods>
            </ul>
        </div>
    </div>
</template>

<script>
import cardGoods from './cardGoods.vue'
export default {
  props: {
    cards: Array
  },
  components: {
    cardGoods
  }
}
</script>

<style lang="less" scoped>
/* 热搜商品 */
.hot {
    height: 541px;

    .head {
        display: flex;
        height: 115px;
        align-items: center;

        /* 等价padding: 40px 0; */
        h3 {
            display: flex;
            flex: 1;
            height: 40px;
            color: #333;
            margin-left: 6px;
            font-size: 32px;

            small {
                font-size: 16px;
                margin-left: 20px;
                align-self: flex-end;
                /* 等价于margin-top: 2px; */
                height: 20px;
                font-weight: 400;
                color: #999;
            }
        }

        a {
            height: 23px;

            span {
                margin-right: 4px;
                color: #999;
            }

            i .icon-next {
                font-size: 14px;
            }
        }

        a:hover span,
        a:hover i {
            color: green;
        }
    }

    .body {
        height: 426px;

        ul {
            display: flex;
            justify-content: space-evenly;
            height: 406px;
        }
    }
}
</style>
