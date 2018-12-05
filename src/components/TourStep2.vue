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
                    <div id="airpanel">
                        <!--<div id="airpanel" :style="{ 'background-image': 'url(' + Detailbg + ')' }">-->

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
                                <v-card flat :style="{ 'background-image': 'url(' + Detailbg + ')' }" id="topcardtag">
                                </v-card>
                            </v-tab-item>
                            <v-tab-item :key="2">
                                <v-card flat style="height:420px">
                                    <youtube width="100%" height="420px" :video-id="videoId" :player-vars="playerVars" @playing="playing"></youtube>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </div>

                    <div style="position: relative; top:460px; width: 850px; color:black; text-align: left">
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

                                <v-flex xs4 class="ml-2 mr-2">
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
                                <v-flex xs4  class="ml-2 mr-2" style="height:50px;">
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
                                        <v-btn block style="height: 42px" @click="middleopen()"> 금액 조회</v-btn>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>


                        <v-container fill-height text-xs-center class="pl-0 pr-0 pt-0 mb-4" style="border-bottom:solid 1px lightgray;" v-show="middleonfoo">
                            <v-layout align-center justify-start>
                                <v-flex xs12 text-xs-center>
                                    <v-container fill-height style="height: 549px;" >
                                        <v-layout align-center justify-center >
                                            <v-card-text class="pt-0">
                                                <v-img src="http://nawara-fish.com/web/trip/src/assets/images/chart.jpg" postion="center center" height="549px" width="723px" ></v-img>
                                            </v-card-text>
                                        </v-layout>
                                    </v-container>
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
                                            width="1024"
                                    >
                                        <v-card>
                                            <v-card-title
                                                    class="headline grey lighten-2"
                                                    primary-title
                                            >
                                                트립위드 여행큐레이션 서비스란?
                                            </v-card-title>

                                            <v-card-text>
                                                <div class="title mb-3">믿을 수 있는 여행전문가가 여행자의 여행을 도와 드립니다. 여행관련 된 내용은 무엇이든 편하게 물어보세요^^</div>
                                                <ul class="mylist">
                                                    <li>가족 또는 연인, 친구, 지인과 여행을 준비 중인 여행자</li>
                                                    <li>어디를 가야할지 고민한 여행자</li>
                                                    <li>언제 가야할지 고민인 여행자</li>
                                                    <li>알아본 여행이 정말 좋은 건지 궁금한 여행자</li>
                                                    <li> 특별한 목적이 있는 여행자(세미나, 기업체 방문, 기관방문 등)</li>
                                                </ul>
                                            </v-card-text>
                                            <v-divider></v-divider>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="primary" flat> 큐레이션 서비스 신청하기 </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>

                                </v-flex>
                            </v-layout>
                        </v-container>


                        <v-container fill-height grid-list-md text-xs-left class="pl-0 pr-0 mb-2">
                            <v-layout row wrap align-center justify-start>
                                <v-flex xs12 class="mt-3 mb-3">
                                    <blockquote>
                                        <p class="mb-0 headline">일정</p>
                                    </blockquote>

                                </v-flex>

                                <v-flex>
                                    <v-divider></v-divider>
                                    <v-timeline dense>
                                        <v-timeline-item
                                                v-for="(year, i) in years"
                                                :color="year.color"
                                                :key="i"
                                                small
                                                fill-dot
                                        >
                                            <div class="py-3 pa-2" style="background-color: #fbfbfb">
                                                <h2 :class="`headline font-weight-light pl-4 mb-3 ${year.color}--text`" v-text="year.title"></h2>
                                                <div class="pl-4" v-html="year.content"> </div>

                                                <v-item-group >
                                                    <v-container grid-list-md>
                                                        <v-layout wrap>
                                                            <v-flex v-for="n in year.imgcount" :key="n" md4 >
                                                                <v-item>
                                                                    <v-card id="vcardbg" :style="{ 'background-image': 'url(' + year.imgurl[ n - 1 ]+ ')' }"
                                                                            slot-scope="active"
                                                                            class="d-flex align-center"
                                                                            height="200">
                                                                    </v-card>
                                                                </v-item>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-container>
                                                </v-item-group>
                                            </div>
                                        </v-timeline-item>
                                    </v-timeline>

                                    <v-divider></v-divider>
                                </v-flex>
                            </v-layout>
                        </v-container>


                        <v-container fill-height grid-list-md text-xs-left class="pl-0 pr-0 mb-2">
                            <v-layout row wrap align-center justify-start>
                                <v-flex xs12 class="mt-3 mb-3">
                                    <blockquote>
                                        <p class="mb-0 headline">안내사항</p>
                                    </blockquote>
                                </v-flex>
                                <v-flex xs12 class="pa-3 ml-3">
                                    <p class="title" style="font-weight: 800">포함</p>
                                    <p class="subheading font-weight-regular mb-0" style="line-height:1.8em">
                                        1. 호텔픽업/샌딩<br>
                                        2. 차량, 유류비, 주차비, 운전기사<br>
                                        3. 한국어 가능한 현지 가이드<br>
                                        4. 선택 관광지 입장료<br>
                                        5. 식사, 마사지<br>
                                    </p>

                                    <p class="title pt-5" style="font-weight: 800">불포함</p>
                                    <p class="subheading font-weight-regular mb-0" style="line-height:1.8em">
                                        1. 개인경비<br>
                                        2. 매너팁<br>
                                    </p>

                                    <p class="title pt-5" style="font-weight: 800">준비물</p>
                                    <p class="subheading font-weight-regular mb-0" style="line-height:1.8em">
                                        1. 개인경비<br>
                                        2. 여권 등<br>
                                    </p>

                                    <p class="title pt-5" style="font-weight: 800">연령안내</p>
                                    <p class="subheading font-weight-regular mb-0" style="line-height:1.8em">
                                        1. 성인 : 키 1M 이상<br>
                                        2. 소아 : 키 1M 미만<br>
                                    </p>

                                </v-flex>
                            </v-layout>
                        </v-container>

                        <v-container fill-height grid-list-md text-xs-left class="pl-0 pr-0 mb-0">
                            <v-layout row wrap align-center justify-start>
                                <v-flex xs12 class="mt-3 mb-2">
                                    <blockquote>
                                        <p class="mb-0 headline">유의사항</p>
                                    </blockquote>
                                </v-flex>
                                <v-flex xs12 class="pl-3 pr-3">
                                    <p class="subheading font-weight-regular mb-0" style="line-height:1.8em">
                                        1. 픽업은 호텔 로비에서 진행됩니다. 미팅 시간 지연 시 통보 없이 출발합니다. 반드시 10분 전에 도착하시어, 가이드와 명단 확인 바랍니다.<br>
                                        2. 왕궁 입장시 여권 원본 (혹은 여권 복사본)이 없을시 왕궁 입장이 불가합니다. 반드시 여권 복사본을 준비해주세요! <br>
                                        3. 왕궁투어시 복장 규정: 무릎위로 올라오는 반바지나 치마, 민소매, 슬리퍼, 쪼리 등은 입장이 불가합니다. 긴바지나 긴치마 , 반팔옷 , 샌들 또는 운동화 추천 드립니다.  <br>
                                        4. 왕궁 투어 후 호텔로 드랍하며, 별도의 지점 드랍시 가이드에게 말씀해주세요. 개별적으로 카오산 이동시나 카오산 하차를 원하시는 분은 가이드에게 말씀해주세요(성수기에는 카오산에 드랍이 어려울 수 있습니다)  <br>
                                    </p>
                                </v-flex>
                            </v-layout>
                        </v-container>


                        <v-container fill-height grid-list-md text-xs-left class="pl-0 pr-0 mb-0">
                            <v-layout row wrap align-center justify-start>
                                <v-flex xs12 class="mt-3 mb-2">
                                    <blockquote>
                                        <p class="mb-0 headline">취소/환불 규정</p>
                                    </blockquote>
                                </v-flex>
                                <v-flex xs12 class="pl-3 pr-3">
                                    <p class="subheading font-weight-regular mb-0" style="line-height:1.8em">
                                        예약진행 중 변경/환불시 이용일 기준 수수료가 부과됩니다.<br>
                                        이용일 기준 30일 전 100% 취소 및 환불 가능<br>
                                        이용일 기준 30~20일 전 취소 및 환불 요청시 10% 수수료 발생<br>
                                        이용일 기준 10~19일 전 취소 및 환불 요청시 15% 수수료 발생<br>
                                        이용일 기준 8~9일 전 취소 및 환불 요청시 20% 수수료 발생<br>
                                        이용일 기준 4~7일 전 취소 및 환불 요청시 50% 수수료 발생<br>
                                        이용일 기준 3일 전 취소 및 환불 불가<br>
                                        상품 이용 당일 취소나 불참(NO-SHOW)시에도 규정에 따라 100% 변경/취소/환불이 불가합니다.<br>
                                    </p>
                                </v-flex>
                            </v-layout>
                        </v-container>

                        <v-container fill-height grid-list-md text-xs-left class="pl-0 pr-0 mb-0">
                            <v-layout row wrap align-center justify-start>
                                <v-flex xs12 class="mt-3 mb-2">
                                    <blockquote>
                                        <p class="mb-0 headline">리뷰</p>
                                    </blockquote>
                                </v-flex>
                                <v-flex xs12>
                                    <v-container fill-height grid-list-md text-xs-left class="pl-0 pr-0">
                                        <v-layout row wrap align-center justify-start>

                                            <v-flex xs4>
                                                <v-container fill-height style="background-color: #fbfbfb; height: 300px;" >
                                                    <v-layout align-center justify-center >
                                                        <v-card-text>
                                                            <div class="text-xs-center">
                                                                <div class="display-1">4.4</div>
                                                                <v-rating background-color="blue lighten-3" color="blue" v-model="rating" readonly></v-rating>
                                                            </div>
                                                        </v-card-text>
                                                    </v-layout>
                                                </v-container>
                                            </v-flex>

                                            <v-flex xs8>
                                                <v-container fill-height style="background-color: #fbfbfb; height: 300px;" >
                                                    <v-layout align-center justify-center>
                                                        <v-card-text>
                                                            <div class="title">20대, 친구들과 가는 여행으로 구매가 많은 상품</div>
                                                            <v-layout row warp>
                                                                <v-flex xs12>
                                                                    <v-container fill-height class="pl-0 pr-0">
                                                                        <v-layout align-center justify-center>
                                                                            <table style="width: 100%">
                                                                                <tr>
                                                                                    <td style="width: 100px; text-align: right; padding-bottom:2px;">
                                                                                        <v-rating  small   background-color="blue lighten-3" color="blue" v-model="ratingsm1" readonly></v-rating>
                                                                                    </td>
                                                                                    <td class="pl-3">
                                                                                        <v-progress-linear v-model="valueDeterminate1"></v-progress-linear>
                                                                                    </td>
                                                                                    <td style="width: 20px; color: gray">
                                                                                        72
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="width: 100px; text-align: right; padding-bottom:2px;">
                                                                                        <v-rating  small   background-color="blue lighten-3" color="blue" v-model="ratingsm2" readonly></v-rating>
                                                                                    </td>
                                                                                    <td class="pl-3">
                                                                                        <v-progress-linear v-model="valueDeterminate2"></v-progress-linear>
                                                                                    </td>
                                                                                    <td style="width: 20px; color: gray">
                                                                                        12
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="width: 100px; text-align: right; padding-bottom:2px;">
                                                                                        <v-rating  small   background-color="blue lighten-3" color="blue" v-model="ratingsm3" readonly></v-rating>
                                                                                    </td>
                                                                                    <td class="pl-3">
                                                                                        <v-progress-linear v-model="valueDeterminate3"></v-progress-linear>
                                                                                    </td>
                                                                                    <td style="width: 20px; color: gray">
                                                                                        10
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="width: 100px; text-align: right; padding-bottom:2px;">
                                                                                        <v-rating  small   background-color="blue lighten-3" color="blue" v-model="ratingsm4" readonly></v-rating>
                                                                                    </td>
                                                                                    <td class="pl-3">
                                                                                        <v-progress-linear v-model="valueDeterminate4"></v-progress-linear>
                                                                                    </td>
                                                                                    <td style="width: 20px; color: gray">
                                                                                        5
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="width: 100px; text-align: right; padding-bottom:2px;">
                                                                                        <v-rating  small   background-color="blue lighten-3" color="blue" v-model="ratingsm5" readonly></v-rating>
                                                                                    </td>
                                                                                    <td class="pl-3">
                                                                                        <v-progress-linear v-model="valueDeterminate5"></v-progress-linear>
                                                                                    </td>
                                                                                    <td style="width: 20px; color: gray">
                                                                                        1
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </v-layout>
                                                                    </v-container>
                                                                </v-flex>
                                                            </v-layout>
                                                        </v-card-text>
                                                    </v-layout>
                                                </v-container>
                                            </v-flex>

                                        </v-layout>
                                    </v-container>
                                </v-flex>
                            </v-layout>
                        </v-container>



                        <v-container fill-height grid-list-md text-xs-left class="pl-0 pr-0 mb-0">
                            <v-layout row wrap align-center justify-start>
                                <v-flex xs12 class="mt-3 mb-2">
                                    <p class="mb-0 headline">이 상품을 본 여행자가 함께 본 상품</p>
                                </v-flex>
                                <v-flex xs12 class="pl-3 pr-3">

                                    <div class="card-row">
                                        <div v-for="(card, index) in cards"
                                             :key="index"
                                             :ref="`card_${index}`"
                                             @mouseover="hoverCard(index)"
                                             @mouseout="hoverCard(-1)"
                                             @click="click(card.title)"
                                             class="card">

                                            <img class="card-image"
                                                 :class="{'selected': isSelected(index)}"
                                                 :src="card.image"/>

                                            <div class="card-footer">
                                                <p class="card-text font-weigth-light">NEW</p>
                                                <h3 class="card-title title" style="font-weight: 600">{{card.title}}</h3>
                                                <p class="card-text">by
                                                    <span
                                                            class="card-author"
                                                            :class="{'selected': isSelected(index)}">
                                                            {{card.author}}
                                                        </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-container>


                        <v-container fill-height grid-list-md text-xs-left class="pl-0 pr-0 mb-0">
                            <v-layout row wrap align-center justify-start>
                                <v-flex xs12 class="mt-3 mb-2">
                                    <p class="mb-0 headline">방콕 추천 숙소</p>
                                </v-flex>
                                <v-flex xs12 class="pl-3 pr-3">

                                    <div class="card-row">
                                        <div v-for="(card1, index1) in cards1"
                                             :key="index1"
                                             :ref="`card1_${index1}`"
                                             @mouseover="hoverCard1(index1)"
                                             @mouseout="hoverCard1(-1)"
                                             @click="click(card1.title)"
                                             class="card">

                                            <img class="card-image"
                                                 :class="{'selected': isSelected1(index1)}"
                                                 :src="card1.image"/>

                                            <div class="card-footer">
                                                <p class="card-text font-weigth-light">NEW</p>
                                                <h3 class="card-title title" style="font-weight: 600">{{card1.title}}</h3>
                                                <p class="card-text">by
                                                    <span
                                                            class="card-author"
                                                            :class="{'selected': isSelected1(index1)}">
                                                            {{card1.author}}
                                                        </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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
    import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";


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
            middleonfoo:false,
            videoId: 'L1q3_XZ27N4',
            playerVars: {
                autoplay: 0
            },
            middleimg:'http://nawara-fish.com/web/trip/src/assets/images/chart.jpg',
            dialog: false,
            dialog1:false,
            datevalue:{start:''},
            value:'',
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
            rating:3,
            ratingsm1:5,
            ratingsm2:4,
            ratingsm3:3,
            ratingsm4:2,
            ratingsm5:1,
            valueDeterminate1:72,
            valueDeterminate2:12,
            valueDeterminate3:10,
            valueDeterminate4:5,
            valueDeterminate5:1,
            years: [
                {
                    color: 'cyan',
                    year: '1960',
                    title:'픽업',
                    content:'- 12:00 아속역 하차 & 개별 호텔 이동40분 소요 <br>- 오전에 왕궁 관광 후 아속역 귀환 시간은 12:00 전후입니다. <br>- 도착 후 개별적으로 귀환하시면 되십니다',
                    imgcount:1,
                    imgurl:['http://nawara-fish.com/web/trip/src/assets/images/bus1.jpg']
                },
                {
                    color: 'green',
                    year: '1970',
                    title:'방콕왕궁 & 에메랄드 사원',
                    content:'<strong style="font-size:1.2em">방콕</strong> 여행자들이 가장 많이 찾는 왕궁(Grand Palace)은 라마 1세가 1782년에 방콕으로 수도를 옮기면서 만들어진 것입니다.' +
                    ' 태국 전통 건축양식으로 만들어졌으며, 화려하지 않은 곳이 하나도 없을 정도로 웅장하면서도 정교하게 꾸며져 있습니다.' +
                    ' 이곳에서는 태국 역대 왕들의 대관식이 진행되었으며 금, 유리, 보석등으로 꾸며진 내부는 외부 못지않은 화려함을 자랑합니다.' +
                    ' 태국 왕실은 태국인들의 자랑이자 태국의 상징이고, 현 태국 국왕은 태국인들에게 신과 같은 존경 받는 인물입니다.' +
                    ' 그렇기 때문에 왕궁에 입장할 때는 복장에 유으ㅟ해야 하며 왕을 모독하는 행위는 법적으로 절대 금지되어 있습니다.',
                    imgcount:3,
                    imgurl:[
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_2_01.jpg',
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_2_02.jpg',
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_2_03.jpg',
                        ]
                },
                {
                    color: 'pink',
                    year: '1980',
                    title:'중식',
                    content:'중식을 제공합니다.',
                    imgcount:0
                },
                {
                    color: 'amber',
                    year: '1990',
                    title:'담넌사두억 수산시장',
                    content:'태국하면 떠오르는 것중 하나가 바로 수상시장이지요? TV 방송에서도 많이 볼수 있었습니다. ' +
                    '운하가 발달한 나라이다보니 더불어 수상시장도 매우 활성화 되어 있는데요. ' +
                    '수상시장에 가면 태국인의 서민적인 풍경을 고스란히 엿볼 수가 있답니다. ' +
                    '그 중 가장 유명한 수상시장이 바로 담넌 사두억 수상시장이에요. ' +
                    '관광객이 많이 몰리다보니 너무 상업적으로 변모하였지만' +
                    '그래도 태국에서 가장 유명한 수상시장이니 안가보기에는 아쉬운 곳입니다.' +
                    '수상시장을 구경하고 매끌렁시장(위험한 기찻길시장)을 구경합니다.' +
                    '왜 이험한 기찻길 시장이냐구요? 시장이 기찻길위에 열립니다. 기차가 들어올때 잠시 접고 다시 기차지나가면 펼쳐지고 하는 진풍경이 연출됩니다.',
                    imgcount:3,
                    imgurl:[
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_3_01.jpg',
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_3_02.jpg',
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_3_03.jpg',
                    ]
                },
                {
                    color: 'orange',
                    year: '2000',
                    title:'태국 발마사지 1시간',
                    content:'바와에서 직접 블랜딩한 아로마 오일로 발 마사지/스크럽과 바디 마사지로 힐링하세요! (100분/ 140분 중 택1) 스트레스 해소와 피부 보습에 탁월한 효과가 있습니다 :) ',
                    imgcount:3,
                    imgurl:[
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_4_01.jpg',
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_4_02.jpg',
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_4_03.jpg',
                    ]
                }
                ,
                {
                    color: 'orange',
                    year: '2000',
                    title:'석식',
                    content:'석식을 제공합니다.',
                    imgcount:0
                }
                ,
                {
                    color: 'orange',
                    year: '2000',
                    title:'야시장',
                    content:'한적한 오후에 아유타야의 유적지 관람과 선셋 보트를 타고 아유타야 밤 풍경을 감상하며, ' +
                    '화려한 조명으로 변신한 아유타야 유적지를 밖에서 감상하며, 방콕의 대표적인 서민 야시장 ' +
                    '"롯파이 야시장"에서의 다양한 태국 음식과 아기자기한 샵에서의 쇼핑도 가능하며,' +
                    ' 태국 서민들의 삶도 엿볼 수 있게 구성한 상품입니다',
                    imgcount:3,
                    imgurl:[
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_5_01.jpg',
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_5_02.jpg',
                        'http://nawara-fish.com/web/trip/src/assets/images/tour_5_03.jpg',
                    ]
                }
            ],
            cards: [
                {title: '초호화 요트투어', author: 'tripwithPick', image: 'http://nawara-fish.com/web/trip/src/assets/images/1.jpg'},
                {title: '칸차나부리 록벨리', author: 'Colman Andrews', image: 'http://nawara-fish.com/web/trip/src/assets/images/4.jpg'},
                {title: '샹그릴라 호라이즌 ', author: 'Celeste Mills', image: 'http://nawara-fish.com/web/trip/src/assets/images/5.jpg'},
                {title: '사뭇프라칸 악어농장', author: 'Celeste Mills', image: 'https://placeimg.com/640/480/arch'}
            ],
            cards1: [
                {title: 'MADACT', author: 'tripwithPick', image: 'http://nawara-fish.com/web/trip/src/assets/images/h1.jpg'},
                {title: '드 라벤더 방콕', author: 'Colman Andrews', image: 'http://nawara-fish.com/web/trip/src/assets/images/h2.jpg'},
                {title: '뉴 시암 리버사이드', author: 'Celeste Mills', image: 'http://nawara-fish.com/web/trip/src/assets/images/h3.jpg'},
                {title: '빈스 쁘라뚜남', author: 'Celeste Mills', image: 'http://nawara-fish.com/web/trip/src/assets/images/h4.jpg'}
            ],
            selectedCard: -1,
            selectedCard1: -1,
            active: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

