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


                        <div style="position: relative; top:430px; min-width: 850px; color:black; text-align: left">
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

                                    <v-flex xs3 class="ml-2 mr-2">
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
                                    <v-flex xs3  class="ml-2 mr-2" style="height:50px;">
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
                                    <v-flex xs3 class="ml-2 mr-2">
                                        <v-card>
                                            <v-btn block style="height: 42px"> 금액 조회</v-btn>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>

                            <v-container fill-height grid-list-md text-xs-left class="pl-0 pr-0 mb-2">
                                <v-layout row wrap align-center justify-start>
                                    <v-flex xs12 class="mt-3 mb-3">
                                        <blockquote>
                                            <p class="mb-0 headline">상품설명</p>
                                        </blockquote>
                                    </v-flex>
                                    <v-flex xs12 class="pa-3 pt-5 pb-5" style="background-color: #f7f7f7">
                                        <p class="title" style="font-weight: 800">트립위드의 전문 여행큐레이터가 추천합니다. 안전하고 편안하게, 즐겁게 여행하세요^^</p>
                                        <p class="font-weight-regular mb-0" style="line-height:1.8em">1. 이제는 나만의 패키지 시대!! 원하는 대로 만들어 보세요.<br>
                                        2. 동행코너에서 나만의 팀을 꾸려보세요. 뭉치면 싸지니 여러명이 갈수록 좋습니다. 친구도 사귀고 금액도 절약 되는 1석 이조 효과!!<br>
                                        3. 여행에 대한 걱정은 이제 그만!! 궁금한 건 여행큐레이터와 편하게 상담하세요. 당신의 여행을 도와드립니다.<br>
                                        4. 힘든 여행은 이제 그만!! 트립위드의 편안하고 안전하게 알찬 여행을 경험하세요.<br>
                                        5. RDF(Review Analyses&Direct Feedback)시스템으로 매일 업그레이드 되는 여행을 경험하세요.<br>
                                        </p>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-divider></v-divider>
                            <v-container fill-height grid-list-md text-xs-left class="pl-0 pr-0 mb-2">
                                <v-layout row wrap align-center justify-start>
                                    <v-flex xs12 class="mt-3 mb-3">
                                        <blockquote>
                                            <p class="mb-0 headline">큐레이터's Tip</p>
                                        </blockquote>
                                    </v-flex>
                                    <v-flex xs12 class="pa-3 pt-5 pb-5" style="background-color: #f7f7f7">
                                        <ul class="mylist1 font-weight-regular">
                                            <li>더위를 피하고 싶다면 방콕 왕궁을 오전 일정으로 잡으세요.</li>
                                            <li>담넌사두억 수상시장은 태국 전통 수상시장으로 아이들 문화체험에도 좋아요.</li>
                                            <li>맛집과 쇼핑코스는 원하는 곳으로 가능하고 태국 야시장 분위기를 느끼고 싶다면 딸랏롯빠이 야시장, 정돈된 야시장 분위기는 아시안티크 야시장이 좋아요.</li>
                                            <li>여행큐레이션 서비스를 신청하면 전체 여행에 대한 직접 큐레이팅을 받을 수 있어요. <span style="cursor:pointer" @click="pop1"> * 여행큐레이션 서비스란?</span></li>
                                        </ul>

                                        <v-dialog
                                                v-model="dialog1"
                                                width="900"
                                        >
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
                                                    <v-btn color="primary" flat @click="dialog1 = false" > 닫기 </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>

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
                            <!--<div id="textareaCustom" v-html="this.content"></div> 콘텐츠 들어가는 부분 -->

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
                    </div>
                </v-flex>
            </v-layout>
        </v-container>


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
            dialog: false,
            dialog1:false,
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
            pop1(){
              this.dialog1 = true;
            },
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

    blockquote {
        display:table-cell;
        vertical-align: middle;
        height:60px;
        margin-left: 0px;
        margin-right: 0px;
        padding-left: 20px;
        padding-right: 20px;
        border-left: 6px solid lightgray;
    }


    ul.mylist li, ol.mylist li {
        padding: 5px 0px 5px 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid #efefef;
        font-size: 12px;
    }

    ul.mylist1 li, ol.mylist1 li {
        margin-bottom: 5px;
        line-height:1.6em
    }
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