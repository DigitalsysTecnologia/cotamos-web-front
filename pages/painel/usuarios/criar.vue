<template>
    <v-layout row wrap>
        <v-flex sm10 offset-sm1 xs12>
            <h1>Criação de Usuário</h1>

            <form @submit="createUser">
                <!-- <v-text-field 
                   label="Seu Nome"
                   id="proposal.proposer.name"
                   :error="!!(validation.firstError('proposal.proposer.name'))"
                   :error-messages="validation.firstError('proposal.proposer.name')"
                   v-model="proposal.proposer.name" /> -->
                <v-text-field label="Nome de Usuário" v-model="user.name" id="user.name"/>
                <v-text-field label="E-Mail" v-model="user.email" id="user.email" />
                <v-text-field label="Login" v-model="user.login" id="user.login" />
                <v-text-field type="password" label="Senha" v-model="user.password" id="user.password" />
                <div class="form-check mb-4 align-items-left">
                    <label class="form-check-label">
                    <input type="checkbox" id="isSystemUser" class="form-check-input" v-model="user.isSystemUser">
                    Usuário de sistema
                    </label>
                </div> 
                <button type="submit" class="btn btn-primary btn-block">+ Criar</button>
            </form>
            

        </v-flex>
    </v-layout>
</template>

<script>
import apiClient from "@/utils/apiClient";
import moment from "moment";

export default {
  name: "userList",
  data() {
    return {
      user: {
        name: null,
        password: null,
        email: null,
        login: null,
        isSystemUser: false
      }
    };
  },
  methods: {
    editUser(userId) {
      console.log(JSON.stringify(userId));
    },
    async createUser(e) {
      e.preventDefault();
      try {
        await apiClient.createUser(this.user);
        window.alert("Usuário criado com sucesso");
        window.location.assign("/painel/usuarios");
      } catch (err) {
        if (err.data && err.data.errorMessage) {
          window.alert(err.data.errorMessage);
        }
      }
    }
  },
  computed: {
    headers: {
      get() {
        return [
          {
            text: "Nome",
            align: "center",
            sortable: false,
            value: "name"
          },
          {
            text: "E-Mail",
            align: "center",
            sortable: false,
            value: "email"
          },
          {
            text: "Login",
            align: "center",
            sortable: false,
            value: "login"
          },
          {
            text: "Ações",
            align: "center",
            sortable: false,
            value: "actions"
          }
        ];
      }
    },
    items: {
      get() {
        return this.userList.map(item => {
          return {
            id: item._id,
            name: item.name,
            email: item.email,
            login: item.login
          };
        });
      }
    }
  },
  components: {},
  async beforeMount() {
    this.userList = await apiClient.getAllUsers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
