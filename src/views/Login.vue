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
          <p class="text-center pt-5 mb-2 display-1">ログイン</p>
          <v-divider></v-divider>
          <v-form v-model="valid" class="mt-5">
            <v-container grid-list-xl>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
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
                    color="green accent-4"
                    class="mr-4 white--text" 
                    @click="submit"
                  >
                    ログイン
                  </v-btn>
                  <p class="text-center pt-5 mt-5 grey--text text--darken-1">アカウントをお持ちではありませんか？</p>
                  <p class="text-center"><router-link to="/signup" class="green--text text--accent-4" style="text-decoration:none;">アカウントを作成</router-link></p>
                  <p class="text-center"><router-link to="/login" class="green--text text--accent-4" style="text-decoration:none;">パスワードをお忘れの方</router-link></p>
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
    }),
    components: {
      LoginBar,
    },
    title: '新規登録',
    methods:{
      emailMatchError(){
        return (this.password===this.passwordConfirmation) ? '' : 'パスワードと一致しません。'
      }
    }
  };
</script>


