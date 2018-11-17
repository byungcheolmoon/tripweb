<template>
<div>
      <v-container text-xs-center style="padding-top:50px;">
          <v-layout  row wrap>
              <v-flex xs12>
                  <v-card white flat>

                      <div class="px-0 display-1 font-weight-regular">
                          TRIPWITH SERVICES
                          <v-badge color="orange mb-4 "> <v-icon slot="badge" dark small>fas fa-fighter-jet</v-icon></v-badge>
                      </div>
                      <div class="subheading font-weigth-light">트립위드만의 서비스와 함께하세요.</div>
                  </v-card>
              </v-flex>
              <v-flex xs12>
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


      <v-container class="hidden-sm-and-down" style="max-width: 1180px !important; ">
          <v-layout row wrap>
              <v-flex xs12 text-xs-center>
                  <v-card white flat>
                      <div class="px-0 display-1 font-weight-regular">큐레이터's Pick</div>
                      <div class="subheading font-weigth-light">트립위드만의 최고전문가를 통해 시간을 절약하세요!</div>
                  </v-card>
              </v-flex>
              <v-flex d-flex xs12 style="margin-top:20px;">
                  <div class="grid_moon" >
                      <div  v-for="(pshow, index) in prodShowData"
                            :key="index"
                            @click="prodShow(pshow.title)"
                            :class="`box${index + 1}`">
                          <figure class="effect-lily">
                              <img :src="pshow.image" :alt="`img${index + 1}`"/>
                              <figcaption>
                                  <div>
                                      <h2 class="font-weight-medium">{{pshow.title}}</h2>
                                      <p>{{pshow.sub}}</p>
                                  </div>
                              </figcaption>
                          </figure>
                      </div>
                  </div>
              </v-flex>
          </v-layout>
      </v-container>

</div>

</template>

<script>
    import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";

