import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {},
    isLogin: false,
    userDetail: {},
  },
  mutations: {
    setUser(state, user){
      state.user=user;
    },
    setLogin(state, isLogin){
      state.isLogin=isLogin;
    },
    setUserDetail(state, userDetail){
      state.userDetail=userDetail;
    }
  },
  getters: {
    user(state){
      return state.user;
    },
    isLogin(state){
      return state.isLogin;
    },
    userDetail(state){
      return state.userDetail;
    }
  }
})
