<template>
    <v-card class="card-container">
        <v-card-title primary-title style="padding-bottom: 0px; padding-top: 10px;">
            <h3 class="subtitle">{{ title }}</h3>
        </v-card-title>
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    title: {
      type: String,
      required: false,
      default: ""
    }
  }
};
</script>

<style scoped>
.subtitle {
  margin-bottom: 0px;
}
.card-container {
    margin-bottom: 15px;
}
</style>
