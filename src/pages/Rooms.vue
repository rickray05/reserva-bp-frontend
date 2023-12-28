<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <room-form
          data-background-color="green"
          title="Nova Sala"
          description="Cadastre uma nova sala"
          :save="saveRoom"
        >
        </room-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Salas Cadastrados</h4>
          </md-card-header>
          <md-card-content>
            <rooms-table
              v-if="childDataLoaded"
              table-header-color="green"
              :rooms-props="{ rooms }"
              :delete="deleteRoom"
            ></rooms-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import RoomsTable from "@/components/Tables/RoomsTable.vue";
import RoomForm from "@/pages/Room/RoomForm.vue";
import { roomApi } from "@/api/rooms";

export default {
  components: {
    RoomsTable,
    RoomForm,
  },
  data() {
    return {
      rooms: null,
      childDataLoaded: false,
    };
  },
  mounted() {
    this.getAllRooms();
  },
  watch: {
    rooms: function (newData) {
      this.setRooms(newData);
    },
  },
  methods: {
    async getAllRooms() {
      let self = this;
      self.childDataLoaded = false;
      await roomApi.getAll().then((response) => {
        self.rooms = response.data;
        self.childDataLoaded = true;
      });
    },
    setRooms(data) {
      this.rooms = data;
    },
    saveRoom(payload) {
      roomApi
        .create(payload)
        .then((response) => {
          this.getAllRooms();
          this.$notify({
            message: "Sala Criada com sucesso",
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
    deleteRoom(id) {
      roomApi
        .delete(id)
        .then((response) => {
          this.getAllRooms();
          this.$notify({
            message: "Sala Deletada com sucesso",
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
