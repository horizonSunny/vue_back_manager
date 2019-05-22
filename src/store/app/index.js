import { orgQuery } from '@/api/system_moudle/index'
const app = {
  state: {
    sidebar: {
      opened: true,
      permission: ['1', '11', '2', '21', '22', '3', '31', '4', '41', '42']
    },
    organization: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    },
    // 查询这个人的组织结构
    SET_ORG: (state, organization) => {
      state.organization = organization
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    GetOrganization: ({ commit }) => {
      orgQuery().then(response => {
        console.log('response_response_676868867687678786', response.data.body)
        const org = response.data.body
        commit('SET_ORG', org)
      })
    }
  }
}
export default app
