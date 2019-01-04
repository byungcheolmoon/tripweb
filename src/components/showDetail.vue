<template>
    <div>
        <v-container style="max-width: 960px; margin-top:30px;">
            <v-layout row wrap>

                <v-flex xs12>
                    <v-tabs
                            v-model="active"
                            color="cyan"
                            dark
                            slider-color="yellow"
                    >
                        <v-tab ripple >
                            Photo
                        </v-tab>
                        <v-tab ripple >
                            Video
                        </v-tab>
                        <v-tab-item :key="1">
                            <v-carousel style="height:400px;" v-if="mapTopImgCount > 0">
                                <v-carousel-item v-for="(img, i) in mapTopImgList" :key="i" v-if="img != 'none'" :src="img" interval="3000" cycle='true' reverse-transition="fade" transition="fade" style="height:420px;">
                                </v-carousel-item>
                            </v-carousel>
                            <v-card v-if="mapTopImgCount == 0" flat style="background-image: url('http://nawara-fish.com/web/trip/src/assets/images/noimg.png')" id="topcardtag">
                            </v-card>
                        </v-tab-item>
                        <v-tab-item :key="2">
                            <v-card flat style="height:420px">
                                <youtube width="100%" height="420px" :video-id="mapTopVideo" :player-vars="playerVars" @playing="playing"></youtube>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>

                <v-flex xs12>
                    <v-container fill-height grid-list-md text-xs-center class="pl-0 pr-0 mb-4" style="border-top: solid 1px lightgray; border-bottom:solid 1px lightgray;">
                        <v-layout row wrap align-center justify-start>
                            <v-flex xs6 text-xs-left class="pl-3">
                                <p class="title mb-0" >날짜와 인원을 선택해주세요.</p>
                            </v-flex>
                            <v-flex xs6 text-xs-right>
                                <v-dialog
                                        v-model="dialog"
                                        width="900"
                                >
                                    <v-btn flat class="subtitle mb-0" slot="activator" dark style="color:deepskyblue;cursor:pointer ">트립위드 여행큐레이터란? <i class="far fa-question-circle"></i></v-btn>

                                    <v-card>
                                        <v-card-title
                                                class="headline grey lighten-2"
                                                primary-title
                                        >
                                            트립위드 여행큐레이터란?
                                        </v-card-title>

                                        <v-card-text>
                                            <ul class="mylist">
                                                <li>믿을 수 있는 여행 전문가  : 전세계 100개 도시를 직접 여행한 뼛속까지 여행자 마인드를 갖춘 여행전문가로 매년 그 기록은 갱신 됩니다.</li>
                                                <li>최신 여행 정보 전문가 : 매년 7회~10회 가량의 해외출장을 통해 현지여행사 서비스를 직접관리하고 정보의 최신성 유지 합니다.</li>
                                                <li>빅데이터 여행 전문가 : 여행큐레이터는 전문가의 노하우와 빅데이터 분석을 통해 여행자가 원하는 여행을 제안합니다.</li>
                                            </ul>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" flat @click="dialog = false" > 닫기 </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-flex>

                            <div class="text-xs-center">

                            </div>

                            <v-flex xs4 class="ml-2 mr-2">
                                <v-card>
                                    <vue-ctk-date-time-picker style="border:none !important;"
                                                              v-model="dateValue2"
                                                              color="#287696"
                                                              format="YYYY-MM-DD"
                                                              formatted="YYYY년 MMM D일 ddd"
                                                              label="날짜 선택"
                                                              disable-time
                                    />
                                </v-card>
                            </v-flex>
                            <v-flex xs4  class="ml-2 mr-2" style="height:50px;">
                                <v-card>
                                    <v-select class="pt-0 mt-0"

                                              v-model="dateSelect"
                                              :items="dateItems"
                                              label=" 인원"
                                              required
                                              height="42px"
                                              hide-details
                                              single-line

                                    ></v-select>
                                </v-card>
                            </v-flex>
                            <v-flex xs3 class="ml-2 mr-2">
                                <v-card>
                                    <v-btn block style="height: 42px"> 금액 조회</v-btn>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>

                <v-flex xs12 style="border: 1px solid;" class="pa-3">
                    <span>여긴 중단 글</span>
                    <froalaView :config="config" v-model="modelMiddle"></froalaView>
                </v-flex>
                <v-flex xs12 style="border: 1px solid;" class="pa-3">
                    <span>여긴 하단 글</span>
                    <froalaView id="btmtext" :config="config" v-model="modelBottom"></froalaView>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import axios from 'axios';
    import Constant from "../Constant";
    import CONF from "../Config";
    import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.min.css';


    export default {
        name: "show-detail",
        components: {
            VueCtkDateTimePicker
        },
        data(){
          return {
              dialog:false,
              local_tlevel:'',
              local_mlevel:'',
              local_blevel:'',

              dateValue2:'',
              dateSelect:'',
              dateItems:[
                  '1명',
                  '2명',
                  '3명',
                  '4명'
              ],

              videoId: null,
              videoinput:null,
              active: null,
              playerVars: {
                  autoplay: 0
              },

              config: {
                  events: {
                      'froalaEditor.initialized': function () {
                      }
                  },
              },
              modelMiddle: '',
              modelBottom: '',
          }
        },
        created(){
            if (this.$route.query) {
                this.local_tlevel = this.$route.query.tlevel;
                this.local_mlevel = this.$route.query.mlevel;
                this.local_blevel = this.$route.query.blevel;
            }
            this.$store.dispatch(Constant.BOARD_SETVSHOW,{tidx:this.local_tlevel, midx:this.local_mlevel, bidx:this.local_blevel })
        },
        computed:{
            ...mapState({
                mapTopImgCount : state => state.board.adminBoardTemp.topInfo.tImgCount,
                mapTopImgList : state => state.board.adminBoardTemp.topInfo.tImgList,
                mapTopTitle : state => state.board.adminBoardTemp.topInfo.tTitle,
                mapTopVideo : state => state.board.adminBoardTemp.topInfo.tVideo,
                mapMiddle : state => state.board.adminBoardTemp.middleInfo,
                mapBottom : state => state.board.adminBoardTemp.bottomInfo,
                mapMiddleContent : state => state.board.adminBoardTemp.middleInfo.mContent,
                mapBottomContent : state => state.board.adminBoardTemp.bottomInfo.bContent
            }),
        },
        mounted(){
          this.modelMiddle = this.mapMiddle.mContent
          this.modelBottom = this.mapBottom.bContent
        },
        watch:{
            mapMiddleContent(newCon){
                this.modelMiddle = newCon
            },
            mapBottomContent(newCon){
                this.modelBottom = newCon
            }

        },
        methods:{
            playing() {
                console.log('\o/ we are watching!!!')
            },
        }
    }
</script>

<style scoped>
    #airpanel{
        position: absolute;
        top:0px;
        z-index: 2;
        display: block;
        background-size: cover;
        width: 850px;
        height: 420px;
        color: white;
        vertical-align: middle;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    #btmtext blockquote{
        color: rgb(236, 236, 236) !important;
    }
</style>