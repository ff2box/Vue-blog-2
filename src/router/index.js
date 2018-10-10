import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/home/HomePage'
import LoginPage from '../pages/sign/LoginPage'
import BlogContent from '../pages/blogContent/BlogContent'
import WriteBlog from '../pages/write/WriteBlog'
import UserPage from '../pages/user/UserPage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage,
            // children: [ //动态路由之所以作为Main的子路由是基于：登录之后跳转到Main主页，该主页是类似于frame的页面加载框架，只有将动态路由作为Main的子路由才能确保其他页面显示到Main框架内。
            //     ...generateRoutesFromMenu(menuModule.state.items)
            // ]
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/register',
            name: 'LoginPage',
            component: LoginPage,
        },
        {
            // path: '/content/:contentId',
            path: '/content',
            name: 'BlogContent',
            component: BlogContent,
            // // 需要登录才能进入的页面可以增加一个meta属性
            // meta: {
            //     requireAuth: true
            // },
            // meta: {
            //     keepAlive: true
            // }
        }, {
            path: '/write',
            name: 'WriteBlog',
            component: WriteBlog,
        }, {
            path: '/my',
            name: 'UserPage',
            component: UserPage,
        }
    ]
})

//  判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
//         if (localStorage.getItem('user')) {// 判断是否登录
//             next()
//         } else {// 没登录则跳转到登录界面
//             next({
//                 path: '/Register',
//                 query: {redirect: to.fullPath}
//             })
//         }
//     } else {
//         next()
//     }
// })
