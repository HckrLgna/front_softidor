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
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
    setToken(state, payload){
      state.token = payload;
    }
  },
  actions: {
    async login({commit}, user){
      console.log(user);
      try{
        const res = await fetch('http://localhost:8082/auth/login',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',            
          },
          body: JSON.stringify(user)
        })
        const resDB = await res.json();
        console.log(resDB.token);
        commit('setToken', resDB.token);

        localStorage.setItem('token', resDB.token);
        //console.log(resDB);
        router.push('/dashboard');
      }
      catch(error){
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
