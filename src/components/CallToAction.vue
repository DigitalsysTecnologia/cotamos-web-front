<template>
  <button class="btn call-to-action" :class="className" v-on:click="this.onClick">
    <slot />
  </button>
</template>

<script>
import StringMask from "string-mask";

export default {
  name: "CallToAction",
  methods: {
    onClick: function() {
      this.$emit("click", null);
    }
  },
  props: {
    className: {
      type: String,
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
  color: #fff;
  background-image: linear-gradient(to bottom, orange, #ff8400);
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
}
</style>
