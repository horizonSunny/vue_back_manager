import { asyncRouter } from '@/router/index'
// import { constRouter } from '@/router/index'
// 对异步路由进行过滤
function filterAsyncRouter (asyncRouter, userPermission) {
  const addRouters = asyncRouter.filter(router => {
    const permission = userPermission.indexOf(router.permissionCode) > -1
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
      commit('SET_ROUTERS', addRouter)
    }
  }
}
export default permission
