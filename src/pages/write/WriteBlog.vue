<template>
    <div>
        <navigation-header></navigation-header>
        <div class="main row" style="text-align: left;">
            <div class="col-xs-2"></div>
            <div class="col-xs-8">
                <h4 style="margin-top: 30px">标题：</h4>
                <a-textarea v-model="blogTitle" placeholder="请输入标题..." :autosize="{maxRows:5}"/>
                <h4 style="margin-top: 20px">正文：</h4>
                <a-textarea v-model="blogContent" placeholder="请输入正文..."
                            :autosize="{ minRows: 30,maxRows:150}"/>
                <button @click="cancel" style="margin-bottom: 35px;margin-top: 30px;float: left" type="button"
                        class="ant-btn ant-btn-primary ant-btn-lg" data-v-36d04910="">
                    <span>取消 | 回到首页</span>
                </button>
                <button @click="commitBlog" style="margin-bottom: 35px;margin-top: 30px;float: right" type="button"
                        class="ant-btn ant-btn-primary ant-btn-lg" data-v-36d04910="">
                    <span>发布文章</span>
                </button>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavigationHeader from "../common/NavigationHeader";
    import axios from 'axios';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "write-blog",
        components: {
            NavigationHeader,
        },
        props: [],
        data() {
            return {
                blogTitle: "",
                blogContent: "",
            }
        },
        methods: {
            ...mapGetters(['getToken', 'getUser']),
            cancel() {
                this.$router.push('/');
            },
            commitBlog() {
                if (this.blogTitle === null || this.blogTitle.trim() === "") {
                    alert("请正确填写标题！");
                    return;
                }
                if (this.blogContent === null || this.blogContent.trim() === "") {
                    alert("请正确填写正文！");
                    return;
                }
                const token = this.getToken();
                if (token) {
                    axios.defaults.headers.common['token'] = this.getToken();
                }
                axios.post("/blog", {
                    blogTitle: this.blogTitle,
                    blogContent: this.blogContent
                }).then(res => {
                    // console.log(res);

                    if (res.status === 200) {
                        //成功
                    }
                    switch (res.data.code) {
                        case 0:
                            alert("发布成功！");
                            this.$router.push('/my');
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
    }
</script>

<style scoped>

</style>