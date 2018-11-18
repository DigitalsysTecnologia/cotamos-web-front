<template>
  <v-dialog v-model="show" >
    <v-card>
      <v-card-title class="headline primary lighten-1" primary-title>
        <span style="color:white;">OCORRÊNCIA</span>
      </v-card-title>
  
      <v-card-text>
        <v-textarea name="input-7-1" label="Insira aqui o texto da ocorrência" v-model="eventText"></v-textarea>
      </v-card-text>
  
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-spacer></v-spacer>
  
        <v-btn color="red lighten-2" flat @click="cancelEvent">
          Cancelar
        </v-btn>
        <v-btn color="primary" @click="add" :disabled="!eventText">
          Adicionar Ocorrência
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "EventModal",
    data() {
      return {
        eventText: ""
      }
    },
    methods: {
      cancelEvent() {
        this.$emit('cancel');
        this.eventText = "";
      },
      add() {
        this.$emit('addEvent', this.eventText);
        this.eventText = "";
      }
    },
    props: {
      show: {
        type: Boolean,
        required: true
      }
    }
  };
</script>

<style scoped>
  .box {
    text-align: left;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
