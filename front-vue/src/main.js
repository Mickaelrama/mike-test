import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// other plugin
import VueFormulate from '@braid/vue-formulate';
import { fr } from '@braid/vue-formulate-i18n';

Vue.config.productionTip = false;

// VueFormulate ///////
Vue.use(VueFormulate, {
  plugins: [fr],
  locale: "fr",
});
///////////////////////

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
