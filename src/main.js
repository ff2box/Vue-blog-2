// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from '../config/axios'

Vue.config.productionTip = false

/* -disable no-new */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@/assets/cn_vuejs_org.css'
import '@/assets/myblog.css'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

Vue.use(Antd);
/*
启动的命令：npm run dev
 */
new Vue({
    el: '#app',
    router,
    store,
    axios,
    components: {App},
    template: '<App/>'
})
