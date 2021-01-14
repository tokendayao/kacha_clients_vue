// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)

Vue.config.devtools = true


// axios.defaults.baseURL='http://192.168.10.10'

//设置请求头
axios.defaults.headers.post["Content-type"] = "application/json"
Vue.prototype.$axios = axios
Vue.config.productionTip = false

axios.interceptors.request.use(

  config => {

    if (localStorage.getItem('accessToken')) {

      config.headers.Authorization = localStorage.getItem('accessToken');

    }
  //  console.log(config.headers);
    return config;

  },

  error => {

    return Promise.reject(error);

  });

router.beforeEach((to, from, next) => {
  const token = store.state.accessToken


  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/login'
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
