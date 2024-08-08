<template>
    <!-- 居家 -->
    <div class="mainwindow wrapper">
        <div class="head">
            <h3><slot name="header"></slot></h3>
            <div class="sub">
                <a href="#">居家生活用品</a>
                <a href="#">收纳</a>
                <a href="#">宠物食品</a>
                <a href="#">艺术藏品</a>
                <a href="#">宠物用品</a>
                <a href="#">家庭医疗</a>
                <a href="#">中医保健</a>
            </div>
            <a href="#">
                <span>查看全部</span>
                <i class="iconfont icon-next"></i>
            </a>
        </div>
        <div class="body">
            <!-- 左侧图片链接 -->
            <a href="#">
                <img src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/home_goods_cover.jpg" alt="">
                <span class="title">居家馆</span>
                <span class="content">3折起狂欢</span>
            </a>
            <!-- 右侧商品列表 -->
            <ul>
                <cardMain v-for="item in cards" :key="item.gid" :goods="item"></cardMain>
            </ul>
        </div>
    </div>
</template>

<script>
import cardMain from './cardMain'
export default {
  components: {
    cardMain
  },
  props: {
    cards: Array
  }
}
</script>

<style lang="less" scoped>
/* 主浏览区域：居家，美食，服饰 */
.mainwindow {
    height: 725px;

    .head {
        display: flex;
        height: 115px;
        align-items: center;

        h3 {
            flex: 1;
            margin-left: 6px;
            font-size: 32px;
            text-align: left;
            color: #333;
            min-width: 300px;
        }

        .sub {
            min-width: 700px;
            height: 23px;
            margin-bottom: 2px;

            a {
                text-align: center;
                align-self: center;
                padding: 2px 12px;
                font: 16px;
            }

            a:hover {
                background-color: rgb(103, 184, 156);
                color: white;
                border-radius: 8%;
                ;
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
        display: flex;
        height: 610px;

        a {
            display: flex;
            position: relative;
            height: 100%;
            width: 240px;
            color: white;
            text-align: center;
            font-size: 18px;

            img {
                height: 100%;
                width: 240px;
            }

            .title {
                transition: all 0.5s ease;
                width: 76px;
                height: 66px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                line-height: 66px;
                background-color: rgba(0, 0, 0, 0.7);
            }

            .content {
                transition: all 0.5s ease;
                width: 112px;
                height: 66px;
                position: absolute;
                top: 50%;
                left: 76px;
                transform: translateY(-50%);
                line-height: 66px;
                background-color: rgba(0, 0, 0, 0.4);
            }
        }

        a:hover .title {
            background-color: rgba(103, 184, 156, 1);
        }

        a:hover .content {
            background-color: rgba(103, 184, 156, 0.7);
            width: 164px;
        }

        ul {
            display: flex;
            flex-wrap: wrap;
            margin-left: 10px;
            max-width: 950px;
            height: 100%;
            flex: 1;
        }
    }
}
</style>
