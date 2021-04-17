import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Save from "../views/Save.vue";
import JScad from "../views/JScad.vue";
import Pull from "../views/Pull.vue";
import GetToken from "../views/GetToken.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/save",
    name: "Save",
    component: Save,
  },

  {
    path: "/jscad",
    name: "JScad", //   name: "JScad", line 35
    component: JScad,
  },

  {
    path: "/pull",
    name: "Pull",
    component: Pull,
  },

  {
    path: "/token",
    name: "gettoken",
    component: GetToken,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
