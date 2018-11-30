<template>

    <div id="inspire" style="background: rgba(255, 255, 255, 0.1)">
        <v-navigation-drawer
                :clipped="$vuetify.breakpoint.lgAndUp"
                v-model="drawer"
                fixed
                app
                v-if="this.memberinfo != null"
        >
            <v-list dense>
                <template v-for="item in items" >
                    <v-layout
                            v-if="item.heading"
                            :key="item.heading"
                            row
                            align-center
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>

                    <v-list-tile v-else :key="item.text" @click="sideMenu(item.text)">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>

        </v-navigation-drawer>


        <v-container text-xs-center style="margin-top:0px; padding-top:0px; padding-bottom:0px; max-width: 1400px; ">

            <v-layout row wrap>
                <v-flex xs12  offset-xs>

                    <v-toolbar :dark="topNavColorBind" v-bind:color="topNavColor()" flat>

                        <v-toolbar-title v-text="title" @click="homeClick"></v-toolbar-title>

                        <v-menu class="topscale" :nudge-width="100" transition="slide-x-transition">
                            <v-toolbar-title slot="activator">
                                <span class="pl-5 pr-3 subheading">여행지정보<v-icon>arrow_drop_down</v-icon></span>
                            </v-toolbar-title>
                            <v-list>
                                <v-list-tile
                                        v-for="item in menu1"
                                        :key="item"
                                >
                                    <v-list-tile-title v-text="item" ></v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>

                        <v-menu class="topscale" :nudge-width="100" transition="slide-x-transition">
                            <v-toolbar-title slot="activator">
                                <span class="pl-3 pr-3 subheading">데이투어<v-icon>arrow_drop_down</v-icon></span>
                            </v-toolbar-title>
                            <v-list>
                                <v-list-tile to="/TourMain"
                                             v-for="item in menu1"
                                             :key="item"
                                >
                                    <v-list-tile-title  v-text="item" ></v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>

                        <v-menu class="topscale" :nudge-width="100" transition="slide-x-transition">
                            <v-toolbar-title slot="activator">
                                <span class="pl-3 pr-3 subheading">커뮤니티<v-icon>arrow_drop_down</v-icon></span>
                            </v-toolbar-title>
                            <v-list>
                                <v-list-tile to="/TourMain"
                                             v-for="item in menu1"
                                             :key="item"
                                >
                                    <v-list-tile-title  v-text="item" ></v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>

                        <v-toolbar-items class="hidden-sm-and-down mt-1">
                            <v-btn flat ><div class="topscale subheading">큐레이팅신청</div></v-btn>
                            <v-btn flat ><div class="topscale subheading">동행</div></v-btn>
                            <v-btn flat ><div class="topscale subheading">회사소개</div></v-btn>
                        </v-toolbar-items>



                        <v-spacer></v-spacer>
                        <v-toolbar-side-icon @click.stop="drawer = !drawer" v-show="this.$session.get('id') == 'orinwangja@naver.com'"></v-toolbar-side-icon>

                        <v-toolbar-items class="hidden-sm-and-down" v-show="this.$session.get('nickname') != null">
                            <v-btn flat>{{this.$session.get('nickname')}}님 어서오세요</v-btn>
                        </v-toolbar-items>

                        <v-toolbar-items class="hidden-sm-and-down">
                            <!--<v-btn icon> <v-icon>search</v-icon> </v-btn>-->
                            <v-btn icon> <v-icon>favorite</v-icon> </v-btn>
                        </v-toolbar-items>

                        <v-menu :nudge-width="100">
                            <v-toolbar-title slot="activator">
                                <v-btn icon>
                                    <v-icon>more_vert</v-icon>
                                </v-btn>
                            </v-toolbar-title>
                            <v-list>
                                <v-list-tile v-for="item in localitems" :key="item">
                                    <v-list-tile-title v-text="item" @click="Clicks(item)"></v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>

                    </v-toolbar>

                </v-flex>
            </v-layout>

        </v-container>


    </div>

