import apolloClient from "../config/init-apollo";
import { ADD_COMBATTANT, GET_COMBATTANTS } from "../graphql/combattant";

export default {
  state: () => ({
    combattants: [],
  }),
  getters: {
    getCombattants: (state) => state.combattants,
  },
  mutations: {
    SET_COMBATTANTS(state, payload) {
      state.combattants = payload;
    },
  },
  actions: {
    async get_combattants({ commit, rootGetters }) {
      const {
        data: { getCombattants },
      } = await apolloClient.query({
        query: GET_COMBATTANTS,
        context: {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`,
          },
        },
      });
      commit("SET_COMBATTANTS", getCombattants);
    },
    async add_combattant({ rootGetters }, payload) {
      await apolloClient.mutate({
        mutation: ADD_COMBATTANT,
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
  },
};
