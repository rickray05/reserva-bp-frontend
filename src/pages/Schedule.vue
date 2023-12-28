<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <schedule-form
          data-background-color="green"
          title="Agendamento"
          description="Agende um horário com um consultor"
          :save="saveSchedule"
        >
        </schedule-form>
      </div>
    </div>
  </div>
</template>

<script>
import ScheduleForm from "@/pages/Schedule/ScheduleForm.vue";
import { scheduleApi } from "@/api/schedule";

export default {
  components: {
    ScheduleForm,
  },
  watch: {
    users: function (newData) {
      this.setUsers(newData);
    },
  },
  methods: {
    saveSchedule(payload) {
      scheduleApi
        .create(payload)
        .then((response) => {
          this.$notify({
            message: "Agendamento Criado com sucesso",
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
            type: "danger",
          });
        });
    },
  },
};
</script>
