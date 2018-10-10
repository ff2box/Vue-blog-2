<template>
    <div>
        <div style="text-align: left;padwidth: 50%;margin-top: 30px">
            <a href="/u/c4165d16d0ad?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="avatar">
                <img src="//upload.jianshu.io/users/upload_avatars/3292545/78f2855a-80fd-419a-9fb2-1aeed39690f0.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp">
            </a>
            <a v-if="username !== user" class="follow" state="0">
                <i class="glyphicon glyphicon-plus iconfont ic-follow"></i>关注
            </a>
            <a href="/u/c4165d16d0ad?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="name">
                {{username}}
            </a>
            <p>写了{{userDetail.wordCount}}字 · {{userDetail.getLikeCount}}喜欢</p>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "user-item",
        props: ['userDetail', 'username'],
        data() {
            return {
                user: '',
            }
        },
        methods: {
            ...mapGetters(['getUser']),
        },
        mounted() {
            this.user = this.getUser();
        }
    }
</script>

<style scoped>

</style>
