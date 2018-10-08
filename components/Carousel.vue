<template>
  <no-ssr>
    <Carousel :per-page="1" :mouse-drag="true">
      <Slide v-for="(item,idx) in items" :key="idx">
        <div class="carousel-inner" :style="GetCarouselInnerStyle(item)">
          <div class="row text-container">
            <div class="col-md-6 col-md-offset-2">
              <h1 class="carousel-title text" v-if="item.title">{{item.title}}</h1>
              <h2 class="carousel-subtitle text" v-if="item.subtitle">{{item.subtitle}}</h2>
              <CallToAction v-if="item.callToAction" :targetUrl="item.callToAction.targetUrl">{{ item.callToAction.text }}</CallToAction>  
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>
  </no-ssr>
</template>

<script>
import CallToAction from "@/components/CallToAction";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "CotamosCarousel",
  methods: {
    GetCarouselInnerStyle(item) {
      return {
        "background-image": `url(${item.image})`
      };
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    CallToAction: CallToAction,
    Carousel: Carousel,
    Slide: Slide
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.carousel-inner {
  background-repeat: no-repeat;
  background-size: cover;
  /* text-align: right; */
  height: 400px;
}
.text {
  /* 
  text-shadow: rgb(255, 255, 255) 0px 1px 2px;
  color: rgb(72, 125, 103); 
  */
  text-shadow: rgb(0, 0, 0) 0px 1px 2px;
  color: rgb(255, 255, 255);
}
.carousel-title {
  margin-bottom: 3px;
}
.carousel-subtitle {
  margin-top: 0px;
}
.text-container {
  margin-top: 100px;
  margin-left: 10px;
}
</style>
