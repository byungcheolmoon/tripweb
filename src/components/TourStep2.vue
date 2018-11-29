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
                        <div id="side_air">
                            <table class="table" style="border: hidden; margin-top:20px;">
                                <tr>
                                    <td style="padding-left:20px; text-align: left !important;">
                                        <span class="glyphicon glyphicon-globe" aria-hidden="true" style="display: inline-block"></span> <h4 class="text-left" style="display: inline"><strong>치앙마이</strong></h4>
                                        <p style="letter-spacing:2px;">(ChingMai)</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-left:20px; text-align: left !important;">
                                        <h3 style="display:inline-block; margin-right:5px;">Category</h3><span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                                        <div style="padding-left:25px;">
                                            <p>- 전체상품</p>
                                            <p>- 공항픽업/샌딩</p>
                                            <p>- 교통편</p>
                                            <p>- 데이투어</p>
                                            <p>- 액티비티</p>
                                            <p>- 스노쿨링</p>
                                            <p>- 스파/힐링</p>
                                            <p>- 입장권</p>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding-left:20px; text-align: left !important;">
                                        <br>
                                        <h3 style="display:inline-block; margin-right:5px;">Category</h3><span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                                        <div style="padding-left:25px;">
                                            <p>- 전체상품</p>
                                            <p>- 공항픽업/샌딩</p>
                                            <p>- 교통편</p>
                                            <p>- 데이투어</p>
                                            <p>- 액티비티</p>
                                            <p>- 스노쿨링</p>
                                            <p>- 스파/힐링</p>
                                            <p>- 입장권</p>
                                        </div>
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
            TopBackground
        },
        data: () => ({
            Detailbg :'',
            content:''
        }),
        created(){
            eventBus.$emit('topNavCheck' , false)

            // 받은 idx를 서버로 보내 해당 데이터를 모두 가져와 데이터에 넣어 처리한다.
            this.getDataApiDetail()
                .then(data => {
                    this.content = data.bo_content
                    this.Detailbg = DetImgSearch(data.bo_img);
                })
        },
        methods:{
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
    #textareaCustom{
        background-color: white;
        min-height: 500px;
        border-bottom:solid 1px rgba(0,0,0,.3);
        border:solid 1px lightgray;
        padding:30px;
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