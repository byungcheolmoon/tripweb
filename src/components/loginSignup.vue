<template>
    <div class="modal">

        <v-container grid-list-xl text-xs-center style="margin-top:100px; padding-top:0px; padding-bottom:0px;">
            <v-layout row >
                <v-flex xs4  offset-xs4>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                        ></v-text-field>
                        <v-text-field
                                :append-icon="show3 ? 'visibility_off' : 'visibility'"
                                :rules="[rules.required, rules.min]"
                                :type="show3 ? 'text' : 'password'"
                                name="input-10-2"
                                v-model="password"
                                label="password"
                                hint="At least 8 characters"
                                value=""
                                class="input-group--focused"
                                @click:append="show3 = !show3"
                        ></v-text-field>

                        <router-link v-bind:to="{ name : 'nsignup'}" style="text-decoration:none"><v-btn color="info">회원가입</v-btn> </router-link>

                        <v-btn color="success" :disabled="!valid" @click="submit">
                            로그인
                        </v-btn>

                        <v-btn  @click="clear">초기화</v-btn>

                    </v-form>
                    <v-divider style="margin-top:20px; margin-bottom:20px;"></v-divider>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "login-signup",
        data: () => ({
            page: "",
            // 폼데이터 시작
            valid: true,
            name: '',
            show3: false,
            password: 'Password',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => ('The email and password you entered don\'t match')
            },
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            checkbox: false
            // 폼데이터 끝
        }),
        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                }
            },
            clear () {
                this.$refs.form.reset()
            },
            signup (){
                console.log('sign up');
            }
        }
    }
</script>

<style scoped>
    .modal {
        display: block;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(255, 255, 255);
        background-color: rgba(255, 255, 255, 1);
    }
</style>