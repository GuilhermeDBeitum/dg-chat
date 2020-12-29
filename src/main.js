import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";

new Vue({
  axios,
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
