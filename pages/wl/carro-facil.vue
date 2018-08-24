<template>
    <div class="iframe-container" >
      <iframe src="https://www.portosegurocorretores.com.br/carro_facil/cotamos_seguros/landing_1/" frameborder="0" height="100%" width="100%"/>
    </div>
</template>

<script>
export default {
  name: "PortoCarroFacil",
  head: {
    title: "Carro Fácil - Cotamos.com"
  }
};
</script>

<style scoped>
.iframe-container iframe {
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
</style>