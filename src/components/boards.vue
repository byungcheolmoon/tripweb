<template>
    <div>
        <v-container fluid>
            <v-parallax
                    dark
                    height="140"
                    src="http://nawara-fish.com/prc/img/paller01.jpg"
            >
                <v-layout
                        align-center
                        column
                        justify-center
                >
                    <h1 class="display-2 font-weight-thin mb-3">TripWith56</h1>
                    <h4 class="subheading">Make Perfect Your Trip</h4>
                </v-layout>
            </v-parallax>

                <v-layout>
                    <v-flex xs2>

                        <v-navigation-drawer permanent height="600px">
                            <v-toolbar flat>
                                <v-list>
                                    <v-list-tile>
                                        <v-list-tile-title class="title">
                                            Application
                                        </v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-toolbar>

                            <v-divider></v-divider>

                            <v-list dense class="pt-0">
                                <v-list-tile
                                        v-for="item in items"
                                        :key="item.title"
                                        @click="srcboard(item.value)"
                                >

                                    <v-list-tile-action>
                                        <v-icon>{{ item.icon }}</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    </v-list-tile-content>

                                </v-list-tile>
                            </v-list>
                        </v-navigation-drawer>

                    </v-flex>
                    <v-flex xs10>
                        <router-view></router-view>
                    </v-flex>

                </v-layout>

        </v-container>
    </div>

</template>

<script>
    import { mapState } from "vuex";
    import 'vueditor/dist/style/vueditor.min.css'

    export default {
        name: "board-list",
        props: ['mode'],
        data: function() {
            return {
                items: [
                    { title: '기본', icon: 'dashboard', value: 'description' },
                    { title: '작성', icon: 'question_answer', value: 'write' }
                ],
                right: null
            }
        },
        mounted(){
        },
        methods: {
            srcboard(item){
                /*console.log(item);*/
                this.$router.push({name:item})
            }
        }
    };
</script>
<style scoped>
</style>
