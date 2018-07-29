<template>
    <div class="row">
        <div class="col-xs-12 page-header">
            <img src="/static/img/logo_branco.png" class="img-responsive" style="width:250px;"/>
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
</style>
