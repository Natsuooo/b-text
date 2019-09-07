<template>
  <v-content>
    <v-layout justify-center>
      <LoginBar v-if="!isLogin"/>
      
      <v-flex xs12 sm6 class="mb-10">
        <v-toolbar style="position: fixed; top: 0; left: 0; z-index: 10; width: 100%;">
          <v-btn icon @click="backHome">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>ユーザー詳細</v-toolbar-title>
        </v-toolbar>
        
        <v-layout justify-center style="margin-top: 90px;">
          <div>
            <v-container fill-height>
              <v-avatar
                class="mr-3"
                style="margin-left: -10px;">
                <v-img 
                 v-if="otherUsersDetail.profile_image!='default'"
                 :src="otherUsersDetail.profile_image"></v-img>
                 <img v-else :src="require('../assets/images/account.svg')"
                 style="opacity: 0.7;">
              </v-avatar>
              <span class="text-center">     {{otherUsersDetail.username}} </span>
            </v-container>
          </div>
        </v-layout>
        
        <div class="text-center">
          <v-rating
            v-model="rating"
            color="green accent-4"
            background-color="grey lighten-1"
            small 
            readonly            
            half-increments
            hover
          ></v-rating>
          <p class="body-2" color="grey" v-if="rates">評価：{{rating}}（{{rates.length}}人）</p>
          <p class="body-2" color="grey" v-else>まだ評価した人はいません。</p>
          <v-btn 
            color="green accent-4"
            dark
            small
            class="caption"
            @click="dialog=true;">
             評価する
           </v-btn>
        </div>
        
        <v-dialog
          v-model="dialog"
          max-width="290"
        >
          <v-card>

            <v-card-text>
              {{otherUsersDetail.username}}さんの対応はいかがでしたか？星をタップして評価しましょう。
            </v-card-text>
            <v-divider></v-divider>
            <div class="text-center mt-5 mb-5">
              <v-rating
                v-model="myRating"
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
                @click="updateMyRate(otherUsersDetail.id)"
              >
                完了
              </v-btn>
              <v-btn
                v-else
                color="green accent-4"
                text
                @click="rate(otherUsersDetail.id)"
              >
                完了
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        <v-subheader>出品中の本</v-subheader>
        
        
        <v-container v-if="myBooks">
          <v-card 
           v-for="myBook in myBooks"
           v-if="myBook.is_public"
           class="mb-3"
           @click="toBookDetail(myBook.id)">
           {{isPublic()}}
            <v-layout>
              <v-flex xs5 class="pa-2">
                <v-img v-if="myBook.google_image" :src="myBook.google_image"></v-img>
                <v-img v-if="myBook.original_image" :src="originalImagePath(myBook.original_image)"></v-img>
              </v-flex>
              <v-flex xs7>
                <v-card-title class="subtitle-1 pt-2">{{myBook.title}}</v-card-title>
                <v-card-text>
                  <span class="text--primary body-1">{{myBook.price}}円</span><br>
                  <span class="caption"> 出品日: {{myBook.created_at.slice(0, 10)}}</span>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>

        <v-layout v-if="!is_public" justify-center style="margin-top: -10px; margin-bottom: 20px;">
          <v-subheader>出品中の本はありません。</v-subheader>
        </v-layout>
        
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';
  import NavBar from '../components/NavBar';

  export default {
    title: 'ユーザー詳細画面',
    data: () => ({
      isLogin: false,
      university: '',
      user: {},
      userDetail: {},
      books: {},
      id: '',
      user_id: '',
      otherUsersDetail: {},
      bookDetail: {},
      myBooks: {},
      is_public: false,
      rates: {},
//      uploadedImage: '',
      rating: 0,
      dialog: false,
      isRated: false,
      myRating: 0,
    }),
    components: {
      LoginBar,
      NavBar,
    },
    methods:{
      getBookDetail(){
        this.$axios.get('https://b-text-api.herokuapp.com/books/detail', {params: {id: this.id}})
          .then(res=>{
            this.bookDetail=res.data;
            this.created_at=this.bookDetail.created_at.slice(0, 10);
            this.getUser(this.bookDetail.user_id);
          });
      },
      originalImagePath(original_image){
        return "https://b-text-api.herokuapp.com/book_images/"+original_image
      },
      getUser(){
        this.$axios.get('https://b-text-api.herokuapp.com/get_user', {params: {id: this.id}})
          .then(res=>{
            this.otherUsersDetail=res.data;
//            if(this.otherUsersDetail.profile_image!="default"){
//              this.uploadedImage="https://b-text-api.herokuapp.com/users/"+ this.otherUsersDetail.profile_image;
//            }
          });
      },
      toUserDetail(id){
        this.$router.push({name: 'userdetail', params: {id: id}});
      },
      backHome(){
        this.$router.go(-1);
      },
      getMyBooks(id){
        this.$axios.get('https://b-text-api.herokuapp.com/mybooks', {params: {user_id: id}})
          .then(res=>{
            this.myBooks=res.data;
            
          });
      },
      isPublic(){
        this.is_public=true;
      },
      toBookDetail(id){
        this.$router.push({name: 'bookdetail', params: {id: id}});
      },
      getRate(){
        this.$axios.get('https://b-text-api.herokuapp.com/rates/my', {params: {to_user_id: this.id}})
          .then(res=>{
            this.rates=res.data;
            if(this.rates){
              this.getRating();
            }
          });
      },
      getRating(){
        var sum=0;
        for(var i=0;i<this.rates.length;i++){
          sum=sum+parseInt(this.rates[i].rating);
        }
        var rating=sum/this.rates.length;
        this.rating=Math.round(rating *10)/10;
      },
      rate(to_user_id){
        this.dialog=false;
        var formData=new FormData();
        formData.append("from_user_id", this.userDetail.id);
        formData.append("to_user_id", to_user_id);
        formData.append("rating", this.myRating);
        var config={
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/rates/create', formData, config);
        this.getRate();
      },
      updateMyRate(to_user_id){
        this.dialog=false;
        var formData=new FormData();
        formData.append("from_user_id", this.userDetail.id);
        formData.append("to_user_id", to_user_id);
        formData.append("rating", this.myRating);
        var config={
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/rates/update', formData, config);
        this.getRate();
      },
      getMyRate(){
        this.$axios.get('https://b-text-api.herokuapp.com/rates', {params: {from_user_id: this.userDetail.id, to_user_id: this.$route.params.id}})
          .then(res=>{
            this.myRating=res.data.rating;
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
      this.id=this.$route.params.id;
      this.getUser();
      this.getMyBooks(this.id);
      this.getRate();
      this.getMyRate();
    },
  };
</script>


