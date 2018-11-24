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
                                            <v-card-text class="px-0">12</v-card-text>
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
    import Constant from "../Constant";
    import CONF from "../Config";

    export default {
        name: "tour-step2",
        props:['idx','cate'],
        components: {
            TopBackground
        },
        data: () => ({
            Detailbg :'',
            content:'text'
        }),
        created(){
            eventBus.$emit('topNavCheck' , false)

            // 받은 idx를 서버로 보내 해당 데이터를 모두 가져와 데이터에 넣어 처리한다.
            switch (this.cate){
                case 'vietnam':
                    this.Detailbg = 'http://nawara-fish.com/web/trip/images/tour_top_00.jpg';
                    break;
                case 'guam':
                    this.Detailbg = 'http://nawara-fish.com/web/trip/images/tour_top_01.jpg';
                    break;
                case 'thailand':
                    this.Detailbg = 'http://nawara-fish.com/web/trip/images/tour_top_00.jpg';
                    break;
                default :
                    this.Detailbg = 'http://nawara-fish.com/web/trip/images/tour_top_back.jpg';
                    break;
            }

            console.log('next step')

     /*       this.getDataApiDetail()
                .then(data => {
                    this.title = data.title // 타이틀
                    this.content = data.content // 콘텐츠
                    this.titleImg = data.img
                    if(data.img != 'none'){
                        this.titleImgCheck = true;
                    } else {
                        this.titleImgCheck = false;
                    }
                })
*/
        },
        methods:{
            getDataApiDetail () {
                this.loading = true
                return new Promise((resolve, reject) => {
                    var data = new FormData();
                    data.append('cmd', '1001');
                    data.append('idx', this.idx);

                    axios.post(CONF.BOARD_INFO, data)
                        .then((response)=>{
                            var title = response.data.info.title
                            var content = response.data.info.content
                            var img     = response.data.info.img
                            var cate     = response.data.info.cate
                            var cate_sub     = response.data.info.cate_sub
                            setTimeout(() => {
                                this.loading = false
                                resolve({
                                    title,
                                    content,
                                    img,
                                    cate,
                                    cate_sub
                                })
                            }, 200)
                        })
                })
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
        background-image:url('http://nawara-fish.com/web/trip/images/tour_top_00.jpg');
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