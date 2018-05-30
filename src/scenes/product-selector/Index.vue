<template>
    <div>
        <main class="container-fluid">
            <div class="row">
                <header class="col-xs-12 banner-pgs"
                        style="backgroundImage: url(../static/img/bg_outros.jpg)">
                    <div class="container">
                        <h1>Escolha seu produto</h1>
                        <h2>Faça sua simulação e veja na hora as melhores ofertas para você.</h2>
                    </div>
                </header>
            </div>
        </main>
        <section class="container-fluid bg-outros">
            <div class="row">
                <div class="container">
                    <div class="row">
                        <section class="col-xs-12 formulario-cotacao">

                            <div class="col-sm-12 col-xs-12 box-cotacao">
                                <h3>O que você deseja?</h3>

                                <div class="row">
                                    <div class="col-sm-12 col-xs-12">
                                      <FormSelect  label="Produto Desejado" 
                                                    icon="fa-briefcase " 
                                                    id="proposal.proposer.profession"
                                                    v-model="desiredProduct" 
                                                    :options="products" />
                                    
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
</template>

<script>
import Footer from "../../components/Footer";
import FormSelect from "../../components/FormSelect.vue";

export default {
  name: "ProductSelector",
  methods: {},
  computed: {},
  data() {
    return {
      desiredProduct: null,
      targetProduct: 0,
      products: [
        {
          id: 1,
          text: "Seguro de Vida",
          value: "seguro_vida"
        },
        {
          id: 2,
          text: "Plano de Saúde",
          value: "plano_saude"
        }
      ]
    };
  },
  components: {
    Footer: Footer,
    FormSelect: FormSelect
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-line {
  margin-left: 0px;
}
</style>
