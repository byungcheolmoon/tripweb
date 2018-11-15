<template>

    <v-container id="vcont">
        <v-layout row wrap>

            <bread-custom></bread-custom>


            <!--<v-flex xs1 offset-xs5 d-flex justify-end>
                    <v-btn  round color="primary" block>수정</v-btn>
                <v-btn  dark round color="indigo" block>뒤로가기</v-btn>
            </v-flex>-->

            <v-flex xs12 offset-xs10 d-flex>
                <v-btn  round color="primary" block style="margin-right:5px;">수정</v-btn>
                <v-btn  dark round color="indigo" block>뒤로가기</v-btn>
            </v-flex>

            <v-flex  xs12 sm4 offset-sm4  d-flex v-if="this.titleImgCheck == true">
                <v-card>
                    <v-img
                            class="white--text"
                            height="400px"
                            :src="this.titleImg"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline">TITLE SAMPLE</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                    <v-card-title>
                        <div>
                            <span class="grey--text">Number 10</span><br>
                            <span>Whitehaven Beach</span><br>
                            <span>Whitsunday Island, Whitsunday Islands</span>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>


            <v-flex xs12 style="margin-top:30px;">
                <v-text-field
                        label="제목"
                        flat
                        single-line
                        background-color="#ffffff"
                        height="60px"
                        v-model="title"
                        readonly
                >
                </v-text-field>
            </v-flex>
            <v-flex xs12 d-flex>
                <div id="textareaCustom" v-html="this.content">
                </div>
            </v-flex>
            <v-layout align-center justify-end row fill-height style="margin-top:15px;">
                <v-flex xs1>
                    <v-btn  round color="primary" block>수정</v-btn>
                </v-flex>
                <v-flex xs1 style="margin-left:10px;">
                    <v-btn  dark round color="error" block>삭제</v-btn>
                </v-flex>
                <v-flex xs1 style="margin-left:10px;">
                    <v-btn  dark round color="indigo" block>뒤로가기</v-btn>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import Constant from "../Constant";
    import CONF from "../Config";
    import { mapState, mapMutations } from "vuex";
    import BreadCustom from './breadcrumbsCu'

    export default {
        //1. viewType, idx -> ajax -> localdata viewWrite
        //2. edit -> router.push -> editorviewWrite
        // -- module
        name: "board-details",
        components:{
            BreadCustom
        },
        props:['idx'],
        data () {
            return {
                loading: true,
                boardTitle:'',
                viewType:'',
                title:'',
                content:'',
                titleImg: '',
                titleImgCheck: false
            }
        },
        created(){
            this.getDataApi()
                .then(data => {
                    this.title = data.title // 타이틀
                    this.content = data.content // 콘텐츠
                    this.titleImg = data.img
                    if(data.img != 'none'){
                        this.titleImgCheck = true;
                    } else {
                        this.titleImgCheck = false;
                    }
                })
        },
        computed: {
            ...mapState({
                currentview: state => state.board.currentview
            })
        },
        methods: {
            getDataApi () {
                this.loading = true
                return new Promise((resolve, reject) => {
                    var data = new FormData();
                    data.append('cmd', '2002');
                    data.append('idx', this.idx);

                    axios.post(CONF.BOARD_INFO, data)
                        .then((response)=>{
                            var title = response.data.info.title
                            var content = response.data.info.content
                            var img     = response.data.info.img
                            var cate     = response.data.info.cate
                            var cate_sub     = response.data.info.cate_sub
                            setTimeout(() => {
                                this.loading = false
                                resolve({
                                    title,
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
    }
</script>

<style scoped>
    #vcont{
        padding-top:0px;
    }
    #textareaCustom{
        background-color: white;
        min-height: 500px;
        border-bottom:solid 1px rgba(0,0,0,.3);
        border:solid 1px lightgray;
        padding:30px;
        /*box-shadow: 1px 3px 2px rgba(0,0,0,.2);*/

    }
</style>