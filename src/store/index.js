import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules"

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  modules
});

window.store = store;

export default store;

