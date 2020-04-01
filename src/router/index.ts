import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import About from '../views/About.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('USER_TOKEN');

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authToken) {
      next({
        path: '/',
        params: {nextUrl: to.fullPath},
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => !record.meta.requiresAuth)) {
    if (authToken) {
      next({
        path: '/home',
        params: {nextUrl: to.fullPath},
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
