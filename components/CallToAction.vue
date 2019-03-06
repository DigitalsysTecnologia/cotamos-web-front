<template>
  <div>
    <a
      :href="this.targetUrl"
      v-bind:class="{ 'button is-large is-fullwidth call-to-action': true, 'is-loading': isLoading }"
      :style="{ 'color': textColor}"
      v-on:click="this.onClick"
    >
      <slot/>
    </a>
  </div>
</template>

<script>
import StringMask from "string-mask";

export default {
  name: "CallToAction",
  methods: {
    onClick: function(e) {
      this.$emit("click", null);
    }
  },
  props: {
    className: {
      type: String,
      required: false
    },
    textColor: {
      type: String,
      required: false,
      default: "#fff"
    },
    targetUrl: {
      type: String,
      required: false
    },
    isLoading: {
      type: Boolean,
      required: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.call-to-action {
  border: 1px solid transparent;
  vertical-align: middle;
  font-size: 14px;
  letter-spacing: -0.5px;
  border-radius: 100px;
  cursor: pointer;
  padding: 5px 30px;
  text-align: center;
  background-image: linear-gradient(to bottom, orange, #ff8400);
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
}
.button {
  font-weight: bold;
}
</style>
