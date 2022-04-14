import apolloClient from "../config/init-apollo";
import { GET_DISPO_MATCHES, ADD_MATCH, JOIN_MATCH } from "../graphql/match";

export default {
  state: () => ({
    dispoMatch: [],
    currentMatch: null,
  }),
  getters: {
    getDispoMatches: (state) => state.dispoMatch,
    getCurrentMatch: (state) => state.currentMatch,
  },
  mutations: {
    SET_DISPO_MATCH(state, payload) {
      state.dispoMatch = payload;
    },
    SET_CURRENT_MATCH(state, payload) {
      state.currentMatch = payload;
    },
  },
  actions: {
    async get_dispo_matches({ commit, rootGetters }) {
      const {
        data: { getDispoMatches },
      } = await apolloClient.query({
        query: GET_DISPO_MATCHES,
        context: {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`,
          },
        },
      });
      commit("SET_DISPO_MATCH", getDispoMatches);
    },
    async add_match({ rootGetters }) {
      const response = await apolloClient.mutate({
        mutation: ADD_MATCH,
        variables: {
          domicile: rootGetters.getUser._id,
        },
        context: {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`,
          },
        },
      });
      return response.errors ? false : true;
    },
    async join_match({ rootGetters, commit }, _id) {
      await apolloClient.mutate({
        mutation: JOIN_MATCH,
        variables: {
          args: {
            _id,
            exterieur: rootGetters.getUser._id,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`,
          },
        },
      });
    },
    set_current_match({ commit }, payload) {
      commit("SET_CURRENT_MATCH", payload);
    },
  },
};
