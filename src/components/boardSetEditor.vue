<!-- 일반 글 작성에 썸네일까지 있는 형태 -->
<template>
    <div>
        <v-container style="width: 860px !important;" class="mb-5">
            <bread-custom></bread-custom>

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
        </v-layout>

        <v-layout>
            <v-flex xs4 d-flex class="pa-2">
                <v-select
                        v-model="localTlevelSelect"
                        hint="상단 선택"
                        :items="localTlevelItem"
                        item-text="title"
                        item-value="idx"
                        label="선택해주세요."
                        persistent-hint
                        return-object
                        single-line
                        :loading="loading"
                ></v-select>
            </v-flex>
            <v-flex xs4 d-flex class="pa-2">
                <v-select
                        v-model="localMlevelSelect"
                        hint="중단 선택"
                        :items="localMlevelItem"
                        item-text="title"
                        item-value="idx"
                        label="전체"
                        persistent-hint
                        return-object
                        single-line
                        :loading="loading"
                        v-bind:disabled="subtitleCheck"
                ></v-select>
            </v-flex>
            <v-flex xs4 d-flex class="pa-2">
                <v-select
                        v-model="localBlevelSelect"
                        hint="하단 선택"
                        :items="localBlevelItem"
                        item-text="title"
                        item-value="idx"
                        label="전체"
                        persistent-hint
                        return-object
                        single-line
                        :loading="loading"
                        v-bind:disabled="subtitleCheck"
                ></v-select>
            </v-flex>
        </v-layout>

        <v-layout class="mt-5">
            <v-flex xs3>
                <v-btn block @click="openwins"> 미리보기 </v-btn>
            </v-flex>
            <v-flex xs9 class="pl-3">
                <v-btn block @click="SetSave"> 저장 </v-btn>
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
        name: "board-set-editor",
        props: ['idx'],
        components:{
            BreadCustom
        },
        data() {
            return {
                loading: false,
                setTitle:'',
                setSubTitle:'',
                localimgs:'',

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

                localTlevelSelect:{ title:'', idx:''},
                localTlevelItem:[],

                localMlevelSelect:{ title:'', idx:''},
                localMlevelItem:[],

                localBlevelSelect:{ title:'', idx:''},
                localBlevelItem:[]
            }
        },
        created(){
            this.$store.dispatch(Constant.BOARD_CATEGORY)
            if(this.idx != 'add'){
                this.$store.dispatch(Constant.BOARD_SETEDITINFO, {idx:this.idx})
              /*  this.select = {state:this.editinfoCate1.state, abbr:this.editinfoCate1.abbr}
                this.selectChange({state:this.editinfoCate1.state, abbr:this.editinfoCate1.abbr})
                this.subselect = {state:this.editinfoCate2.state, abbr:parseInt(this.editinfoCate2.abbr), code:this.editinfoCate2.code}
                this.selectSubChange({state:this.editinfoCate2.state, abbr:parseInt(this.editinfoCate2.abbr), code:this.editinfoCate2.code})
                this.lastselect = {state:this.editinfoCate3.state, abbr:parseInt(this.editinfoCate3.abbr), code:this.editinfoCate3.code}
                this.localTlevelSelect = {title:this.editinfoTlevel[0].board_title, idx:this.editinfoTlevel[0].board_idx}
                this.localMlevelSelect = {title:this.editinfoMlevel[0].board_title, idx:this.editinfoMlevel[0].board_idx}
                this.localBlevelSelect = {title:this.editinfoBlevel[0].board_title, idx:this.editinfoBlevel[0].board_idx}
                this.localimgs = this.editinfoImg
                this.selectLast();
                */
                this.localimgs   = this.editinfoImg
                this.setTitle    = this.editinfoTitle
                this.setSubTitle = this.editinfoSubTitle
            }
        },
        computed:{
            ...mapState({
                currentview : state => state.board.currentview,
                catesubList : state => state.board.adminBoardListInfo.abListSubCate,
                catelastList : state => state.board.adminBoardListInfo.abListLastCate,
                tlevel: state =>state.board.adminBoardSetCate.tlevel,
                mlevel: state =>state.board.adminBoardSetCate.mlevel,
                blevel: state =>state.board.adminBoardSetCate.blevel,
                editres : state =>state.board.adminBoardSetResult,
                editinfoTitle : state => state.board.adminBoardSetEditInfo.abseTitle,
                editinfoSubTitle : state => state.board.adminBoardSetEditInfo.abseSubTitle,
                editinfoImg : state => state.board.adminBoardSetEditInfo.abseImg,
                editinfoCate1 : state => state.board.adminBoardSetEditInfo.abseCate1,
                editinfoCate2 : state => state.board.adminBoardSetEditInfo.abseCate2,
                editinfoCate3 : state => state.board.adminBoardSetEditInfo.abseCate3,
                editinfoTlevel : state => state.board.adminBoardSetEditInfo.abseTlevel,
                editinfoMlevel : state => state.board.adminBoardSetEditInfo.abseMlevel,
                editinfoBlevel : state => state.board.adminBoardSetEditInfo.abseBlevel
            }),
        },
        watch:{
            editinfoTitle:function(newContacts){
              this.setTitle = newContacts;
            },
            editinfoSubTitle:function(newContacts){
                this.setSubTitle = newContacts;
            },
            editinfoImg:function(newContacts){
                this.localimgs = newContacts;
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
                this.selectLast();
            },
            editinfoTlevel:function(newContacts){
                this.localTlevelSelect = {title:newContacts[0].board_title, idx:newContacts[0].board_idx}
            },
            editinfoMlevel:function(newContacts){
                this.localMlevelSelect = {title:newContacts[0].board_title, idx:newContacts[0].board_idx}
            },
            editinfoBlevel:function(newContacts){
                this.localBlevelSelect = {title:newContacts[0].board_title, idx:newContacts[0].board_idx}
            },
            editres(newCon){
              if(newCon){
                  alert('저장되었습니다.')
                  this.$store.commit(Constant.BOARD_SETSAVE)
                  this.$router.go(-1);
              }
            },
            tlevel(newCon){
                this.localTlevelItem = newCon;
            },
            mlevel(newCon){
                this.localMlevelItem = newCon;
            },
            blevel(newCon){
                this.localBlevelItem = newCon;
            }
        },
        methods:{
            openwins(){
                let idx1 = this.localTlevelSelect.idx
                let idx2 = this.localMlevelSelect.idx
                let idx3 = this.localBlevelSelect.idx
                // 걍 오픈된다.
                var url = 'http://182.162.22.21:9090/showDetail?tlevel='+idx1+'&mlevel='+idx2+'&blevel='+idx3;
                var specs = 'height=960px, width=1280px, resize=yes, scrollbars=yes, right=0px'
                window.open(url, '_blank ', specs, true );
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
            selectLast(selectObj){
                this.$store.dispatch(Constant.BOARD_SETCATEGORY,{step1:this.select, step2:this.subselect, step3:this.lastselect})
            },

            onFileChange(e) { // 썸네일 이미지
                const file = e.target.files[0];
                var pushurl = URL.createObjectURL(file);
                this.localimgs = pushurl;
            },

            SetSave(){

                var cmd;
                if(this.idx != 'add'){
                    cmd = '4011';
                } else {
                    if(this.$refs.thfile.files[0] == undefined){
                        alert('썸네일 이미지를 꼭 등록해주세요.')
                        return false
                    }
                    cmd = '4001'
                }
                this.$store.dispatch(Constant.BOARD_SETSAVE,
                    {
                        idx:this.idx,
                        cmd:cmd,
                        step1:this.select.abbr,
                        step2:this.subselect.abbr,
                        step3:this.lastselect.abbr,
                        title:this.setTitle,
                        subtitle:this.setSubTitle,
                        file: this.$refs.thfile.files[0],
                        tlevel : this.localTlevelSelect.idx,
                        mlevel : this.localMlevelSelect.idx,
                        blevel : this.localBlevelSelect.idx
                    })
            }
        }
    };
</script>
<style scoped>
</style>
