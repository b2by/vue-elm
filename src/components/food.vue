<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click="hide">
                        <i class="icon-add_circle"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="details">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">¥{{food.price}}</span>
                        <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                    </div>
                </div>
                <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                </div>
                <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
            </div>                 
        </div>
    </transition>   
</template>

<script>
    import BScroll from 'better-scroll'
    import vue from 'vue'
    import cartcontrol from '../components/cartcontrol.vue'
    
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false
            }
        },
        methods: {
            show() {
                this.showFlag = true
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        })
                    } else {
                        this.scroll.refresh()
                    }
                })
            },
            hide() {
                this.showFlag = false
            },
            addFirst(event) {
                if (!event._constructed) {
                    return
                }
                vue.set(this.food, 'count', 1)
            }
        },
        components: {
            cartcontrol
        }
    }
</script>

<style>
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
    }
    .move-transition {
        transition: all 0.2s linear;
        transform: translate3d(0, 0, 0);      
    }
    .move-enter, .move-leave {
        transform: translate3d(100%, 0, 0); 
    }
    /* css黑魔法 定高 */
    .image-header {
        position: relative;
        width: 100%;
        /* height: 100%; 
         padding-top: 100%;  */
    }
    .image-header img {
        width: 100%;
        /* position: absolute;
        top: 0;
        left: 0;
        height: 100%; */
    }
    .back {
        position: absolute;
        top: 10px;
        left: 0;
    }
    .back .icon-add_circle {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
    }
    .food .content {
        padding: 18px;
    }
    .content .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
    }
    .food .details {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
    }
    .details .sell-count, .details .rating {
        font-size: 10px;
        color: rgb(147, 153, 159)
    }
    .details .sell-count {
        margin-right: 12px;
    }
    .food .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
    .food .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        font-size: 10px;
        box-sizing: border-box;
        border-radius: 12px;
        color: #fff;
        background: rgb(1, 160, 220)
    }
</style> 
