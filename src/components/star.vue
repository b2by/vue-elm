<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass, index) in itemClasses" 
        :class="itemClass" 
        class="star-item" 
        :key="index">
        </span>
    </div>
</template>

<script>
    const LENGTH = 5
    const CLS_ON = 'on'
    const CLS_HALF = 'half'
    const CLS_OFF = 'off'

    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            },
        },
        computed: {
            starType() {
                return 'star-' + this.size
            },
            itemClasses() {
                // itemClasses是一个数组，里面保存着星星的数量及样式数据
                let result = []
                // 取分数（0.5的倍数）
                let score = Math.floor(this.score * 2) / 2
                // 判断是否有小数
                let hasDecimal = score % 1 !== 0
                // 分数取证，得出全星数量integer
                let integer = Math.floor(score)
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON)
                }
                if (hasDecimal) {
                    result.push(CLS_HALF)
                }
                while (result.length < LENGTH) {
                    result.push(CLS_OFF)
                }
                return result
            }
        }
    }
</script>

<style>
    .star {
        font-size: 0;
    }
    .star-item {
        display: inline-block;
        background-repeat: no-repeat;
    }
    .star-48 .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
    }
    .star-48 .star-item:last-child {
        margin-right: 0;
    }
    .star-48 .on {
        background-image: url(../../resource/img/star48_on@2x.png);
    }
    .star-48 .half {
        background-image: url(../../resource/img/star48_half@2x.png);
    }
    .star-48 .off {
        background-image: url(../../resource/img/star48_off@2x.png);
    }

    .star-36 .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
    }
    .star-36 .star-item:last-child {
        margin-right: 0;
    }
    .star-36 .on {
        background-image: url(../../resource/img/star36_on@2x.png);
    }
    .star-36 .half {
        background-image: url(../../resource/img/star36_half@2x.png);
    }
    .star-36 .off {
        background-image: url(../../resource/img/star36_off@2x.png);
    }
</style>
