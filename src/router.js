import { createWebHistory, createRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import Register from './views/Register.vue'
import Login from './views/Login.vue'
import VinylItemInfo from './views/VinylItemInfo.vue'
import HomePage from './views/HomePage.vue'
import NotFound from './views/NotFound.vue'
import Welcome from './views/Welcome.vue'
import AddVinyl from './views/AddVinyl.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      beforeEnter(to, from, next) {
        getCurrentUser ? next() : next('/welcome')
      },
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/add',
      name: 'AddVinyl',
      component: AddVinyl,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/vinyl/:id',
      name: 'Info',
      component: VinylItemInfo,
    },
    {
      path: '/:CatchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    }
  ]
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListener();
          resolve(user)
        },
        reject
    )
  })
}

router.beforeEach(async function (to, from, next) {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next(true);
    } else {
      // alert('you dont have access')
      next({path: '/welcome'})
    }
  } else {
    next()
  }
})


export default router;