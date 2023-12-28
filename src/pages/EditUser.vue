<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form
          data-background-color="green"
          title="Editar Usuário"
          description="Edit as informações do usuário"
          :save="saveUser"
          v-if="childDataLoaded"
          :name="user.name"
          :emailadress="user.email"
          :type="user.type"
        >
        </edit-profile-form>
      </div>
    </div>
  </div>
</template>

<script>
import { EditProfileForm } from "@/pages";
import { userApi } from "@/api/users";

export default {
  components: {
    EditProfileForm,
  },
  data() {
    return {
      user: null,
      childDataLoaded: false,
    };
  },
  mounted() {
    this.getUser();
  },
  watch: {
    user: function (newData) {
      this.setUser(newData);
    },
  },
  methods: {
    async getUser() {
      let self = this;
      self.childDataLoaded = false;
      await userApi.getOne(this.$route.params.id).then((response) => {
        self.user = response.data;
        self.childDataLoaded = true;
      });
    },
    setUser(data) {
      this.users = data;
    },
    saveUser(payload) {
      userApi
        .update(this.$route.params.id, payload)
        .then((response) => {
          this.$notify({
            message: "Usuário atualizado com sucesso",
            icon: "add_alert",
            verticalAlign: "top",
            horizontalAlign: "right",
            type: "success",
          });
          this.$router.push({ path: "/users" });
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
          console.log(error);
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
