import Vue from "vue";
import VueRx from 'vue-rx'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createProvider } from './vue-apollo'

import ProgressBar from '@/plugins/progressBarPlugin';

Vue.use(ProgressBar);
Vue.use(VueRx)

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
