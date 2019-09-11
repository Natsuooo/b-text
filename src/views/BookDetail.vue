<template>
  <v-content>
    <v-layout justify-center>
<!--      <LoginBar v-if="!isLogin"/>-->
      
      <v-flex xs12 sm8>
        <v-toolbar style="position: fixed; top: 0; left: 0; z-index: 10; width: 100%;">
          <v-btn icon @click="backHome">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>本の詳細</v-toolbar-title>
        </v-toolbar>
        
        
        
        <v-card style="padding-top: 70px;">
         　<v-alert type="success" v-if="requestMessage">
            購入リクエストを送信しました。メッセージ画面から確認することができます。
          </v-alert>
          <v-card-title class="justify-center mb-2">{{bookDetail.title}}</v-card-title>
          <v-img :src="bookDetail.image" style="width: 50%;" class="ml-auto mr-auto">
            <v-img :src="require('../assets/images/sold.png')" style="width: 70%; margin-top: -1px; margin-left: -1px;" v-show="!bookDetail.is_public"></v-img>
          </v-img>

          <v-card-title class="justify-center mb-2 title">{{bookDetail.price}}円</v-card-title>
          
          <v-layout justify-center class="mb-5">
            <div v-if="isLiked(bookDetail.id)" @click="registerLike(bookDetail.id, bookDetail.liked++);">
              <v-icon style="margin-left: 3px; margin-right: 3px; cursor:pointer;">mdi-heart-outline</v-icon>
              <span class="body-1">{{bookDetail.liked}}</span>
            </div>
            <div v-else @click="deleteLike(bookDetail.id, bookDetail.liked--);">
              <v-icon color="pink" style="margin-left: 3px; margin-right: 3px; cursor:pointer;">mdi-heart</v-icon>
              <span class="body-1">{{bookDetail.liked}}</span>
            </div>
          </v-layout>

          <div class="pr-3 pl-3">
            <v-divider></v-divider>
            <v-simple-table>
              <tbody>
                <tr>
                  <td width="90">出品者</td>
                  <td @click="toUserDetail(otherUsersDetail.id)">
                    <v-container fill-height style="cursor: pointer;">
                      <v-avatar
                        class="mr-3"
                        style="margin-left: -10px;">
                        <v-img 
                         v-if="otherUsersDetail.profile_image!='default'"
                         :src="otherUsersDetail.profile_image"></v-img>
                         <img v-else :src="require('../assets/images/account.svg')"
                         style="opacity: 0.7;">
                      </v-avatar>
                     {{otherUsersDetail.username}}
                   </v-container>
                  </td>
                </tr>
                <tr>
                  <td>大学名</td>
                  <td>{{bookDetail.university}}</td>
                </tr>
                <tr>
                  <td width="90">本の状態</td>
                  <td>{{bookDetail.state}}</td>
                </tr>
                <tr>
                  <td>出品日</td>
                  <td>{{created_at}}</td>
                </tr>
                <tr>
                  <td>備考</td>
                  <td class="pt-2 pb-2">{{bookDetail.note}}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-divider></v-divider>
            
            
            
            <v-layout justify-end class="mt-2 mr-2">
              <v-btn fab dark color="cyan accent-3" depressed small class="mr-2" @click="shareOnTwitter(bookDetail.title, bookDetail.id)">
                <v-icon dark small>mdi-twitter</v-icon>
              </v-btn>
            
              <v-btn fab dark color="indigo " depressed small @click="shareOnFacebook(bookDetail.title, bookDetail.id)">
                <v-icon dark small>mdi-facebook</v-icon>
              </v-btn>
            </v-layout>
            
            <div v-if="!isOwner">
              <v-btn
              color="green accent-4"
              block
              dark
              large
              @click="request"
              class="mt-8"
              v-show="bookDetail.is_public"
              v-if="isLogin"
            >
                購入リクエストを送る
              </v-btn>
            </div>
            
            <div v-else>
              <v-layout class="mt-10" v-if="bookDetail.is_public">
                <v-flex xs6 class="pr-2">
                  <v-btn
                   block
                   large>
                    内容を変更する
                  </v-btn>
                </v-flex>
                <v-flex xs6 class="pl-2">
                  <v-btn
                   color="green accent-4"
                   block
                   dark
                   large
                   @click="stopSelling(bookDetail.id)">
                    出品を終了する
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout v-else class="mt-10">
                <v-flex xs12>
                  <v-btn
                   color="green accent-4"
                   block
                   dark
                   large
                   @click="restartSelling(bookDetail.id)">
                    再出品する
                  </v-btn>
                </v-flex>
              </v-layout> 
            </div>
          </div>
            <br><br><br>
        </v-card>
        
      </v-flex>
<!--      <NavBar v-if="isLogin"/>-->
      
    </v-layout>
  </v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';
  import NavBar from '../components/NavBar';

  export default {
    title: '本の詳細',
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
      created_at: '', 
      otherUsersDetail: {},
      bookDetail: {},
      isOwner: false,
//      uploadedImage: '',
      likedFlag: true,
      like: {},
      likes:[],
      array: [],
      dialog: false,
      requestMessage: false,
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
            if(this.userDetail.id==this.bookDetail.user_id){
              this.isOwner=true;
            }
          });
      },
      originalImagePath(original_image){
        return "https://b-text-api.herokuapp.com/book_images/"+original_image
      },
      getUser(id){
        this.$axios.get('https://b-text-api.herokuapp.com/get_user', {params: {id: id}})
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
      request(){
        var dt=new Date();
        var created_at=dt.toLocaleString();
        var month=created_at.slice(0,1);
        if(date!="1"){
          month="0"+month;
          created_at="0"+created_at;
        }
        var date=created_at.slice(3,5);
        var year=created_at.slice(6,10);
        var hour=created_at.slice(12,14);
        var minute=created_at.slice(14,16);
        if(created_at.slice(20, 22)=="PM"){
          hour=parseInt(hour)+12;
        }
        var created_at_js=year+"-"+month+"-"+date+" "+hour+":"+minute;

        var formData=new FormData();
        formData.append("book_id", this.bookDetail.id);
        formData.append("from_user_id", this.userDetail.id);
        formData.append("to_user_id", this.bookDetail.user_id);
        formData.append("content", "「"+this.bookDetail.title+"」を購入したいです。");
        formData.append("created_at", created_at);
        var config={
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/messages/send', formData, config);
        this.requestMessage=true;
        scrollTo(0, 0);
      },
      backHome(){
        this.$router.go(-1);
      },
      shareOnTwitter(title, book_id){
        var win=window.open('https://twitter.com/share?url=https://b-text.lgraph.net/books/'+book_id+'&text='+'「'+title+'」', 'newwindow', 'width=400,height=300');
      },
      shareOnFacebook(title, book_id){
        var win=window.open('https://www.facebook.com/sharer/sharer.php?u='+'https://b-text.lgraph.net/books/'+book_id, 'newwindow', 'width=400,height=300');
      },
      stopSelling(book_id){
        var formData=new FormData();
        formData.append("book_id", book_id);
        var config={
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/stop_selling', formData, config);
        this.$router.push('/mypage/books');
      },
      restartSelling(book_id){
        var formData=new FormData();
        formData.append("book_id", book_id);
        var config={
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/restart_selling', formData, config);
        this.$router.push('/mypage/books');
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
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.id=this.$route.params.id;
      this.getBookDetail();
      
      if(this.isLogin){
        this.getLikes();
      }else{
        
      }
    },
  };
</script>


