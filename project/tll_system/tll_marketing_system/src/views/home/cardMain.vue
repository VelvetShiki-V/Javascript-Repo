<template>
    <li>
        <router-link :to="{ name: 'detail', params: { gid: `${goods.gid}` } }">
            <div class="goods">
                <img :src="goods.profile + '1.jpg'">
                <h4>{{ goods.title }}</h4>
                <p class="description">{{ goods.desc }}</p>
                <p class="price">￥{{ goods.price }}</p>
                <div class="link">
                    <p>找相似</p>
                    <p>发现更多宝贝</p>
                </div>
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
    height: 300px;
    width: 233px;
    margin-right: 4px;
    background-color: #fff;

    .goods {
        position: relative;
        border: 1px solid rgba(103, 184, 156, 0);
        transition: all 0.5s ease;
        height: 299px;
        width: 232px;
        padding: 10px 30px;
        overflow: hidden;

        img
        {
            transition: all 0.5s ease;
            width: 173px;
            height: 173px;
        }

        h4 {
            margin-top: 6px;
            height: 44px;
            font-size: 16px;
        }

        .description {
            margin-top: 6px;
            font-size: 14px;
            color: #666;
        }

        .price {
            margin-top: 3px;
            color: #CF4444;
            font-size: 20px;
        }

        .link {
            display: block;
            position: absolute;
            bottom: -111px;
            left: 0;
            transition: all 0.5s ease;
            height: 111px;
            width: 233px;
            background-color: rgba(103, 184, 156, 1);
            padding: 30px 60px;
            color: white;
            text-align: center;

            p {
                padding-bottom: 5px;
                margin-bottom: 10px;
                border-bottom: 1px solid white;
            }

            p:nth-child(2) {
                font-size: 13px;
                border-bottom: 0;
            }
        }
    }

    .goods:hover {
        border: 1px solid rgba(103, 184, 156, 1);

        .link {
            bottom: 0;
        }
    }

    .goods:hover img {
        transform: scale(1.05);
    }
}

li::nth-child(4) {
    margin-right: 0;
}
</style>
