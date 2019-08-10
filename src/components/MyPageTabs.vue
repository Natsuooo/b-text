<template>
  <v-bottom-navigation
    grow
    style="position: fixed; top: 0; left: 0; z-index: 10;"
  >
    <v-btn value="myBooks" to='/mypage/books'>
      <span class="body-2">出品記録</span>
  <!--            <v-icon>mdi-book-open-variant</v-icon>-->
    </v-btn>

    <v-btn value="favorites" to='/mypage/favorites'>
      <span class="body-2">お気に入り</span>
  <!--            <v-icon>mdi-heart</v-icon>-->
    </v-btn>

    <v-btn value="userInfo"  to='/mypage/user'>
      <span class="body-2">ユーザー情報</span>
  <!--            <v-icon>mdi-account-card-details</v-icon>-->
    </v-btn>

  </v-bottom-navigation>
</template>



<script>
export default {
  data: () => ({
//    MyPageTabs: 'sellBooks',
  }),
};
</script>