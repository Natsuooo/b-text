import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import titleMixin from './util/title'
import firebase from 'firebase'

Vue.config.productionTip = false
Vue.mixin(titleMixin)

var config = {
    apiKey: "AIzaSyD6jqzu_ot7SeJsHLCOJcpXlVpDl6mp5W0",
    authDomain: "b-text.firebaseapp.com",
    databaseURL: "https://b-text.firebaseio.com",
    projectId: "b-text",
    storageBucket: "",
    messagingSenderId: "631663991321",
    appId: "1:631663991321:web:48fe20632b48741e"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
