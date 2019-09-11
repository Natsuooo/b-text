<template>
  <v-content>
    <v-layout justify-center>
     <v-toolbar style="position: fixed; top: 0; left: 0; z-index: 10; width: 100%;">
        <v-btn icon @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>メッセージ</v-toolbar-title>
      </v-toolbar>
      <v-flex xs12 sm8 style="margin-bottom: 100px;  margin-top: 60px;">
        
      <v-container v-if="users">
        <v-card 
         v-for="user in users"
         class="mb-3"
         style="position: relative; cursor:pointer;">
         <v-btn class="mx-2"
           v-if="user.unread_messages.length" 
           fab
           dark 
           small 
           color="green accent-4"
           style="position: absolute; top: -10px; left: -15px; z-index: 3;">
            <v-icon dark small style="margin-left: -5px;">{{user.unread_messages.length}}</v-icon>
         </v-btn>
         <v-layout>
           <v-flex xs3 class="pl-1" @click="toMessages(user.id)">
             <v-container fill-height>
               <v-layout justify-center>
                 <v-avatar
                  class="mr-2">
                   <v-img 
                   v-if="user.profile_image!='default'"
                   :src="user.profile_image"></v-img>
                   <img v-else :src="require('../assets/images/account.svg')"
                   style="opacity: 0.7;">
                </v-avatar>
               </v-layout>
             </v-container>
             
           </v-flex>
           
           <v-flex xs8 class="ml-0">
             <p class="mb-0 mt-2" @click="toMessages(user.id, user.username)">{{user.username}}</p>
             <v-layout>
               <v-flex xs8 @click="toMessages(user.id, user.username)">
                 <p class="caption grey--text" style="margin-top: 5px; word-break: break-all; line-height: 1;">{{user.new_message.slice(0, 30)}}</p>
               </v-flex>
               <v-flex xs4>
                 <v-btn 
                  small
                  color="green accent-4"
                  dark
                  block
                  class="ml-3 caption"
                  @click="dialog=true; getRate(user.id)">
                   評価する
                 </v-btn>
               </v-flex>
             </v-layout>
             
             <v-dialog
              v-model="dialog"
              max-width="290"
            >
              <v-card>
                
                <v-card-text>
                  {{user.username}}さんの対応はいかがでしたか？星をタップして評価しましょう。
                </v-card-text>
                <v-divider></v-divider>
                <div class="text-center mt-5 mb-5">
                  <v-rating
                    v-model="rating"
                    color="green accent-4"
                    background-color="grey lighten-1"
                    hover
                  ></v-rating>
                </div>
                
                
                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn
                    color="grey darken-2"
                    text
                    @click="dialog = false"
                  >
                    閉じる
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="isRated"
                    color="green accent-4"
                    text
                    @click="updateRate(user.id)"
                  >
                    完了
                  </v-btn>
                  <v-btn
                    v-else
                    color="green accent-4"
                    text
                    @click="rate(user.id)"
                  >
                    完了
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
             
           </v-flex>
         </v-layout>
        </v-card>
      </v-container>
      <v-layout justify-center style="margin-top: 50px;">
        <v-progress-circular
          indeterminate
          color="green"
          v-show="!users"
          class="hide"
        ></v-progress-circular>
      </v-layout>
      <v-layout v-show="!users" justify-center class="mt-5 show">
        <v-subheader>メッセージはありません。</v-subheader>
      </v-layout>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';

  export default {
    title: 'メッセージ',
    data: () => ({
      isLogin: false,
      messages: {},
      time: '',
      myBooks: {},
      users: {},
      dialog: false,
      rating: 0,
      isRated: false,
    }),
    components: {
      LoginBar,
    },
    methods:{
      originalImagePath(original_image){
        return "https://b-text-api.herokuapp.com/book_images/"+original_image
      },
      back(){
        this.$router.go(-1);
      },
      getUsers(book_id){
        this.$axios.get('https://b-text-api.herokuapp.com/messages/users', {params: {book_id: book_id, user_id: this.userDetail.id}})
          .then(res=>{
            this.users=res.data
          console.log(this.users);
          });
      },
      toMessages(user_id){
        this.$router.push('/messages/private/'+this.$route.params.book_id+'/'+user_id);
      },
      uploadedImage(profile_image){
        return "https://b-text-api.herokuapp.com/users/"+ profile_image;
      },
      rate(to_user_id){
        this.dialog=false;
        var formData=new FormData();
        formData.append("from_user_id", this.userDetail.id);
        formData.append("to_user_id", to_user_id);
        formData.append("rating", this.rating);
        var config={
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/rates/create', formData, config);
        
      },
      updateRate(to_user_id){
        this.dialog=false;
        var formData=new FormData();
        formData.append("from_user_id", this.userDetail.id);
        formData.append("to_user_id", to_user_id);
        formData.append("rating", this.rating);
        var config={
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/rates/update', formData, config);
        
      },
      getRate(to_user_id){
        this.$axios.get('https://b-text-api.herokuapp.com/rates', {params: {from_user_id: this.userDetail.id, to_user_id: to_user_id}})
          .then(res=>{
            this.rating=res.data.rating;
            if(res.data.rating){
              this.isRated=true;
            }
          });
      }
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.username=this.userDetail.username;
      this.university=this.userDetail.university;
      this.getUsers(this.$route.params.book_id);
      
    },
  };
</script>

<style>
  .hide{
    -moz-animation: cssAnimation 0s ease-in 1s forwards;
    /* Firefox */
    -webkit-animation: cssAnimation 0s ease-in 1s forwards;
    /* Safari and Chrome */
    -o-animation: cssAnimation 0s ease-in 1s forwards;
    /* Opera */
    animation: cssAnimation 0s ease-in 1s forwards;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }
  @keyframes cssAnimation {
    to {
        width:0;
        height:0;
        overflow:hidden;
    }
  }
  @-webkit-keyframes cssAnimation {
      to {
          width:0;
          height:0;
          overflow:hidden;
      }
  }
  
  .show{
    -moz-animation: cssAnimationShow 0s ease-in 1s forwards;
    /* Firefox */
    -webkit-animation: cssAnimationShow 0s ease-in 1s forwards;
    /* Safari and Chrome */
    -o-animation: cssAnimationShow 0s ease-in 1s forwards;
    /* Opera */
    animation: cssAnimationShow 0s ease-in 1s forwards;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    visibility: hidden
  }
  @keyframes cssAnimationShow {
    to {
      visibility: visible;
    }
  }
  @-webkit-keyframes cssAnimationShow {
    to {
      visibility: visible;
    }
  }
  
</style>