<template>

    <div id="inspire">
        <v-navigation-drawer
                :clipped="$vuetify.breakpoint.lgAndUp"
                v-model="drawer"
                fixed
                app
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


        <v-container text-xs-center style="margin-top:0px; padding-top:0px; padding-bottom:0px;">

            <v-layout row wrap>
                <v-flex xs12  offset-xs>

                    <v-toolbar color="grey lighten-5" flat>

                        <v-toolbar-title v-text="title" @click="homeClick" style="margin-right:50px;"></v-toolbar-title>

                        <v-menu :nudge-width="100" transition="slide-x-transition">
                            <v-toolbar-title slot="activator">
                                <span>All</span>
                                <v-icon>arrow_drop_down</v-icon>
                            </v-toolbar-title>
                            <v-list>
                                <v-list-tile
                                        v-for="item in itemtopmenu"
                                        :key="item"
                                >
                                    <v-list-tile-title v-text="item" ></v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>

                        <v-toolbar-items class="hidden-sm-and-down">
                            <v-btn flat><router-link v-bind:to="{ name: 'linktest'}">Link</router-link></v-btn>
                            <v-btn flat>Product</v-btn>
                            <v-btn flat><router-link v-bind:to="{ name: 'test'}">test</router-link></v-btn>
                            <v-btn flat><router-link v-bind:to="{ name: 'boardNoticeList'}">Board</router-link></v-btn>
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


    export default {
        data: () => ({
            title: "Tripwith56",
            itemtopmenu: ["All", "Family", "Friends", "Coworkers"],
            localitems: [],
            localnickname: "",
            dialog: false,
            drawer: false,
            items: [
                { icon: 'help', text: 'Index' },
                // { icon: 'history', text: 'Frequently contacted' },
                { icon: 'play_arrow', text: 'Video' },
                { icon: 'play_arrow', text: 'Board' },
                // { icon: 'settings', text: 'Video' },
                // { icon: 'chat_bubble', text: 'Send feedback' },
                // { icon: 'contacts', text: 'Help' },
                // { icon: 'phonelink', text: 'App downloads' },
                // { icon: 'keyboard', text: 'Go to the old version' }
            ]
        }),
        props: {
            source: String
        },

        computed: {
            ...mapState({
                memberitems: state => state.memberitems,
                memberinfo: state => state.memberinfo.nickname
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
            }
        },
        methods: {
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
                } else {
                    this.$router.push({ path: "/login" });
                    // let route = this.$router.resolve('/link/to/page'); // This also works.

                    // this.$router.push({ name: "login" });
                }
            },
            homeClick(){
                this.$router.push({ name: "main" })
            }
        }
    };
</script>
<style>

</style>