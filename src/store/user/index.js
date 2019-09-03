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
    },
    REMOVE_USRINFO: state => {
      console.log('REMOVE_USRINFO_清除user和permissions')
      state.user = undefined
      state.permissions = undefined
    }
  },
  actions: {
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        userInfo()
          .then(response => {
            if (response && response.data && response.data.body) {
              console.log(
                'response.data.body.permissions_',
                response.data.body.permissions
              )
              commit('SET_PERMISSIONS', response.data.body.permissions)
              commit('SET_USER', response.data.body.user)
              resolve()
            } else {
              reject(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default user
