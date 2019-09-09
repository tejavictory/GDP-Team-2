import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignUpForm from '@/components/Auth/SignUpForm'
import LogInForm from '@/components/Auth/LogInForm'
import ResetPassword from '@/components/Auth/ResetPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      component: SignUpForm
    },
    {
      path: '/login',
      component: LogInForm
    },
    {
      path: '/resetpassword',
      component: ResetPassword
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})