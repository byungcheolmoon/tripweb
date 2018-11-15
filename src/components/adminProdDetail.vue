<template>
    <div>
        <v-tabs
                slot="extension"
                v-model="tabs"
                fixed-tabs
                color="transparent"
        >
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-bind:to="{ name :'titleedit', params: { no : this.no } }" class="primary--text">

                <p>step1</p>
            </v-tab>
            <v-tab v-bind:to="{ name :'detailedit', params: { no : this.no, mode:'edit' } }" class="primary--text">
                <p>step2</p>
            </v-tab>
        </v-tabs>
        <br>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "admin-prod-detail",
        props: ["no"],
        data () {
            return {
                tabs: null,
            }
        },
        mounted(){
            this.$store.commit({
                type:'prodModeUpdate',
                mode:'edit'
            })

        },
    }
</script>

<style scoped>

</style>