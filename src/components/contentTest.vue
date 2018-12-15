<template>

        <v-container>
            <v-layout align-center justify-center row fill-height>
                <v-flex xs10>
                    <div class="quill-editor-example">
                        <!-- quill-editor -->
                        <quill-editor v-model="content"
                                      ref="myQuillEditor"
                                      :options="editorOption"
                                      @blur="onEditorBlur($event)"
                                      @focus="onEditorFocus($event)"
                                      @ready="onEditorReady($event)"
                                      @change="onEditorChange($event)">

                        </quill-editor>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>

</template>

<script>
    import Quill from 'quill'
    import { quillEditor } from 'vue-quill-editor'
    import { ImageDrop } from 'quill-image-drop-module'
    import ImageResize from 'quill-image-resize-module';

    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    Quill.register('modules/imageDrop', ImageDrop)
    Quill.register('modules/imageResize', ImageResize);

    export default {
        name: "admin-prod-detail-step2",
        props: ['no', 'mode'],
        components:{
            quillEditor
        },
        data() {
            return {
                name: 'register-modules-example',
                content: '',
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image', 'video']
                        ],
                        history: {
                            delay: 1000,
                            maxStack: 50,
                            userOnly: false
                        },
                        imageDrop: true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        },
                    }
                },
            }
        },
        mounted() {
            this.content = `<p><strong><em>Click on the Image Below to resize!</em></strong></p><br>` + this.content
        },
        computed: {
            contentCode() {
                return this.content
            },
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
            onEditorBlur(editor) {
                // console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                // console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                // console.log('editor ready!', editor)
            },
            onEditorChange({ quill, html, text }) {
                this.content = html
            }
        }
    }
</script>
<style>
    .quill-editor:not(.bubble) .ql-container,
    .quill-editor:not(.bubble) .ql-container .ql-editor {
        height: 30rem;
        padding-bottom: 1rem;
    }
</style>

<style lang="scss" scoped>
    .quill-editor,
    .quill-code {
        width: 50%;
        float: left;
    }
    .quill-code {
        height: auto;
        border: none;
        > .title {
            border: 1px solid #ccc;
            border-left: none;
            height: 3em;
            line-height: 3em;
            text-indent: 1rem;
            font-weight: bold;
        }
        > code {
            width: 100%;
            margin: 0;
            padding: 1rem;
            border: 1px solid #ccc;
            border-top: none;
            border-left: none;
            border-radius: 0;
            height: 30rem;
            overflow-y: auto;
        }
    }
</style>