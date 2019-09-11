import stocks from '../../data/stocks';
import * as types from '../types';

const state = {
  stocks: []
};

const getters = {
  [types.GET_STOCKS]: state => {
    return state.stocks;
  }
};

const mutations = {
  [types.SET_STOCKS]: (state, payload) => {
    state.stocks = payload;
  },
  [types.RND_STOCKS]: (state) => {}
};

const actions = {
  [types.BUY_STOCKS]: ({ commit }, order) => {
    commit();
  },
  [types.INIT_STOCKS]: ({ commit }) => {
    commit(types.SET_STOCKS, stocks);
  },
  [types.RANDOMIZE_STOCKS]: ({ commit }) => {
    commit(types.RND_STOCKS);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
