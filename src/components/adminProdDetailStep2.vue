<template>
    <div>
        <v-layout>
            <v-flex xs3 offset-xs3>
                <v-card>
                    <v-carousel style="height:400px;">
                        <v-carousel-item v-for="(img, i) in localimgs" :key="i" v-if="img != 'none'" :src="img" interval="3000" cycle='true' reverse-transition="fade" transition="fade" style="height:400px;">
                        </v-carousel-item>
                    </v-carousel>

                    <v-card-title primary-title>
                        <v-container fluid style="padding-left:0; padding-right:0">
                                <v-flex >
                                    <h5 style="font-size:1.2em; color:dodgerblue;">{{ this.localcontacts.title}}</h5>
                                    <br>
                                </v-flex>

                                <v-flex >
                                    <v-chip label color="blue" text-color="white" > 설명 </v-chip>
                                    <v-textarea
                                            readonly
                                            outline
                                            auto-grow
                                            v-model="this.localcontacts.content"
                                    ></v-textarea>
                                </v-flex>
                            <v-flex>
                                <v-chip label color="blue" text-color="white" > 구성품 </v-chip>
                                <v-textarea
                                        readonly
                                        outline
                                        auto-grow
                                        v-model="this.localcontacts.set1"
                                ></v-textarea>
                            </v-flex>
                            <v-flex>
                                <v-chip label color="blue" text-color="white" > 렌탈 비용 </v-chip>
                                <v-textarea
                                        readonly
                                        outline
                                        auto-grow
                                        v-model="this.localcontacts.set2"
                                ></v-textarea>
                            </v-flex>
                        </v-container>
                    </v-card-title>

                    <v-divider light></v-divider>
                    <v-card-actions class="pa-3">
                    </v-card-actions>
                </v-card>
            </v-flex>


            <v-flex xs3 class="pa-3">

                <v-layout>
                    <v-flex xs12 >
                        <v-card>
                            <v-container grid-list-sm fluid>
                                <v-layout row wrap>
                                    <v-flex v-for="(img, i, z) in localimgs" :key="i" xs4 d-flex >
                                        <v-card flat tile class="d-flex" >
                                            <v-img :src="img"  v-if="img != 'none'" aspect-ratio="1" class="grey lighten-2" @click="imgChange(z + 1)">
                                                <v-layout
                                                        slot="placeholder"
                                                        fill-height
                                                        align-center
                                                        justify-center
                                                        ma-0
                                                >
                                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                </v-layout>
                                            </v-img>
                                            <v-img src="http://nawara-fish.com/prc/img/noimg.png"  v-else aspect-ratio="1" class="grey lighten-2" @click="imgChange(z + 1)">
                                                <v-layout
                                                        slot="placeholder"
                                                        fill-height
                                                        align-center
                                                        justify-center
                                                        ma-0
                                                >
                                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                </v-layout>
                                            </v-img>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>

                <v-form ref="form" lazy-validation>
                    <v-container fluid style="padding-left:0; padding-right:0">
                        <v-flex >
                            <v-textarea
                                    background-color="#ffffff"
                                    auto-grow
                                    v-model="localcontacts.title"
                            ></v-textarea>
                        </v-flex>

                        <v-flex >
                            <v-chip label color="blue" text-color="white" > 설명 </v-chip>
                            <v-textarea
                                    background-color="#ffffff"
                                    auto-grow
                                    v-model="localcontacts.content"
                            ></v-textarea>
                        </v-flex>
                        <v-flex>
                            <v-chip label color="blue" text-color="white" > 구성품 </v-chip>
                            <v-textarea
                                    background-color="#ffffff"
                                    auto-grow
                                    v-model="localcontacts.set1"
                            ></v-textarea>
                        </v-flex>
                        <v-flex>
                            <v-chip label color="blue" text-color="white" > 렌탈 비용 </v-chip>
                            <v-textarea
                                    background-color="#ffffff"
                                    auto-grow
                                    v-model="localcontacts.set2"
                            ></v-textarea>
                        </v-flex>
                        <v-flex>
                            <v-chip label color="blue" text-color="white" > url </v-chip>
                            <v-textarea
                                    background-color="#ffffff"
                                    auto-grow
                                    v-model="localcontacts.url"
                            ></v-textarea>
                        </v-flex>
                    </v-container>
                    <!--<input ref="photofile" type="file" name='uploadedfile' class="pa-3"/>-->
                    <v-divider light></v-divider>
                    <br>
                    <v-btn @click="submit" color="secondary" block> submit </v-btn>

                </v-form>
            </v-flex>
        </v-layout>
        <router-view></router-view>
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
                localcontacts : { idx:'', title:'', content:'',set1:'', set2:'', url:'' },
                localimgs :[],
                prodtitle:''
            }
        },
        // created: function () {
        //   vm.$force
        // },
        computed:{
            ...mapState({
                contacts: state => state.admin.prodContactsDetail,
                imgs: state => state.admin.prodContactDetailImgs,
                prodmode: state => state.admin.prodMode
            }),
        },
        mounted(){

            this.$store.dispatch(Constant.PRODUCT_CONTACT_FETCH_DETAIL, { no: this.no })

        },
        watch:{
            imgs:function (newImg) {
                this.localimgs = newImg
            },
            contacts:function(newContacts){
                this.localcontacts = {...newContacts}
            }



        },
        methods:{
            submit () {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch(Constant.PRODUCT_CONTACT_FETCH_DETAIL_EDIT,
                        {
                            idx:this.localcontacts.idx,
                             title : this.localcontacts.title,
                            content: this.localcontacts.content,
                            set1: this.localcontacts.set1,
                            set2: this.localcontacts.set2,
                            url: this.localcontacts.url,
                        });
                }
            },
            imgChange(value){
                if(this.prodmode == "add"){
                    this.$router.push({ name: 'addUpdatePhoto', params: { imgno: value, idx: this.localcontacts.idx  } })

                } else {
                    this.$router.push({ name: 'updatephoto', params: { imgno: value, idx: this.localcontacts.idx  } })
                }
            }
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