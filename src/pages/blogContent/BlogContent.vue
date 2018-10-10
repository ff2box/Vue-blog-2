<template>
    <div>
        <!--导航header-->
        <navigation-header></navigation-header>
        <!--<div class="main row" style="text-align: left;">-->
        <div class="main" style="text-align: left;width: 45%;min-width: 640px;">
            <!--<div class="col-xs-2"></div>-->
            <!--<div class="col-xs-8">-->
            <!--blog信息-->
            <h1 style="margin-top: 30px">{{header}}</h1>
            <user-item :userDetail="userDetail" :username="username"></user-item>

            <!--blog content-->
            <!--<div style="text-align: left;margin-top: 30px">-->
            <!--<h4 style="margin-bottom: 20px">{{header}}</h4>-->
            <!--<span>{{content.body}}</span>-->
            <!--</div>-->

            <!--<div style="margin-top: 30px" class="panel panel-default question-content">-->
            <!--<div class="panel-heading">-->
            <!--<h3 class="panel-title">{{header}}</h3>-->
            <!--</div>-->
            <!--<div class="panel-body question-content-absText">-->
            <!--{{content.body}}-->
            <!--</div>-->
            <!--</div>-->
            <div style="margin-top: 10px">
                <pre><code>
                    {{content.body}}
                </code></pre>
            </div>
            <!--blog 说明-->

            <!--user 信息-->
            <user-item style="display: none" :userDetail="userDetail" :username="username"></user-item>
            <!--喜欢等操作-->
            <!--<div style="text-align: center">-->
            <a-button @click="handleLike(blogDetail._id,blogDetail.userId)"
                      style="margin-top: 20px;margin-bottom: 20px" type="primary"
                      :size="'large'">喜欢 | {{blogDetail.likeCount}}
            </a-button>
            <!--</div>-->
            <!--评论框-->
            <a-textarea v-model="commentInput" @pressEnter="onPressEnter" placeholder="请输入评论内容" :rows="4"/>
            <a-button-group style="float: right;margin-top: 15px">
                <a-button @click="cancelComment">取消</a-button>
                <a-button @click="commitComment" type="primary">发送</a-button>
            </a-button-group>
            <div class="clearfix"></div>
            <!--评论title-->
            <div style="margin-top: 15px">
                <!--<h4 style="float: left">{{blogDetail.commentsCount}}条评论</h4>-->
                <h4 style="float: left">{{commentsLen}}条评论</h4>
                <div style="float: right">
                    <a-button type="primary">按时间倒序</a-button>
                    <a-button type="primary" disabled>按时间正序</a-button>
                </div>
            </div>
            <div class="clearfix"></div>
            <!--评论列表-->
            <!--<comment-item :comments="content.comments"></comment-item>-->
            <comment-item style="background-color: hsla(0, 0%, 71%, .2);padding: 10px;margin-top: 10px"
                          @onUpdateSubComment="handleUpdateSubComment" ref="commentItem"></comment-item>
            <!--推荐阅读-->

        </div>
    </div>
</template>

<script>
    import NavigationHeader from '../common/NavigationHeader';
    import UserItem from '../common/UserItem';
    import CommentItem from './components/CommentItem';
    import axios from 'axios';
    import {mapGetters, mapActions} from 'vuex';
    // import {Button, Input, Card, Layout} from 'ant-design-vue';
    // const {Header, Footer, Sider, Content} = Layout;

    export default {
        name: "BlogContent",
        components: {
            NavigationHeader,
            UserItem,
            CommentItem,
        },
        data() {
            return {
                /*带过来的数据*/
                contentId: this.$route.query.id,
                header: this.$route.query.header,
                userId: this.$route.query.userId,
                /*请求的数据*/
                content: {},
                userDetail: {},
                blogDetail: {},
                username: null,
                /*本组件的数据*/
                commentInput: "",
                // comments:[],
                commentsLen: 0,
            }
        },
        methods: {
            ...mapGetters(["getToken"]),
            onPressEnter() {
                event.preventDefault();
                console.log(this.commentInput);
            },
            cancelComment() {
                this.commentInput = "";
            },
            commitComment() {
                if (this.commentInput === "") {
                    return;
                }
                // console.log(`commitComment: ${this.commentInput}`);
                axios.put('/content/' + this.contentId, {
                    comment: {
                        sendId: this.userId,
                        commentBody: this.commentInput
                    }
                }).then(res => {
                    switch (res.data.code) {
                        case 0:
                            this.commentInput = ""; //清空数据
                            this.getContent(2);
                            break;
                        case -1:
                            alert(res.data.msg);
                            break;
                    }
                });
            },
            handleUpdateSubComment(msg) {
                if (msg != "updateSubComment") {
                    console.log(msg);
                    return;
                }
                // console.log("子组件添加了子评论，父组件已收到！");
                this.getContent(2);
            },
            /**
             * @param dataNeed：0：首次访问，1：，2：只更新comments
             */
            getContent(dataNeed) {
                /**
                 * 可以让服务器，值返回Comments，但是这样好吗。
                 */
                axios.defaults.headers.common['token'] = this.getToken();
                axios.get("/content?id=" + this.contentId + "&userId=" + this.userId).then(res => {
                    // console.log(res.data.data);
                    switch (res.data.code) {
                        case 0:
                            if (dataNeed === 2) {
                                this.$refs.commentItem.getComments(res.data.data.content.comments, this.contentId);
                            } else {
                                this.content = res.data.data.content;
                                this.commentsLen = this.content.comments.length;
                                /*方式一*/
                                // this.comments = this.content.comments;
                                // this.content.comments = [];
                                /*方式二*/
                                this.$refs.commentItem.getComments(res.data.data.content.comments, this.contentId);

                                this.userDetail = res.data.data.userDetail;
                                this.username = res.data.data.username;
                                this.blogDetail = res.data.data.blog;
                            }
                            break;
                        case 1000:  //token缺失
                        case 1001:  //token不合法
                        case 1002:  //token过期
                            alert(`${res.data.msg}，\r\n请登录！`);
                            this.$router.push('/login?sign=1');
                            break;
                        case -1:
                            alert(res.data.msg);
                            break;
                    }
                });
            },
            handleLike(id, toId) {
                const body = {
                    blogId: id,
                    toId: toId,
                    like: 1
                };
                console.log(body);
                axios.defaults.headers.common['token'] = this.getToken();
                axios.post("/blog/like", body).then(res => {
                    // console.log(res.data);
                    switch (res.data.code) {
                        case 0:
                            this.blogDetail.likeCount = res.data.data.likeCount;
                            this.userDetail.getLikeCount = res.data.data.getLikeCount;
                            break;
                        case 1000:  //token缺失
                        case 1001:  //token不合法
                        case 1002:  //token过期
                            alert(`${res.data.msg}，\r\n请登录！`);
                            this.$router.push('/login?sign=1');
                            break;
                        case -1:
                            alert(res.data.msg);
                            break;
                    }
                });
            },
        },
        watch: {},
        /*ref、refs的使用*/
        mounted() {
            this.getContent(0);
        }
    }
</script>

<style scoped>

</style>