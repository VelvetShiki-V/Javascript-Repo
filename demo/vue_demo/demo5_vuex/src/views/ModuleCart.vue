<template>
    <div class="wrapper">
        <table>
            <CartHeader></CartHeader>
            <CartBody></CartBody>
            <CartFooter></CartFooter>
        </table>
    </div>
</template>

<script>
import CartHeader from './CartHeader.vue'
import CartBody from './CartBody.vue'
import CartFooter from './CartFooter.vue'
export default {
  components: {
    CartHeader,
    CartBody,
    CartFooter
  }
}
</script>

<style lang="less" scoped>
table {
    background-color: #f3f3f3;
    margin-top: 30px;
    width: 1200px;
}
</style>
