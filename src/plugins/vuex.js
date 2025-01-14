// plugins/vuex.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLogged: JSON.parse(localStorage.getItem('isLogged')) || false,
  },
  mutations: {
    setLogged(state, status) {
      state.isLogged = status;
      localStorage.setItem('isLogged', JSON.stringify(status));
    },
  },
  actions: {
    login({ commit }) {
      commit('setLogged', true);
    },
    logout({ commit }) {
      commit('setLogged', false);
      localStorage.removeItem('userInfo');
    },
  },
});

export default store;
