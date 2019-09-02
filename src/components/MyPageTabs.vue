<template>
  <v-bottom-navigation
    grow
    style="position: fixed; top: 0; left: 0; z-index: 10;"
  >
   <v-tabs style="margin-left: -45px; margin-right: 10px;" color="green accent-4" grow>
      <v-tab to='/mypage/books'>出品記録</v-tab>
      <v-tab to='/mypage/favorites'>お気に入り</v-tab>
      <v-tab to='/mypage/user'>ユーザー</v-tab>
    </v-tabs>
<!--
    <v-btn value="myBooks" to='/mypage/books'>
      <span class="body-2">出品記録</span>
    </v-btn>

    <v-btn value="mypage" to='/mypage/favorites'>
      <span class="body-2">お気に入り</span>
    </v-btn>

    <v-btn value="mypage"  to='/mypage/user'>
      <span class="body-2">ユーザー</span>
    </v-btn>
-->
    

  </v-bottom-navigation>
  
</template>



<script>
export default {
  data: () => ({
//    MyPageTabs: 'sellBooks',
  }),
};
</script>