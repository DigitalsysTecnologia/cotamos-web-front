<template>
  <div>
    <!-- Header -->
    <nav class="navbar is-transparent is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/wl/a3/plano-de-saude">
          <img src="/img/wl/a3/logo.png" width="112" height="28" class="logo-image">
        </a>
      </div>
    </nav>
    <!-- /Header -->

    <nuxt/>

    <!-- Footer -->
    <footer class="footer">
      <div class="content has-text-centered has-text-light is-half is-offset-one-quarter">
        <p>
          <img src="/img/wl/a3/a3-tipografia-branco.png" style="width:200px;">
        </p>
        <p>
          <span>CNPJ 30.249.014/0001-04</span>
          <br>
          <span>SUSEP 20.2021328.0</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";

export default {
  name: "default",
  data() {
    return {};
  },
  components: {
    Header: Header,
    Footer: Footer
  }
};
</script>

<style>
.footer {
  background: #f3ba51;
}
</style>
