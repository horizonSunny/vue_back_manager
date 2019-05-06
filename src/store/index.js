import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    count: state => {
      console.log('getters_', state.count)
      return state.count
    }
  },
  mutations: {
    increment (state) {
      state.count = state.count + 1
      console.log('sotreState_', state.count)
    },
    decrement (state) {
      state.count = state.count - 1
      console.log('sotreState_', state.count)
    }
  }
})
export default store
