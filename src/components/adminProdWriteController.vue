<template>
    <div>
        <v-tabs
                slot="extension"
                v-model="tabs"
                fixed-tabs
                color="transparent"
        >
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-bind:to="{ name :'writestep1'}" class="primary--text">
                <p>step1</p>
            </v-tab>
            <v-tab v-bind:to="{ name :'writestep2', params: { no : localidx, mode: 'add' } }" class="primary--text">
                <p>step2</p>
            </v-tab>
        </v-tabs>
        <br>
        <router-view></router-view>
    </div>
</template>

<script>

    import eventBus from '../EventBus';
    import { mapState } from "vuex";

    export default {
        name: "admin-prod-detail",
        props: ["no"],
        data () {
            return {
                tabs: null,
                localidx : ''
            }
        },
        mounted(){
            this.$store.commit({
                type:'prodModeUpdate',
                mode:'add'
            })

        },
        created : function() {
            eventBus.$on('idx-check', this.idxCheck);
        },
        methods:{
            idxCheck:function (item) {
                this.localidx = item

            }
        }
    }
</script>

<style scoped>

</style>