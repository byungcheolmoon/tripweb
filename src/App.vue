<template>
  <v-app >

    <v-content>
      <top-navs></top-navs>
      <v-container fluid style="padding-top:0px !important; background: #ffffff !important;">
        <router-view></router-view>
      </v-container>
    </v-content>


    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 company ooo</span>
    </v-footer>

  </v-app>
</template>

<script>
import TopNavs from "./components/TopNavs";
import Constant from "./Constant";
import { mapState } from "vuex";


export default {
  name: "App",
  components: {
    TopNavs
  },
  computed: {
    ...mapState({
      logininfocheck: state => state.memberlogin.check,
      logininfo: state => state.memberlogin,

    }),
      ...mapState(['memberinfo'])
  },

  data() {
    return {

      fixed: false,
      localmemberinfo: []
    };
  },
  watch: {
    $route: function(to) {
      if (to.query.idjkqwjlkqwjiej != null) {
        var userid = to.query.idjkqwjlkqwjiej;

        this.$store.dispatch(Constant.MEMBER_INFO, {
          cmd: 1000,
          userid: userid,
          snstype:'naver'
        });
      }
    },
    logininfocheck: function(logininfocheck) {
      if (this.logininfocheck == true) {
        this.$session.start();
        this.$session.set("id", this.memberinfo.userid);
        this.$session.set("nickname", this.memberinfo.nickname);
        this.$session.set("snstype", this.memberinfo.snstype);
        this.$store.dispatch(Constant.TOPNAV_MENU, { id: true });
      }
    },
    memberinfo: function(newInfo) {
      this.localmemberinfo = { ...newInfo };
    }
  },
  mounted: function() {
      //console.log('user get : ' + this.$store.getters.getUsernick);
    if (this.$session.get("id")) {
      //console.log("app mount : " + this.$session.get("id"));
    } else {
      //console.log("fail");
    }
  }
};
</script>

<style>


</style>