//            shortcuts: {
//                "this_week": "1박 2일",
//                "last_4_days": "7일",
//            }
        }),
        created(){
            console.log(this.years[0].title)
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
            middleopen(){
                console.log('in');
              this.middleonfoo = true;
            },
            playing() {
                console.log('\o/ we are watching!!!')
            },
            next () {
                const active = parseInt(this.active)
                this.active = (active < 2 ? active + 1 : 0)
            },
            hoverCard(selectedIndex) {
                this.selectedCard = selectedIndex
                this.animateCards()
            },
            isSelected (cardIndex) {
                return this.selectedCard === cardIndex
            },
            hoverCard1(selectedIndex) {
                this.selectedCard1 = selectedIndex
                this.animateCards1()
            },
            isSelected1 (cardIndex) {
                return this.selectedCard1 === cardIndex
            },
            animateCards () {
                this.cards.forEach((card, index) => {
                    const direction = this.calculateCardDirection(index, this.selectedCard)
                    TweenMax.to(
                        this.$refs[`card_${index}`],
                        0.3,
                        {x: direction * 10}
                    )
                })
            },
            animateCards1 () {
                this.cards1.forEach((card, index) => {
                    const direction = this.calculateCardDirection1(index, this.selectedCard1)
                    TweenMax.to(
                        this.$refs[`card1_${index}`],
                        0.3,
                        {x: direction * 10}
                    )
                })
            },
            calculateCardDirection (cardIndex, selectedIndex) {
                if(selectedIndex === -1) {
                    return 0
                }
                const diff = cardIndex - selectedIndex
                return diff === 0 ? 0 : diff/Math.abs(diff)
            },
            calculateCardDirection1 (cardIndex, selectedIndex) {
                if(selectedIndex === -1) {
                    return 0
                }
                const diff = cardIndex - selectedIndex
                return diff === 0 ? 0 : diff/Math.abs(diff)
            },
            click(item){
                console.log(item);
            },
            tourimgCheck(index){
                console.log(index);
            },
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
    #middleimg{
        height:400px;
        background-repeat: no-repeat;
    }
    .card-row {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 780px;
        width: 100%;
        height: 400px;
    }

    .card {
        position: relative;
        background-color: #FFFFFF;
        height: 370px;
        width: 268px;
        margin: 10px;
        overflow: hidden;
        box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.3);
        transition: height 0.3s, box-shadow 0.3s;
    }

    .card:hover {
        height: 410px;
        box-shadow: 20px 20px 40px 0px rgba(0,0,0,0.2);
    }

    .card-image {
        /* center horizontally overflown image */
        position: absolute;
        left: -9999px;
        right: -9999px;
        margin: auto;

        height: 220px;
        min-width: 100%;
        transition: height 0.3s, opacity 0.3s;
    }
    .card-image.selected {
        height: 410px;
        opacity: 0.5;
    }
    .card-footer {
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 130px;
        padding: 10px 15px;
        font-family: Helvetica;
    }

    .card-text {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
    }
    .card-title {
        font-family: Serif;
    }
    .card-author {
        font-size: 14px;
        color: #BAB096;
        transition: color 0.3s;
    }
    .card-author.selected {
        color: #6a6456;
    }

    #vcardbg{
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }
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

    #topcardtag{
    height:420px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
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