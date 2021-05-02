import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import JScad from "../views/JScad.vue";

var currentUrl = window.location.pathname;

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/see",
    name: "about",
    alias: "/vue",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  {
    path: "/jscad",
    name: "JScad", //   name: "JScad", line 35
    component: JScad,
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(currentUrl),
  routes,
});

export default router;
