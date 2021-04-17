import { createStore } from "vuex";

export default createStore({
  state: {
    count: 0,
    solids: [],
  },
  getters: {
    getSolids: (state) => {
      return state.solids;
    },
  },
  mutations: {
    // @param {State} state
    // @param {Array} solids
    setSolids(state, solids) {
      solids.forEach((solid, i) => {
        state.solids.push(state.solids, i, solid);
      });
      // trigger callback to viewer component
      state.count = solids.length;
    },
  },
  actions: {},
  modules: {},
});
