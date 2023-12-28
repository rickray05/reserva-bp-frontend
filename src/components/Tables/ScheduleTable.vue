<template>
  <div>
    <md-table v-model="schedules" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Id">{{ item.schedule_id }}</md-table-cell>
        <md-table-cell md-label="Consultor" v-if="typeUser === 1">{{
          item.brooker_name
        }}</md-table-cell>
        <md-table-cell md-label="Cliente" v-if="typeUser === 2">{{
          item.client_name
        }}</md-table-cell>
        <md-table-cell md-label="Sala">{{ item.room_name }}</md-table-cell>
        <md-table-cell md-label="Data Início">{{
          item.schedule_schedule_start_at
        }}</md-table-cell>
        <md-table-cell md-label="Data Fim">{{
          item.schedule_schedule_end_at
        }}</md-table-cell>
        <md-table-cell md-label="Ações">
          <md-button
            type="button"
            class="md-raised md-danger"
            @click="deleteSchedule(item.id)"
            >Excluir</md-button
          >
          <md-button
            type="button"
            class="md-raised md-primary"
            @click="editSchedule(item.id)"
            >Editar</md-button
          >
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { loginApi } from "@/api/login";
import { scheduleApi } from "@/api/schedule";

export default {
  name: "schedule-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      schedules: [],
      typeUser: null,
    };
  },
  async mounted() {
    await loginApi.me(this);

    const user = JSON.parse(localStorage.getItem("user"));

    this.typeUser = user.type;

    this.getSchedules();
  },
  methods: {
    deleteSchedule(id) {
      this.$props.delete(id);
    },
    editSchedule(id) {
      this.$router.push({ path: "/schedule/" + id });
    },
    async getSchedules() {
      let self = this;
      await scheduleApi.listSchedule().then((response) => {
        self.schedules = response.data;
      });
    },
  },
};
</script>
