<template>
  <div>
    <h1 class="is-size-2">Opção selecionada: {{ option }}</h1>
    <Radio groupName="grupo1" :items="[{text:'Itaú', value: '341'}, {text:'Santander', value: '33'}]" label="Forma de Pagamento" v-model="option" />
    <Radio groupName="grupo2" :items="[{text:'Itaú', value: '341'}, {text:'Santander', value: '33'}]" label="Forma de Pagamento" v-model="option" />
    <Radio :sameLine="true" groupName="grupo3" :items="[{text:'Itaú', value: '341'}, {text:'Santander', value: '33'}]" label="Forma de Pagamento" v-model="option" validationMessage="adsfdas"/>
  </div>
</template>

<script>
import Radio from "@/components/Form/Radio";
export default {
  name: "Draft",
  methods: {},
  data() {
    return { option: "Nada" };
  },
  components: {
    Radio
    }
};
</script>

<style scoped>
</style>getLandingQueryParams
