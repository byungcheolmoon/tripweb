<template>
    <v-container>

        <v-responsive>
            <v-container fill-height>
                <v-layout align-center>
                    <v-flex>
                        <h3 class="display-3">Notice</h3>
                        <span class="subheading">공지사항 - 나와라 낚시대 공지사항입니다.</span>
                        <v-divider class="my-3"></v-divider>
                        <!--<div class="title mb-3">Check out our newest features!</div>-->
                    </v-flex>
                </v-layout>
            </v-container>
        </v-responsive>

       <router-view></router-view>

    </v-container>
</template>

<script>
    import axios from 'axios';
    import Constant from "../Constant";
    import CONF from "../Config";

    export default {
        name: "board-description",
        data () {
            return {
                totalDesserts: 0,
                desserts: [],
                loading: true,
                pagination: { },
                headers: [
                    { align:'center', text: 'idx', value: 'notice_idx' },
                    { align:'center', text: 'title', value: 'notice_title' },
                    { align:'center', text: 'date', value: 'notice_wdate' },
                ],
            }
        },
        watch: {
            pagination: {
                handler () {
                    this.getDataFromApi()
                        .then(data => {
                            this.desserts = data.items // 아이템들
                            this.totalDesserts = data.total // 토탈.. 이게 의미가 있나?
                        })
                },
                deep: true
            }
        },
        mounted () {
            this.getDataFromApi()
                .then(data => {
                    this.desserts = data.items
                    this.totalDesserts = data.total
                })
        },
        methods: {

            getDataFromApi () {
                this.loading = true
                return new Promise((resolve, reject) => {

                    var data = new FormData();
                    data.append('cmd', '2001');
                    data.append('page', this.pagination.page)

                    axios.post(CONF.BOARD_INFO, data)
                        .then((response)=>{
                            var items = response.data.info
                            var total = response.data.itemcount
                            setTimeout(() => {
                                this.loading = false
                                resolve({
                                    items,
                                    total
                                })
                            }, 200)
                        })
                })
            },

            itemSelect(item) {
                console.log(item);
                this.$store.commit({
                    type:'NoticeBoardPage',
                    pageno:this.pagination.page
                })
                this.$router.push({ name :"boardDetail", params: { idx : item }})

            },


        }




    }
</script>

<style scoped>

</style>