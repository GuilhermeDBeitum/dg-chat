import Vue from "vue";
import Router from "vue-router";
import login from "@/components/login";
import cadastro from "@/components/cadastro";
import chat from "@/components/chat";

Vue.use(Router);

// aonde rotear, aqui setar o componente e o caminho para a URL//

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: login,
    },
    {
      path: "/cadastro",
      name: "cadastro",
      component: cadastro,
    },
    {
      path: "/chat",
      name: "chat",
      component: chat,
    },
  ],
});
