<template>
  <v-content>
    <v-layout justify-center>
      <v-flex xs12 sm6>
      <LoginBar></LoginBar>
      <v-btn @click="logout">ログアウト</v-btn>
      <p>{{user.displayName}}</p>
      <p>{{user.email}}</p>
      <p>{{user.uid}}</p>
      <p>{{user.photoURL}}</p>
      <p>{{isLogin}}</p>
      <p>{{userDetail.uid}}</p>
      <p>{{userDetail.is_signup_detail}}</p>
      <p>{{userDetail.university}}</p>
      <p>{{userDetail.username}}</p>
      <p>{{userDetail.profile_image}}</p>
      
      
      <v-bottom-navigation
        
        style="position: absolute; bottom: 0; left: 0;"
        class="pr-3"
      >
        <v-btn>
          <span>ホーム</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn>
          <span>お気に入り</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        
        <v-btn >
          <span class="green--text text--accent-4">出品</span>
          <v-icon color="green accent-4">mdi-camera</v-icon>
        </v-btn>

        <v-btn>
          <span>メッセージ</span>
          <v-icon>mdi-forum</v-icon>
        </v-btn>

        <v-btn>
          <span>マイページ</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
      
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';

  export default {
    title: 'ホーム',
    data: () => ({
    }),
    components: {
      LoginBar,
    },
    methods:{
      logout(){
        var formData=new FormData();
        formData.append("uid", this.uid)
        var config={
          headers:{
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('http://localhost:8080/logout', formData, config);
        firebase.auth().signOut();
        this.$store.commit('setUserDetail', {});
        this.$router.push('/login');
      }
    },
    created() {
//      var user=firebase.auth().currentUser;
//      if (user) {
//        this.name = user.displayName;
//        this.photoURL = user.photoURL;
//        if(user.photoURL){
//          this.isPhotoURL = true
//        }
//        this.uid = user.uid;
//        this.$axios.get('http://localhost:8080/user', {params: {uid: this.uid}})
//        .then(res=>{
//          this.userInfo=res.data;
//          this.is_signup=res.data.is_signup;
//          if(this.is_signup){
//            this.$router.push('/');
//          }
//        });
//      } else {
////        this.$router.push('/signup');
//      }
    },
    computed: {
      user(){
        return this.$store.getters.user;
      },
      isLogin(){
        return this.$store.getters.isLogin;
      },
      userDetail(){
        return this.$store.getters.userDetail;
      }
    }
  };
</script>


