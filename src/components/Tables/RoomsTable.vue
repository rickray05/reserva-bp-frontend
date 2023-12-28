<template>
  <div>
    <md-table v-model="rooms" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Id">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Número">{{ item.class_number }}</md-table-cell>
        <md-table-cell md-label="Ações">
          <md-button
            type="button"
            class="md-raised md-danger"
            @click="deleteRoom(item.id)"
            >Excluir</md-button
          >
          <md-button
            type="button"
            class="md-raised md-primary"
            @click="editRoom(item.id)"
            >Editar</md-button
          >
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "rooms-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    roomsProps: Object,
    delete: Function,
  },
  data() {
    return {
      selected: [],
      rooms: this.$props.roomsProps.rooms,
    };
  },
  methods: {
    deleteRoom(id) {
      this.$props.delete(id);
    },
    editRoom(id) {
      this.$router.push({ path: "/room/" + id });
    },
  },
};
</script>
