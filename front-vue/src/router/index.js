import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import { roles } from "../config/auth";

Vue.use(VueRouter);

// all components import
const Login = () => import("../views/Login.vue");
const CreateUser = () => import("../views/CreateUser.vue");
const Home = () => import("../views/Home.vue");
const CombattantList = () => import("../views/CombattantList.vue");
const Battle = () => import("../views/Battle.vue");

const routes = [
  {
    path: "/",
    redirect: { name: "home" },
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiredAuth: true,
      role: "USER",
    },
  },
  {
    path: "/combattants",
    name: "combattants",
    component: CombattantList,
    meta: {
      requiredAuth: true,
      role: "USER",
    },
  },
  {
    path: "/combat",
    name: "combat",
    component: Battle,
    meta: {
      requiredAuth: true,
      role: "USER",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/create-user",
    name: "create-user",
    component: CreateUser,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router interceptor
router.beforeEach(async (to, _from, next) => {
  if (to.path !== "/login") {
    if (to.meta?.requiredAuth) {
      if (store.getters.getIsAuthenticated) {
        const user = store.getters.getUser;
        if (
          roles[user.role.toUpperCase()] &&
          roles[user.role.toUpperCase()].includes(to.meta?.role)
        ) {
          next();
        } else {
          next({
            path: "/403",
          });
        }
      } else {
        next({
          path: "/login",
        });
      }
    } else {
      next();
    }
  }
  next();
});

export default router;
