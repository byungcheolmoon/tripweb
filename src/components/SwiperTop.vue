<template>
  <div>
         <!-- swiper1 -->
        <div style="height:400px">
          <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide class="slide-1">
              <div class="title_swiper">Slide 1</div>
              <br>
              <div class="subtitle_swiper">Subtitle</div>
              <div class="text_swiper">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
              </div>
            </swiper-slide>
            <swiper-slide class="slide-2">
              <div class="title_swiper">Slide 2</div>
              <br>
              <div class="subtitle_swiper">Subtitle</div>
              <div class="text_swiper">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
              </div>
            </swiper-slide>
            <swiper-slide class="slide-3"></swiper-slide>
            <swiper-slide class="slide-4"></swiper-slide>
            <swiper-slide class="slide-5"></swiper-slide>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          </swiper>
          <!-- swiper2 Thumbs -->
          <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide class="slide-1" style="padding-top:10px;padding-left:50px">
              <div class="text">
                <h1>Slide Title</h1>
              </div>
            </swiper-slide>
            <swiper-slide class="slide-2"></swiper-slide>
            <swiper-slide class="slide-3"></swiper-slide>
            <swiper-slide class="slide-4"></swiper-slide>
            <swiper-slide class="slide-5"></swiper-slide>
          </swiper>
      </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "swipertop",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOptionTop: {
        spaceBetween: 4,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        speed: 1000
      },
      swiperOptionThumbs: {
        direction: "vertical",
        spaceBetween: 4,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        slideToClickedSlide: true
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper;
      const swiperThumbs = this.$refs.swiperThumbs.swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  background-color: #ffffff;
}

.swiper-slide {
  color: #fff;
  padding: 40px 60px;

  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  background-color: transparent !important;
  justify-content: space-around !important;

  background-size: cover;
  background-position: center;
  &.slide-1 {
    background-image: url("../assets/images/1.jpg");
  }
  &.slide-2 {
    background-image: url("../assets/images/2.jpg");
  }
  &.slide-3 {
    background-image: url("../assets/images/3.jpg");
  }
  &.slide-4 {
    background-image: url("../assets/images/4.jpg");
  }
  &.slide-5 {
    background-image: url("../assets/images/5.jpg");
  }
}

.swiper-slide .title_swiper {
  font-size: 41px;
  font-weight: 300;
}
.swiper-slide .subtitle_swiper {
  font-size: 21px;
}
.swiper-slide .text_swiper {
  font-size: 14px;
  max-width: 400px;
  line-height: 1.3;
}
.gallery-top {
  height: 100% !important;
  width: 80%;
  float: left;
}
.gallery-thumbs {
  height: 100% !important;
  width: 20%;
  box-sizing: border-box;
  padding: 4px 0;
}
.gallery-thumbs .swiper-slide {
  width: 100%;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>