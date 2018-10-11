<template>
    <div>
        <ul v-for="userDetail, index in userDetails" :key="userDetail._id._id"
            class="list">
            <li>
                <router-link to="" target="_blank" class="avatar">
                    <img :src="'/static/user_' + (parseInt(userDetail._id._id)+index) % 4 +'.png'">
                    <!--<img src="//upload.jianshu.io/users/upload_avatars/3292545/78f2855a-80fd-419a-9fb2-1aeed39690f0.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp">-->
                </router-link>
                <!--glyphicon glyphicon-minus-->
                <a @click="handleAttention(1,userDetail._id._id)" class="follow" state="0">
                    <i class="glyphicon glyphicon-plus iconfont ic-follow"></i>关注
                </a>
                <a href="/u/c4165d16d0ad?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="name">
                    {{userDetail._id.username}}
                </a>
                <p>写了{{userDetail.wordCount}}字 · {{userDetail.getLikeCount}}喜欢</p>
            </li>
            <hr>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "user-item",
        props: ['userDetails'],
        methods: {
            ...mapGetters(['getToken', 'getUser']),

            //action：1：关注，2：取消关注
            handleAttention(action, attentionId) {
                this.username = this.getUser();
                const token = this.getToken();
                if (token) {
                    axios.defaults.headers.common['token'] = this.getToken();
                }
                axios.post("/friend", {
                    action: action,
                    attentionId: attentionId
                }).then(res => {
                    console.log(res.data);
                    if (res.status === 200) {
                        //成功
                    }
                    switch (res.data.code) {
                        case 0:

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
                })
            }
        },
    }
</script>

<style scoped>

</style>
