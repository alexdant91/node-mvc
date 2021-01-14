// initial state
const state = () => ({
  token: null,
  isLoggedIn: false
});

// getters
const getters = {
  token() {
    return state.token;
  }
}

// actions
const actions = {
  login({ commit }, token) {
    commit('setUserToken', { token, isLoggedIn: true });
  },
  logout({ commit }) {
    commit('setUserToken', { token: null, isLoggedIn: false });
  },
}

// mutations
const mutations = {
  setUserToken(state, { token, isLoggedIn }) {
    state.token = token;
    state.isLoggedIn = isLoggedIn;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
