import { orgQuery, queryHospitals } from '@/api/system_moudle/index'

const app = {
  state: {
    sidebar: {
      opened: true,
      permission: ['1', '11', '2', '21', '22', '3', '31', '4', '41', '42']
    },
    organization: [],
    hospitals: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    },
    // 查询这个人的组织结构
    SET_ORG: (state, organization) => {
      state.organization = organization
    },
    SET_HOSPITALS: (state, hospitals) => {
      state.hospitals = hospitals
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    GetOrganization: ({ commit }) => {
      orgQuery().then(response => {
        const org = response.data.body
        commit('SET_ORG', org)
      })
    },
    GetHospitals: ({ commit }) => {
      queryHospitals().then(response => {
        console.log('response_response_676868867687678786', response.data.body)
        const hospitals = response.data.body
        commit('SET_HOSPITALS', hospitals)
      })
    }
  }
}
export default app
