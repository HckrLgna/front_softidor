<template>



</template>

<script>
import Sidenav from "@/examples/Sidenav";
import { mapActions, mapState } from 'vuex'

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Sidenav
  },
  methods: {
    
  },
  computed: {
    ...mapState([
      "color",
      "isAbsolute",
      "isNavFixed",
      "navbarFixed",
      "absolute",
      "showNavbar",

    ])
  },
}
</script>
