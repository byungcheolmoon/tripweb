<template>
    <div>
        <top-background :val="this.cate"></top-background>
        <v-container text-xs-center style="max-width: 1280px; margin-top:106px;">
            <v-layout row wrap style="width:1280px !important;">
                <v-flex xs12  style="position: relative">
                  <div style="color:white; text-shadow: 1px 1px 1px #292c44;" class="display-1 font-weight-medium" >{{this.toptitle}}</div>
                   <div class="subheading" style="color:white; text-shadow: 1px 1px 1px #292c44; word-spacing: -0.15em;"> asldkfjsalkdjflsakjdflkjsadflkjsdf </div>
                </v-flex>

                <v-flex style="position: relative; margin-top:30px; min-height:200px;">
                    <v-container fill-height d-flex>
                        <v-layout align-center justify-center>
                            <v-flex xs8>
                                <v-card height="300px">
                                    <v-container fill-height :style="{ 'background-image': 'url(' + step1Detailbg + ')' }">
                                        <v-layout align-center justify-center >
                                            <v-card-text>
                                                <p>{{this.cate}} 이미지</p>
                                            </v-card-text>
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </v-flex>

                            <v-flex xs4>
                                <v-card height="300px">
                                    <v-container fill-height>
                                        <v-layout align-center justify-center>
                                            <v-card-text>
                                                <weather :titles="this.cate"></weather>
                                            </v-card-text>
                                        </v-layout>
                                    </v-container>
                                </v-card>

                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>

            </v-layout>
        </v-container>


        <v-container text-xs-center style="padding-top:50px;">
            <v-layout  row wrap>
                <v-flex xs12>
                    <v-card white flat>

                        <div class="px-0 display-1 font-weight-regular">
                            PASS
                            <v-badge color="orange mb-4 "> <v-icon slot="badge" dark small>fas fa fa-bus</v-icon></v-badge>
                        </div>
                        <div class="subheading font-weigth-light">베트남(다낭, 호이안)을 연결하는 가장 쉬운 교통편</div>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <div class="card-row">
                        <div v-for="(card, index) in cards"
                             :key="index"
                             :ref="`card_${index}`"
                             @mouseover="hoverCard(index)"
                             @mouseout="hoverCard(-1)"
                             @click="click(card.idx)"
                             class="card">

                            <img class="card-image"
                                 :class="{'selected': isSelected(index)}"
                                 :src="card.image"/>

                            <div class="card-footer">
                                <p class="card-text text-xs-left font-weigth-light">
                                    <v-chip color="orange" text-color="white">
                                        Premium
                                        <v-icon right>star</v-icon>
                                    </v-chip>
                                </p>
                                <h3 class="card-title title" style="font-weight: 400">{{card.title}}</h3>
                                <p class="card-text">
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

    </div>
</template>

