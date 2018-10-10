<template>
    <div style="margin-bottom: 35px">
        <div v-for="blog,index in data" :key="blog.contentId">
            <div id="note-33658578" data-note-id="33658578" class="have-img row">
                <!--<a class="wrap-img" href="/p/97a512dc1f63" target="_blank">-->
                <!--<img class="  img-blur-done"-->
                <!--src="//upload-images.jianshu.io/upload_images/1211570-e0aa66f6b112c641?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240"-->
                <!--alt="120">-->
                <!--</a>-->
                <div class="content col-xs-9" style="text-align: left">
                    <!--<a @click="getBlogContent(blog.contentId)" class="title" target="_blank"-->

                    <!--第一行：刷新页面数据丢失-->
                    <!--第二行：刷新页面数据不丢失，但可能有其他问题-->
                    <!--<router-link :to="{name:'BlogContent',params:{blog:{contentId:blog.contentId,header:blog.blogTitle}}}" class="title" target="div">-->
                    <!--<router-link :to="{name:'BlogContent',params:{contentId:blog.contentId}}" class="title" target="div">-->
                    <!--第3种，还是老实使用query，但是这里数据库尚未设计好，导致title的错误-->
                    <router-link :to="{path:'/content',query:{id:blog.contentId,header:blog.blogTitle,userId:blog.userId._id}}" class="title" target="div">
                        {{blog.blogTitle}}
                    </router-link>
                    <p class="abstract">{{blog.contentDesc}}</p>
                    <div class="meta">
                        <a href="" class="nickname" target="div">{{blog.userId.username}}</a>

                        <!--<router-link :to="{name:'BlogContent',params:{blog:{contentId:blog.contentId,header:blog.blogTitle}}}" class="comment"-->
                        <router-link :to="{path:'/content',query:{id:blog.contentId,header:blog.blogTitle,userId:blog.userId._id}}" class="comment"
                                     target="div">
                            <span class="glyphicon glyphicon-comment"></span> {{blog.commentsCount}}
                        </router-link>
                        <span><i class="glyphicon glyphicon-heart"></i> {{blog.likeCount}}</span>
                        <span><i class="glyphicon glyphicon-yen"></i>伪数据</span>
                    </div>
                </div>
                <!--<div @click="getBlogContent(blog.contentId)">-->
                <div>
                    <!--<router-link :to="{name:'BlogContent',params:{blog:{contentId:blog.contentId,header:blog.blogTitle}}}" class="wrap-img" target="div">-->
                    <router-link :to="{path:'/content',query:{id:blog.contentId,header:blog.blogTitle,userId:blog.userId._id}}" class="wrap-img" target="div">
                        <img class="img-blur-done" :src="'/static/blog_' + ((parseInt(blog.contentId) +index) % 5) +'.jpg'" alt="120">
                    </router-link>
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
    export default {
        name: "blog-item",
        props: ['data'],
        methods: {
            //TODO
            getBlogContent(contentId) {
                console.log(contentId);
                // '/content?contentId='+blog.contentId
                this.$router.push('/content?contentId=' + contentId);
            }
        },
    }
</script>

<style scoped>

</style>
