// index.js em /services/authService
import Store from "./store";

//mudando o valor do token diretamente na store!
const setToken = function(token) {
  Store.dispatch("SET_TOKEN", token);
};
//recuperando o valor de token da store!
const getToken = function() {
  return Store.state.auth.token;
};

export default { setToken, getToken };
