<template>
    <div>

        <v-container fluid>
            <loading v-show="isloading"></loading>
            <v-layout row justify-space-between class="pa-1">
                <v-flex xs2 offset-xs10>
                   <v-btn class="info" @click="newWriteProd" block>새로 작성하기</v-btn>

                </v-flex>
            </v-layout>

            <v-data-table
                    :headers="headers"
                    :items="contents"
                    :search="search"
                    :pagination.sync="pagination"
                    hide-actions
                    class="elevation-1"
                    disable-initial-sort

            >
                <template slot="items" slot-scope="props">
                    <tr @click="itemSelect(props.item.idx)">
                        <td class="text-xs-center">{{ props.item.idx }}</td>
                        <td class="text-xs-center">{{ props.item.prod_fishtype }}</td>
                        <td class="text-xs-center">{{ props.item.prod_img }}</td>
                        <td class="text-xs-center">{{ props.item.prod_name }}</td>
                        <td class="text-xs-center">{{ props.item.prod_paytext }}</td>
                        <td class="text-xs-center">{{ props.item.prod_state }}</td>
                        <td class="text-xs-center">{{ props.item.prod_wdate }}</td>
                        <td class="text-xs-center"><v-btn  color="error" @click.stop="itemDelete(props.item.idx)">삭제</v-btn></td>
                    </tr>
                </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </v-container>
    </div>
</template>

<script>
    import { mapState, mapMutations } from "vuex";
    import Constant from "../Constant";
    import Loading from './Loading.vue';

    export default {
        name: "admin-prod-list",
        components : { Loading },
        data () {
            return {
                search: '',
                pagination: { totalItems:'', rowsPerPage:'4'},
                selected: [],
                headers: [
                    { text: 'idx', value: 'idx' },
                    { text: '타입', value: 'prod_fishtype' },
                    { text: '이미지', value: 'prod_img' },
                    { text: '상품명', value: 'prod_name' },
                    { text: '비용', value: 'prod_paytext' },
                    { text: '상태', value: 'prod_state' },
                    { text: '작성일자', value: 'prod_wdate' },
                    { text: '액션', value: '' },
                ],
                contents: []
            }
        },
        mounted() {

            this.$store.dispatch(Constant.PRODUCT_CONTACTS);

        },
        computed:{
            ...mapState({
                fetchs: state => state.admin.prodContacts,
                fetchTotalCount: state => state.admin.prodContactInfo.totalpage,
                fetchPageno: state => state.admin.prodContactInfo.pageno,
                isloading: state => state.admin.isloading
            }),
            pages () {

                if(this.fetchPageno != ""){
                    this.pagination.page = this.fetchPageno
                }
                this.pagination.totalItems = this.fetchTotalCount;

                if (this.pagination.rowsPerPage == null ||
                    this.pagination.totalItems == null
                ) return 0

                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
            }
        },
        watch : {
            fetchs : function(newContacts) {
                this.contents = newContacts;
            },
            fetchTotalCount: function (newTotalPage) {
                this.pagination.totalItems = newTotalPage;
            },
            fetchPageno: function (newfetchPageno) {
                this.pagination.page = newfetchPageno;
            }
        },
        methods:{
            itemSelect(item) {
                this.$store.commit({
                    type:'prodListPage',
                    pageno:this.pagination.page
                })
                this.$router.push({ name :"titleedit", params: { no : item }})

            },
            newWriteProd: function(){
               this.$router.push({name:"writestep1", params:{no : 'new'}})
            },
            itemDelete(item){
                var delConfirm = confirm('정말 삭제하실껍니까요?');
                if(delConfirm){
                    this.$store.dispatch(Constant.PRODUCT_DEL, { idx : item });
                } else {
                    console.log('ㄴㄴ');
                }

            }
        },


    }
</script>

<style scoped>
    .modal { display: block; position: fixed; z-index: 1;
        left: 0; top: 0; width: 100%; height: 100%;
        overflow: auto; background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4); }
    .spinner { position: absolute; left: 50%; top: 50%;
        margin-top:-50px; margin-left:-50px;}
</style>