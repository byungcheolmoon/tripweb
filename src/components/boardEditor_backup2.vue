<!-- 일반 글 작성에 썸네일까지 있는 형태 -->
<template>
    <div>
        <v-container style="width: 850px !important;">
            <bread-custom></bread-custom>
            <v-layout style="border-top:solid 1px lightgray" class="pt-4">
                <v-flex xs5 >
                    <v-card v-if="this.titleImgCheck == true">
                        <v-img class="white--text" height="200px" :src="this.titleImg" >
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline">{{this.writetest.text}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                        <v-card-title>
                            <div>
                                <span class="grey--text">{{this.subtitle}}</span><br>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat color="orange" @click="imgdel">DELETE</v-btn>
                        </v-card-actions>
                    </v-card>
                    <div class="filebox pt-2">
                        <label for="thfile">섬네일올리기</label>
                        <input style="width: 200px" ref="photofile" type="file" id="thfile" name='uploadedfile' placeholder="섬네일이미지"/>
                    </div>
                </v-flex>

                <v-flex xs7 class="pa-3">

                    <v-text-field
                            label="타이틀"
                            flat
                            v-model="writetest.text"
                            background-color="#ffffff"
                            height="60px"
                    ></v-text-field>

                    <v-text-field
                            label="서브타이틀"
                            flat
                            v-model="subtitle"
                            background-color="#ffffff"
                            height="30px"
                    ></v-text-field>

                    <v-combobox
                            v-model="select"
                            :items="proditems"
                            :rules="[v => !!v || 'Item is required']"
                            label="소분류 선택해주세요."

                            chips
                            @input="itemschange"
                    ></v-combobox>

                </v-flex>
            </v-layout>

            <v-divider class="mb-5 mt-3" light></v-divider>

            <div id="boardheight">
                <vue-editor id="editor"
                            useCustomImageHandler
                            @imageAdded="handleImageAdded"
                            :customModules="customModulesForEditor"
                            :editorOptions="editorSettings"
                            v-model="editorcontent">
                </vue-editor>
                <v-btn block @click="clicks"  :disabled="!valid" color="secondary" block> submit </v-btn>
            </div>
            <br>

        </v-container>
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";
    import { ImageDrop } from "quill-image-drop-module";
    import ImageResize from "quill-image-resize-module";

    import { mapState } from "vuex";
    import Constant from "../Constant";
    import CONF from "../Config";
    import axios from 'axios';

    import BreadCustom from './breadcrumbsCu'


    export default {
        name: "board-list",
        props: ['mode', 'type', 'idx'],
        components:{
            VueEditor, BreadCustom
        },
        data() {
            return {
                editorcontent: '',
                customToolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['image', 'code-block']
                ],
                customModulesForEditor: [
                    { alias: "imageDrop", module: ImageDrop },
                    { alias: "imageResize", module: ImageResize }
                ],
                editorSettings: {
                    modules: {
                        imageDrop: true,
                        imageResize: {},
                    }
                },
                localmode : '',
                boardTitle:'',
                writetest : {text:''},
                subtitle : '',
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
            this.localmode     = this.mode;

             if(this.idx){
                 this.getBoardApi()
                     .then(data => {
                         this.writetest.text = data.title
                         this.subtitle = data.subtitle
                         this.select = data.cate_sub
                         this.titleImg = data.img
                         this.editorcontent = data.content
                         if(data.img != 'none'){
                             this.titleImgCheck = true;
                         } else {
                             this.titleImgCheck = false;
                         }
                     })

             }
        },
        methods: {
            handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
                let formData = new FormData();
                formData.append('image', file);
                formData.append('cmd', '2000');
                 this.loading = true
                 axios.post(CONF.BOARD_INFO, formData)
                     .then((response)=>{
                         this.loading = false
                         Editor.insertEmbed(cursorLocation, "image", response.data);
                         resetUploader();
                     })
            },
            clicks() {
                console.log(this.editorcontent)
              /*  var title = this.writetest.text;
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
                        let content = this.editorcontent;
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
                        let content = this.editorcontent;
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
                }*/


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
                            var subtitle = response.data.info.subtitle
                            var content = response.data.info.content
                            var img     = response.data.info.img
                            var cate     = response.data.info.cate
                            var cate_sub     = response.data.info.cate_sub
                            setTimeout(() => {
                                this.loading = false
                                resolve({
                                    title,
                                    subtitle,
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
    .filebox label { display: inline-block; padding: .5em .60em; color: #999; font-size: inherit; line-height: normal; vertical-align: middle; background-color: #fdfdfd; cursor: pointer; }
    #boardheight{
        min-height:800px;
    }
</style>
