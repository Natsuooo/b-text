<template>
  <v-content>
    <v-layout justify-center>
      <v-flex xs12 sm6 style="margin-bottom: 100px;">
        <p>メッセージ</p>
      </v-flex>
      <NavBar/>
    </v-layout>
  </v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';
  import NavBar from '../components/NavBar';

  export default {
    title: 'メッセージ',
    data: () => ({
      isLogin: false,
    }),
    components: {
      LoginBar,
      NavBar,
    },
    methods:{
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.username=this.userDetail.username;
      this.university=this.userDetail.university;
    },
  };
</script>


