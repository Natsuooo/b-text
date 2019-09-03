<template>
<v-content>
  <v-layout justify-center>
    <MyPageTabs/>
    <v-flex xs12 sm6 style="margin-bottom: 100px; margin-top: 70px;">
      
      <v-container v-if="likedBooks">
        <v-card 
         v-for="(likedBook, index) in likedBooks" :key='likedBook.id'
         class="mb-3"
         >
         {{isPublic()}}
          <v-layout>
            <v-flex xs4 class="pa-2" @click="toBookDetail(likedBooks.id);">
              <v-img v-if="likedBook.google_image" :src="likedBook.google_image"></v-img>
              <v-img v-if="likedBook.original_image" :src="originalImagePath(likedBook.original_image)"></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-title class="subtitle-1 pt-2" @click="toBookDetail(likedBook.id);">{{likedBook.title}}</v-card-title>
              <v-card-text @click="toBookDetail(likedBook.id);">
                <span class="text--primary body-1">{{likedBook.price}}円</span><br>
                <span class="caption"> 出品日: {{likedBook.updated_at.slice(0, 10)}}</span>
              </v-card-text>
              <v-card-actions style="margin-top: -20px; margin-left: 5px;">
                <v-btn 
                  class="body-2" 
                  dark
                  small
                  color="green accent-4"
                  @click="deleteLike(likedBook.id, index);">
                  削除する
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
        
      </v-container>
      
      <v-layout v-else justify-center style="margin-top: 30px; margin-bottom: 20px;">
        <v-subheader>お気に入りに登録した本はありません。</v-subheader>
      </v-layout>
      
      
    </v-flex>
    <NavBar tab="favorites" tabMessages="sell"/>
  </v-layout>
  </v-content>
</template>

<script>
  import firebase from 'firebase';
  import NavBar from '../components/NavBar';
  import MyPageTabs from '../components/MyPageTabs';

  export default {
    title: 'お気に入り',
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
      likedBooks: {},
      dialog: false,
      google_image: '',
      original_image: '',
      title: '',
      state: '',
      price: '',
      note: '',
      updated_at: '',
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
      getLikedBooks(){
        this.$axios.get('https://b-text-api.herokuapp.com/likes/books', {params: {user_id: this.user_id}})
          .then(res=>{
            this.likedBooks=res.data;
          });
      },
      originalImagePath(original_image){
        return "https://b-text-api.herokuapp.com/book_images/"+original_image
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
      deleteLike(book_id, index){
        this.likedBooks.splice(index, 1);
        var formData=new FormData();
        formData.append("user_id", this.userDetail.id);
        formData.append("book_id", book_id);
        var config={
          headers:{
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios
          .post('https://b-text-api.herokuapp.com/likes/delete', formData, config);
      }
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.username=this.userDetail.username;
      this.university=this.userDetail.university;
      this.user_id=this.userDetail.id
      this.getLikedBooks();
    },
    updated(){
    }
  };
</script>


