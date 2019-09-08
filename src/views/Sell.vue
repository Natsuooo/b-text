<template>
  <v-content style="margin-top: -15px;">
    <v-layout justify-center>
      <v-flex xs12 sm8 style="margin-bottom: 100px;" class="ma-3">
        
        <v-alert
          outlined
          type="success"
          text
          icon="mdi-information"
          class="pa-3 mt-5 mb-6 body-2"
        >
          検索機能を使って、情報を入力してみましょう。
        </v-alert>
        
        <v-text-field
          color="green accent-4"
          filled          
          v-model="keywords"
          label="タイトル・著者名"
          append-outer-icon="mdi-magnify"
          @click:append-outer="search"
          class="mb-1"
          autofocus
        ></v-text-field>
        
        <v-divider class="mb-10"></v-divider>
        
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        
        <v-card>
          <v-toolbar 
           dark 
           color="green accent-4"
           style="position: fixed; top:0; left:0; width: 100%; z-index: 10;">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <span class="title">出品したい本を選択する</span>
          </v-toolbar>
          <br>
          <br>
          <div v-if="items">
          <v-card
            raised
            class="ma-5"
            v-for="item in items"
          >
            <br>
            
            <v-img
              v-if="item.volumeInfo.imageLinks"
              width="150"
              :src="item.volumeInfo.imageLinks.thumbnail"
              style="margin-left: auto; margin-right: auto;"
            >
            </v-img>
            <v-card-title class="align-end fill-height">{{item.volumeInfo.title}}</v-card-title>
            <v-card-text>
              <span v-for="authorSearch in item.volumeInfo.authors">{{authorSearch}}</span>
              <span> | </span>
              <span>{{item.volumeInfo.publishedDate}}</span>
            </v-card-text>

            <v-card-actions>
              <v-btn 
                block
                large
                color="green accent-4"
                class="mr-4 white--text" 
                @click="select(item.volumeInfo.title, item.volumeInfo.authors, item.volumeInfo.publishedDate, item.volumeInfo.imageLinks)"
              >
                この本を出品する
              </v-btn>
            </v-card-actions>
          </v-card>
          </div>
          
          <v-subheader v-if="message" style="margin-top: 70px;">該当する本が見つかりませんでした。他のキーワードで検索するか、ご自身で情報を入力して下さい。</v-subheader>

        </v-card>
      </v-dialog>
      
      <v-form v-model="valid">
      
        <v-alert type="error" v-if="imageValidation">
          画像をアップロードして下さい。
        </v-alert>
      
        <p class="ml-2 body-2">本の画像</p>
        <v-img
          width="150"
          :src="googleImage"
          style="margin-left: auto; margin-right: auto; opacity: 0.8;"
          class="mb-5"
          v-if="googleImage"
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
          @click="sell"
          color="green accent-4"
          block
          large
          class="mt-10 white--text"
          :disabled="!valid"
         >
          出品する
        </v-btn>
      
      </v-form>
       
      <br><br><br><br>
        
      </v-flex>
      <NavBar tab="books" tabMessages="sell"/>
    </v-layout>
  </v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';
  import NavBar from '../components/NavBar';

  export default {
    title: '出品',
    data: () => ({
      isLogin: false,
      keywords: '',
      items: '',
      title: '',
      authors: [],
      publishedDate: '',
      googleImage: '',
      dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      author: '',
      file: '',
      stateItems: [
        "新品、未使用",
        "新品同様",
        "目立った書き込みや汚れなし",
        "やや書き込みや汚れあり",
        "書き込みや汚れあり",
      ],
      stateDialog: false,
      price: '',
      note: '',
      state:'',
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
      university: '',
      message: false,
    }),
    components: {
      LoginBar,
      NavBar,
    },
    methods:{
      search(){
        this.dialog=true;
        var baseURL="https://www.googleapis.com/books/v1/volumes";
        var params={
          q: this.keywords,
          maxResults: 10,
          Country: "JP"
        }
        this.$axios.get(baseURL, {params: params}).then(response => {
          this.items = response.data.items;
          if(!this.items){
            this.message=true;
          }
        });
      },
      select(title, authors, publishedDate, imageLinks){
        if(title!=null){
          this.title=title;
        }else{
          this.title="";
        }
        
        
        if(publishedDate!=null){
          this.publishedDate=publishedDate;
        }else{
          this.publiedDate="";
        }
        
        if(imageLinks!=null){
          this.googleImage=imageLinks.thumbnail;
        }else{
          this.googleImage="";
        }
        
        this.dialog=false;
        this.authors=authors;
        if(authors!=null){
          if(authors[2]!=null){
          this.author=authors[0]+", "+authors[1]+", 他"
          }else if(authors[1]!=null){
            this.author=authors[0]+", "+authors[1];
          }else if(authors[0]!=null){
            this.author=authors[0];
          }else{
            this.author="";
          }
        }else{
          this.author="";
        }
        
        if(this.author==="" && this.publishedDate===""){
          this.note="";
        }else if(this.publishedDate===""){
          this.note="著者名："+this.author
        }else if(this.author===""){
          this.note="出版日："+this.publishedDate;
        }else{
          this.note="著者名："+this.author+" / 出版日："+this.publishedDate;
        }
        
        this.file="";
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
      async sell(){
        var image="";
        if(this.googleImage){
          image=this.googleImage;
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
        
//        if(this.googleImage||this.file){
//          var formData=new FormData();
//          formData.append("user_id", this.userDetail.id);
//          formData.append("university", this.userDetail.university);
//          if(this.googleImage){
//            this.file=""
//          }else if(this.file){
//            this.googleImage=""
//          }
//          formData.append("image", this.googleImage);
//          formData.append("original_image", this.file);
//          formData.append("title", this.title);
//          formData.append("state", this.state);
//          formData.append("price", this.price);
//          formData.append("note", this.note);
//          var config={
//            headers: {
//              'content-type': 'multipart/form-data'
//            }
//          };
//          this.$axios.post('https://b-text-api.herokuapp.com/sell', formData, config);
//           this.$router.push({name: 'mybooks', params: {newBook: this.title}});
//        }else{
//          this.imageValidation=true;
//          scrollTo(0, 200);
//        }
        
      },
      upload(image){
        var formData=new FormData();
        formData.append("user_id", this.userDetail.id);
        formData.append("university", this.userDetail.university);
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
        this.$axios.post('https://b-text-api.herokuapp.com/sell', formData, config);
         this.$router.push({name: 'mybooks', params: {newBook: this.title}});
      },
      onFileChange(e){
        var files=e.target.files || e.dataTransfer.files;
        this.createImage(files[0]);
        this.googleImage="";
      },
      createImage(file){
        let reader=new FileReader();
        reader.onload=(e)=>{
          this.uploadedImage=e.target.result;
        };
        reader.readAsDataURL(file);
      },
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
    },
  };
</script>


