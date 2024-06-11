<template>
  <sidenav
    :custom_class="color"
    :class="['fixed-start']"
    v-if="$route.meta.requiresSidebar"
  >
  </sidenav>
  <main
    class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden"
  >
    <custom-nav-bar
      :class="'position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4'"
      :color="' opacity-8'"
      :minNav="true"
      v-if="$route.meta.requiresSidebar"
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
  mounted() {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "24577ce21c5e5fda55ffe75941e94bed9",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
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
