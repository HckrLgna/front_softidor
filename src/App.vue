<template>
  <sidenav :custom_class="color" :class="['fixed-start']" v-if="$route.meta.requiresSidebar">
  </sidenav>
  <main 
    class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden"
  >
  <custom-nav-bar 
    :class="'position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4'" 
    :color= "' opacity-8'"
    :minNav= true
    v-if = "$route.meta.requiresSidebar"

  />
  
  <router-view />
</main>
</template>
<script>
import { mapActions, mapState } from "vuex";

import Sidenav from "./examples/Sidenav";
import CustomNavBar from "./examples/Navbars/Navbar.vue";
export default {
  name: "App",
  components: {
    Sidenav,
    CustomNavBar,
  },
  methods: {
    ...mapActions(["readToken"]),
  },
  computed: {
    ...mapState([
      "color",
      "isAbsolute",
      "isNavFixed",
      "navbarFixed",
      "absolute",
      "showNavbar",
    ]),
  },
  created() {
    this.readToken();
  },
  beforeMount() {},
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
