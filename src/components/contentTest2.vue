<template>
    <div id="apps">
        <v-btn @click="lotest()">저장</v-btn>
        <froala :tag="'textarea'" :config="config" v-model="model"></froala>
        <froalaView :config="config" v-model="model"></froalaView>
    </div>
</template>

<script>

    export default {
        name: 'apps',
        data () {
            return {
                config: {
                    placeholder: "Edit Me",
                    events: {
                        'froalaEditor.initialized': function () {
                            console.log('initialized')
                        },
                        'froalaEditor.image.beforeUpload': (e, editor, images) => {
                            editor.opts.imageUploadParams['data'] = '8000';
                            editor.opts.imageUploadURL = 'http://nawara-fish.com/web/tripajax/board.php';
                            editor.opts.imageUploadMethod = 'POST';
                            return true
                        },
                        'froalaEditor.focus' : function(e, editor) {
                            console.log(editor.selection.get());
                        }
                    },
                },
                model: '<p>Edit Your Content Here!<img src="http://nawara-fish.com/web/trip/src/assets/images/2.jpg" style="width: 300px;" class="fr-fic fr-dib"></p>',
            }
        },
        methods:{
            lotest(){
                console.log(this.model);
            }
        }
    }

</script>