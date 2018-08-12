<template>
    <div class="row">
        <div class="col-xs-12 page-header">
          <nav class="navbar navbar-default page-header">
              <div class="navbar-header">
                  <!-- <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"/>
                      <span class="icon-bar"/>
                      <span class="icon-bar"/>
                  </button> -->
                  <a class="navbar-brand" href="/">
                      <img class="img-responsive center-block" src="/img/logo_branco.png" alt="Cotamos.com" style="padding-left:15px;"/>
                  </a>
              </div>
              <!-- <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav navbar-right">
                      <li><a href="/" class="link-btn">Criar conta</a></li>
                      <li><a href="/" class="link-btn">Entrar</a></li>
                  </ul>
              </div> -->
          </nav>
        </div>
    </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-header {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
  background: #00d886;
  background: -moz-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: -webkit-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: linear-gradient(to right, #00d886 0%, #00d6e7 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00d886', endColorstr='#00d6e7',GradientType=1 );
  height: 100%;
  max-height: 180px;
  border-bottom-width:0px;
}
.navbar-brand {
    float: none;
    padding: 0px;
}
</style>
