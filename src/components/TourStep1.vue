<template>
    <div>
        <top-background :val="this.cate"></top-background>
        <v-container text-xs-center style="max-width: 1280px">
            <v-layout >
                <v-flex xs12  style="position: relative">
                  <div style="color:white" class="display-1 font-weight-medium">{{this.toptitle}}</div>
                   <div class="subheading"> asldkfjsalkdjflsakjdflkjsadflkjsdf </div>

                                <div class="grid_tour">
                                    <a id="atags" href="#">
                                        <figure>
                                            <img src="@/assets/images/tour_top_00.jpg" alt="img12"/>
                                            <figcaption>
                                                <div>
                                                    <h2><span>베트남</span></h2>
                                                    <p>travel and beautiful companions</p>
                                                </div>

                                            </figcaption>
                                        </figure>
                                    </a>
                                </div>




                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>

<script>
    import eventBus from "../EventBus"
    import TopBackground from "./Tour_assetsBackgroundTop";

    export default {
        name: "tour-step1",
        data: () => ({
            toptitle :''
        }),
        components: {
            TopBackground
        },
        props:['cate'],
        created(){
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
    }
</script>

<style scoped>
    @import url(https://fonts.googleapis.com/css?family=Raleway:300,400,600);
    .display-1{
        text-shadow: 1px 1px 1px #292c44;
        word-spacing: -0.15em;
    }
    .subheading{
        color:white;
        text-shadow: 1px 1px 1px #292c44;
        word-spacing: -0.15em;
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