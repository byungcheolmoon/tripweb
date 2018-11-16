<template>
    <div>
        <!-- <swiper-top class="hidden-sm-and-down"></swiper-top> -->
        <swp></swp>
        <!--<v-carousel hide-delimiters >
          <v-carousel-item
                  v-for="(item,i) in items"
                  :key="i"
                  :src="item.src"
          ></v-carousel-item>
        </v-carousel>-->

        <v-content>
            <main-content-one />
        </v-content>
    </div>

</template>

<script>
    import mainContentOne from "./mainContentOne";
    import swp from "./SwiperMoon";
    // import SwiperTop from "./SwiperTop";



    import axios from 'axios';

    export default {
        name: "maincontent",
        components: {
            mainContentOne,
            swp
        },
        data () {
            return {
                htmlForEditor: "<h1>Some initial content</h1>",
                items: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                    }
                ]
            }
        },
        methods: {
        }
    };
</script>
<style scoped>
    #editor{
        width:720px;
    }
</style>
