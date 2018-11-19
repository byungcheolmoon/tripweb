<template>
    <div class="moons_background" :style="{ 'background-image': 'url(' + tourbg + ')' }">
        {{this.tourbg}}
    </div>
</template>

<script>
    export default {
        name: "tour_assets-background-top",
        data: () => ({
            tourbg :'http://nawara-fish.com/web/trip/images/tour_top_back.jpg'
        }),
    }
</script>

<style scoped>
    .moons_background {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        margin-bottom: 300px;
        width: 100%;
        z-index: 0;
        margin-top: -50px;
        height: 400px;
        opacity: 1;
        position: absolute;
        top:-14px;
    }
</style>