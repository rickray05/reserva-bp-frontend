<template>
  <form
    novalidate
    class="md-layout"
    @submit.prevent="validateSchedule"
    autocomplete="off"
  >
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">{{ this.$props.title }}</h4>
        <p class="category">{{ this.$props.description }}</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-datepicker
              v-model="form.start_at"
              md-immediately
              :class="getValidationClass('start_at')"
            >
              <label>Data Início</label>
            </md-datepicker>
            <span class="md-error" v-if="!$v.form.start_at.required"
            >O campo Data Início é obrigatório</span
            >
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field :class="getValidationClass('time_start_at')">
              <label>Hora Início</label>
              <md-input v-model="form.time_start_at" type="time"></md-input>
              <span class="md-error" v-if="!$v.form.time_end_at.required"
              >O campo Hora Início é obrigatório</span
              >
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-datepicker v-model="form.end_at" md-immediately :class="getValidationClass('end_at')" :md-model-type="String">
              <label>Data Fim</label>
            </md-datepicker>
            <span class="md-error" v-if="!$v.form.end_at.required"
            >O campo Data Fim é obrigatório</span
            >
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field :class="getValidationClass('time_end_at')">
              <label>Hora Fim</label>
              <md-input v-model="form.time_end_at" type="time"></md-input>
              <span class="md-error" v-if="!$v.form.time_end_at.required"
                >O campo Hora Fim é obrigatório</span
              >
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('room')">
              <label>Sala</label>
              <md-select v-model="form.room" name="room" id="room">
                <md-option
                  v-for="item in rooms"
                  v-bind:key="item"
                  :value="item.id"
                  >{{ item.class_number + " - " + item.name }}</md-option
                >
              </md-select>
              <span class="md-error" v-if="!$v.form.room.required"
                >O Campo Sala é obrigatório</span
              >
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('broker')">
              <label>Consultor</label>
              <md-select v-model="form.broker" name="broker" id="broker">
                <md-option
                  v-for="item in brokers"
                  v-bind:key="item"
                  :value="item.id"
                  >{{ item.name }}</md-option
                >
              </md-select>
              <span class="md-error" v-if="!$v.form.broker.required"
                >O Campo Consultor é obrigatório</span
              >
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button type="submit" class="md-raised md-success"
              >Salvar</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email, sameAs } from "vuelidate/lib/validators";
import { roomApi } from "@/api/rooms";
import { brokerApi } from "@/api/brokers";

export default {
  name: "schedule-form",
  mixins: [validationMixin],
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
    title: String,
    description: String,
    save: Function,
    name: String,
    classnumber: String,
  },
  data() {
    return {
      form: {
        start_at: new Date(),
        time_start_at: null,
        end_at: new Date(),
        time_end_at: null,
        room: null,
        broker: null,
      },
      rooms: [],
      brokers: [],
    };
  },
  validations: {
    form: {
      start_at: {
        required,
      },
      time_start_at: {
        required,
      },
      end_at: {
        required,
      },
      time_end_at: {
        required,
      },
      room: {
        required,
      },
      broker: {
        required,
      },
    },
  },
  mounted() {
    this.getAllRooms();
    this.getAllBrokers();
  },
  methods: {
    async getAllRooms() {
      let self = this;
      await roomApi.getAll().then((response) => {
        self.rooms = response.data;
      });
    },
    async getAllBrokers() {
      let self = this;
      await brokerApi.getAll().then((response) => {
        self.brokers = response.data;
      });
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    saveSchedule() {
      let payload = {
        schedule_start_at:
          this.formatDate(this.form.start_at) +
          " " +
          this.form.time_start_at +
          ":00",
        schedule_end_at:
          this.formatDate(this.form.end_at) +
          " " +
          this.form.time_end_at +
          ":00",
        brokerId: parseInt(this.form.broker),
        roomId: parseInt(this.form.room),
      };

      this.$props.save(payload);
      this.clearForm();
    },
    validateSchedule() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveSchedule();
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.start_at = new Date().toLocaleDateString("pt-br");
      this.form.time_start_at = null;
      this.form.end_at = new Date().toLocaleDateString("pt-br");
      this.form.time_end_at = null;
      this.form.room = null;
      this.form.broker = null;
    },
    formatDate(dateValue) {
      var date = new Date(dateValue);

      var year = date.toLocaleString("default", { year: "numeric" });
      var month = date.toLocaleString("default", { month: "2-digit" });
      var day = date.toLocaleString("default", { day: "2-digit" });

      return year + "-" + month + "-" + day;
    },
  },
};
</script>
<style></style>
