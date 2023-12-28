<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form
          data-background-color="green"
          title="Novo Usuário"
          description="Cadastre um novo usuário"
          :save="saveUser"
        >
        </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Usuários Cadastrados</h4>
          </md-card-header>
          <md-card-content>
            <users-table
              v-if="childDataLoaded"
              table-header-color="green"
              :users-props="{ users }"
              :delete="deleteUser"
            ></users-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { EditProfileForm } from "@/pages";
import { UsersTable } from "@/components";
import { userApi } from "@/api/users";

export default {
  components: {
    UsersTable,
    EditProfileForm,
  },
  data() {
    return {
      users: null,
      childDataLoaded: false,
    };
  },
  mounted() {
    this.getAllUsers();
  },
  watch: {
    users: function (newData) {
      this.setUsers(newData);
    },
  },
  methods: {
    async getAllUsers() {
      let self = this;
      self.childDataLoaded = false;
      await userApi.getAll().then((response) => {
        self.users = response.data;
        self.childDataLoaded = true;
      });
    },
    setUsers(data) {
      this.users = data;
    },
    saveUser(payload) {
      userApi
        .create(payload)
        .then((response) => {
          this.getAllUsers();
          this.$notify({
            message: "Usuário Criado com sucesso",
            icon: "add_alert",
            verticalAlign: "top",
            horizontalAlign: "right",
            type: "success",
          });
        })
        .catch((error) => {
          this.$notify({
            message: error.response.data.message,
            icon: "add_alert",
            verticalAlign: "top",
            horizontalAlign: "right",
            type: "info",
          });
        });
    },
    deleteUser(id) {
      userApi
        .delete(id)
        .then((response) => {
          this.getAllUsers();
          this.$notify({
            message: "Usuário Deletado com sucesso",
            icon: "add_alert",
            verticalAlign: "top",
            horizontalAlign: "right",
            type: "success",
          });
        })
        .catch((error) => {
          this.$notify({
            message: error.response.data.message,
            icon: "add_alert",
            verticalAlign: "top",
            horizontalAlign: "right",
            type: "info",
          });
        });
    },
  },
};
</script>
