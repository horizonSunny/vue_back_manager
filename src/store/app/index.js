const app = {
  state: {
    sidebar: {
      opened: true,
      permission: ['1', '11', '2', '21', '22', '3', '31', '4', '41', '42']
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}
export default app
