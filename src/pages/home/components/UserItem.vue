<template>
    <div>
        <ul v-for="userDetail, index in userDetails" :key="userDetail._id._id"
            class="list">
            <li>
                <router-link to="" target="_blank" class="avatar">
                    <img :src="'/static/user_' + (parseInt(userDetail._id._id)+index) % 4 +'.png'">
                    <!--<img src="//upload.jianshu.io/users/upload_avatars/3292545/78f2855a-80fd-419a-9fb2-1aeed39690f0.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp">-->
                </router-link>
                <a class="follow" state="0">
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
    export default {
        name: "user-item",
        props: ['userDetails'],
        methods: {},
    }
</script>

<style scoped>

</style>
