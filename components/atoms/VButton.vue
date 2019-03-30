<template>
  <div>
    <a
      :href="this.targetUrl"
      v-bind:class="{ 'button': true, 'is-loading': isLoading , 'is-fullwidth': isFullWidth}"
      :style="{ 'color': textColor, 'background-color': backgroundColor }"
      v-on:click="this.onClick"
    >
      <slot/>
    </a>
  </div>
</template>

<script>
import StringMask from "string-mask";

export default {
  name: "VButton",
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
    backgroundColor: {
      type: String,
      required: false,
      default: "#fff"
    },
    textColor: {
      type: String,
      required: false,
      default: "#000"
    },
    targetUrl: {
      type: String,
      required: false
    },
    isLoading: {
      type: Boolean,
      required: false
    },
    isFullWidth: {
      type: Boolean,
      required: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
