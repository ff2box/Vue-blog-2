<template>
    <div>
        <navigation-header v-bind:isSign=true></navigation-header>
        <div class="sign row">
            <div class="col-xs-1"></div>
            <div class="col-xs-10">

                <!-- Nav tabs -->
                <ul class="row nav nav-tabs" role="tablist">
                    <li :class="{active:sign==1}" style="text-align: center" role="presentation"
                        class="col-xs-6"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">登录</a>
                    </li>
                    <li :class="{active:sign==2}" style="text-align: center" role="presentation"
                        class="col-xs-6"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">注册</a>
                    </li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div :class="{active:sign==1}" role="tabpanel" class="tab-pane" id="home">
                        <!--3.水平分割线-->
                        <!--<hr style="border: 2px gainsboro solid;"/>-->

                        <form action="#" method="post">

                            <!--4.表单输入项-->
                            <div class="form-group">
                                <input v-model="username" type="text" class="form-control" placeholder="请输入用户名">
                            </div>
                            <div class="form-group">
                                <input v-model="password" type="password" class="form-control" placeholder="请输入密码">
                            </div>

                            <!--注册-->
                            <div class="form-group">
                                <input @click="handleLogin" type="button" class="form-control btn btn-success"
                                       value="登录">
                            </div>
                        </form>

                        <!--跳转登录-->
                        <div class="" style="text-align: left;margin-top: 50px;">
                            <a href="#" style="color: green;">社交账号登录</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#" style="color: orange;">忘记密码？</a>
                        </div>
                    </div>

                    <div :class="{active:sign==2}" role="tabpanel" class="tab-pane" id="profile">

                        <!--<hr style="border: 2px gainsboro solid;"/>-->

                        <form action="#" method="post">
                            <!--4.表单输入项-->
                            <div class="form-group">
                                <input type="email" class="form-control" placeholder="请输入邮箱">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="请输入密码">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="请输入昵称">
                            </div>

                            <!--短信发送-->
                            <div class="row">
                                <div class="col-xs-8">
                                    <div class="form-group">
                                        <input type="email" class="form-control" placeholder="手机号">
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <input type="button" class="btn btn-default  text-center" value="发送短信"
                                           style="padding-left:0; padding-right: 0; width: 100%;"/>
                                </div>
                            </div>
                            <!--填写验证码-->
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="请输入验证码">
                            </div>

                            <!--注册-->
                            <div class="form-group">
                                <input type="submit" class="form-control btn btn-success" value="注册">
                            </div>
                        </form>

                        <!--跳转登录-->
                        <div class="" style="text-align: left;margin-top: 50px;">
                            已有账号？&nbsp;&nbsp;<a @click="gotoLogin" href="#" style="color: orange;">去登录</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-1"></div>
    </div>
</template>

<script>
    import NavigationHeader from '../common/NavigationHeader';
    import axios from 'axios';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "LoginPage",
        components: {
            NavigationHeader,
        },
        data() {
            return {
                username: "",
                password: "",
                sign: this.$route.query.sign
            }
        },
        methods: {
            ...mapActions(['setToken', 'setUser']),
            // ...mapGetters(['getToken']),

            handleLogin() {
                // 127.0.0.1:8000/user/login
                axios.post('/user/login', {username: this.username, password: this.password})
                    .then(res => {
                        console.log(res.data.data);
                        switch (res.data.code) {
                            case 0:
                                this.setToken(res.data.data.token.toString());
                                this.setUser(this.username);
                                this.$router.push('/my');
                                break;
                            case -1:
                                alert(res.data.msg);
                                break;
                        }
                    });
            },
            gotoLogin(){
                this.sign = 2;
            }
        },
        mounted() {
            // console.log(this.sign);
        },
        computed: {},
        watch: {
            // sign(newVal, oldVal) {
            //     if (newVal == oldVal) {
            //         return;
            //     }
            //     this.sign = this.$route.query.sign;
            //     console.log(`newVal:${newVal}`);
            // }
        }
    }
</script>

<style scoped>

</style>