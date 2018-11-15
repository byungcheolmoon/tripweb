<template>
    <div>

            <v-tabs
                    slot="extension"
                    v-model="tabs"
                    fixed-tabs
                    color="transparent"
            >
                <v-tab v-bind:to="{ name :'add'}" class="primary--text">
                    <p>step1</p>
                </v-tab>
                <v-tab href="#mobile-tabs-5-2" class="primary--text">
                    <p>step2</p>
                </v-tab>
            </v-tabs>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "admin-video-list",
        data () {
            return {
                tabs: null,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
        }
    }
</script>

<style scoped>

</style>