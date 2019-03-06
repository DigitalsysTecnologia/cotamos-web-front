<template>
  <div class="columns">
    <div class="column has-text-centered" style="paddingTop:25px; paddingBottom:25px; margin-left: 20px; margin-right: 20px;">
      <progress class="progress is-small is-primary" max="100" :value="completePercent" v-if="!!(completePercent)"/>
      <progress class="progress is-small is-primary" max="100" v-else/>

      <p v-for="(message) in messages" :key="message">
          {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: ["messages", "completePercent"]
};
</script>

<style scoped>

</style>
