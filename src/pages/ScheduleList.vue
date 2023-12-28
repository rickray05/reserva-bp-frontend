<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Meus Agendamentos</h4>
          </md-card-header>
          <md-card-content>
            <schedule-table table-header-color="green"></schedule-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import ScheduleTable from "@/components/Tables/ScheduleTable.vue";
import { roomApi } from "@/api/rooms";

export default {
  components: {
    ScheduleTable,
  },
};
</script>
