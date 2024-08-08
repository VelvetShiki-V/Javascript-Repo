<template>
    <div class="detail">
        <PageTop></PageTop>
        <PageTrace></PageTrace>
        <!-- 商品信息区域 -->
        <div class="goods_info wrapper">
            <div class="show">
                <div class="display">
                    <div class="middle">
                        <img :src="detailGoods.profile + '1.jpg'" ref="middleShow"
                        @mouseover="layerShow"
                        @mousemove="layerMoveThrottle"
                        @mouseleave="layerHide"
                        >
                        <div class="layer" ref="middleLayer"></div>
                    </div>
                    <div class="small">
                        <ul>
                            <li v-for="item in 5" :key="item">
                                <img :src="detailGoods.profile + `${item}.jpg`" @mouseenter="showAlter">
                            </li>
                        </ul>
                    </div>
                    <div class="large" ref="largeShow"></div>
                </div>
                <ul class="sale">
                    <ul>
                        <li>
                            <p class="title">销量人气</p>
                            <p class="num">200+</p>
                            <p><a href="javascript:;">销量人气</a></p>
                        </li>
                        <li>
                            <p class="title">商品评价</p>
                            <p class="num">400+</p>
                            <p><a href="javascript:;">查看评价</a></p>
                        </li>
                        <li>
                            <p class="title">收藏人气</p>
                            <p class="num">600+</p>
                            <p><a href="javascript:;">收藏商品</a></p>
                        </li>
                        <li>
                            <p class="title">品牌信息</p>
                            <p class="num">100+</p>
                            <p><a href="javascript:;">品牌主页</a></p>
                        </li>
                    </ul>
                </ul>
            </div>
            <div class="desc">
                <h4>{{ detailGoods.title }}</h4>
                <p class="sub_title">{{ detailGoods.desc }}</p>
                <p class="price">
                    <span class="sale">￥{{ detailGoods.price }}</span>
                    <span class="origin">￥{{ detailGoods.max_price }}</span>
                </p>
                <div class="service">
                    <dl>
                        <dt>促销</dt>
                        <dd>5月好物放送，APP领券购物直降120元</dd>
                    </dl>
                    <dl>
                        <dt>配送</dt>
                        <dd>
                            至
                            <select>
                            <!-- <select ref="city" v-model="city"> -->
                                <option value="北京" selected>北京</option>
                                <option value="上海">上海</option>
                                <option value="武汉">武汉</option>
                                <option value="昆明">昆明</option>
                                <option value="成都">成都</option>
                            </select>
                        </dd>
                    </dl>
                    <dl>
                        <dt>服务</dt>
                        <dd>无忧退货 快速退款 免费包邮<a href="javascript:;">了解详情</a></dd>
                    </dl>
                </div>
                <div class="type">
                    <dl>
                        <dt>颜色</dt>
                        <dd ref="color" @click="selectColor">
                            <img v-for="index in 3" :key="index" :src="detailGoods.profile + `${index}.jpg`">
                        </dd>
                    </dl>
                    <dl>
                        <dt>尺码</dt>
                        <dd ref="size" @click="selectSize">
                            <span>S</span>
                            <span>M</span>
                            <span>L</span>
                        </dd>
                    </dl>
                    <div class="numbox">
                        <span class="num">数量</span>
                        <button :disabled="count <= 1" @click="count--">-</button>
                        <input type="text" v-model="count">
                        <button :disabled="count >= 9" @click="count++">+</button>
                    </div>
                </div>
                <button @click="preSubmit">加入购物车</button>
            </div>
        </div>
        <PageBot></PageBot>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  async created () {
    // 先获取仓库数据的商品列表, 用以特定gid商品细节渲染
    await this.get_list_async()
    this.gid = Number(this.$route.params.gid)
    this.detailGoods = this.list.find(item => item.gid === this.gid)
  },
  data () {
    return {
      detailGoods: {},
      gid: null,
      count: 1,
      form: {
        color: null,
        size: null
      },
      moveTimer: null
    }
  },
  methods: {
    ...mapActions('goods', ['get_list_async']),
    // 商品放大预览图
    showAlter (e) {
      const active = document.querySelector('.show_active')
      if (active) active.classList.remove('show_active')
      e.target.classList.add('show_active')
      this.$refs.middleShow.src = e.target.src
      this.$refs.largeShow.style.backgroundImage = 'url(' + e.target.src + ')'
    },
    layerShow (e) {
      this.$refs.largeShow.style.backgroundImage = 'url(' + e.target.src + ')'
      this.$refs.largeShow.style.display = 'block'
      this.$refs.middleLayer.style.display = 'block'
    },
    layerMove (e) {
      // 获取鼠标坐标(需考虑到页面相对于可视窗口距离，页面滚轮距离)
      const x = e.pageX - e.target.getBoundingClientRect().left
      const y = e.pageY - e.target.getBoundingClientRect().top - scrollY
      // 滑块移动
      if (x >= 0 && x <= 400 && y >= 0 && y <= 400) {
        let layerX = 0; let layerY = 0
        if (x <= 100) layerX = 0
        if (x >= 100 && x <= 300) layerX = x - 100 // 指针置中
        if (x >= 300) layerX = 200
        if (y <= 100) layerY = 0
        if (y >= 100 && y <= 300) layerY = y - 100
        if (y >= 300) layerY = 200
        this.$refs.middleLayer.style.left = layerX + 'px'
        this.$refs.middleLayer.style.top = layerY + 'px'
        // 预览图显示
        this.$refs.largeShow.style.backgroundPositionX = -2 * layerX + 'px' // 放大图移动是反向
        this.$refs.largeShow.style.backgroundPositionY = -2 * layerY + 'px' // 且移动距离应为middle二倍
      }
    },
    layerMoveThrottle (e) {
      this.moveTimer = setTimeout(() => {
        this.layerMove(e)
        this.moveTimer = null
      }, 16)
    },
    layerHide () {
      this.$refs.largeShow.style.display = 'none'
      this.$refs.middleLayer.style.display = 'none'
    },
    ...mapActions('goods', ['add_goods_async']),
    // 商品属性选择
    selectColor (e) {
      const active = this.$refs.color.querySelector('.active')
      if (active) active.classList.remove('active')
      e.target.classList.add('active')
      this.form.color = e.target.src
    },
    selectSize (e) {
      const active = this.$refs.size.querySelector('.active')
      if (active) active.classList.remove('active')
      e.target.classList.add('active')
      this.form.size = e.target.innerHTML
    },
    // 表单提交
    preSubmit () {
      if (!this.form.size || !this.form.color) {
        this.$message.warning('还未勾选商品属性！')
      } else if (!this.userInfo) {
        this.$message.warning('请先登录!')
        this.$router.push('/account')
      } else this.submitOrder()
    },
    async submitOrder () {
      await this.add_goods_async({
        gid: this.gid,
        count: this.count,
        form: this.form
      })
      this.$router.push('/cart')
    }
  },
  computed: {
    // 注意，必须先通过actions保证本地仓库内存在数据，再获取
    ...mapState('goods', ['list']),
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="less" scoped>
/* 商品信息 */
.goods_info {
    background-color: rgb(245, 245, 245);
    height: 700px;
    position: relative;
    background-color: #fff;
    height: 600px;
    padding: 20px 100px;
    display: flex;

    .show {
        padding: 30px;
        height: 550px;
        width: 550px;

        .display {
            display: flex;

            .middle {
                transform: translate3d(0, 0, 0);
                position: relative;
                width: 400px;
                height: 400px;
                cursor: move;

                img {
                    width: 400px;
                    height: 400px;
                }

                .layer {
                    position: absolute;
                    display: none;
                    left: 0;
                    top: 0;
                    width: 200px;
                    height: 200px;
                    background-color: rgba(0, 0, 0, 0.3);
                }
            }

            .small {
                padding-top: 20px;
                margin-left: 20px;

                ul {
                    width: 60px;
                    height: 340px;

                    li {
                        width: 61px;
                        height: 61px;
                        margin-bottom: 10px;
                        cursor: pointer;

                        img {
                            width: 60px;
                            height: 60px;
                        }

                        .show_active {
                            border: 2px solid rgb(130, 184, 158);
                        }
                    }
                }
            }

            .large {
                position: absolute;
                display: none;
                width: 400px;
                height: 400px;
                left: 540px;
            }
        }

        .sale {
            margin: 20px 10px;

            ul {
                display: flex;
                padding-left: 10px;

                li {
                    margin-right: 20px;
                    padding-right: 20px;
                    border-right: 1px solid rgb(0, 0, 0, 0.3);

                    .title {
                        font-size: 15px;
                        color: grey;
                    }

                    .num {
                        text-align: center;
                        margin: 2px 0;
                        color: red;
                        font-size: 13px;
                    }

                    a {
                        font-size: 13px;
                    }

                    a:hover {
                        color: rgb(130, 184, 158);
                    }
                }

                li:last-child {
                    border-right: none;
                }
            }
        }
    }

    .desc {
        padding: 30px;
        height: 550px;
        width: 500px;

        h4 {
            font-size: 22px;
        }

        .sub_title {
            font-size: 13px;
            color: grey;
            margin: 10px 0;
        }

        .price {
            .sale {
                font-size: 20px;
                color: red;
            }

            .origin {
                font-size: 16px;
                color: grey;
                text-decoration: line-through;
            }
        }

        .service {
            background-color: rgb(245, 245, 245);

            dl {
                display: flex;
                padding: 15px;

                dt {
                    color: grey;
                    font-size: 13px;
                    margin-right: 15px;
                }

                dd {
                    font-size: 14px;

                    select {
                        width: 70px;
                        border: none;
                        outline: none;
                    }

                    a {
                        margin-left: 10px;
                        color: rgb(130, 184, 158);
                    }
                }
            }
        }

        .type {
            dl {
                margin: 20px 0;
                display: flex;

                dt {
                    align-self: center;
                    color: grey;
                    font-size: 13px;
                    margin-right: 15px;
                }

                dd {
                    font-size: 14px;

                    img {
                        display: inline-block;
                        border: 1px solid rgba(151, 145, 145, 0.753);
                        width: 50px;
                        height: 50px;
                        margin-right: 5px;
                        cursor: pointer;
                    }

                    .active {
                        border: 1px solid rgba(85, 216, 73, 0.863);
                    }

                    span {
                        display: inline-block;
                        width: 50px;
                        height: 30px;
                        border: 1px solid rgba(151, 145, 145, 0.753);
                        text-align: center;
                        line-height: 30px;
                        margin-right: 5px;
                        cursor: pointer;
                    }
                }
            }

            .numbox {
                margin: 20px 0;
                display: flex;

                .num {
                    align-self: center;
                    color: grey;
                    font-size: 13px;
                    margin-right: 15px;
                }

                button {
                    width: 30px;
                    height: 30px;
                    background-color: rgb(248, 248, 248);
                    color: black;
                    text-align: center;
                    line-height: 30px;
                    border: 1px solid rgba(165, 163, 163, 0.733);
                }

                input {
                    width: 50px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    border: 1px solid rgba(165, 163, 163, 0.733);
                    outline: none;
                }
            }
        }

        button {
            width: 200px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background-color: rgb(103, 184, 156);
            border: none;
            color: white;
            border-radius: 3%;
            font-size: 17px;
            cursor: pointer;
        }

        button:hover {
            background-color: rgb(86, 200, 160);
        }
    }
}
</style>
