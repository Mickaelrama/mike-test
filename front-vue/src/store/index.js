import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import authModule from "./auth";
import matchModule from "./match";
import combattantModule from "./combattant";
import combatModule from "./combat";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    match: matchModule,
    combattant: combattantModule,
    combat: combatModule,
  },
  plugins: [
    createPersistedState({ paths: ["auth", "match", "combattant", "combat"] }),
  ],
});

export default store;
