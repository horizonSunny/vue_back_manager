import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import app from './app'
import permission from './permission'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    app,
    permission
  },
  getters
})
export default store
