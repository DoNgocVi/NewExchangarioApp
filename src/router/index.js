import { createWebHistory, createRouter } from "vue-router";

import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import FaqPage from "../pages/Faq";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import Profile from "../pages/Profile";
import { getAuth } from "firebase/auth";
import ExchangeCreate from "../pages/ExchangeCreate";
import ExchangeDetailPage  from "../pages/ExchangeDetail"
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
  {
    path: "/faq",
    name: "Faq",
    component: FaqPage,
  },

  {
    path: "/exchanges/new",
    name: "ExchangeCreate",
    component: ExchangeCreate,
    meta: { onlyAuthUser: true },
  },
  {
    path: "/exchanges/:slug",
    name: "ExchangeDetail",
    component: ExchangeDetailPage,
    meta: { onlyAuthUser: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { onlyAuthUser: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { onlyGuestUser: true },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const isAuth = getAuth().currentUser;
  if (to.meta.onlyAuthUser) {
    if (isAuth) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else if (to.meta.onlyGuestUser) {
    if (isAuth) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
