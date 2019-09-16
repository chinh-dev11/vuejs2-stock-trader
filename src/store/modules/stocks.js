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
  [types.RND_STOCKS]: (state) => {
    state.stocks.forEach(stock => {
      // variation between 0.5 and 1.5 of the price
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  }
};

const actions = {
  [types.BUY_STOCKS]: ({ commit }, order) => {
    commit(types.BUY_STOCK_PORTFOLIO, order);
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
