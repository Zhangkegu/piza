// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import { routes } from './routes';
import axios from 'axios';

import { store } from './store/store.js';



//配置axios默认根路径；
axios.defaults.baseURL = "https://wd2582462459eoscmh.wilddogio.com/";
Vue.use(VueRouter)



//配置原型(在任何组件中都可以正常使用)
Vue.prototype.http = axios;

/* eslint-disable no-new */
const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        //return { x: 0, y: 100 }
        //return { selector: '.btn' }

        if (savedPosition) {
            return savedPosition

        } else {
            return { x: 0, y: 0 }
        }

    }

})

//全局守卫
/*router.beforeEach((to, from, next) => {
    //alert('还没有登录，请先登录！');
    //next();

    //判断store.gettes.isLogin===false
    if (to.path == '/login' || to.path == '/register') {
        next(); //执行你要进行的下一步；
    } else {
        alert('还没有登录，请先登录！');
        next('/login'); ///指定跳转到某个组件；
    }

})*/
//后置钩子
/*router.afterEach((to, from) => {
    alert("after each");
})*/

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})