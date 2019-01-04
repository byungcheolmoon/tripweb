<template>
    <div>
        <v-container style="width: 1024px">

            <v-layout>
                <v-flex xs12 d-flex>
                    <v-flex xs3 d-flex class="pa-2">
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
                    <v-flex xs3 d-flex class="pa-2">
                        <v-select
                                v-model="subselect"
                                hint="중분류 선택"
                                :items="subitems"
                                item-text="state"
                                item-value="abbr"
                                label="전체"
                                persistent-hint
                                return-object
                                single-line
                                :loading="loading"
                                v-bind:disabled="subtitleCheck"
                                @change="selectSubChange"
                        ></v-select>
                    </v-flex>

                    <v-flex xs3 d-flex class="pa-2">
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
                                @change="selectLastChange"
                                v-bind:disabled="subtitleCheck"
                        ></v-select>
                    </v-flex>

                    <v-flex xs3 d-flex class="pa-2">
                        <v-btn @click="submitBtn"> 버튼</v-btn>
                    </v-flex>
                </v-flex>

            </v-layout>
        </v-container>
        <v-container style="width: 1024px">
            <v-layout row wrap>

                <bread-custom></bread-custom>

                <v-flex xs1 offset-xs5 d-flex justify-end>
                    <v-btn dark color="indigo" @click="newBoardWrite()">새글작성</v-btn>
                </v-flex>


                <v-flex xs12 d-flex>
                    <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :pagination.sync="pagination"
                            :total-items="totalDesserts"
                            :loading="loading"
                            hide-actions
                            :rows-per-page-items=
                                    "[
                                '3',
                                '10'
                            ]"
                            class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <tr @click="itemSelect(props.item.board_idx)">
                                <td class="text-xs-center">{{ props.item.board_idx }}</td>
                                <td class="text-xs-center">{{ props.item.board_title }}</td>
                                <td class="text-xs-center">{{ props.item.board_wdate }}</td>
                                <td class="text-xs-right">
                                    <v-btn color="primary" outline fab small dark @click.stop="BoardEdit(props.item.board_idx)"><v-icon>edit</v-icon></v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-flex>
                <v-flex xs12 d-flex>
                    <div class="text-xs-center pt-2">
                        <v-pagination v-model="pagination.page" :length="pageCheck"></v-pagination>
                    </div>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>

