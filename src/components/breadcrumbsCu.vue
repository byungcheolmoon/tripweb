<template>

        <v-flex xs6 d-flex>
            <v-breadcrumbs :items="itemsBreads">
                <v-icon slot="divider">chevron_right</v-icon>
            </v-breadcrumbs>
         <!--   <v-breadcrumbs >
                <v-breadcrumbs-item>
                    Board
                </v-breadcrumbs-item>
                <v-breadcrumbs-item>
                    {{ this.boardTitle }}
                </v-breadcrumbs-item>
            </v-breadcrumbs>-->
        </v-flex>

</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "breadcrumbs-cu",
        data () {
            return {
                itemsBreads: []
            }
        },
        created(){ // created 는 data만 로드된 상태임으로 아직 dom은 배치되지 않았다.
            switch (this.currentview){
                case 'boards_notice' :
                    this.itemsBreads = [{text:'관리자게시판',disabled:false,href:'#'},{text:'공지사항',disabled:false,href:'#'}];
                    break;
                case 'boards_vietnam' :
                    this.itemsBreads = [{text:'관리자게시판',disabled:false,href:'#'},{text:'베트남',disabled:false,href:'#'}];
                    break;
                default:
                    this.itemsBreads = [{text:'관리자게시판',disabled:false,href:'#'},{text:'default',disabled:false,href:'#'}];
                    break;
            }
        },
        computed:{
            ...mapState({
                currentview : state => state.board.currentview,
            }),
        },
    }
</script>

<style scoped>

</style>