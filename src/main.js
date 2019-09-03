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
let vm = new Vue()
// 全局提示限制，报错只能1条
vm.$message.config({
  top: `100px`,
  duration: 2,
  maxCount: 1
})
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
    console.log('process.env.NODE_ENV_', process.env.NODE_ENV)
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    console.log('这里代表拿到token了,看是否有userPermission权限')
    if (to.path === '/login' || to.path === '/forget') {
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
            console.log('store.getters.addRouters_', store.getters.addRouters)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            // 这边是获取到用户信息后到最终跳转，二级页面作为预留
            store.dispatch('PemissionRouter')
            // 用user中获取它但orgId
            const orgId = store.getters.user['organization']['key']
            store.dispatch('GetOrganization', { orgId: orgId })
            store.dispatch('GetHospitals')
            store.dispatch('GetWXHospitals')
            console.log(
              'store.getters.addRouters[0]_',
              store.getters.addRouters[0]
            )
            let pointPath = 'noPermission'
            const permission = store.getters.permissionRouter[0]['children']
            // 循环下，如果有list就跳list,没有就跳nopermission
            if (permission[0]['children']['length']) {
              const items = permission[0]['children']
              for (let index = 0; index < items.length; index++) {
                const str = items[index]['path']
                console.log('str_main_', str)
                console.log('str.indexOf !== -1_', str.indexOf('List') !== -1)
                if (str.indexOf('List') !== -1) {
                  pointPath = str
                  break
                } else {
                  const a = str.split('/')
                  a.splice(-1, 1, 'noPermission')
                  pointPath = a.join('/')
                  console.log('pointPath_else_', pointPath)
                }
              }
            }
            console.log('pointPath_main_', pointPath)
            // const routerPath =
            //   store.getters.addRouters[0]['path'] + '/' + childrenPath
            next({ path: pointPath })
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
