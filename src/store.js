import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const moduleLogin = {
  state: { name: null, login: null, password: null },
  getters: {
    name: (state) => {
      return state.name;
    },
    login: (state) => {
      return state.login;
    },
    password: (state) => {
      return state.password;
    },
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
    setLogin(state, login) {
      state.login = login;
    },
    setPassword(state, password) {
      state.password = password;
    },
  },
};

let SET_TOKEN = "SET_TOKEN";

const moduleToken = {
  state: {
    token: "",
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token;
    },
  },
};

const store = new Vuex.Store({
  modules: {
    modlogin: moduleLogin,
    modtoken: moduleToken,
  },
});

export default store;
