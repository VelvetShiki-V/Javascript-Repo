<template>
    <!-- 最新专题 -->
    <div class="new wrapper">
        <div class="head">
            <h3>最新专题</h3>
            <a href="#">
                <span>查看全部</span>
                <i class="iconfont icon-next"></i>
            </a>
        </div>
        <div class="body">
            <ul>
                <cardNew v-for="item in cards" :key="item.gid" :goods="item"></cardNew>
            </ul>
        </div>
    </div>
</template>

<script>
import cardNew from './cardNew'
export default {
  props: {
    cards: Array
  },
  components: {
    cardNew
  }
}
</script>

<style lang="less" scoped>
/* 最新专题 */
.new {
    height: 541px;
    background-color: rgb(246, 243, 243);

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
            justify-content: space-between;
            height: 390px;
        }
    }
}
</style>
