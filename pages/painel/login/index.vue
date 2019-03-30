<template>
  <div class="section">
    <div class="columns">
      <div class="column">
        <VInput label="Login" id="user.login" v-model="user.login"/>
      </div>
      <div class="column">
        <VInput type="password" label="Senha" id="user.password" v-model="user.password"/>
      </div>
    </div>
    <VButton
      textColor="white"
      backgroundColor="rgb(0, 216, 134)"
      @click="doLogin"
      :isLoading="loading"
      :isFullWidth="true"
    >Login</VButton>
    <div class="notification is-danger" v-if="this.errorMessage">Erro: {{ this.errorMessage }}</div>
  </div>
</template>

<script>
import moment from "moment";
import apiClient from "@/utils/apiClient";
import VInput from "@/components/atoms/VInput";
import VButton from "@/components/atoms/VButton";
import localStorage from "@/utils/localStorage";
import { mapState } from "vuex";

export default {
  name: "PanelLogin",
  data() {
    return {
      loading: false,
      errorMessage: null,
      user: {
        login: null,
        password: null
      }
    };
  },
  async beforeMount() {},
  watch: {
    isLogged(newVal) {
      if (newVal === true) {
        const { redirect } = this.$route.query;
        let url = null;
        url = redirect || "/painel/propostas";

        this.$router.push({ path: url });
      }
    }
  },
  components: {
    VInput,
    VButton
  },
  methods: {
    async doLogin() {
      try {
        this.errorMessage = "";
        this.loading = true;
        await apiClient.login(this.user.login, this.user.password);

        const { redirect } = this.$route.query;
        let url = null;
        url = redirect || "/painel/propostas";

        this.$router.push({ path: url });
      } catch (err) {
        this.errorMessage = err.data.errorMessage;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


<style scoped>
.notification {
  margin-top: 25px;
}
</style>
