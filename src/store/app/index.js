import { orgQuery, queryHospitals, queryWXHospitals } from '@/api/system_moudle/index'
// 省，市 医院三级级联菜单，将第三级医院的信息转为属性children，并添加label 和value
function hospitalsTransition (data) {
  // 省，市，医院都会存在,一层省，二层市
  for (let province = 0; province < data.length; province++) {
    let provinceItem = data[province]
    console.log('provinceItem_', provinceItem)
    for (let city = 0; city < provinceItem['children']['length']; city++) {
      let cityItem = provinceItem['children'][city]
      cityItem['children'] = cityItem['hospitals']
      // console.log('cityItem_', cityItem)
      for (
        let hospitals = 0;
        hospitals < cityItem['children']['length'];
        hospitals++
      ) {
        let hospital = cityItem['children'][hospitals]
        Object.assign(hospital, {
          label: hospital['hospitalName'],
          value: hospital['uid']
        })
      }
    }
  }
}

const app = {
  state: {
    sidebar: {
      opened: true,
      permission: [
        '1',
        '11',
        '2',
        '21',
        '22',
        '3',
        '31',
        '4',
        '41',
        '42',
        '5',
        '51',
        '52',
        '53',
        '54'
      ]
    },
    organization: [],
    hospitals: [],
    // 需要保活的页面，动态变动
    canAlived: [],
    wxhospitals: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    },
    // 查询这个人的组织结构
    SET_ORG: (state, organization) => {
      state.organization = organization
      console.log('查询这个人的组织结构_123', state.organization)
    },
    SET_HOSPITALS: (state, hospitals) => {
      state.hospitals = hospitals
    },
    // 保活页面处理
    ADD_ACTIVE: (state, pageName) => {
      if (state.canAlived.indexOf(pageName) === -1) {
        state.canAlived.push(pageName)
        console.log('state.canAlived_add_', state.canAlived)
      }
    },
    DELETE_ACTIVE: (state, pageName) => {
      if (state.canAlived.indexOf(pageName) !== -1) {
        const index = state.canAlived.indexOf(pageName)
        state.canAlived.splice(index, 1)
        console.log('state.canAlived_delete_', state.canAlived)
      }
    },
    SET_WXHOSPITALS: (state, hospitals) => {
      state.wxhospitals = hospitals
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    GetOrganization: ({ commit }, orgId) => {
      console.log('orgId_11231312312321_', orgId)
      orgQuery(orgId).then(response => {
        const org = response.data.body
        console.log('GetOrganization_', org)
        commit('SET_ORG', [org])
      })
    },
    GetHospitals: ({ commit }) => {
      queryHospitals().then(response => {
        const hospitals = response.data.body
        // 对hospitals进行数据转换
        hospitalsTransition(hospitals)
        console.log('hospitalsTransition(response.data.body)_', hospitals)
        commit('SET_HOSPITALS', hospitals)
      })
    },
    GetWXHospitals: ({ commit }) => {
      queryWXHospitals().then(response => {
        const hospitals = response.data.body
        commit('SET_WXHOSPITALS', hospitals)
      })
    }
  }
}
export default app
