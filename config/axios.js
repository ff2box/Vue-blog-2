/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
// import axios from 'axios';
// import {Loading, Message} from 'element-ui';
//
// // 超时时间
// axios.defaults.timeout = 5000
//
// // http请求拦截器
// var loadinginstace
// axios.interceptors.request.use(config => {
//     // element ui Loading方法
//     loadinginstace = Loading.service({fullscreen: true})
//     return config
// }, error => {
//     loadinginstace.close()
//     Message.error({
//         message: '加载超时'
//     })
//     return Promise.reject(error)
// })
//
// // http响应拦截器
// axios.interceptors.response.use(data => {// 响应成功关闭loading
//     loadinginstace.close()
//     return data
// }, error => {
//     loadinginstace.close()
//     Message.error({
//         message: '加载失败'
//     })
//     return Promise.reject(error)
// })
import axios from 'axios';

// 添加请求拦截器
axios.interceptors.request.use(config => {
        console.log("==========request to=============");
        /**
         * 没有发送过去token
         */
        // const jsonToken = localStorage.getItem("token");
        // if (jsonToken) {
        //     const storageToken = JSON.parse(jsonToken);
        //     console.log("axios:" + storageToken);
        //     axios.defaults.headers.common['token'] = storageToken;
        //     console.log(axios.defaults.headers.common['token']);
        // }
        // console.log(axios.defaults.baseURL);
        return config
    }, error => {
        console.log("==========request err=============");
        return Promise.reject(error)
    }
);
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log("==========response back=============");
    // switch (response.data.code) {
    //     case 0:
    //         break;
    //     case -1:
    //         break;
    //     case 1000:  //token缺失
    //     case 1001:  //token不合法
    //     case 1002:  //token过期
    //         console.log(response.request.responseURL);
    //         alert(`${response.data.msg}，\r\n请登录！`);
    //         // this.$router.push('/login?sign=1');
    //         // return;  //统一拦截
    //         break;
    // }
    console.log(response.request.responseURL);
    return response
}, function (error) {
    console.log("==========response err=============");
    return Promise.reject(error)
});

export default axios
