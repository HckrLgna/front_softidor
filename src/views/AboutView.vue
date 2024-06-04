<template>

  
  <div class="about">
    <h1>This is an about page</h1>
    {{ token }}
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "AboutView",
  created() {
    this.route();
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    async route() {
      async function route() {
        try {
          const res = await fetch("", {
            headers: {
              "Content-type": "application/json",
              "auth-token": this.token,
            },
          });
          const resDB = await res.json();
          console.log(resDB);
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>
