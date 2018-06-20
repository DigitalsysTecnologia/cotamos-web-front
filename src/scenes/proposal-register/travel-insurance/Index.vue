<template>
    <div class="iframe-container" >
      <iframe src="https://wwws.portoseguro.com.br/vendaonline/viagem/home.ns?cod=4fead46677df44e396d0fcdfe711a5be&utm_source=31P52J&utm_medium=geradorLinks&utm_campaign=GeradordeLinks_NR04YJ&utm_content=COTAMOS_CORRETORA_DE_SEGUROS" frameborder="0" height="100%" width="100%"/>
    </div>
</template>

<script>
export default {
  name: "TravelInsuranceRegister",
  data() {
    return {};
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
