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
const whiteList = ['/login', '/forget']
// 全局的路由监听，对路由进行处理
router.beforeEach((to, from, next) => {
  const token = getToken()
  console.log('router.beforeEach_path_', to.path)
  console.log('router.beforeEach_token_', token)
  // 路由前看是否拿到token值,没有的话返回登陆页请求拿到token
  if (token === undefined) {
    console.log('这里代表没有token')
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    console.log('这里代表拿到token了,看是否有userPermission权限')
    if (to.path === '/login') {
      next()
    } else {
      // 这里代表拿到token了,看是否有userPermission权限
      if (store.getters.permissions === undefined) {
        console.log(
          'token_看是否有userPermission权限',
          store.getters.permissions
        )
        store.dispatch('GetUserInfo').then(() => {
          store.dispatch('AddRouter').then(() => {
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            // 这边是获取到用户信息后到最终跳转，二级页面作为预留
            store.dispatch('PemissionRouter')
            store.dispatch('GetOrganization')
            store.dispatch('GetHospitals')
            const routerPath =
              store.getters.addRouters[0]['path'] + '/recordList'
            next({ path: routerPath })
          })
        })
      } else {
        next()
      }
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
