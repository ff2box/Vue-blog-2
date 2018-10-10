<template>
    <div>
        <ul v-for="userDetail, index in myDetail" :key="userDetail._id"
            class="list">
            <li>
                <router-link to="" target="_blank" class="avatar">
                    <img :src="'/static/user_' + (parseInt(userDetail._id)+index) % 4 +'.png'">
                    <!--<img src="//upload.jianshu.io/users/upload_avatars/3292545/78f2855a-80fd-419a-9fb2-1aeed39690f0.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp">-->
                </router-link>
                <a style="display: none" class="follow" state="0">
                    <i class="glyphicon glyphicon-plus iconfont ic-follow"></i>关注
                </a>
                <router-link style="font-size: 18px;font-weight: bold" to="" target="_blank" class="name">
                    {{username}}
                </router-link>
                <p>写了{{userDetail.wordCount}}字 · {{userDetail.getLikeCount}}喜欢</p>
            </li>
            <hr>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "my-item",
        props: [],
        data() {
            return {
                myDetail: [],
                username: "",
            }
        },
        methods: {
            getMyDetail(data) {
                this.myDetail = data.myDetail;
                this.username = data.username;
            }
        },

    }
</script>

<style scoped>

</style>