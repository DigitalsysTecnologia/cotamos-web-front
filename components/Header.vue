<template>
    <div class="row">
        <div class="col-xs-12 page-header">
          <nav class="navbar navbar-default page-header">
              <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed navbar-button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"/>
                      <span class="icon-bar"/>
                      <span class="icon-bar"/>
                  </button>
                  <a class="navbar-brand" href="/">
                      <img class="img-responsive center-block" src="/img/logo_branco.png" alt="Cotamos.com" style="padding-left:15px;"/>
                  </a>
              </div>
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav navbar-right">
                      <li v-for="(link, idx) in links" :key="idx">
                        <a :href="link.url" class="link-btn">
                            <i :class="`${link.icon} navbar-icon`" v-if="link.icon"></i> {{ link.text }}
                        </a>
                      </li>
                      <li>
                          <a data-toggle="modal" href="#contactModal" class="link-btn">
                            <i class="far fa-envelope navbar-icon"></i> CONTATO
                        </a>
                          
                      </li>

                  </ul>
              </div>
          </nav>
        </div>
        <!-- Modal -->
  <div class="modal fade" id="contactModal" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 style="color:rgb(5, 93, 59);">Nossos Canais de Comunicação</h4>
        </div>
        <div class="modal-body">
          <p>
          Para entrar em contato conosco, utilize um dos seguintes canais:

          <ul style="margin-top:10px;">
            <li>
              <span>Telefone: <i class="fab fa-whatsapp-square"/> (11) 3297-3864</span>
            </li>
            <li>
              <span>WhatsApp: <i class="fab fa-whatsapp-square"/> (11) 94728-3937</span>
            </li>
            <li>
              <span>E-mail: <i class="fas fa-envelope-square"/> contato@cotamos.com</span>
            </li>
          </ul>
        </p>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-default btn-default pull-left" data-dismiss="modal" style="color:rgb(5, 93, 59);">
              <span class="glyphicon glyphicon-remove"></span> 
              Fechar
          </button>
        </div>
      </div>
    </div>
  </div> 
    </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  props: {
    links: {
      type: Array,
      required: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-button {
  background-color: #05693f;
  transition: 0.2s;
  border-radius: 10px;
}
.page-header {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
  background: #00d886;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00d886', endColorstr='#00d6e7',GradientType=1 );
  height: 100%;
  max-height: 180px;
  border-bottom-width: 0px;
}
.navbar-brand {
  float: none;
  padding: 0px;
}
.navbar-icon {
  margin-right: 5px;
}
</style>
