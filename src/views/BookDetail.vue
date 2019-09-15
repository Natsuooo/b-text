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
            <span v-if="isLogin">
              <div v-if="isLiked(bookDetail.id)" @click="registerLike(bookDetail.id, bookDetail.liked++);">
                <v-icon style="margin-left: 3px; margin-right: 3px; cursor:pointer;">mdi-heart-outline</v-icon>
                <span class="body-1">{{bookDetail.liked}}</span>
              </div>
              <div v-else @click="deleteLike(bookDetail.id, bookDetail.liked--);">
                <v-icon color="pink" style="margin-left: 3px; margin-right: 3px; cursor:pointer;">mdi-heart</v-icon>
                <span class="body-1">{{bookDetail.liked}}</span>
              </div>
            </span>
            <span v-else>
              <div>
                <v-icon color="pink" style="margin-left: 3px; margin-right: 3px; cursor:pointer;">mdi-heart</v-icon>
                <span class="body-1">{{bookDetail.liked}}</span>
              </div>
            </span>
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
              <v-layout class="mt-10 mx-5" v-if="bookDetail.is_public" row>
                  <v-btn
                   color="green accent-4"
                   dark
                   block
                   large
                   @click="dialog=true; openUpdateDialog();">
                    商品を編集する
                  </v-btn>
                  
                  <v-layout justify-center>
                    <v-subheader>または</v-subheader>
                  </v-layout>
                  
                  <v-btn
                   block
                   large
                   @click="stopSelling(bookDetail.id)">
                    受付を終了する
                  </v-btn>
                  <v-btn
                   block
                   large
                   text
                   class="mt-5"
                   @click="deleteMyBook()"
                   >
                    商品を削除する
                  </v-btn>
              </v-layout>
              <v-layout v-else class="mt-10">
                <v-flex xs12>
                  <v-btn
                   color="green accent-4"
                   dark
                   block
                   large
                   @click="dialog=true">
                    商品を編集する
                  </v-btn>
                  <v-btn
                   color="green accent-4"
                   block
                   dark
                   large
                   class="mt-5"
                   @click="restartSelling(bookDetail.id)">
                    再出品する
                  </v-btn>
                  
                  <v-layout justify-center class="my-3">
                    <v-subheader>または</v-subheader>
                  </v-layout>
                  
                  <v-btn
                   block
                   large
                   text
                   @click="deleteMyBook()"
                   >
                    商品を削除する
                  </v-btn>
                </v-flex>
              </v-layout> 
            </div>
          </div>
            <br><br><br>
        </v-card>
        <v-dialog
          v-model="dialog"
          max-width="290"
        >
          <v-card class="pa-3 ">
            <v-card-title class="headline">商品を編集する</v-card-title>
            <v-divider></v-divider>

            <v-form v-model="valid" class="mt-5">
      
              <v-alert type="error" v-if="imageValidation">
                画像をアップロードして下さい。
              </v-alert>

              <p class="ml-2 body-2">本の画像</p>
              <v-img
                width="150"
                :src="image"
                style="margin-left: auto; margin-right: auto; opacity: 0.8;"
                class="mb-5"
                v-if="image"
                @click="$refs.file.click();"
              >
                <v-container fluid fill-height>
                  <v-layout justify-center>
                    <v-icon x-large style="z-index: 5;">mdi-camera</v-icon>
                  </v-layout>
                </v-container>
              </v-img>

              <v-img
                width="150"
                :src="uploadedImage"
                style="margin-left: auto; margin-right: auto; opacity: 0.8;"
                class="mb-5"
                v-else-if="uploadedImage"
                @click="$refs.file.click();"
              >
                <v-container fluid fill-height>
                  <v-layout justify-center>
                    <v-icon x-large style="z-index: 5;">mdi-camera</v-icon>
                  </v-layout>
                </v-container>
              </v-img>

              <v-sheet
                v-else
                color="grey lighten-3"
                width="150"
                height="200"   
                class="mr-auto ml-auto mb-5"     @click="$refs.file.click();"

              >
                <v-container fluid fill-height>
                  <v-layout justify-center>
                    <v-icon x-large style="z-index: 5;">mdi-camera</v-icon>
                  </v-layout>
                </v-container>
              </v-sheet>

              <input 
                type="file" 
                @change="onFileChange" accept="image/*"
                ref="file"
                required
                style="display: none;"
                />

              <v-text-field
                color="green accent-4"
                outlined
                v-model="title"
                label="タイトル"
                required
                :rules="titleRules"
              ></v-text-field>

              <v-select
                :items="stateItems"
                label="本の状態"
                outlined
                append-outer-icon="mdi-help-circle-outline" 
                @click:append-outer.stop="stateDialog=true"
                color="green accent-4"
                v-model="state"
                required
                :rules="stateRules"
              ></v-select>

              <v-dialog
                v-model="stateDialog"
              >
                <v-card>
                  <v-card-title class="headline">本の状態について</v-card-title>

                  <v-divider></v-divider>

                  <v-card-text>
                    <p>「本の状態」は、以下を目安に設定して下さい。</p>
                    <p><b>・新品、未使用：</b>購入してからあまり時間が経っておらず、一度も使用していない</p>
                    <p><b>・新品同様：</b>数回しか使用しておらず、書き込みや汚れがない</p>
                    <p><b>・目立った書き込みや汚れなし：</b>よく見ないとわからない程度の書き込みや汚れがある</p>
                    <p><b>・やや書き込みや汚れあり：</b>よく見ないとわからない程度の書き込みや汚れがある</p>
                    <p><b>・書き込みや汚れあり：</b>よく見ないとわからない程度の書き込みや汚れがある</p>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green accent-4"
                      text
                      @click="stateDialog = false"
                    >
                      閉じる
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-text-field
                label="価格"
                v-model="price"
                suffix="円"
                outlined     
                color="green accent-4"  
                required
                :rules="priceRules"   
                type="number"

              ></v-text-field>

              <v-textarea
                outlined
                v-model="note"
                label="備考"
                auto-grow
                color="green accent-4"
                placeholder="著者名や出版日、本の汚れ具合など、特筆すべきことがあれば記入しましょう。"
              ></v-textarea>

              <v-btn 
               @click="clear"
               >
                クリア
              </v-btn>

              <v-btn 
                @click="updateMyBook"
                color="green accent-4"
                block
                large
                class="mt-10 white--text"
                :disabled="!valid"
               >
                変更を保存する
              </v-btn>
              
              <p 
               class="text-center grey--text text--darken-1 mt-5"
               @click="dialog=false">
               閉じる
              </p>
              <br>
            </v-form>
          </v-card>
        </v-dialog>
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
      image: '', 
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
      stateItems: [
        "新品、未使用",
        "新品同様",
        "目立った書き込みや汚れなし",
        "やや書き込みや汚れあり",
        "書き込みや汚れあり",
      ],
      stateDialog: false,
      valid: true,
      titleRules: [
        v => !!v || 'タイトルを記入して下さい。'
      ],
      stateRules: [
        v => !!v || '本の状態を選択して下さい。'
      ],
      priceRules: [
        v => !!v || '価格を記入して下さい。',
        v => !/[^0-9]+$/.test(v) || '半角数字で記入して下さい。'
      ],
      uploadedImage: '',
      imageValidation: false,
      googleImage: '',
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
        
        
        /* SendGridでメール通知 */
        var formData=new FormData()
        formData.append('book_id', this.bookDetail.id);
        formData.append('title', this.bookDetail.title);
        formData.append('user_id', this.userDetail.id);
        formData.append('from_username', this.userDetail.username);
        formData.append('to_username', this.otherUsersDetail.username);
        formData.append('address', this.otherUsersDetail.email);
        this.$axios.post("https://b-text-api.herokuapp.com/mail/request", formData);
        
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
      deleteMyBook(){
        var formData=new FormData();
        formData.append("book_id", this.id);
        var config={
          headers:{
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/books/delete', formData, config);
        this.$router.push({name: 'mybooks', params: {deleteBook: this.bookDetail.title}})
      },
      async updateMyBook(){
        var image="";
        if(this.image){
          image=this.image;
          this.upload(image);
        }else{
          var formData=new FormData()
          formData.append('file', this.$refs.file.files[0]);
          formData.append('upload_preset', "cq9pfuae");
          formData.append('tags', 'gs-vue, gs-vue-uploaded');
          await this.$axios.post("https://api.cloudinary.com/v1_1/dq8sijlfb/upload", formData).then(res=>{
            image=res.data.secure_url
          });
          await this.upload(image);
        }
        
      },
      upload(image){
        var formData=new FormData();
        formData.append("id", this.bookDetail.id);
        formData.append("image", image);
        formData.append("title", this.title);
        formData.append("state", this.state);
        formData.append("price", this.price);
        formData.append("note", this.note);
        var config={
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/books/update', formData, config);
         this.$router.push({name: 'mybooks', params: {updateBook: this.title}});
      },
      clear(){
        this.note="";
        this.googleImage="";
        this.price="";
        this.state="";
        this.title="";
        this.uploadedImage="";
        this.file="";
      },
      onFileChange(e){
        var files=e.target.files || e.dataTransfer.files;
        this.createImage(files[0]);
        this.image="";
      },
      createImage(file){
        let reader=new FileReader();
        reader.onload=(e)=>{
          this.uploadedImage=e.target.result;
        };
        reader.readAsDataURL(file);
      },
      openUpdateDialog(){
        this.image=this.bookDetail.image;
        this.title=this.bookDetail.title;
        this.state=this.bookDetail.state;
        this.price=this.bookDetail.price;
        this.note=this.bookDetail.note;
      }
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


