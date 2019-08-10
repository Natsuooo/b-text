<template>
  <v-content>
    <v-layout justify-center>
      <MyPageTabs/>
      <v-flex xs12 sm6 style="margin-bottom: 100px; margin-top: 70px;">
        
      </v-flex>
      <NavBar/>
    </v-layout>
  </v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';
  import NavBar from '../components/NavBar';
  import MyPageTabs from '../components/MyPageTabs';

  export default {
    title: 'マイページ',
    data: () => ({
      isLogin: false,
      user: {},
      userDetail: {},
      username: '',
      university: '',
      photoURL: '',
      profile_image: '',
    }),
    components: {
      LoginBar,
      NavBar,
      MyPageTabs,
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
      },
      updateProfile(){
        
      }
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.username=this.userDetail.username;
      this.university=this.userDetail.university;
    },
    computed: {
//      user(){
//        return this.$store.getters.user;
//      },
//      isLogin(){
//        return this.$store.getters.isLogin;
//      },
//      userDetail(){
//        return this.$store.getters.userDetail;
//      }
    }
  };
</script>


