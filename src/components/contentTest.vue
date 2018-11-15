
    <template>
        <v-container fluid>
            <v-layout row wrap align-center>
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
                            label="선택해주세요."
                            persistent-hint
                            return-object
                            single-line
                            :loading="loading"
                    ></v-select>
                </v-flex>
                <v-flex xs3 d-flex class="pa-2">
                    <v-btn @click="submitBtn"> 버튼</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </template>


<script>
    export default {
        name: "content-test",
        data () {
            return {
                loading: false,
                select: { state: '', abbr: '' },
                items: [
                    { state: '바다', abbr: 'cate1' },
                    { state: '민물', abbr: 'cate2' },
                    { state: '선상', abbr: 'cate3' }
                ],
                subselect :{ state: '', abbr: ''  },
                subitems:[
                ]
            }
        },
        mounted(){
            this.loading = true
            this.select = { state: '바다', abbr: 'cate1' }
            this.subselect = { state: '광어', abbr: 'ba1' }
            this.loading = false

            },
        methods:{
            submitBtn(){
                console.log(this.select.state)
                console.log(this.subselect.state)
            },
            selectChange(selectObj){
                this.subitems = this.subMenu(selectObj.state)
            },
            subMenu(value){
                if(value == '바다'){
                    return [
                        { state: '광어', abbr: 'ba1' },
                        { state: '우럭', abbr: 'ba2' },
                        { state: '고등어', abbr: 'ba3' },
                        { state: '손재익', abbr: 'ba4' },
                    ]
                } else {
                    return [
                        { state: '배스', abbr: 'm1' },
                        { state: '박세정', abbr: 'm2' },
                        { state: '성진', abbr: 'm3' },
                        { state: '블루길', abbr: 'm4' },
                    ]
                }

            }
        },

    }
</script>

<style scoped>

</style>