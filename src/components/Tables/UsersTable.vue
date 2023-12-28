<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Id">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Tipo">{{
          item.type == 1 ? "Cliente" : "Consultor"
        }}</md-table-cell>
        <md-table-cell md-label="Ações">
          <md-button
            type="button"
            class="md-raised md-danger"
            @click="deleteUser(item.id)"
            >Excluir</md-button
          >
          <md-button
            type="button"
            class="md-raised md-primary"
            @click="editUser(item.id)"
            >Editar</md-button
          >
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "users-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    usersProps: Object,
    delete: Function,
  },
  data() {
    return {
      selected: [],
      users: this.$props.usersProps.users,
    };
  },
  methods: {
    deleteUser(id) {
      this.$props.delete(id);
    },
    editUser(id) {
      this.$router.push({ path: "/user/" + id });
    },
  },
};
</script>
