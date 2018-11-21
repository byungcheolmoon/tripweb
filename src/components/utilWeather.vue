<template>
    <div >
        <vue-weather-widget
                api-key="87e2e5572d53ff09e99c5e042c3305d7"
                :title="this.weathertitle"
                latitude="24.886436"
                longitude="91.880722"
                language="en"
                units="us">
        </vue-weather-widget>
    </div>
</template>

<script>
    import VueWeatherWidget from 'vue-weather-widget';
    import 'vue-weather-widget/dist/css/vue-weather-widget.css';
    export default {
        name: "util-weather",
        props:['titles'],
        data: () => ({
            weathertitle :''
        }),
        created(){
          // 서버를 통해 해당 데이터를 가져와 넣는다.
            switch (this.titles){
                case 'vietnam':
                    return this.weathertitle= '베트남(Vietnam)';
                case 'guam':
                    return this.weathertitle= '괌(Guam)';
                case 'thailand':
                    return this.weathertitle= '태국(Thailand)';
                default :
                    return this.weathertitle= 'Weather';
            }
        },
        components: {
          VueWeatherWidget
        },
    }
</script>

<style scoped>

</style>