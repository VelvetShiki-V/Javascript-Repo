<template>
    <li>
        <router-link :to="{ name: 'detail', params: { gid: `${ goods.gid }`} }">
            <img :src="goods.profile + '1.jpg'">
            <h4>{{ goods.title }}</h4>
            <p>{{ goods.price }}</p>
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
    height: 406px;
    transition: all 1s ease;
    margin-right: 5px;

    a {
        img {
            width: 296px;
            height: 296px;
        }

        h4 {
            height: 43px;
            font-size: 22px;
            color: #333;
            text-align: center;
            align-self: center;
        }

        p {
            height: 38px;
            font-size: 18px;
            color: #999;
            text-align: center;
            align-self: center;
        }
    }
}

li:nth-child(4) {
    margin-right: 0;
}

li:hover {
    transform: scale(1.05);
    /* box-shadow: 2px 5px 10px px rgba(0, 0, 0, 0.5);
                    transform: translateY(-5%); */
}
</style>
