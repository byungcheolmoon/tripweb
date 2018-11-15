<template>
    <div>
        <v-alert
                v-model="alert"
                dismissible
                v-bind:type="this.alertType"
         v-text="this.alertText">
        </v-alert>
    <v-container grid-list-xl text-xs-center style="margin-top:100px; padding-top:0px; padding-bottom:0px;">

        <!--<v-btn v-on:click="changeVisible">-->
            <!--체스트-->
        <!--</v-btn>-->
        <!--<transition name="fade">-->
        <!--<img src="@/assets/images/1.jpg" v-if="visible">-->
            <!--<p v-if="visible">asldkfjlaskdjflkasjdflksadjf</p>-->
    <!--</transition>-->
        <v-layout row >
                <v-flex xs4  offset-xs4>

        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    :autofocus="ftype"
            ></v-text-field>
            <v-text-field
                    :append-icon="show3 ? 'visibility_off' : 'visibility'"
                    :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    v-model="password"
                    label="password"
                    hint="At least 8 characters"
                    value=""
                    class="input-group--focused"
                    @click:append="show3 = !show3"
            ></v-text-field>

            <v-btn round v-bind:block="blocks()" color="info" @click="signup" >{{ btnText }}</v-btn>

            <v-btn round color="success" :disabled="!valid" @click="submit" v-show="mode == 'login'">
                로그인
            </v-btn>

            <!--<v-btn  @click="clear" v-show="mode == 'login'" >초기화</v-btn>-->
            <v-btn  round @click="clear" v-show="mode == 'login'" >비밀번호 초기화</v-btn>


        </v-form>
                    <v-divider style="margin-top:20px; margin-bottom:20px;" row v-show="mode == 'login'"></v-divider>
        </v-flex>
        </v-layout>
        <v-layout row v-if="mode == 'login'">
            <v-flex xs4 offset-xs4>
            <img src="@/assets/images/naverGreensmall.png" @click="btnclick()"/>
            <KakaoLogin
                    api-key="badaa897bfd9484bdc0447cbafd01a25"
                    image="kakao_login_btn_large"
                    :on-success="onSuccess"
                    :on-failure="onFailure"
            />
            </v-flex>
        </v-layout>



    </v-container>
    </div>


</template>
<script>

    import Constant from "../Constant";
    import KakaoLogin from 'vue-kakao-login'
    import { mapState } from "vuex";
    import firebase from 'firebase';

export default {
  name:'login',
  data: () => ({
      alert: false,
      alertType: 'error',
      alertText:'아이디 혹은 비밀번호가 맞지 않습니다.',
      ftype: true,
      visible:true,
      mode: 'login',
      page: "",
      // 폼데이터 시작
      valid: true,
      name: '',
      vtest:true,
      show3: false,
      password: '',
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
      },
      email: '',
      emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      checkbox: false
      // 폼데이터 끝
  }),
    components: {
        KakaoLogin
    },
    computed:{
        btnText: function() {

            if (this.mode != "add") return "회원가입";
            else return "완료하기";

        },


    },
    watch:{
      mode:function (newMode) {

      }
    },
    methods: {
        blocks:function () {
          if(this.mode == "add"){
              return true;
          } else {
              return false;
          }
        },
        test:function(){

        },
        // changeVisible:function(){
        //     this.visible = !this.visible
        // },
        onSuccess: function (data) {

            Kakao.API.request({
                url: '/v2/user/me',
                success: function (res) {
                    // alert(JSON.stringify(res));
                },
                fail: function (error) {
                     //alert(JSON.stringify(error));
                }
            }).then((res) => {
                    this.success_moon(res)
                })
        },
        success_moon: function (res) {

            this.$session.start();
            this.$session.set("id", res.id);
            this.$session.set("nickname", res.properties.nickname);
            this.$session.set("snstype", 'kakao');

            this.$store.dispatch(Constant.MEMBER_INFO, {
                userid: res.id,
                usernickname: res.properties.nickname,
                snstype: 'kakao'
            });
            this.$router.push({ name: "index" });
        },
        onFailure: function (data) {

        },
        btnclick: function() {
              window.open(
                "http://nawara-fish.com/web/web_sign_naverlogin.php",
                "",
                "width=400, height=300"
              );
        },
        submit () {
            if (this.$refs.form.validate()) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(
                        user => {
                            const newUser = {
                                userid: user.user.email,
                                nickname: user.user.email,
                                snstype: 'web',
                                emailverified:user.user.emailVerified
                            }

                            this.alert = false;
                            this.$store.commit('setUserNick', newUser);
                            this.$store.dispatch('weblogin', { parm: newUser})
                            this.$store.dispatch(Constant.TOPNAV_MENU, { id: true });
                            this.$router.push({ name: "index" });
                        }
                    )
                    .catch(
                        error => {
                            if(error.code == "auth/user-not-found"){
                                this.alert = true;
                                this.alertText = '사용자를 찾을 수 없습니다. 회원가입 해주세요.';
                            } else if(error.code == "auth/wrong-password"){
                                this.alert = true;
                                this.alertText = '비밀번호가 맞지 않습니다. 확인 후 다시 입력해 주세요.';
                            }
                        }
                    )
            }
        },
        clear () { // 비밀번호 재설정
            // this.$refs.form.reset()
            if (this.email === '') {
                this.alert = true;
                this.alertText = '재설정할 이메일 주소를 적어주세요.';
                this.ftype = true;
            }else {
                this.$store.dispatch('resetPasswordWithEmail', {email: this.email})
            }

        },
        signup: function (){
            if(this.mode == 'add'){
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((user) => {

                            this.$store.dispatch(Constant.MEMBER_INFO, {
                                userid: user.user.email,
                                snstype: 'web'
                            });

                            this.$router.push({ name: "index" });
                            alert('회원가입이 완료되었습니다.');

                    })
                    .catch((error) => {
                        if(error.code == "auth/email-already-in-use"){
                            this.alert = true;
                            this.alertText = '사용중인 이메일 입니다. 확인 후 입력해주세요.';
                            this.ftype = true;
                        }
                    })
            } else {
                this.mode = 'add';
                this.email = '';
                this.password = '';
            }

        },

    },
        // mounted: function () {
        //     //Kakao.init(Constant.KAKAO_KEY)
        //     Kakao.cleanup();
        // }
    };
</script>

<style>
.fade-enter-active, .fade-leave-active{
    transition: opacity .5s;
}
    .fade-enter-active, .fade-leave-to{
        opacity:  0;
    }
</style>

