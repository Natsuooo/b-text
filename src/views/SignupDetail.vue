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
                    class="mb-5"
                  >
                    大学/キャンパス名を選択
                  </v-btn>
                  
                  <v-text-field
                    :rules="universityRules"
                    label="大学/キャンパス名"
                    readonly
                    required
                    outlined
                    color="green accent-4"  
                    v-bind:value="university"
                  ></v-text-field>
<!--
                  <span class="grey--text text--darken-1 subtitle-2">大学/キャンパス名</span><br>
                  <span>{{ university }}</span>
-->
                   
<!--
                   <input 
                     type="hidden" 
                     name="university"
                     v-bind:value="university"
                     required
                     :rules="universityRules"
                   >
-->
                    
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
                          <v-btn 
                            text
                            @click="dialog2=true, dialog=false"
                          >
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
                          <v-list-item-group v-for="item in universities1">
                            <v-list-item @click="dialog1=false; select(item.name);">{{ item.name }}</v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  
                  <v-dialog
                    v-model="dialog2"
                  >
                    <v-card>
                      <v-card-title class="title">
                        「い」で始まる大学/キャンパス一覧
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-list>
                          <v-list-item-group>
                            <v-list-item @click="dialog2=false; select('育英大学');">育英大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('石川県立看護大学');">石川県立看護大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('石川県立大学');">石川県立大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('石巻専修大学');">石巻専修大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('一宮研伸大学');">一宮研伸大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('茨城県立医療大学');">茨城県立医療大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('茨城キリスト教大学');">茨城キリスト教大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('茨城大学/水戸キャンパス');">茨城大学/水戸キャンパス</v-list-item>
                            <v-list-item @click="dialog2=false; select('茨城大学/阿見キャンパス');">茨城大学/阿見キャンパス</v-list-item>
                            <v-list-item @click="dialog2=false; select('茨城大学/日立キャンパス');">茨城大学/日立キャンパス</v-list-item>
                            <v-list-item @click="dialog2=false; select('医療創生大学');">医療創生大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('いわき明星大学');">いわき明星大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('岩手医科大学');">岩手医科大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('岩手県立大学');">岩手県立大学</v-list-item>
                            <v-list-item @click="dialog2=false; select('岩手大学/上田キャンパス');">岩手大学/上田キャンパス</v-list-item>
                            <v-list-item @click="dialog2=false; select('岩手大学/釜石キャンパス');">岩手大学/釜石キャンパス</v-list-item>
                            <v-list-item @click="dialog2=false; select('岩手保険医療大学');">岩手保険医療大学</v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  
                  
                  
                  <v-btn 
                    block
                    large
                    color="green accent-4"
                    class="mr-4 white--text mt-2" 
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
      university: '',
      universities1:[
        { name: '愛国学園大学' },
        { name: '愛知医科大学' },
      ],
      universityRules: [
        v => !!v || '大学/キャンパス名の記入は必須です。',
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
      select: function(selectedUniversity){
        this.university=selectedUniversity
      }
    }
  };
</script>


