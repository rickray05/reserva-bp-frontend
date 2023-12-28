<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <room-form
          data-background-color="green"
          title="Editar Sala"
          description="Editar as informações da Sala"
          :save="saveRoom"
          v-if="childDataLoaded"
          :name="room.name"
          :classnumber="room.class_number"
        >
        </room-form>
      </div>
    </div>
  </div>
</template>

<script>
import RoomForm from "@/pages/Room/RoomForm.vue";
import { roomApi } from "@/api/rooms";

export default {
  components: {
    RoomForm,
  },
  data() {
    return {
      room: null,
      childDataLoaded: false,
    };
  },
  mounted() {
    this.getRoom();
  },
  watch: {
    room: function (newData) {
      this.setRoom(newData);
    },
  },
  methods: {
    async getRoom() {
      let self = this;
      self.childDataLoaded = false;
      await roomApi.getOne(this.$route.params.id).then((response) => {
        self.room = response.data;
        self.childDataLoaded = true;
      });
    },
    setRoom(data) {
      this.room = data;
    },
    saveRoom(payload) {
      roomApi
        .update(this.$route.params.id, payload)
        .then((response) => {
          this.$notify({
            message: "Sala atualizada com sucesso",
            icon: "add_alert",
            verticalAlign: "top",
            horizontalAlign: "right",
            type: "success",
          });
          this.$router.push({ path: "/room" });
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
