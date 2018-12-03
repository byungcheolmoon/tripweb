<template>
    <div>
        <top-background :val="2"></top-background>

        <v-container text-xs-center style="max-width: 1280px; margin-top:30px;">
            <v-layout row wrap>
                <v-flex xs12  text-xs-left style="position: relative; padding-bottom:16px;">
                    <div style="color:white; text-shadow: 1px 1px 1px #292c44;" class="display-1 font-weight-regular" >Chiangmai - Luang Prabang Air Pass</div>
                    <div class="subheading" style="color:white; text-shadow: 1px 1px 1px #292c44; word-spacing: -0.15em;"> 치앙마이-루앙프라방 에어패스 </div>
                </v-flex>

                <v-flex xs12  style="position: relative">
                    <div id="airpanel" :style="{ 'background-image': 'url(' + Detailbg + ')' }">


                        <div style="position: inherit; top:430px; min-width: 850px; color:black; text-align: left">
<!--
                                <vue-ctk-date-time-picker
                                        v-model=datevalue
                                        overlay-background
                                        color="purple"
                                        enable-button-validate
                                        format="YYYY-MM-DD"
                                        formatted="YYYY년 MMM D일 ddd "
                                        label="여행일정을 선택해주세요."
                                />-->
                            <v-container fill-height grid-list-md text-xs-center class="pl-0 pr-0">
                                <v-layout align-center justify-center >
                                    <v-flex xs3>
                                        <v-card>
                                            <vue-ctk-date-time-picker style="border:none !important;"
                                                    v-model="value2"
                                                    color="#287696"
                                                    format="YYYY-MM-DD"
                                                    formatted="YYYY년 MMM D일 ddd"
                                                    label="날짜 선택"
                                                    disable-time
                                            />
                                        </v-card>
                                    </v-flex>
                                    <v-flex xs3  style="height:50px;">
                                        <v-card>
                                            <v-select class="pt-0 mt-0"

                                                      v-model="select"
                                                      :items="items"
                                                      label=" 인원"
                                                      required
                                                      height="42px"
                                                      hide-details
                                                      single-line

                                            ></v-select>
                                        </v-card>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-card>
                                            <v-btn block> 금액 조회</v-btn>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>




                            <!--<vue-ctk-date-time-picker-->
                                    <!--v-model=datevalue-->
                                    <!--range-mode-->
                                    <!--overlay-background-->
                                    <!--color="purple"-->
                                    <!--enable-button-validate-->
                                    <!--format="YYYY-MM-DD"-->
                                    <!--formatted="YYYY년 MMM D일 ddd "-->
                                    <!--label="여행일정을 선택해주세요."-->
                                    <!--inline-->
                            <!--/>-->


                            <!--<v-btn @click="testclick">text</v-btn>       선택할 날자 로그찍기    -->

                            <div id="textareaCustom" v-html="this.content"></div>

                            <v-container grid-list-md text-xs-center class="pl-0 pr-0">
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-card dark color="primary">
                                            <v-card-text class="px-0">
                                                12
                                            </v-card-text>
                                        </v-card>
                                    </v-flex>
                                    <v-flex v-for="i in 2" :key="`6${i}`" xs6>
                                        <v-card dark color="secondary">
                                            <v-card-text class="px-0">6</v-card-text>
                                        </v-card>
                                    </v-flex>
                                    <v-flex v-for="i in 3" :key="`4${i}`" xs4>
                                        <v-card dark color="primary">
                                            <v-card-text class="px-0">4</v-card-text>
                                        </v-card>
                                    </v-flex>
                                    <v-flex v-for="i in 4" :key="`3${i}`" xs3>
                                        <v-card dark color="secondary">
                                            <v-card-text class="px-0">3</v-card-text>
                                        </v-card>
                                    </v-flex>
                                    <v-flex v-for="i in 6" :key="`2${i}`" xs2>
                                        <v-card dark color="primary">
                                            <v-card-text class="px-0">2</v-card-text>
                                        </v-card>
                                    </v-flex>
                                    <v-flex v-for="i in 12" :key="`1${i}`" xs1>
                                        <v-card dark color="secondary">
                                            <v-card-text class="px-0">1</v-card-text>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>

                        </div>

                            <div class="floating">
                                <table class="table mt-2 mb-2" style="width: 100%;">
                                    <tr>
                                        <td style="width: 50%">
                                            <i class="fas fa-clock"></i>
                                            <p class="mb-0 caption">소요 시간</p>
                                            <p class="mb-0"><strong>13시간</strong></p>
                                        </td>
                                        <td>
                                            <i class="fas fa-globe"></i>
                                            <p class="mb-0 caption">사용 언어</p>
                                            <p class="mb-0"><strong>한국어</strong></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i class="fas fa-car"></i>
                                            <p class="mb-0 caption" >픽업 여부</p>
                                            <p class="mb-0"><strong>숙소 픽업</strong></p>
                                        </td>
                                        <td>
                                            <i class="fas fa-user"></i>
                                            <p class="mb-0 caption">가이드</p>
                                            <p class="mb-0"><strong>개인 가이드</strong></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i class="fas fa-hand-holding-usd"></i>
                                            <p class="mb-0 caption">환불 정책</p>
                                            <p class="mb-0"><strong>조건부 취소 가능</strong></p>
                                        </td>
                                        <td>
                                            <i class="fas fa-volume-down"></i>
                                            <p class="mb-0 caption">투어 유형</p>
                                            <p class="mb-0"><strong>단독 투어</strong></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="pl-2 pr-2 pt-2">
                                            금액 : 1인
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="pl-2 pr-2 pt-2">
                                            <v-btn block >상담하기</v-btn>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                    </div>
                </v-flex>
            </v-layout>
        </v-container>







    </div>
