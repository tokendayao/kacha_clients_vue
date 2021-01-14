import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Product from '@/components/Product'   // add
import StartUpPage from '@/components/StartUpPage'   // add
import IndexPage from '@/components/IndexPage'   // add
import SearchPage from '@/components/SearchPage'   // add
import Login from '@/components/auth/Login'   // add
import NoticePage from '@/components/noticePage'   // add
import MyCenter from '@/components/MyCenter'   // add
import CreateGroup from '@/components/CreateGroup'   // add
import GroupDetail from '@/components/GroupDetail'   // add


//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
Vue.use(Router)


export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'StartUpPage',
      component: StartUpPage
    }, {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/index',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/notice',
      name: 'NoticePage',
      component: NoticePage,
      meta:{
        requireAuth:true
      }

    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/my',
      name: 'MyCenter',
      component: MyCenter,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/createGroup',
      name: 'CreateGroup',
      component: CreateGroup
    },
    {
      path:'/groupDetail',
      name:'GroupDetail',
      component: GroupDetail
    }
  ]
});

