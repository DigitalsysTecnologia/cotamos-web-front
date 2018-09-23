<template>
  <div>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";

export default {
  name: "PanelIndex",
  created() {
    this.$router.push({ path: "/painel/login" });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
