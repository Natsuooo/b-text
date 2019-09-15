import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import SignupDetail from './views/SignupDetail.vue'
import Login from './views/Login.vue'
import Favorites from './views/Favorites.vue'
import Sell from './views/Sell.vue'
import Messages from './views/Messages.vue'
import MyPage from './views/MyPage.vue'
import MyBooks from './views/MyBooks.vue'
import User from './views/User.vue'
import BookDetail from './views/BookDetail.vue'
import UserDetail from './views/UserDetail.vue'
import MessagesUsers from './views/MessagesUsers.vue'
import MessagesMyBooks from './views/MessagesMyBooks.vue'
import MessagesBuy from './views/MessagesBuy.vue'
import PasswordReset from './views/PasswordReset.vue'

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
    {
      path: '/password_reset',
      name: 'passwordReset',
      component: PasswordReset
    },
    {
      path: '/sell',
      name: 'sell',
      component: Sell
    },
    {
      path: '/messages/sell',
      name: 'messagesmybooks',
      component: MessagesMyBooks
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage
    },
    {
      path: '/mypage/books',
      name: 'mybooks',
      component: MyBooks
    },
    {
      path: '/mypage/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/mypage/user',
      name: 'user',
      component: User
    },
    {
      path: '/books/:id',
      name: 'bookdetail',
      component: BookDetail
    },
    {
      path: '/users/:id',
      name: 'userdetail',
      component: UserDetail
    },
    {
      path: '/messages/sell/:book_id',
      name: 'messagesUsers',
      component: MessagesUsers
    },
    {
      path: '/messages/private/:book_id/:user_id',
      name: 'messages',
      component: Messages
    },
    {
      path: '/messages/buy',
      name: 'messagesbuy',
      component: MessagesBuy
    }
  ]
});

router.beforeEach((to, from, next)=>{
  if(to.name==="mypage"){
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
