<template>
<v-content>
  <v-layout justify-center>
    <MyPageTabs/>
    <v-flex xs12 sm6 style="margin-bottom: 100px; margin-top: 70px;" class="pa-5">
     
      <v-alert type="success" v-if="isUpdated" class="mt-0 mb-8">
        ユーザー情報を変更しました。
      </v-alert>
     
      <v-text-field
        v-model="username"        
        label="ユーザー名"
        required
        outlined
        color="green accent-4"  
      ></v-text-field>
      
      <p class="subtitle-2 mb-2">プロフィール画像</p>
      

      <span
        v-if="profile_image!='sns'&&profile_image!='default'"
        @click="$refs.file.click();" style="cursor: pointer; position: relative;">
        <v-icon style="position: absolute; z-index: 5; margin-left: 11px; margin-top: 11px; opacity: 0.8">mdi-camera</v-icon>
        <v-avatar 
         style="opacity: 0.7;" >
          <img :src="uploadedImage"/>
        </v-avatar>
      </span>
      
      
      
      <span
        v-else
        @click="$refs.file.click();" style="cursor: pointer; position: relative;">
        <v-icon style="position: absolute; z-index: 5; margin-left: 11px; margin-top: 11px; opacity: 0.8">mdi-camera</v-icon>
        <v-avatar 
         style="opacity: 0.7;">
          <img v-if="profile_image=='sns'" :src="photoURL">
          <img v-else :src="require('../assets/images/account.svg')">
<!--          <img v-else :src="require('../assets/images/account.svg')">-->
        </v-avatar>
      </span>

      <input 
        type="file" 
        class="profile_image_input" name="photo" @change="onFileChange" accept="image/*"
        ref="file"
        :rules="imageRules"
        style="display:none;" />
        
     　<SelectUniversity 
     　  @selectUniversity="selectUniversity"
     　  class="mt-5"/>
      <v-text-field
        label="大学/キャンパス名"
        readonly
        required
        outlined
        color="green accent-4"  
        :value="university"
        v-show="university"
      ></v-text-field>
      
      <v-btn 
        block
        large
        color="green accent-4"
        class="mr-4 white--text" 
        @click="updateProfile()"
      >
        変更を保存する
      </v-btn>
      
      
      <v-btn 
        @click="logout"
        block
        style="margin-top: 20px;"
        >
        ログアウト
      </v-btn>
    </v-flex>
    <NavBar tab="user" tabMessages="sell"/>
  </v-layout>
</v-content>
</template>

<script>
  import LoginBar from '../components/LoginBar';
  import firebase from 'firebase';
  import NavBar from '../components/NavBar';
  import MyPageTabs from '../components/MyPageTabs';
  import SelectUniversity from '../components/SelectUniversity';

  export default {
    title: 'ユーザー情報',
    data: () => ({
      isLogin: false,
      user: {},
      userDetail: {},
      username: '',
      university: '',
      photoURL: '',
      profile_image: '',
      university: '',
      imageRules: [
        value => !value || value.size < 2000000 || '2MB以下の画像を使用して下さい。',
      ],
      uploadedImage: '',
      isProfileImageUploaded: false,
      isUpdated: false,
    }),
    components: {
      LoginBar,
      NavBar,
      MyPageTabs,
      SelectUniversity,
    },
    methods:{
      logout(){
        var formData=new FormData();
        formData.append("uid", this.uid)
        var config={
          headers:{
            'content-type': 'multipart/form-data'
          }
        };
        this.$axios.post('https://b-text-api.herokuapp.com/logout', formData, config);
        firebase.auth().signOut();
        this.$store.commit('setUserDetail', {});
        console.log(this.userDetail);
        this.$router.push('/login');
      },
      updateProfile(){
        
        if(this.isProfileImageUploaded){
          var formData=new FormData();
          this.file = this.$refs.file.files[0];
          formData.append("profile_image", this.file);
          formData.append("username", this.username);
          formData.append("university", this.university);
          formData.append("user_id", this.userDetail.id);
          formData.append("uid", this.userDetail.uid);
          var config={
            headers:{
              'content-type': 'multipart/form-data'
            }
          };
          this.$axios.post('https://b-text-api.herokuapp.com/users/update_with_img', formData, config).then(res=>{
            this.setUserDetail(this.userDetail.id);
          });
        }else{
          var formData=new FormData();
          formData.append("username", this.username);
          formData.append("university", this.university);
          formData.append("user_id", this.userDetail.id);
          var config={
            headers:{
              'content-type': 'multipart/form-data'
            }
          };
          this.$axios
            .post('https://b-text-api.herokuapp.com/users/update', formData, config).then(res=>{
              this.setUserDetail(this.userDetail.id);
            });
        }
        this.isUpdated=true;
      },
      selectUniversity(university){
        this.university=university;
      },
      onFileChange(e){
        var files=e.target.files || e.dataTransfer.files;
        this.createImage(files[0]);
        this.isProfileImageUploaded=true;
      },
      createImage(file){
        let reader=new FileReader();
        reader.onload=(e)=>{
          this.uploadedImage=e.target.result;
        };
        reader.readAsDataURL(file);
      },
      setUserDetail(user_id){
        this.$axios.get('https://b-text-api.herokuapp.com/get_user', {params: {id: user_id}})
          .then(res=>{
            this.userDetail=res.data;
           this.$store.commit('setUserDetail', this.userDetail);
          });
      },
    },
    created() {
      this.isLogin=this.$store.getters.isLogin;
      this.user=this.$store.getters.user;
      this.userDetail=this.$store.getters.userDetail;
      this.username=this.userDetail.username;
      this.university=this.userDetail.university;
      this.photoURL=this.userDetail.sns_image;
      this.profile_image=this.userDetail.profile_image;
      
      this.uploadedImage="https://b-text-api.herokuapp.com/users/"+this.userDetail.profile_image;
    },
  };
</script>


