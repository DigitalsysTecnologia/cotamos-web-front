<template>
    <footer class="row footer">
        <div class="col-xs-12">
            <img src="/img/logo_branco.png" class="img-responsive center-block" alt="Logotipo" v-if="!hideLogo"/>
            <p class="footer-line">
                <a href="">
                    <i class="fab fa-facebook" aria-hidden="true"/>
                </a>
                <a href="https://www.facebook.com/Cotamos-168236910394093"><i class="fab fa fa-google-plus" aria-hidden="true"/></a>
                <a href="https://www.facebook.com/Cotamos-168236910394093"><i class="fab fa fa-linkedin" aria-hidden="true"/></a>
                <a href="https://www.facebook.com/Cotamos-168236910394093"><i class="fab fa fa-instagram" aria-hidden="true"/></a>
                <a href="https://www.facebook.com/Cotamos-168236910394093"><i class="fab fa fa-twitter" aria-hidden="true"/></a>
            </p>
            <p class="footer-line">
                Todos os direitos reservados.
                </p>
            <p class="footer-line"> 
                CNPJ 30.249.014/0001-04
            </p>
            <p class="footer-line"> 
                SUSEP 20.2021328.0
            </p>
        </div>
    </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  props: {
    hideLogo: {
      type: Boolean,
      default: false,
      required: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.informacoes-legais {
  text-align: center;
  color: #fff;
  margin: 0px;
}
.footer {
    padding-top: 20px;
    padding-bottom: 20px;
    background: #00d886;
}
.footer-line {
    color:white;
    text-align: center;
}
.footer-line a {
  padding-left: 7px;
  padding-right: 7px;
  color: #fff;
}
</style>