export default {

  name: "mainContentOne",
  props: {
        msg: String
    },
    data: function() {
        return {
            cards: [
                {title: '초호화 요트투어', author: 'tripwithPick', image: 'http://nawara-fish.com/web/trip/src/assets/images/1.jpg'},
                {title: 'Crisp Spanish Tortilla Matzo Brei', author: 'Colman Andrews', image: 'http://nawara-fish.com/web/trip/src/assets/images/4.jpg'},
                {title: 'Grilled Shrimp with Lemon and Garlic', author: 'Celeste Mills', image: 'http://nawara-fish.com/web/trip/src/assets/images/5.jpg'},
                {title: 'Grilled Shrimp with Lemon and Garlic', author: 'Celeste Mills', image: 'https://placeimg.com/640/480/arch'}
            ],
            prodShowData: [
                {title: '초호화 요트투어', sub: 'tripwithPick', image: 'http://nawara-fish.com/web/trip/src/assets/images/1.jpg'},
                {title: 'Crisp Spanish Tortilla Matzo Brei', sub: 'Colman Andrews', image: 'http://nawara-fish.com/web/trip/src/assets/images/4.jpg'},
                {title: 'Grilled Shrimp with Lemon and Garlic', sub: 'Celeste Mills', image: 'http://nawara-fish.com/web/trip/src/assets/images/5.jpg'},
                {title: '초호화 요트투어', sub: 'tripwithPick', image: 'http://nawara-fish.com/web/trip/src/assets/images/1.jpg'},
                {title: 'Crisp Spanish Tortilla Matzo Brei', sub: 'Colman Andrews', image: 'http://nawara-fish.com/web/trip/src/assets/images/4.jpg'},
                {title: 'Grilled Shrimp with Lemon and Garlic', sub: 'Celeste Mills', image: 'http://nawara-fish.com/web/trip/src/assets/images/5.jpg'},
            ],
            /*prodShowData:{ box1:'box1', box2:'box2', box3:'box3', box4:'box4', box5:'box5', box6:'box7'},*/
            selectedCard: -1,
            lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
        }
    },
    methods: {
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
        click(item){
            console.log(item);
        },
        prodShow( e ){
          console.log(e)
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    .grid_moon {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 200px;
        grid-column-gap: 10px;
        grid-row-gap: 1em;
        grid-auto-flow: dense;
        text-align: center;
        align-content: space-evenly;

    }
    .grid_moon div{
        /*background-color: #2e6da4;*/
        display: block;
        align-items: center;
        justify-content: center;
        /*border : solid 1px;*/
    }
    .box1 {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 3;
    }
    .box2 {
        grid-column-start: 2;
        grid-column-end : 4;
        grid-row-start: 1;
        grid-row-end: 4;
    }
    .box4 {
        grid-column-start: 4;
        grid-column-end : 5;
        grid-row-start: 2;
        grid-row-end: 4;
    }
    .box5 {
        grid-column-start: 1;
        grid-column-end : 2;
        grid-row-start: 3;
        grid-row-end: 5;
    }
    .box6 {
        grid-column-start: 2;
        grid-column-end : 5;
        grid-row-start: 4;
        grid-row-end: 5;
    }

    /* Common style */
    .grid_moon figure {
        border-radius: 6px;
        position: relative;
        float: left;
        overflow: hidden;
        /*margin: 10px 1%;*/
        min-width: 320px;
        max-width: 100%;
        height: 100%;
        width: 100%;
        object-fit: cover;
        /*background: #3085a3;*/
        text-align: center;
        cursor: pointer;
    }

    .grid_moon figure img {
        position: relative;
        display: block;
        min-height: 100%;
        max-width: 100%;
        object-fit: cover;
        opacity: 1;
    }

    .grid_moon figure figcaption {
        padding: 2em;
        /*padding-bottom:40px;*/
        color: #fff;
        text-transform: uppercase;
        font-size: 1.25em;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .grid_moon figure figcaption::before,
    .grid_moon figure figcaption::after {
        pointer-events: none;
    }
    /*
    .grid_moon figure figcaption div{
      z-index:999;
      position: absolute !important;
      top: 20px !important;
      left: 0;
      width: 100%;
      height: 100%;
    }*/

    .grid_moon figure figcaption,
    .grid_moon figure figcaption > a {
        position: absolute;
        top: -10px;
        left: 0;
        width: 100%;
        height: 100%;
    }

    /* Anchor will cover the whole item by default */
    /* For some effects it will show as a button */
    .grid_moon figure figcaption > a {
        z-index: 1000;
        text-indent: 200%;
        white-space: nowrap;
        font-size: 0;
        opacity: 0;
    }

    .grid_moon figure h2 {
        text-shadow: 1px 1px 5px #292c44;
        word-spacing: -0.15em;
        font-weight: 300;
    }

    .grid_moon figure h2 span {
        font-weight: 800;
    }

    .grid_moon figure h2,
    .grid_moon figure p {
        margin: 0;
    }

    .grid_moon figure p {
        letter-spacing: 1px;
        font-size: 68.5%;
    }






    .grid {
        position: relative;
        margin: 0 auto;
        /*padding: 1em 0 4em;*/
        max-width: 1000px;
        list-style: none;
        text-align: center;
    }

    /* Common style */
    .grid figure {
        border-radius: 6px;
        position: relative;
        float: left;
        overflow: hidden;
        /*margin: 10px 1%;*/
        min-width: 320px;
        max-width: 100%;
        max-height: 200px;
        width: 100%;
        background: #3085a3;
        text-align: center;
        cursor: pointer;
    }

    .grid figure img {
        position: relative;
        display: block;
        min-height: 100%;
        max-width: 100%;
        object-fit: cover;
        opacity: 1;
    }

    .grid figure figcaption {
        padding: 2em;
        /*padding-bottom:40px;*/
        color: #fff;
        text-transform: uppercase;
        font-size: 1.25em;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .grid figure figcaption::before,
    .grid figure figcaption::after {
        pointer-events: none;
    }

    .grid figure figcaption,
    .grid figure figcaption > a {
        position: absolute;
        top: -10px;
        left: 0;
        width: 100%;
        height: 100%;
    }


    /* Anchor will cover the whole item by default */
    /* For some effects it will show as a button */
    .grid figure figcaption > a {
        z-index: 1000;
        text-indent: 200%;
        white-space: nowrap;
        font-size: 0;
        opacity: 0;
    }

    .grid figure h2 {
        word-spacing: -0.15em;
        font-weight: 300;
    }

    .grid figure h2 span {
        font-weight: 800;
    }

    .grid figure h2,
    .grid figure p {
        margin: 0;
    }

    .grid figure p {
        letter-spacing: 1px;
        font-size: 68.5%;
    }

    /* Individual effects */

    /*---------------*/
    /***** Lily *****/
    /*---------------*/

    figure.effect-lily img {
        max-width: none;
        width: -webkit-calc(100% + 50px);
        width: calc(100% + 50px);
        opacity: 0.8;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(-40px,0, 0);
        transform: translate3d(-40px,0,0);
    }

    figure.effect-lily figcaption {
        text-align: left;
    }

    figure.effect-lily figcaption > div {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        top:20px;
        padding: 2em;
        width: 100%;
        height: 50%;
    }

    figure.effect-lily h2,
    figure.effect-lily p {
        -webkit-transform: translate3d(0,40px,0);
        transform: translate3d(0,40px,0);
    }

    figure.effect-lily h2 {
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
    }

    figure.effect-lily p {
        color: rgba(255,255,255,0.8);
        opacity: 0;
        -webkit-transition: opacity 0.2s, -webkit-transform 0.35s;
        transition: opacity 0.2s, transform 0.35s;
    }

    figure.effect-lily:hover img,
    figure.effect-lily:hover p {
        opacity: 1;
    }

    figure.effect-lily:hover img,
    figure.effect-lily:hover h2,
    figure.effect-lily:hover p {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-lily:hover p {
        -webkit-transition-delay: 0.05s;
        transition-delay: 0.05s;
        -webkit-transition-duration: 0.35s;
        transition-duration: 0.35s;
    }

    /*---------------*/
    /***** Sadie *****/
    /*---------------*/

    figure.effect-sadie figcaption::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: -webkit-linear-gradient(top, rgba(72,76,97,0) 0%, rgba(72,76,97,0.8) 75%);
        background: linear-gradient(to bottom, rgba(72,76,97,0) 0%, rgba(72,76,97,0.8) 75%);
        content: '';
        opacity: 0;
        -webkit-transform: translate3d(0,50%,0);
        transform: translate3d(0,50%,0);
    }

    figure.effect-sadie h2 {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        color: #484c61;
        -webkit-transition: -webkit-transform 0.35s, color 0.35s;
        transition: transform 0.35s, color 0.35s;
        -webkit-transform: translate3d(0,-50%,0);
        transform: translate3d(0,-50%,0);
    }

    figure.effect-sadie figcaption::before,
    figure.effect-sadie p {
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
    }

    figure.effect-sadie p {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 2em;
        width: 100%;
        opacity: 0;
        -webkit-transform: translate3d(0,10px,0);
        transform: translate3d(0,10px,0);
    }

    figure.effect-sadie:hover h2 {
        color: #fff;
        -webkit-transform: translate3d(0,-50%,0) translate3d(0,-40px,0);
        transform: translate3d(0,-50%,0) translate3d(0,-40px,0);
    }

    figure.effect-sadie:hover figcaption::before ,
    figure.effect-sadie:hover p {
        opacity: 1;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    /*---------------*/
    /***** Roxy *****/
    /*---------------*/

    figure.effect-roxy {
        background: -webkit-linear-gradient(45deg, #ff89e9 0%, #05abe0 100%);
        background: linear-gradient(45deg, #ff89e9 0%,#05abe0 100%);
    }

    figure.effect-roxy img {
        max-width: none;
        width: -webkit-calc(100% + 60px);
        width: calc(100% + 60px);
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(-50px,0,0);
        transform: translate3d(-50px,0,0);
    }

    figure.effect-roxy figcaption::before {
        position: absolute;
        top: 30px;
        right: 30px;
        bottom: 30px;
        left: 30px;
        border: 1px solid #fff;
        content: '';
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(-20px,0,0);
        transform: translate3d(-20px,0,0);
    }

    figure.effect-roxy figcaption {
        padding: 3em;
        text-align: left;
    }

    figure.effect-roxy h2 {
        padding: 30% 0 10px 0;
    }

    figure.effect-roxy p {
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(-10px,0,0);
        transform: translate3d(-10px,0,0);
    }

    figure.effect-roxy:hover img {
        opacity: 0.7;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-roxy:hover figcaption::before,
    figure.effect-roxy:hover p {
        opacity: 1;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    /*---------------*/
    /***** Bubba *****/
    /*---------------*/

    figure.effect-bubba {
        background: #9e5406;
    }

    figure.effect-bubba img {
        opacity: 0.7;
        -webkit-transition: opacity 0.35s;
        transition: opacity 0.35s;
    }

    figure.effect-bubba:hover img {
        opacity: 0.4;
    }

    figure.effect-bubba figcaption::before,
    figure.effect-bubba figcaption::after {
        position: absolute;
        top: 30px;
        right: 30px;
        bottom: 30px;
        left: 30px;
        content: '';
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
    }

    figure.effect-bubba figcaption::before {
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        -webkit-transform: scale(0,1);
        transform: scale(0,1);
    }

    figure.effect-bubba figcaption::after {
        border-right: 1px solid #fff;
        border-left: 1px solid #fff;
        -webkit-transform: scale(1,0);
        transform: scale(1,0);
    }

    figure.effect-bubba h2 {
        padding-top: 30%;
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
        -webkit-transform: translate3d(0,-20px,0);
        transform: translate3d(0,-20px,0);
    }

    figure.effect-bubba p {
        padding: 20px 2.5em;
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(0,20px,0);
        transform: translate3d(0,20px,0);
    }

    figure.effect-bubba:hover figcaption::before,
    figure.effect-bubba:hover figcaption::after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    figure.effect-bubba:hover h2,
    figure.effect-bubba:hover p {
        opacity: 1;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    /*---------------*/
    /***** Romeo *****/
    /*---------------*/

    figure.effect-romeo {
        -webkit-perspective: 1000px;
        perspective: 1000px;
    }

    figure.effect-romeo img {
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(0,0,300px);
        transform: translate3d(0,0,300px);
    }

    figure.effect-romeo:hover img {
        opacity: 0.6;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-romeo figcaption::before,
    figure.effect-romeo figcaption::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80%;
        height: 1px;
        background: #fff;
        content: '';
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(-50%,-50%,0);
        transform: translate3d(-50%,-50%,0);
    }

    figure.effect-romeo:hover figcaption::before {
        opacity: 0.5;
        -webkit-transform: translate3d(-50%,-50%,0) rotate(45deg);
        transform: translate3d(-50%,-50%,0) rotate(45deg);
    }

    figure.effect-romeo:hover figcaption::after {
        opacity: 0.5;
        -webkit-transform: translate3d(-50%,-50%,0) rotate(-45deg);
        transform: translate3d(-50%,-50%,0) rotate(-45deg);
    }

    figure.effect-romeo h2,
    figure.effect-romeo p {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
    }

    figure.effect-romeo h2 {
        -webkit-transform: translate3d(0,-50%,0) translate3d(0,-150%,0);
        transform: translate3d(0,-50%,0) translate3d(0,-150%,0);
    }

    figure.effect-romeo p {
        padding: 0.25em 2em;
        -webkit-transform: translate3d(0,-50%,0) translate3d(0,150%,0);
        transform: translate3d(0,-50%,0) translate3d(0,150%,0);
    }

    figure.effect-romeo:hover h2 {
        -webkit-transform: translate3d(0,-50%,0) translate3d(0,-100%,0);
        transform: translate3d(0,-50%,0) translate3d(0,-100%,0);
    }

    figure.effect-romeo:hover p {
        -webkit-transform: translate3d(0,-50%,0) translate3d(0,100%,0);
        transform: translate3d(0,-50%,0) translate3d(0,100%,0);
    }

    /*---------------*/
    /***** Layla *****/
    /*---------------*/

    figure.effect-layla {
        background: #18a367;
    }

    figure.effect-layla img {
        height: 390px;
    }

    figure.effect-layla figcaption {
        padding: 3em;
    }

    figure.effect-layla figcaption::before,
    figure.effect-layla figcaption::after {
        position: absolute;
        content: '';
        opacity: 0;
    }

    figure.effect-layla figcaption::before {
        top: 50px;
        right: 30px;
        bottom: 50px;
        left: 30px;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        -webkit-transform: scale(0,1);
        transform: scale(0,1);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }

    figure.effect-layla figcaption::after {
        top: 30px;
        right: 50px;
        bottom: 30px;
        left: 50px;
        border-right: 1px solid #fff;
        border-left: 1px solid #fff;
        -webkit-transform: scale(1,0);
        transform: scale(1,0);
        -webkit-transform-origin: 100% 0;
        transform-origin: 100% 0;
    }

    figure.effect-layla h2 {
        padding-top: 26%;
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
    }

    figure.effect-layla p {
        padding: 0.5em 2em;
        text-transform: none;
        opacity: 0;
        -webkit-transform: translate3d(0,-10px,0);
        transform: translate3d(0,-10px,0);
    }

    figure.effect-layla img,
    figure.effect-layla h2 {
        -webkit-transform: translate3d(0,-30px,0);
        transform: translate3d(0,-30px,0);
    }

    figure.effect-layla img,
    figure.effect-layla figcaption::before,
    figure.effect-layla figcaption::after,
    figure.effect-layla p {
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
    }

    figure.effect-layla:hover img {
        opacity: 0.7;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-layla:hover figcaption::before,
    figure.effect-layla:hover figcaption::after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    figure.effect-layla:hover h2,
    figure.effect-layla:hover p {
        opacity: 1;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-layla:hover figcaption::after,
    figure.effect-layla:hover h2,
    figure.effect-layla:hover p,
    figure.effect-layla:hover img {
        -webkit-transition-delay: 0.15s;
        transition-delay: 0.15s;
    }

    /*---------------*/
    /***** Honey *****/
    /*---------------*/

    figure.effect-honey {
        background: #4a3753;
    }

    figure.effect-honey img {
        opacity: 0.9;
        -webkit-transition: opacity 0.35s;
        transition: opacity 0.35s;
    }

    figure.effect-honey:hover img {
        opacity: 0.5;
    }

    figure.effect-honey figcaption::before {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 10px;
        background: #fff;
        content: '';
        -webkit-transform: translate3d(0,10px,0);
        transform: translate3d(0,10px,0);
    }

    figure.effect-honey h2 {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 1em 1.5em;
        width: 100%;
        text-align: left;
        -webkit-transform: translate3d(0,-30px,0);
        transform: translate3d(0,-30px,0);
    }

    figure.effect-honey h2 i {
        font-style: normal;
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(0,-30px,0);
        transform: translate3d(0,-30px,0);
    }

    figure.effect-honey figcaption::before,
    figure.effect-honey h2 {
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
    }

    figure.effect-honey:hover figcaption::before,
    figure.effect-honey:hover h2,
    figure.effect-honey:hover h2 i {
        opacity: 1;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    /*---------------*/
    /***** Oscar *****/
    /*---------------*/

    figure.effect-oscar {
        background: -webkit-linear-gradient(45deg, #22682a 0%, #9b4a1b 40%, #3a342a 100%);
        background: linear-gradient(45deg, #22682a 0%,#9b4a1b 40%,#3a342a 100%);
    }

    figure.effect-oscar img {
        opacity: 0.9;
        -webkit-transition: opacity 0.35s;
        transition: opacity 0.35s;
    }

    figure.effect-oscar figcaption {
        padding: 3em;
        background-color: rgba(58,52,42,0.7);
        -webkit-transition: background-color 0.35s;
        transition: background-color 0.35s;
    }

    figure.effect-oscar figcaption::before {
        position: absolute;
        top: 30px;
        right: 30px;
        bottom: 30px;
        left: 30px;
        border: 1px solid #fff;
        content: '';
    }

    figure.effect-oscar h2 {
        margin: 20% 0 10px 0;
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
        -webkit-transform: translate3d(0,100%,0);
        transform: translate3d(0,100%,0);
    }

    figure.effect-oscar figcaption::before,
    figure.effect-oscar p {
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    figure.effect-oscar:hover h2 {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-oscar:hover figcaption::before,
    figure.effect-oscar:hover p {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    figure.effect-oscar:hover figcaption {
        background-color: rgba(58,52,42,0);
    }

    figure.effect-oscar:hover img {
        opacity: 0.4;
    }

    /*---------------*/
    /***** Marley *****/
    /*---------------*/

    figure.effect-marley figcaption {
        text-align: right;
    }

    figure.effect-marley h2,
    figure.effect-marley p {
        position: absolute;
        right: 30px;
        left: 30px;
        padding: 10px 0;
    }


    figure.effect-marley p {
        bottom: 30px;
        line-height: 1.5;
        -webkit-transform: translate3d(0,100%,0);
        transform: translate3d(0,100%,0);
    }

    figure.effect-marley h2 {
        top: 30px;
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
        -webkit-transform: translate3d(0,20px,0);
        transform: translate3d(0,20px,0);
    }

    figure.effect-marley:hover h2 {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-marley h2::after {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 4px;
        background: #fff;
        content: '';
        -webkit-transform: translate3d(0,40px,0);
        transform: translate3d(0,40px,0);
    }

    figure.effect-marley h2::after,
    figure.effect-marley p {
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
    }

    figure.effect-marley:hover h2::after,
    figure.effect-marley:hover p {
        opacity: 1;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    /*---------------*/
    /***** Ruby *****/
    /*---------------*/

    figure.effect-ruby {
        background-color: #17819c;
    }

    figure.effect-ruby img {
        opacity: 0.7;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: scale(1.15);
        transform: scale(1.15);
    }

    figure.effect-ruby:hover img {
        opacity: 0.5;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    figure.effect-ruby h2 {
        margin-top: 20%;
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
        -webkit-transform: translate3d(0,20px,0);
        transform: translate3d(0,20px,0);
    }

    figure.effect-ruby p {
        margin: 1em 0 0;
        padding: 3em;
        border: 1px solid #fff;
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(0,20px,0) scale(1.1);
        transform: translate3d(0,20px,0) scale(1.1);
    }

    figure.effect-ruby:hover h2 {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-ruby:hover p {
        opacity: 1;
        -webkit-transform: translate3d(0,0,0) scale(1);
        transform: translate3d(0,0,0) scale(1);
    }

    /*---------------*/
    /***** Milo *****/
    /*---------------*/

    figure.effect-milo {
        background: #2e5d5a;
    }

    figure.effect-milo img {
        max-width: none;
        width: -webkit-calc(100% + 60px);
        width: calc(100% + 60px);
        opacity: 1;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(-30px,0,0) scale(1.12);
        transform: translate3d(-30px,0,0) scale(1.12);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    figure.effect-milo:hover img {
        opacity: 0.5;
        -webkit-transform: translate3d(0,0,0) scale(1);
        transform: translate3d(0,0,0) scale(1);
    }

    figure.effect-milo h2 {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 1em 1.2em;
    }

    figure.effect-milo p {
        padding: 0 10px 0 0;
        width: 50%;
        border-right: 1px solid #fff;
        text-align: right;
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(-40px,0,0);
        transform: translate3d(-40px,0,0);
    }

    figure.effect-milo:hover p {
        opacity: 1;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    /*---------------*/
    /***** Dexter *****/
    /*---------------*/

    figure.effect-dexter {
        background: -webkit-linear-gradient(top, rgba(37,141,200,1) 0%, rgba(104,60,19,1) 100%);
        background: linear-gradient(to bottom, rgba(37,141,200,1) 0%,rgba(104,60,19,1) 100%);
    }

    figure.effect-dexter img {
        -webkit-transition: opacity 0.35s;
        transition: opacity 0.35s;
    }

    figure.effect-dexter:hover img {
        opacity: 0.4;
    }

    figure.effect-dexter figcaption::after {
        position: absolute;
        right: 30px;
        bottom: 30px;
        left: 30px;
        height: -webkit-calc(50% - 30px);
        height: calc(50% - 30px);
        border: 7px solid #fff;
        content: '';
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0);
    }

    figure.effect-dexter:hover figcaption::after {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-dexter figcaption {
        padding: 3em;
        text-align: left;
    }

    figure.effect-dexter p {
        position: absolute;
        right: 60px;
        bottom: 60px;
        left: 60px;
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(0,-100px,0);
        transform: translate3d(0,-100px,0);
    }

    figure.effect-dexter:hover p {
        opacity: 1;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    /*---------------*/
    /***** Sarah *****/
    /*---------------*/

    figure.effect-sarah {
        background: #42b078;
    }

    figure.effect-sarah img {
        max-width: none;
        width: -webkit-calc(100% + 20px);
        width: calc(100% + 20px);
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(-10px,0,0);
        transform: translate3d(-10px,0,0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    figure.effect-sarah:hover img {
        opacity: 0.4;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-sarah figcaption {
        text-align: left;
    }

    figure.effect-sarah h2 {
        position: relative;
        overflow: hidden;
        padding: 0.5em 0;
    }

    figure.effect-sarah h2::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: #fff;
        content: '';
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
        -webkit-transform: translate3d(-100%,0,0);
        transform: translate3d(-100%,0,0);
    }

    figure.effect-sarah:hover h2::after {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-sarah p {
        padding: 1em 0;
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: translate3d(100%,0,0);
        transform: translate3d(100%,0,0);
    }

    figure.effect-sarah:hover p {
        opacity: 1;
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    /*---------------*/
    /***** Zoe *****/
    /*---------------*/

    figure.effect-zoe figcaption {
        top: auto;
        bottom: 0;
        padding: 1em;
        height: 3.75em;
        background: #fff;
        color: #3c4a50;
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
        -webkit-transform: translate3d(0,100%,0);
        transform: translate3d(0,100%,0);
    }

    figure.effect-zoe h2 {
        float: left;
    }

    figure.effect-zoe p.icon-links a {
        float: right;
        color: #3c4a50;
        font-size: 1.4em;
    }

    figure.effect-zoe:hover p.icon-links a:hover,
    figure.effect-zoe:hover p.icon-links a:focus {
        color: #252d31;
    }

    figure.effect-zoe p.description {
        position: absolute;
        bottom: 8em;
        padding: 2em;
        color: #fff;
        text-transform: none;
        font-size: 90%;
        opacity: 0;
        -webkit-transition: opacity 0.35s;
        transition: opacity 0.35s;
        -webkit-backface-visibility: hidden; /* Fix for Chrome 37.0.2062.120 (Mac) */
    }

    figure.effect-zoe h2,
    figure.effect-zoe p.icon-links a {
        -webkit-transition: -webkit-transform 0.35s;
        transition: transform 0.35s;
        -webkit-transform: translate3d(0,200%,0);
        transform: translate3d(0,200%,0);
    }

    figure.effect-zoe p.icon-links a span::before {
        display: inline-block;
        padding: 8px 10px;
        font-family: 'feathericons';
        speak: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-eye::before {
        content: '\e000';
    }

    .icon-paper-clip::before {
        content: '\e001';
    }

    .icon-heart::before {
        content: '\e024';
    }

    figure.effect-zoe h2 {
        display: inline-block;
    }

    figure.effect-zoe:hover p.description {
        opacity: 1;
    }

    figure.effect-zoe:hover figcaption,
    figure.effect-zoe:hover h2,
    figure.effect-zoe:hover p.icon-links a {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }

    figure.effect-zoe:hover h2 {
        -webkit-transition-delay: 0.05s;
        transition-delay: 0.05s;
    }

    figure.effect-zoe:hover p.icon-links a:nth-child(3) {
        -webkit-transition-delay: 0.1s;
        transition-delay: 0.1s;
    }

    figure.effect-zoe:hover p.icon-links a:nth-child(2) {
        -webkit-transition-delay: 0.15s;
        transition-delay: 0.15s;
    }

    figure.effect-zoe:hover p.icon-links a:first-child {
        -webkit-transition-delay: 0.2s;
        transition-delay: 0.2s;
    }

    /*---------------*/
    /***** Chico *****/
    /*---------------*/

    figure.effect-chico img {
        opacity: 0.7;
        width: 100%;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: scale(1.12);
        transform: scale(1.12);
    }

    figure.effect-chico:hover img {
        opacity: 0.3;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    figure.effect-chico figcaption {
        padding: 3em;
    }

    figure.effect-chico figcaption::before {
        position: absolute;
        top: 30px;
        right: 30px;
        bottom: 10px;
        left: 30px;
        border: 1px solid #fff;
        content: '';
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    figure.effect-chico figcaption::before,
    figure.effect-chico p {
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
    }

    figure.effect-chico h2 {
        padding: 20% 0 20px 0;
    }

    figure.effect-chico p {

        margin: 0 auto;
        max-width: 200px;
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
    }

    figure.effect-chico:hover figcaption::before,
    figure.effect-chico:hover p {

        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    @media screen and (max-width: 50em) {
        .content {
            padding: 0 10px;
            text-align: center;
        }
        .grid figure {
            display: inline-block;
            float: none;
            margin: 10px auto;
            width: 100%;
        }
    }








    /*  ------------------------------------------------------------------------------   */
    #c {
        width: 316px;
        margin-top:20px;

        background: #fff;
        /*border: 1px solid #eee;
        border-top-width: 2px;*/
    }
    i {
        font-style: normal;
    }
    h1 {
        margin-top: 0;
        font-size: 3.4rem;
        font-weight: 300;
    }
    h1 b {
        font-weight: 500;
    }
    input {
        padding: 5px 10px;
    }

    table td {
        /*border: 1px solid #ddd;*/
        padding: 5px;
        text-align: center;
        vertical-align: middle;
    }
    table td:hover i {
        background: #eee;
    }
    table td:active i {
        transition: none;
        transform: scale(0.95);
    }
    table td i {
        font-style: normal;
    }
    table td i {
        display: inline-block;
        position: relative;
        width: 34px;
        height: 34px;
        line-height: 34px;
        border-radius: 50%;
        transition: all .2s ease;
    }
    table thead td {
        background: #eee;
        text-transform: uppercase;
        font-size: 1.2rem;
        font-weight: 300;
    }
    .sel1,
    .sel2,
    .range {
        color: #fff;
    }
    table td.range i {
        background: lightcoral;
    }
    table td.sel1 i {
        background: #ff66bb;
    }
    table td.sel2 i {
        background: #66ccff;
    }
    .sel1 i,
    .sel2 i {
        animation: bounce 0.2s ease-in-out 1;
    }
    @keyframes bounce {
        0% {
            transform: translateY(0);
        }
        20% {
            transform: translateY(-5px);
        }
        50% {
            transform: translateY(5px);
        }
        100% {
            transform: translateY(0px);
        }
    }
    td.disabled,
    td.notCurMonth {
        color: #ddd;
        font-size: 1.2rem;
    }
    h1 {
        margin: 0 0 30px;
    }
    p.sub {
        margin: -20px 0 60px;
        font-size: 1.6rem;
        font-weight: 300;
        line-height: 140%;
    }
    p.sub i {
        font-size: 1.2rem;
        text-transform: uppercase;
        color: #ff66bb;
        font-weight: 700;
        line-height: 140%;
    }
    #disp {
        position: relative;
        text-transform: uppercase;
        text-align: center;
        height: 60px;
        line-height: 60px;
        font-size: 1.8rem;
        background: lightblue !important;
        color: #fff;
        -moz-user-select: none;
        /* Firefox */
        -ms-user-select: none;
        /* Internet Explorer */
        -khtml-user-select: none;
        /* KHTML browsers (e.g. Konqueror) */
        -webkit-user-select: none;
        /* Chrome, Safari, and Opera */
        -webkit-touch-callout: none;
        /* Disable Android and iOS callouts*/
        user-select: none;
        touch-callout: none;
    }
    #month {
        display: inline;
        font-weight: 300;
    }
    #disp .nav {
        color: #fff;
        float: right;
        width: 15%;
        cursor: pointer;
        font-size: 2.9rem;
        width: 40px;
        height: 40px;
        line-height: 36px;
        border-radius: 50%;
        margin: 10px 10px 0 0;
    }
    #disp #prev {
        float: left;
        margin-right: 0;
        margin-left: 10px;
    }
    #disp .nav:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    #disp .nav:active {
        transform: scale(0.9);
    }
    .nav.disabled {
        opacity: .5;
    }
    #out1,
    #out2 {
        color: #aaa;
        font-size: 1.3rem;
        text-transform: uppercase;
    }
    /* SELECT HELPER */
    #calHelp {
        font-weight: 400;
        font-size: 1.2rem;
        text-transform: uppercase;
    }
    #calHelp div {
        display: inline-block;
        width: 50%;
        margin: 0 0 20px;
    }
    #calHelp div.first {
        width: auto;
        padding: 0 10px 0 0;
    }
    #calHelp b {
        font-weight: 400;
    }
    #calHelp i {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 0 3px 0 0;
        background: #333333;
        color: #ffffff;
        border-radius: 50%;
    }
    #calHelp .active i {
        background: lightgrey;
    }
    #calHelp .disabled {
        opacity: .3;
    }
    .log h4 {
        margin: 20px 0 0;
        font-weight: 500;
    }
    .log {
        font-size: 1.2rem;
        line-height: 150%;
        color: #aaa;
        margin-top: 30px;
    }
    .log p {
        margin-top: 0;
    }






</style>
