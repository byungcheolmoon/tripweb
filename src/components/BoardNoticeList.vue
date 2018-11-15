<template>
    <v-container fill-height>
        <v-layout align-center>
            <v-flex>

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
                        <tr @click="itemSelect(props.item.notice_idx)">
                            <td class="text-xs-center">{{ props.item.notice_idx }}</td>
                            <td class="text-xs-center">{{ props.item.notice_title }}</td>
                            <td class="text-xs-center">{{ props.item.notice_wdate }}</td>
                        </tr>
                    </template>
                </v-data-table>
                <div class="text-xs-center pt-2">
                    <v-pagination v-model="pagination.page" :length="pageCheck"></v-pagination>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import axios from 'axios';
    import Constant from "../Constant";
    import CONF from "../Config";
    import { mapState, mapMutations } from "vuex";

    export default {
        name: "board-notice-list",
        props:['cate'],
        data () {
            return {
                totalDesserts: 0,
                desserts: [],
                loading: true,
                pagination: { page:0, totalItems:'', rowsPerPage:'5', totalpages:0 },
                headers: [
                    { align:'center', text: 'idx', value: 'notice_idx' },
                    { align:'center', text: 'title', value: 'notice_title' },
                    { align:'center', text: 'date', value: 'notice_wdate' },
                ],
            }
        },
        computed:{
            ...mapState({
                fetchPageno : state => state.board.noticeBoardPage.pageno,
                currentview : state => state.board.currentview
            }),
            pageCheck(){
                return this.pagination.totalpages
            }
        },
        watch: {
            /*fetchPageno: function (newfetchPageno) {
                this.pagination.page = newfetchPageno;
            },*/
            pagination: {
                handler () {
                    this.getDataFromApi()
                        .then(data => {
                            this.desserts = data.items // 아이템들
                            this.totalDesserts = data.total // 토탈.. 이게 의미가 있나?
                            this.pagination.totalpages = data.pagetotal
                        })
                },
                deep: true
            }
        },
        mounted () {

            console.log(this.cate);
            this.getDataFromApi()
                .then(data => {
                    this.desserts = data.items
                    this.totalDesserts = data.total
                    this.pagination.totalpages = data.pagetotal
                    this.pagination.page  = this.fetchPageno
                    this.$store.commit({
                        type:'NoticeBoardPage',
                        pageno:1
                    })
                })






        },
        methods: {

            getDataFromApi () {
                this.loading = true
                return new Promise((resolve, reject) => {

                    var data = new FormData();
                    data.append('cmd', '2001');
                    data.append('page', this.pagination.page)
                    data.append('boardtype', 'noticetop')

                    axios.post(CONF.BOARD_INFO, data)
                        .then((response)=>{
                            console.log(response);
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
                this.$store.commit({
                    type:'NoticeBoardPage',
                    pageno:this.pagination.page
                })
                console.log(this.currentview)
                if(this.currentview == 'boards_notice'){
                    this.$router.push({ name :"boardsEditor", params:{ cate : 'notice', subcate: '', subcatevalue:'',pageno:1, type:'editor', idx:item}})
                }
            },

        }



    }
</script>

<style scoped>

</style>