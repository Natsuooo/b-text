<template>
  <v-content>
    <v-layout justify-center>
      <v-bottom-navigation
        grow
        style="position: fixed; top: 0; left: 0; z-index: 10;"
      >
       <v-tabs color="green accent-4" grow style="margin-left: -52px;">
          <v-tab to="/messages/sell">出品</v-tab>
          <v-tab to="/messages/buy">購入</v-tab>
        </v-tabs>
      </v-bottom-navigation>
      
      <v-flex xs12 sm6 style="margin-bottom: 100px; margin-top: 70px;">
      
        <v-container v-if="myBooks">
          <v-card 
           v-for="myBook in myBooks"
           class="mb-3"
           v-if="myBooksId.indexOf(myBook.id)==-1"
           @click="toMessages(myBook.id, myBook.user_id)"
           style="position: relative;">
            <v-btn class="mx-2"
             v-if="myBook.unread_messages.length" 
             fab
             dark 
             small 
             color="green accent-4"
             style="position: absolute; top: 5px; left: -5px; z-index: 3;">
              <v-icon dark small style="margin-left: -5px;">{{myBook.unread_messages.length}}</v-icon>
            </v-btn>
            <v-layout>
              <v-flex xs4 class="pa-2">
                <v-img v-if="myBook.image" :src="myBook.image"></v-img>
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
<!--
          <v-layout v-else justify-center style="margin-top: -10px; margin-bottom: 20px;">
          <v-subheader>メッセージはありません。</v-subheader>
        </v-layout>
-->
        </v-container>
        <v-layout v-else justify-center style="margin-top: -10px; margin-bottom: 20px;">
          <v-subheader>メッセージはありません。</v-subheader>
        </v-layout>
      
      </v-flex>
      <NavBar tabMessages="buy" tab="books"/>
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
      isSellMessages: true,
      myBooksId: [],
      tab: 'buy'
    }),
    components: {
      LoginBar,
      NavBar,
    },
    methods:{
      getMyBooks(user_id){
        this.$axios.get('https://b-text-api.herokuapp.com/messages/buy', {params: {from_user_id: user_id}})
          .then(res=>{
            this.myBooks=res.data
          });
      },
      getMyBooksId(){
        this.$axios.get('https://b-text-api.herokuapp.com/mybooks', {params: {user_id: this.userDetail.id}})
          .then(res=>{
            var myBooksId=res.data;
            if(myBooksId){
              for(var i=0; i<myBooksId.length; i++){
                this.myBooksId.push(myBooksId[i].id);
              }
            }
            
          });
      },
      originalImagePath(original_image){
        return "https://b-text-api.herokuapp.com/book_images/"+original_image
      },
      toMessages(book_id, user_id){
        this.$router.push('/messages/private/'+book_id+'/'+user_id);
      },
      toSellMessages(){
        this.$router.push('/messages');
      }
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.username=this.userDetail.username;
      this.university=this.userDetail.university;
      this.getMyBooks(this.userDetail.id);
      this.getMyBooksId();
    },
  };
</script>