</template>


<script>
    import { mapState } from "vuex";
    import Constant from "../Constant";
    import eventBus from "../EventBus"


    export default {
        data: () => ({
            topNavColorBind:false,
            title: "Tripwith56",
            itemtopmenu: ["All", "Family", "Friends", "Coworkers"],
            menu1:['태국','베트남','괌','일본','중국','필리핀'],
            menu2:['리뷰','QnA'],
            localitems: [],
            localnickname: "",
            dialog: false,
            drawer: false,
            items: [
                { icon: 'help', text: 'Index' },
                { icon: 'play_arrow', text: 'Video' },
                { icon: 'play_arrow', text: 'Board' },
            ]
        }),
        props: {
            source: String
        },
        created : function() {
            eventBus.$on('topNavCheck', this.changeNav);
        },
        computed: {
            ...mapState({
                memberitems: state => state.memberitems,
                memberinfo: state => state.memberinfo.nickname,

            })
        },
        mounted: function() {
            if (this.$session.get("id")) {
                this.localnickname = this.$session.get('nickname');
                this.$store.dispatch(Constant.TOPNAV_MENU, { id: true });
            } else {
                this.localnickname = "";
                this.$store.dispatch(Constant.TOPNAV_MENU, { id: false });
            }
        },
        watch: {
            memberitems: function(newContacts) {
                this.localitems = { ...newContacts };
            },
        },
        methods: {
            changeNav(item){
                this.topNavColorBind = item
            },
            sideMenu(item){
                switch (item){
                    case 'Index' :
                        this.drawer = !this.drawer
                        this.$router.push({name:'admin'+item})
                        break;
                    case 'Product' :
                        this.drawer = !this.drawer
                        this.$router.push({name:'admin'+item})
                        break;
                    case 'Video' :
                        this.drawer = !this.drawer
                        this.$router.push({name:'admin'+item})
                        break;
                    case 'Board' :
                        this.drawer = !this.drawer
                        /*this.$router.push({name:'boards', params:{ cate : 'notice', subcate: '', subcatevalue:'', pageno:1, type:'view', idx:''}} )*/
                       this.$store.dispatch(Constant.BOARD_CURRENT_VIEW, { view: 'boards_notice'})
                        this.$router.push({path:'/boards', query:{ cate:'notice', subcate:'', subcatevalue:'', pageno:1, type:'view', idx:''}})
                        break;
                }
            },
            Clicks(item) {
                if (item === "로그아웃") {

                    if(this.$session.get("snstype") == "kakao"){
                        Kakao.API.request({
                            url: '/v1/user/logout',
                            success: function (res) {
                            },
                            fail: function (error) {
                            }
                        })
                    }
                    this.$session.destroy();
                    this.$store.dispatch('resetUsername');
                    this.$store.dispatch(Constant.TOPNAV_MENU, { id: false });
                    this.$router.push({ name: "index" });
                    this.topNavColorBind = false
                } else {
                    this.topNavColorBind = false
                    this.$router.push({ path: "/login" });

                    // let route = this.$router.resolve('/link/to/page'); // This also works.

                    // this.$router.push({ name: "login" });
                }
            },
            homeClick(){
                this.topNavColorBind = false
                this.$router.push({ name: "main" })
            },
            topNavColor(){
                return 'rgba(255, 255, 255, 0.1)';
            },
            changeNavC(){
                this.topNavColorBind = false
            }
        }
    };
</script>
<style scoped>
.topscale{
    font-size:16px;
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -o-transition: 0.5s;
    -ms-transition: 0.5s;
    transition: 0.15s;
}

.topscale:hover{
    -webkit-transform: scale(1.5,1.5);
    -moz-transform: scale(1.5,1.5);
    -o-transform: scale(1.5,1.5);
    -ms-transform: scale(1.5,1.5);
    transform: scale(1.2,1.2);
}

</style>