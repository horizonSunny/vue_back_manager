import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/view/HelloWorld'
// 必须设置node环境变量
const _import = require('./import_' + process.env.NODE_ENV)
// const _import = require('./import_' + 'developments')

Vue.use(Router)

export const constRouter = [
  { path: '/', redirect: '/main' },
  {
    path: '/login',
    component: _import('login_module/login/index'),
    hidden: true
  },
  {
    path: '/forget',
    component: _import('login_module/forget/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('error/404'),
    hidden: true
  },
  {
    path: '/main',
    component: _import('main_module/AppMain'),
    hidden: true
  }
]

export const asyncRouter = [{}, {}, {}, {}]
export default new Router({
  // routes: [
  //   {
  //     path: '/',
  //     name: 'HelloWorld',
  //     component: HelloWorld
  //   }
  // ]
  routes: constRouter
})
