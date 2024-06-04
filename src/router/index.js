import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import Dashboard from "../views/Dashboard.vue";
import HomeView from "../views/HomeView.vue";
import SignIn from "../views/SignIn.vue";
import SalesView from "@/views/SalesView.vue";
import ClientsView from "@/views/ClientsView.vue";
import VehicleView from "@/views/VehicleView.vue";
import InfrastructureView from "@/views/InfrastructureView.vue";
const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
    meta: { routeProtected: false, requiresSidebar: true  },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/home",
        name: "home",
        component: HomeView,
      },
      {
        path: "/sales",
        name: "sales",
        component: SalesView,
      },
      {
        path: "/clients",
        name: "clients",
        component: ClientsView,
      },
      {
        path: "/vehicles",
        name: "vehicles",
        component: VehicleView,
      },
      {
        path: "/infrastructure",
        name: "infrastructure",
        component: InfrastructureView,
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: SignIn,
    meta: { requiresSidebar: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const routeProtected = to.matched.some(
    (record) => record.meta.routeProtected
  );
  if (routeProtected && store.state.token === null) {
    next("/login");
  } else {
    next();
  }
});

export default router;
