<template>
    <div>
        <top-background></top-background>
        <v-container text-xs-center style="max-width: 1280px">
        <v-layout >
            <v-flex xs12    style="position: relative">
                <table class="nav_tour_table">
                    <tr>
                        <td width="33%" align="center" style="vertical-align: middle;">

                            <div class="grid_tour" @click="linkTourBtn('vietnam')">
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

                        </td>
                        <td width="33%" align="center" style="vertical-align: middle;">
                            <div class="grid_tour" @click="linkTourBtn('gaum')">
                                <figure>
                                    <img src="@/assets/images/tour_top_01.jpg" alt="img12"/>
                                    <figcaption>
                                        <div>
                                            <h2><span>괌</span></h2>
                                            <p>travel and beautiful companions</p>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </td>
                        <td width="33%" align="center" style="vertical-align: middle;">
                            <div class="grid_tour" @click="linkTourBtn('thailand')">
                                <figure>
                                    <img src="@/assets/images/tour_top_02.jpg" alt="img12"/>
                                    <figcaption>
                                        <div>
                                            <h2><span>태국</span></h2>
                                            <p>travel and beautiful companions</p>
                                        </div>
                                        <a href="#">View more</a>
                                    </figcaption>
                                </figure>
                            </div>
                        </td>
                    </tr>
                </table>
            </v-flex>
        </v-layout>
        </v-container>
    </div>
</template>

<script>
    import eventBus from "../EventBus"
    import TopBackground from "./Tour_assetsBackgroundTop";
    export default {
        name: "tour-main",
        components: {
            TopBackground
        },
        created : function() {
            eventBus.$emit('topNavCheck' , true)
        },
        methods:{
            linkTourBtn(item){
                this.$router.push({name:'TourPass', params:{ cate:item }})
            },
        }
    }
</script>

<style scoped>

    .nav_tour_table{
        position: absolute; top:100px; height: 400px; vertical-align: middle; border:none;
    }
    .nav_tour_table tr td{
        border : none;
        border-top :none !important;
    }

    .grid_tour {
        position: relative;
        margin: 5px;
        /*padding: 1em 0 4em;*/
        /*max-width: 1000px;*/
        height: 100%;
        list-style: none;
        text-align: center;
        overflow: hidden;
        background:#000; /*Change this to a background image or remove*/
        border:solid #fff;
        border-width:6px 6px 20px 6px;
        box-shadow:1px 1px 10px #333; /* Standard blur at 5px. Increase for more depth */
        -webkit-box-shadow:1px 1px 10px #333;
        -moz-box-shadow:1px 1px 10px #333;

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

    /*.grid_tour figure figcaption > a {
        z-index: 1000;
        text-indent: 200%;
        white-space: nowrap;
        font-size: 0;
        opacity: 0;
    }*/

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