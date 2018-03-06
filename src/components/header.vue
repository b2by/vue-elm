<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <!-- 绑定属性要用v-bind app.vue接收组件的时候也要用： -->
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <!-- 因为请求数据是异步的过程，第二个span一开始是个undfined，会报错，
                    增加if判断布尔，如果没有整个dom都不显示 -->
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>               
            </div>
            <div v-if="seller.supports" @click="showDetail" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-thumb_up"></i>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-thumb_up"></i>
        </div>
        <div class="background">
            <img width="100%" height="100%" :src="seller.avatar">
        </div>
        <!-- 要过渡的动画必须封装在 transition 组件中，name 自动生成 CSS 过渡类名 -->
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <!-- 不直接定义star组件的css，而是在外边再包一层 -->
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports" v-if="seller.supports">
                            <li class="support-item" 
                            v-for="(item, index) in seller.supports" 
                            :key="index">
                            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                            <span class="text">{{seller.supports[index].description}}</span>
                            </li>                      
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-remove_circle_outline"></i>
                </div>
            </div>
        </transition>    
    </div>
</template>

<script>
    import star from '../components/star.vue'
 
    export default {     
        props: ['seller'],
        data() {
            return {
               detailShow: false 
            }
        },
        methods: {
            showDetail() {
                this.detailShow = true
            },
            hideDetail() {
                this.detailShow = false
            }
        },
        // 创建实例后
        created() {
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        },
        components: {
            star
        }
    }
</script>

<style>
    .header {
        position: relative;
        color: #fff;
        background: rgba(7, 17, 27, 0.5);
        overflow: hidden;
    }
    .content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;     
    }
    .avatar {
        display: inline-block;
    }
    .avatar img {
        border-radius: 2px;
    }
    .content {
        display: inline-block;
        margin-left: 16px;
        vertical-align: top;
    }
    .title {
        margin: 2px 0 8px 0;
    }
    .brand {
        display: inline-block;
        vertical-align: top;
        width: 30px;
        height: 18px;
        background-image: url(../../resource/img/brand@2x.png);
        background-repeat: no-repeat;
        background-size: 30px 18px;
    }
    .name {
        margin-left: 6px;
        font-size: 16px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        line-height: 18px;    
    }
    .description {
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 10px;
    }
    .support .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-size: 12px 12px;
        background-repeat: no-repeat;       
    }
    .support .text {
        vertical-align: top;
        font-size: 10px;
        line-height: 10px;
    }
    .support .decrease {
        background-image: url(../../resource/img/decrease_1@2x.png);
    }
    .support .discount {
        background-image: url(../../resource/img/discount_1@2x.png);
    }
    .support .guarantee {
        background-image: url(../../resource/img/guarantee_1@2x.png);
    }
    .support .invoice {
        background-image: url(../../resource/img/invoice_1@2x.png);
    }
    .support .special {
        background-image: url(../../resource/img/special_1@2x.png);
    }
    .support-count {
        position: absolute;
        right: 12px;
        bottom: 16px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
    }
    .count {
        font-size: 10px;
    }
    .support-count i {
        font-size: 12px;
        margin-left: 2px;
    }
    .bulletin-wrapper {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: rgba(7, 17, 27, 0.2)
    }
    .bulletin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        background-image: url(../../resource/img/bulletin@2x.png);
        background-size: 22px 12px;
        background-repeat: no-repeat;
        vertical-align: top;
        margin-top: 9px;
    }
    .bulletin-text {
        font-size: 10px;
        margin: 0 4px;
        vertical-align: top;
    }
    .bulletin-wrapper i {
        position: absolute;
        font-size: 15px;
        right: 9px;
        top: 8px;
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .detail {
        position: fixed;
        z-index: 100;  
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        backdrop-filter: blur(10px);
        opacity: 1;
        background: rgba(7, 17, 27, 0.8);
        transition: all 0.5s;
    }
     /* 过渡动画 */
     .fade-enter-active  {
        transition: all 0.5s;
     }
     .fade-enter, .fade-leave-active  {
        opacity: 0;
        background: rgba(7, 17, 27, 0);
     }

    .detail-wrapper {       
        width: 100%;
        min-height: 100%;            
    }
    .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
    }
    .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
    }
    .detail-main .name {
        font-size: 18px;
        font-weight: 700;
        line-height: 18px;
        text-align: center;
    }
    .star-wrapper {
        margin-top: 18px;
        padding: 2px 0;
        text-align: center;
    }
    .detail-main .title {
        display: flex;
        width: 80%;
        margin: 28px auto 24px auto;
    } 
    .detail-main .line {
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2)
    }
    .detail-main .text {
        padding: 0 12px;
        font-size: 14px;
        font-weight: 700;
    }
    .supports {
        width: 80%;
        margin: 0 auto;

    }
    .supports .support-item {
        padding: 0 12px;
        margin-bottom: 12px;
        font-size: 0;
    }
    .support-item:last-child {
        margin-bottom: 0;
    }
    .supports .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-right: 6px;
        background-size: 16px 16px;
        background-repeat: no-repeat; 
    }
    .supports .decrease {
        background-image: url(../../resource/img/decrease_1@2x.png);
    }
    .supports .discount {
        background-image: url(../../resource/img/discount_1@2x.png);
    }
    .supports .guarantee {
        background-image: url(../../resource/img/guarantee_1@2x.png);
    }
    .supports .invoice {
        background-image: url(../../resource/img/invoice_1@2x.png);
    }
    .supports .special {
        background-image: url(../../resource/img/special_1@2x.png);
    }
    .supports .text {
        line-height: 16px;
        font-size: 12px;
    }
    .bulletin {
        width: 80%;
        margin: 0 auto;
    } 
    .bulletin .content {
        padding: 0 12px;
        line-height: 24px;
        font-size: 12px;
    }
</style>


