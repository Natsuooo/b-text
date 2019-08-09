import firebase from 'firebase'
import store from "./store"

var config = {
  apiKey: "AIzaSyD6jqzu_ot7SeJsHLCOJcpXlVpDl6mp5W0",
  authDomain: "b-text.firebaseapp.com",
  databaseURL: "https://b-text.firebaseio.com",
  projectId: "b-text",
  storageBucket: "",
  messagingSenderId: "631663991321",
  appId: "1:631663991321:web:48fe20632b48741e"
};

export default{
  init(){
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  },
//  logout(){
//    firebase.auth().signOut();
//  },
  onAuth(){
    firebase.auth().onAuthStateChanged(user=>{
      user=user ? user : {};
      store.commit('setUser', user);
      store.commit('setLogin', user.uid ? true : false)
    })
  },
//  googleLogin(){
//    var provider=new firebase.auth.GoogleAuthProvider();
//    firebase.auth().signInWithPopup(provider);
//  }
}