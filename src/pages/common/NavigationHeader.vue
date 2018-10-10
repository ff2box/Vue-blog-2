<template>
    <div id="header" style="height: 60px">
        <a @click="handleNavigation(0)" id="logo" href="/">
            <img src="@/images/logo.png" alt="vue logo">
            <span>技术栈
                <small>筹备中...</small>
            </span>
        </a>
        <ul id="nav">
            <li>
                <form id="search-form">
                    <span class="algolia-autocomplete"
                          style="position: relative; display: inline-block; direction: ltr;">
                        <input type="text"
                               id="search-query-nav"
                               class="search-query st-default-search-input aa-input"
                               autocomplete="off"
                               spellcheck="false"
                               role="combobox"
                               aria-autocomplete="list"
                               aria-expanded="false"
                               aria-owns="algolia-autocomplete-listbox-0"
                               dir="auto"
                               style="position: relative; vertical-align: top;">
                        <pre aria-hidden="true"
                             style="position: absolute; visibility: hidden; white-space: pre; font-family: Arial; font-size: 13.3333px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;">
                        </pre>
                        <span
                                class="aa-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0"
                                style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;">
                            <div class="aa-dataset-1"></div>
                        </span>
                    </span>
                </form>
            </li>
            <!--my nav-->
            <!--<li v-if="user==null && !isSign" @click="handleNavigation(1)">-->
            <li v-if="user === null || user === ''" @click="handleNavigation(1)">
                <!--<a href="/v2/guide/team.html" class="nav-link team">登录</a>-->
                <a class="nav-link team">
                    <button type="button" class="btn btn-default">登录</button>
                </a>
            </li>
            <!--<li v-if="user==null && !isSign" @click="handleNavigation(2)">-->
            <li v-if="user === null || user === ''" @click="handleNavigation(2)">
                <a class="nav-link team">
                    <button type="button" class="btn btn-default">注册</button>
                </a>
            </li>
            <li v-if="user != null" class="nav-dropdown-container learn">
                <a class="nav-link">{{user}}</a><span class="arrow"></span>
                <ul class="nav-dropdown">
                    <li>
                        <ul>
                            <li @click="goToMyPage" ><router-link to="" class="nav-link current">我的主页</router-link></li>
                            <li><a href="/v2/api/" class="nav-link">收藏的文章</a></li>
                            <li><a href="/v2/style-guide/" class="nav-link">喜欢的文章</a></li>
                            <li style="display: none;"><a href="/v2/examples/" class="nav-link">已购内容</a></li>
                            <li style="display: none;"><a href="/v2/examples/" class="nav-link">我的钱包</a></li>
                            <li><a href="/v2/examples/" class="nav-link">设置</a></li>
                            <li><a href="/v2/examples/" class="nav-link">帮助与反馈</a></li>
                            <li @click="handleLogout"><a class="nav-link">退出</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li @click="handleNavigation(4)">
                <router-link to="" class="nav-link team">
                    <button type="button" class="btn btn-default">写文章</button>
                </router-link>
            </li>
            <li style="visibility: hidden" class="nav-dropdown-container learn">
                <a class="nav-link current">管理员</a><span class="arrow"></span>
                <ul class="nav-dropdown">
                    <li>

                    </li>
                </ul>
            </li>

        </ul>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "navigation-header",
        props: {
            // user: {
            //     type: String
            // },
            isSign: {
                type: Boolean
            }
        },
        data() {
            return {
                user: null,
            }
        },
        mounted() {
            this.user = this.getUser();
            console.log(this.user);
        },
        methods: {
            ...mapActions(["setToken", "removeToken", "removeUser"]),
            ...mapGetters(['getToken', 'getUser']),

            handleNavigation(index) {
                // alert(index);
                switch (index) {
                    case 0: //首页
                        this.$router.push('/');
                        break;
                    case 1: //登录
                        this.$router.push('/login?sign=' + index);
                        break;
                    case 2: //注册
                        this.$router.push('/register?sign=' + index);
                        break;
                    case 3: //个人主页
                        // this.$router.push('/');
                        break;
                    case 4: //写文章
                        this.$router.push('/write');
                        break;
                    case 5: //管理员
                        // this.$router.push('/');
                        break;
                    default:
                        break;
                }
            },
            handleLogout() {
                console.log("login out");
                this.removeUser();
                this.removeToken();
                this.$router.push('/');
            },
            goToMyPage() {
                this.$router.push('/my');
            }
        },
        computed: {
            ...mapActions(["setUser"]),
        }
    }
</script>

<style scoped>

</style>