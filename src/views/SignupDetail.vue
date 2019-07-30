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
          <p class="text-center pt-5 mb-2 headline">アカウント情報入力</p>
          <v-divider></v-divider>
          <v-form v-model="valid" class="mt-5">
            <v-container grid-list-xl>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="ユーザー名"
                    required
                    outlined
                    color="green accent-4"  
                  ></v-text-field>
                  
                  <v-btn
                    block
                    large
                    @click.stop="dialog = true"
                    style="margin-bottom: 40px;"
                  >
                    大学名を選択
                  </v-btn>
                  
                  <span>大学/キャンパス名: {{ selected }}</span>

                  <v-dialog
                    v-model="dialog"
                  >
                    <v-card>
                      <v-card-title class="title">大学名の頭文字を選択する</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-btn-toggle class="my-2 mr-2">
                          <v-btn 
                            text
                            @click="dialog1=true, dialog=false"
                          >
                            あ
                          </v-btn>
                          <v-btn text>
                            い
                          </v-btn>
                          <v-btn text>
                            う
                          </v-btn>
                          <v-btn text>
                            え
                          </v-btn>
                          <v-btn text>
                            お
                          </v-btn>
                        </v-btn-toggle>
                        <v-btn-toggle>
                          <v-btn text>
                            か
                          </v-btn>
                          <v-btn text>
                            き
                          </v-btn>
                          <v-btn text>
                            く
                          </v-btn>
                          <v-btn text>
                            け
                          </v-btn>
                          <v-btn text>
                            こ
                          </v-btn>
                        </v-btn-toggle>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  
                  <v-dialog
                    v-model="dialog1"
                  >
                    <v-card>
                      <v-card-title class="title">
                        「あ」で始まる大学/キャンパス一覧
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-list>
                          <v-list-item-group>
                            <v-list-item>専門学校アースビジネスカレッジ</v-list-item>
                          </v-list-item-group>
                        </v-list>
                      <select v-model="selected" multiple @click="dialog1=false">
                        <option>専門学校アースビジネスカレッジ</option>
                        <option>アーツカレッジヨコハマ</option>
                        <option>アーツサウンドビジュアル専門学校</option>
                        <option>アーデントビューティカレッジ</option>
                        <option>専門学校アートカレッジ神戸</option>
                        <option>アール医療福祉専門学校</option>
                        <option>RKC調理製菓専門学校</option>
                      </select>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  
                  <v-btn 
                    block
                    large
                    color="green accent-4"
                    class="mr-4 white--text" 
                    @click="submit"
                    :disabled="!valid"
                  >
                    完了
                  </v-btn>
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
      name: '',
      nameRules: [
        v => !!v || 'ユーザー名の記入は必須です。',
      ],
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
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


