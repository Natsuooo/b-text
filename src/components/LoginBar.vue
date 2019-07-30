<template>
<v-app-bar app elevate-on-scroll>
  <img src="../assets/favicon_520_transparent.png" alt="B-text" width="25" class="mr-2">
  <v-toolbar-title class="title">
    <span style="font-family: 'Comfortaa', cursive!important;">B-text</span>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-btn
    depressed 
    color="green accent-4" 
    class="mr-2 white--text pr-2 pl-1"
    to="/signup"
  >
    新規登録
  </v-btn>
  <v-btn
    depressed 
    outlined 
    color="green accent-4" 
    class="pr-2 pl-1"
    to="/login"
  >
    ログイン
  </v-btn>
</v-app-bar>
</template>