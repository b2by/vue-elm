<template>
    <div class="cartcontrol">
        <div class="cart-decrease icon-shopping_cart"
         v-show="food.count > 0"
         @click.stop.prevent="decreaseCart" ></div>
        <div class="cart-count"  v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-thumb_down" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
    import vue from 'vue'

    export default {
        props: {
            food: {
                type: Object,
            }
        }, 
        methods: {
            addCart(event) {
                if (!event._constructed) {
                    return
                }
                if (!this.food.count) {
                    // 如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。
                    // this.food.count = 1
                    vue.set(this.food, 'count', 1)
                } else {
                    this.food.count++
                }
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return
                }
                if (this.food.count) {
                    this.food.count--
                }
            }
        }
    }
</script>

<style>
    .cartcontrol {
        font-size: 0;
    }
    .cart-decrease, .cart-add {
        display: inline-block;
        padding: 6px;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220)
    }
    .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: rgb(147, 153, 159)
    }
    .cart-add {
        display: inline-block;
    }
</style> 
