<template>
  <v-app >
    <!--<img id="topImage" src="@/assets/images/tour_top_back.jpg" alt="Vuetify.js" class="mb-5">-->
    <top-navs id="topnavsz"></top-navs>
    <v-content>
      <v-container fluid class="pl-0 pr-0 pt-0" style="background: #ffffff !important;">
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
      localmemberinfo: [],
      image:'http://nawara-fish.com/web/trip/images/tour_top_back.jpg',
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
#topnavsz{
  z-index:1;
}
  /*.nav_moon_table tr td{
    position: absolute;
    border:hidden;
    width: 100%;
    height: 300px;
    text-align: center;
    color:white;
    text-shadow: 1px 1px black;
    z-index: 0;

  }*/
</style>
