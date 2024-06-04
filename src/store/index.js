import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    token:null,
    isPinned:true,
    color: "success",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    user: null
  },
  getters: {
  },
  mutations: {
    toogleConfiguratior(state){
      state.showConfig = !state.showConfig;
    },
    setToken(state, payload){
      state.token = payload;
    }
  },
  actions: {
    async login({commit}, user){
      console.log(user);
      try{
        const res = await fetch('http://localhost:8080/ ',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        const resDB = await res.json();
        console.log(resDB);
        commit('setToken', resDB.data.token);
        localStorage.setItem('token', resDB.data.token);
      }catch(error){
        console.log(error);
      }
    },
    readToken({ commit }){
      if(localStorage.getItem('token')){
        commit('setToken', localStorage.getItem('token'));
      }else{
        commit('setToken', null);
      }
    },
    logout({commit}){
      commit('setToken', null);
      localStorage.removeItem('token');
      router.push('/login');
    }
  },
  modules: {
  }
})
