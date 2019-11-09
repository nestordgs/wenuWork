import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedstate from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedstate({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    token: null,
    user: null,
    isLoggedIn: false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isLoggedIn = !!token;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
  getters: {
    isAuth: state => state.isLoggedIn,
    getName: state => ((state.user) ? state.user.name : ''),
  },
  modules: {
  },
});
