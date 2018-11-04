<template>
    <v-layout row wrap>
        <v-flex sm10 offset-sm1 xs12>
            <h1>Usuários</h1>
            
            <v-btn :block="false" color="rgb(13, 234, 150)" @click="createUser">Criar Usuário</v-btn>

             <v-data-table
                :headers="headers"
                :items="items"
                :loading="items.length == 0"
                no-data-text=""
                hide-actions
                class="elevation-1">
                <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.name }}</td>
               <td class="text-xs-center">{{ props.item.email }}</td>
                <td class="text-xs-center">{{ props.item.login }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editUser(props.item)" style="color:rgb(21, 144, 97);">edit</v-icon>
                    <v-icon small @click="deleteItem(props.item)" style="color:#de8e8e;">delete</v-icon>
                </td>
                

                </template>
            </v-data-table>
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
      userList: []
    };
  },
  methods: {
    editUser(userId) {
      console.log(JSON.stringify(userId));
    },
    createUser() {
        this.$router.push({ path: '/painel/usuarios/criar' });
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
