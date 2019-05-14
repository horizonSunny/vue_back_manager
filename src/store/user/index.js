import { userInfo } from '@/api/login_module/index'
// import { constRouter, asyncRouter } from '@/router/index'
const user = {
  state: {
    user: undefined,
    permissions: undefined
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },
  actions: {
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        userInfo()
          .then(response => {
            commit('SET_PERMISSIONS', response.data.body.permissions)
            commit('SET_USER', response.data.body.user)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default user
