import apolloClient from "../config/init-apollo";
import { ADD_COMBAT, JOINED_COMBAT, ATTACK } from "../graphql/combat";

export default {
  state: () => ({
    currentCombat: null,
  }),
  getters: {
    getCurrentCombat: (state) => state.currentCombat,
  },
  mutations: {
    SET_CURRENT_COMBAT(state, payload) {
      state.currentCombat = payload;
    },
  },
  actions: {
    async add_combat({ rootGetters }, combattant) {
      await apolloClient.mutate({
        mutation: ADD_COMBAT,
        variables: {
          args: {
            match: rootGetters.getCurrentMatch,
            combattant: combattant._id,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`,
          },
        },
      });
    },
    async join_combat({ state, rootGetters }, combattant) {
      await apolloClient.mutate({
        mutation: JOINED_COMBAT,
        variables: {
          args: {
            _id: state.currentCombat._id,
            combattant: combattant._id,
            match: rootGetters.getCurrentMatch,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`,
          },
        },
      });
    },
    async attack({ rootGetters }, payload) {
      await apolloClient.mutate({
        mutation: ATTACK,
        variables: {
          args: payload,
        },
        context: {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`,
          },
        },
      });
    },
    set_current_combat({ commit }, payload) {
      commit("SET_CURRENT_COMBAT", payload);
    },
  },
};
