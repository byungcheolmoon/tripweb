<template>
    <top-background></top-background>
</template>

<script>
    import eventBus from "../EventBus"
    import TopBackground from "./Tour_assetsBackgroundTop";

    export default {
        name: "tour-step1",
        components: {
            TopBackground
        },
        props : ['cate'],
        created(){
            eventBus.$emit('topNavCheck' , true)
        },
    }
</script>

<style scoped>

</style>