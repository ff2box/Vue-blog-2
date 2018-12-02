# **个人博客后端项目**

该项目为“个人博客项目”前后端分离后的前端，webstorm+ES6+vue+git+yarn进行开发。同样的，从产品、UI和开发，都由个人完成，其中参考了“简书”的页面设计。

## 环境配置

```Nodejs 8.11.4+```

## 安装

```
$ git clone git@github.com:Pologinfeejz/Vue-blog.git
$ npm install
```

## 运行

```$ npm run dev```

启动默认端口为 8080，默认访问服务器端口为8000，修改方法为：

[`index.js`](https://github.com/Pologinfeejz/Vue-blog/blob/master/config/index.js)

```javascript
module.exports = {

    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            //http://127.0.0.1/api/index8000
            // '/api': {
            //     target:'http://127.0.0.1:8000',
            //     // target: 'http://localhost:8000',
            //     pathRewrite: {'^/api': '/static'}
            // }
            '/': {
                // target:'http://127.0.0.1:8000',
                target: 'http://localhost:8000',
                // pathRewrite: {'^/': '/static'}
            }
        },

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
```

## 功能特性

- [项目入口](#项目入口)

  - [项目配置](#项目配置)

  - [router](#Router)
    - [首页](#首页)
    - [登录/注册页面](#登录/注册页面)
    - [浏览博客页面](#浏览博客页面)
    - [写博客页面](#写博客页面)
    - [我的页面](#我的页面)

  - [store](#Store)

- [页面效果展示](#页面效果展示)

- [要点介绍](#要点介绍)

### 项目入口

[`main.js`](https://github.com/Pologinfeejz/Vue-blog/blob/master/src/main.js)

#### 项目配置

[`config`](https://github.com/Pologinfeejz/Vue-blog/tree/master/config)

#### Router

[`router/index.js`](https://github.com/Pologinfeejz/Vue-blog/blob/master/src/router/index.js)

##### 首页

[`HomePage.vue`](https://github.com/Pologinfeejz/Vue-blog/blob/master/src/pages/home/HomePage.vue)

##### 登录/注册页面

[`LoginPage.vue`](https://github.com/Pologinfeejz/Vue-blog/blob/master/src/pages/sign/LoginPage.vue)

##### 浏览博客页面

[`BlogContent.vue`](https://github.com/Pologinfeejz/Vue-blog/blob/master/src/pages/blogContent/BlogContent.vue)

##### 写博客页面

[`WriteBlog.vue`](https://github.com/Pologinfeejz/Vue-blog/blob/master/src/pages/write/WriteBlog.vue)

##### 我的页面

[`UserPage.vue`](https://github.com/Pologinfeejz/Vue-blog/blob/master/src/pages/user/UserPage.vue)

#### Store

[`store`](https://github.com/Pologinfeejz/Vue-blog/tree/master/src/store)

#### 页面效果展示

首页：

![image](https://github.com/Pologinfeejz/Vue-blog/blob/master/src/pageimages/index.jpg)

登录/注册：

![image](https://github.com/Pologinfeejz/Vue-blog/blob/master/src/pageimages/login.jpg)

评论内容：

![image](https://github.com/Pologinfeejz/Vue-blog/blob/master/src/pageimages/comments.jpg)

### 要点介绍

```
项目整体结构：采用vue-cli构建项目，使用bootstrap、ant-design-vue、vue-router、vuex、axios、vue-devtools等。
包含页面：首页、注册（登录）、个人主页、写博客页面、读博客页面。抽取公共组件：轮播图、导航栏、用户条目、博客条目、评论条目、子评论条目等。
通过vuex框架进行页面（组件）间的数据共享，如token、username等，通过localStorage进行数据在浏览器端的存储。
采用axios获取服务器数据的请求和响应，并添加请求、响应的拦截器，进行用户权限的预处理。
通过vue-router对页面进行统一的注册、属性控制，并通过router、route进行页面的跳转、参数传递。
项目实现了对后端API接口返回的JSON数据的请求封装、响应接收，数据展示。借鉴了大量bootstrap、ant-design-vue的css样式和组件。
```
