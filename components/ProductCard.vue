<template>
  <div class="card">
    <header class="card-header has-text-centered">
      <p class="card-header-title">&nbsp;</p>
    </header>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="imgUrl">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{name}}</p>
        </div>
      </div>
      <div class="content">
        {{description}}
        <br>
        <div class="call-to-action">
          <CallToAction :targetUrl="callToActionUrl">{{callToActionText}}</CallToAction>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CallToAction from "@/components/CallToAction";
export default {
  name: "ProductCard",
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    callToActionText: {
      type: String,
      required: true
    },
    callToActionUrl: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    GoToUrl(path) {
      this.$router.push({
        path: path
      });
    }
  },
  components: {
    CallToAction
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-header {
  background-color: #00d888;
}
.card-header-title {
  color: white;
}
.call-to-action {
  margin-top: 20px;
}
.title {
  color: #00899c;
}
</style>
