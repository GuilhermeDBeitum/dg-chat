<template>
  <v-card height="400">
    <v-container>
      <v-col cols="12" sm="4"></v-col>
      <v-col cols="12" sm="4"></v-col>
      <v-row align="center" justify="space-around">
        <v-col class="text-center" cols="12" sm="4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              filled
              autocomplete="off"
              v-model="login"
              :rules="[rules.required, rules.email]"
              label="Login"
              :prepend-icon="'mdi-account'"
            ></v-text-field>
            <v-text-field
              autocomplete="off"
              filled
              v-model="password"
              label="Senha"
              :type="show1 ? 'text' : 'password'"
              :rules="[rules.required]"
              name="input-10-2"
              class="input-group--focused"
              @click:append="show1 = !show1"
              :prepend-icon="'mdi-lock'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="12" sm="4"></v-col>
        <v-col class="text-center" cols="12" sm="4">
          <router-link :to="rota">
            <v-btn
              class="ma-2 white--text"
              color="primary"
              @click="
                validate();
                validateLogin();
              "
              >Login</v-btn
            >
          </router-link>

          <router-link to="cadastro">
            <v-btn class="ma-2 white--text" color="green">Criar Conta</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
      color="red"
      absolute
      top
      multi-line
      vertical
      tag
      hide-details
      text
      shaped
      elevation="24"
      class="text-center ma-2"
      v-model="bar"
    >
      {{ print }}
    </v-snackbar>
    <v-footer
      fixed
      dark
      bottom
      right
      small
      height="28"
      color="black d-flex white--text"
    >
      <span>&copy; DG Solutions 2020</span>
    </v-footer>
  </v-card>
</template>

<script>
import authService from "../authService";
export default {
  props: {},

  data: () => ({
    print: "Login ou Senha Incorreto!  Tente novamente.",
    rota: "",
    valid: true,
    bar: false,
    show1: false,
    login: null,
    password: null,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),

  methods: {
    validateLogin() {
      if (this.$refs.form.validate()) {
        if (
          this.login == this.$store.state.modlogin.login &&
          this.password == this.$store.state.modlogin.password
        ) {
          this.rota = "chat";
        }
      }
    },

    authService() {
      // ... faz algo e recebo o token //
      let token = "a23dd343...sde343231";
      // gravo o token
      authService.setToken(token);
      // ...
      // o mesmo pode ser feito para recuperar o token
      token = authService.getToken();
    },

    validate() {
      this.bar = true;
    },
  },
};
</script>
