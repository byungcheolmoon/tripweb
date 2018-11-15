<template>

        <v-flex xs6 d-flex>
            <v-breadcrumbs>
                <v-breadcrumbs-item>
                    Board
                </v-breadcrumbs-item>
                <v-breadcrumbs-item>
                    {{ this.boardTitle }}
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </v-flex>

</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "breadcrumbs-cu",
        data () {
            return {
                boardTitle:'',
            }
        },
        created(){ // created 는 data만 로드된 상태임으로 아직 dom은 배치되지 않았다.
            switch (this.currentview){
                case 'boards_notice' :
                    this.boardTitle = '공지사항'
                    break;
                case 'boards_vietnam' :
                    this.boardTitle = '베트남'
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