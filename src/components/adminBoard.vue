<template>
    <div>
    <v-container>
        <v-parallax
                dark
                height="100"
                src="http://nawara-fish.com/prc/img/paller01.jpg"
        >
            <v-layout
                    align-center
                    column
                    justify-center
            >
                <h1 class="display-2 font-weight-thin mb-3">TripWith56</h1>
                <h4 class="subheading font-weight-regular">관리자들이 작성 및 수정하는 게시판입니다. 상품 및 일반 후기 등..</h4>
            </v-layout>
        </v-parallax>
    </v-container>

            <router-view :key="$route.fullPath"></router-view>

    </div>
</template>

<script>
    export default {
        name: "admin-board",
    }
</script>