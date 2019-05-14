import { asyncRouter } from '@/router/index'
// import { constRouter } from '@/router/index'
// 对异步路由进行过滤
function filterAsyncRouter (asyncRouter, userPermission) {
  // console.log('asyncRouter_', asyncRouter)
  // console.log('userPermission_', userPermission)
  const addRouters = asyncRouter.filter(router => {
    // console.log('router.permissionCode_', router.permissionCode)
    // console.log('userPermission_', userPermission)
    const permission = userPermission.indexOf(router.permissionCode) > -1
    // console.log('permission_', permission)
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

const permission = {
  state: {
    addRouters: []
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
    }
  },
  actions: {
    AddRouter ({ commit, getters }) {
      const addRouter = filterAsyncRouter(asyncRouter, getters.getPermission)
      console.log('addRouter_', addRouter)
      commit('SET_ROUTERS', addRouter)
    }
  }
}
export default permission
