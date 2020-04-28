/* eslint-disable no-undef */
import Vue from "vue";
import VueRouter from "vue-router";
import { isAuthenticated } from "./isAuthenticatedGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../components/Users/Users.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("../components/auth/SignIn.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("../components/auth/SignUp.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// activating guards
isAuthenticated(router);

export default router;