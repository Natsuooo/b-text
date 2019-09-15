<template>
  <v-content>
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-card class="pa-5 my-5 mx-3">
         
          <v-img
            :src="require('../assets/images/favicon_520_transparent.png')"
            class="my-3"
            contain
            height="70"
            @click="toHome()"  
            style="cursor: pointer;"          
          ></v-img>
          <p class="display-1 text-center" style="font-family: 'Comfortaa', cursive!important;" @click="toHome()">B-text</p>
          <p class="text-center ml-3 mb-5">大学のテキストをシェアしよう。</p>
          <p class="text-center pt-5 mb-2 display-1">ログイン</p>
          <v-divider></v-divider>
          <v-alert type="error" v-if="unsignedMessage" class="mt-5">未登録のメールアドレスです。サインアップ画面から、新しいアカウントを作成しましょう。</v-alert>
          <v-alert type="error" v-if="invalidPassword" class="mt-5">パスワードが適切ではありません。</v-alert>
          <v-form v-model="valid" class="mt-5" @submit="login" onSubmit="return false;">
            <v-container grid-list-xl>
              <v-layout wrap>
                <v-flex
                  xs12
                >
                  <v-btn 
                    depressed 
                    large
                    block
                    outlined
                    color="grey darken-1"
                    class="mb-5 text-capitalize"
                    @click="facebookSignUp"
                  >
                    <img src="../assets/images/facebook_icon.png" width="20" class="mr-2">
                    Facebookでログイン
                  </v-btn>
                 
                  <v-btn 
                    depressed 
                    large
                    block
                    outlined
                    color="grey darken-1"
                    class="mb-5 text-capitalize"
                    @click="twitterSignUp"
                  >
                    <img src="../assets/images/twitter_icon.jpg" width="20" class="mr-2">
                    Twitterでログイン
                  </v-btn>
                  <v-btn 
                    depressed 
                    large
                    block
                    outlined
                    color="grey darken-1"
                    class="mb-5 text-capitalize"
                    @click="googleSignUp"
                  >
                    <img src="../assets/images/google_icon.jpg" width="20" class="mr-3">
                    Googleでログイン
                  </v-btn>
                  <p class="text-center">または</p>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    outlined
                    color="green accent-4"  
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="パスワード"
                    type="password"
                    required
                    outlined
                    color="green accent-4"
                  ></v-text-field>
                  <v-btn 
                    block
                    large
                    :disabled="!valid"
                    color="green accent-4"
                    class="mr-4 white--text" 
                    @click="login"
                  >
                    ログイン
                  </v-btn>
                  <p class="text-center pt-5 mt-5 grey--text text--darken-1">アカウントをお持ちではありませんか？</p>
                  <p class="text-center"><router-link to="/signup" class="green--text text--accent-4" style="text-decoration:none;">アカウントを作成</router-link></p>
                  <p class="text-center"><router-link to="/password_reset" class="green--text text--accent-4" style="text-decoration:none;">パスワードをお忘れの方</router-link></p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';

  export default {
    title: 'ログイン',
    data: () => ({
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'Emailの記入は必須です。',
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || '適切な形式のメールアドレスを記入して下さい。',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'パスワードの記入は必須です。',
      ],
      uid: '',
      userDetail: {},
      unsignedMessage: false,
      invalidPassword: false
    }),
    components: {
      LoginBar,
    },
    methods:{
      emailMatchError(){
        return (this.password===this.passwordConfirmation) ? '' : 'パスワードと一致しません。'
      },
      setUserDetail(){
        this.$axios.get('https://b-text-api.herokuapp.com/user', {params: {uid: this.uid}})
          .then(res=>{
            this.userDetail=res.data;
          this.$store.commit('setUserDetail', this.userDetail);
            if(this.userDetail.is_signup_detail){
              console.log(this.userDetail);
              this.$router.push('/');
            }else{
              this.$router.push('/signup/detail')
            }

          });
      },
      login(){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(obj=>{
            this.uid=obj.user.uid;
            this.setUserDetail();
            })
          .catch(error=>{
            if(error.message=="There is no user record corresponding to this identifier. The user may have been deleted."){this.unsignedMessage=true;}
            if(error.message=="The password is invalid or the user does not have a password."){this.invalidPassword=true;}
            console.log(error.message)
        })
      },
      googleSignUp(){
        var provider=new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
          .then(obj=>{
            this.uid=obj.user.uid;
            this.setUserDetail();
            })
//          .catch(error=>alert(error.message))
      },
      twitterSignUp(){
        var provider=new firebase.auth.TwitterAuthProvider()
        firebase.auth().signInWithPopup(provider)
          .then(obj=>{
            this.uid=obj.user.uid;
            this.setUserDetail();
            })
//          .catch(error=>alert(error.message))
      },
      facebookSignUp(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(obj=>{
            this.uid=obj.user.uid;
            this.setUserDetail();
            })
//          .catch(error=>alert(error.message))
      },
      toHome(){
        this.$router.push('/');
      }
    },
    created() {
      
    },
  };
</script>