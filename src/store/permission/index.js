import { asyncRouter } from '@/router/index'
import { deepCopy } from '@/utils/tools'
// 对异步路由进行过滤
function filterAsyncRouter (asyncRouter, userPermission) {
  const addRouters = asyncRouter.filter(router => {
    const permission =
      userPermission.indexOf(router.permissionCode) > -1 ||
      router.permissionCode
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
    router.path = parentPath + router.path
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
      const addRouter = filterAsyncRouter(asyncRouter, getters.getPermission)
      console.log('addRouter_', addRouter)
      commit('SET_ROUTERS', addRouter)
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
