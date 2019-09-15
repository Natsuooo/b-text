<template>
<v-content>
  <v-layout justify-center>
    <MyPageTabs/>
    <v-flex xs12 sm8 style="margin-bottom: 100px; margin-top: 70px;">
      <v-alert type="success" v-if="this.$route.params.newBook">
        「{{this.$route.params.newBook}}」を出品しました。
      </v-alert>
      <v-alert type="success" v-if="this.$route.params.deleteBook">
        「{{this.$route.params.deleteBook}}」を削除しました。
      </v-alert>
      <v-alert type="success" v-if="this.$route.params.updateBook">
        「{{this.$route.params.updateBook}}」の内容を変更しました。
      </v-alert>
      
      <v-subheader>出品中の本</v-subheader>
      
      <v-container v-if="myBooks">
        <v-card 
         v-for="myBook in myBooks"
         v-if="myBook.is_public"
         v-show="!myBook.is_deleted"
         class="mb-3"
         @click="toBookDetail(myBook.id)">
         {{isPublic()}}
          <v-layout>
            <v-flex xs4 class="pa-2">
              <v-img :src="myBook.image"></v-img>
<!--              <v-img v-if="myBook.original_image" :src="originalImagePath(myBook.original_image)"></v-img>-->
            </v-flex>
            <v-flex xs8>
              <v-card-title class="subtitle-1 pt-2">{{myBook.title}}</v-card-title>
              <v-card-text>
                <span class="text--primary body-1">{{myBook.price}}円</span><br>
                <span class="caption"> 出品日: {{myBook.created_at.slice(0, 10)}}</span>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
      
      <v-layout justify-center style="margin-top: 50px;">
        <v-progress-circular
          indeterminate
          color="green"
          v-show="!is_public"
          class="hide"
        ></v-progress-circular>
      </v-layout>
      
      <v-layout v-show="!is_public" justify-center style="margin-top: -10px; margin-bottom: 20px;" class="show">
        <v-subheader>出品中の本はありません。</v-subheader>
      </v-layout>
      
      <v-subheader>出品を終了した本</v-subheader>
      
      <v-container v-if="myBooks">
        <v-card 
         v-for="myBook in myBooks"
         v-if="!myBook.is_public"
         v-show="!myBook.is_deleted"
         class="mb-3"
         @click="toBookDetail(myBook.id)">
         {{isFinished()}}
          <v-layout>
            <v-flex xs4 class="pa-2">
              <v-img :src="myBook.image">
                <v-img :src="require('../assets/images/sold.png')" style="width: 70%; margin-top: -1px; margin-left: -1px;"></v-img>
              </v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-title class="subtitle-1 pt-2">{{myBook.title}}</v-card-title>
              <v-card-text>
                <span class="text--primary body-1">{{myBook.price}}円</span><br>
                <span class="caption"> 出品日: {{myBook.created_at.slice(0, 10)}}</span>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
        
      </v-container>
      
      <v-layout justify-center style="margin-top: 50px;">
        <v-progress-circular
          indeterminate
          color="green"
          v-show="!is_finished"
          class="hide"
        ></v-progress-circular>
      </v-layout>
      
      <v-layout v-if="!is_finished" justify-center class="show">
        <v-subheader>出品を終了した本はありません。</v-subheader>
      </v-layout>
      
    </v-flex>
    <NavBar tab="books" tabMessages="sell"/>
  </v-layout>
  </v-content>
</template>

<script>
  import firebase from 'firebase';
  import NavBar from '../components/NavBar';
  import MyPageTabs from '../components/MyPageTabs';
  

  export default {
    title: '出品記録',
    data: () => ({
      isLogin: false,
      user: {},
      userDetail: {},
      username: '',
      university: '',
      photoURL: '',
      profile_image: '',
      dialog: false,
      props_test: "test",
      newBook: '',
      user_id: '',
      myBooks: {},
      dialog: false,
      google_image: '',
      original_image: '',
      title: '',
      state: '',
      price: '',
      note: '',
      created_at: '',
      id: '',
      is_public: false,
      finishedDialog: false,
      is_finished: false,
    }),
    components: {
      NavBar,
      MyPageTabs,
    },
    methods:{
      getMyBooks(){
        this.$axios.get('https://b-text-api.herokuapp.com/mybooks', {params: {user_id: this.user_id}})
          .then(res=>{
            this.myBooks=res.data
          });
      },
      originalImagePath(original_image){
        return "https://b-text-api.herokuapp.com/book_images/"+original_image
      },
      bookDetail(id, google_image, original_image, title, state, price, note, created_at){
        this.dialog=true;
        this.id=id;
        this.google_image=google_image;
        this.original_image=original_image;
        this.title=title;
        this.state=state;
        this.price=price;
        this.note=note;
        this.created_at=created_at;
      },
      finishedBookDetail(id, google_image, original_image, title, state, price, note, created_at){
        this.finishedDialog=true;
        this.id=id;
        this.google_image=google_image;
        this.original_image=original_image;
        this.title=title;
        this.state=state;
        this.price=price;
        this.note=note;
        this.created_at=created_at;
      },
      stopSelling(id){
        this.dialog=false;
        this.$axios.put('https://b-text-api.herokuapp.com/stop_selling?id='+id);
      },
      isPublic(){
        this.is_public=true;
      },
      isFinished(){
        this.is_finished=true;
      },
      restartSelling(id){
        this.finishedDialog=false;
        this.$axios.put('https://b-text-api.herokuapp.com/restart_selling?id='+id);
      },
      toBookDetail(id){
        this.$router.push({name: 'bookdetail', params: {id: id}});
      },
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.username=this.userDetail.username;
      this.university=this.userDetail.university;
      this.user_id=this.userDetail.id
      this.getMyBooks();
    },
    updated(){
//      this.getMyBooks();
    }
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
