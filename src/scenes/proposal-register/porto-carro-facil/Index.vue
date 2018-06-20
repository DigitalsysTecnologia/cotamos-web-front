<template>
    <div class="iframe-container" >
      <iframe src="https://fichacadastral.portosegurocarrofacil.com.br/#!/?corretor=31P52J" frameborder="0" height="100%" width="100%"/>
    </div>
</template>

<script>
export default {
  name: "PortoCarroFacil",
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
