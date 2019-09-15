<template>
  <v-content>
    <v-layout justify-center>
      <v-flex xs12 sm6>
       <v-alert type="success" v-show="message" class="mt-5">
        パスワード再設定用メールを送信しました。
      </v-alert>
        <v-card class="pa-5 my-5">
         
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
          <p class="text-center pt-5 mb-2 display-1">パスワード再設定</p>
          <v-divider></v-divider>
          <v-form v-model="valid" class="mt-5" @submit="send" onSubmit="return false;">
            <v-container grid-list-xl>
              <v-layout wrap>
                <v-flex
                  xs12
                >
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
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
                    @click="send"
                  >
                    パスワード再設定用メールを送る
                  </v-btn>
                  <p class="text-center mt-5"><router-link to="/login" class="green--text text--accent-4" style="text-decoration:none;">ログイン</router-link></p>
                  <p class="text-center"><router-link to="/signup" class="green--text text--accent-4" style="text-decoration:none;">アカウントを作成</router-link></p>
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
      message: false,
    }),
    methods:{
      toHome(){
        this.$router.push('/');
      },
      send(){
        this.message=true;
        var auth=firebase.auth();
        var emailAddress=this.email;
        firebase.auth().languageCode='ja';
        auth.sendPasswordResetEmail(emailAddress).then(function(){
          
        }).catch(function(error){
          
        });
      }
    },
    created() {
      
    },
  };
</script>