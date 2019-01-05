<template>
    <div>
        <v-container style="width: 860px !important;">
            <bread-custom></bread-custom>
            <v-layout style="border-top:solid 1px lightgray" class="pt-4">
                <v-flex xs12 class="pa-3">

                    <v-text-field
                            label="타이틀"
                            flat
                            v-model="modelTitle"
                            background-color="#ffffff"
                            height="60px"
                    ></v-text-field>

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

            <v-layout>
                <v-flex xs12 d-flex>
                    <v-flex xs4 d-flex class="pa-2">
                        <v-select
                                v-model="select"
                                hint="대분류 선택"
                                :items="items"
                                item-text="state"
                                item-value="abbr"
                                label="선택해주세요."
                                persistent-hint
                                return-object
                                single-line
                                :loading="loading"
                                @change="selectChange"
                        ></v-select>
                    </v-flex>
                    <v-flex xs4 d-flex class="pa-2">
                        <v-select
                                v-model="subselect"
                                hint="중분류 선택"
                                :items="subitems"
                                item-text="state"
                                item-value="state"
                                label="전체"
                                persistent-hint
                                return-object
                                single-line
                                :loading="loading"
                                v-bind:disabled="subtitleCheck"
                                @change="selectSubChange"
                        ></v-select>
                    </v-flex>

                    <v-flex xs4 d-flex class="pa-2">
                        <v-select
                                v-model="lastselect"
                                hint="소분류 선택"
                                :items="lastsubitems"
                                item-text="state"
                                item-value="abbr"
                                label="전체"
                                persistent-hint
                                return-object
                                single-line
                                :loading="loading"
                                @change="selectLast"
                                v-bind:disabled="subtitleCheck"
                        ></v-select>
                    </v-flex>

                </v-flex>
            </v-layout>

            <v-divider class="mb-3 mt-3" light></v-divider>

        </v-container>

        <v-container style="width: 860px">
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
                            <v-carousel style="height:400px;" v-if="mapimgcount > 0">
                                <v-carousel-item v-for="(img, i) in localimgs" :key="i" v-if="img != 'none'" :src="img" interval="3000" cycle='true' reverse-transition="fade" transition="fade" style="height:420px;">
                                </v-carousel-item>
                            </v-carousel>
                            <v-card v-if="mapimgcount == 0" flat style="background-image: url('http://nawara-fish.com/web/trip/src/assets/images/noimg.png')" id="topcardtag">
                            </v-card>
                        </v-tab-item>
                        <v-tab-item :key="2">
                            <v-card flat style="height:420px">
                                <youtube width="100%" height="420px" :video-id="videoId" :player-vars="playerVars" @playing="playing"></youtube>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
                <v-flex xs5>

                    <v-layout column v-if="this.currentMode == 'edit'">
                        <v-flex xs12 >
                            <v-card style="width: 320px;" class="ml-3">
                                <v-container grid-list-sm fluid>
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
                                                        aa
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
                        <v-flex xs12 class="pt-0">
                            <v-card style="width: 320px;" class="ml-3">
                                <v-container grid-list-sm fluid  class="pt-0">
                                    <v-layout row wrap >
                                        <v-flex xs12 d-flex>
                                            <table >
                                                <tr>
                                                    <td>
                                                        <v-text-field
                                                                label="유튜브영상아이디"
                                                                flat
                                                                v-model="videoId"
                                                                background-color="#ffffff"
                                                        ></v-text-field>
                                                    </td>
                                                </tr>
                                            </table>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>

                    <v-layout column warp v-else>
                        <v-flex xs12>
                            <v-card style="width: 320px;" class="ml-3">
                                <v-container grid-list-sm fluid >
                                    <v-layout row wrap >
                                        <v-flex xs4 d-flex>
                                            <table>
                                                <tr v-for="i in 9" :key="i">
                                                    <td>
                                                        <input class="mb-2" type="file" :id="'img_'+i" @change="onFileChange" />
                                                    </td>
                                                </tr>
                                            </table>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 class="pt-0">
                            <v-card style="width: 320px;" class="ml-3">
                                <v-container grid-list-sm fluid  class="pt-0">
                                    <v-layout row wrap >
                                        <v-flex xs12 d-flex>
                                            <table >
                                                <tr>
                                                    <td>
                                                        <v-text-field
                                                                label="유튜브영상아이디"
                                                                flat
                                                                v-model="videoinput"
                                                                background-color="#ffffff"
                                                        ></v-text-field>
                                                    </td>
                                                </tr>
                                            </table>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>


                </v-flex>
            </v-layout>

        </v-container>

        <v-container style="width: 860px">
            <v-layout align-center justify-center row fill-height>
                <div id="boardheight">
                    <froala :tag="'textarea'" :config="config" v-model="model"></froala>
                </div>
            </v-layout>
        </v-container>

        <router-view></router-view>

    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";
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
                addimg1url: null,

                loading: false,
                localmode : '',
                boardTitle:'',
                Detailbg :'http://nawara-fish.com/web/trip/src/assets/images/tour_2_01.jpg',

                videoId: null,
                videoinput:null,
                active: null,
                playerVars: {
                    autoplay: 0
                },


                subtitleCheck:true,
                select: { state: '', abbr: '' },
                items: [
                    { state: '공지사항', abbr: 'notice' },
                    { state: '여행지정보', abbr: 'trip' },
                    { state: '커뮤니티', abbr: 'community' },
                    { state: '회사소개', abbr: 'company' },
                    { state: '동행', abbr: 'friend' },
                    { state: '큐레이팅 신청', abbr: 'curation' }
                ],
                subselect :{ state: '', abbr: '', code:''  },
                subitems:[
                ],
                lastselect :{ state: '', abbr: '', code:''  },
                lastsubitems:[
                ],



                // 상단, 이미지
                localimgs :{ },
                localimgcount:0,

                // 글제목 및 내용
                modelTitle : '',

                // 콤보박스 유효성 검사
                valid: true,

                // 썸네일 이미지
                titleImg: '',
                titleImgCheck: false,



                // 글 타입
                skintype:'2',
                skinselect:null,
                skinitems:['일반','상품'],

                // 보드 에디터
                config: {
                    placeholder: "Edit Me",
                    events: {
                        'froalaEditor.initialized': function () {
                            //console.log('initialized')
                        },
                        'froalaEditor.image.beforeUpload': (e, editor, images) => {
                            editor.opts.imageUploadParams['data'] = '8000';
                            editor.opts.imageUploadURL = 'http://nawara-fish.com/web/tripajax/board.php';
                            editor.opts.imageUploadMethod = 'POST';
                            return true
                        },
                        'froalaEditor.image.uploaded': (e, editor, response) => {
                            //console.log(response)
                        },
                        'froalaEditor.focus' : function(e, editor) {
                            //console.log(editor.selection.get());
                        }
                    },
                },
                model: '',
            }
        },
        created(){
            this.$store.dispatch(Constant.BOARD_CATEGORY)

            this.skinselect  = this.currentskin
            this.localimgs   = this.mapimglist



            this.$store.dispatch(Constant.BOARD_ADMIN_FETCH_IMGLIST,{ idx: this.idx })

            if(this.idx){
                // 이미지 액션으로 보내서 따로 이미지 받아 배열로 저장 넘길 파라미터 idx 보내면되지뭐
                this.getBoardApi()
                    .then(data => {
                        // console.log(data);
                        // console.log(data.cate2);
                        // console.log(data.cate3);
                        switch (data.skin){
                            case '1' : this.skinselect = '일반'
                                break;
                            case '2' : this.skinselect = '상품'
                                break;
                            default : this.skinselect = '일반'
                        }
                        this.modelTitle     = data.title
                        this.selectChange(data.cate1);
                        this.selectSubChange(data.cate2);
                        this.select          = data.cate1
                        this.subselect      = { state: data.cate2.state, abbr:parseInt(data.cate2.abbr), code:data.cate2.code }
                        this.lastselect     = { state:data.cate3.state, abbr:parseInt(data.cate3.abbr), code:data.cate3.code }
                        this.model       = data.content
                        this.videoId    = data.videoid

                    })
            }

        },
        computed:{
            ...mapState({
                currentview : state => state.board.currentview,
                currentskin : state => state.board.currentskin,
                stateprimcode : state => state.board.primcode,
                mapimglist : state => state.board.adminBoardInfo.skintype2imglist,
                mapimgcount : state => state.board.adminBoardInfo.skintype2imgcount,
                catesubList : state => state.board.adminBoardListInfo.abListSubCate,
                catelastList : state => state.board.adminBoardListInfo.abListLastCate,
                currentMode: state =>state.board.adminBoardInfo.abWriteMode
            }),
        },
        watch:{
            currentskin:function (newCon) {
                this.skinselect = newCon
            },
            mapimglist:function (newImg) {
                this.localimgs = newImg
            },
            mapimgcount:function (newCnt) {
                this.localimgcount = newCnt
            }
        },
        methods: {
            selectSubChange(selectObj){ // 2번 체인지하면 3번 리스트 업 시켜준다.

                this.$store.commit(Constant.CHANGE_REGION, {region : selectObj})
                var lastdataArr = [];
                var lastdata = this.$store.getters.lastcateBySelect
                for(let i = 0; lastdata.length > i; i++){
                    lastdataArr.push({state:lastdata[i].cate_sub_kor, abbr:lastdata[i].idx , code:lastdata[i].cate})
                }
                this.lastsubitems = lastdataArr;
            },
            selectLast(selectObj){
                //console.log(selectObj)
            },
            selectChange(selectObj){ // 1번 체인지 하면 2번에 리스트 업시켜준다.
                this.subitems = this.subMenu(selectObj.abbr)
            },
            subMenu(value){
                if(value == 'notice'){
                    this.subtitleCheck = true
                    return [
                        { state: '전체', abbr: '' },
                    ]
                } else if(value == 'trip') {
                    this.subtitleCheck = false

                    var listdata = [];
                    for(let i = 0; this.catesubList.length > i; i++){
                        listdata.push({state:this.catesubList[i].cate_kor, abbr:this.catesubList[i].idx , code:this.catesubList[i].cate})
                    }
                    return listdata;

                } else {
                    return [
                        { state: '전체', abbr: '' },
                    ]
                }
            },
            changetest(){
              console.log('change test go')
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
                this.$router.push({ name: 'EditPhoto', params: { imgno: value, idx: this.idx, imgvalue: imgvalue, mode:this.mode } })

            },
            playing() {
                console.log('\o/ we are watching!!!')
            },
            editcheck(){
              if(this.currentMode == 'edit'){
                  return true
              } else {
                  return false
              }
            },
            onFileChange(e) {
                var id = e.target.id
                const file = e.target.files[0];
                var pushurl = URL.createObjectURL(file);
                this.localimgs[id] = pushurl;
                this.$store.commit({
                    type:'addImageCount',
                    count: this.mapimgcount + 1
                })
            },
            SaveTopType(){
                var title   = this.modelTitle;
                var step1   = this.select.abbr;
                var step2   = this.subselect.abbr;
                var step3   = this.lastselect.abbr;
                var videoid = this.videoId;
                var idx     = this.idx;


                var data = new FormData();

                if(this.currentMode == 'add'){
                    var cmd = '3002';
                    var fileset = [];
                    for(var i = 1; 9 >= i; i++){
                        if(this.localimgs['img_'+i] != 'none'){
                            fileset.push({file:$("#img_"+i).prop('files')})
                        }
                    }

                    fileset.forEach(function (image, i) {
                        let t = i + 1;
                        data.append('img_no' + t, image.file[0]);
                    })
                } else if(this.currentMode == 'edit'){
                    var cmd = '3004';
                }

                data.append('cmd', cmd);
                data.append('idx', idx);
                data.append('title', title);
                data.append('step1', step1);
                data.append('step2', step2);
                data.append('step3', step3);
                data.append('videoid', videoid);


                axios.post(CONF.BOARD_INFO, data)
                    .then((response)=>{
                        this.loading = false
                        if(response.data == "200"){
                            alert('글 저장완료')
                            this.$router.go(-1)
                        } else {
                            alert('업로드에 문제가 발생되었습니다. 관리자에게 문의하세요.')
                        }
                    })


            },
            dataURItoBlob(dataURI) {
                var byteString;
                if (dataURI.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(dataURI.split(',')[1]);
                else
                    byteString = unescape(dataURI.split(',')[1]);


                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];


                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], {type:mimeString});
            },
            clicks() {

                var skintype = this.skinselect;

                var title   = this.modelTitle;
                var step1   = this.select.abbr;
                var step2   = this.subselect.abbr;
                var step3   = this.lastselect.abbr;
                var content = this.model;
                var subidx;
                var subMode;

                if(this.currentMode == 'add'){
                    subMode = '3000';
                    subidx = '0';
                } else if(this.currentMode == 'edit'){
                    subMode = '3001';
                    subidx = this.idx;
                }


                    var data = new FormData();
                    data.append('cmd', subMode);
                    data.append('idx', subidx);
                    data.append('title', title);
                    data.append('content', content);
                    data.append('step1', step1);
                    data.append('step2', step2);
                    data.append('step3', step3);
                    data.append('skintype', skintype);

                    axios.post(CONF.BOARD_INFO, data)
                        .then((response)=>{
                            this.loading = false
                            if(response.data == "200"){
                                alert('글 저장완료')
                                this.$router.go(-1)
                            } else {
                                alert('업로드에 문제가 발생되었습니다. 관리자에게 문의하세요.')
                            }
                        })

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
                            var cate1     = response.data.info.cate1
                            var cate2     = response.data.info.cate2
                            var cate3    = response.data.info.cate3
                            var videoid = response.data.info.videoid
                            setTimeout(() => {
                                this.loading = false
                                resolve({
                                    skin,
                                    title,
                                    content,
                                    img,
                                    cate1,
                                    cate2,
                                    cate3,
                                    videoid
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
    button.replace {    /*button tag 에 원하는 스타일 적용*/
        position: absolute;
        width: 200px;
        height: 100px;
        border-radius: 3px;
        font-weight: 600;
        border-color: transparent;
        font-size: 25px;
        background: hotpink;
        color: #fff;
        cursor: pointer;
    }

    .filebox .upload-display {
        margin-bottom: 5px;
    }

    @media(min-width: 768px) {
        .filebox .upload-display {
            display: inline-block;
            margin-right: 5px;
            margin-bottom: 0;
        }
    }

    .filebox .upload-thumb-wrap {
        /* 추가될 이미지를 감싸는 요소 */
        display: inline-block;
        width: 54px;
        padding: 2px;
        vertical-align: middle;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fff;
    }

    .filebox .upload-display img {
        /* 추가될 이미지 */
        display: block;
        max-width: 100%;
        width: 100% \9;
        height: auto;
    }
    #input-file{
        opacity: 0;
    }

</style>