</template>

<script>
    import eventBus from "../EventBus"
    import TopBackground from "./Tour_assetsBackgroundTop";
    import CONF from "../Config";
    import axios from 'axios';

    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.min.css';

    var DetImgSearch = function(item){

        if(item != 'none'){
            return 'http://nawara-fish.com/web/trip/src/assets/images/'+item;
        } else {
            return 'http://nawara-fish.com/web/trip/images/tour_top_back.jpg';

        }
    }

    export default {
        name: "tour-step2",
        props:['idx','cate'],
        components: {
            TopBackground, VueCtkDateTimePicker
        },
        data: () => ({
            datevalue:{start:''},
            value2:'',
            Detailbg :'',
            content:'',
            select:'',
            items: [
                '1명',
                '2명',
                '3명',
                '4명'
            ],
//            shortcuts: {
//                "this_week": "1박 2일",
//                "last_4_days": "7일",
//            }
        }),
        created(){
            var currentDate = new Date();
            var month = currentDate.getMonth() + 1;
            var day = currentDate.getDate();
            var year = currentDate.getFullYear();

            this.datevalue.start = year + "-" + month + "-" + day;
            this.datevalue.end = year + "-" + month + "-" + day;

            eventBus.$emit('topNavCheck' , true)

            // 받은 idx를 서버로 보내 해당 데이터를 모두 가져와 데이터에 넣어 처리한다.
            this.getDataApiDetail()
                .then(data => {
                    this.content = data.bo_content
                    this.Detailbg = DetImgSearch(data.bo_img);
                })
        },
        methods:{
            testclick(){
                console.log(this.datevalue)
            },
            getDataApiDetail () {
                this.loading = true
                return new Promise((resolve, reject) => {
                    let idx = this.idx;
                    var data = new FormData();
                    data.append('cmd', '1005');
                    data.append('idx', idx);

                    axios.post(CONF.VIEW_DATA, data)
                        .then((response)=>{
                            //console.log(response.data.info);
                            var bo_idx     = response.data.info.board_idx
                            var bo_title   = response.data.info.board_title
                            var bo_img     = response.data.info.board_title_img
                            var bo_content = response.data.info.board_content
                            var bo_type    = response.data.info.board_type
                            var bo_subtype = response.data.info.board_subtype

                            setTimeout(() => {
                                this.loading = false
                                resolve({
                                    bo_idx,
                                    bo_title,
                                    bo_img,
                                    bo_content,
                                    bo_type,
                                    bo_subtype
                                })
                            }, 200)
                        })
                })
            }
        },

    }
</script>

<style scoped>

    .floating {
        position: fixed;
        right: 59%;
        top: 200px;
        margin-right: -720px;
        text-align:center;
        width: 300px;
        z-index:5;

        background-color: white;
        color : black;
        border: solid 1px lightgray;
        border-radius: 6px;

    }

    #textareaCustom{
        background-color: white;
        min-height: 500px;
        border-bottom:solid 1px rgba(0,0,0,.3);
        border:solid 1px lightgray;
        padding:30px;
        width: 850px !important;
        overflow: hidden;
        object-fit: cover;
        /*box-shadow: 1px 3px 2px rgba(0,0,0,.2);*/

    }


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
    #side_air{
        position: absolute;
        top:0px;
        left:900px;
        height: 800px;
        width: 240px;
        z-index: 2;
        display: block;
        background-color: white;
        color : black;
        border: solid 1px lightgray;
        border-radius: 6px;
    }

    #textareaCustom{
        background-color: white;
        min-height: auto;
        border-bottom:solid 1px rgba(0,0,0,.3);
        border:solid 1px lightgray;
        padding:30px;
        /*box-shadow: 1px 3px 2px rgba(0,0,0,.2);*/

    }
</style>