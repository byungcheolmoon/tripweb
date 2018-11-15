<template>
    <div>
        <v-layout>
            <v-btn @click="submit" color="secondary" block> submit </v-btn>
            <v-flex >
                <v-textarea
                        background-color="#ffffff"
                        auto-grow
                        v-model="localcontacts.title"
                ></v-textarea>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Constant from "../Constant";
    import CONF from "../Config";
    import axios from 'axios';
    import { mapState } from "vuex";
    /*content: "콘텐츠"        idx: "14"        img_count: "3"        set1: "구성품"        set2: "렌탈비"        title: (...)        url: (...)*/

    export default {
        name: "admin-prod-detail-step2",
        props: ['no', 'mode'],
        data: function(){
            return {
                localcontacts : { idx:'', title:'123', content:'',set1:'', set2:'', url:'' },
                localimgs :[],
                prodtitle:''
            }
        },
        // created: function () {
        //   vm.$force
        // },

        methods:{
            submit () {
                console.log(this.localcontacts.title);
            },
            /*imgCheck(value){
                console.log(value)
                return true
            }*/
        }
    }
</script>

<style lang="sass" scoped>
    #example-custom-transition
        .fade
            &-enter-active, &-leave-active, &-leave-to
                transition: .3s ease-out
                position: absolute
                top: 0
                left: 0

            &-enter, &-leave, &-leave-to
                opacity: 0
</style>