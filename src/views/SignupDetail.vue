<template>
  <v-content>
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-card class="pa-5">
          <v-img
            :src="require('../assets/images/favicon_520_transparent.png')"
            class="my-3"
            contain
            height="70"
          ></v-img>
          <p class="display-1 text-center" style="font-family: 'Comfortaa', cursive!important;">B-text</p>
          <p class="text-center ml-3 mb-5">大学のテキストをシェアしよう。</p>
          <p class="text-center pt-5 mb-2 headline">アカウント情報入力</p>
          <v-divider></v-divider>
          <v-form v-model="valid" class="mt-5">
            <v-container grid-list-xl>
              <v-layout wrap>
                <v-flex
                  xs12
                >
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="ユーザー名"
                    required
                    outlined
                    color="green accent-4"  
                  ></v-text-field>
                  
                  <p class="subtitle-2 mb-2">プロフィール画像</p>
                 
                  <span
                    v-if="isProfileImageUploaded"
                    @click="$refs.file.click();" style="cursor: pointer; position: relative;">
                    <v-icon style="position: absolute; z-index: 5; margin-left: 11px; margin-top: 11px; opacity: 0.8">mdi-camera</v-icon>
                    <v-avatar 
                     style="opacity: 0.7;">
                      <img v-if="isPhotoURL" :src="photoURL">
                      <img v-else="isPhotoURL" :src="require('../assets/images/account.svg')" style="opacity: 0.4;">
                    </v-avatar>
                  </span>
                  
                  <span
                    v-if="uploadedImage"
                    @click="$refs.file.click();" style="cursor: pointer; position: relative;">
                    <v-icon style="position: absolute; z-index: 5; margin-left: 11px; margin-top: 11px; opacity: 0.8">mdi-camera</v-icon>
                    <v-avatar 
                     style="opacity: 0.7;" >
                      <img :src="uploadedImage"/>
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
                    style="margin-left: 0px; margin-right: 0px; margin-top: 20px;"
                    />
                  
                  <v-text-field
                    :rules="universityRules"
                    label="大学/キャンパス名"
                    readonly
                    required
                    outlined
                    color="green accent-4"  
                    v-bind:value="university"
                    v-show="university"                    
                  ></v-text-field>
                  
                  <v-btn 
                    block
                    large
                    color="green accent-4"
                    class="mr-4 white--text mt-2" 
                    @click="submit"
                    :disabled="!valid"
                  >
                    完了
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>


<script>
  import LoginBar from '../components/LoginBar';
  import SelectUniversity from '../components/SelectUniversity';
  import firebase from 'firebase';
  export default {
    title: 'アカウント情報入力',
    data(){
      return{
        valid: false,
        name: '',
        nameRules: [
          v => !!v || 'ユーザー名の記入は必須です。',
          v => (v && v.length <= 50) || '50文字以内のユーザー名を作成して下さい。',
        ],
        university: '',
        universityRules: [
          v => !!v || '大学/キャンパス名の記入は必須です。',
        ],
        user: '',
        photoURL: '',
        isPhotoURL: false,
        uid: '',
        providerData: '',
        imageRules: [
          value => !value || value.size < 2000000 || '2MB以下の画像を使用して下さい。',
        ],
        uploadedImage: '',
        file: '',
        isProfileImageUploaded: true,
        userInfo: '',
        is_signup: true,
        userDetail: {},
        sns_image: '',
      }
    },
    components: {
      LoginBar,
      SelectUniversity
    },
    methods:{
      emailMatchError(){
        return (this.password===this.passwordConfirmation) ? '' : 'パスワードと一致しません。'
      },
      select: function(selectedUniversity){
        this.university=selectedUniversity
      },
      submit(){
        var username=this.name;
        var university=this.university;
        var user = firebase.auth().currentUser;
        var uid=user.uid;
        this.uid=uid;
        
        if(!this.isProfileImageUploaded){
          var formData=new FormData();
          this.file = this.$refs.file.files[0];
          formData.append("profile_image", this.file)
          formData.append("uid", uid)
          formData.append("username", username)
          formData.append("university", university)
          var config={
            headers:{
              'content-type': 'multipart/form-data'
            }
          };
          this.$axios.post('https://b-text-api.herokuapp.com/signup_with_img', formData, config).then(res=>{
            this.setUserDetail();
          })
          
          
        }else{
          var formData=new FormData();
          formData.append("uid", uid);
          formData.append("username", username);
          formData.append("university", university);
          var profile_image='';
          if(this.isPhotoURL){
            profile_image='sns';
            this.sns_image=this.photoURL;
          }else{
            profile_image='default';
          }
          formData.append("profile_image", profile_image)
          formData.append("sns_image", this.sns_image)
          var config={
            headers:{
              'content-type': 'multipart/form-data'
            }
          };
          this.$axios
            .post('https://b-text-api.herokuapp.com/signup', formData, config).then(res=>{
            this.setUserDetail();
          })
          
        }
      },
      onFileChange(e){
        var files=e.target.files || e.dataTransfer.files;
        this.createImage(files[0]);
        this.isProfileImageUploaded=false;
      },
      createImage(file){
        let reader=new FileReader();
        reader.onload=(e)=>{
          this.uploadedImage=e.target.result;
        };
        reader.readAsDataURL(file);
      },
      selectUniversity(university){
        this.university=university;
      },
      setUserDetail(){
        this.$axios.get('https://b-text-api.herokuapp.com/user', {params: {uid: this.uid}})
          .then(res=>{
            this.userDetail=res.data;
          
          this.$store.commit('setUserDetail', this.userDetail);
            if(this.userDetail.is_signup_detail){
              this.$router.push('/');
            }else{
              this.$router.push('/signup/detail')
            }

          });
      },
    },
    created() {
      var user=firebase.auth().currentUser;
      if (user) {
        this.name = user.displayName;
        this.photoURL = user.photoURL;
        if(user.photoURL){
          this.isPhotoURL = true
        }
        this.uid = user.uid;
        this.$axios.get('https://b-text-api.herokuapp.com/user', {params: {uid: this.uid}})
        .then(res=>{
          this.userInfo=res.data;
          this.is_signup=res.data.is_signup;
          if(this.is_signup){
            this.$router.push('/');
          }
        });
      } else {
        this.$router.push('/signup');
      }
    },
  };
</script>

<style>
</style>


