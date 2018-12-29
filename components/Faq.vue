<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,idx) in items" :key="idx">
      <div slot="header">
        <span style="font-weight:bold;">{{ item.question }}</span>
      </div>
      <v-card>
        <v-card-text>{{ item.answer }}</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "Faq",
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
