<template>
    <div class="shopcart">
        <div class="contents" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{highlightColor: totalCount > 0}">
                        <i class="icon-close" :class="{highlight: totalCount > 0}"></i>
                    </div>
                    <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{highlight: totalCount > 0}">¥{{totalPrice}}</div>
                <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">{{payDesc}}</div>
            </div>
        </div>
        <transition name="fold">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>   
                    <span class="empty">清空</span> 
                </div>  
                <div class="list-content" ref="list-content">
                    <ul>
                        <li class="food" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span>¥{{food.price * food.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>                
                </div>                                   
            </div>
        </transition>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import cartcontrol from '../components/cartcontrol.vue'

    export default {
        data() {
            return {
                fold: true
            }        
        },
        props: {
            selectFoods: {
                type: Array,
                default() {
                    return []
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0,
            },
            minPrice: {
                type: Number,
                default: 0,
            }
        },
        methods: {
            toggleList() {
                if (!this.totalCount) {
                    return
                }
                this.fold = !this.fold
            }
        },
        computed: {
            // 商品总价
            totalPrice() {
                let result = 0
                this.selectFoods.forEach( food => {
                    result += food.price * food.count
                })
                return result
            },
            // 商品数量总和
            totalCount() {
                let result = 0
                this.selectFoods.forEach( food => {
                    result += food.count
                })
                return result
            },
            // 结算
            payDesc() {
                if (this.totalPrice === 0) {
                    return `¥${this.minPrice}元起送`
                } else if (this.totalPrice < this.minPrice) {
                    return `还差¥${this.minPrice - this.totalPrice}元起送`
                } else {
                    return '去结算'
                }
            },
            payClass() {
                if (this.totalPrice < this.minPrice) {
                    return 'not-enough'
                } else {
                    return 'enough'
                }
            },
            listShow () {
                if (!this.totalCount) {
                    this.fold = true 
                    return false
                }
                let show = !this.fold
                // if (show) {
                //     this.$nextTick(() => {
                //         if (!this.scroll) {
                //             this.scroll= new BScroll(this.$refs.listContent, {
                //                 click: true
                //             }) 
                //         } else {
                //             this.scroll.refresh()
                //         }                       
                //     })
                // }
                return show
            }
        },
        components: {
            cartcontrol
        }
    }
</script>

<style>
    .shopcart {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px; 
    }
    .shopcart .contents {
        display: flex;
        background: #141d27;
        font-size: 0;
        color: rgba(255, 255, 255, 0.4);
    }
    .contents .content-left {
        flex: 1;
    }
    .content-left .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;
    }
    .content-left .logo {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        background: #2b343c;
    }  
    .content-left .icon-close {
        line-height: 44px;
        font-size: 24px;
        color: #80858a;
    }
    .content-left .num {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background: rgb(240, 20, 20);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    }
    .content-left .price {
        position: relative;
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;
    }
    .content-left .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
        font-weight: 700;
    }
    .contents .content-right {
        flex: 0 0 105px;
        width: 105px;
    }
    .content-right .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        background: #2b333b;
    } 
    .content-left .highlightColor {
        background: rgb(0, 160, 220);
    }
    .content-left .highlight {
        color: #fff;
    }
    .content-right .not-enough {
        background: #2b333b;
    }
    .content-right .enough {
        background: #00b43c;
        color: #fff;
    }
    .shopcart-list {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
    }
    .fold-enter-active {
        transition: all 3s;
        transform: translate3d(0, -100%, 0);
    }
    .fold-leave-active {
        transition: all 3s;
        transform: translate3d(0, 100%, 0);
    }
    .fold-enter {
        transform: translate3d(0, 0, 0);
    }
    .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .list-header .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    .list-header .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
    }
    .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
    }
    .list-content .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border: 1px solid rgba(7, 17, 27, 0.1);
    }
    .list-content .name {
        line-height: 24px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    .list-content .price {
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        color: rgb(240, 20, 20);
    }
    .list-content .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 6px;
    }
</style>
