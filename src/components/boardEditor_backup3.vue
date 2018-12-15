<template>
    <div>
        <v-container style="width: 850px !important;">
            <bread-custom></bread-custom>
            <v-layout style="border-top:solid 1px lightgray" class="pt-4">
                <v-flex xs12 class="pa-3">

                    <v-text-field
                            label="타이틀"
                            flat
                            v-model="writetest.text"
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

                    <v-combobox
                            v-model="skinselect"
                            :items="skinitems"
                            :rules="[v => !!v || 'Item is required']"
                            label="글타입 선택해주세요."
                            chips
                            :readonly="editcheck()"
                            @input="skinchange"
                    ></v-combobox>

                </v-flex>
            </v-layout>

            <v-divider class="mb-3 mt-3" light></v-divider>
                <div id="boardheight" v-if="skinselect == '중단'">
                    <vue-editor id="editor"
                                useCustomImageHandler
                                @imageAdded="handleImageAdded"
                                :customModules="customModulesForEditor"
                                :editorOptions="editorSettings"
                                v-model="editorcontent">
                    </vue-editor>
                    <v-btn block @click="clicks"  :disabled="!valid" color="secondary" block> 글 저장 </v-btn>
                </div>

        </v-container>

        <v-container v-if="skinselect == '상단'" style="width: 1400px">
            <v-layout align-center justify-center row fill-height>
                <v-flex xs7 class="pr-1" >
                    <v-tabs
                            v-model="active"
                            color="cyan"
                            dark
                            slider-color="yellow"
                    >
                        <v-tab ripple >
                            Photo
                        </v-tab>
                        <v-tab ripple >
                            Video
                        </v-tab>
                        <v-tab-item :key="1">
                            <v-carousel style="height:400px;">
                                <v-carousel-item v-for="(img, i) in localimgs" :key="i" v-if="img != 'none'" :src="img" interval="3000" cycle='true' reverse-transition="fade" transition="fade" style="height:420px;">
                                </v-carousel-item>
                            </v-carousel>
                            <!--<v-card flat :style="{ 'background-image': 'url(' + Detailbg + ')' }" id="topcardtag">
                            </v-card>-->
                        </v-tab-item>
                        <v-tab-item :key="2">
                            <v-card flat style="height:420px">
                                <youtube width="100%" height="420px" :video-id="videoId" :player-vars="playerVars" @playing="playing"></youtube>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                    <v-btn block @click="clicks"  :disabled="!valid" color="secondary" block> 글 저장 </v-btn>
                </v-flex>
                <v-flex xs5>
                    <v-layout>
                        <v-flex xs12 >
                            <v-card style="width: 400px;" class="ml-3">
                                <v-container grid-list-sm fluid >
                                    <v-layout row wrap >
                                        <v-flex v-for="(img, i, z) in localimgs" :key="i" xs4 d-flex>
                                           <v-card flat tile class="d-flex" >
                                               <v-img :src="img"  v-if="img != 'none'" aspect-ratio="1" class="grey lighten-2" @click="imgChange(z + 1, img)">
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
                                               <v-img src="http://nawara-fish.com/web/trip/src/assets/images/noimg.png"  v-else aspect-ratio="1" class="grey lighten-2" @click="imgChange(z + 1, img)">
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
                </v-flex>
            </v-layout>
        </v-container>
        <router-view></router-view>

        <v-btn @click="changetest()">변경테스트</v-btn>

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
        components:{
            VueEditor, BreadCustom
        },
        data() {
            return {
                files:[],
                mode:'',
                type:'',
                idx:'',


                localmode : '',
                boardTitle:'',
                Detailbg :'http://nawara-fish.com/web/trip/src/assets/images/tour_2_01.jpg',

                videoId: 'L1q3_XZ27N4',
                active: null,
                playerVars: {
                    autoplay: 0
                },

                // 상단, 이미지
                localimgs :{
                    img_1:'none',
                    img_2:'none',
                    img_3:'none',
                    img_4:'none',
                    img_5:'none',
                    img_6:'none',
                    img_7:'none',
                    img_8:'none',
                    img_9:'none'
                },

                // 글제목 및 내용
                writetest : {text:''},
                editorcontent: '',

                // 콤보박스 유효성 검사
                valid: true,

                // 썸네일 이미지
                titleImg: '',
                titleImgCheck: false,

                // 글 분류
                select: null,
                proditems:[],

                // 글 타입
                skintype:'2',
                skinselect:null,
                skinitems:['상단','중단','하단'],

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

            }
        },
        created(){
            if(this.$route.query){
                this.idx = this.$route.query.idx
                this.mode = this.$route.query.mode
            }
            this.localmode     = this.mode;
            this.skinselect = this.currentskin




            this.getDataApi()
                .then(data => {
                    this.proditems = data.items
                })

            if(this.idx){
                this.getBoardApi()
                    .then(data => {
                        switch (data.skin){
                            case '1' : this.skinselect = '상단'
                                break;
                            case '2' : this.skinselect = '중단'
                                break;
                            case '3' : this.skinselect = '하단'
                                break;
                            default : this.skinselect = '중단'
                        }
                        this.writetest.text = data.title
                        this.select          = data.cate_sub
                        this.titleImg        = data.img
                        this.editorcontent  = data.content
                        this.localimgs       = data.imglist
                        if(data.img != 'none'){
                            this.titleImgCheck = true;
                        } else {
                            this.titleImgCheck = false;
                        }
                    })
            }
        },
        mounted: function() {
            if(this.stateprimcode == null){
                this.primcode()
            }
        },
        computed:{
            ...mapState({
                currentview : state => state.board.currentview,
                currentskin : state => state.board.currentskin,
                stateprimcode : state => state.board.primcode
            }),
        },
        watch:{
            currentskin:function (newCon) {
                this.skinselect = newCon
            }
        },
        methods: {
            changetest(){
              console.log('change test go')
                console.log(this.localimgs.img_1 = "http://nawara-fish.com/prc/img/2.jpg")
            },
            customAction(){
                console.log(this.files)
            },
            primcode(){
                let nowDate = new Date()
                let mkTime = nowDate.getTime();
                let mkYear =  nowDate.getFullYear();
                let dd = nowDate.getDate();
                let mm = nowDate.getMonth()+1; //January is 0!
                let primMake = String(mkYear) + String(mm) + String(dd) + String(mkTime);

                this.$store.commit(Constant.PRIM_CODE,{primcode:primMake})

            },
            imgChange(value, imgvalue){
                console.log(imgvalue)
                this.$router.push({ name: 'EditPhoto', params: { imgno: value, idx: this.idx, imgvalue: imgvalue, mode:this.mode } })
            },
            playing() {
                console.log('\o/ we are watching!!!')
            },
            editcheck(){
              if(this.mode == 'edit'){
                  return true
              } else {
                  return false
              }
            },
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
                console.log('save btn')
                this.$store.commit(Constant.PRIM_CODE,{primcode:null})
            /*    var title = this.writetest.text;
                var tag   = this.select;
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
                            // 저장완료시 처리해야할 부분
                        })
                }, 1000);*/
            },
            skinchange(e){
                this.$store.dispatch(Constant.BOARD_CURRENT_SKIN,{skin:e})
            },
            itemschange(e){
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
                            var skin     = response.data.info.skintype
                            var title    = response.data.info.title
                            var content  = response.data.info.content
                            var img      = response.data.info.img
                            var cate     = response.data.info.cate
                            var cate_sub = response.data.info.cate_sub
                            var imglist  = response.data.imglist
                            var imgcount = response.data.info.img_count
                            setTimeout(() => {
                                this.loading = false
                                resolve({
                                    skin,
                                    title,
                                    content,
                                    img,
                                    cate,
                                    cate_sub,
                                    imglist,
                                    imgcount
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
        min-height:400px;
    }
    #topcardtag{
        height:420px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }
    .adminfloat{
        position: fixed;
        right: 59%;
        top: 200px;
        margin-right: -720px;
        text-align:center;
        width: 300px;
        z-index:5;

        background-color: white;
        color : black;
        border: solid 1px lightgray;
        border-radius: 6px;
    }


</style>
