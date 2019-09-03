<template>
  <v-content>
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-card class="pa-5">
          <v-img
            :src="require('../assets/images/favicon_520_transparent.png')"
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
                    Facebookで続行
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
                    <img src="../assets/images/twitter_icon.jpg" alt="Twitter" width="20" class="mr-2">
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
                    <img src="../assets/images/google_icon.jpg" alt="Google" width="20" class="mr-3">
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
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || '適切な形式のメールアドレスを記入して下さい。',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'パスワードの記入は必須です。',
        v => (v && v.length >= 6) || '6文字以上のパスワードを作成して下さい。',
      ],
      passwordConfirmation: '',
      passwordConfirmationRules: [
        v => !!v || '確認用パスワードの記入は必須です。',
//        v => v === this.password || 'パスワードと一致しません。',
      ],
      userDetail: {},
      uid: '',
    }),
    components: {
      LoginBar,
    },
    title: '新規登録',
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
              this.$router.push('/');
            }else{
              this.$router.push('/signup/detail')
            }

        }); this.$router.push('/signup/detail');
      },
      signUp: function(){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(obj=>{
            this.uid=obj.user.uid;
            this.setUserDetail();
          })
          .catch(error=>alert(error.message))
      },
      googleSignUp: function(){
        var provider=new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
          .then(obj=>{
            this.uid=obj.user.uid;
            this.setUserDetail();
          })
          .catch(error=>alert(error.message))
      },
      twitterSignUp: function(){
        var provider=new firebase.auth.TwitterAuthProvider()
        firebase.auth().signInWithPopup(provider)
          .then(obj=>{
            this.uid=obj.user.uid;
            this.setUserDetail();
          })
          .catch(error=>alert(error.message))
      },
      facebookSignUp: function(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(obj=>{
            this.uid=obj.user.uid;
            this.setUserDetail();
          })
          .catch(error=>alert(error.message))
      }
    }
  };
</script>


