<template>
    <div>
        <v-container>
           <bread-custom></bread-custom>


                <v-text-field
                        label="제목"
                        flat
                        v-model="writetest.text"
                        single-line
                        background-color="#ffffff"
                        height="60px"
                ></v-text-field>

                <v-combobox
                        v-model="select"
                        :items="proditems"
                        :rules="[v => !!v || 'Item is required']"
                        label="소분류 선택해주세요."

                        chips
                        @input="itemschange"
                ></v-combobox>
            <v-flex  xs12 sm4 offset-sm4  d-flex v-if="this.titleImgCheck == true">
                <v-card>
                    <v-img
                            class="white--text"
                            height="400px"
                            :src="this.titleImg"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline">TITLE SAMPLE</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                    <v-card-title>
                        <div>
                            <span class="grey--text">Number 10</span><br>
                            <span>Whitehaven Beach</span><br>
                            <span>Whitsunday Island, Whitsunday Islands</span>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="orange" @click="imgdel">DELETE</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
                <input ref="photofile" type="file" name='uploadedfile' class="pa-3"/>
                <v-divider light></v-divider>
                <br>


            <div id="boardheight">
                <div id="editor1"></div>
            </div>
            <br>

            <v-btn block @click="clicks"  :disabled="!valid" color="secondary" block> submit </v-btn>



        </v-container>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import Constant from "../Constant";
    import CONF from "../Config";
    import axios from 'axios';
    import { createEditor } from 'vueditor'
    import 'vueditor/dist/style/vueditor.min.css'
    import BreadCustom from './breadcrumbsCu'

    var inst;

    export default {

        name: "board-list",
        props: ['mode', 'type', 'idx'],
        components:{
            BreadCustom
        },
        data: function() {
            return {
                localmode : '',
                boardTitle:'',
                writetest : {text:''},
                valid: true,
                tags: {},
                select: null,
                proditems:[],
                titleImg: '',
                titleImgCheck: false
            }
        },
        created(){
            this.getDataApi()
                .then(data => {
                    this.proditems = data.items
                })
        },
        computed:{
            ...mapState({
                currentview : state => state.board.currentview
            }),
        },
        mounted(){
            this.localmode = this.mode;

            // console.log(this.currentview)
            // console.log(this.idx)

            inst = createEditor('#editor1', {
                uploadUrl: '',
                id: 'someid',
                classList: ['someclass'],
            })
            inst.upload = function (obj, callback) {
                let formData = new FormData();
                let xhr = new XMLHttpRequest();
                formData.append('image', obj.files[0]);
                formData.append('cmd', '2000');
                xhr.open('POST', 'http://nawara-fish.com/web/vueajax/board.php');
                xhr.send(formData);
                xhr.onload = function () {
                    callback(xhr.response);
                };
                xhr.onerror = function (err) {
                    console.log(err);
                }
            }

            if(this.idx){
                this.getBoardApi()
                    .then(data => {
                        this.writetest.text = data.title
                        this.select = data.cate_sub
                        inst.setContent(data.content);
                        this.titleImg = data.img
                        if(data.img != 'none'){
                            this.titleImgCheck = true;
                        } else {
                            this.titleImgCheck = false;
                        }
                    })

            }

        },
        methods: {
            clicks() {
                var title = this.writetest.text;
                var tag   = this.select;
                var file = this.$refs.photofile.files[0];
                var cCate = this.currentview;
                var subidx;
                var subMode;
                if(this.mode == 'add'){
                    subMode = '3000';
                    subidx = '0';
                } else if(this.mode == 'edit'){
                    subMode = '3001';
                    subidx = this.idx;
                }
                if(file){
                    setTimeout(function() {
                        let content = inst.getContent();
                        var data = new FormData();
                        data.append('cmd', subMode);
                        data.append('idx', subidx);
                        data.append('uploadedfile', file);
                        data.append('title', title);
                        data.append('cate_sub', tag);
                        data.append('content', content);
                        data.append('cate', cCate);
                        axios.post(CONF.BOARD_INFO, data)
                            .then((response)=>{
                                this.loading = false
                                console.log(response);
                            })
                    }, 1000);
                } else {
                    setTimeout(function() {
                        let content = inst.getContent();
                        var data = new FormData();
                        data.append('cmd', subMode);
                        data.append('idx', subidx);
                        data.append('title', title);
                        data.append('cate_sub', tag);
                        data.append('content', content);
                        data.append('cate', cCate);
                        axios.post(CONF.BOARD_INFO, data)
                            .then((response)=>{
                                this.loading = false
                                console.log(response);
                            })
                    }, 1000);
                }


            },
            imgdel(){
                this.titleImgCheck = false
                var data = new FormData();
                data.append('cmd', '5000');
                data.append('idx', this.idx)
                axios.post(CONF.BOARD_INFO, data)
                    .then(()=>{})
            },
            itemschange(e){
                this.tags = this.select
            },
            getDataApi () {
                this.loading = true
                return new Promise((resolve, reject) => {
                    var data = new FormData();
                    data.append('cmd', '2003');
                    data.append('boardtype', this.currentview)

                    axios.post(CONF.BOARD_INFO, data)
                        .then((response)=>{
                            var items = response.data
                            setTimeout(() => {
                                this.loading = false
                                resolve({
                                    items
                                })
                            }, 200)
                        })
                })
            },

            getBoardApi () {
                this.loading = true
                return new Promise((resolve, reject) => {
                    var data = new FormData();
                    data.append('cmd', '2002');
                    data.append('idx', this.idx);

                    axios.post(CONF.BOARD_INFO, data)
                        .then((response)=>{
                            var title = response.data.info.title
                            var content = response.data.info.content
                            var img     = response.data.info.img
                            var cate     = response.data.info.cate
                            var cate_sub     = response.data.info.cate_sub
                            setTimeout(() => {
                                this.loading = false
                                resolve({
                                    title,
                                    content,
                                    img,
                                    cate,
                                    cate_sub
                                })
                            }, 200)
                        })
                })
            },
        }
    };
</script>
<style scoped>
    #boardheight{
        height:450px;
    }
</style>