<script>

    import axios from 'axios';
    import Constant from "../Constant";
    import CONF from "../Config";
    import { mapState, mapMutations } from "vuex";
    import eventBus from '../EventBus';
    import BreadCustom from './breadcrumbsCu'

    export default {
        name: "board-notice-list",
        props: ['readMode'],
        components:{
            BreadCustom
        },
        data () {
            return {
                totalDesserts: 0,
                desserts: [],
                loading: true,
                pagination: { page: 1, totalItems:'', rowsPerPage:'5', totalpages:0 },
                headers: [
                    { align:'center', text: 'idx', value: 'board_idx' },
                    { align:'center', text: 'title', value: 'board_title' },
                    { align:'center', text: 'date', value: 'board_wdate' },
                    { align:'right', text: '', value: '' },
                ],

                // 아이템 리스트들 ..
                boardCate :'',
                select: { state: '', abbr: '' },
                items: null,

                subtitleCheck:true,
                subselect :{ state: '', abbr: '', code:''  },
                subitems:[
                ],

                lastselect :{ state: '', abbr: '', code:''  },
                lastsubitems:[
                ]

            }
        },
        created(){ // created 는 data만 로드된 상태임으로 아직 dom은 배치되지 않았다.
            this.$store.dispatch(Constant.BOARD_CATEGORY)

                if(this.readMode == 'piece'){
                 this.items = [ { state: '공지사항', abbr: 'notice' },{ state: '여행지정보', abbr: 'trip' }];
                } else {
                    this.items = [ { state: '선택', abbr: 'all' },{ state: '여행지정보', abbr: 'trip' }];
                }
            if (this.$route.query) {
                //var cates = this.lastSelectOne(this.$route.query.subcatevalue);
                if(this.$route.query.cate == 'notice'){
                    this.select = { state: '공지사항', abbr: 'notice' }
                    this.subselect = { state:'',  abbr: '', code:''}
                    this.$store.commit(Constant.BOARD_CURRENT_VIEW, {view : 'boards_notice'})
                } else if(this.$route.query.cate =='trip'){
                    this.select = { state: '여행지정보', abbr: 'trip' }
                    this.subselect = { state: this.$route.query.scateState, abbr: parseInt(this.$route.query.scateAbbr), code: this.$route.query.scateCode }
                    this.lastselect = { state: this.$route.query.lcateState, abbr: parseInt(this.$route.query.lcateAbbr), code : this.$route.query.lcateCode }
                    this.selectSubChange(this.subselect)
                    this.subitems = this.subMenu('trip'); // 리스트 뷰에 중분류 넣기위해
                    this.$store.commit(Constant.BOARD_CURRENT_VIEW, {view : 'boards_trip'})
                } else {
                    this.select = { state: '선택', abbr: 'all' }
                    this.subselect = { state:'',  abbr: '', code:''}
                }
                if(this.$route.query.subcate) {
                    this.subtitleCheck = false
                }
            }
        },
        computed:{
            ...mapState({
                fetchPageno : state => state.board.BoardPage.pageno,
                currentview : state => state.board.currentview,
                boardCheck: state => state.board.Boardpcheck,
                catesubList : state => state.board.adminBoardListInfo.abListSubCate,
                catelastList : state => state.board.adminBoardListInfo.abListLastCate
            }),
            pageCheck(){
                return this.pagination.totalpages
            }
        },
        watch: {
            pagination: {
                handler () {
                    if(this.boardCheck){
                        this.pagination.page = this.fetchPageno
                    }
                    /*this.pagination.page = this.fetchPageno*/
                    this.getDataFromApi()
                        .then(data => {
                            this.desserts = data.items // 아이템들
                            this.totalDesserts = data.total // 토탈.. 이게 의미가 있나?
                            this.pagination.totalpages = data.pagetotal
                            this.$store.commit({
                                type:'BoardCheck',
                                check:false
                            })
                        })
                },
                deep: true
            },
        },
        methods: {
            lastSelectOne(value){ // 마지막꺼 필터로 긁어올때 쓰면 좋을듯?
                return this.catelastList.filter(c=>c.idx === value);
            },
            getDataFromApi () {
                this.loading = true
                return new Promise((resolve, reject) => {
                    var data = new FormData();
                    var step1 = this.select.abbr
                    var step2 = this.subselect.state
                    var step3 = this.lastselect.state
                    var cmd;

                        if(this.readMode == 'piece'){
                            cmd = '2001';
                        } else if(this.readMode == 'set'){
                            cmd = '2011';
                        } else {
                            cmd = '2001';
                        }

                    data.append('cmd', cmd);
                    data.append('page', this.pagination.page)

                    data.append('step1', step1)
                    data.append('step2', step2)
                    data.append('step3', step3)


                    axios.post(CONF.BOARD_INFO, data)
                        .then((response)=>{
                            var items = response.data.info
                            var total = response.data.itemcount
                            var pagetotal = response.data.tpage
                            setTimeout(() => {
                                this.loading = false
                                resolve({
                                    items,
                                    total,
                                    pagetotal
                                })
                            }, 200)
                        })
                })
            },

            itemSelect(item) {
                this.$store.commit({ type:'BoardPage', pageno:this.pagination.page })
                this.$store.commit({ type:'BoardCheck', check:true })
                this.$router.push({ name :"boardDetails", params:{ idx:item}})

            },
            newBoardWrite(){
                this.$store.commit({ type:'adBoardMode', mode:'add' })

                if(this.readMode == 'piece'){
                    this.$router.push({ name :"boardsWrite", params:{ mode:'add' }})
                } else {
                    this.$router.push({ name :"boardsetEdit", params:{ idx:'add' }, query:{mode:'add'} })
                }

            },
            BoardEdit(item){
                this.$store.commit({ type:'adBoardMode', mode:'edit' })
                if(this.readMode == 'piece'){
                    this.$router.push({ name :"boardsEditor", params:{ idx:item }})
                } else {
                    this.$router.push({ name :"boardsetEdit", params:{ idx:item }})
                }

            },
            submitBtn(){
                if(this.select.abbr == 'notice'){
                    this.$store.commit(Constant.BOARD_CURRENT_VIEW, {view : 'boards_notice'})
                    this.$store.commit({ type:'BoardPage', pageno:1 })
                    this.$store.commit({ type:'BoardCheck', check:false })
                    this.$router.push({name:'boards', query:{cate:'notice', subcate:true,subcatevalue:'' }})
                } else if(this.select.abbr == 'trip'){

                    this.$store.commit(Constant.BOARD_CURRENT_VIEW, {view : 'boards_trip'})
                    this.$store.commit({ type:'BoardPage', pageno:1 })
                    this.$store.commit({ type:'BoardCheck', check:false })
                    this.$router.push({name:'boards', query:{ no:this.subselect.abbr,
                                                                nq:this.lastselect.abbr,
                                                                cate:'trip',
                                                                scateState:this.subselect.state,
                                                                scateAbbr:this.subselect.abbr,
                                                                scateCode:this.subselect.code,
                                                                lcateState:this.lastselect.state,
                                                                lcateAbbr:this.lastselect.abbr,
                                                                lcateCode:this.lastselect.code
                    }})
                } else {
                    console.log( 'submitbtn noting')
                }

            },
            selectChange(selectObj){
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
            selectSubChange(selectObj){
                this.$store.commit(Constant.CHANGE_REGION, {region : selectObj})
                var lastdataArr = [];
                var lastdata = this.$store.getters.lastcateBySelect
                for(let i = 0; lastdata.length > i; i++){
                    lastdataArr.push({state:lastdata[i].cate_sub_kor, abbr:lastdata[i].idx , code:lastdata[i].cate})
                }
                this.lastsubitems = lastdataArr;
            },
            selectLastChange(select){

            }
        }



    }
</script>

<style scoped>

</style>