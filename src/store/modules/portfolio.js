import * as types from '../types';

const state = {
  funds: 10000,
  // KIM - portfolio stocks only contain id and quantity, name and price will be obtained from the stocks module (modules/stocks.js)
  stocks: []
};

const getters = {
  [types.GET_PORTFOLIO]: (state, getters) => {
    // KIM - using map() to loop thru the portfolio stocks array and update its elements with name and price using find() with the id
    return state.stocks.map(stock => {
      // KIM - using global getters to get the stocks stocks and having record pointing at the element with the same id to add name and price to the element
      const record = getters[types.GET_STOCKS].find(element => element.id === stock.id);
      return {
        id: stock.id,
        quantity: stock.quantity,
        name: record.name,
        price: record.price
      };
    });
  },
  [types.GET_FUNDS]: state => {
    return state.funds;
  }
};

const mutations = {
  [types.BUY_STOCK]: (state, { stockId, quantity, stockPrice }) => {
    // KIM - using find() to loop and find id, and have record pointing at the element to update its quantity or to add the element to the portfolio stocks
    const record = state.stocks.find(element => element.id === stockId);
    // if newly bought stock exists in stocks array: add new quantity
    if (record) {
      record.quantity += quantity;
    // else: create by pushing the mewly bought stock into the portfolio stocks array
    } else {
      state.stocks.push({
        id: stockId,
        quantity: quantity
      });
    }

    state.funds -= stockPrice * quantity;
  },
  [types.SELL_STOCK]: (state, { stockId, quantity, stockPrice }) => {
    // KIM - using find() to loop and find id, and have record pointing to the element to update its quantity or to remove it from the portfolio stocks
    const record = state.stocks.find(element => element.id === stockId);
    // if sell quantity is less than quantity hold: substract quantity
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    // else: remove the record form the stocks array
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }

    state.funds += stockPrice * quantity;
  }
};

const actions = {
  [types.SELLING_STOCK]: ({ commit }, order) => {
    commit(types.SELL_STOCK, order);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
