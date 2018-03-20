<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
            </div>
            <div class="split"></div>
            <div class="bulletins">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul class="supports" v-if="seller.supports">
                    <li class="support-item" 
                    v-for="(item, index) in seller.supports" 
                    :key="index">
                    <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                    <span class="text">{{seller.supports[index].description}}</span>
                    </li>                      
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import star from '../components/star.vue'

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        },
        watch: {
            'seller'() {
                this._initScroll()
            }
        },
        mounted() {
            this._initScroll()
        },
        methods: {
            _initScroll() {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.seller, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            }
        },
        components: {
            star
        }
    }
</script>

<style>
    .seller {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
    }
    .seller-content .overview {
        display: block;
        padding: 18px;
    }
    .overview .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
    }
    .overview .desc {
        padding-bottom: 18px;
        border: rgba(7, 17, 27, 0.1);
        font-size: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .desc .star {
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
    }
    .desc .text {
        margin-right: 12px;
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        line-height: 18px;
        color: rgb(77, 85, 93);
    }
    .overview .remark {
        display: flex;
        padding-top: 18px;
    }
    .remark .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
    }
    .block:last-child {
        border: none;
    }
    .block h2 {
        margin-bottom: 4px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .block .content {
        line-height: 24px;
        font-size: 10px;
        color: rgb(7, 17, 27);
    }
    .block .stress {
        font-size: 24px;
    }
    .seller-content .bulletins {
        padding: 18px 18px 0 18px;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
    }
    .bulletins .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
    } 
    .seller-content .content-wrapper {
        padding: 0 12px 16px 12px;
    }
    .seller-content .split {
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        height: 18px;
        background-color: #f3f5f7;
    }
    .bulletins .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
    }
    /* .bulletins .support-item {
        padding: 16px 12px;
        font-size: 0;
    } */
    .bulletins .supports {
        width: 90%;
    }
    .bulletins .decrease {
        background-image: url(../../resource/img/decrease_4@2x.png);
    }
    .bulletins .discount {
        background-image: url(../../resource/img/discount_4@2x.png);
    }
    .bulletins .guarantee {
        background-image: url(../../resource/img/guarantee_4@2x.png);
    }
    .bulletins .invoice {
        background-image: url(../../resource/img/invoice_4@2x.png);
    }
    .bulletins .special {
        background-image: url(../../resource/img/special_4@2x.png);
    }
</style>
    

