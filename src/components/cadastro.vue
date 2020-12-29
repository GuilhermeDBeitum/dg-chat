<template>
  <v-card height="400">
    <v-form>
      <v-container>
        <v-row justify="space-around">
          <v-btn
            @click="voltar()"
            class="d-flex justify-center"
            fab
            dark
            width="26"
            height="26"
            color="primary"
          >
            <v-icon dark>mdi-arrow-left</v-icon>
          </v-btn>
        </v-row>

        <v-row justify="space-around">
          <v-col cols="12" sm="3">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="vname"
                filled
                label="Nome"
                clearable
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                filled
                autocomplete="off"
                v-model="vlogin"
                :rules="[rules.required, rules.email]"
                label="E-mail/Login"
                clearable
              ></v-text-field>
              <v-text-field
                autocomplete="off"
                filled
                v-model="vpassword"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                label="Senha"
                @click:append="show1 = !show1"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                counter=""
              ></v-text-field>
            </v-form>
            <div class="text-center">
              <v-btn :disabled="!valid" dark color="green" @click="validate"
                >Cadastrar</v-btn
              >

              <v-snackbar
                color="green"
                absolute
                top
                v-model="bar"
                multi-line
                app
                vertical
                tag
                outlined
                hide-details
                text
                shaped
                elevation="24"
                class="text-center ma-2"
              >
                {{ print }}
              </v-snackbar>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
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
import axios from "axios";

import { mapGetters, mapState } from "vuex";
export default {
  name: `cadastro`,
  components: {},
  props: {},

  data: () => ({
    vlogin: null,
    vpassword: null,
    vname: null,
    valid: true,
    show1: false,
    bar: false,
    print: "Sucesso no cadastro! Seja muito bem-vindo!.",
    timeout: 2000,
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

  computed: {
    ...mapState(["name", "login", "password"]),

    ...mapGetters("name", "login", "password"),

    name: {
      get() {
        return this.$store.state.name;
      },

      set(newName) {
        this.$store.commit("setName", newName);
      },
    },

    login: {
      get() {
        return this.$store.state.login;
      },

      set(newLogin) {
        this.$store.commit("setLogin", newLogin);
      },
    },

    password: {
      get() {
        return this.$store.state.password;
      },

      set(newPassword) {
        this.$store.commit("setPassword", newPassword);
      },
    },
  },

  methods: {
    registra() {
      axios
        .post("http://localhost:3000/cadastro", {
          nome: this.nome,
          login: this.login,
          password: this.password,
        })
        .then(function() {});
    },

    voltar() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.name = this.vname;
        this.login = this.vlogin;
        this.password = this.vpassword;

        this.bar = true;
        setTimeout(() => {
          this.voltar();
        }, 1600);
      }
    },
  },
};
</script>