<script>
    import eventBus from "../EventBus"
    import TopBackground from "./Tour_assetsBackgroundTop";
    import weather from "./utilWeather";

    export default {
        name: "tour-step1",
        data: function() {
            return {
                toptitle :'',
                step1Detailbg:'',
                cards: [
                    {idx:9, title: 'Shuttle Chiangmai Airport', author: '셔틀 다낭 공항픽업', image: 'http://nawara-fish.com/web/trip/src/assets/images/pass1.jpg'},
                    {idx:9, title: 'Chiangmai - Luang', author: '다낭-루앙프라방 에어패스', image: 'http://nawara-fish.com/web/trip/src/assets/images/pass2.jpg'},
                    {idx:9, title: 'Chiang Mai Luang Praban', author: '다낭-루앙프라방패스', image: 'http://nawara-fish.com/web/trip/src/assets/images/pass3.jpg'},
                    {idx:9, title: 'Chiangmai - Pai Pass', author: '다낭-빠이버스', image: 'http://nawara-fish.com/web/trip/src/assets/images/pass4.jpg'}
                ],
                /*prodShowData:{ box1:'box1', box2:'box2', box3:'box3', box4:'box4', box5:'box5', box6:'box7'},*/
                selectedCard: -1,
                lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
            }
        },
        components: {
            TopBackground, weather
        },
        props:['cate'],
        created(){
            // CATE로 ajax를 날려 각 나라 소개를 긁어와 이미지를 표현해야함
            eventBus.$emit('topNavCheck' , true)
            switch (this.cate){
                case 'vietnam':
                    return this.toptitle= '다낭, 호이안 최고의 휴향지';
                case 'guam':
                    return this.toptitle= '괌 최고의 휴향지';
                case 'thailand':
                    return this.toptitle= '방콕, 그리고.. 최고의 휴향지';
                default :
                    return this.toptitle= 'TripWith가 추천하는 여행지';
            }
        },
        methods:{
            hoverCard(selectedIndex) {
                this.selectedCard = selectedIndex
                this.animateCards()
            },
            isSelected (cardIndex) {
                return this.selectedCard === cardIndex
            },
            animateCards () {
                this.cards.forEach((card, index) => {
                    const direction = this.calculateCardDirection(index, this.selectedCard)
                    TweenMax.to(
                        this.$refs[`card_${index}`],
                        0.5,
                        {x: direction * 6}
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
            click(item){
                console.log('idx step' + item)
                this.$router.push({name:'TourDetail', params:{idx:item, cate:this.cate}})
            },
        }
    }
</script>

<style scoped>
    @import url(https://fonts.googleapis.com/css?family=Raleway:300,400,600);

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
        margin: 6px;
        overflow: hidden;
        box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.3);
        transition: height 0.3s, box-shadow 0.3s;
    }

    .card:hover {
        height: 400px;
        box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.2);
    }

    .card-image {
        /* center horizontally overflown image */
        position: absolute;
        left: -9999px;
        right: -9999px;
        margin: auto;

        height: 240px;
        min-width: 100%;
        transition: height 0.3s, opacity 0.3s;
    }
    .card-image.selected {
        height: 260px;
        opacity: 0.5;
    }
    .card-footer {
        width: 100%;
        position: absolute;
        text-align: left;
        bottom: 0;
        height: 130px;
        padding: 10px 10px;
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
        color: black;
        transition: color 0.3s;
    }
    .card-author.selected {
        color: black;
    }

    .display-1{
        word-spacing: 0.4em;
    }


    .grid_tour {
        position: relative;
        margin: 5px;
        /*padding: 1em 0 4em;*/
        /*max-width: 1000px;*/
        height: 300px;
        list-style: none;
        text-align: center;
        overflow: hidden;
        background:#000; /*Change this to a background image or remove*/
        border:solid #fff;
        border-width:6px 6px 20px 6px;
        box-shadow:1px 1px 3px #333; /* Standard blur at 5px. Increase for more depth */
        -webkit-box-shadow:1px 1px 3px #333;
        -moz-box-shadow:1px 1px 3px #333;

    }

    .grid_tour figure {
        border-radius: 6px;
        position: relative;
        float: left;
        overflow: hidden;
        /*margin: 10px 1%;*/
        max-width: 100%;
        height: 100%;
        width: 100%;

        text-align: center;
        cursor: pointer;

    }

    .grid_tour figure img {
        position: relative;
        display: block;
        min-height: 100%;
        max-width: 100%;
        object-fit: cover;
        opacity: 1;

    }

    .grid_tour figure figcaption{
        position: absolute;
        top: 50%;
        width: 100%;
        height: 100%;
        color : white;
        text-align: center;
        margin : 0 auto;
    }

    .grid_tour figure h2 {
        font-size:2em;
        text-shadow: 1px 1px 5px #292c44;
        word-spacing: -0.15em;
        font-weight: 300;
    }

    .grid_tour figure h2 span {
        font-weight: 800;
    }

    .grid_tour figure h2,
    .grid_tour figure p {
        margin: 0;
    }

    .grid_tour figure p {
        text-shadow: 1px 1px 1px #292c44;
        letter-spacing: 1px;
        font-size: 68.5%;
    }

</style>