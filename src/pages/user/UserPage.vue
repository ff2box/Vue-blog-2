<template>
    <div>
        <navigation-header></navigation-header>
        <div class="main row">
            <div class="col-xs-8">
                <h3 style="margin-top: 30px;font-weight: bold">{{username}} 的主页</h3>
                <my-item ref="myItem" style="margin-top: 10px"></my-item>
                <blog-item :data="myBlogs"></blog-item>
            </div>
            <div class="col-xs-4">
                <h4 style="margin-top: 30px;font-weight: bold">{{myAttention}}</h4>
                <!--右侧的推荐用户列表-->
                <user-item style="margin-top: 30px" :userDetails="myFriends"></user-item>
            </div>
        </div>
    </div>
</template>

<script>
    import NavigationHeader from "../common/NavigationHeader";
    import BlogItem from '../home/components/BlogItem';
    import UserItem from '../home/components/UserItem';
    import MyItem from './components/MyItem';
    import axios from 'axios';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "user-page",
        components: {
            NavigationHeader,
            BlogItem,
            UserItem,
            MyItem,
        },
        props: [],
        data() {
            return {
                username: null,
                myBlogs: [],
                myFriends: [],
                myDetail: [],
                myAttention: '暂无关注',
            }
        },
        methods: {
            ...mapGetters(['getToken', 'getUser']),
        },
        mounted() {
            /*
            需要的数据：
            1、用户的个人信息：用户名
            2、用户详情
            3、关注的人的详情列表
            4、个人博客展示
             */
            this.username = this.getUser();
            const token = this.getToken();
            if (token) {
                axios.defaults.headers.common['token'] = this.getToken();
            }
            axios.get("/blog/detail", {
                blogTitle: this.blogTitle,
                blogContent: this.blogContent
            }).then(res => {
                // console.log(res);
                if (res.status === 200) {
                    //成功
                }
                switch (res.data.code) {
                    case 0:
                        this.myBlogs = res.data.data.myBlogs;
                        this.myFriends = res.data.data.myFriends.attentions;
                        if (this.myFriends.length !== 0) {
                            this.myAttention = "我的关注";
                        }
                        this.myDetail.push(res.data.data.myDetail);

                        this.$refs.myItem.getMyDetail({
                            myDetail: this.myDetail,
                            username: this.username
                        });
                        break;
                    case -1:
                        alert(res.data.msg);
                        break;
                    case 1000:  //token缺失
                    case 1001:  //token不合法
                    case 1002:  //token过期
                        alert(`${res.data.msg}，\r\n请登录！`);
                        this.$router.push('/login?sign=1');
                        break;
                    default:
                        alert(res.status);
                        break;
                }
            });
        },
    }
</script>

<style scoped>

</style>