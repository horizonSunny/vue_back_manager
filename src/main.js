// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { getToken } from './utils/token'
import store from './store'

Vue.config.productionTip = false
Vue.use(Antd)
/* eslint-disable no-new */
// 不需要token就能进入的页面白名单
const whiteList = ['login']
router.beforeEach((to, from, next) => {
  const token = getToken()
  // 路由前看是否拿到token值,没有的话返回登陆页请求拿到token
  if (!token) {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.path === 'login') {
      next('/login')
    } else {
      console.log('2')
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
