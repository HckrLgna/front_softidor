<template>
  <aside
    id="sidenav-main"
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-3 bg-gradient-dark fixed-start ms-3"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a class="m-0 navbar-brand" href="/">
         
        <span class="ms-2 font-weight-bold text-white"
          >SOFTIDOR</span
        >
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2" />

    <sidenav-list />
    
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import { mapState } from "vuex";

export default {
  name: "index",
  components: {
    SidenavList,
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState([ "sidebarType",]),
  },
};
</script>
