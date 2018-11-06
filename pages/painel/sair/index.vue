<template>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
            <Loading :messages="['Saindo do sistema...', 'Aguarde um instante por favor...']" />
        </div>
      </div>
    </div>
</template>

<script>
import Loading from "@/components/Loading";
import sessionHelper from "@/utils/sessionHelper";
export default {
  layout: "panel",
  name: "Account",
  mounted() {
    sessionHelper.clearSession();
    const self = this;
    setTimeout(function() {
      self.$router.push({ path: "/painel/login" });
    }, 3000);

  },
  components: {
    Loading: Loading
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.subtitle {
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 800;
  color: #00899c;
  margin-bottom: 20px;
  margin-top: 0px;
  text-shadow: 0 1px 7px rgba(255, 255, 255, 0.8);
}
</style>
