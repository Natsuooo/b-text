import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import SignupDetail from './views/SignupDetail.vue'
import Login from './views/Login.vue'

import store from './store'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signup/detail',
      name: 'signupDetail',
      component: SignupDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
});

router.beforeEach((to, from, next)=>{
  if(to.name==="home"){
    if(store.state.isLogin){
      if(store.state.userDetail.is_signup_detail){
        next();
      }else{
        next('/signup/detail');
      }
      
    }else{
      next('/login');
    }
  }else if(to.name==="signupDetail"){
    if(store.state.userDetail.is_signup_detail){
      next('/');
    }else{
      next();
    }
  }else{
    next();
  }
});

export default router;
