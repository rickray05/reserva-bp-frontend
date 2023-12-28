<template>
  <form
    novalidate
    class="md-layout"
    @submit.prevent="validateRoom"
    autocomplete="off"
  >
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">{{ this.$props.title }}</h4>
        <p class="category">{{ this.$props.description }}</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('name')">
              <label>Nome</label>
              <md-input v-model="form.name" type="text"></md-input>
              <span class="md-error" v-if="!$v.form.name.required"
                >O campo Nome é obrigatório</span
              >
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('classnumber')">
              <label>Número da Sala</label>
              <md-input v-model="form.classnumber" type="text"></md-input>
              <span class="md-error" v-if="!$v.form.classnumber.required"
                >O campo Número da Sala é obrigatório</span
              >
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
export default {
  name: "room-form",
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
        name: this.$props.name ? this.$props.name : null,
        classnumber: this.$props.classnumber ? this.$props.classnumber : null,
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      classnumber: {
        required,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    saveRoom() {
      let payload = {
        name: this.form.name,
        class_number: parseInt(this.form.classnumber),
      };

      this.$props.save(payload);
      this.clearForm();
    },
    validateRoom() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveRoom();
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.classnumber = null;
    },
  },
};
</script>
<style></style>
