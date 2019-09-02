<template>
  <v-bottom-navigation
    style="position: fixed; bottom: 0; z-index: 10;"
    color="green accent-4"
    grow
  >
    <v-btn 
     value="home"
     to="/">
      <span>ホーム</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    
    <v-btn 
     value="sell"
     to="/sell">
      <span>出品</span>
      <v-icon>mdi-camera</v-icon>
    </v-btn>

    <v-btn 
     value="messages"
     :to="tabUrlMessages"
     style="position: relative;">
      <span>メッセージ</span>
      <v-icon>mdi-forum</v-icon>
      
      <div v-if="count!=0" style="position: absolute; left: -10px; top: -10px; background-color:#00BFA5; border-radius: 20px; width: 30px; height: 30px; padding-top: 5px; text-align: center" class="body-1 white--text">{{count}}</div>
    </v-btn>

    <v-btn 
     value="mypage"
     :to="tabUrl">
      <span>マイページ</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    tabUrl: "/mypage/books",
    tabUrlMessages: "/messages/sell",
    userDetail: {},
    count: 0,
  }),
  props: ['tab', 'tabMessages'],
  methods: {
    unreadMessages(){
      this.$axios.get('http://localhost:8080/messages/unread', {params: {to_user_id: this.userDetail.id}})
          .then(res=>{
            this.count=res.data.count;
          });
    }
  },
  created(){
    this.tabUrl="/mypage/"+this.tab;
    this.tabUrlMessages="/messages/"+this.tabMessages;
    this.userDetail=this.$store.getters.userDetail;
    this.unreadMessages();
  }
};
</script>

