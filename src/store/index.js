import { createStore } from "vuex";
import router from "../router";

export default createStore({
  state: {
    token: null,
    isPinned: true,
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
    userLoged: {},
    arrayFuels: [],
  },
  getters: {
    getFuels: (state) => state.arrayFuels,
    getUser: (state) => {
      return state.userLoged || { roles: [] };
    },
    getUserRoles: (state) => state.userLoged.roles,
  },
  mutations: {
    toogleConfiguratior(state) {
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
    setToken(state, payload) {
      state.token = payload;
    },
    setFuels(state, arrayFuels) {
      state.arrayFuels = arrayFuels;
    },
    setUser(state, user) {
      state.userLoged = user;
    },
    setUserRoles(state, roles) {
      state.userLoged.roles = roles;
    }
  },
  actions: {
    async login({ commit }, user) {
      console.log(user);
      try {
        const res = await fetch("http://3.147.85.14/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const resDB = await res.json();
        if (resDB.error) {
          console.log(resDB.error);
          return;
        } else {
          console.log("resdb", resDB);
          commit("setUser", resDB.data);

          commit("setToken", resDB.token);
          localStorage.setItem("token", resDB.token);
          localStorage.setItem("roles", resDB.data.roles);
          //console.log(resDB);
          router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    },
    readToken({ commit }) {
      if (localStorage.getItem("token")) {
        commit("setToken", localStorage.getItem("token"));
        const roles = localStorage.getItem("roles");
        if (roles) {
          commit("setUserRoles", roles );
        }
      } else {
        commit("setToken", null);
        commit("setUser", {})
      }
    },
    logout({ commit }) {
      commit("setToken", null);
      commit("setUser", {});
      localStorage.removeItem("token");
      router.push("/login");
    },
    async fetchFuels({ commit }) {
      try {
        const res = await fetch("http://34.176.196.5/graphiql", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
            body: JSON.stringify({
              query:
                "query ListarCombustibles{ getAllFuel{ id name sale_price measurement }}",
            }),
          },
        });
        const data = await res.json();
        commit("setFuels", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
