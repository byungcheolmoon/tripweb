<template>
    <div id="apps">
        <v-btn @click="lotest()">저장</v-btn>
        <vue-editor id="editor"
                useCustomImageHandler
                @imageAdded="handleImageAdded"
                :customModules="customModulesForEditor"
                :editorOptions="editorSettings"
                v-model="content">
        </vue-editor>
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";
    import { ImageDrop } from "quill-image-drop-module";
    import ImageResize from "quill-image-resize-module";

    export default {
        components: {
            VueEditor
        },
        data() {
            return {
                content: "",
                customToolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['image', 'code-block']
                ],
                customModulesForEditor: [
                    { alias: "imageDrop", module: ImageDrop },
                    { alias: "imageResize", module: ImageResize }
                ],
                editorSettings: {
                    modules: {
                        imageDrop: true,
                        imageResize: {},
                    }
                }
            };
        },
        mounted(){
          this.content = '<h1>Initial Content111111111111111</h1>'
        },
        methods: {
            lotest(){

                console.log(this.content);
            },
            handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
                // An example of using FormData
                // NOTE: Your key could be different such as:
                // formData.append('file', file)

                Editor.insertEmbed(cursorLocation, "image", 'http://nawara-fish.com/web/trip/src/assets/images/1.jpg');

                /*var formData = new FormData();
                formData.append("image", file);

                axios({
                    url: "https://fakeapi.yoursite.com/images",
                    method: "POST",
                    data: formData
                })
                    .then(result => {
                        let url = result.data.url; // Get url from response
                        Editor.insertEmbed(cursorLocation, "image", url);
                        resetUploader();
                    })
                    .catch(err => {
                        console.log(err);
                    });*/
            }
        }
    };
</script>