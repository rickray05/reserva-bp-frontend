<template>
  <form novalidate class="md-layout" @submit.prevent="validateUser" autocomplete="off">
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
            <md-field :class="getValidationClass('emailadress')">
              <label>Email</label>
              <md-input v-model="form.emailadress" type="email"></md-input>
              <span class="md-error" v-if="!$v.form.emailadress.required"
                >O campo email é obrigatório</span
              >
              <span class="md-error" v-else-if="!$v.form.emailadress.email"
                >Email inválido</span
              >
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('password')">
              <label>Senha</label>
              <md-input v-model="form.password" type="password"></md-input>
              <span class="md-error" v-if="!$v.form.password.required"
                >O Campo Senha é obrigatório</span
              >
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('confirmPassword')">
              <label>Confirmar a Senha</label>
              <md-input
                v-model="form.confirmPassword"
                type="password"
              ></md-input>
              <span class="md-error" v-if="!$v.form.confirmPassword.required"
                >O Campo Confirmar a Senha é obrigatório</span
              >
              <span
                class="md-error"
                v-else-if="!$v.form.confirmPassword.sameAsPassword"
                >As Senhas não conferem</span
              >
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('type')">
              <label>Tipo Usuário</label>
              <md-select v-model="form.type" name="type" id="tyoe">
                <md-option value="1">Cliente</md-option>
                <md-option value="2">Consultor</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.form.type.required"
                >O Campo Tipo é obrigatório</span
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
import { loginApi } from "@/api/login";
export default {
  name: "edit-profile-form",
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
    emailadress: String,
    type: Number,
  },
  data() {
    return {
      form: {
        name: this.$props.name ? this.$props.name : null,
        emailadress: this.$props.emailadress ? this.$props.emailadress : null,
        password: null,
        confirmPassword: null,
        type: this.$props.type ? this.$props.type : null,
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      emailadress: {
        required,
        email,
      },
      password: {
        required,
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      type: {
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
    saveUser() {
      let payload = {
        name: this.form.name,
        email: this.form.emailadress,
        type: parseInt(this.form.type),
      };

      if (this.form.password){
        payload = { ...payload, password: this.form.password };
      }
      this.$props.save(payload);
      this.clearForm();
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    clearForm () {
      this.$v.$reset();
      this.form.password = null;
      this.form.confirmPassword = null;
      this.form.name = null;
      this.form.type = null;
      this.form.emailadress = null;
    }
  },
};
</script>
<style></style>
