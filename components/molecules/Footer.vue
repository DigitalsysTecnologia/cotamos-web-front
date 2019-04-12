<template>
  <footer class="footer gradient-background">
    <div class="content has-text-centered has-text-light is-half is-offset-one-quarter">
      <p>
        <img src="/img/logo_branco.png" style="width:200px;">
      </p>
      <p>
        <span>CNPJ 30.249.014/0001-04</span>
        <br>
        <span>SUSEP 20.2021328.0</span>
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
<style lang="scss">
.footer {
  border-top: solid 15px white;
}
</style>
