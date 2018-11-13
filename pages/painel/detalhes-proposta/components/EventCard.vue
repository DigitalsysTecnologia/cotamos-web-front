<template>
    <v-card class="card-container">
        <v-card-title primary-title style="padding-bottom: 0px; padding-top: 10px;">
            <span style="margin-right:20px;"> {{ formatDate(event.date) }} </span>

            <span style="font-weight:bold;"> {{ translateState(event.state) }} </span>
            <span> {{ event.userName }} </span>
        </v-card-title>
        <v-card-text>
            <p>
                {{ event.text }}
            </p>
            
        </v-card-text>
    </v-card>
</template>

<script>
import Translator from "@/utils/translator";
import moment from "moment";
export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    translateState(state) {
      return Translator.translateState(state);
    },
    formatDate(date) {
        return moment(date).format("DD/MM/YYYY HH:mm:ss");
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
