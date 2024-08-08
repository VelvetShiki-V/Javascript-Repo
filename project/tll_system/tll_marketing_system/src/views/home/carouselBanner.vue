<template>
    <!-- banner横幅区域 -->
    <div class="banner wrapper">
        <!-- 左侧导航 -->
        <div class="left">
            <ul>
                <li v-for="item in bannerList" :key="item.category">
                    <a href="javascript:;" class="category">{{ item.category }}</a>
                    <a href="javascript:;" class="description">{{ item.desc }}</a>
                </li>
            </ul>
        </div>
        <!-- 背景链接 -->
        <el-carousel>
            <el-carousel-item v-for="item in banner" :key="item.bid" :style="getBackground(item.urls)"></el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
  props: {
    banner: Array
  },
  data () {
    return {
      bannerList: [
        { category: '居家', desc: '居家生活用品 收纳' },
        { category: '美食', desc: '南北干货 调位酱菜' },
        { category: '服饰', desc: '钱包/胸包 女士靴子' },
        { category: '母婴', desc: '衬衫/polo/靴子 儿童鞋' },
        { category: '个护', desc: '家庭清洁 浴室用品' },
        { category: '严选', desc: '滋补保健 床品家纺' },
        { category: '数码', desc: '影音娱乐 3C数码' },
        { category: '运动', desc: '健身大器械 小器械' },
        { category: '杂项', desc: '家庭清洁杂项' },
        { category: '品牌', desc: '品牌推荐' }
      ]
    }
  },
  methods: {
    getBackground (url) {
      return { backgroundImage: `url(${url})` }
    }
  }
}
</script>

<style lang="less">
/* 横幅区域 */
.banner {
    height: 500px;
    background-color: rgb(246, 243, 243);

    display: flex;
    position: relative;

    .el-carousel {
        position: absolute;
        left: 0;
        overflow: hidden;
        height: 500px;
        width: 1200px;

        button {
            margin-top: 90px;
            height: 70px;
            width: 70px;
            background-color: rgba(0, 0, 0, 0.6);

            i {
                font-size: 20px;
            }
        }

        .el-carousel__arrow--left {
            margin-left: 250px;
        }

        .el-carousel__indicators {
            display: flex;
            margin-bottom: 30px;
            margin-left: 50px;
            height: 35px;
            width: 300px;
            justify-content: space-between;
            align-items: center;

            .el-carousel__indicator {
                width: 30px;
                height: 30px;
                background-color: rgb(186, 181, 181);
                border-radius: 50%;
            }

            .is-active {
                background-color: white;
            }
        }

        .el-carousel__item {
            z-index: 0;
            width: 1200px;
            height: 500px;
            background-size: cover;
            background-repeat: no-repeat;
            h3 {
                color: #475669;
                font-size: 14px;
                opacity: 0.1;
                line-height: 150px;
                margin: 0;
            }
        }
    }

    .left {
        z-index: 3;
        width: 250px;
        background-color: rgba(0, 0, 0, 0.6);

        ul {
            width: 250px;
            height: 500px;
        }

        ul li {
            text-align: left;
            color: #fff;
            width: 250px;
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
        }

        ul li:hover {
            background-color: rgb(103, 184, 156);
        }

        ul li a {
            color: #fff;
        }

        ul li .category {
            font-size: 17px;
        }

        ul li .description {
            font-size: 13px;
        }
    }
}
</style>
