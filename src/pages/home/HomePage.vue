<template>
    <div>
        <!--导航条-->
        <!--<navigation-header :user="user"></navigation-header>-->
        <navigation-header></navigation-header>

        <div class="main row">
            <div class="col-xs-8">
                <!--轮播-->
                <carousel style="margin-top: 10px"></carousel>
                <hr v-if="blogs.length > 0">
                <!--首页展示的博客列表-->
                <blog-item :data="blogs"></blog-item>
                <!--<button @click="loadMoreBlog" v-bind:style="{display:loadMoreDisplay}" style="margin-bottom: 20px"-->
                <button @click="loadMoreBlog" v-bind:style="{visibility:loadMoreDisplay}" style="margin-bottom: 20px"
                        type="button"
                        class="btn btn-info btn-lg btn-block">
                    {{loadMoreMsg}}
                </button>
            </div>
            <div class="col-xs-4">
                <!--右侧的推荐用户列表-->
                <user-item style="margin-top: 30px" :userDetails="userDetails"></user-item>
                <!--<button @click="loadMoreUser" v-bind:style="{display:loadMoreUserDisplay}" style="margin-bottom: 20px"-->
                <button @click="loadMoreUser" v-bind:style="{visibility:loadMoreUserDisplay}" style="margin-bottom: 20px"
                        type="button"
                        class="btn btn-info btn-lg btn-block">
                    {{loadMoreUserMsg}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import NavigationHeader from '../common/NavigationHeader';
    import Carousel from '../common/Carousel';
    import BlogItem from '../home/components/BlogItem';
    import UserItem from '../home/components/UserItem';
    import axios from 'axios';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "HomePage",
        components: {
            NavigationHeader,
            Carousel,
            BlogItem,
            UserItem,
        },
        data() {
            return {
                blogPage: 0,
                userDetailPage: 0,
                blogs: [],
                userDetails: [],
                loadMoreDisplay: 'hidden',
                loadMoreMsg: '加载更多',
                loadMoreUserDisplay: 'hidden',
                loadMoreUserMsg: '查看更多用户',
            }
        },
        methods: {
            ...mapGetters(['getToken', 'getUser']),
            loadMoreBlog() {
                this.loadMoreDisplay = 'hidden';
                console.log(this.blogPage);
                axios.get("/index/blog?page=" + this.blogPage).then(res => {
                    console.log(res.data);
                    switch (res.data.code) {
                        case 0:
                            if (res.data.data.blogs.length === 0) {
                                this.loadMoreMsg = "没有更多博客了。";
                            } else {
                                this.blogs.push.apply(this.blogs, res.data.data.blogs);
                                this.loadMoreMsg = "加载更多。";
                                this.blogPage++;
                            }
                            this.loadMoreDisplay = 'visible';
                            // this.userDetails = res.data.data.userDetails;
                            break;
                        case -1:
                            alert(res.data.msg);
                            break;
                        default:
                            alert("服务器休息中~");
                            break;
                    }
                });
            },
            loadMoreUser() {
                this.loadMoreUserDisplay = 'hidden';
                // console.log(this.userDetailPage);
                axios.get("/index/userDetail?page=" + this.userDetailPage).then(res => {
                    console.log(res.data);
                    switch (res.data.code) {
                        case 0:
                            if (res.data.data.userDetails.length === 0) {
                                this.loadMoreUserMsg = "没有更多用户了。";
                            } else {
                                this.userDetails.push.apply(this.userDetails, res.data.data.userDetails);
                                this.loadMoreUserMsg = "查看更多用户。";
                                this.userDetailPage++;
                            }
                            this.loadMoreUserDisplay = 'visible';
                            // this.userDetails = res.data.data.userDetails;
                            break;
                        case -1:
                            alert(res.data.msg);
                            break;
                        default:
                            alert("服务器休息中~");
                            break;
                    }
                });
            }
        },
        mounted() {
            const token = this.getToken();
            console.log(this.getToken());
            if (token) {
                axios.defaults.headers.common['token'] = this.getToken();
            }
            /**
             * 首页访问
             */
            axios.get("/index").then(res => {
                this.loadMoreDisplay = 'visible';
                this.loadMoreUserDisplay = 'visible';
                // console.log(res.data);
                switch (res.data.code) {
                    case 0:
                        this.blogs = res.data.data.blogs;
                        this.userDetails = res.data.data.userDetails;
                        this.blogPage++;
                        this.userDetailPage++;
                        break;
                    case -1:
                        alert(res.data.msg);
                        break;
                    // case 1000:  //token缺失
                    // case 1001:  //token不合法
                    // case 1002:  //token过期
                    //     alert(`${res.data.msg}，\r\n请登录！`);
                    //     this.$router.push('/login?sign=1');
                    //     break;
                    default:
                        alert("服务器休息中~");
                        break;
                }
            });
            // axios.get("/blog?page=" + this.blogPage).then(res => {
            // axios.get("/userDetail/" + this.userDetailPage).then(res => {
        }
    }
</script>

<style scoped>
</style>
