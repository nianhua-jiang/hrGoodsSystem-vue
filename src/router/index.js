import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import newUserInfo from '@/components/newUserInfo'
import main from '@/components/main'
import goods from '@/components/goods'
import insertGoods from '@/components/insertGoods'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/newUserInfo',
    name: 'newUserInfo',
    component: newUserInfo
  },{
    path: '/',
    name: 'main',
    component: main,
    children:[
      {
        path: '/goods',
        name: 'goods',
        component: goods
      },
      {
        path: '/insertGoods',
        name: 'insertGoods',
        component: insertGoods
      }
    ]}
  ]
})
