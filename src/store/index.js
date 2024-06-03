import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
    toogleConfiguratior(state){
      state.showConfig = !state.showConfig;
    }
  },
  actions: {
  },
  modules: {
  }
})
