<template>
    <div id="indexCarousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <!--<div v-for="img,index in imgResource" :key="index" class="carousel-inner">-->
            <!--<div class="item" :class="index === active" role="listbox">-->
            <!--<div class="banner" data-banner-name="毛毛虫">-->
            <!--<a target="_blank"-->
            <!--href="https://www.jianshu.com/p/38edc2dab181?utm_medium=index-banner&amp;utm_source=desktop">-->
            <!--<img class="img-blur-done"-->
            <!--:src="'/static/carousel_' + (img + index) % 6 +'.jpg'" alt="540">-->
            <!--</a>-->
            <!--</div>-->
            <!--</div>-->
            <div class="item active" role="listbox">
                <div class="banner" data-banner-name="毛毛虫">
                    <a target="_blank"
                       href="https://www.jianshu.com/p/38edc2dab181?utm_medium=index-banner&amp;utm_source=desktop">
                        <!--<img src="@/images/carousel_1.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"-->
                        <!--alt="540"/>-->
                        <img :src="'/static/carousel_0.jpg'" alt="540">
                    </a>
                </div>
            </div>
            <div class="item ">
                <div class="banner" data-banner-name="双节手绘活动">
                    <a target="_blank"
                       href="https://www.jianshu.com/p/a6f7cad8e0a4?utm_medium=index-banner&amp;utm_source=desktop">
                        <img :src="'/static/carousel_1.jpg'" alt="540">
                    </a>
                </div>
            </div>
            <div class="item ">
                <div class="banner" data-banner-name="听回顾音频">
                    <a target="_blank"
                       href="https://www.jianshu.com/p/3e548a2396f4?utm_medium=index-banner&amp;utm_source=desktop">
                        <img :src="'/static/carousel_2.jpg'" alt="540">
                    </a>
                </div>
            </div>
            <div class="item ">
                <div class="banner" data-banner-name="行距杯征文大赛">
                    <a target="_blank"
                       href="https://www.jianshu.com/mobile/campaign/common/hangju?utm_medium=index-banner&amp;utm_source=desktop">
                        <img :src="'/static/carousel_3.jpg'" alt="540">
                    </a>
                </div>
            </div>
            <div class="item ">
                <div class="banner" data-banner-name="简书会员促销">
                    <a target="_blank"
                       href="https://www.jianshu.com/p/c0211efc026d?utm_medium=index-banner&amp;utm_source=desktop">
                        <img :src="'/static/carousel_4.jpg'" alt="540">
                    </a>
                </div>
            </div>
            <div class="item ">
                <div class="banner" data-banner-name="赛末点02">
                    <a target="_blank"
                       href="https://www.jianshu.com/p/43ed8b2af6e0?utm_medium=index-banner&amp;utm_source=desktop">
                        <img :src="'/static/carousel_5.jpg'" alt="540">
                    </a>
                </div>
            </div>
        </div>
        <ol class="carousel-indicators">
            <li data-target="#indexCarousel" data-slide-to="0"
                class="active"></li>
            <li data-target="#indexCarousel" data-slide-to="1"
                class=""></li>
            <li data-target="#indexCarousel" data-slide-to="2"
                class=""></li>
            <li data-target="#indexCarousel" data-slide-to="3"
                class=""></li>
            <li data-target="#indexCarousel" data-slide-to="4"
                class=""></li>
            <li data-target="#indexCarousel" data-slide-to="5"
                class=""></li>
        </ol>
        <a class="left carousel-control" href="#indexCarousel" role="button" data-slide="prev"><i
                class="iconfont ic-previous-s"></i></a>
        <a class="right carousel-control" href="#indexCarousel" role="button" data-slide="next"><i
                class="iconfont ic-next-s"></i></a>
    </div>
</template>

<script>
    export default {
        name: "carousel",
    }
</script>

<style scoped>

</style>
