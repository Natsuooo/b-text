<template>
  <v-content>
    <v-layout justify-center>
      <LoginBar v-if="!isLogin"/>
      <v-flex xs12 sm6>
        <v-container fluid>
          <v-row>
            <v-col 
             v-for="book in books" :key='book.id' 
             cols="4" 
             class="pa-0" 
             style="position: relative;">
              <div style="position: absolute; bottom: 30px; left: 0; width: 90%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; z-index: 5;" class="white mb-1">
                  <span class="subtitle-1" style="margin-left: 5px;">{{book.price}}円</span>
                </div>
                <div style="position: absolute; bottom: 0px; left: 0; width: 60%; opacity: 0.8; border-bottom-right-radius: 20px; border-top-right-radius: 20px; padding: 1px; z-index: 5;" class="white mb-1">
                 <div v-if="isLiked(book.id)" @click="registerLike(book.id, book.liked++);">
                    <v-icon small style="margin-left: 3px; margin-right: 3px;">mdi-heart-outline</v-icon>
                    <span class="body-2">{{book.liked}}</span>
                  </div>
                  <div v-else @click="deleteLike(book.id, book.liked--);">
                    <v-icon small color="pink" style="margin-left: 3px; margin-right: 3px;">mdi-heart</v-icon>
                    <span class="body-2">{{book.liked}}</span>
                  </div>
                  
                </div>
              <v-img v-if="book.google_image" :src="book.google_image" style="position: relative; width: 100%;" @click="bookDetail(book.id)"></v-img>
              <v-img v-if="book.original_image" :src="originalImagePath(book.original_image)" @click="bookDetail(book.id)"></v-img>
            </v-col>
          </v-row>
        </v-container>
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
    }),
    components: {
      LoginBar,
      NavBar,
    },
    methods:{
      getBooks(){
        this.$axios.get('http://localhost:8080/books', {params: {university: this.university}})
          .then(res=>{
            this.books=res.data
          });
      },
      originalImagePath(original_image){
        return "http://localhost:8080/book_images/"+original_image
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
            .post('http://localhost:8080/likes/register', formData, config);
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
            .post('http://localhost:8080/likes/delete', formData, config);
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
        this.$axios.get('http://localhost:8080/likes', {params: {user_id: this.userDetail.id}})
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
      }
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.university=this.userDetail.university
      this.getBooks();
      this.getLikes();
    },
  };
</script>


