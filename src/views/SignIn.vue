<template>
  <div
    class="page-header align-items-start min-vh-100"
    style="
      background-image: url('https://images.unsplash.com/photo-1567777176186-dfa735f1fe20?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    "
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Iniciar Session
                </h4>
                <div class="row mt-3">
                  <div class="col-2 text-center ms-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-facebook text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center px-1">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-github text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center me-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-google text-white text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form
                @submit.prevent="login(user)"
                role="form"
                class="text-start mt-3"
              >
                <div class="mb-3">
                  <material-input
                    id="email"
                    type="email"
                    label="Email"
                    name="username"
                    v-model:value="user.username"
                  />
                </div>
                <div class="mb-3">
                  <material-input
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    v-model:value="user.password"
                  />
                </div>
                <material-switch id="rememberMe" name="rememberMe"
                  >Remember me</material-switch
                >
                <div class="text-center">
                    <material-button
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      fullWidth
                    >
                      Sign in
                    </material-button>
                
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "Sign-in",
  components: {
    MaterialInput,
    MaterialSwitch,
    MaterialButton,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        // rememberMe: false,
      },
    };
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    ...mapActions(["login"]),
  },
};
</script>
