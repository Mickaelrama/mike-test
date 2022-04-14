import { LOGIN, ADD_NEW_USER } from "../graphql/auth";
import apolloClient from "../config/init-apollo";

export default {
  state: () => ({
    isAuthenticated: false,
    token: null,
    currentUser: null,
  }),
  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
    getToken: (state) => state.token,
    getUser: (state) => state.currentUser,
  },
  mutations: {
    SET_AUTH(state, { token, isAuthenticated }) {
      state.token = token;
      state.isAuthenticated = isAuthenticated;
    },
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload;
    },
  },
  actions: {
    async login({ commit }, payload) {
      let response = {};
      try {
        response = await apolloClient.mutate({
          mutation: LOGIN,
          variables: {
            args: payload,
          },
        });
      } catch (e) {
        response.error = e;
      }
      if (!response.errors) {
        commit("SET_AUTH", {
          token: response.data.login.token,
          isAuthenticated: true,
        });
        commit("SET_CURRENT_USER", {
          _id: response.data?.login?._id,
          username: response.data?.login?.username,
          email: response.data?.login?.email,
          role: response.data?.login?.role,
        });
        return true;
      }
      return false;
    },
    async add_new_user({ commit }, payload) {
      const response = await apolloClient.mutate({
        mutation: ADD_NEW_USER,
        variables: {
          args: {
            ...payload,
            role: "USER",
          },
        },
      });
      commit("SET_AUTH", {
        token: response.data?.register?.token,
        isAuthenticated: true,
      });
      commit("SET_CURRENT_USER", {
        _id: response.data?.register?._id,
        username: response.data?.register?.username,
        email: response.data?.register?.email,
        role: response.data?.register?.role,
      });
      return response;
    },
  },
};
