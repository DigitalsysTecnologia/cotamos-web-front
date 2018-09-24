<template>
  <div>
    <div class="row">
      <div class="offset-md-2 col-md-8 col-xs-12 offset-xs-0">
        <h1> {{ isLogged }} </h1>
        <form @submit="doLogin">
          <div class="form-group">
            <input type="text" class="form-control" id="login" placeholder="Login" v-model="user.login">
          </div>
          
          <div class="form-group">
            <input type="password" class="form-control" id="password" placeholder="Senha" v-model="user.password">
          </div>

          <div v-if="this.loading">
              <span>Carregando...</span>
          </div>
          <div v-else>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
          </div>

        </form>

        <div class="alert alert-danger" role="alert" v-if="this.errorMessage">
          <strong>Erro:</strong> {{ this.errorMessage }}
        </div>

      </div>  
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import apiClient from "@/utils/apiClient";
import localStorage from "@/utils/localStorage";
import { mapState } from 'vuex'

export default {
  layout: "panel",
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
  computed: mapState([
    'isLogged'
  ]),
  watch: {
    isLogged(newVal) {

      if(newVal === true) {
        const { redirect } = this.$route.query;
        let url = null;
        url = redirect || "/painel/propostas";

        this.$router.push({ path: url });

      }
      
    }
  },
  components: {},
  methods: {
    async doLogin(e) {
      e.preventDefault();

      try {
        this.errorMessage = "";
        this.loading = true;
        // const res = await apiClient.login(this.user.login, this.user.password);

        const payload = {
          login: this.user.login,
          password: this.user.password
        };

        this.$store.dispatch("doLogin", payload);

        // localStorage.setItem('userToken',res.token);

        // const { redirect } = this.$route.query;
        // let url = null;
        // url = redirect || "/painel/propostas";

        // this.$router.push({ path: url });
      } catch (err) {
        this.errorMessage = err.data.errorMessage;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert-danger {
  margin-top: 15px;
}
</style>
