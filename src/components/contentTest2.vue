<template>
    <div id="apps">
        <v-btn @click="lotest()">저장</v-btn>
        <froala :tag="'textarea'" :config="config" v-model="model"></froala>
    </div>
</template>

<script>
    import VueFroala from 'vue-froala-wysiwyg';

    export default {
        name: 'apps',
        data () {
            return {
                config: {
                    events: {
                        'froalaEditor.initialized': function () {
                            console.log('initialized')
                        },
                        'froalaEditor.image.inserted': function (e, editor, $img, response){
                            return 'asdf';
                        }
                    },
                },

                model: 'Edit Your Content Here!',
            }
        },
        methods:{
            lotest(){

                console.log(this.model);
            }
        }
    }
</script>