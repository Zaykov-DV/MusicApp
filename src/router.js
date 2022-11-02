import { createWebHistory, createRouter } from "vue-router";
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import VinylItemInfo from './views/VinylItemInfo.vue'
import HomePage from './views/HomePage.vue'
import NotFound from './views/NotFound.vue'
import Welcome from './views/Welcome.vue'

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
      component: HomePage
    },
    {
      path: '/vinyl/:id',
      name: 'Info',
      component: VinylItemInfo
    },
    {
      path: '/:CatchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    }
  ]
});


export default router;