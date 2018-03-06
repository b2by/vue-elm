<template>
    <div class="goods">
        <!-- vue2.0后ref属性用驼峰，而不是烤串 -->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item" 
                :class="{current: currentIndex === index}"
                @click="selectMenu(index, $event)">
                    <span class="text">
                        <span v-if="item.type>0" 
                            class="icon"
                            :class="classMap[item.type]">                            
                        </span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food, $event)" v-for="food in item.foods" class="food-item">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" >
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">¥{{food.price}}</span>
                                    <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>   
        <shopcart :select-foods="selectFoods" :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></shopcart>
        <food :food="selectedFood" ref='food'></food>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import shopcart from '../components/shopcart.vue'
    import cartcontrol from '../components/cartcontrol.vue'
    import food from '../components/food.vue'

    const ERR_OK = 0

    export default {
        props: ['seller'],
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            }
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    const height1 = this.listHeight[i]   
                    const height2 = this.listHeight[i + 1]      
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i
                    }            
                }
                return 0
            },
            // 父组件与子组件联动，food改变,selectFoods也会被改变
            selectFoods() {
                let foods = []
                this.goods.forEach(good => {
                    good.foods.forEach(food => {
                        if (food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
            this.$http.get('/api/goods').then(response => {
                response = response.body
                if (response.errno === ERR_OK) {
                    this.goods = response.data
                    this.$nextTick(() => { 
                        this._initScroll()
                        this._calculateHeight()
                    })
                }
            })
        },
        methods: {   
            // 点击翻滚
            selectMenu(index, event) {
                // 非vue事件不执行
                if (!event._constructed) {
                    return
                }
                // BScroll接口，滚动到相应位置
                let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
                let el = foodList[index]
                // 滚动时间
                this.foodsScroll.scrollToElement(el, 300)                    
            },
            // 点击显示详情页
            selectFood(food, event) {
                if (!event._constructed) {
                    return
                }
                this.selectedFood = food
                this.$refs.food.show()
            }, 
            // 上下翻滚 
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                })
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                })
                // 参数pos实时的位置
                this.foodsScroll.on('scroll', pos => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            // 左右联动
            _calculateHeight() {
                let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
                let height = 0 
                this.listHeight.push(height)
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            }
        },
        components: {
            shopcart,
            cartcontrol,
            food
        }
    }
</script>

<style>
    .goods {
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        width:100%;
        overflow: hidden;
    }
    .menu-wrapper {
        flex: 0 0 80px;
        /* 适配安卓 */
        width: 80px;
        background: #f3f5f7;
    }
    .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
    }
    .current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700; 
    }
    .current .text {
        border: none;
    }
    .menu-item .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: top;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat; 
    }
    .menu-item .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .current .text {
        border: none;
    }
    .menu-item .decrease {
        background-image: url(../../resource/img/decrease_3@2x.png);
    }
    .menu-item .discount {
        background-image: url(../../resource/img/discount_3@2x.png);
    }
    .menu-item .guarantee { 
        background-image: url(../../resource/img/guarantee_3@2x.png);
    }
    .menu-item .invoice {
        background-image: url(../../resource/img/invoice_3@2x.png);
    }
    .menu-item .special {
        background-image: url(../../resource/img/special_3@2x.png);
    }
    .foods-wrapper {
        flex: 1;
    }
    .foods-wrapper .title {  
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;    
    }
    .foods-wrapper .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .foods-wrapper .food-item:last-child {
        margin-bottom: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .foods-wrapper .icon {
        flex: 0 0 57px;
        margin-right: 10px;
    }
    .food-item .content {
        position: relative;
        flex: 1;
    }
    .foods-wrapper .name {
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27)
    }
    .desc, .extra {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159)
    }
    .desc {
        line-height: 13px;
        margin-bottom: 8px;
    }
    .extra .count {
        margin-right: 12px; 
    }
    .price {
        font-weight: 700;
        line-height: 24px;
    }
    .price .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20)
    }
    .price .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159)
    }
    .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: -7px;
    }
</style>
    

