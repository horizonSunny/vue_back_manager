<<<<<<< HEAD
import { asyncRouter, addMainRouter } from '@/router/index'
import { deepCopy } from '@/utils/tools'
// 对异步路由进行过滤
function filterAsyncRouter (asyncRouter, userPermission) {
  // const asyncRouters = deepCopy(asyncRouter)
  const addRouters = asyncRouter.filter(router => {
    // canPermission代表的是当选中一级权限(模块)，但没有选择页面权限时，异步路由中添加空白页面权限
    const canPermission = typeof router.permissionCode === 'boolean'
    // nullPermission 本地联调时添加不需要权限菜单
    const nullPermission = router.permissionCode === null
    const permission =
      userPermission.indexOf(router.permissionCode) > -1 ||
      canPermission ||
      nullPermission
=======
import { asyncRouter } from '@/router/index'
import { deepCopy } from '@/utils/tools'
// 对异步路由进行过滤
function filterAsyncRouter (asyncRouter, userPermission) {
  const addRouters = asyncRouter.filter(router => {
    const permission =
      userPermission.indexOf(router.permissionCode) > -1 ||
      router.permissionCode
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    if (permission) {
      if (router.children && router.children.length) {
        router.children = filterAsyncRouter(router.children, userPermission)
      }
      return true
    }
    return false
  })
  return addRouters
}
// 依据路由过滤出sidebar对象
function filterPermissionRouter (accesRouter, parentPath) {
  const sidebar = accesRouter.filter(router => {
    // 判断过滤后的sidebar是否是字符串
    const permission = typeof router.permissionCode !== 'boolean'
    if (parentPath !== '') {
      router.path = parentPath + '/' + router.path
    }
    if (permission) {
      if (router.children && router.children.length) {
        router.children = filterPermissionRouter(router.children, router.path)
      }
      return true
    }
    return false
  })
  return sidebar
}
const permission = {
  state: {
    addRouters: [],
    permissionRouter: []
  },
  getters: {
    getPermission (state, getters, rootState, rootGetters) {
      // console.log('rootGetters_', rootGetters)
      return rootGetters.permissions
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
    },
    SET_PERMISSION_ROUTER: (state, siderbar) => {
      state.permissionRouter = siderbar
    }
  },
  actions: {
    AddRouter ({ commit, getters }) {
<<<<<<< HEAD
      console.log('getters.getPermission_', getters.getPermission)
      const asyncRouters = deepCopy(asyncRouter)
      const addRouter = filterAsyncRouter(asyncRouters, getters.getPermission)
      // 这边添加main，放入mainchildren,不能深拷贝，会形成两个mainComponent
      addMainRouter[0].children = addRouter
      console.log('addRouter_', addMainRouter)
      commit('SET_ROUTERS', addMainRouter)
=======
      const addRouter = filterAsyncRouter(asyncRouter, getters.getPermission)
      console.log('addRouter_', addRouter)
      commit('SET_ROUTERS', addRouter)
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    },
    PemissionRouter ({ commit, state }) {
      // 这边深拷贝一下main模块中的路由，然后改变路径+父级路径
      // console.log('state.addRouters-', state.addRouters)
      const deepRouter = deepCopy(state.addRouters)
      console.log('deepRouter_', deepRouter)
      const newRouter = deepCopy(deepRouter)
      const permissionRouter = filterPermissionRouter(newRouter, '')
      console.log('permissionRouter_', permissionRouter)
      commit('SET_PERMISSION_ROUTER', permissionRouter)
    }
  }
}
export default permission
