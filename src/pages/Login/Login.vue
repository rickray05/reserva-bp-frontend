<template>
  <form novalidate class="md-layout" @submit.prevent="validateUser">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">ReservaBP</h4>
        <p class="category">Faça seu Login na Plataforma</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('emailadress')">
              <label>Email</label>
              <md-input v-model="form.emailadress" id="emailadress" name="emailadress" type="email" autocomplete="email"></md-input>
              <span class="md-error" v-if="!$v.form.emailadress.required">O campo email é obrigatório</span>
              <span class="md-error" v-else-if="!$v.form.emailadress.email">Email inválido</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('password')">
              <label>Password</label>
              <md-input v-model="form.password" id="password" name="password"  type="password"></md-input>
              <span class="md-error" v-if="!$v.form.password.required">O Campo senha é obrigatório</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-center">
            <md-button type="submit" class="md-raised md-success">Entrar</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email
} from 'vuelidate/lib/validators'
import { loginApi } from "../../api/login";
export default {
  name: "login-form",
  mixins: [validationMixin],
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      form: {
        emailadress: null,
        password: null,
      },
      errors: [],
    };
  },
  validations: {
    form: {
      password: {
        required
      },
      emailadress: {
        required,
        email
      }
    }
  },
  methods:{
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.password = null
      this.form.emailadress = null
    },
    saveUser () {

      const payload = {
        "email": this.form.emailadress,
        "password": this.form.password
      };

      console.log(payload, this.$cookies);

      loginApi.login(payload, this);
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveUser()
      }
    }
  }
};
</script>
<style></style>
