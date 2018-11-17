<template>
    <div>
        <swp></swp>
        <v-content>
            <main-content-one/>
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
