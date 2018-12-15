<template>
    <div>
        <v-container >

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
                                hint="소분류 선택"
                                :items="subitems"
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
                    <v-flex xs6 d-flex class="pa-2">
                        <v-btn @click="submitBtn"> 버튼</v-btn>
                    </v-flex>
                </v-flex>

            </v-layout>
        </v-container>
        <v-container>
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

                boardCate :'',
                select: { state: '', abbr: '' },
                items: [
                    { state: '공지사항', abbr: 'notice' },
                    { state: 'QnA', abbr: 'qna' },
                    { state: '베트남', abbr: 'vietnam' }
                ],
                subtitleCheck:true,
                subselect :{ state: '', abbr: ''  },
                subitems:[
                ]
            }
        },
        created(){ // created 는 data만 로드된 상태임으로 아직 dom은 배치되지 않았다.
            if (this.$route.query) {
                if(this.$route.query.cate == 'notice'){
                    this.select = { state: '공지사항', abbr: 'notice' }
                    this.subselect = { state:'',  addr: ''}
                    this.$store.commit(Constant.BOARD_CURRENT_VIEW, {view : 'boards_notice'})
                } else if(this.$route.query.cate =='vietnam'){
                    this.select = { state: '베트남', abbr: 'vietnam' }
                    this.subitems = this.subMenu('베트남');
                    this.$store.commit(Constant.BOARD_CURRENT_VIEW, {view : 'boards_vietnam'})
                } else {
                    console.log('noting');
                }
                if (this.$route.query.subcate) {
                    this.subtitleCheck = false
                    this.subselect.state = this.$route.query.subcate;
                    this.subselect.abbr = this.$route.query.subcatevalue;
                }
            }
        },
        computed:{
            ...mapState({
                fetchPageno : state => state.board.BoardPage.pageno,
                currentview : state => state.board.currentview,
                boardCheck: state => state.board.Boardpcheck
            }),
            pageCheck(){
                return this.pagination.totalpages
            }
        },
        mounted(){
            /*   this.getDataFromApi()
                   .then(data => {
                       this.desserts = data.items // 아이템들
                       this.totalDesserts = data.total // 토탈.. 이게 의미가 있나?
                       this.pagination.totalpages = data.pagetotal
                   })*/
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
                                type:'BaordCheck',
                                check:false
                            })
                        })
                },
                deep: true
            },
        },
        methods: {
            getDataFromApi () {
                this.loading = true
                return new Promise((resolve, reject) => {
                    var data = new FormData();
                    data.append('cmd', '2001');
                    data.append('page', this.pagination.page)
                    data.append('boardtype', this.select.abbr)
                    data.append('boardsubtype', this.subselect.state)

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
                this.$store.commit({ type:'BaordCheck', check:true })
                this.$router.push({ name :"boardDetails", params:{ idx:item}})

            },
            newBoardWrite(){
                this.$router.push({ name :"boardsEditor", params:{ mode:'add' }})
                //this.$router.push({path:'/editor', query:{mode:'add'}})
            },
            BoardEdit(item){
                this.$router.push({ name :"boardsEditor", params:{ idx:item, mode:'edit'}})
                //this.$router.push({path:'/editor', query:{idx:item, mode:'edit'}})
            },
            submitBtn(){
                if(this.select.state == '공지사항'){
                    this.$store.commit(Constant.BOARD_CURRENT_VIEW, {view : 'boards_notice'})
                    this.$store.commit({ type:'BoardPage', pageno:1 })
                    this.$store.commit({ type:'BaordCheck', check:false })
                    this.$router.push({path:'/boards', query:{cate:'notice', subcate:'',subcatevalue:'' }})
                } else if(this.select.state == '베트남'){
                    this.$store.commit(Constant.BOARD_CURRENT_VIEW, {view : 'boards_vietnam'})
                    this.$store.commit({ type:'BoardPage', pageno:1 })
                    this.$store.commit({ type:'BaordCheck', check:false })
                    this.$router.push({path:'/boards', query:{cate:'vietnam', subcate:this.subselect.state, subcatevalue:this.subselect.abbr}})
                } else {
                    console.log( 'submitbtn noting')
                }

            },
            selectChange(selectObj){
                this.subitems = this.subMenu(selectObj.state)

            },
            subMenu(value){
                if(value == '공지사항'){
                    this.subtitleCheck = true
                    return [
                        { state: '전체', abbr: '' },
                    ]
                } else if(value == '베트남') {
                    this.subtitleCheck = false
                    return [
                        { state: '전체', abbr: 'm0' },
                        { state: '베트남소개', abbr: 'm1' },
                        { state: '다낭소개', abbr: 'm2' },
                        { state: '다낭상품', abbr: 'm3' },
                        { state: '호이안소개', abbr: 'm4' },
                        { state: '호이안상품', abbr: 'm5' },
                    ]
                } else {
                    return [
                        { state: '', abbr: '' },
                    ]
                }
            },

        }



    }
</script>

<style scoped>

</style>