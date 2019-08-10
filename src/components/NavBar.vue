<template>
  <v-bottom-navigation
    style="position: fixed; bottom: 0;"
    color="green accent-4"
    grow
  >
    <v-btn 
     value="home"
     to="/">
      <span>ホーム</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

<!--
    <v-btn 
     value="favorites"
     to="/favorites">
      <span>お気に入り</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
-->

<!--
    <v-btn 
     style="border-radius: 30px;"
     value="sell"
     color="green accent-4"
     to="/sell">
      <span class="white--text">出品</span>
      <v-icon color="white">mdi-camera</v-icon>
    </v-btn>
-->
    
    <v-btn 
     value="sell"
     to="/sell">
      <span>出品</span>
      <v-icon>mdi-camera</v-icon>
    </v-btn>

    <v-btn 
     value="messages"
     to="/messages">
      <span>メッセージ</span>
      <v-icon>mdi-forum</v-icon>
    </v-btn>

    <v-btn 
     value="mypage"
     to="/mypage">
      <span>マイページ</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
  }),
};
</script>

