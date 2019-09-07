<template>
  <v-content>
    <v-layout justify-center>
      <v-toolbar style="position: fixed; top: 0; left: 0; z-index: 10; width: 100%;">
        <v-btn icon @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title @click="toUserDetail">{{otherUsersDetail.username}}</v-toolbar-title>
      </v-toolbar>
      <v-flex xs12 sm6 style="margin-bottom: 60px; margin-top: 40px;">
      
        <div class="line-bc">
          <div v-for="message in messages">
            <div v-if="isFrom(message.from_user_id)" style="margin-top: 10px;">
              <div class="mycomment">
                <p style="word-wrap: break-word; white-space: pre-wrap;">{{message.content}}</p>
              </div>
              <p 
                v-if="isToday(message.created_at)"
                class="caption">
                {{message.created_at.slice(11,16)}}
              </p>
              <p 
                v-else
                class="caption"
                style="margin-top: -22px; margin-right: 15px;">{{message.created_at.slice(5,10)}} {{message.created_at.slice(11,16)}}</p>
              <p 
                v-if="message.is_read"
                class="caption" 
                style="margin-top: -18px; margin-right: 15px;">
                既読
              </p>
            </div>

            <div v-else style="margin-top: -10px;">
              <div class="balloon">
                <div class="faceicon">
                  <v-avatar
                    class="mr-1"
                    style="margin-left:  -10px; cursor: pointer;"
                    size="36"
                    @click="toUserDetail"
                    >
                    <v-img 
                     v-if="otherUsersDetail.profile_image!='default'"
                     :src="otherUsersDetail.profile_image"></v-img>
                     <img v-else :src="require('../assets/images/account.svg')"
                     style="opacity: 0.7;">
                  </v-avatar>
                </div>
                <div class="chatting">
                  <div class="says">
                    <span style="white-space:pre-wrap; word-wrap:break-word;"> {{message.content}}</span>
                  </div>
                  <p 
                    v-if="isToday(message.created_at)"
                    class="caption">
                    {{message.created_at.slice(11,16)}}
                  </p>
                  <p 
                    v-else
                    class="caption"
                    style="margin-top: 5px; margin-left: 55px;">{{message.created_at.slice(5,10)}} {{message.created_at.slice(11,16)}}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
        
        <span ref="target"></span>
        
        <v-toolbar style="position: fixed; bottom: 0; left: 0; z-index: 10; width: 100%;">
          <v-textarea
           v-model="message"
           append-outer-icon="mdi-send"
           rows="1"
           color="green accent-4"
           style="margin-bottom: -20px; margin-left: -10px; margin-right: -5px;"
           @click:append-outer="send"
           autofocus
           class="body-2"
           ></v-textarea>
        </v-toolbar>
      
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';
  import NavBar from '../components/NavBar';

  export default {
    title: 'メッセージ',
    data: () => ({
      isLogin: false,
      messages: {},
      time: '',
      myBooks: {},
      message: '',
      otherUsersDetail: {},
      uploadedImage: '',
    }),
    components: {
      LoginBar,
    },
    methods:{
      getMessages(){
        this.$axios.get('https://b-text-api.herokuapp.com/messages', {params: {user_id: this.userDetail.id, book_id: this.$route.params.book_id}})
          .then(res=>{
            this.messages=res.data;
          });
      },
      isFrom(from_user_id){
        if(from_user_id==this.userDetail.id){
          return true;
        }else{
          return false;
        }
      },
      getTime(){
        var dateObj=new Date();
        var month=dateObj.getMonth()+1;
        if(month==1||2||3||4||5||6||7||8||9){
          month="0"+month.toString();
        }
        var date=dateObj.getDate().toString();
        this.time=month+"-"+date;
      },
      isToday(created_at){
        if(created_at==this.time){
          return true;
        }else{
          return false;
        }
      },
      getMyBooks(user_id){
        this.$axios.get('https://b-text-api.herokuapp.com/messages/mybooks', {params: {user_id: user_id}})
          .then(res=>{
            this.myBooks=res.data
          });
      },
      originalImagePath(original_image){
        return "https://b-text-api.herokuapp.com/book_images/"+original_image
      },
      toMessagesUsers(book_id){
        this.$router.push('/messages/'+book_id);
      },
      back(){
        this.$router.go(-1);
      },
      send(){
        if(this.message!=""){
          
          var dt=new Date();
          console.log(dt)
          console.log(dt.getMonth())
          console.log(dt.getDate())
          console.log(dt.getHours())
          var created_at=dt.toLocaleString();
          console.log(created_at)
          var month=created_at.slice(0,1);
//          if(date!="1"){
//            month="0"+month;
//            created_at="0"+created_at;
//          }
          var year=dt.getFullYear().toString();
          var month=dt.getMonth();
          var month=String(month+1);
          var date=dt.getDate().toString();
          var hours=dt.getHours().toString();
          var minutes=dt.getMinutes().toString();
//          var date=created_at.slice(3,5);
//          var year=created_at.slice(6,10);
//          var hour=dt.getHours();
//          var minute=created_at.slice(14,16);
//          if(created_at.slice(20, 22)=="PM"){
//            hour=parseInt(hour)+12;
//          }
          if(month.length==1){
            month="0"+month;
          }
          if(date.length==1){
            date="0"+date;
          }
          if(hours.length==1){
            hours="0"+hours;
          }
          if(minutes.length==1){
            minutes="0"+minutes;
          }
          console.log(month)
          var created_at_js=year+"-"+month+"-"+date+" "+hours+":"+minutes;
          
          this.messages.push({book_id: this.$route.params.book_id, from_user_id: this.userDetail.id, to_user_id: this.$route.params.user_id, content: this.message, created_at: created_at_js});
          
          var formData=new FormData();
          formData.append("book_id", this.$route.params.book_id);
          formData.append("from_user_id", this.userDetail.id);
          formData.append("to_user_id", this.$route.params.user_id);
          formData.append("content", this.message);
          formData.append("created_at", created_at);
          var config={
            headers: {
              'content-type': 'multipart/form-data'
            }
          };
          this.$axios.post('https://b-text-api.herokuapp.com/messages/send', formData, config);
          this.message='';
          this.$refs.target.scrollIntoView(false);
          }
        this.$refs.target.scrollIntoView(false);
      },
      readMessages(){
        var formData=new FormData();
        formData.append("book_id", this.$route.params.book_id);
        formData.append("from_user_id", this.$route.params.user_id);
        formData.append("to_user_id", this.userDetail.id);
        var config={
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/messages/read', formData, config);
      },
      getUser(){
        this.$axios.get('https://b-text-api.herokuapp.com/get_user', {params: {id: this.$route.params.user_id}})
          .then(res=>{
            this.otherUsersDetail=res.data;
            this.uploadedImage="https://b-text-api.herokuapp.com/users/"+ this.otherUsersDetail.profile_image;
          });
      },
      toUserDetail(){
        this.$router.push('/users/'+this.$route.params.user_id);
      },
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.username=this.userDetail.username;
      this.university=this.userDetail.university;
      this.getMessages();
      this.getTime();
      this.getMyBooks(this.userDetail.id);
      this.readMessages();
      this.getUser();
    },
    mounted(){
      this.$refs.target.scrollIntoView(true);
      console.log(this.$refs.target);
    }
  };
</script>

<style>
  /*以下、①背景色など*/
  .line-bc {
    padding: 20px 10px;
    max-width: 450px;
    margin: 15px auto;
    text-align: right;
    font-size: 14px;
  }

  /*以下、②左側のコメント*/
  .balloon {
    width: 100%;
    margin: 10px 0;
    overflow: hidden;
  }

  .balloon .faceicon {
    float: left;
    margin-right: -50px;
    width: 40px;
  }

  .balloon .faceicon img{
    width: 100%;
    height: auto;
    border-radius: 50%;
  }
  .balloon .chatting {
    width: 100%;
    text-align: left;
  }
  .says {
    display: inline-block;
    position: relative; 
    margin: 0 0 0 50px;
    padding: 10px;
    max-width: 250px;
    border-radius: 12px;
    background: #edf1ee;
  }

  .says:after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 3px; 
    left: -19px;
    border: 8px solid transparent;
    border-right: 18px solid #edf1ee;
    -webkit-transform: rotate(35deg);
    transform: rotate(35deg);
  }
  .says p {
    margin: 0;
    padding: 0;
  }

  /*以下、③右側の緑コメント*/
  .mycomment {
    margin: 10px 0;
    align-content: right;
  }
  .mycomment p {
    display: inline-flex;
    position: relative; 
    margin: 0 10px 0 0;
    padding: 10px;
    max-width: 250px;
    border-radius: 12px;
    background: #69F0AE;
    font-size: 15px;
    text-align: left;
  }
  
  .mycomment p::first-line{
    text-align: right;
  }

  .mycomment p:after {
    content: "";
    position: absolute;
    top: 3px; 
    right: -19px;
    border: 8px solid transparent;
    border-left: 18px solid #69F0AE;
    -webkit-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }
  
</style>
