import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Product from '@/components/Product'   // add
import StartUpPage from '@/components/StartUpPage'   // add
import IndexPage from '@/components/IndexPage'   // add
import SearchPage from '@/components/SearchPage'   // add

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
      path: '/search',
      name: 'SearchPage',
      component: SearchPage
    }
  ]
})
