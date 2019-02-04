<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1>
      <v-text-field label="URL" v-model="url"></v-text-field>
      <v-btn color="primary" @click="submit">Chamar API</v-btn>
      <v-textarea label="Resposta" v-model="result"/>
    </v-flex>
  </v-layout>
</template>

<script>
const axios = require("axios");
export default {
  name: "Draft",
  data() {
    return {
      url: " https://k9ak0tjr8h.execute-api.us-east-2.amazonaws.com/prod/proposal/generate",
      result: ""
    };
  },
  methods: {
      
    submit() {
        const self = this;
      axios({
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
        crossdomain: true,
        url: this.url
      })
        .then(function(res) {
          self.result = res.data
        })
        .catch(function(err) {
          self.result = err
        });
    }
  }
};
</script>

<style scoped>
</style>