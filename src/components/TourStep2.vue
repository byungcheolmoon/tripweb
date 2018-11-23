<template>
    <div>
        <top-background :val="2"></top-background>
        <v-container text-xs-center style="max-width: 1280px; margin-top:106px;">
            <v-layout row wrap>
                <v-flex xs12  style="position: relative">
                    <div id="airpanel">
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

    export default {
        name: "tour-step2",
        props:['idx'],
        components: {
            TopBackground
        },
        created(){
            eventBus.$emit('topNavCheck' , false)
            console.log(this.idx);
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
</style>