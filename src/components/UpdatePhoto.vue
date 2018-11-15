<template>

    <div class="modal">

        <div class="form" @keyup.esc="cancelEvent">
            <form method="post" enctype="multipart/form-data">

                <v-card>
                    <v-img
                            :src="this.img"
                            aspect-ratio="1"
                    ></v-img>
                </v-card>
                <br>

                <input ref="photofile" type="file" name='uploadedfile' class="pa-1" style="width: 100%"/>
                <v-divider light></v-divider>

                <br>
                <table style="width: 100%">
                    <tr>
                        <td style="text-align: left">
                            <v-btn color="error" @click="deleteImg">삭제</v-btn>
                        </td>
                        <td>
                            <v-btn block color="success" @click="submit">변경</v-btn>
                        </td>
                        <td style="text-align: right">
                            <v-btn @click="cancelEvent">취소</v-btn>
                        </td>
                    </tr>
                </table>



            </form>
        </div>
    </div>
</template>

<script>
    import Constant from '../Constant';
    import { mapState } from 'vuex';

    export default {
        name : "update-photo",
        props : [ 'imgno', 'idx' ],
        data: function(){
            return {
               img:''
            }
        },
        mounted : function() {
            switch (this.imgno){
                case 1:
                    if(this.imgs.img_1 != "none"){
                        this.img = this.imgs.img_1
                        //console.log("img1 in");
                    } else {
                        this.img = 'http://nawara-fish.com/prc/img/noimg.png'
                        //console.log("img1 none in");
                    }
                    break;
                case 2:
                    if(this.imgs.img_2 != "none"){
                        this.img = this.imgs.img_2
                    } else {
                        this.img = 'http://nawara-fish.com/prc/img/noimg.png'
                    }
                    break;
                case 3:
                    if(this.imgs.img_3 != "none"){
                        this.img = this.imgs.img_3
                    } else {
                        this.img = 'http://nawara-fish.com/prc/img/noimg.png'
                    }
                    break;
                case 4:
                    if(this.imgs.img_4 != "none"){
                        this.img = this.imgs.img_4
                    } else {
                        this.img = 'http://nawara-fish.com/prc/img/noimg.png'
                    }
                    break;
                case 5:
                    if(this.imgs.img_5 != "none"){
                        this.img = this.imgs.img_5
                    } else {
                        this.img = 'http://nawara-fish.com/prc/img/noimg.png'
                    }
                    break;
                case 6:
                    if(this.imgs.img_6 != "none"){
                        this.img = this.imgs.img_6
                    } else {
                        this.img = 'http://nawara-fish.com/prc/img/noimg.png'
                    }
                    break;
                case 7:
                    if(this.imgs.img_7 != "none"){
                        this.img = this.imgs.img_7
                    } else {
                        this.img = 'http://nawara-fish.com/prc/img/noimg.png'
                    }
                    break;
                case 8:
                    if(this.imgs.img_8 != "none"){
                        this.img = this.imgs.img_8
                    } else {
                        this.img = 'http://nawara-fish.com/prc/img/noimg.png'
                    }
                    break;
                case 9:
                    if(this.imgs.img_9 != "none"){
                        this.img = this.imgs.img_9
                    } else {
                        this.img = 'http://nawara-fish.com/prc/img/noimg.png'
                    }
                    break;
            }
        },
        computed:{
            ...mapState({
                imgs: state => state.admin.prodContactDetailImgs
            }),
        },
        methods : {
            cancelEvent : function() {
                this.$router.go(-1)
            },
            submit : function() {
                var file = this.$refs.photofile.files[0];
                this.$store.dispatch(Constant.UPDATE_PHOTO, { idx:this.idx, img_num:this.imgno, file:file });
                this.$router.go(-1)
            },
            deleteImg: function () {
                this.$store.dispatch(Constant.UPDATE_PHOTO_DEL, { idx:this.idx, img_num:this.imgno });
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .modal { z-index:10; display: block;  position: fixed;  z-index: 1;
        left: 0; top: 0; width: 100%; height: 100%; overflow: auto;
        background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);  }
    .form { z-index:10;  background-color: white;  margin:100px auto;
        max-width: 400px;  min-width: 200px;  padding: 10px 10px 10px 10px;
        font: 13px "verdana"; }
    .form div { padding: 0; display: block; margin: 10px 0 0 0; }
    .form label{ text-align: left; margin:0 0 3px 0; padding:0px;
        display:block; font-weight: bold; }
    .form input, textarea, select { box-sizing: border-box;
        border:1px solid #BEBEBE; padding: 7px; margin:0px;
        outline: none;  }
    .form .long { width: 100%; }
    .form .heading { background: #33A17F; font-weight: 300;
        text-align: left; padding : 20px; color: #fff;
        margin:5px 0 30px 0; padding: 10px; min-width:200px;
        max-width:400px; }
    img.thumb { width:160px; }
</style>