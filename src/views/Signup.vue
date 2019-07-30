<template>
  <v-content>
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-card class="pa-5 ma-5">
          <v-img
            :src="require('../assets/favicon_520_transparent.png')"
            class="my-3"
            contain
            height="70"
          ></v-img>
          <p class="display-1 text-center" style="font-family: 'Comfortaa', cursive!important;">B-text</p>
          <p class="text-center ml-3 mb-5">大学のテキストをシェアしよう。</p>
          <p class="text-center pt-5 mb-2 display-1">新規登録</p>
          <v-divider></v-divider>
          <v-form v-model="valid" class="mt-5">
            <v-container grid-list-xl>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
<!--
                  <v-btn 
                    depressed 
                    large
                    block
                    outlined
                    color="grey darken-1"
                    class="mb-5"
                    @click="facebookSignUp"
                  >
                    Facebookで続行
                  </v-btn>
-->
                  <v-btn 
                    depressed 
                    large
                    block
                    outlined
                    color="grey darken-1"
                    class="mb-5 text-capitalize"
                    @click="twitterSignUp"
                  >
                    <img src="../assets/twitter_icon.jpg" alt="Twitter" width="20" class="mr-2">
                    Twitterで続行
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
                    <img src="../assets/google_icon.jpg" alt="Google" width="20" class="mr-3">
                    Googleで続行
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
                  <v-text-field
                    v-model="passwordConfirmation"
                    :rules="passwordConfirmationRules"
                    :error-messages='emailMatchError()'
                    label="確認用パスワード"
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
                    @click="signUp"
                  >
                    続ける
                  </v-btn>
                  <p class="text-center pt-5 mt-5 grey--text text--darken-1">既にアカウントをお持ちですか？</p>
                  <p class="text-center"><router-link to="/login" class="green--text text--accent-4" style="text-decoration:none;">ログイン</router-link></p>
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
    data: () => ({
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'Emailの記入は必須です。',
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || '無効なメールアドレスです。',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'パスワードの記入は必須です。',
        v => v.length >= 6 || '6文字以上のパスワードを作成して下さい。',
      ],
      passwordConfirmation: '',
      passwordConfirmationRules: [
        v => !!v || '確認用パスワードの記入は必須です。',
//        v => v === this.password || 'パスワードと一致しません。',
      ],
      
    }),
    components: {
      LoginBar,
    },
    title: '新規登録',
    methods:{
      emailMatchError(){
        return (this.password===this.passwordConfirmation) ? '' : 'パスワードと一致しません。'
      },
      signUp: function(){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user=>{
            this.$router.push('/signup/detail');
          })
          .catch(error=>{
            alert(error.message)
          })
      },
      googleSignUp: function(){
        var provider=new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
          .then(obj=>{
//            alert('Create account: '+obj.user.displayName)
            this.$router.push('/signup/detail');
          })
          .catch(error=>alert(error.message))
      },
      twitterSignUp: function(){
        var provider=new firebase.auth.TwitterAuthProvider()
        firebase.auth().signInWithPopup(provider)
          .then(obj=>{
//            alert('Create account: '+obj.user.displayName)
            this.$router.push('/signup/detail');
          })
          .catch(error=>alert(error.message))
      },
//      facebookSignUp: function(){
//        var provider = new firebase.auth.FacebookAuthProvider();
//        provider.addScope('user_birthday');
//        firebase.auth().languageCode = 'ja';
//        provider.setCustomParameters({
//          'display': 'popup'
//        });
//        firebase.auth().signInWithPopup(provider)
//          .then(obj=>{
//            alert('create account: '+obj.user.displayname)
//          })
//          .catch(error=>alert(error.message))
//      }
    }
  };
</script>


