<template>
    <div>
        <v-container style="width: 860px !important;" class="mb-5">
            <bread-custom></bread-custom>

            <v-layout column   style="border-top:solid 1px lightgray" class="pt-4">
                <v-layout>
                    <v-flex xs12>
                        <p>- 썸네일 및 타이틀 시작 -</p>
                    </v-flex>
                </v-layout>
                <v-layout style="border-top:solid 1px lightgray" class="pt-4">
                    <v-flex xs6>
                        <v-card>
                            <v-img
                                    class="white--text"
                                    height="400px"
                                    :src="localimgs"
                            >
                                <v-container fill-height fluid>
                                    <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline">{{this.setTitle}}</span>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-img>
                            <v-card-title>
                                <div>
                                    <span>{{this.setSubTitle}}</span>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>

                    <v-flex xs6 class="pa-3">
                        <v-text-field
                                label="타이틀"
                                flat
                                v-model="setTitle"
                                background-color="#ffffff"
                                height="60px"
                        ></v-text-field>

                        <v-textarea
                                solo
                                name="subtitle"
                                label="요약내용"
                                v-model="setSubTitle"
                        ></v-textarea>
                        <label for="img_th">썸네일 이미지: </label>
                        <input class="mb-2" ref="thfile" type="file" id="img_th" @change="onFileChange" />
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12>
                        <v-divider class="mb-3 mt-3" light></v-divider>
                        <p>- 썸네일 및 타이틀  끝 -</p>
                        <p>- 카테고리 시작 -</p>
                        <v-divider class="mb-3 mt-3" light></v-divider>
                    </v-flex>
                </v-layout>
            </v-layout>

            <v-layout>
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
                            v-bind:disabled="subtitleCheck"
                    ></v-select>
                </v-flex>
            </v-layout>

            <v-layout  column style="border: solid 1px lightgray; border-radius: 5px">
                <v-flex xs12 >
                    <v-radio-group class="pl-3" v-model="skintype" row>
                        <v-radio color="primary" label="일반 글" value="1"></v-radio>
                        <v-radio color="primary" label="상품 글" value="2"></v-radio>
                    </v-radio-group>
                </v-flex>
                <v-flex xs12 v-show="this.skintype == '2'">
                    <v-layout >
                        <v-flex xs4 class="pl-3">
                            <v-text-field
                                    v-model="prodDefaultValue.start"
                                    label="시작일"
                                    flat
                                    background-color="#ffffff"
                                    height="60px"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4 class="pl-2">
                            <v-text-field
                                    v-model="prodDefaultValue.end"
                                    label="종료일"
                                    flat
                                    background-color="#ffffff"
                                    height="60px"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4 class="pl-2">
                            <v-text-field
                                    v-model="prodDefaultValue.price"
                                    label="기본비용"
                                    flat
                                    background-color="#ffffff"
                                    height="60px"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout v-for="i in prodCount" :key="i" class="pl-3">
                        <v-flex xs4 class="pl-5">
                            <v-text-field
                                    v-model="prodValue[i - 1].start"
                                    label="예외 시작일"
                                    flat
                                    background-color="#ffffff"
                                    height="60px"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4 class="pl-2">
                            <v-text-field
                                    v-model="prodValue[i - 1].end"
                                    label="예외 종료일"
                                    flat
                                    background-color="#ffffff"
                                    height="60px"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4 class="pl-2">
                            <v-text-field
                                    v-model="prodValue[i - 1].price"
                                    label="예외 비용"
                                    flat
                                    background-color="#ffffff"
                                    height="60px"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-btn block @click="cntadd">증가</v-btn>
                </v-flex>

            </v-layout>

            <v-layout>
                <v-flex xs12>
                    <v-divider class="mb-3 mt-3" light></v-divider>
                    <p>- 카테고리 끝 -</p>
                    <p>- 상단 이미지, 유튜브 시작 -</p>
                    <v-divider class="mb-3 mt-3" light></v-divider>
                </v-flex>
            </v-layout>
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
                            <v-carousel style="height:400px;" v-if="localTopImgcount > 0">
                                <v-carousel-item v-for="(img, i) in localTopImgList" :key="i" v-if="img != 'none'" :src="img" interval="3000" cycle='true' reverse-transition="fade" transition="fade" style="height:420px;">
                                </v-carousel-item>
                            </v-carousel>
                            <v-card v-if="localTopImgcount == 0" flat style="background-image: url('http://nawara-fish.com/web/trip/src/assets/images/noimg.png')" id="topcardtag">
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
                    <v-layout column warp>
                        <v-flex xs12>
                            <v-card style="width: 320px;" class="ml-3">
                                <v-container grid-list-sm fluid >
                                    <v-layout row wrap >
                                        <v-flex xs4 d-flex>
                                            <table>
                                                <tr v-for="i in 9" :key="i">
                                                    <td>
                                                        <div style="height: 35px; width: 60px; overflow: hidden;">
                                                            <img :src="localTopImgList['img_' + i]" style="width: 60px;">
                                                        </div>
                                                    <td>
                                                        <input class="mb-2" type="file" :id="'img_'+i" @change="onFilesChange" />
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

                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs12>
                    <v-divider class="mb-3 mt-3" light></v-divider>
                    <p>- 상단 이미지, 유튜브 끝 -</p>
                    <p>- 내용 시작 -</p>
                    <v-divider class="mb-3 mt-3" light></v-divider>
                </v-flex>
            </v-layout>

            <v-layout align-center justify-center row fill-height>
                <div id="boardheight" >
                    <froala   :tag="'textarea'" :config="config" v-model="model"></froala>
                </div>
            </v-layout>

            <v-layout>
                <v-flex xs12>
                    <v-divider class="mb-3 mt-3" light></v-divider>
                    <p>- 내용 끝 -</p>
                    <v-divider class="mb-3 mt-3" light></v-divider>
                    <v-btn block @click="BoardSave">저장</v-btn>
                </v-flex>
            </v-layout>

        </v-container>

    </div>
