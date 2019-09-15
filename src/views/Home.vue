<template>
  <v-content>
    <v-layout justify-center>
     
<!--      <LoginBar v-if="!isLogin" style="z-index: 20;"/>-->
      
      
      <v-toolbar style="position: fixed; top: 0; left: 0; z-index: 10; width: 100%;" v-if="isLogin">
        <img src="../assets/images/favicon_520_transparent.png" alt="B-text" width="30" class="mr-2">
        <v-text-field
          hide-details
          append-icon="mdi-magnify"
          single-line
          label="本のタイトルから検索"
          class="ml-2"
          v-model="keyword"
        ></v-text-field>
      </v-toolbar>
      
      <v-toolbar style="position: fixed; top: 0; left: 0; z-index: 10; width: 100%;" v-else>
        <img src="../assets/images/favicon_520_transparent.png" alt="B-text" width="30" class="mr-2" style="margin-left: -5px;">
        <v-toolbar-title class="title">
          <span style="font-family: 'Comfortaa', cursive!important;">B-text</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          depressed 
          small
          color="green accent-4" 
          class="mr-2 white--text px-2 py-4 caption"
          to="/signup"
        >
          新規登録
        </v-btn>
        <v-btn
          depressed 
          outlined 
          small
          color="green accent-4" 
          class="px-2 py-4 caption"
          to="/login"
        >
          ログイン
        </v-btn>
      </v-toolbar>
      
      <v-flex xs12 sm10 class="mt-12 mb-12">
        <v-container fluid>
          <v-alert type="success" v-if="!isLogin" icon="mdi-information" class="mt-3">
            今すぐログインして、テキストフリマに参加してみましょう。
          </v-alert>
          <v-carousel
           v-if="!isLogin"
           class="mt-2"
           cycle
           height="auto"
           hide-delimiter-background
           :show-arrows="false">
            <v-carousel-item>
              <img src="../assets/images/top1.png" width="100%"
              height="auto">
            </v-carousel-item>
            <v-carousel-item>
              <img src="../assets/images/top2.png" width="100%"
              height="auto">
            </v-carousel-item>
            <v-carousel-item>
              <img src="../assets/images/top3.png" width="100%"
              height="auto">
            </v-carousel-item>
            <v-carousel-item>
              <img src="../assets/images/top4.png" width="100%"
              height="auto">
            </v-carousel-item>
          </v-carousel>
          
          <v-row>
            <v-col 
             v-for="book in search"  
             cols="4" 
             class="pa-1 d-flex d-sm-none" 
             style="position: relative; cursor:pointer;">
              <div style="position: absolute; bottom: 30px; left: 0; width: 90%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; z-index: 5;" class="white mb-1">
                  <span class="subtitle-1" style="margin-left: 5px;">{{book.price}}円</span>
                </div>
                <div style="position: absolute; bottom: 0px; left: 0; width: 60%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; padding: 1px; z-index: 5;" class="white mb-1">
                <span v-if="isLogin">
                   <div v-if="isLiked(book.id)" @click="registerLike(book.id, book.liked++);">
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                    <div v-else @click="deleteLike(book.id, book.liked--);">
                      <v-icon small color="pink" style="margin-left: 3px; margin-right: 3px;">mdi-heart</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                  <span v-else>
                    <div>
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                </div>
              <v-img :src="book.image" style="position: relative; width: 100%;" @click="bookDetail(book.id)">
                <v-img :src="require('../assets/images/sold.png')" style="width: 70%; margin-top: -1px; margin-left: -1px;" v-show="!book.is_public"></v-img>
              </v-img>
            </v-col>
            
            <v-col 
             v-for="book in dummyBooks"  
             cols="4" 
             class="pa-1 d-flex d-sm-none" 
             style="position: relative; cursor:pointer;">
              <div style="position: absolute; bottom: 30px; left: 0; width: 90%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; z-index: 5;" class="white mb-1">
                  <span class="subtitle-1" style="margin-left: 5px;">{{book.price}}円</span>
                </div>
                <div style="position: absolute; bottom: 0px; left: 0; width: 60%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; padding: 1px; z-index: 5;" class="white mb-1">
                <span v-if="isLogin">
                   <div v-if="isLiked(book.id)" @click="registerLike(book.id, book.liked++);">
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                    <div v-else @click="deleteLike(book.id, book.liked--);">
                      <v-icon small color="pink" style="margin-left: 3px; margin-right: 3px;">mdi-heart</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                  <span v-else>
                    <div>
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                </div>
              <v-img :src="book.image" style="position: relative; width: 100%;" @click="bookDetail(book.id)">
                <v-img :src="require('../assets/images/sold.png')" style="width: 70%; margin-top: -1px; margin-left: -1px;" v-show="!book.is_public"></v-img>
              </v-img>
            </v-col>
            
            
            <v-col 
             v-for="book in search" 
             cols="3" 
             class="pa-1 d-none d-sm-flex d-md-none" 
             style="position: relative; cursor:pointer;">
              <div style="position: absolute; bottom: 30px; left: 0; width: 90%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; z-index: 5;" class="white mb-1">
                  <span class="subtitle-1" style="margin-left: 5px;">{{book.price}}円</span>
                </div>
                <div style="position: absolute; bottom: 0px; left: 0; width: 60%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; padding: 1px; z-index: 5;" class="white mb-1">
                <span v-if="isLogin">
                   <div v-if="isLiked(book.id)" @click="registerLike(book.id, book.liked++);">
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                    <div v-else @click="deleteLike(book.id, book.liked--);">
                      <v-icon small color="pink" style="margin-left: 3px; margin-right: 3px;">mdi-heart</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                  <span v-else>
                    <div>
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                </div>
              <v-img :src="book.image" style="position: relative; width: 100%;" @click="bookDetail(book.id)"></v-img>
            </v-col>
            
            
            <v-col 
             v-for="book in dummyBooks" 
             cols="3" 
             class="pa-1 d-none d-sm-flex d-md-none" 
             style="position: relative; cursor:pointer;">
              <div style="position: absolute; bottom: 30px; left: 0; width: 90%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; z-index: 5;" class="white mb-1">
                  <span class="subtitle-1" style="margin-left: 5px;">{{book.price}}円</span>
                </div>
                <div style="position: absolute; bottom: 0px; left: 0; width: 60%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; padding: 1px; z-index: 5;" class="white mb-1">
                <span v-if="isLogin">
                   <div v-if="isLiked(book.id)" @click="registerLike(book.id, book.liked++);">
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                    <div v-else @click="deleteLike(book.id, book.liked--);">
                      <v-icon small color="pink" style="margin-left: 3px; margin-right: 3px;">mdi-heart</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                  <span v-else>
                    <div>
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                </div>
              <v-img :src="book.image" style="position: relative; width: 100%;" @click="bookDetail(book.id)"></v-img>
            </v-col>
            
            <v-col 
             v-for="book in search" 
             cols="2" 
             class="pa-1 d-none d-md-flex" 
             style="position: relative; cursor:pointer;">
              <div style="position: absolute; bottom: 30px; left: 0; width: 90%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; z-index: 5;" class="white mb-1">
                  <span class="subtitle-1" style="margin-left: 5px;">{{book.price}}円</span>
                </div>
                <div style="position: absolute; bottom: 0px; left: 0; width: 60%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; padding: 1px; z-index: 5;" class="white mb-1">
                <span v-if="isLogin">
                   <div v-if="isLiked(book.id)" @click="registerLike(book.id, book.liked++);">
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                    <div v-else @click="deleteLike(book.id, book.liked--);">
                      <v-icon small color="pink" style="margin-left: 3px; margin-right: 3px;">mdi-heart</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                  <span v-else>
                    <div>
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                </div>
              <v-img :src="book.image" style="position: relative; width: 100%;" @click="bookDetail(book.id)"></v-img>
            </v-col>
            
            <v-col 
             v-for="book in dummyBooks" 
             cols="2" 
             class="pa-1 d-none d-md-flex" 
             style="position: relative; cursor:pointer;">
              <div style="position: absolute; bottom: 30px; left: 0; width: 90%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; z-index: 5;" class="white mb-1">
                  <span class="subtitle-1" style="margin-left: 5px;">{{book.price}}円</span>
                </div>
                <div style="position: absolute; bottom: 0px; left: 0; width: 60%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; padding: 1px; z-index: 5;" class="white mb-1">
                <span v-if="isLogin">
                   <div v-if="isLiked(book.id)" @click="registerLike(book.id, book.liked++);">
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                    <div v-else @click="deleteLike(book.id, book.liked--);">
                      <v-icon small color="pink" style="margin-left: 3px; margin-right: 3px;">mdi-heart</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                  <span v-else>
                    <div>
                      <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                      <span class="body-2">{{book.liked}}</span>
                    </div>
                  </span>
                </div>
              <v-img :src="book.image" style="position: relative; width: 100%;" @click="bookDetail(book.id)"></v-img>
            </v-col>
            
            
          </v-row>
          
        </v-container>
        <v-layout justify-center style="margin-top: 50px;">
          <v-progress-circular
            indeterminate
            color="green"
            v-show="!search"
            class="hide"
          ></v-progress-circular>
        </v-layout>
        <v-layout v-show="!search" justify-center style="margin-top: 50px; margin-bottom: 20px;" class="show">
          <v-subheader>お探しの本は見つかりませんでした。</v-subheader>
        </v-layout>
      </v-flex>
      <NavBar v-if="isLogin" tab="books" tabMessages="sell"/>
      
    </v-layout>
  </v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';
  import NavBar from '../components/NavBar';

  export default {
    title: 'ホーム',
    data: () => ({
      isLogin: false,
      university: '',
      user: {},
      userDetail: {},
      books: {},
      id: '',
      user_id: '',
      google_image: '', 
      original_image: '', 
      title: '', 
      state: '', 
      price: '', 
      note: '', 
      is_public: '', 
      updated_at: '', 
      dialog: false,
      otherUsersDetail: {},
      likedFlag: true,
      like: {},
      likes:[],
      array: [],
      keyword: '',
      isSearchedBooks: true,
      dummyBooks: {},
    }),
    components: {
      LoginBar,
      NavBar,
    },
    methods:{
      getBooks(){
        this.$axios.get('https://b-text-api.herokuapp.com/books', {params: {university: this.university}})
          .then(res=>{
            this.books=res.data
          });
      },
      getDummyBooks(){
        this.$axios.get('https://b-text-api.herokuapp.com/books', {params: {university: 'dummy'}})
          .then(res=>{
            this.dummyBooks=res.data;
            console.log(this.dummyBooks)
          });
      },
      bookDetail(id){
        this.$router.push({name: 'bookdetail', params: {id: id}});
      },
      toUserDetail(id){
      },
      registerLike(book_id, liked){
        if(this.isLogin){
          this.array.push(book_id);
          liked++;
          var formData=new FormData();
          formData.append("user_id", this.userDetail.id);
          formData.append("book_id", book_id);
          formData.append("liked", liked);
          var config={
            headers:{
              'content-type': 'multipart/form-data'
            }
          };
          this.$axios
            .post('https://b-text-api.herokuapp.com/likes/register', formData, config);
        }
      },
      deleteLike(book_id, liked){
        if(this.isLogin){
          for(var i=0; i<this.array.length; i++){
            if(this.array[i]==book_id){
              this.array.splice(i, 1);
            }
          }
          liked--;
          var formData=new FormData();
          formData.append("user_id", this.userDetail.id);
          formData.append("book_id", book_id);
          formData.append("liked", liked);
          var config={
            headers:{
              'content-type': 'multipart/form-data'
            }
          };
          this.$axios
            .post('https://b-text-api.herokuapp.com/likes/delete', formData, config);
        }
      },
      isLiked(book_id){
        if(this.array.indexOf(book_id)!=-1){
          return false;
        }else{
          return true;
        }
      },
      getLikes(){
        this.$axios.get('https://b-text-api.herokuapp.com/likes', {params: {user_id: this.userDetail.id}})
          .then(res=>{
            this.likes=res.data;
            this.getLikedBooks(this.likes);
          });
      },
      getLikedBooks(likes){
        var array=[];
        if(likes!=null){
          likes.forEach(function(like){
          array.push(like.book_id);
        });
        this.array=array;
        }
      },
      getAllBooks(){
        this.$axios.get('https://b-text-api.herokuapp.com/books/all')
          .then(res=>{
            this.books=res.data
          });
      },
    },
    computed: {
      search(){
        var books=[];
        for(var i in this.books){
          var book=this.books[i];
          if(book.title.indexOf(this.keyword)!==-1||book.note.indexOf(this.keyword)!==-1){
            books.push(book);
          }
        }
        if(books.length==0){
          return false;
        }else{
          return books;
        }
      },
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.university=this.userDetail.university
      
      if(this.isLogin){
        this.getBooks();
        this.getLikes();
        this.getDummyBooks();
      }else{
        this.getAllBooks();
      }
      
    },
  };
</script>

<style>
  .hide{
    -moz-animation: cssAnimation 0s ease-in 3s forwards;
    /* Firefox */
    -webkit-animation: cssAnimation 0s ease-in 3s forwards;
    /* Safari and Chrome */
    -o-animation: cssAnimation 0s ease-in 3s forwards;
    /* Opera */
    animation: cssAnimation 0s ease-in 3s forwards;
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
    -moz-animation: cssAnimationShow 0s ease-in 3s forwards;
    /* Firefox */
    -webkit-animation: cssAnimationShow 0s ease-in 3s forwards;
    /* Safari and Chrome */
    -o-animation: cssAnimationShow 0s ease-in 3s forwards;
    /* Opera */
    animation: cssAnimationShow 0s ease-in 3s forwards;
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
