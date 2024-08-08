<template>
    <li>
        <router-link :to="{ name: 'detail', params: { gid: `${ goods.gid }`} }">
            <img :src="goods.profile + '1.jpg'">
            <h4>{{ goods.title }}</h4>
            <p>{{ goods.desc }}</p>
            <span class="price">￥{{ goods.price }}</span>
            <div class="foot">
                <span class="iconfont icon-aixin">51083</span>
                <span class="iconfont icon-view">100291</span>
                <span class="iconfont icon-chat">7794</span>
            </div>
        </router-link>
    </li>
</template>

<script>
export default {
  props: {
    goods: Object
  }
}
</script>

<style lang="less" scoped>
li {
    position: relative;
    width: 395px;
    height: 390px;
    transition: all 1s ease;
    margin-right: 5px;

    a {
        width: 395px;
        height: 390px;

        img {
            width: 395px;
            /* height: 296px; */
            height: 320px;
            vertical-align: top;
        }

        h4 {
            position: absolute;
            left: 5%;
            bottom: 25%;
            font-size: 25px;
            color: #fff;
        }

        p {
            position: absolute;
            left: 5%;
            bottom: 19%;
            font-size: 18px;
            color: #dbd6d6;
        }

        .price {
            transition: all 0.5s ease;
            position: absolute;
            right: 5%;
            bottom: 25%;
            width: 70px;
            height: 25px;
            background-color: #fff;
            color: red;
            border-radius: 5%;
            text-align: center;
            align-items: center;
        }

        .foot {
            background-color: #fff;
            height: 70px;
            padding: 0 20px;

            .icon-aixin,
            .icon-view {
                display: inline-block;
                width: 70px;
                font-size: 18px;
                line-height: 70px;
                margin-right: 10px;
            }

            .icon-chat {
                margin-left: 100px;
                display: inline-block;
                font-size: 18px;
                line-height: 70px;
            }
        }
    }
}

li:nth-child(3) {
    margin-right: 0;
}

li:hover {
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.5);
    transform: translateY(-5%);

    .price {
        background-color: rgb(103, 184, 156);
    }
}
</style>
