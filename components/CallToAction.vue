<template>
  <button class="btn call-to-action" :class="className"  v-on:click="this.onClick">
    <slot />
  </button>
</template>

<script>
import StringMask from "string-mask";

export default {
  name: "CallToAction",
  methods: {
    onClick: function() {
  
      if (this.targetUrl) {
        this.$router.push({
          path: this.targetUrl
        });
      }
      
      this.$emit("click", null);
    }
  },
  props: {
    className: {
      type: String,
      required: false
    },  
    targetUrl: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.call-to-action {
  vertical-align: middle;
  font-family: 'Roboto', sans-serif;
  letter-spacing: -0.5px;
  border-radius: 100px;
  padding: 10px 30px;
  font-size: 16;
  color: #FFF;   
  cursor: pointer;
  text-align: center;
  background-color: #ff9e1b;
  transition: all .6s ease-out;
}
.large {
  padding: 10px 30px;
  font-size: 20px;
}

.small {
  padding: 5px 30px;
  font-size: 14px;
}

.call-to-action:hover {
  background-color: #ff8400;
}
</style>
