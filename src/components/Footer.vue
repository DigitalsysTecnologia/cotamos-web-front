<template>
    <footer class="container-fluid rodape-pdr">
        <div class="row">
            <div class="container">
                <div class="col-xs-12">
                    <img src="/static/img/logo_branco.png" class="img-responsive center-block" alt="Logotipo"/>
                        <p class="sociais-rdp">
                            <a href="">
                                <i class="fab fa-facebook" aria-hidden="true"/>
                            </a>
                            <a href="https://www.facebook.com/Cotamos-168236910394093"><i class="fab fa fa-google-plus" aria-hidden="true"/></a>
                            <a href="https://www.facebook.com/Cotamos-168236910394093"><i class="fab fa fa-linkedin" aria-hidden="true"/></a>
                            <a href="https://www.facebook.com/Cotamos-168236910394093"><i class="fab fa fa-instagram" aria-hidden="true"/></a>
                            <a href="https://www.facebook.com/Cotamos-168236910394093"><i class="fab fa fa-twitter" aria-hidden="true"/></a>
                        </p>
                        <p class="direitos-rdp">Todos os direitos reservados.</p>
                        <p class="informacoes-legais"> 
                            CNPJ 30.249.014/0001-04
                        </p>
                        <p class="informacoes-legais"> 
                            SUSEP 20.2021328.0
                        </p>
                        
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.informacoes-legais {
    text-align: center;
    color: #fff;
    margin: 0px;
}
</style>
