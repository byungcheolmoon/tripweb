<template>
    <div>
        <v-layout>
            <v-flex xs3 offset-xs3>
                <v-card>
                    <v-img
                            :src="this.imgs"
                            aspect-ratio="1.75"
                    ></v-img>

                    <v-card-title primary-title>
                        <div style="width: 100%">
                            <v-layout  row warp  >
                                <v-flex xs6>
                                    <v-card tile flat text-xs-left>
                                        <v-card-text class="headline" >{{ this.titlecontact.prod_name}}</v-card-text>
                                    </v-card>
                                </v-flex>
                                <v-flex xs6>
                                    <v-card flat  style="text-align: right; height:100%" >
                                        <v-card-text class="headline" style="font-size:1.4em !important; vertical-alignheight:100%; vertical-align: middle" >
                                            {{ this.titlecontact.prod_paytext}}
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                            <!--<div>Located two hours south of Sydney in the Southern Highlands of New South Wales, ...</div>-->
                        </div>
                    </v-card-title>
                    <v-divider light></v-divider>
                    <v-card-actions class="pa-3">
                        <v-chip v-for="tag in this.tags"  :key="tag">{{ tag }} </v-chip>

                    </v-card-actions>
                    <v-divider light></v-divider>
                    <v-card-actions class="pa-3">
                        <v-chip label color="pink" text-color="white" >
                            <v-icon left>label</v-icon> {{ this.titlecontact.prod_wdate}}
                        </v-chip>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs3 class="pa-3">
                <v-form ref="form" lazy-validation>

                    <v-text-field
                            v-model="prodtitle"
                            label="상품명"
                            :rules="titleRules"
                            required
                            @input="titlechange"
                    ></v-text-field>
                    <v-text-field
                            v-model="prodprice"
                            label="가격"
                            :rules="priceRules"
                            required
                            @input="pricechange"
                    ></v-text-field>
                    <v-combobox
                            v-model="select"
                            :items="proditems"
                            :rules="[v => !!v || 'Item is required']"
                            label="대상어종"
                            multiple
                            chips
                            @input="itemschange"
                    ></v-combobox>
                    <input ref="photofile" type="file" name='uploadedfile' class="pa-3"/>
                    <v-divider light></v-divider>
                    <br>
                    <v-btn @click="submit"  :disabled="!valid" color="secondary" block> submit </v-btn>

                </v-form>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
    import Constant from "../Constant";
    import CONF from "../Config";
    import axios from 'axios';
    import { mapState } from "vuex";
    import eventBus from '../EventBus';
    /*content: "콘텐츠"        idx: "14"        img_count: "3"        set1: "구성품"        set2: "렌탈비"        title: (...)        url: (...)*/

    export default {
        name: "admin-prod-detail-step1",
        props: ["no"],
        data: function(){
            return {
                valid: true,
                modebtn: true,
                mode:'',
                titlecontact:[],
                detailcontacts:[],
                detailimages:[],
                imgs: '',
                tags: {},
                prodidx:'',
                prodtitle:'',
                prodprice:'',
                select: null,
                proditems:['우럭','빙어','농어','갑오징어','쭈꾸미','배스','고등어','삼치','장어','감성돔', '놀래미', '광어'],
                titleRules: [
                    v => !!v || 'Title is required',
                ],
                priceRules:[
                    v => !!v || 'Price is required',
                ]
            }
        },
        // created: function () {
        //   vm.$force
        // },
        computed:{
            ...mapState({
                storeTitleContact: state => state.admin.prodFetchOne,
                storeImgOne: state => state.admin.prodContactImg
            }),

        },
        mounted(){
            if(this.no == "new"){
                this.mode = 'add'
            } else {
                this.mode = 'edit'
                this.$store.dispatch(Constant.PRODUCT_CONTACT_FETCH_ONE, { no: this.no })


                this.titlecontact = this.storeTitleContact;
                this.imgs = "http://nawara-fish.com/prc/img/"+this.storeImgOne

                var tags = this.titlecontact.prod_fishtype;
                let tagsArr = tags.split(',');
                this.tags = tagsArr;
                this.prodtitle = this.titlecontact.prod_name
                this.prodprice = this.titlecontact.prod_paytext
                this.select = this.tags
                this.prodidx = this.titlecontact.idx

                var Params = new URLSearchParams();
                Params.append('cmd', '2001');
                Params.append('no', this.no);
                axios.post(CONF.PRODUCT_INFO, Params)
                    .then((response)=>{
                        this.detailcontacts = response.data.contacts;
                        this.detailimages = response.data.images;
                    })
            }

        },
        watch:{
            storeTitleContact: function (newStoreTitleContact) {
                this.titlecontact = {...newStoreTitleContact}
                this.imgs = "http://nawara-fish.com/prc/img/" + {...newStoreTitleContact}.prod_img
            },
            storeImgOne: function (newImg) {
                this.imgs = "http://nawara-fish.com/prc/img/" + newImg
            }

        },
        methods:{
            getPic(index){
                let img = index;
                return 'http://nawara-fish.com/prc/img/' + img
            },
            submit: function () {

                if (this.$refs.form.validate()) {
                    if(this.no == "new"){
                        this.modebtn = false;
                        var file = this.$refs.photofile.files[0];
                        if(file){
                            this.valid = false;
                            this.$store.dispatch(Constant.PRODUCT_ADD,
                                {
                                    idx:this.prodidx,
                                    title:this.prodtitle,
                                    price:this.prodprice,
                                    types:this.select,
                                    file : file
                                })
                        } else {
                            alert('이미가 없으면 다음으로 진행할 수 없습니다.')
                        }
                    } else {

                        var file = this.$refs.photofile.files[0];

                        this.$store.dispatch(Constant.PRODUCT_EDIT,
                            {
                                idx:this.prodidx,
                                title:this.prodtitle,
                                price:this.prodprice,
                                types:this.select,
                                file : file
                            })
                    }
                }
            },
            titlechange(e){
                this.titlecontact.prod_name = this.prodtitle
            },
            pricechange(e){
                this.titlecontact.prod_paytext = this.prodprice
            },
            itemschange(e){
                this.tags = this.select
            }
        }
    }
</script>

<style scoped>

</style>