</template>

<script>
    import { mapState } from "vuex";
    import Constant from "../Constant";
    import CONF from "../Config";
    import axios from 'axios';
    import BreadCustom from './breadcrumbsCu'


    export default {
        name: "board-list",
        props: ['mode', 'type', 'idx'],
        components:{
            BreadCustom
        },
        data() {
            return {
                loading: false,
                setTitle:'',
                setSubTitle:'',
                localimgs:'',

                videoId: null,
                videoinput:null,
                active: null,
                playerVars: {
                    autoplay: 0
                },


                // 불러오기 할때 카운트랑 벨류 가져와야하는군..
                skintype: '1',
                prodCount:0,
                prodDefaultValue:{start:'', end:'', price:'', pidx:''},
                prodValue:[{start:'', end:'', price:'',pidx:''}],


                subtitleCheck:true,
                select: { state: '', abbr: '' },
                items: [
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

                localTopImgcount:0,
                localTopImgList:
                    {img_1:'none',img_2:'none',img_3:'none',img_4:'none',img_5:'none',img_6:'none',img_7:'none',img_8:'none',img_9:'none'},
                localTopImgListLabel:[],
                config: {
                    placeholder: "Edit Me",
                    heightMin:400,
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
            //this.$store.dispatch(Constant.BOARD_ADMIN_FETCH_IMGLIST,{ idx: this.idx })
            this.$store.dispatch(Constant.BOARD_CATEGORY)
            this.localTopImgcount = this.mapimgcount;
            if(this.idx != 'add'){
                this.$store.dispatch(Constant.BOARD_SETEDITINFO, {idx:this.idx})
                this.localimgs   = this.editinfoImg
                this.setTitle    = this.editinfoTitle
                this.setSubTitle = this.editinfoSubTitle
                this.model = this.editinfoContent
                this.skintype = this.editinfoSkinType
                this.prodCount = this.editinfoPPEC
                this.prodDefaultValue = this.editinfoPPD
                this.prodValue = this.editinfoPPE
                this.videoId = this.editinfoVideo
            }
        },
        computed:{
            ...mapState({
                catesubList : state => state.board.adminBoardListInfo.abListSubCate,
                catelastList : state => state.board.adminBoardListInfo.abListLastCate,
                editinfoCate1 : state => state.board.adminBoardSetEditInfo.abseCate1,
                editinfoCate2 : state => state.board.adminBoardSetEditInfo.abseCate2,
                editinfoCate3 : state => state.board.adminBoardSetEditInfo.abseCate3,
                currentMode: state =>state.board.adminBoardInfo.abWriteMode,
                mapimglist : state =>  state.board.adminBoardSetEditInfo.abseImgList,
                mapimgcount : state =>  state.board.adminBoardSetEditInfo.abseImgCount,
                editinfoTitle : state=>state.board.adminBoardSetEditInfo.abseTitle,
                editinfoSubTitle : state=>state.board.adminBoardSetEditInfo.abseSubTitle,
                editinfoImg : state=>state.board.adminBoardSetEditInfo.abseThimg,
                editinfoContent : state=>state.board.adminBoardSetEditInfo.abseContent,
                editinfoSkinType : state=>state.board.adminBoardSetEditInfo.abseSkinType,
                editinfoPPD : state=>state.board.adminBoardSetEditInfo.abseProdPriceDef,
                editinfoPPE : state=>state.board.adminBoardSetEditInfo.abseProdPriceEtc,
                editinfoPPEC : state=>state.board.adminBoardSetEditInfo.abseProdPriceCount,
                editinfoVideo : state=>state.board.adminBoardSetEditInfo.abseVideo
            }),
        },
        watch:{
            editinfoPPD:function (newContacts) {
                this.prodDefaultValue = newContacts
            },
            editinfoPPE:function (newContacts) {
                this.prodValue = newContacts
            },
            editinfoPPEC:function (newContacts) {
                this.prodCount = newContacts
            },
            editinfoVideo:function(newContacts){
                this.videoId = newContacts;
            },
            editinfoSkinType:function(newContacts){
                this.skintype = newContacts;
            },
            editinfoContent:function(newContacts){
                this.model = newContacts;
            },
            editinfoTitle:function(newContacts){
                this.setTitle = newContacts;
            },
            editinfoSubTitle:function(newContacts){
                this.setSubTitle = newContacts;
            },
            editinfoImg:function(newContacts){
                this.localimgs = newContacts;
            },
            mapimglist:function (newImg) {
                this.localTopImgList = newImg
                //this.ltll(newImg);
            },
            mapimgcount:function (newCnt) {
                this.localTopImgcount = parseInt(newCnt)
            },
            editinfoCate1:function(newContacts){

                this.select = {state:newContacts.state, abbr:newContacts.abbr}
                this.selectChange({state:newContacts.state, abbr:newContacts.abbr})
            },
            editinfoCate2:function(newContacts){
                this.subselect = {state:newContacts.state, abbr:parseInt(newContacts.abbr), code:newContacts.code}
                this.selectSubChange({state:newContacts.state, abbr:parseInt(newContacts.abbr), code:newContacts.code})
            },
            editinfoCate3:function(newContacts){
                this.lastselect = {state:newContacts.state, abbr:parseInt(newContacts.abbr), code:newContacts.code}
            }
        },
        methods: {
          /*  ltll(newImg){
                var localltll = [];
                for(var i = 1; 9 >= i; i++){
                 if(newImg['img_' + i] != 'none'){
                     localltll.push({name:newImg['img_' + i].substr(50)});
                    } else {
                     localltll.push({name:'none'});
                    }
                }
                this.localTopImgListLabel = localltll
            },*/
            cntadd(){
                if(this.prodCount >= 10){
                    alert('더 이상 추가할 수 없습니다.')
                    return false;
                } else {
                    this.prodCount  = this.prodCount + 1;
                }
              this.prodValue.push({start:'', end:'', price:'', pidx:''})
            },
            onFileChange(e) { // 썸네일 이미지
                const file = e.target.files[0];
                var pushurl = URL.createObjectURL(file);
                this.localimgs = pushurl;
            },
            onFilesChange(e) { // 이미지
                var id = e.target.id
                const file = e.target.files[0];
                var pushurl = URL.createObjectURL(file);
                this.localTopImgList[id] = pushurl;
                this.$store.commit({
                    type:'addImageCount',
                    count: this.mapimgcount + 1
                })
            },
            selectChange(selectObj){ // 1번 체인지 하면 2번에 리스트 업시켜준다.
                this.subitems = this.subMenu(selectObj.abbr)
            },
            subMenu(value){
                if(value == 'trip') {
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
            selectSubChange(selectObj){ // 2번 체인지하면 3번 리스트 업 시켜준다.
                this.$store.commit(Constant.CHANGE_REGION, {region : selectObj})
                var lastdataArr = [];
                var lastdata = this.$store.getters.lastcateBySelect
                for(let i = 0; lastdata.length > i; i++){
                    lastdataArr.push({state:lastdata[i].cate_sub_kor, abbr:lastdata[i].idx , code:lastdata[i].cate})
                }
                this.lastsubitems = lastdataArr;
            },
            playing() {
                console.log('\o/ we are watching!!!')
            },
            BoardSave(){

                var data = new FormData();
                var prodvalue = this.prodValue;
                var prodDefValue = this.prodDefaultValue;
                var prodSet = [];
                prodvalue.forEach(function (price, i) {
                    if(price.start != ''){
                        prodSet.push({start:price.start, end:price.end, price:price.price, pidx:price.pidx})
                    }
                })

                var prodJsonData = JSON.stringify(prodSet);
                var prodJsonData1 = JSON.stringify(prodDefValue);
                //console.log(prodJsonData1)

                var thimg = this.$refs.thfile.files[0]

                if(this.currentMode == 'add'){
                    var cmd = '3002';
                        if(thimg == undefined){
                            alert('썸네일 이미지를 꼭 등록해주세요.')
                            return false
                        }
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
                    data.append('thfile', thimg);
                    console.log('save btn on add')
                } else {
                    var cmd = '3004';
                    data.append('idx', this.idx)
                    if(thimg != undefined){
                        data.append('thfile', thimg);
                    }
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
                }


                var step1 = this.select.abbr;
                var step2 = this.subselect.abbr;
                var step3 = this.lastselect.abbr;
                var title = this.setTitle;
                var subtitle = this.setSubTitle;
                var videoId = this.videoId;
                var content = this.model;
                var skintype = this.skintype;
                var prodcount = this.prodCount;

                data.append('cmd', cmd);

                data.append('step1', step1);
                data.append('step2', step2);
                data.append('step3', step3);
                data.append('title', title);
                data.append('subtitle', subtitle);
                data.append('videoId', videoId);
                data.append('content', content);
                data.append('prodcount', prodcount)
                data.append('prodvalue', prodJsonData);
                data.append('proddefvalue', prodJsonData1);
                data.append('skintype', skintype);

                axios.post(CONF.BOARD_INFO, data)
                    .then((response)=>{
                    console.log(response)
                        this.loading = false
                        if(response.data == "200"){
                            alert('글 저장완료')
                            this.$router.go(-1)
                        } else {
                            alert('업로드에 문제가 발생되었습니다. 관리자에게 문의하세요.')
                        }
                    })

            }
        }
    };
</script>
<style scoped>
    .filebox label { display: inline-block; padding: .5em .60em; color: #999; font-size: inherit; line-height: normal; vertical-align: middle; background-color: #fdfdfd; cursor: pointer; }
    #boardheight{
        min-height:200px;
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
